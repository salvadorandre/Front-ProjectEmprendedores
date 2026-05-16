import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TratamientoTable } from "../components/TratamientoTable"
import { Button } from "@/shared/components/ui/button"
import { TratamientoSheet } from "../components/TratamientoSheet"
import { useTratamientos } from "../hooks/useTratamientos"
import { routes } from "@/app/router/routes"
import type { TratamientoCompleto } from "../types"
import type { TratamientoSchema } from "../forms/tratamiento.schema"

export const Tratamientos = () => {
  const navigate = useNavigate()
  const { data, loading, createTratamiento, updateTratamiento, deleteTratamiento } = useTratamientos()

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<TratamientoCompleto | null>(null)

  if (loading) return <p>Cargando...</p>

  const handleCreate = () => {
    setSelected(null)
    setOpen(true)
  }

  const handleEdit = (trat: TratamientoCompleto) => {
    setSelected(trat)
    setOpen(true)
  }

  const handleView = (uuid: string) => {
    navigate(routes.editarTratamientos, { state: { uuid } })
  }

  const handleSubmit = async (formData: TratamientoSchema) => {
    if (selected) {
      await updateTratamiento(selected.uuid, formData)
    } else {
      await createTratamiento(formData)
    }
    setOpen(false)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Tratamientos</h1>
        <Button onClick={handleCreate}>Crear tratamiento</Button>
      </div>

      <TratamientoTable
        data={data}
        onDelete={deleteTratamiento}
        onEdit={handleEdit}
        onView={handleView}
      />

      <TratamientoSheet
        open={open}
        onOpenChange={setOpen}
        selected={selected}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  )
}