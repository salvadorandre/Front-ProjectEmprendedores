// features/auth/store/authStore.ts
import { create } from "zustand"
import type { AuthResponse, DoctorProfile, User } from "../auth.types"

interface AuthState {
  user: User | null
  doctor: DoctorProfile | null
  access: string | null
  refresh: string | null

  login: (data: AuthResponse) => void
  logout: () => void
  updateAccess: (newAccess: string) => void
}

const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem("user")

  if (!storedUser) return null

  try {
    return JSON.parse(storedUser) as User
  } catch {
    localStorage.removeItem("user")
    return null
  }
}

const getStoredDoctor = (): DoctorProfile | null => {
  const storedDoctor = localStorage.getItem("doctor")

  if (!storedDoctor) return null

  try {
    return JSON.parse(storedDoctor) as DoctorProfile
  } catch {
    localStorage.removeItem("doctor")
    return null
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  doctor: getStoredDoctor(),
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),

  login: (data) => {
    localStorage.setItem("access", data.access)
    localStorage.setItem("refresh", data.refresh)
    localStorage.setItem("user", JSON.stringify(data.user))
    if (data.doctor_id) {
      localStorage.setItem("doctor", JSON.stringify(data.doctor_id))
    } else {
      localStorage.removeItem("doctor")
    }

    set({
      user: data.user,
      doctor: data.doctor_id ?? null,
      access: data.access,
      refresh: data.refresh,
    })
  },

  updateAccess: (newAccess) => {
    localStorage.setItem("access", newAccess)

    set({
      access: newAccess,
    })
  },

  logout: () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("user")
    localStorage.removeItem("doctor")

    set({
      user: null,
      doctor: null,
      access: null,
      refresh: null,
    })
  },
}))
