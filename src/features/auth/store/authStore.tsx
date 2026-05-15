// features/auth/store/authStore.ts
import { create } from "zustand"
import type { AuthResponse, User } from "../auth.types"

interface AuthState {
  user: User | null
  access: string | null
  refresh: string | null

  login: (data: AuthResponse) => void
  logout: () => void
  updateAccess: (newAccess: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),

  login: (data) => {
    localStorage.setItem("access", data.access)
    localStorage.setItem("refresh", data.refresh)

    set({
      user: data.user,
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

    set({
      user: null,
      access: null,
      refresh: null,
    })
  },
}))