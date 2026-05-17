export type DashboardSummary = {
  pacientes_totales: number
  tratamientos_activos: number
  medicamentos_creados: number
  promedio_adherencia: number
}

export type DoctorTreatment = {
  id: string
  titulo: string
  pacientes_asignados: number
  adherencia: number
}

export type TreatmentStats = {
  tratamiento: string
  pacientes: number
  adherencia_promedio: number
  pacientes_bajo_70: number
}

export type DoctorPatient = {
  id: number
  nombre: string
  tratamientos_activos: number
  adherencia: number
}

export type PatientReportTreatment = {
  titulo: string
  adherencia: number
}

export type PatientLastRecord = {
  medicamento: string
  fecha: string
  tomado: boolean
}

export type PatientReport = {
  paciente: string
  tratamientos: PatientReportTreatment[]
  ultimos_registros: PatientLastRecord[]
}
