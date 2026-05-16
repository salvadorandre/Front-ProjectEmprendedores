import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
    return(
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="hidden h-full min-h-[560px] overflow-hidden rounded-lg border border-[#90D5FF]/50 bg-[#90D5FF]/20 shadow-sm lg:block">
                    <div className="flex h-full flex-col justify-between p-8">
                        <div>
                            <h2 className="mt-3 max-w-md text-4xl font-bold text-[#517891]">
                                Una gran salto para tu Clinica se aproxima...
                            </h2>
                        </div>

                        <div className="rounded-lg border border-[#517891]/20 bg-white/70 p-20 text-center shadow-sm">
                            <img
                                src="/greeting.jfif"
                                alt="Mascota de marca saludando"
                                className="mx-auto h-72 w-full max-w-sm rounded-lg object-contain"
                            />
                        </div>
                    </div>
                </section>

                <LoginForm/>
            </div>
        </div>
    );
};
