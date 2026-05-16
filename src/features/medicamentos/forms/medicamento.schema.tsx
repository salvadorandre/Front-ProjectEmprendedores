import { z } from "zod"

export const medicamentoSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  description: z.string().min(1, "Descripcion requerida"),
  image: z.string().url("Debe ser una URL valida").optional().or(z.literal("")),
})

export type MedicamentoSchema = z.infer<typeof medicamentoSchema>
