import LabelRequired from "@/components/custom/label-required"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import useLogin from "./hooks/login"
import SpanError from "@/components/custom/span-error"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function Login() {
  const { register, formState, onSubmit } = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-2">
              <LabelRequired text="Nombre de usuario" />
              <Input {...register("username")} />
              <SpanError errors={formState.errors} errorField="username" />
            </div>
            <div className="space-y-2">
              <LabelRequired text="Contraseña" />
              <div className="relative flex">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword && <EyeOff />}
                  {!showPassword && <Eye />}
                </Button>
              </div>
              <SpanError errors={formState.errors} errorField="password" />
            </div>
            <CardAction>
              <Button disabled={formState.isSubmitting || !formState.isValid}>
                Entrar <ArrowRight />
              </Button>
            </CardAction>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
