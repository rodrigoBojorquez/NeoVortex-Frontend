import axios from "axios";
import {useAuthStore} from "@/core/stores/authStore.ts";
import {refreshToken} from "@/core/services/authService.ts";


export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  withCredentials: true
})

// Agregar el token en cada petición
apiClient.interceptors.request.use((config) => {
  const store = useAuthStore()

  if (store.token) config.headers.Authorization = `Bearer ${store.token}`

  return config
}, (err) => {
  return Promise.reject(err)
})


// Interceptar errores 401 y refrescar el token en caso de expiracion
apiClient.interceptors.response.use(
  res => res,
  async err => {
    const store = useAuthStore()
    const ogRequest = err.config

    if (err.response?.stxatus === 401 && !ogRequest._retry) {
      ogRequest._retry = true

      try {
        const result = await refreshToken()
        console.log('Token refreshed')
        ogRequest.headers.Authorization = `Bearer ${result.token}`
        return apiClient(ogRequest)

      } catch (e) {
        console.error(e)
        store.setToken(null)
        store.setAuth(false)
      }
    }
    return Promise.reject(err)
  }
)
