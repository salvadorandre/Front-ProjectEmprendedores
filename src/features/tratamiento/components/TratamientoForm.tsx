import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { tratamientoSchema, TratamientoSchema } from "../forms/tratamiento.schema"

const defaultFormValues: TratamientoSchema = {
  titulo: "",
  descripcion: "",
}

interface TratamientoFormProps {
  onSubmit: (data: TratamientoSchema) => void
  defaultValues?: Partial<TratamientoSchema> | null
  loading: boolean
}

export const TratamientoForm = ({ onSubmit, defaultValues, loading }: TratamientoFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<TratamientoSchema>({
    resolver: zodResolver(tratamientoSchema),
    defaultValues: defaultValues || defaultFormValues,
  })

  return (
    <form className="space-y-3 mt-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label>Nombre</Label>
        <Controller
          name="titulo"
          control={control}
          render={({ field }) => (
            <Input placeholder="Nombre del tratamiento" {...field} />
          )}
        />
        {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Descripción</Label>
        <Controller
          name="descripcion"
          control={control}
          render={({ field }) => (
            <Textarea placeholder="Descripción del tratamiento" {...field} />
          )}
        />
        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  )
}