import { Activity, Pill, Stethoscope, Users } from "lucide-react"
import { useDashboard } from "../hooks/useDashboard"
import { usePatients } from "../hooks/usePatients"
import { useTreatments } from "../hooks/useTreatments"

const formatPercent = (value: number) => `${Math.round(value)}%`

const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | number
  icon: typeof Users
}) => (
  <div className="animate-fade rounded-lg border border-[#90D5FF]/40 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-medium text-[#517891]/70">{label}</p>
      <Icon className="size-5 text-[#517891]" />
    </div>
    <p className="mt-3 text-3xl font-bold text-[#517891]">{value}</p>
  </div>
)

const AdherenceBar = ({ value }: { value: number }) => (
  <div className="h-2 overflow-hidden rounded-full bg-[#90D5FF]/20">
    <div
      className="h-full rounded-full bg-[#517891]"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
)

export const HomePage = () => {
  const dashboard = useDashboard()
  const treatments = useTreatments()
  const patients = usePatients()

  const topTreatments = [...(treatments.data ?? [])]
    .sort((a, b) => b.adherencia - a.adherencia)
    .slice(0, 4)

  const patientsToReview = [...(patients.data ?? [])]
    .sort((a, b) => a.adherencia - b.adherencia)
    .slice(0, 4)

  if (dashboard.isLoading || treatments.isLoading || patients.isLoading) {
    return <p className="text-sm text-[#517891]/70">Cargando resumen...</p>
  }

  if (dashboard.error || treatments.error || patients.error) {
    return (
      <p className="text-sm text-red-600">
        No se pudo cargar la informacion principal.
      </p>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#517891]">Home</h1>
        <p className="mt-1 text-sm text-[#517891]/70">
          Vista rapida de pacientes, tratamientos y adherencia.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pacientes totales"
          value={dashboard.data?.pacientes_totales ?? 0}
          icon={Users}
        />
        <StatCard
          label="Tratamientos activos"
          value={dashboard.data?.tratamientos_activos ?? 0}
          icon={Stethoscope}
        />
        <StatCard
          label="Medicamentos creados"
          value={dashboard.data?.medicamentos_creados ?? 0}
          icon={Pill}
        />
        <StatCard
          label="Promedio adherencia"
          value={formatPercent(dashboard.data?.promedio_adherencia ?? 0)}
          icon={Activity}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-[#90D5FF]/40 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#517891]">
            Tratamientos destacados
          </h2>
          <div className="mt-4 space-y-4">
            {topTreatments.length > 0 ? (
              topTreatments.map((treatment) => (
                <div key={treatment.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-[#517891]">
                      {treatment.titulo}
                    </span>
                    <span className="text-[#517891]/70">
                      {formatPercent(treatment.adherencia)}
                    </span>
                  </div>
                  <AdherenceBar value={treatment.adherencia} />
                </div>
              ))
            ) : (
              <p className="text-sm text-[#517891]/70">
                No hay tratamientos para mostrar.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-lg border border-[#90D5FF]/40 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#517891]">
            Pacientes a revisar
          </h2>
          <div className="mt-4 space-y-4">
            {patientsToReview.length > 0 ? (
              patientsToReview.map((patient) => (
                <div key={patient.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-[#517891]">
                      {patient.nombre}
                    </span>
                    <span className="text-[#517891]/70">
                      {formatPercent(patient.adherencia)}
                    </span>
                  </div>
                  <AdherenceBar value={patient.adherencia} />
                </div>
              ))
            ) : (
              <p className="text-sm text-[#517891]/70">
                No hay pacientes para mostrar.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
