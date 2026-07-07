import { Link } from "react-router"
import {
  ChevronDown,
  Eye,
  FilePlus,
  FileText,
  Laptop2,
  LogOut,
  Moon,
  Palette,
  Settings,
  SunDim,
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
import ShowIf from "../logic/show-if"
import { useAuthContext } from "@/contexts/auth/auth.context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { useState } from "react"
import { useTheme } from "../theme-provider"

export default function Navbar() {
  const { setTheme, theme } = useTheme()
  const [showDialog, setShowDialog] = useState(false)
  const [showTheme, setShowTheme] = useState(false)
  const { logout } = useAuthContext()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Contratos</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {/* Usuarios Dropdown */}
          <ShowIf allow={["ADMINISTRADOR"]}>
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
          </ShowIf>

          {/* Contratos Dropdown */}
          <ShowIf allow={["CONSULTOR", "OPERADOR"]}>
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
                <ShowIf allow={["OPERADOR"]}>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/contracts/add"
                      className="flex items-center gap-2"
                    >
                      <FilePlus className="h-4 w-4" />
                      Agregar contrato
                    </Link>
                  </DropdownMenuItem>
                </ShowIf>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowIf>

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
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowTheme(true)}>
                <Palette className="h-4 w-4" />
                Cambiar tema
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setShowDialog(true)}
              >
                <LogOut className="h-4 w-4" />
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
      <AlertDialog open={showDialog} onOpenChange={(o) => setShowDialog(o)}>
        <AlertDialogContent>
          <AlertDialogTitle>Cerrar sesión</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro que desea cerrar sesión?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant={"destructive"} onClick={() => logout()}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showTheme} onOpenChange={(o) => setShowTheme(o)}>
        <AlertDialogContent>
          <AlertDialogTitle className="text-center">
            Cambiar de tema
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Cambia de tema para el que agrade mas a tu vista
            <span className="flex justify-center">
              Presiona (Esc) para salir
            </span>
          </AlertDialogDescription>
          <div className="flex items-center justify-center gap-6">
            <Button
              className="h-14 w-14"
              variant={theme === "light" ? "outline" : "ghost"}
              onClick={() => setTheme("light")}
            >
              <SunDim className="size-12 text-yellow-400" />
            </Button>
            <Button
              className="h-14 w-14"
              variant={theme === "dark" ? "outline" : "ghost"}
              onClick={() => setTheme("dark")}
            >
              <Moon className="size-10" />
            </Button>
            <Button
              className="h-14 w-14"
              variant={theme === "system" ? "outline" : "ghost"}
              onClick={() => setTheme("system")}
            >
              <Laptop2 className="size-10 text-gray-500" />
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  )
}
