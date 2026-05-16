import { useState } from "react"
import { useMedicamentos } from "../hooks/useMedicamentos"
import { MedicamentoTable } from "../components/MedicamentoTable"
import { Button } from "@/shared/components/ui/button"
import { MedicamentoSheet } from "../components/MedicamentoSheet"

export const Medicamentos = () => {
  const {
    data,
    loading,
    saving,
    createMedicamento,
    updateMedicamento,
    deleteMedicamento,
  } = useMedicamentos()

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<any | null>(null)

  if (loading) return <p>Cargando...</p>

  const handleCreate = () => {
    setSelected(null)
    setOpen(true)
  }

  const handleEdit = (med: any) => {
    setSelected(med)
    setOpen(true)
  }

  const handleSubmit = async (formData: any) => {
    if (selected) {
      await updateMedicamento(selected.id, formData)
    } else {
      await createMedicamento(formData)
    }

    setOpen(false)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Medicamentos</h1>
        <Button onClick={handleCreate}>
          Crear medicamento
        </Button>
      </div>

      <MedicamentoTable
        data={data}
        onDelete={deleteMedicamento}
        onEdit={handleEdit}
      />

      <MedicamentoSheet
        open={open}
        onOpenChange={setOpen}
        selected={selected}
        onSubmit={handleSubmit}
        loading={saving}
      />
    </div>
  )
}
