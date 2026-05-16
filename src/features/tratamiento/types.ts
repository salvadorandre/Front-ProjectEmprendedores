import type { Medicamento } from "@/features/medicamentos/types"

export type Tratamiento = {
  uuid: string
  titulo: string
  descripcion: string
  doctor: number
  created_at: string
  updated_at: string
}

export type TratamientoMedicamento = {
  id: number
  tratamiento: string   // uuid
  medicamento: number   // id del medicamento
  dosis: string
  frecuencia: string
  horario: string
  instrucciones: string
}

// Solo existe en el frontend — ensamblado en el hook
export type TratamientoCompleto = Tratamiento & {
  medicamentos: TratamientoMedicamento[]
}

// Solo para la UI de EditTratamiento — medicamento con sus datos de configuración
export type TratamientoMedicamentoUI = Medicamento & {
  dosis: string
  frecuencia: string
  horario: string
  instrucciones: string
}