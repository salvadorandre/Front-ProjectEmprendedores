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
  email: string
  password: string
  specialty: string
  license: string
}

export const doctorService = {
  create: async (
    data: DoctorPayload
  ): Promise<DoctorResponse> => {
    const response = await fetch(
      `${API_URL}/register-doctor/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          especialidad: data.specialty,
          colegiado: data.license,
        }),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        result.error || "Error al registrar doctor"
      )
    }

    return result
  },
}