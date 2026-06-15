import { Label } from "../ui/label"
import { Label as LabelPrimitive } from "radix-ui"

export default function LabelRequired({
  text,
  isRequired,
  ...props
}: LabelRequiredProps) {
  return (
    <Label {...props}>
      {text}
      {isRequired && <span className="text-destructive">*</span>}
    </Label>
  )
}

type LabelRequiredProps = {
  isRequired?: boolean
  text: string
} & React.ComponentProps<typeof LabelPrimitive.Root>
