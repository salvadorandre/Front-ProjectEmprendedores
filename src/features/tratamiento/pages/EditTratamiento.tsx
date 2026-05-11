import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { routes } from "@/app/router/routes"
import { useTratamientos } from "../hooks/useTratamientos"
import { useMedicamentos } from "@/features/medicamentos/hooks/useMedicamentos"
import { TratamientoForm } from "../components/TratamientoForm"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import type { TratamientoSchema } from "../forms/tratamiento.schema"
import type { Medicamento } from "@/features/medicamentos/types"

type TratamientoMedicamento = Medicamento & {
  dosis?: string
  horario?: string
  instrucciones?: string
}

export const EditTratamiento = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { id?: number } | null
  const tratamientoId = state?.id

  const { data, loading, error, updateTratamiento } = useTratamientos()
  const { data: allMedicamentos, loading: medsLoading } = useMedicamentos()

  const [searchQuery, setSearchQuery] = useState("")
  const [associatedMedicamentos, setAssociatedMedicamentos] = useState<TratamientoMedicamento[]>([])

  useEffect(() => {
    if (tratamientoId == null) {
      navigate(routes.tratamientos, { replace: true })
    }
  }, [tratamientoId, navigate])

  const selectedTratamiento = data.find((trat) => trat.id === tratamientoId) ?? null

  useEffect(() => {
    if (selectedTratamiento) {
      setAssociatedMedicamentos((selectedTratamiento.medicamentos ?? []) as TratamientoMedicamento[])
    }
  }, [selectedTratamiento])

  const availableMedicamentos = useMemo(() => {
    if (!searchQuery.trim()) {
      return allMedicamentos
    }

    const query = searchQuery.toLowerCase()
    return allMedicamentos.filter(
      (med) =>
        med.name.toLowerCase().includes(query) ||
        med.description.toLowerCase().includes(query)
    )
  }, [allMedicamentos, searchQuery])

  const handleAddMedicamento = (medicamento: Medicamento) => {
    setAssociatedMedicamentos((current) => [...current, { ...medicamento, dosis: "", horario: "", instrucciones: "" }])
  }

  const handleRemoveMedicamento = (id: number) => {
    setAssociatedMedicamentos((current) => current.filter((med) => med.id !== id))
  }

  const handleUpdateMedicamento = (id: number, field: keyof TratamientoMedicamento, value: string) => {
    setAssociatedMedicamentos((current) =>
      current.map((med) =>
        med.id === id ? { ...med, [field]: value } : med
      )
    )
  }

  const handleSubmit = async (formData: TratamientoSchema) => {
    if (!selectedTratamiento) return

    await updateTratamiento(selectedTratamiento.id, {
      ...formData,
      medicamentos: associatedMedicamentos,
    })
    navigate(routes.tratamientos)
  }

  if (tratamientoId == null) {
    return null
  }

  if (loading || medsLoading) {
    return <p>Cargando tratamiento...</p>
  }

  if (!selectedTratamiento) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Tratamiento no encontrado</h1>
        <p className="mt-2 text-sm text-slate-600">
          Regresa a la lista de tratamientos para seleccionar uno válido.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Editar Tratamiento</h1>
        <p className="text-sm text-slate-600 mt-1">
          Modifica los datos y administra los medicamentos asociados.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Datos del tratamiento</h2>
            <TratamientoForm
              key={selectedTratamiento.id}
              onSubmit={handleSubmit}
              defaultValues={selectedTratamiento}
              loading={loading}
            />
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Medicamentos disponibles</h2>
                <p className="text-sm text-slate-500">
                  Busca y agrega medicamentos. Puedes agregar el mismo varias veces.
                </p>
              </div>
              <Button variant="secondary" onClick={() => setSearchQuery("")}>Limpiar</Button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicamento-search">Buscar medicamento</Label>
                <Input
                  id="medicamento-search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Busca por nombre o descripción"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableMedicamentos.length > 0 ? (
                  availableMedicamentos.slice(0, 10).map((med) => (
                    <div key={med.id} className="flex items-center justify-between rounded border px-3 py-2 hover:bg-slate-50">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{med.name}</p>
                        <p className="text-xs text-slate-500">{med.description}</p>
                      </div>
                      <Button size="sm" onClick={() => handleAddMedicamento(med)} className="ml-2">
                        Agregar
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4">No se encontraron medicamentos para agregar.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm h-fit">
          <h2 className="text-lg font-semibold">Medicamentos seleccionados</h2>
          <p className="text-sm text-slate-500">Configura dosis, horario e instrucciones.</p>

          <div className="mt-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {associatedMedicamentos.length > 0 ? (
              associatedMedicamentos.map((med) => (
                <div key={med.id} className="rounded-lg border bg-slate-50 p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{med.name}</p>
                      <p className="text-xs text-slate-500">{med.description}</p>
                    </div>
                    <Button size="sm" variant="destructive" onClick={() => handleRemoveMedicamento(med.id)} className="ml-2">
                      Eliminar
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`dosis-${med.id}`} className="text-xs">Dosis</Label>
                      <Input
                        id={`dosis-${med.id}`}
                        value={med.dosis ?? ""}
                        onChange={(e) => handleUpdateMedicamento(med.id, "dosis", e.target.value)}
                        placeholder="ej: 500mg cada 8 horas"
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`horario-${med.id}`} className="text-xs">Horario</Label>
                      <Input
                        id={`horario-${med.id}`}
                        type="datetime-local"
                        value={med.horario ?? ""}
                        onChange={(e) => handleUpdateMedicamento(med.id, "horario", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor={`instrucciones-${med.id}`} className="text-xs">Instrucciones</Label>
                    <Textarea
                      id={`instrucciones-${med.id}`}
                      value={med.instrucciones ?? ""}
                      onChange={(e) => handleUpdateMedicamento(med.id, "instrucciones", e.target.value)}
                      placeholder="Agregar instrucciones especiales..."
                      className="text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-8">No hay medicamentos asociados aún.</p>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
