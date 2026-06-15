import { Button } from "@/components/ui/button"
import { House } from "lucide-react"
import { Link } from "react-router"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-muted">
      404 | Página no encontrada
      <Link to="/">
        <Button>
          <House />
          Ir a inicio
        </Button>
      </Link>
    </div>
  )
}
