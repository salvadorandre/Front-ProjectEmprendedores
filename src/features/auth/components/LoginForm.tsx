import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Separator } from "@/shared/components/ui/separator"

import { useAuth } from "@/features/auth/hooks/useAuth"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginSchema } from "@/features/auth/forms/login.schema"

export const LoginForm = () => {
  const { login, loading, error } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchema) => {
    await login(data)
  }

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md space-y-4">

        <h1 className="text-xl font-bold text-center">
          Inicio de sesión
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="doctor@mail.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Contraseña</Label>
            <Input
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>

        <Separator />

        <Button variant="outline" className="w-full">
          Continuar con Google
        </Button>
      </div>
    </div>
  )
}