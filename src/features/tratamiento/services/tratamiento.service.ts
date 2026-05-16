import { authFetch } from "@/features/auth/lib/authFetch"
import type { Tratamiento } from "../types"
import type { TratamientoSchema } from "../forms/tratamiento.schema"

const BASE_URL = "http://127.0.0.1:8000/api/v1/tratamientos"

type TratamientoPayload = {
  doctor: number
  titulo: string
  descripcion: string
}

export const tratamientoService = {
  async getAll(): Promise<Tratamiento[]> {
    const res = await authFetch(`${BASE_URL}/`)
    const json = await res.json()

    if (!res.ok) throw new Error("Error al obtener tratamientos")

    return json.tratamientos
  },

  async create(data: TratamientoPayload): Promise<Tratamiento> {
    const res = await authFetch(`${BASE_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const json = await res.json()

    if (!res.ok) throw new Error(json.message || "Error al crear tratamiento")

    return json.data
  },

  async update(uuid: string, data: TratamientoPayload): Promise<void> {
    const res = await authFetch(`${BASE_URL}/${uuid}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const json = await res.json()

    if (!res.ok) throw new Error(json.message || "Error al actualizar tratamiento")
  },

  async delete(uuid: string): Promise<void> {
    const res = await authFetch(`${BASE_URL}/${uuid}/`, {
      method: "DELETE",
    })
    const json = await res.json()

    if (!res.ok) throw new Error(json.message || "Error al eliminar tratamiento")
  },
}