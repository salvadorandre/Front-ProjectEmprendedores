import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/shared/components/ui/sidebar"

import { NavLink } from "react-router-dom"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-bold px-2">Clinix</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <nav className="flex flex-col gap-2 p-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-muted px-2 py-1 rounded font-semibold"
                  : "px-2 py-1"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/medicamentos"
              className={({ isActive }) =>
                isActive
                  ? "bg-muted px-2 py-1 rounded font-semibold"
                  : "px-2 py-1"
              }
            >
              Medicamentos
            </NavLink>

            <NavLink
              to="/tratamientos"
              className={({ isActive }) =>
                isActive
                  ? "bg-muted px-2 py-1 rounded font-semibold"
                  : "px-2 py-1"
              }
            >
              Tratamientos
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-muted px-2 py-1 rounded font-semibold"
                  : "px-2 py-1"
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="text-sm px-2">Usuario</p>
      </SidebarFooter>
    </Sidebar>
  )
}