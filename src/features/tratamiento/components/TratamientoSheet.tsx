import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet"
import { TratamientoForm } from "./TratamientoForm"
import type { TratamientoSchema } from "../forms/tratamiento.schema"
import type { TratamientoCompleto } from "../types"

interface TratamientoSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selected: TratamientoCompleto | null   // tipado real, no any
  onSubmit: (data: TratamientoSchema) => void
  loading: boolean
}

export const TratamientoSheet = ({ open, onOpenChange, selected, onSubmit, loading }: TratamientoSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-100 overflow-y-auto p-5">
        <SheetHeader>
          <SheetTitle className="text-lg">
            {selected ? "Editar Tratamiento" : "Crear Tratamiento"}
          </SheetTitle>
          <SheetDescription className="text-sm">
            {selected ? "Modifica los datos del Tratamiento" : "Agrega un nuevo Tratamiento al sistema"}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          <TratamientoForm
            key={selected?.uuid || "create"}    // uuid, no id
            onSubmit={onSubmit}
            defaultValues={selected ? { titulo: selected.titulo, descripcion: selected.descripcion } : null}
            loading={loading}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}