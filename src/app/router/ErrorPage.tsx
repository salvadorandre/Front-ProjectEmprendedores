import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export const ErrorPage = () =>{

    const error = useRouteError();

    console.error(error);

    if (isRouteErrorResponse(error)) {
        return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <section className="rounded-lg border border-[#90D5FF]/50 bg-white p-8 shadow-[0_20px_60px_rgba(81,120,145,0.14)]">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#517891]/70">
                        Algo no salio como esperabamos
                    </p>
                    <h1 className="mt-3 text-5xl font-bold text-[#517891]">
                        Error {error.status}
                    </h1>
                    <p className="mt-3 text-lg text-[#517891]/75">
                        {error.statusText}
                    </p>
                    <Link
                        to="/home"
                        className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-[#517891] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#416376]"
                    >
                        Volver al inicio
                    </Link>
                </section>

                <section className="min-h-[440px] rounded-lg border-2 border-dashed border-[#90D5FF] bg-[#90D5FF]/20 p-8">
                    <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-lg bg-white/60 text-center">
                        <img
                            src="/logoh.png"
                            alt="Logo"
                            className="mb-6 h-10 w-auto object-contain"
                        />
                        <img
                            src="/badrequest.jfif"
                            alt="Mascota de marca indicando un error"
                            className="h-72 w-full max-w-sm rounded-lg object-contain"
                        />
                    </div>
                </section>
            </div>
        </div>
        )
    }

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <section className="rounded-lg border border-[#90D5FF]/50 bg-white p-8 shadow-[0_20px_60px_rgba(81,120,145,0.14)]">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#517891]/70">
                        Error inesperado
                    </p>
                    <h1 className="mt-3 text-4xl font-bold text-[#517891]">
                        Algo salio mal
                    </h1>
                    <p className="mt-3 text-lg text-[#517891]/75">
                        Intenta nuevamente mas tarde
                    </p>
                    <Link
                        to="/home"
                        className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-[#517891] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#416376]"
                    >
                        Volver al inicio
                    </Link>
                </section>

                <section className="min-h-[440px] rounded-lg border-2 border-dashed border-[#90D5FF] bg-[#90D5FF]/20 p-8">
                    <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-lg bg-white/60 text-center">
                        <img
                            src="/logoh.png"
                            alt="Logo"
                            className="mb-6 h-10 w-auto object-contain"
                        />
                        <img
                            src="/badrequest.jfif"
                            alt="Mascota de marca indicando un error"
                            className="h-72 w-full max-w-sm rounded-lg object-contain"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};
