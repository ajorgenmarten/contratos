import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputPassword(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword)
  return <Field>
    <FieldLabel>{props.label}</FieldLabel>
    <ButtonGroup>
      <Input {...props} type={showPassword ? 'text' : 'password'} />
      <Button onClick={toggleShowPassword} type="button" variant="outline">
        {showPassword ? <EyeOff /> : <Eye />}
      </Button>
    </ButtonGroup>
  </Field>
}
