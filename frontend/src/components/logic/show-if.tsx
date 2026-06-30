import useAuthStore from "@/stores/auth.store"
import type { PropsWithChildren } from "react"

export default function ShowIf(props: ShowIfProps) {
  const authStore = useAuthStore()

  if (props.allow?.includes(authStore.user?.role || "")) return props.children

  return null
}

type ShowIfProps = {
  allow?: string[]
} & PropsWithChildren
