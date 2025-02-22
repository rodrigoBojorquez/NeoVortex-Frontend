import {apiClient} from "@/core/common/configuration/axiosClient.ts";
import type {AuthResponse, LoginRequest, RegisterRequest} from "@/core/types/auth.ts";
import {useToastMutation} from "@/core/common/composables/serviceHooks.ts";
import {useMutation} from "@tanstack/vue-query";
import {useAuthStore} from "@/core/stores/authStore.ts"

const loginUser = async (request: LoginRequest): Promise<AuthResponse> => {
  const {data} = await apiClient.post('/auth/login', request)
  return data
}

const registerUser = async (request: LoginRequest): Promise<AuthResponse> => {
  const {data} = await apiClient.post('/auth/register', request)
  return data
}

export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const res = await apiClient.post<AuthResponse>('/auth/refresh-token')

    const store = useAuthStore()
    store.setAuth(true)
    store.setToken(res.data.token)

    return res.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

const logout = async () => {
  await apiClient.post('/auth/logout')
}

export function useLogin() {
  return useToastMutation<AuthResponse, LoginRequest>(loginUser, {
    mutationKey: ["auth", "login"]
  }, {
    loading: "Iniciando sesión ⏳",
    success: "Hola de nuevo! 😃",
  })
}

export function useRefreshToken() {
  const store = useAuthStore()

  return useMutation({
    mutationFn: refreshToken,
    mutationKey: ["auth", "refresh-token"],
    onSuccess: (res) => {
      store.setAuth(true)
      store.setToken(res.token)
    },
    onError: (err) => {
      console.error(err)
      store.setToken(null)
      store.setAuth(false)
    }
  })
}

export function useRegister() {
  return useToastMutation<AuthResponse, RegisterRequest>(registerUser, {
    mutationKey: ["auth", "register"]
  }, {
    success: "Bienvenido! 😃",
  })
}

export function useLogout() {
  return useToastMutation<void, void>(logout, {
    mutationKey: ["auth", "logout"]
  }, {
    loading: "Cerrando sesión ⏳",
    success: "Hasta luego! 🫡",
  })
}
