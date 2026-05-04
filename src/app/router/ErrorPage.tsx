import { useRouteError, isRouteErrorResponse } from "react-router";

export const ErrorPage = () =>{

    const error = useRouteError();

    console.error(error);

    if (isRouteErrorResponse(error)) {
        return (
        <div className="bg-blue-600 min-h-screen min-w-screen flex flex-col items-center justify-center">
            <h1 className="font-sans text-4xl font-bold text-white">Error {error.status}</h1>
            <p className="font-sans text-2xl text-white">{error.statusText}</p>
        </div>
        )
    }

    return (
        <div>
        <h1>Algo salió mal</h1>
        <p>Intenta nuevamente más tarde</p>
        </div>
    );
};