type Tratamiento = {
  id: number
  name: string
  description: string
}

let tratamientos: Tratamiento[] = [
  {
    id: 1,
    name: "Paracetamol",
    description: "Alivia el dolor y la fiebre",
  },
  {
    id: 2,
    name: "Ibuprofeno",
    description: "Antiinflamatorio no esteroideo",
  },
  {
    id: 3,
    name: "Amoxicilina",
    description: "Antibiótico de amplio espectro",
  },
]

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms))

export const tratamientoService = {
  getAll: async (): Promise<Tratamiento[]> => {
    await delay(500)
    return [...tratamientos]
  },

  create: async (
    data: Omit<Tratamiento, "id">
  ): Promise<Tratamiento> => {
    await delay(500)

    const newItem: Tratamiento = {
      id: Date.now(),
      ...data,
    }

    tratamientos.push(newItem)
    return newItem
  },

  update: async (
    id: number,
    data: Partial<Omit<Tratamiento, "id">>
  ): Promise<Tratamiento> => {
    await delay(500)

    const index = tratamientos.findIndex((m) => m.id === id)

    if (index === -1) {
      throw new Error("Tratamiento no encontrado")
    }

    tratamientos[index] = {
      ...tratamientos[index],
      ...data,
    }

    return tratamientos[index]
  },

  delete: async (id: number): Promise<void> => {
    await delay(500)

    const exists = tratamientos.some((t) => t.id === id)

    if (!exists) {
      throw new Error("Tratamiento no encontrado")
    }

    tratamientos = tratamientos.filter((t) => t.id !== id)
  },
}