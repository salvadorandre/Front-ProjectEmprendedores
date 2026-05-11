import { createBrowserRouter } from "react-router-dom"
import { routes } from "./routes"

import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute"
import { MainLayout } from "../../layouts/MainLayout"
import { ErrorPage } from "./ErrorPage"

import { LoginPage } from "@/features/auth/pages/LoginPage"
import { RegisterDoctorPage } from "@/features/doctors/pages/RegisterDoctorPage"

import { Medicamentos } from "@/features/medicamentos/pages/Medicamentos"
import { Tratamientos } from "@/features/tratamiento/pages/Tratamientos"
import { EditTratamiento } from "@/features/tratamiento/pages/EditTratamiento"
import { Navigate } from "react-router-dom"

const Home = () => <h1>Home</h1>
const Dashboard = () => <h1>Dashboard</h1>

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
        element: <Dashboard/>
      },
      {
        path: routes.home,
        element: <Home />,
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
        path: routes.dashboard,
        element: <Dashboard />,
      },
    ],
  },
])