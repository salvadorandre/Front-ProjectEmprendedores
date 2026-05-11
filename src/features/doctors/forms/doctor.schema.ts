import { z } from "zod"

export const doctorSchema = z.object({
  specialty: z
    .string()
    .min(1, "La especialidad es requerida"),

  license: z
    .string()
    .min(1, "El número de colegiado es requerido"),
})

export type DoctorSchema = z.infer<typeof doctorSchema>