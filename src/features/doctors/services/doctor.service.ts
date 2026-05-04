type Doctor = {
  id: number
  name: string
  specialty: string
  license: string
}

export const doctorService = {
  create: async (data: Omit<Doctor, "id">): Promise<Doctor> => {
    // Simula latencia
    await new Promise((res) => setTimeout(res, 800))

    // Simulación de error (útil para probar UI)
    if (data.license === "0000") {
      throw new Error("Licencia inválida")
    }

    return {
      id: Date.now(), // fake id
      ...data,
    }
  },

  getById: async (id: number): Promise<Doctor> => {
    await new Promise((res) => setTimeout(res, 500))

    return {
      id,
      name: "Dr. Demo",
      specialty: "Cardiología",
      license: "123456",
    }
  },
}