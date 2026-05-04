import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { MainLayout } from "../../layouts/MainLayout";
import { ErrorPage } from "./ErrorPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";


const Home = () => <h1>Home</h1>;
const Login = () => <LoginPage/>;
const Tratamientos = () => <h1>Tratamientos</h1>;
const Dashboard = () => <h1>Dashboard</h1>;
const Medicamentos = () => <h1>Medicamentos</h1>;


export const router = createBrowserRouter([
    {
        path:routes.login,
        element: <Login/>
    },
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
                element: <Tratamientos/>
            },
            {
                path:routes.medicamentos,
                element: <Medicamentos/>
            },
            {
                path:routes.dashboard,
                element: <Dashboard/>
            }
        ]
    }

]);