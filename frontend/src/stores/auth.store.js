import { create } from "zustand";
import { persist } from "zustand/middleware";
const authStore = create()(persist((set) => ({
    user: null,
    accessToken: null,
    setUser: (data) => set({ user: data }),
    setAccessToken: (data) => set({ accessToken: data }),
    clear: () => set({ user: null, accessToken: null }),
}), { name: "auth" }));
export default authStore;
