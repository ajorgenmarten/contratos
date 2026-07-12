import { Link } from "react-router"
import Layout from "../layout"
import { ArrowLeft, Trash } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useSessions from "./hooks/use-sessions"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Sessions() {
  const { sessions, deleteSession } = useSessions()
  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Ir a perfil
            </Link>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex flex-col gap-4 py-2 sm:items-center sm:justify-between lg:flex-row">
                <div>
                  <CardTitle className="text-xl">Sessiones abiertas</CardTitle>
                  <CardDescription className="mt-1">
                    Tienes {sessions.length} sessiones abiertas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="font-semibold">
                        Id de sesión
                      </TableHead>
                      <TableHead className="font-semibold">Fecha</TableHead>
                      <TableHead className="font-semibold">Opciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>{format(s.createdAt, "PPP")}</TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="text-destructive/40 hover:text-destructive"
                              >
                                <Trash />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogTitle>
                                ¿Estás seguro que deseas eliminar esta sesión?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Si elimina esta sesión, tendrá que volver a
                                iniciar sesión en el equipo que la estaba usando
                              </AlertDialogDescription>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  variant="destructive"
                                  onClick={() => deleteSession(s.id)}
                                >
                                  Borrar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
