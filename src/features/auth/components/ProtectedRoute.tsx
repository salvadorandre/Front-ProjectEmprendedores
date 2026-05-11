import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

type Props = {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const access = useAuthStore((s) => s.access)

  const localAccess = localStorage.getItem("access")

  const token = access || localAccess

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}