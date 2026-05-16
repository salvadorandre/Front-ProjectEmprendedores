import { authFetch } from "@/features/auth/lib/authFetch";
import type { Medicamento } from "../types";
import type { MedicamentoSchema } from "../forms/medicamento.schema";

const BASE_URL = "http://127.0.0.1:8000/api/v1/medicamentos";

export const medicamentoService = {
  async getAll(): Promise<Medicamento[]> {
    const res = await authFetch(`${BASE_URL}/`);

    console.log("GET STATUS:", res.status);

    const json = await res.json();

    console.log("GET RESPONSE:", json);

    if (!res.ok) {
      throw new Error("Error al obtener medicamentos");
    }

    return json.medicamentos.map((med: any) => ({
      id: med.id,
      name: med.nombre_medicamento,
      description: med.descripcion,
      imageUrl: med.imagen || undefined,
    }));
  },

  async create(data: MedicamentoSchema, doctorId: number) {
    const body = {
      nombre_medicamento: data.name,
      descripcion: data.description,
      doctor: doctorId,
      is_active: true,
      imagen: data.image || "",
    };

    const res = await authFetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("CREATE STATUS:", res.status);

    const json = await res.json();

    console.log(
      "CREATE RESPONSE:",
      JSON.stringify(json, null, 2)
    )

    if (!res.ok) {
      throw new Error(json.message || "Error al crear");
    }

    return json;
  },

  async update(
  id: number,
  data: MedicamentoSchema
) {
  const body = {
    nombre_medicamento: data.name,
    descripcion: data.description,
    imagen: data.image || "",
  }

  const res =
    await authFetch(
      `${BASE_URL}/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )

  console.log(
    "UPDATE STATUS:",
    res.status
  )

  const json =
    await res.json()

  console.log(
    "UPDATE RESPONSE:",
    json
  )

  if (!res.ok) {
    throw new Error(
      json.message ||
      "Error al actualizar"
    )
  }

  return json
},

  async delete(id: number) {
    const res = await authFetch(`${BASE_URL}/${id}/`, {
      method: "DELETE",
    });

    console.log("DELETE STATUS:", res.status);

    const json = await res.json();

    console.log("DELETE RESPONSE:", json);

    if (!res.ok) {
      throw new Error(json.message || "No se pudo eliminar");
    }

    return json;
  },
};
