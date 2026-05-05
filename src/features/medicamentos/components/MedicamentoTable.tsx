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

export const MedicamentoTable = ({
  data,
  onDelete,
}: {
  data: Medicamento[]
  onDelete: (id: number) => void
}) => {
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
                onClick={() => console.log("editar", med.id)}
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