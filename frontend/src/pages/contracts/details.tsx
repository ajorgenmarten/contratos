import { Link } from "react-router"
import Layout from "../layout"
import { ArrowLeft, FileText } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LabelRequired from "@/components/custom/label-required"
import { Input } from "@/components/ui/input"
import useContractsDetails from "./hooks/use-contracts-details"
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"

export default function ContractDetail() {
  const { contract } = useContractsDetails()

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <Link
              to="/contracts"
              className="text-muttext-muted-foreground inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Ir a listado
            </Link>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="rounded-t-lg border-b pb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Detalles de contrato</CardTitle>
              <CardDescription className="text-base">
                Este contrato no es editable
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <LabelRequired text="Nombre del cliente" />
                  <Input disabled value={contract?.clientName || ""} />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <LabelRequired text="Denominación del cliente" />
                    <Input
                      disabled
                      value={contract?.clientDenomination || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <LabelRequired text="Categoría del cliente" />
                    <Input value={contract?.clientCategory || ""} disabled />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <LabelRequired text="Número de acuerdo" />
                    <Input value={contract?.agreementNumber || ""} disabled />
                  </div>
                  <div className="space-y-2">
                    <LabelRequired text="Fecha de acuerdo" />
                    <Input
                      value={
                        contract?.agreementDate
                          ? format(contract.agreementDate, "PPP")
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <LabelRequired text="Nacionalidad de la compañía" />
                  <Input disabled value={contract?.nationalityCompany || ""} />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <LabelRequired text="Número de contrato" />
                    <Input disabled value={contract?.contractNumber || ""} />
                  </div>
                  <div className="space-y-2">
                    <LabelRequired text="Fecha de contrato" />
                    <Input
                      disabled
                      value={
                        contract?.contractDate
                          ? format(contract.contractDate, "PPP")
                          : ""
                      }
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <LabelRequired text="Tipo de contrato" />
                    <Input
                      disabled
                      value={contract?.ContractDetails?.name || ""}
                    />
                  </div>

                  {contract?.ContractDetails?.haveType && (
                    <div className="space-y-2">
                      <LabelRequired text="Tipo de producto" isRequired />
                      <Input disabled value={contract.contractType} />
                    </div>
                  )}

                  {contract?.ContractDetails?.haveContainer && (
                    <div className="space-y-2">
                      <LabelRequired text="Tipo de contenedor" />
                      <Input disabled value={contract.contractContainer} />
                    </div>
                  )}

                  <div className="space-y-2">
                    <LabelRequired text="Vigencia de contrato" />
                    <Input
                      disabled
                      value={
                        contract?.contractValidity
                          ? format(contract.contractValidity, "PPP")
                          : ""
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {contract?.Supplements?.map((s, i) => (
                    <Card key={`supplement-${s.id}-${i}`} className="p-4">
                      <div className="space-y-2">
                        <LabelRequired text="Número de suplemento" />
                        <Input disabled value={s.supplementNumber} />
                      </div>

                      <div className="space-y-2">
                        <LabelRequired text="Objeto de suplemento" />
                        <Textarea disabled value={s.supplementObject} />
                      </div>

                      <div className="space-y-2">
                        <LabelRequired text="Fecha de suplemento" />
                        <Input
                          disabled
                          value={format(s.supplementDate, "PPP")}
                        />
                      </div>

                      <div className="space-y-2">
                        <LabelRequired text="Vigencia del suplemento" />
                        <Input
                          disabled
                          value={format(s.supplementValidity, "PPP")}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
