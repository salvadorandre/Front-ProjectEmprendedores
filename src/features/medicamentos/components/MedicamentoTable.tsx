import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/table"

type Medicamento = {
  id: number
  name: string
  description: string
}

interface MedicamentoTableProps {
  data: Medicamento[]
  onDelete: (id: number) => void
  onEdit: (med: Medicamento) => void
}

export const MedicamentoTable = ({
  data,
  onDelete,
  onEdit,
}: MedicamentoTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((med) => (
          <TableRow key={med.id}>
            <TableCell>{med.name}</TableCell>
            <TableCell>{med.description}</TableCell>
            <TableCell className="flex gap-2">
              <button
                className="text-blue-500"
                onClick={() => onEdit(med)}
              >
                Editar
              </button>

              <button
                className="text-red-500"
                onClick={() => onDelete(med.id)}
              >
                Eliminar
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}