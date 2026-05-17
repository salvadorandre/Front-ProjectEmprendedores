import { useState } from "react"
import { Activity, AlertTriangle, ClipboardList, Users } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { useDashboard } from "../hooks/useDashboard"
import { usePatients } from "../hooks/usePatients"
import { usePatientReport } from "../hooks/usePatientReport"
import { useTreatments } from "../hooks/useTreatments"
import { useTreatmentStats } from "../hooks/useTreatmentStats"

const formatPercent = (value: number) => `${Math.round(value)}%`

const clampPercent = (value: number) => Math.min(Math.max(value, 0), 100)

const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | number
  icon: typeof Activity
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
      style={{ width: `${clampPercent(value)}%` }}
    />
  </div>
)

export const DashboardPage = () => {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>()
  const [selectedPatientId, setSelectedPatientId] = useState<string>()

  const dashboard = useDashboard()
  const treatments = useTreatments()
  const patients = usePatients()
  const treatmentStats = useTreatmentStats(selectedTreatmentId)
  const patientReport = usePatientReport(selectedPatientId)

  const isLoading = dashboard.isLoading || treatments.isLoading || patients.isLoading
  const hasError = dashboard.error || treatments.error || patients.error

  if (isLoading) {
    return <p className="text-sm text-[#517891]/70">Cargando dashboard...</p>
  }

  if (hasError) {
    return (
      <p className="text-sm text-red-600">
        No se pudo cargar la informacion del dashboard.
      </p>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#517891]">Dashboard</h1>
        <p className="mt-1 text-sm text-[#517891]/70">
          Seguimiento de pacientes, tratamientos y adherencia.
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
          icon={ClipboardList}
        />
        <StatCard
          label="Promedio adherencia"
          value={formatPercent(dashboard.data?.promedio_adherencia ?? 0)}
          icon={Activity}
        />
        <StatCard
          label="Bajo 70%"
          value={treatmentStats.data?.pacientes_bajo_70 ?? "-"}
          icon={AlertTriangle}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-[#90D5FF]/40 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#517891]">
            Adherencia por tratamiento
          </h2>
          <div className="mt-4 space-y-4">
            {(treatments.data ?? []).map((treatment) => (
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
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-[#90D5FF]/40 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#517891]">
            Estadisticas del tratamiento
          </h2>
          {selectedTreatmentId ? (
            <div className="mt-4 space-y-4">
              {treatmentStats.isLoading ? (
                <p className="text-sm text-[#517891]/70">Cargando...</p>
              ) : treatmentStats.data ? (
                <>
                  <p className="font-semibold text-[#517891]">
                    {treatmentStats.data.tratamiento}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    <StatCard
                      label="Pacientes"
                      value={treatmentStats.data.pacientes}
                      icon={Users}
                    />
                    <StatCard
                      label="Adherencia promedio"
                      value={formatPercent(treatmentStats.data.adherencia_promedio)}
                      icon={Activity}
                    />
                    <StatCard
                      label="Pacientes bajo 70%"
                      value={treatmentStats.data.pacientes_bajo_70}
                      icon={AlertTriangle}
                    />
                  </div>
                </>
              ) : (
                <p className="text-sm text-red-600">
                  No se pudieron cargar las estadisticas.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-[#517891]/70">
              Selecciona un tratamiento de la tabla para ver sus estadisticas.
            </p>
          )}
        </section>
      </div>

      <section className="overflow-hidden rounded-lg border border-[#90D5FF]/40 bg-white shadow-sm">
        <div className="border-b border-[#90D5FF]/30 p-5">
          <h2 className="text-lg font-semibold text-[#517891]">
            Tratamientos
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titulo</TableHead>
              <TableHead>Pacientes asignados</TableHead>
              <TableHead>Adherencia</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(treatments.data ?? []).map((treatment) => (
              <TableRow key={treatment.id}>
                <TableCell className="font-semibold text-[#517891]">
                  {treatment.titulo}
                </TableCell>
                <TableCell>{treatment.pacientes_asignados}</TableCell>
                <TableCell>{formatPercent(treatment.adherencia)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTreatmentId(treatment.id)}
                  >
                    Ver stats
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="overflow-hidden rounded-lg border border-[#90D5FF]/40 bg-white shadow-sm">
          <div className="border-b border-[#90D5FF]/30 p-5">
            <h2 className="text-lg font-semibold text-[#517891]">Pacientes</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tratamientos activos</TableHead>
                <TableHead>Adherencia</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(patients.data ?? []).map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-semibold text-[#517891]">
                    {patient.nombre}
                  </TableCell>
                  <TableCell>{patient.tratamientos_activos}</TableCell>
                  <TableCell>{formatPercent(patient.adherencia)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedPatientId(String(patient.id))}
                    >
                      Ver reporte
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section className="rounded-lg border border-[#90D5FF]/40 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#517891]">
            Reporte del paciente
          </h2>
          {selectedPatientId ? (
            <div className="mt-4 space-y-5">
              {patientReport.isLoading ? (
                <p className="text-sm text-[#517891]/70">Cargando...</p>
              ) : patientReport.data ? (
                <>
                  <p className="font-semibold text-[#517891]">
                    {patientReport.data.paciente}
                  </p>
                  <div className="space-y-3">
                    {patientReport.data.tratamientos.map((treatment) => (
                      <div key={treatment.titulo} className="space-y-2">
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span>{treatment.titulo}</span>
                          <span>{formatPercent(treatment.adherencia)}</span>
                        </div>
                        <AdherenceBar value={treatment.adherencia} />
                      </div>
                    ))}
                  </div>
                  <div className="overflow-hidden rounded-lg border border-[#90D5FF]/30">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medicamento</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Tomado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patientReport.data.ultimos_registros.map((record) => (
                          <TableRow key={`${record.medicamento}-${record.fecha}`}>
                            <TableCell>{record.medicamento}</TableCell>
                            <TableCell>{record.fecha}</TableCell>
                            <TableCell>{record.tomado ? "Si" : "No"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <p className="text-sm text-red-600">
                  No se pudo cargar el reporte.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-[#517891]/70">
              Selecciona un paciente para ver tratamientos y ultimos registros.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
