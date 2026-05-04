import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Separator } from "@/shared/components/ui/separator"

export const LoginForm = () => {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md space-y-4">
        
        <h1 className="text-xl font-bold text-center">
          Inicio de sesión
        </h1>

        <form className="space-y-4">
          
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="correo@ejemplo.com" required />
          </div>

          <div className="space-y-2">
            <Label>Contraseña</Label>
            <Input type="password" required/>
          </div>

          <Button className="w-full" type="submit">
            Iniciar sesión
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