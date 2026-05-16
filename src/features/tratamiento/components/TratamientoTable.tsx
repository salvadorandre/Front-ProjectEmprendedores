import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/table"
import { ClipboardList, Pencil, Trash2 } from "lucide-react"
import type { TratamientoCompleto } from "../types"

interface TratamientoTableProps {
  data: TratamientoCompleto[]
  onDelete: (uuid: string) => void
  onEdit: (trat: TratamientoCompleto) => void
  onView: (uuid: string) => void
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
          <TableHead>Titulo</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className="py-10 text-center text-sm text-[#517891]/70"
            >
              No hay tratamientos registrados.
            </TableCell>
          </TableRow>
        ) : data.map((trat) => (
          <TableRow key={trat.uuid}>
            <TableCell className="font-semibold">{trat.titulo}</TableCell>
            <TableCell className="max-w-[520px] whitespace-normal text-[#517891]/75">
              {trat.descripcion}
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap justify-end gap-2">
                <button
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#90D5FF]/60 bg-[#90D5FF]/15 px-3 text-xs font-semibold text-[#517891] transition-colors hover:bg-[#90D5FF]/35"
                  onClick={() => onEdit(trat)}
                >
                  <Pencil className="size-3.5" />
                  Editar
                </button>
                <button
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                  onClick={() => onDelete(trat.uuid)}
                >
                  <Trash2 className="size-3.5" />
                  Eliminar
                </button>
                <button
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#517891]/30 bg-[#517891] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#416376]"
                  onClick={() => onView(trat.uuid)}
                >
                  <ClipboardList className="size-3.5" />
                  Medicamentos
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
