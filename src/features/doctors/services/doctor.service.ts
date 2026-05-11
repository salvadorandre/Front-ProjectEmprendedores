import { useAuthStore } from "@/features/auth/store/authStore"

const API_URL = import.meta.env.VITE_API_URL

type DoctorResponse = {
  user: {
    id: number
    email: string
    is_doctor: boolean
    is_paciente: boolean
  }
  access: string
  refresh: string
}

type DoctorPayload = {
  specialty: string
  license: string
}

export const doctorService = {
  create: async (data: DoctorPayload): Promise<DoctorResponse> => {
    const user = useAuthStore.getState().user

    if (!user?.email) {
      throw new Error("No se encontró usuario autenticado")
    }

    const tempPassword = localStorage.getItem("temp_password")

    if (!tempPassword) {
      throw new Error("No se encontró contraseña temporal")
    }

    const response = await fetch(`${API_URL}/register-doctor/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: tempPassword,
        especialidad: data.specialty,
        colegiado: data.license,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Error al registrar doctor")
    }

    return result
  },
}