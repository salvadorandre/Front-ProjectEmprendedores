import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { MainLayout } from "../../layouts/MainLayout";

const Home = () => <h1>Home</h1>;
const Login = () => <h1>Login</h1>;
const Tratamientos = () => <h1>Tratamientos</h1>;
const Medicamentos = () => <h1>Medicamentos</h1>;


export const router = createBrowserRouter([
    {
        path:routes.login,
        element: <Login/>
    },
    {
        element:<MainLayout/>,
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

            }
        ]
    }

]);