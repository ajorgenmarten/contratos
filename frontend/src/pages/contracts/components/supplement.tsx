import LabelRequired from "@/components/custom/label-required"
import SpanError from "@/components/custom/span-error"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDownIcon, X } from "lucide-react"
import type {
  FieldArrayWithId,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"
import type { AddContractFormData } from "../hooks/add"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"

export default function Supplement({
  index,
  remove,
  register,
  formState,
  setValue,
  field,
  watch,
}: SupplementProps) {
  const supplementDateWatched = watch(`supplements.${index}.supplementDate`)
  const supplementValidityWatched = watch(
    `supplements.${index}.supplementValidity`
  )

  const onOpenChangeSupplementDate = () => {
    setValue(`supplements.${index}.supplementDate`, supplementDateWatched, {
      shouldValidate: true,
    })
  }
  const onOpenCangeSupplementValidity = () => {
    setValue(
      `supplements.${index}.supplementValidity`,
      supplementValidityWatched,
      {
        shouldValidate: true,
      }
    )
  }

  return (
    <Card key={`supplement-${index}-${field.id}`} className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-lg text-primary">Suplemento {index + 1}</Label>
        <Button variant="ghost" onClick={() => remove(index)}>
          <X />
        </Button>
      </div>

      <div className="space-y-2">
        <LabelRequired text="Número de suplemento" isRequired />
        <Input {...register(`supplements.${index}.supplementNumber`)} />
        <SpanError
          errorField={`supplements.${index}.supplementNumber`}
          errors={formState.errors}
        />
      </div>

      <div className="space-y-2">
        <LabelRequired text="Objeto de suplemento" isRequired />
        <Textarea {...register(`supplements.${index}.supplementObject`)} />
        <SpanError
          errorField={`supplements.${index}.supplementObject`}
          errors={formState.errors}
        />
      </div>

      <div className="space-y-2">
        <LabelRequired text="Fecha de suplemento" isRequired />
        <Popover onOpenChange={onOpenChangeSupplementDate}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex w-full items-center justify-between"
            >
              {supplementDateWatched ? (
                format(supplementDateWatched, "PPP")
              ) : (
                <span>Selecciona la fecha</span>
              )}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={supplementDateWatched}
              onSelect={(value) =>
                setValue(
                  `supplements.${index}.supplementDate`,
                  value ?? supplementDateWatched
                )
              }
            />
          </PopoverContent>
        </Popover>
        <SpanError
          errorField={`supplements.${index}.supplementDate`}
          errors={formState.errors}
        />
      </div>

      <div className="space-y-2">
        <LabelRequired text="Vigencia del suplemento" isRequired />
        <Popover onOpenChange={onOpenCangeSupplementValidity}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex w-full items-center justify-between"
            >
              {supplementValidityWatched ? (
                format(supplementValidityWatched, "PPP")
              ) : (
                <span>Selecciona la fecha</span>
              )}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={supplementValidityWatched}
              onSelect={(value) =>
                setValue(
                  `supplements.${index}.supplementValidity`,
                  value ?? supplementValidityWatched
                )
              }
            />
          </PopoverContent>
        </Popover>
        <SpanError
          errorField={`supplements.${index}.supplementValidity`}
          errors={formState.errors}
        />
      </div>
    </Card>
  )
}

type SupplementProps = {
  watch: UseFormWatch<AddContractFormData>
  setValue: UseFormSetValue<AddContractFormData>
  field: FieldArrayWithId
  index: number
  remove: (index: number) => void
  register: UseFormRegister<AddContractFormData>
  formState: FormState<AddContractFormData>
}
