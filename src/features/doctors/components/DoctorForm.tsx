import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Separator } from "@/shared/components/ui/separator"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { doctorSchema, DoctorSchema } from "@/features/doctors/forms/doctor.schema"

export const DoctorForm = ({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (data: DoctorSchema) => void
  loading: boolean
  error: string | null
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorSchema>({
    resolver: zodResolver(doctorSchema),
  })

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md space-y-4">

      <h1 className="text-xl font-bold text-center">
        Completar perfil de doctor
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

        {/* Nombre */}
        <div className="space-y-2">
          <Label>Nombre completo</Label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Especialidad */}
        <div className="space-y-2">
          <Label>Especialidad</Label>
          <Input {...register("specialty")} />
          {errors.specialty && (
            <p className="text-sm text-red-500">
              {errors.specialty.message}
            </p>
          )}
        </div>

        {/* Colegiado */}
        <div className="space-y-2">
          <Label>Número de colegiado</Label>
          <Input {...register("license")} />
          {errors.license && (
            <p className="text-sm text-red-500">
              {errors.license.message}
            </p>
          )}
        </div>

        {/* Error general */}
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar perfil"}
        </Button>
      </form>

      <Separator />

      <p className="text-sm text-center text-muted-foreground">
        Podrás editar esta información más adelante
      </p>
    </div>
  )
}