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
}

export const TratamientoTable = ({
  data,
  onDelete,
  onEdit,
}: TratamientoTableProps) => {
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
        {data.map((trat) => (
          <TableRow key={trat.id}>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}