// auth.types.ts

export interface User {
  id: number
  email: string
  google_id?: string | null
  is_doctor: boolean
  is_paciente: boolean
}

export interface AuthResponse {
  user: User
  access: string
  refresh: string
}