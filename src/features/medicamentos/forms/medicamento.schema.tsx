import { z } from "zod"

export const medicamentoSchema = z.object({
  name: z.string()
    .min(1, "Nombre requerido"),

  description: z.string()
    .min(1, "Descripción requerida"),

  image: z
    .instanceof(File)
    .nullable()
    .optional()
})

export type MedicamentoSchema =
  z.infer<typeof medicamentoSchema>