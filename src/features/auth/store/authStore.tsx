// features/auth/store/authStore.ts
import { create } from "zustand"
import type { AuthResponse, User } from "../auth.types"

interface AuthState {
  user: User | null
  access: string | null
  refresh: string | null

  login: (data: AuthResponse) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  access: null,
  refresh: null,

  login: (data) => {
    localStorage.setItem("access", data.access)
    localStorage.setItem("refresh", data.refresh)

    set({
      user: data.user,
      access: data.access,
      refresh: data.refresh,
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