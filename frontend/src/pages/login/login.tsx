import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return <main className="min-h-screen flex items-center justify-center">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Inicia sesión con tu cuenta</CardTitle>
        <CardDescription>Introduce tu nombre de usuario para iniciar</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Nombre de usuario</Label>
              <Input />
            </div>
            <div className="grid gap-2">
              <Label>Contraseña</Label>
              <Input type="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full" type="submit">Iniciar sesión</Button>
      </CardFooter>
    </Card>
  </main>
}
