import { FileText } from "lucide-react"
import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <div className="flex flex-col gap-3 text-center">
            <Link to="/" className="flex items-center justify-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-bold">Contratos App</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Gestiona tus contratos y usuarios de forma sencilla y eficiente.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Contratos. Hecho por Alejandro Jorgen
            Martén
          </p>
        </div>
      </div>
    </footer>
  )
}
