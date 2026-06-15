import LabelRequired from "@/components/custom/label-required"
import {
  type Control,
  type FormState,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form"
import type { AddContractFormData } from "../hooks/add"
import { Input } from "@/components/ui/input"
import SpanError from "@/components/custom/span-error"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import type {
  ContractContainer,
  ContractDetails,
  ContractType,
} from "@/types/interfaces"
import { useEffect, useState } from "react"
import SelectInput from "./select"

export default function ContractDataInput({
  register,
  formState,
  watch,
  setValue,
  contractContainer,
  contractDetails,
  contractType,
  control,
}: ContractDataInputProps) {
  const [showContractProduct, setShowContractProduct] = useState(false)
  const [showContractContainer, setShowContractContainer] = useState(false)
  const contractDateWatched = watch("contractDate")
  const contractValidityWatched = watch("contractValidity")

  const contractTypeIdWatched = watch("contractTypeId")

  useEffect(() => {
    const contractDetail = contractDetails.find(
      (detail) => detail.id === contractTypeIdWatched
    )
    setShowContractContainer(contractDetail?.haveContainer ?? false)
    setShowContractProduct(contractDetail?.haveType ?? false)
  }, [contractTypeIdWatched, contractDetails])

  const onOpenChangeContractDate = () =>
    setValue("contractDate", contractDateWatched, {
      shouldTouch: true,
      shouldValidate: true,
    })
  const onSelectContractDate = (date: Date) =>
    setValue("contractDate", date, { shouldTouch: true, shouldValidate: true })

  const onSelectContractValidity = (date: Date) =>
    setValue("contractValidity", date, {
      shouldTouch: true,
      shouldValidate: true,
    })

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <LabelRequired
          text="Número de contrato"
          htmlFor="contractNumber"
          isRequired
        />
        <Input {...register("contractNumber")} />
        <SpanError errorField="contractNumber" errors={formState.errors} />
      </div>

      <div className="space-y-2">
        <LabelRequired
          text="Fecha de contrato"
          htmlFor="contractDate"
          isRequired
        />
        <Popover onOpenChange={onOpenChangeContractDate}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex w-full items-center justify-between"
            >
              {contractDateWatched && format(contractDateWatched, "PPP")}
              {!contractDateWatched && "Seleccione una fecha"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={contractDateWatched}
              onSelect={onSelectContractDate}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <LabelRequired text="Tipo de contrato" />
        <SelectInput
          control={control}
          fieldName="contractTypeId"
          placeholder="Seleccione un tipo de contrato"
          values={contractDetails.map((detail) => ({
            value: detail.id,
            label: detail.name,
          }))}
        />
        <SpanError errorField="contractTypeId" errors={formState.errors} />
      </div>

      {showContractProduct && (
        <div className="space-y-2">
          <LabelRequired text="Tipo de producto" isRequired />
          <SelectInput
            control={control}
            fieldName="contractType"
            placeholder="Seleccione un tipo de producto"
            values={Object.keys(contractType ?? {}).map((ct) => ({
              value: ct,
              label: ct,
            }))}
          />
          <SpanError errorField="contractType" errors={formState.errors} />
        </div>
      )}

      {showContractContainer && (
        <div className="space-y-2">
          <LabelRequired text="Tipo de contenedor" />
          <SelectInput
            control={control}
            fieldName="contractContainer"
            placeholder="Seleccione un tipo de contenedor"
            values={Object.keys(contractContainer ?? {}).map((ct) => ({
              value: ct,
              label: ct,
            }))}
          />
          <SpanError errorField="contractContainer" errors={formState.errors} />
        </div>
      )}

      <div className="space-y-2">
        <LabelRequired text="Vigencia de contrato" />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex w-full items-center justify-between"
            >
              {contractValidityWatched && (
                <span>{format(contractValidityWatched, "PPP")}</span>
              )}
              {!contractValidityWatched && <span>Vigencia de contrato</span>}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={contractValidityWatched}
              onSelect={onSelectContractValidity}
            />
          </PopoverContent>
        </Popover>
        <SpanError errorField="contractValidity" errors={formState.errors} />
      </div>
    </div>
  )
}

type ContractDataInputProps = {
  register: UseFormRegister<AddContractFormData>
  formState: FormState<AddContractFormData>
  watch: UseFormWatch<AddContractFormData>
  setValue: UseFormSetValue<AddContractFormData>
  contractType: ContractType
  contractContainer: ContractContainer
  contractDetails: ContractDetails[]
  control: Control<AddContractFormData>
}
