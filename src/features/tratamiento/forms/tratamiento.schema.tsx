import { z } from "zod"

export const tratamientoSchema = z.object({
  titulo: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(20, "El título no puede superar los 20 caracteres")
    .trim(),
  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede superar los 500 caracteres")
    .trim(),
})

export type TratamientoSchema = z.infer<typeof tratamientoSchema>