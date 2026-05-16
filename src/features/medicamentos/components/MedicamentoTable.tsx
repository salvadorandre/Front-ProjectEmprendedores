import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

type Medicamento = {
  id: number
  name: string
  description: string
  imageUrl?: string
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
          <TableHead>Imagen</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="py-10 text-center text-sm text-[#517891]/70"
            >
              No hay medicamentos registrados.
            </TableCell>
          </TableRow>
        ) : data.map((med) => (
          <TableRow key={med.id}>
            <TableCell>
              {med.imageUrl ? (
                <img
                  src={med.imageUrl}
                  alt={med.name}
                  className="size-14 rounded-lg border border-[#90D5FF]/50 object-cover shadow-sm"
                />
              ) : (
                <div className="flex size-14 items-center justify-center rounded-lg border border-dashed border-[#90D5FF] bg-[#90D5FF]/10 text-xs font-semibold text-[#517891]/70">
                  Img
                </div>
              )}
            </TableCell>
            <TableCell className="font-semibold">{med.name}</TableCell>
            <TableCell className="max-w-[420px] whitespace-normal text-[#517891]/75">
              {med.description}
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <button
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#90D5FF]/60 bg-[#90D5FF]/15 px-3 text-xs font-semibold text-[#517891] transition-colors hover:bg-[#90D5FF]/35"
                  onClick={() => onEdit(med)}
                >
                  <Pencil className="size-3.5" />
                  Editar
                </button>

                <button
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                  onClick={() => onDelete(med.id)}
                >
                  <Trash2 className="size-3.5" />
                  Eliminar
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
