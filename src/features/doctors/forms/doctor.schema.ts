import { z } from "zod"

export const doctorSchema = z.object({
  email: z
    .string()
    .email("Correo inválido"),

  password: z
    .string()
    .min(6, "Mínimo 6 caracteres"),

  specialty: z
    .string()
    .min(1, "La especialidad es requerida"),

  license: z
    .string()
    .min(1, "El número de colegiado es requerido"),
})

export type DoctorSchema = z.infer<typeof doctorSchema>