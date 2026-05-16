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

              <h2 className="mt-3 max-w-md text-4xl font-bold text-[#517891]">
                Crea tu perfil medico y abre nuevas oportunidades!
              </h2>
            </div>

            <div className="grid gap-4">
              <div className="rounded-lg border border-[#517891]/20 bg-white p-20 text-center shadow-sm">
                <img
                  src="/suggest.jfif"
                  alt="Mascota de marca dando una sugerencia"
                  className="mx-auto h-72 w-full max-w-sm rounded-lg object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
