import { Link } from "react-router"
import Layout from "../layout"
import { ArrowLeft, Plus, Trash, Users } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LabelRequired from "@/components/custom/label-required"
import { Input } from "@/components/ui/input"
import SpanError from "@/components/custom/span-error"
import useAdd from "./hooks/add"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import type { RoleType } from "@/types/interfaces"
import { Button } from "@/components/ui/button"

export default function UsersAdd() {
  const { register, formState, setValue, reset, onSubmit } = useAdd()
  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <Link
              to="/users"
              className="text-muttext-muted-foreground inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Ir a listado
            </Link>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="rounded-t-lg border-b pb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Agregar Nuevo Usuario</CardTitle>
              <CardDescription className="text-base">
                Completa los campos para registrar un nuevo usuario en el
                sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="py-8">
              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <LabelRequired
                    htmlFor="name"
                    text="Nombre del usuario"
                    isRequired
                  />
                  <Input {...register("name")} />
                  <SpanError errorField="name" errors={formState.errors} />
                </div>

                <div className="space-y-2">
                  <LabelRequired
                    htmlFor="username"
                    text="Alias de usuario"
                    isRequired
                  />
                  <Input {...register("username")} />
                  <SpanError errorField="username" errors={formState.errors} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <LabelRequired
                      htmlFor="name"
                      text="Contraseña"
                      isRequired
                    />
                    <Input {...register("password")} />
                    <SpanError
                      errorField="password"
                      errors={formState.errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <LabelRequired
                      htmlFor="repassword"
                      text="Confirmar contraseña"
                      isRequired
                    />
                    <Input {...register("repassword")} />
                    <SpanError
                      errorField="repassword"
                      errors={formState.errors}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <LabelRequired
                    text="Seleccione el rol"
                    isRequired
                    htmlFor="role"
                  />

                  <NativeSelect
                    className="w-full"
                    onChange={(e) =>
                      setValue("role", e.target.value as RoleType, {
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  >
                    <NativeSelectOption value="">
                      Seleccione un rol
                    </NativeSelectOption>
                    <NativeSelectOption value={"ADMINISTRADOR"}>
                      Administrador
                    </NativeSelectOption>
                    <NativeSelectOption value={"CONSULTOR"}>
                      Consultor
                    </NativeSelectOption>
                    <NativeSelectOption value={"OPERADOR"}>
                      Operador
                    </NativeSelectOption>
                  </NativeSelect>
                  <SpanError errorField="role" errors={formState.errors} />
                </div>

                <div className="flex gap-2 space-y-2">
                  <Button disabled={formState.isSubmitting || !formState.isValid}>
                    <Plus /> Agregar usuario
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => reset()}
                  >
                    <Trash /> Resetear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
