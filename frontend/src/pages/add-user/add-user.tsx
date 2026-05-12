import Layout from "@/common/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import InputPassword from "./components/input-password";

export default function AddUser() {
  return <Layout>
    <div className="container mx-auto flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Agrega un nuevo usuario</CardTitle>
          <CardDescription>Este usuario podrá realizar acciones en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Nombre completo</Label>
                <Input />
              </div>
              <div className="grid gap-2">
                <Label>Nombre de usuario</Label>
                <Input />
              </div>
              <div className="grid gap-2">
                <InputPassword label="Contraseña" />
              </div>
              <div className="grid gap-2">
                <InputPassword label="Confirmar Contraseña" />
              </div>
              <div className="grid gap-2">
                <Label>Rol</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleciona el rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="consultor">Consultor</SelectItem>
                      <SelectItem value="operador">Operador</SelectItem>
                      <SelectItem value="administrador">Administrador</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <CardFooter className="px-0">
                <Button className="w-full">
                  <UserPlus /> Agregar usuario
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </Layout>
}
