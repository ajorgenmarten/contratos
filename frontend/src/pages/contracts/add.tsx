import { Link } from "react-router"
import Layout from "../layout"
import { ArrowLeft, ChevronDownIcon, FileText, Plus, Trash } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import LabelRequired from "@/components/custom/label-required"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import useAddContract from "./hooks/add"
import type { ContractContainer, ContractType } from "@/types/interfaces"
import { format } from "date-fns"
import SpanError from "@/components/custom/span-error"
import Supplement from "./components/supplement"
import { Textarea } from "@/components/ui/textarea"
import ContractDataInput from "./components/contract-data-input"
import SelectInput from "./components/select"

const clientDenominations: { value: string; label: string }[] = [
  { value: "MIPYME", label: "MIPYME" },
  { value: "CNA", label: "CNA" },
  { value: "EMPRESA_ESTATAL", label: "Empresa estatal" },
  { value: "EMPRESA_100_EXTRANJERA", label: "Empresa 100% extranjera" },
  { value: "EMPRESA_100_CUBANA", label: "Empresa 100% cubana" },
  { value: "EMPRESA_MIXTA", label: "Empresa mixta" },
  { value: "CCS", label: "CCS" },
  { value: "UBPC", label: "UBPC" },
  { value: "OTRAS_FORMAS", label: "Otras formas" },
]

const clientCategories: { value: string; label: string }[] = [
  { value: "Cliente", label: "Cliente" },
  { value: "Proveedor", label: "Proveedor" },
]

export default function ContractAdd() {
  const {
    contractDetails,
    contractTypes,
    contractContainer,
    register,
    setValue,
    getValues,
    watch,
    formState,
    fields,
    remove,
    append,
    onSubmit,
    control,
    reset,
  } = useAddContract()

  const agreementDate = watch("agreementDate")

  const onOpenChangeAgreementDate = () => {
    setValue("agreementDate", getValues("agreementDate"), {
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const addSupplement = () => {
    append({
      supplementNumber: "",
      supplementDate: new Date(),
      supplementObject: "",
      supplementValidity: new Date(),
    })
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <Link
              to="/contracts"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Ir a contratos
            </Link>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="rounded-t-lg border-b pb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Agregar Nuevo Contrato</CardTitle>
              <CardDescription className="text-base">
                Completa los campos para registrar un nuevo contrato en el
                sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <form className="space-y-6" onSubmit={onSubmit}>
                {/* Nombre del cliente */}
                <div className="space-y-2">
                  <LabelRequired
                    htmlFor="clientName"
                    text="Nombre del cliente"
                    isRequired
                  />
                  <Input {...register("clientName")} />
                  <SpanError
                    errorField="clientName"
                    errors={formState.errors}
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Denominación del cliente */}
                  <div className="space-y-2">
                    <LabelRequired text="Denominación del cliente" isRequired />
                    <SelectInput
                      control={control}
                      fieldName="clientDenomination"
                      placeholder="Seleccione la denominacion del cliente"
                      values={clientDenominations}
                    />
                    <SpanError
                      errorField="clientDenomination"
                      errors={formState.errors}
                    />
                  </div>
                  {/* Tipo de cliente */}
                  <div className="space-y-2">
                    <LabelRequired text="Categoría del cliente" isRequired />
                    <SelectInput
                      control={control}
                      fieldName="clientCategory"
                      placeholder="Seleccione el tipo de cliente"
                      values={clientCategories}
                    />
                    <SpanError
                      errorField="clientCategory"
                      errors={formState.errors}
                    />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Número de acuerdo */}
                  <div className="space-y-2">
                    <LabelRequired text="Número de acuerdo" isRequired />
                    <Input {...register("agreementNumber")} />
                    <SpanError
                      errorField="agreementNumber"
                      errors={formState.errors}
                    />
                  </div>
                  {/* Fecha de acuerdo */}
                  <div className="space-y-2">
                    <LabelRequired text="Fecha del acuerdo" isRequired />
                    <Popover onOpenChange={onOpenChangeAgreementDate}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex w-full items-center justify-between"
                        >
                          {agreementDate ? (
                            format(agreementDate, "PPP")
                          ) : (
                            <span>Selecciona la fecha</span>
                          )}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={agreementDate}
                          onSelect={(value) =>
                            setValue("agreementDate", value ?? agreementDate)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <SpanError
                      errorField="agreementDate"
                      errors={formState.errors}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <LabelRequired text="Nacionalidad de la compañía" />
                  <Input {...register("nationalityCompany")} />
                  <SpanError
                    errorField="nationalityCompany"
                    errors={formState.errors}
                  />
                </div>

                <ContractDataInput
                  control={control}
                  formState={formState}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  contractContainer={contractContainer as ContractContainer}
                  contractDetails={contractDetails}
                  contractType={contractTypes as ContractType}
                />

                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-end">
                    <Button type="button" onClick={addSupplement}>
                      <Plus /> Agregar suplemento
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <Supplement
                      key={`supplement-${index}-${field.id}`}
                      index={index}
                      field={field}
                      formState={formState}
                      register={register}
                      watch={watch}
                      remove={remove}
                      setValue={setValue}
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <LabelRequired text="Observaciones" />
                  <Textarea rows={4} {...register("observations")} />
                  <SpanError
                    errorField="observations"
                    errors={formState.errors}
                  />
                </div>

                <div className="flex gap-2 space-y-2">
                  <Button disabled={formState.isSubmitting || !formState.isValid}>
                    <Plus /> Agregar contrato
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => reset()}
                  >
                    <Trash /> Resetear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
