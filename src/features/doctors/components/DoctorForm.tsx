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
    <div className="w-full rounded-lg border border-[#90D5FF]/50 bg-white p-6 shadow-[0_20px_60px_rgba(81,120,145,0.16)] sm:p-8">
      <div className="mx-auto mb-6 flex items-center justify-center w-full rounded-lg border bg-white px-5 py-3">
        <img
          src="/logoh.png"
          alt="Logo"
          className="h-20 w-auto object-contain"
        />
      </div>

      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-3xl font-bold text-[#517891]">
          Registrarse como doctor
        </h1>
        <p className="text-sm text-[#517891]/70">
          Completa los datos para activar tu perfil profesional.
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-dashed border-[#90D5FF] bg-[#90D5FF]/10 p-4 text-center lg:hidden">
        <img
          src="/suggest.jfif"
          alt="Mascota de marca dando una sugerencia"
          className="mx-auto h-32 w-full rounded-lg object-contain"
        />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label className="text-[#517891]">Email</Label>
          <Input
            className="h-10 border-[#90D5FF]/70 bg-white focus-visible:border-[#517891] focus-visible:ring-[#90D5FF]/40"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-[#517891]">Contrasena</Label>
          <Input
            className="h-10 border-[#90D5FF]/70 bg-white focus-visible:border-[#517891] focus-visible:ring-[#90D5FF]/40"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-[#517891]">Especialidad</Label>
          <Input
            className="h-10 border-[#90D5FF]/70 bg-white focus-visible:border-[#517891] focus-visible:ring-[#90D5FF]/40"
            {...register("specialty")}
          />
          {errors.specialty && (
            <p className="text-sm text-red-500">
              {errors.specialty.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-[#517891]">Numero de colegiado</Label>
          <Input
            className="h-10 border-[#90D5FF]/70 bg-white focus-visible:border-[#517891] focus-visible:ring-[#90D5FF]/40"
            {...register("license")}
          />
          {errors.license && (
            <p className="text-sm text-red-500">
              {errors.license.message}
            </p>
          )}
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <Button
          className="h-10 w-full bg-[#517891] text-white hover:bg-[#416376]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar perfil"}
        </Button>
      </form>

      <Separator className="my-6 bg-[#90D5FF]/40" />

      <p className="text-center text-sm text-[#517891]/70">
        Podras editar esta informacion mas adelante
      </p>
    </div>
  )
}
