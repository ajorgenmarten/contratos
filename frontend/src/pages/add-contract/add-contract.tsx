import DatePicker from "@/common/components/date-picker";
import Layout from "@/common/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddContract() {
  return <Layout>
    <div className="container mx-auto flex items-center justify-center px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agende un nuevo contrato</CardTitle>
          <CardDescription>Introduzca los datos cuidadosamente</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>Nombre del cliente</Label>
                  <Input />
                </div>
                <div className="grid gap-2">
                  <Label>Denominación</Label>
                  <DenominationSelect />
                </div>
                <div className="grid gap-2">
                  <Label>Número de acuerdo</Label>
                  <Input />
                </div>
                <div className="grid gap-2">
                  <Label>Fecha de acuerdo</Label>
                  <DatePicker />
                </div>
                <div className="grid gap-2">
                  <Label>Categoria del cliente</Label>
                  <CategorySelect />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>Número de acuerdo</Label>
                  <Input />
                </div>

              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </Layout>
}

function DenominationSelect() {
  return <Select>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Denominaciones" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="MIPYME">MIPYME</SelectItem>
        <SelectItem value="CNA">CNA</SelectItem>
        <SelectItem value="EMPRESA_ESTATAL">Empresa estatal</SelectItem>
        <SelectItem value="EMPRESA_MIXTA">Empresa mixta</SelectItem>
        <SelectItem value="EMPRESA_100_EXTRANJERA">Empresa capital 100% extranjero</SelectItem>
        <SelectItem value="EMPRESA_100_CUBANA">Empresa capital 100% cubano</SelectItem>
        <SelectItem value="CCS">CCS</SelectItem>
        <SelectItem value="UBPC">UBPC</SelectItem>
        <SelectItem value="OTRAS_FORMAS">Otras formas</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
}

function CategorySelect() {
  return <Select>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Categorias" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="CLIENTE">Cliente</SelectItem>
        <SelectItem value="PROVEEDOR">Proveedor</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
}
