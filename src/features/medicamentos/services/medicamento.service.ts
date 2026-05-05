let medicamentos: any[] = []

export const medicamentoService = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 500))
    return medicamentos
  },

  create: async (data: any) => {
    await new Promise((r) => setTimeout(r, 500))

    const newItem = {
      id: Date.now(),
      ...data,
    }

    medicamentos.push(newItem)
    return newItem
  },

  update: async (id: number, data: any) => {
    await new Promise((r) => setTimeout(r, 500))

    medicamentos = medicamentos.map((m) =>
      m.id === id ? { ...m, ...data } : m
    )
  },

  delete: async (id: number) => {
    await new Promise((r) => setTimeout(r, 500))

    medicamentos = medicamentos.filter((m) => m.id !== id)
  },
}