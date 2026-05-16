import { DoctorForm } from "../components/DoctorForm"
import { useDoctor } from "../hooks/useDoctor"

export const RegisterDoctorPage = () => {
  const { createDoctor, loading, error } = useDoctor()

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <DoctorForm
          onSubmit={createDoctor}
          loading={loading}
          error={error}
        />

        <section className="hidden h-full min-h-[620px] overflow-hidden rounded-lg border border-[#90D5FF]/50 bg-[#90D5FF]/20 shadow-sm lg:block">
          <div className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="mb-8 w-fit rounded-lg border border-[#517891]/20 bg-white/80 px-5 py-3 shadow-sm">
                <img
                  src="/logoh.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#517891]">
                Registro profesional
              </p>
              <h2 className="mt-3 max-w-md text-4xl font-bold text-[#517891]">
                Crea tu perfil medico con una identidad visual consistente.
              </h2>
            </div>

            <div className="grid gap-4">
              <div className="rounded-lg border border-[#517891]/20 bg-white/70 p-6 text-center shadow-sm">
                <img
                  src="/suggest.jfif"
                  alt="Mascota de marca dando una sugerencia"
                  className="mx-auto h-72 w-full max-w-sm rounded-lg object-contain"
                />
              </div>
              <div className="rounded-lg border border-[#90D5FF]/60 bg-white/70 p-4 text-center">
                <img
                  src="/logoIcono.png"
                  alt="Logo icono"
                  className="mx-auto size-14 object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
