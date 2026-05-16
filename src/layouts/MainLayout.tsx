import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/shared/components/app-sidebar"

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#90D5FF]/10">
        <AppSidebar />

        <main className="flex-1">
          <div className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-[#90D5FF]/30 bg-white/85 px-4 backdrop-blur">
            <SidebarTrigger className="text-[#517891] hover:bg-[#90D5FF]/20" />
            <div className="flex min-w-0 flex-1 items-center justify-between">
              <div className="flex items-center rounded-lg border border-[#90D5FF]/40 bg-white px-3 py-1.5 shadow-sm">
                <img
                  src="/logoh.png"
                  alt="Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
