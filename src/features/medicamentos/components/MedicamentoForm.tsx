import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { medicamentoSchema, MedicamentoSchema } from "../forms/medicamento.schema"

const defaultFormValues: MedicamentoSchema = {
  name: "",
  description: "",
  imageUrl: "",
}

interface MedicamentoFormProps {
  onSubmit: (data: MedicamentoSchema) => void
  defaultValues?: Partial<MedicamentoSchema> | null
  loading: boolean
}

export const MedicamentoForm = ({
  onSubmit,
  defaultValues,
  loading,
}: MedicamentoFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicamentoSchema>({
    resolver: zodResolver(medicamentoSchema),
    defaultValues: defaultValues || defaultFormValues,
  })

  return (
    <form className="space-y-3 mt-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label>Nombre</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input placeholder="Nombre del medicamento" {...field} />
          )}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Descripción</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea placeholder="Descripción del medicamento" {...field} />
          )}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Imagen (URL)</Label>
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
          )}
        />
        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  )
}