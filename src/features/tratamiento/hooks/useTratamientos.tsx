import { useState, useEffect } from "react"
import { tratamientoService } from "../services/tratamiento.service"
import type { Tratamiento } from "../types"

export const useTratamientos = () => {
  const [data, setData] = useState<Tratamiento[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getTratamientos = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await tratamientoService.getAll()
      setData(res)
    } catch (err: any) {
      setError("Error al cargar tratamientos")
    } finally {
      setLoading(false)
    }
  }

  const createTratamiento = async (payload: Omit<Tratamiento, "id">) => {
    try {
      setLoading(true)
      setError(null)

      await tratamientoService.create(payload)
      await getTratamientos()
    } catch (err: any) {
      setError("Error al crear tratamiento")
    } finally {
      setLoading(false)
    }
  }

  const updateTratamiento = async (id: number, payload: Partial<Omit<Tratamiento, "id">>) => {
    try {
      setLoading(true)
      setError(null)

      await tratamientoService.update(id, payload)
      await getTratamientos()
    } catch (err: any) {
      setError("Error al actualizar tratamiento")
    } finally {
      setLoading(false)
    }
  }

  const deleteTratamiento = async (id: number) => {
    try {
      setLoading(true)
      setError(null)

      await tratamientoService.delete(id)
      await getTratamientos()
    } catch (err: any) {
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