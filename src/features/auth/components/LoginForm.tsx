import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Separator } from "@/shared/components/ui/separator"

import { useAuth } from "@/features/auth/hooks/useAuth"
import { GoogleLogin } from "@react-oauth/google"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginSchema } from "@/features/auth/forms/login.schema"

export const LoginForm = () => {
  const { login, loginWithGoogle, loading, error } = useAuth()

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
    <div className="animate-fade w-full rounded-lg border border-[#90D5FF]/50 bg-white p-6 shadow-[0_20px_60px_rgba(81,120,145,0.16)] sm:p-8">
      <div className="flex items-center justify-center mx-auto mb-6 w-fit rounded-lg border px-5 py-3">
        <img
          src="/logoh.png"
          alt="Logo"
          className="h-20 w-auto object-contain"
        />
      </div>

      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-3xl font-bold text-[#517891]">
          Inicio de sesion
        </h1>
        <p className="text-sm text-[#517891]/70">
          Accede para administrar pacientes, tratamientos y medicamentos para tu clinica.
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-dashed border-[#90D5FF] bg-[#90D5FF]/10 p-4 text-center lg:hidden">
        <img
          src="/greeting.jfif"
          alt="Mascota de marca saludando"
          className="mx-auto h-32 w-full rounded-lg object-contain"
        />
      </div>

      <form className="animate-fade space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label className="text-[#517891]">Email</Label>
          <Input
            className="h-10 border-[#90D5FF]/70 bg-white focus-visible:border-[#517891] focus-visible:ring-[#90D5FF]/40"
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
          {loading ? "Cargando..." : "Iniciar sesion"}
        </Button>
      </form>

      <Separator className="my-6 bg-[#90D5FF]/40" />

      <p className="text-center text-sm text-[#517891]/70">
        No tienes cuenta?{" "}
        <a
          href="/register"
          className="font-semibold text-[#517891] underline underline-offset-4"
        >
          Registrate aqui
        </a>
      </p>

      <div className="mt-5 flex justify-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (
              credentialResponse.credential
            ) {
              loginWithGoogle(
                credentialResponse.credential
              )
            }
          }}
          onError={() => {
            console.log("Google login failed")
          }}
        />
      </div>
    </div>
  )
}
