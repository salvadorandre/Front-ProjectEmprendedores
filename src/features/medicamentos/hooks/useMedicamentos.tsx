import { useState, useEffect } from "react"
import { medicamentoService } from "../services/medicamento.service"

import type { Medicamento } from "../types"
import { MedicamentoSchema } from "../forms/medicamento.schema"
import { useAuthStore } from "@/features/auth/store/authStore"


export const useMedicamentos = () => {
  const doctorId = useAuthStore((state) => state.doctor?.id)
  const [data, setData] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getMedicamentos = async (showLoading = false) => {
    try {
      if (showLoading) setLoading(true)
      setError(null)

      const res = await medicamentoService.getAll()
      console.log(res)
      setData(res)
    } catch (err: any) {
      setError("Error al cargar medicamentos")
    } finally {
      if (showLoading) setLoading(false)
    }
  }

  const createMedicamento = async (payload: MedicamentoSchema) => {
    try {
      setSaving(true)
      setError(null)
      if (!doctorId) throw new Error("Doctor no autenticado")

      await medicamentoService.create(payload, doctorId)
      await getMedicamentos()
    } catch (err: any) {
      setError("Error al crear medicamento")
    } finally {
      setSaving(false)
    }
  }

  const updateMedicamento = async (id: number, payload: MedicamentoSchema) => {
    try {
      setSaving(true)
      setError(null)

      await medicamentoService.update(id, payload)
      await getMedicamentos()
    } catch (err: any) {
      setError("Error al actualizar medicamento")
    } finally {
      setSaving(false)
    }
  }

  const deleteMedicamento = async (id: number) => {
    try {
      setSaving(true)
      setError(null)

      await medicamentoService.delete(id)
      await getMedicamentos()
    } catch (err: any) {
      setError("Error al eliminar medicamento")
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    getMedicamentos(true)
  }, [])

  return {
    data,
    loading,
    saving,
    error,
    getMedicamentos,
    createMedicamento,
    updateMedicamento,
    deleteMedicamento,
  }
}
