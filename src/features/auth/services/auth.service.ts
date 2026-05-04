export const authService = {
  login: async (data: { email: string; password: string }) => {
    // delay para simular red
    await new Promise((res) => setTimeout(res, 800))
    
    const isDoctor = data.email.includes("doc")

    return {
      user: { id: 1, email: data.email },
      doctor: isDoctor ? { id: 10 } : null,
    }
  },
}