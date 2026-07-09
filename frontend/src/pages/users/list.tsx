import { ArrowLeft, Plus, Search } from "lucide-react"
import Layout from "../layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import useList from "./hooks/list"
import { Link } from "react-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Pagination from "@/components/custom/pagination"
import ListUserRow from "./components/list-user-row"

export default function UserList() {
  const { register, totalItems, users, getValues, setValue, totalPages } =
    useList()
  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] bg-muted/30 px-4 py-8">
        <div className="container mx-auto">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Ir a inicio
            </Link>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
              <p className="mt-1 text-muted-foreground">
                Gestiona todos los usuarios de tu organizacion
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/users/add">
                <Plus className="mr-2 h-5 w-5" />
                Agregar Usuario
              </Link>
            </Button>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex flex-col gap-4 py-2 sm:items-center sm:justify-between lg:flex-row">
                <div>
                  <CardTitle className="text-xl">Lista de Usuarios</CardTitle>
                  <CardDescription className="mt-1">
                    {totalItems} usuarios coinciden con el criterio de busqueda
                  </CardDescription>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...register("search")}
                      placeholder="Buscar por nombre o cliente..."
                      className="bg-background pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="font-semibold">Nombre</TableHead>
                      <TableHead className="font-semibold">Username</TableHead>
                      <TableHead className="font-semibold">Rol</TableHead>
                      <TableHead className="font-semibold">Estado</TableHead>
                      <TableHead className="font-semibold">
                        Fecha de creación
                      </TableHead>
                      <TableHead className="font-semibold">Opciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {totalItems === 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <span className="block w-full py-2 text-center">
                            No se encotranron usuarios
                          </span>
                        </TableCell>
                      </TableRow>
                    )}
                    {users.map((user) => (
                      <ListUserRow key={user.id} user={user} />
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  paginationSize={5}
                  totalItems={totalItems}
                  totalPages={totalPages}
                  page={getValues("page") as number}
                  onPageChange={(page) => setValue("page", page)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
