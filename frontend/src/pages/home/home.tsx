import { Button } from "@/components/ui/button"
import Layout from "../layout"
import { Link } from "react-router"
import { ArrowRight, FileText, Users } from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ShowIf from "@/components/logic/show-if"

// Esto de usar el layout asi con react-router, está mal,
// pero lo voy a hacer así para terminar rápido
export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Gestiona tus contratos de forma{" "}
            <span className="text-primary">sencilla</span>
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            Una plataforma completa para administrar usuarios y contratos.
            Organiza, busca y mantén el control de toda tu documentación en un
            solo lugar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ShowIf allow={["CONSULTOR", "OPERADOR"]}>
              <Button asChild size="lg">
                <Link to="/contracts">
                  Ver contratos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ShowIf>
            <Button asChild variant="outline" size="lg">
              <Link to="/users">Ver usuarios</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Administra los usuarios de tu sistema. Agrega, edita y organiza
                la información de cada persona de manera eficiente.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Gestión de Contratos</CardTitle>
              <CardDescription>
                Crea y gestiona contratos fácilmente. Mantén un registro
                organizado de todos los documentos importantes.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </div>
    </Layout>
  )
}
