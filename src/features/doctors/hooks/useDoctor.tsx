import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { doctorService } from "../services/doctor.service"
import { DoctorSchema } from "../forms/doctor.schema"

export const useDoctor = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createDoctor = async (data: DoctorSchema) => {
    try {
      setLoading(true)
      setError(null)

      await doctorService.create(data)

      navigate("/")
    } catch (err: any) {
      setError(err.message || "Error al crear el perfil")
    } finally {
      setLoading(false)
    }
  }

  return {
    createDoctor,
    loading,
    error,
  }
}