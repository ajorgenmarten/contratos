import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/types/interfaces"

interface AuthStoreProps {
  user: User | null
  accessToken: string | null
}

interface AuthStoreActions {
  setUser(data: User | null): void
  setAccessToken(data: string | null): void
  clear(): void
}

const authStore = create<AuthStoreProps & AuthStoreActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (data) => set({ user: data }),
      setAccessToken: (data) => set({ accessToken: data }),
      clear: () => set({ user: null, accessToken: null }),
    }),
    { name: "auth" }
  )
)

export default authStore
