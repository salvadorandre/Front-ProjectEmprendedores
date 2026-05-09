import type { Medicamento } from "@/features/medicamentos/types"

export type Tratamiento = {
  id: number
  name: string
  description: string
  medicamentos: Medicamento[]
}