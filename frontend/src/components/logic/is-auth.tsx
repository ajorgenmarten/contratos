import useAuthStore from "@/stores/auth.store"
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router"

export default function IsAuth(props: PropsWithChildren) {
  const authStore = useAuthStore()

  if (!authStore.user) return <Navigate to="/login" />

  return props.children
}
