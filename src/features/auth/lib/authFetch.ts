import { useAuthStore } from "../store/authStore"

const REFRESH_URL =
  "http://127.0.0.1:8000/api/v1/token/refresh/"

export async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const {
    access,
    refresh,
    updateAccess,
    logout,
  } = useAuthStore.getState()

  const headers = new Headers(init?.headers)

  if (access) {
    headers.set(
      "Authorization",
      `Bearer ${access}`
    )
  }

  let response = await fetch(input, {
    ...init,
    headers,
  })

  // si token expiró
  if (
    response.status === 401 &&
    refresh
  ) {
    console.log(
      "Access expirado. Intentando refresh..."
    )

    const refreshRes = await fetch(
      REFRESH_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          refresh,
        }),
      }
    )

    if (!refreshRes.ok) {
      console.log(
        "Refresh expirado. Cerrando sesión."
      )

      logout()
      window.location.href = "/login"

      throw new Error(
        "Sesión expirada"
      )
    }

    const refreshData =
      await refreshRes.json()

    const newAccess =
      refreshData.access

    updateAccess(newAccess)

    console.log(
      "Nuevo access obtenido"
    )

    const retryHeaders =
      new Headers(init?.headers)

    retryHeaders.set(
      "Authorization",
      `Bearer ${newAccess}`
    )

    response = await fetch(
      input,
      {
        ...init,
        headers: retryHeaders,
      }
    )
  }

  return response
}