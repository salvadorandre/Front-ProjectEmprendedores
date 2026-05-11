import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"

import { authService } from "../services/auth.service"
import { useAuthStore } from "../store/authStore"

export const useAuth = () => {
  const navigate = useNavigate()

  const saveAuth = useAuthStore((state) => state.login)

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

      localStorage.setItem("temp_password", data.password)

      const res = await authService.login(data)

      // 💾 guardar en zustand + localStorage
      saveAuth(res)

      // 🚀 navegación segura
      if (res.user?.is_doctor) {
        navigate("/home")
      } else {
        navigate("/onboarding/doctor")
      }

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

  return {
    login,
    loading,
    error,
  }
}