import { AvatarFallback, Avatar as AvatarShad } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavigationMenuItem, NavigationMenuList, NavigationMenu, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { FileText, List, Lock, LogOut, Mountain, User2, UserPlus } from "lucide-react";
import { Link } from 'react-router'
import { appInfo } from "../const/app-info";

export default function Navbar() {
  return <nav className="flex items-center justify-between h-16 px-4 bg-background">
    <div className="flex items-center gap-2">
      <FileText className="h-6 w-6 text-blue-600" />
      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        {appInfo.name}
      </h1>
      <Badge variant="outline" className="ml-2">
        v{appInfo.version}
      </Badge>
    </div>

    <Navigation />
  </nav>
}

function Navigation() {
  return <NavigationMenu>
    <NavigationMenuList>
      <UsersMenu />
      <ContractsMenu />
      <Avatar />
    </NavigationMenuList>
  </NavigationMenu>

}

function UsersMenu() {
  return <NavigationMenuItem>
    <NavigationMenuTrigger className="dark:text-white">Usuarios</NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="w-72">
        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
          <Link to="/users/add"><UserPlus /> Agregar usuario</Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
          <Link to="/users"><List /> Listado de usuarios</Link>
        </NavigationMenuLink>
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
}

function ContractsMenu() {
  return <NavigationMenuItem>
    <NavigationMenuTrigger className="dark:text-white">Contratos</NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="w-72">
        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
          <Link to="/contracts/add"><UserPlus /> Agregar contrato</Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
          <Link to="/contracts"><List /> Listado de contratos</Link>
        </NavigationMenuLink>
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
}

function Avatar() {
  const toggleTheme = () => {
    const root = document.querySelector('#root')
    if (root?.classList.contains('dark'))
      root?.classList.remove('dark')
    else
      root?.classList.add('dark')
  }
  return <NavigationMenuItem>
    <NavigationMenuTrigger className="dark:text-white">
      <AvatarShad>
        <AvatarFallback>
          <User2 />
        </AvatarFallback>
      </AvatarShad>
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="w-72">
        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
          <Button variant="ghost">
            <Lock /> Cambiar contraseña
          </Button>
        </NavigationMenuLink>
        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
          <Button variant="ghost" onClick={toggleTheme}>
            <Mountain /> Cambiar tema
          </Button>
        </NavigationMenuLink>
        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
          <Button variant="ghost" className="hover:border-rose-200 hover:text-rose-400">
            <LogOut /> Salir
          </Button>
        </NavigationMenuLink>
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
}
