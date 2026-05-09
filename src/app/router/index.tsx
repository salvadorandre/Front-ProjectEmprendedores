import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { MainLayout } from "../../layouts/MainLayout";
import { ErrorPage } from "./ErrorPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { CompleteDoctorProfile } from "@/features/doctors/pages/CompleteDoctorProfile";
import { Medicamentos } from "@/features/medicamentos/pages/Medicamentos";
import { Tratamientos } from "@/features/tratamiento/pages/Tratamientos";
import { EditTratamiento } from "@/features/tratamiento/pages/EditTratamiento";


const Home = () => <h1>Home</h1>;
const Login = () => <LoginPage/>;
const Tratamiento = () => <Tratamientos/>;
const EditarTratamiento = () => <EditTratamiento/>
const Dashboard = () => <h1>Dashboard</h1>;
const Medicamento = () => <Medicamentos/>;


export const router = createBrowserRouter([
    {
        path:routes.login,
        element: <Login/>
    },
    {
        path:routes.onboarding,
        element: <CompleteDoctorProfile/>
    }
    ,
    {
        element:<MainLayout/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path:routes.home,
                element: <Home/>
            },
            {
                path:routes.tratamientos,
                element:<Tratamiento/>
            },
            {
                path:routes.editarTratamientos,
                element:<EditarTratamiento/>
                
            },
            {
                path:routes.medicamentos,
                element: <Medicamento/>
            },
            {
                path:routes.dashboard,
                element: <Dashboard/>
            }
        ]
    }

]);