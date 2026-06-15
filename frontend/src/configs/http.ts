import { AxiosError, create, type InternalAxiosRequestConfig } from "axios"
import useAuthStore from "../stores/auth.store"
import envs from "./envs"

const http = create({
  baseURL: envs.BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-APP-CLIENT": "web:v1",
  },
})

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState()

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default http
