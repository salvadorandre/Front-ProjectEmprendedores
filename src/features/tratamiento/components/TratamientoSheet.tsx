import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet"
import { TratamientoForm } from "./TratamientoForm"
import { TratamientoSchema } from "../forms/tratamiento.schema"

interface TratamientoSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selected: any | null
  onSubmit: (data: TratamientoSchema) => void
  loading: boolean
}

export const TratamientoSheet = ({
  open,
  onOpenChange,
  selected,
  onSubmit,
  loading,
}: TratamientoSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-100 overflow-y-auto p-5">
        <SheetHeader>
          <SheetTitle className="text-lg">
            {selected ? "Editar medicamento" : "Crear medicamento"}
          </SheetTitle>
          <SheetDescription className="text-sm">
            {selected
              ? "Modifica los datos del medicamento"
              : "Agrega un nuevo medicamento al sistema"}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          <TratamientoForm
            key={selected?.id || "create"}
            onSubmit={onSubmit}
            defaultValues={selected}
            loading={loading}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
