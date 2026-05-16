// features/auth/services/authService.ts

import { AuthResponse } from "../auth.types"

const API_URL = import.meta.env.VITE_API_URL
// ej: http://127.0.0.1:8000/api/v1

export const authService = {
  login: async (data: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const text = await response.text()

  let result: any = null

  try {
    result = text ? JSON.parse(text) : null
  } catch {
    throw new Error("Respuesta inválida del servidor")
  }

  if (!response.ok) {
    throw new Error(result?.error || "Error al iniciar sesión")
  }

  return result
},
googleLogin: async (idToken: string) => {
  const response = await fetch(
    `${API_URL}/auth/google/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_token: idToken,
        is_doctor: true,
      }),
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.error || "Error con Google"
    )
  }
  console.log(result)
  return result
},
}
