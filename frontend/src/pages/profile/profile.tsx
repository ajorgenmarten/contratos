import { Link } from "react-router"
import Layout from "../layout"
import { ArrowLeft, Eye, KeySquare, Users } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import authStore from "@/stores/auth.store"
import LabelRequired from "@/components/custom/label-required"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import useProfile from "./hooks/use-profile"
import SpanError from "@/components/custom/span-error"

export default function Profile() {
  const { user } = authStore()
  const { register, onSubmit, formState } = useProfile()
  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <Link
              to="/"
              className="text-muttext-muted-foreground inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Ir a inicio
            </Link>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="rounded-t-lg border-b pb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Datos de tu perfil</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Solo puede visualizar los datos de su perfil, y modificar su
                contraseña, cualquier otro cambio debe contactar con el
                administrador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <LabelRequired text="Nombre" />
                  <Input disabled value={user?.name} />
                </div>
                <div className="space-y-2">
                  <LabelRequired text="Nombre de usuario" />
                  <Input disabled value={user?.username} />
                </div>
                <div className="space-y-2">
                  <LabelRequired text="Rol" />
                  <Input disabled value={user?.role} />
                </div>
                <div className="space-y-3">
                  <LabelRequired text="Estado" />
                  <div className="flex items-center gap-2">
                    <Switch disabled checked={user?.active} />
                    {user?.active ? "Habilitado" : "Deshabilitado"}
                  </div>
                </div>
                <div className="space-y-2">
                  <LabelRequired text="Fecha de creación" />
                  <Input
                    disabled
                    value={user?.createdAt && format(user.createdAt, "PPP")}
                  />
                </div>
                <div className="space-y-2 space-x-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>
                        <KeySquare />
                        Cambiar contraseña
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Cambiar contraseña</AlertDialogTitle>
                      <AlertDialogDescription>
                        Establezca una nueva contraseña para su usuario
                      </AlertDialogDescription>
                      <form className="space-y-4" onSubmit={onSubmit}>
                        <div className="space-y-2">
                          <LabelRequired text="Contraseña actual" />
                          <Input {...register("oldPassword")} />
                          <AlertDialogDescription>
                            <SpanError
                              errorField="oldPassword"
                              errors={formState.errors}
                            />
                          </AlertDialogDescription>
                        </div>
                        <div className="space-y-2">
                          <LabelRequired text="Nueva contraseña" />
                          <Input {...register("newPassword")} />
                          <AlertDialogDescription>
                            <SpanError
                              errorField="newPassword"
                              errors={formState.errors}
                            />
                          </AlertDialogDescription>
                        </div>
                        <div className="space-y-2">
                          <LabelRequired text="Confirmar nueva contraseña" />
                          <Input {...register("rePassword")} />
                          <AlertDialogDescription>
                            <SpanError
                              errorField="rePassword"
                              errors={formState.errors}
                            />
                          </AlertDialogDescription>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <Button>Aceptar</Button>
                        </AlertDialogFooter>
                      </form>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button variant="outline" asChild>
                    <Link to="sessions">
                      <Eye /> Ver sessiones abiertas
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
