type Medicamento = {
  id: number
  name: string
  description: string
  imageUrl?: string
}

let medicamentos: Medicamento[] = [
  {
    id: 1,
    name: "Paracetamol",
    description: "Alivia el dolor y la fiebre",
    imageUrl: "",
  },
  {
    id: 2,
    name: "Ibuprofeno",
    description: "Antiinflamatorio no esteroideo",
    imageUrl: "",
  },
  {
    id: 3,
    name: "Amoxicilina",
    description: "Antibiótico de amplio espectro",
    imageUrl: "",
  },
]

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms))

export const medicamentoService = {
  getAll: async (): Promise<Medicamento[]> => {
    await delay(500)
    return [...medicamentos]
  },

  create: async (
    data: Omit<Medicamento, "id">
  ): Promise<Medicamento> => {
    await delay(500)

    const newItem: Medicamento = {
      id: Date.now(),
      ...data,
    }

    medicamentos.push(newItem)
    return newItem
  },

  update: async (
    id: number,
    data: Partial<Omit<Medicamento, "id">>
  ): Promise<Medicamento> => {
    await delay(500)

    const index = medicamentos.findIndex((m) => m.id === id)

    if (index === -1) {
      throw new Error("Medicamento no encontrado")
    }

    medicamentos[index] = {
      ...medicamentos[index],
      ...data,
    }

    return medicamentos[index]
  },

  delete: async (id: number): Promise<void> => {
    await delay(500)

    const exists = medicamentos.some((m) => m.id === id)

    if (!exists) {
      throw new Error("Medicamento no encontrado")
    }

    medicamentos = medicamentos.filter((m) => m.id !== id)
  },
}