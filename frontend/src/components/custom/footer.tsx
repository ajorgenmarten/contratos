import { FileText } from "lucide-react"
import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-bold">Contratos App</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Gestiona tus contratos y usuarios de forma sencilla y eficiente.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Usuarios</h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/users"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Ver usuarios
              </Link>
              <Link
                to="/users/add"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Agregar usuario
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Contratos</h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/contracts"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Ver contratos
              </Link>
              <Link
                to="/contracts/add"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Agregar contrato
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Ajustes</h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/profile/perfil"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Perfil
              </Link>
              <Link
                to="/profile/tema"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cambiar tema
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Contratos. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
