import type { FieldErrors } from "react-hook-form"

export default function SpanError(props: SpanErrorProps) {
  const errorFieldSplited = props.errorField.split(".")

  let message = props.errors[errorFieldSplited.shift() as string]

  while (errorFieldSplited.length) {
    const key = errorFieldSplited.shift() as string
    message = message?.[key]
  }

  if (message)
    return <span className="text-destructive">{message.message as string}</span>

  return null
}

type SpanErrorProps = {
  errorField: string
  errors: FieldErrors
}
