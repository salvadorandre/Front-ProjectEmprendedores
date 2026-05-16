import { authFetch } from "@/features/auth/lib/authFetch"
import type { TratamientoMedicamento } from "../types"

const BASE_URL = "http://127.0.0.1:8000/api/v1/tratamiento-medicamento"

type TratamientoMedicamentoPayload = Omit<TratamientoMedicamento, "id">

export const tratamientoMedicamentoService = {
  async getAll(): Promise<TratamientoMedicamento[]> {
    const res = await authFetch(`${BASE_URL}/`)
    const json = await res.json()

    if (!res.ok) throw new Error("Error al obtener asignaciones")

    return json.data
  },

  async create(data: TratamientoMedicamentoPayload): Promise<TratamientoMedicamento> {
    const res = await authFetch(`${BASE_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const json = await res.json()

    if (!res.ok) throw new Error(json.message || "Error al crear asignación")

    return json.data
  },

  async update(id: number, data: TratamientoMedicamentoPayload): Promise<void> {
    const res = await authFetch(`${BASE_URL}/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const json = await res.json()

    if (!res.ok) throw new Error(json.message || "Error al actualizar asignación")
  },

  async delete(id: number): Promise<void> {
    const res = await authFetch(`${BASE_URL}/${id}/`, {
      method: "DELETE",
    })
    const json = await res.json()

    if (!res.ok) throw new Error(json.message || "Error al eliminar asignación")
  },
}