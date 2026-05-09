import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { routes } from "@/app/router/routes"
import { useTratamientos } from "../hooks/useTratamientos"
import { useMedicamentos } from "@/features/medicamentos/hooks/useMedicamentos"
import { TratamientoForm } from "../components/TratamientoForm"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import type { TratamientoSchema } from "../forms/tratamiento.schema"
import type { Medicamento } from "@/features/medicamentos/types"

export const EditTratamiento = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { id?: number } | null
  const tratamientoId = state?.id

  const { data, loading, error, updateTratamiento } = useTratamientos()
  const { data: allMedicamentos, loading: medsLoading } = useMedicamentos()

  const [searchQuery, setSearchQuery] = useState("")
  const [associatedMedicamentos, setAssociatedMedicamentos] = useState<Medicamento[]>([])

  useEffect(() => {
    if (tratamientoId == null) {
      navigate(routes.tratamientos, { replace: true })
    }
  }, [tratamientoId, navigate])

  const selectedTratamiento = data.find((trat) => trat.id === tratamientoId) ?? null

  useEffect(() => {
    if (selectedTratamiento) {
      setAssociatedMedicamentos(selectedTratamiento.medicamentos ?? [])
    }
  }, [selectedTratamiento])

  const availableMedicamentos = useMemo(() => {
    if (!searchQuery.trim()) {
      return allMedicamentos.filter(
        (med) => !associatedMedicamentos.some((selected) => selected.id === med.id)
      )
    }

    const query = searchQuery.toLowerCase()
    return allMedicamentos.filter(
      (med) =>
        !associatedMedicamentos.some((selected) => selected.id === med.id) &&
        (med.name.toLowerCase().includes(query) ||
          med.description.toLowerCase().includes(query))
    )
  }, [allMedicamentos, associatedMedicamentos, searchQuery])

  const handleAddMedicamento = (medicamento: Medicamento) => {
    setAssociatedMedicamentos((current) => [...current, medicamento])
  }

  const handleRemoveMedicamento = (id: number) => {
    setAssociatedMedicamentos((current) => current.filter((med) => med.id !== id))
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
    <div className="p-4 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Editar Tratamiento</h1>
        <p className="text-sm text-slate-600 mt-1">
          Modifica los datos y administra los medicamentos asociados.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Datos del tratamiento</h2>
            <TratamientoForm
              key={selectedTratamiento.id}
              onSubmit={handleSubmit}
              defaultValues={selectedTratamiento}
              loading={loading}
            />
          </div>

          <div className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Medicamentos asociados</h2>
                <p className="text-sm text-slate-500">
                  Guarda los medicamentos vinculados a este tratamiento.
                </p>
              </div>
              <Button variant="secondary" onClick={() => setSearchQuery("")}>Limpiar búsqueda</Button>
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

              <div className="space-y-3">
                {availableMedicamentos.length > 0 ? (
                  availableMedicamentos.slice(0, 6).map((med) => (
                    <div key={med.id} className="flex items-center justify-between rounded border px-3 py-2">
                      <div>
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-slate-500">{med.description}</p>
                      </div>
                      <Button size="sm" onClick={() => handleAddMedicamento(med)}>
                        Agregar
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No se encontraron medicamentos para agregar.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Medicamentos seleccionados</h2>
          <p className="text-sm text-slate-500">Estos medicamentos se guardarán junto al tratamiento.</p>

          <div className="mt-4 space-y-3">
            {associatedMedicamentos.length > 0 ? (
              associatedMedicamentos.map((med) => (
                <div key={med.id} className="flex items-center justify-between rounded border px-3 py-2">
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-slate-500">{med.description}</p>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => handleRemoveMedicamento(med.id)}>
                    Eliminar
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No hay medicamentos asociados aún.</p>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
