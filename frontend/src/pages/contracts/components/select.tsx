import { useController, type Control } from "react-hook-form"
import type { AddContractFormData } from "../hooks/add"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import type { ChangeEventHandler } from "react"

export default function SelectInput(props: SelectProps) {
  const { field } = useController({
    name: props.fieldName as keyof AddContractFormData,
    control: props.control,
  })

  const onChange: ChangeEventHandler<HTMLSelectElement, HTMLSelectElement> = (
    event
  ) => {
    if (props.onChange) props.onChange(event.target.value)

    field.onChange(event.target.value)
  }

  return (
    <NativeSelect
      className="w-full"
      value={field.value as string}
      onChange={onChange}
      onBlur={field.onBlur}
    >
      <NativeSelectOption value="">{props.placeholder}</NativeSelectOption>
      {props.values.map((item) => (
        <NativeSelectOption value={item.value}>{item.label}</NativeSelectOption>
      ))}
    </NativeSelect>
  )
}

type SelectProps = {
  values: { value: string; label: string }[]
  control: Control<AddContractFormData>
  fieldName: keyof AddContractFormData
  placeholder: string
  onChange?: (value: string) => void
}
