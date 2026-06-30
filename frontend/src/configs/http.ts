import axios, {
  AxiosError,
  create,
  type InternalAxiosRequestConfig,
} from "axios"
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

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const path = "/v1/auth/login"

    if (path === error.config?.url) throw error

    if (error.response?.status === 401) {
      try {
        const response = await axios.get(
          envs.BACKEND_URL + "/v1/auth/refresh-token",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-APP-CLIENT": "web:v1",
            },
          }
        )

        useAuthStore.setState({ accessToken: response.data.accessToken })

        return await http(error.config)
      } catch (err) {
        if ((err as AxiosError).status === 401)
          useAuthStore.setState({ accessToken: null, user: null })
      }
    }
  }
)

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
