import { Link } from "react-router"
import {
  ChevronDown,
  Eye,
  FilePlus,
  FileText,
  LogOut,
  Palette,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Contratos</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {/* Usuarios Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                <Users className="h-4 w-4" />
                Usuarios
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link to="/users" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Ver usuarios
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/users/add" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Agregar usuario
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Contratos Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                <FileText className="h-4 w-4" />
                Contratos
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link to="/contracts" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Ver contratos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contracts/add" className="flex items-center gap-2">
                  <FilePlus className="h-4 w-4" />
                  Agregar contrato
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Ajustes Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                <Settings className="h-4 w-4" />
                Ajustes
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/ajustes/perfil" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/ajustes/tema" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Cambiar tema
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
