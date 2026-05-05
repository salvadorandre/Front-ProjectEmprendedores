import { useMedicamentos } from "../hooks/useMedicamentos"
import { MedicamentoTable } from "../components/MedicamentoTable"
import { Button } from "@/shared/components/ui/button"
import { MedicamentoSheet } from "../components/MedicamentoSheet"

export const Medicamentos = () => {
  const { data, loading, deleteMedicamento } = useMedicamentos()

  if (loading) return <p>Cargando...</p>

  return (
    <div className="p-4">
      <MedicamentoSheet/>
      
      <MedicamentoTable
        data={data}
        onDelete={deleteMedicamento}
      />
    </div>
  )
}