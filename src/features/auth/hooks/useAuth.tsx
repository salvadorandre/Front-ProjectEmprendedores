import { useNavigate } from "react-router-dom"
import { authService } from "../services/auth.service"
import { useState } from "react"

export const useAuth = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (data: { email: string; password: string }) => {
    try {
      setLoading(true)
      setError(null)

      const res = await authService.login(data)

      if (res.doctor) {
        navigate("/home")
      } else {
        navigate("/onboarding/doctor")
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}