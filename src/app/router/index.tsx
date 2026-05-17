import { createBrowserRouter } from "react-router-dom"
import { routes } from "./routes"

import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute"
import { MainLayout } from "../../layouts/MainLayout"
import { ErrorPage } from "./ErrorPage"

import { LoginPage } from "@/features/auth/pages/LoginPage"
import { RegisterDoctorPage } from "@/features/doctors/pages/RegisterDoctorPage"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"
import { HomePage } from "@/features/dashboard/pages/HomePage"

import { Medicamentos } from "@/features/medicamentos/pages/Medicamentos"
import { Tratamientos } from "@/features/tratamiento/pages/Tratamientos"
import { EditTratamiento } from "@/features/tratamiento/pages/EditTratamiento"
import { HistorialPage } from "@/features/historial/pages/HistorialPage"


export const router = createBrowserRouter([
  // PUBLICAS
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.register,
    element: <RegisterDoctorPage />,
  },

  // PRIVADAS
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: routes.home,
        element: <HomePage />,
      },
      {
        path: routes.tratamientos,
        element: <Tratamientos />,
      },
      {
        path: routes.editarTratamientos,
        element: <EditTratamiento />,
      },
      {
        path: routes.medicamentos,
        element: <Medicamentos />,
      },
      {
        path: routes.historial,
        element: <HistorialPage />,
      },
      {
        path: routes.dashboard,
        element: <DashboardPage />,
      },
    ],
  },
])
