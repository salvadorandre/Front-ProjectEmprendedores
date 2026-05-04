import { z } from "zod"

export const doctorSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido"),

  specialty: z
    .string()
    .min(1, "La especialidad es requerida"),

  license: z
    .string()
    .min(1, "El número de colegiado es requerido"),
})

export type DoctorSchema = z.infer<typeof doctorSchema>