import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"

import { authService } from "../services/auth.service"
import { useAuthStore } from "../store/authStore"

export const useAuth = () => {
  const navigate = useNavigate()

  const saveAuth = useAuthStore((state) => state.login)
  const clearAuth = useAuthStore((state) => state.logout)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 🔥 evita doble ejecución incluso si React re-renderiza
  const isSubmitting = useRef(false)

  const login = async (data: { email: string; password: string }) => {
    // 🚫 bloqueo de doble request
    if (isSubmitting.current) return

    try {
      isSubmitting.current = true
      setLoading(true)
      setError(null)



      const res = await authService.login(data)

      if (!res.user?.is_doctor) {
        throw new Error("Esta cuenta no está registrada como doctor")
      }
      // 💾 guardar en zustand + localStorage
      saveAuth(res)
      navigate("/home")


    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al iniciar sesión"
      )
    } finally {
      setLoading(false)
      isSubmitting.current = false
    }
  }

  const loginWithGoogle = async (
    idToken: string
  ) => {
    try {
      setLoading(true)
      setError(null)

      const res =
        await authService.googleLogin(idToken)

      if (!res.user?.is_doctor) {
        throw new Error(
          "Esta cuenta no está registrada como doctor"
        )
      }

      saveAuth(res)

      navigate("/home")
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error con Google"
      )
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    clearAuth()
    navigate("/login")
  }

  return {
    login,
    loginWithGoogle,
    logout,
    loading,
    error,
  }
}