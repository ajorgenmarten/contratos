import http from "@/configs/http"
import { RoleType } from "@/types/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import z from "zod"

const userSchema = z
  .object({
    name: z.string().min(1, "El nombre de usuario es requerido"),
    username: z
      .string()
      .min(1, "El username es requerido")
      .regex(
        /^[a-zA-Z0-9_@]+$/,
        "El nombre de usuario no puede contener espacios"
      ),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
      .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
      .regex(/\d/, "La contraseña debe tener al menos un número")
      .regex(/[^a-zA-Z0-9]/),
    repassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    role: z.enum(RoleType, "Seleccione un rol para el usuario"),
    active: z.boolean().default(true),
  })
  .refine(
    (schema) => {
      return schema.password == schema.repassword
    },
    { path: ["repassword"], message: "Las contraseñas deben coincidir" }
  )

export type UserAddData = z.infer<typeof userSchema>

export default function useAdd() {
  const { register, formState, setValue, reset, handleSubmit } = useForm({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: {
      name: "",
      username: "",
      password: "",
      role: undefined,
      active: true,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await http.post("/v1/users/add", data)
      reset()
      toast.success("Usuario creado!")
    } catch (error) {
      toast.error((error as AxiosError).response?.data?.message)
    }
  })

  return { register, formState, setValue, reset, onSubmit }
}
