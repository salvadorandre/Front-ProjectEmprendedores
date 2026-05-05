import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet"
import { MedicamentoForm } from "./MedicamentoForm"
import { MedicamentoSchema } from "../forms/medicamento.schema"

interface MedicamentoSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selected: any | null
  onSubmit: (data: MedicamentoSchema) => void
  loading: boolean
}

export const MedicamentoSheet = ({
  open,
  onOpenChange,
  selected,
  onSubmit,
  loading,
}: MedicamentoSheetProps) => {
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
          <MedicamentoForm
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
