import { useState, useEffect } from "react"
import { medicamentoService } from "../services/medicamento.service"

import type { Medicamento } from "../types"
import { MedicamentoSchema } from "../forms/medicamento.schema"


export const useMedicamentos = () => {
  const [data, setData] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getMedicamentos = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await medicamentoService.getAll()
      console.log(res)
      setData(res)
    } catch (err: any) {
      setError("Error al cargar medicamentos")
    } finally {
      setLoading(false)
    }
  }

  const createMedicamento = async (payload: MedicamentoSchema) => {
    try {
      setLoading(true)
      setError(null)

      await medicamentoService.create(payload)
      await getMedicamentos()
    } catch (err: any) {
      setError("Error al crear medicamento")
    } finally {
      setLoading(false)
    }
  }

  const updateMedicamento = async (id: number, payload: MedicamentoSchema) => {
    try {
      setLoading(true)
      setError(null)

      await medicamentoService.update(id, payload)
      await getMedicamentos()
    } catch (err: any) {
      setError("Error al actualizar medicamento")
    } finally {
      setLoading(false)
    }
  }

  const deleteMedicamento = async (id: number) => {
    try {
      setLoading(true)
      setError(null)

      await medicamentoService.delete(id)
      await getMedicamentos()
    } catch (err: any) {
      setError("Error al eliminar medicamento")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMedicamentos()
  }, [])

  return {
    data,
    loading,
    error,
    getMedicamentos,
    createMedicamento,
    updateMedicamento,
    deleteMedicamento,
  }
}