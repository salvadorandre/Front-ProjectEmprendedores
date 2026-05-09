import { useState } from "react"
import { TratamientoTable } from "../components/TratamientoTable"
import { Button } from "@/shared/components/ui/button"
import { TratamientoSheet } from "../components/TratamientoSheet"
import { useTratamientos } from "../hooks/useTratamientos"

export const Tratamientos = () => {
  const {
    data,
    loading,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento,
  } = useTratamientos()

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<any | null>(null)

  if (loading) return <p>Cargando...</p>

  const handleCreate = () => {
    setSelected(null)
    setOpen(true)
  }

  const handleEdit = (trat: any) => {
    setSelected(trat)
    setOpen(true)
  }

  const handleSubmit = async (formData: any) => {
    if (selected) {
      await updateTratamiento(selected.id, formData)
    } else {
      await createTratamiento(formData)
    }

    setOpen(false)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Tratamientos</h1>
        <Button onClick={handleCreate}>
          Crear tratamiento
        </Button>
      </div>

      <TratamientoTable
        data={data}
        onDelete={deleteTratamiento}
        onEdit={handleEdit}
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