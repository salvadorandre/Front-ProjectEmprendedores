import { useState, useEffect } from "react"
import { tratamientoService } from "../services/tratamiento.service"
import { tratamientoMedicamentoService } from "../services/tratamientoMedicamento.service"
import type { TratamientoCompleto, TratamientoMedicamento } from "../types"
import type { TratamientoSchema } from "../forms/tratamiento.schema"
import { useAuthStore } from "@/features/auth/store/authStore"

export const useTratamientos = () => {
  const doctorId = useAuthStore((state) => state.doctor?.id)
  const [data, setData] = useState<TratamientoCompleto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getTratamientos = async () => {
    try {
      setLoading(true)
      setError(null)

      const [tratamientos, todasAsignaciones] = await Promise.all([
        tratamientoService.getAll(),
        tratamientoMedicamentoService.getAll(),
      ])

      const asignacionesPorTratamiento = todasAsignaciones.reduce
        <Record<string, TratamientoMedicamento[]>
      >((acc, tm) => {
        if (!acc[tm.tratamiento]) acc[tm.tratamiento] = []
        acc[tm.tratamiento].push(tm)
        return acc
      }, {} as Record<string, TratamientoMedicamento[]>)

      const completos: TratamientoCompleto[] = tratamientos.map((t) => ({
        ...t,
        medicamentos: asignacionesPorTratamiento[t.uuid] ?? [],
      }))

      setData(completos)
    } catch {
      setError("Error al cargar tratamientos")
    } finally {
      setLoading(false)
    }
  }

  const createTratamiento = async (payload: TratamientoSchema) => {
    try {
      setLoading(true)
      setError(null)
      if (!doctorId) throw new Error("Doctor no autenticado")

      await tratamientoService.create({
        doctor: doctorId,
        titulo: payload.titulo,
        descripcion: payload.descripcion,
      })
      await getTratamientos()
    } catch {
      setError("Error al crear tratamiento")
    } finally {
      setLoading(false)
    }
  }

  const updateTratamiento = async (uuid: string, payload: TratamientoSchema) => {
    try {
      setLoading(true)
      setError(null)
      if (!doctorId) throw new Error("Doctor no autenticado")

      await tratamientoService.update(uuid, {
        doctor: doctorId,
        titulo: payload.titulo,
        descripcion: payload.descripcion,
      })
      await getTratamientos()
    } catch {
      setError("Error al actualizar tratamiento")
    } finally {
      setLoading(false)
    }
  }

  const deleteTratamiento = async (uuid: string) => {
    try {
      setLoading(true)
      setError(null)
      await tratamientoService.delete(uuid)
      await getTratamientos()
    } catch {
      setError("Error al eliminar tratamiento")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTratamientos()
  }, [])

  return {
    data,
    loading,
    error,
    getTratamientos,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento,
  }
}
