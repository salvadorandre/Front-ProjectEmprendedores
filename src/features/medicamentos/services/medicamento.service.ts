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
      imageUrl: med.imagen ? `http://127.0.0.1:8000${med.imagen}` : undefined,
    }));
  },

  async create(data: MedicamentoSchema) {
    const formData = new FormData();

    formData.append("nombre_medicamento", data.name);

    formData.append("descripcion", data.description);

    formData.append("doctor", "1");

    formData.append("is_active", "true");

    if (data.image) {
      formData.append("imagen", data.image);
    }

    const res = await authFetch(`${BASE_URL}/`, {
      method: "POST",
      body: formData,
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
  const formData =
    new FormData()

  formData.append(
    "nombre_medicamento",
    data.name
  )

  formData.append(
    "descripcion",
    data.description
  )

  if (data.image) {
    formData.append(
      "imagen",
      data.image
    )
  } else {
    throw new Error(
      "Debes seleccionar imagen para editar"
    )
  }

  const res =
    await authFetch(
      `${BASE_URL}/${id}/`,
      {
        method: "PUT",
        body: formData,
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
