import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/shared/components/ui/table"
import type { TratamientoCompleto } from "../types"

interface TratamientoTableProps {
  data: TratamientoCompleto[]
  onDelete: (uuid: string) => void
  onEdit: (trat: TratamientoCompleto) => void
  onView: (uuid: string) => void
}

export const TratamientoTable = ({ data, onDelete, onEdit, onView }: TratamientoTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((trat) => (
          <TableRow key={trat.uuid}>
            <TableCell>{trat.titulo}</TableCell>
            <TableCell>{trat.descripcion}</TableCell>
            <TableCell className="flex gap-2">
              <button className="text-blue-500" onClick={() => onEdit(trat)}>
                Editar
              </button>
              <button className="text-red-500" onClick={() => onDelete(trat.uuid)}>
                Eliminar
              </button>
              <button className="text-green-500" onClick={() => onView(trat.uuid)}>
                Medicamentos
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}