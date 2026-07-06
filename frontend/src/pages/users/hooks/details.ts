import http from "@/configs/http"
import { RoleType, type User } from "@/types/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import z from "zod"

const updateSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1, "El nombre es requerido para modificar el usuario"),
  role: z.enum(RoleType, "Seleccione un rol válido"),
})

const changePassword = z
  .object({
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
    userId: z.string().uuid(),
  })
  .refine(
    (o) => {
      return o.password === o.repassword
    },
    { path: ["repassword"], error: "Las contraseñas deben ser iguales" }
  )

export default function useDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [editMode, setEditMode] = useState(false)
  const { setValue, formState, register, handleSubmit } = useForm({
    resolver: zodResolver(updateSchema),
    mode: "all",
  })
  const {
    setValue: setValueChangePassword,
    formState: formStateChangePassword,
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePassword,
  } = useForm({
    resolver: zodResolver(changePassword),
    mode: "all",
  })

  const fetchData = (id: string) => {
    return http
      .get("/v1/users/" + id)
      .then((res) => {
        setUser(res.data.user)
        setValue("name", res.data.user.name)
        setValue("role", res.data.user.role)
        setValue("userId", res.data.user.id)
        setValueChangePassword("userId", res.data.user.id)
      })
      .catch((err: AxiosError) => {
        if (err.status === 404) {
          toast.error("Usuario no encontrado")
          navigate("/")
          return
        }

        toast.error("Ha ocurrido un error interno")
        navigate("/")
      })
  }

  const onSubmitChangePassword = handleSubmitChangePassword(async (o) => {
    const response = await http.put("/v1/users/reset-password", {
      userId: o.userId,
      newPassword: o.password,
    })
    toast.success(response.data.message)
    navigate(-1)
  })

  const onSubmitUpdateUser = handleSubmit(async (o) => {
    const response = await http.put("/v1/users/update", {
      userId: o.userId,
      name: o.name,
      role: o.role,
    })
    toast.success(response.data.message)
    navigate(-1)
  })

  const toggleEditMode = () => {
    if (editMode) {
      setValue("name", user?.name || "", {
        shouldTouch: true,
        shouldValidate: true,
      })
      setValue("role", user?.role || ("" as RoleType), {
        shouldTouch: true,
        shouldValidate: true,
      })
    }

    setEditMode(!editMode)
  }

  useEffect(() => {
    if (!params.id) return navigate("/")
    fetchData(params.id as string)
  }, [])

  return {
    user,
    editMode,
    toggleEditMode,
    formState,
    register,
    setValue,
    registerChangePassword,
    formStateChangePassword,
    setValueChangePassword,
    onSubmitChangePassword,
    onSubmitUpdateUser,
  }
}
