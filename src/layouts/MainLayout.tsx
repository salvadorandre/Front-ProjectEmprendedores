import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/shared/components/app-sidebar"

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1">
          <SidebarTrigger />
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}