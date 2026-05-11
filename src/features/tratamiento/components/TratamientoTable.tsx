import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/table"
import type { Tratamiento } from "../types"

interface TratamientoTableProps {
  data: Tratamiento[]
  onDelete: (id: number) => void
  onEdit: (trat: Tratamiento) => void
  onView:(id:number) => void
}

export const TratamientoTable = ({
  data,
  onDelete,
  onEdit,
  onView,
}: TratamientoTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((trat) => (
          <TableRow key={trat.id}>
            <TableCell>{trat.id}</TableCell>
            <TableCell>{trat.name}</TableCell>
            <TableCell>{trat.description}</TableCell>
            <TableCell className="flex gap-2">
              <button
                className="text-blue-500"
                onClick={() => onEdit(trat)}
              >
                Editar
              </button>

              <button
                className="text-red-500"
                onClick={() => onDelete(trat.id)}
              >
                Eliminar
              </button>

              <button
                className="text-green-500"
                onClick={()=> onView(trat.id)}>
                Medicamentos
                
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}