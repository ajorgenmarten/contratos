import http from "@/configs/http"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import z from "zod"

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "La contraseña es requerida"),
    newPassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
      .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
      .regex(/\d/, "La contraseña debe tener al menos un número")
      .regex(
        /[^a-zA-Z0-9]/,
        "La contraseña debe tener al menos un caracter especial"
      ),
    rePassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  })
  .refine((o) => o.newPassword === o.rePassword, {
    path: ["rePassword"],
    error: "Las contraseñas deben ser iguales",
  })

export default function useProfile() {
  const { formState, register, handleSubmit } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "all",
  })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    http
      .put("v1/auth/change-password", {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      })
      .then(() => {
        toast.success("Contraseña cambiada")
        navigate(-1)
      })
      .catch(() => {
        toast.error("Ha ocurrido un error")
      })
  })

  return { formState, register, onSubmit }
}
