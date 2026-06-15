import { Link } from "react-router"
import Layout from "../layout"
import { ArrowLeft, Hash, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useList from "./hooks/list"
import { format } from "date-fns"

export default function ContractsList() {
  const { register, totalItems, contracts } = useList()

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
              <h1 className="text-3xl font-bold tracking-tight">Contratos</h1>
              <p className="mt-1 text-muted-foreground">
                Gestiona todos los contratos de tu organizacion
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/contracts/add">
                <Plus className="mr-2 h-5 w-5" />
                Agregar Contrato
              </Link>
            </Button>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex flex-col gap-4 py-2 sm:items-center sm:justify-between lg:flex-row">
                <div>
                  <CardTitle className="text-xl">Lista de Contratos</CardTitle>
                  <CardDescription className="mt-1">
                    {totalItems} contratos registrados en el sistema
                  </CardDescription>
                </div>
                <div className="flex flex-row gap-2">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nombre o cliente..."
                      className="bg-background pl-10"
                    />
                  </div>
                  <div className="relative w-full sm:w-72">
                    <Hash className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por número de contrato"
                      className="bg-background pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {totalItems === 0 && <span>No hay contratos en el sistema</span>}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="font-semibold">
                        Tipo de contrato
                      </TableHead>
                      <TableHead className="font-semibold">
                        Nombre del cliente
                      </TableHead>
                      <TableHead className="font-semibold">
                        Tipo de cliente
                      </TableHead>
                      <TableHead className="font-semibold">
                        Denominación de cliente
                      </TableHead>
                      <TableHead className="font-semibold">
                        Nacionalidad de la compañía
                      </TableHead>
                      <TableHead className="font-semibold">
                        Fecha de acuerdo
                      </TableHead>
                      <TableHead className="font-semibold">
                        Tipo de producto
                      </TableHead>
                      <TableHead className="font-semibold">
                        Tipo de contenedor
                      </TableHead>
                      <TableHead className="font-semibold">
                        Fecha de contrato
                      </TableHead>
                      <TableHead className="font-semibold">
                        Vigencia de contrato
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell>{contract.ContractDetails?.name}</TableCell>
                        <TableCell>{contract.clientName}</TableCell>
                        <TableCell>{contract.clientCategory}</TableCell>
                        <TableCell>{contract.clientDenomination}</TableCell>
                        <TableCell>{contract.nationalityCompany}</TableCell>
                        <TableCell>
                          {format(contract.agreementDate, "PPP")}
                        </TableCell>
                        <TableCell>
                          {contract.ContractDetails?.haveType
                            ? contract.contractType
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {contract.ContractDetails?.haveContainer
                            ? contract.contractContainer
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {format(contract.contractDate, "PPP")}
                        </TableCell>
                        <TableCell>
                          {format(contract.contractValidity, "PPP")}
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
