import {
  ArrowLeft,
  Calendar,
  Check,
  KeySquare,
  Pen,
  Users,
  X,
} from "lucide-react"
import Layout from "../layout"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import LabelRequired from "@/components/custom/label-required"
import { Input } from "@/components/ui/input"
import useDetails from "./hooks/details"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { RoleType } from "@/types/interfaces"
import SpanError from "@/components/custom/span-error"
import { useState } from "react"

export default function UserDetails() {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const {
    user,
    editMode,
    toggleEditMode,
    register,
    formState,
    setValue,
    registerChangePassword,
    formStateChangePassword,
    onSubmitChangePassword,
    onSubmitUpdateUser,
  } = useDetails()
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

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Detalles</h1>
              <p className="mt-1 text-muted-foreground">
                Detalles sobre el usuario {user?.name}
              </p>
            </div>
            {!editMode ? (
              <Button size="lg" onClick={() => toggleEditMode()}>
                <Pen className="mr-2 h-5 w-5" />
                Editar Usuario
              </Button>
            ) : (
              <Button
                variant="destructive"
                size="lg"
                onClick={() => toggleEditMode()}
              >
                <X className="mr-2 h-5 w-5" />
                Cancelar
              </Button>
            )}
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="rounded-t-lg border-b pb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="py-8">
              <form className="space-y-6" onSubmit={onSubmitUpdateUser}>
                <div className="space-y-2">
                  <LabelRequired htmlFor="name" text="Nombre del usuario" />
                  <Input {...register("name")} disabled={!editMode} />
                  <SpanError errorField="name" errors={formState.errors} />
                </div>

                <div className="space-y-2">
                  <LabelRequired htmlFor="username" text="Alias de usuario" />
                  <Input value={user?.username || ""} disabled />
                </div>

                <div className="space-y-2">
                  <LabelRequired htmlFor="role" text="Rol de usuario" />
                  <NativeSelect
                    className="w-full"
                    {...(editMode ? {} : { value: user?.role })}
                    onChange={(v) =>
                      setValue("role", v.target.value as RoleType, {
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    disabled={!editMode}
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

                <div className="space-y-2">
                  <LabelRequired htmlFor="createdAt" text="Fecha de creación" />
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-between"
                    disabled
                  >
                    {user ? format(user.createdAt, "PPP") : ""}
                    <Calendar />
                  </Button>
                </div>

                <CardFooter className="justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowChangePassword(true)}
                  >
                    <KeySquare /> Cambiar contraseña
                  </Button>
                  {editMode && (
                    <Button>
                      <Check /> Editar
                    </Button>
                  )}
                </CardFooter>
              </form>
              <AlertDialog
                open={showChangePassword}
                onOpenChange={(o) => setShowChangePassword(o)}
              >
                <AlertDialogContent>
                  <AlertDialogTitle>
                    Cambiar contraseña de usuario
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Se le cambiará la contraseña al usuario {user?.name}
                  </AlertDialogDescription>
                  <form onSubmit={onSubmitChangePassword}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <LabelRequired text="Contraseña" isRequired />
                        <Input
                          autoComplete="off"
                          {...registerChangePassword("password")}
                        />
                        <AlertDialogDescription>
                          <SpanError
                            errorField="password"
                            errors={formStateChangePassword.errors}
                          />
                        </AlertDialogDescription>
                      </div>
                      <div className="space-y-2">
                        <LabelRequired text="Confirmar contraseña" isRequired />
                        <Input
                          autoComplete="off"
                          {...registerChangePassword("repassword")}
                        />
                        <AlertDialogDescription>
                          <SpanError
                            errorField="repassword"
                            errors={formStateChangePassword.errors}
                          />
                        </AlertDialogDescription>
                      </div>
                    </div>
                    <AlertDialogFooter className="mt-6">
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <Button type="submit">Aceptar</Button>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
