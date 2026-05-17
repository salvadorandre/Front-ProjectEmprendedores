import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/shared/components/ui/sidebar"
import { Button } from "./ui/button"
import { NavLink } from "react-router-dom"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { useAuthStore } from "@/features/auth/store/authStore"
import { BarChart3, History, Home, Pill, Stethoscope } from "lucide-react"

export function AppSidebar() {
  const { logout } = useAuth()
  const user = useAuthStore((state) => state.user)
  const specialty = useAuthStore((state) => state.doctor?.especialidad)

  const navItems = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/medicamentos", label: "Medicamentos", icon: Pill },
    { to: "/tratamientos", label: "Tratamientos", icon: Stethoscope },
    { to: "/historial", label: "Historial", icon: History },
    { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ]

  return (
    <Sidebar className="border-r border-[#90D5FF]/40 bg-white">
      <SidebarHeader className="border-b border-[#90D5FF]/30 p-4">
        <div className="flex w-full items-center justify-center gap-3 rounded-lg  p-3">
          <img
            src="/logoh.png"
            alt="Logo"
            className="w-full shrink-0 rounded-lg bg-white object-contain p-2 shadow-sm"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <nav className="flex flex-col gap-2 p-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#90D5FF] text-[#517891] shadow-sm"
                      : "text-[#517891] hover:bg-[#90D5FF]/20 hover:text-[#517891]",
                  ].join(" ")
                }
              >
                <Icon className="size-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#90D5FF]/30 p-4">
        <div className="rounded-lg bg-[#90D5FF]/10 px-3 py-2">
          <p className="text-xs font-medium text-[#517891]/70">Sesion activa</p>
          <p className="truncate text-sm font-semibold text-[#517891]">
            {user?.email ?? "Usuario"}
          </p>
          {specialty && (
            <p className="truncate text-xs text-[#517891]/70">{specialty}</p>
          )}
        </div>
        <Button
          className="w-full bg-[#517891] text-white hover:bg-[#416376]"
          onClick={logout}
        >
          Cerrar sesion
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
