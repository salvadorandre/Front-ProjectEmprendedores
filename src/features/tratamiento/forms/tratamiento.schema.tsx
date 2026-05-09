import { z } from "zod";

export const tratamientoSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres")
    .trim(),

  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede superar los 500 caracteres")
    .trim(),
});

export type TratamientoSchema = z.infer<typeof tratamientoSchema>;