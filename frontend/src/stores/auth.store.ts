import { create } from "zustand"
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

const authStore = create<AuthStoreProps & AuthStoreActions>((set) => ({
  user: null,
  accessToken: null,
  setUser: (data) => set({ user: data }),
  setAccessToken: (data) => set({ accessToken: data }),
  clear: () => set({ user: null, accessToken: null }),
}))

export default authStore
