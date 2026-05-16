// auth.types.ts

export interface User {
  id: number
  email: string
  google_id?: string | null
  is_doctor: boolean
  is_paciente: boolean
  is_active?: boolean
  date_joined?: string
}

export interface DoctorProfile {
  id: number
  especialidad: string
  colegiado: string
}

export interface AuthResponse {
  user: User
  doctor_id?: DoctorProfile | null
  access: string
  refresh: string
}
