import {defineStore} from "pinia";
import {onMounted, ref} from "vue";
import {refreshToken} from "@/core/services/authService.ts";
import {jwtDecode} from "jwt-decode";
import type {TokenPayload} from "@/core/types/auth.ts";

export const useAuthStore = defineStore("auth",() => {
  const isAuth = ref<boolean>(false)
  const token = ref<string | null>(null)
  const permissions = ref<string[]>([])

  const loading = ref<boolean>(true)

  // Actions
  function setAuth(value: boolean) {
    isAuth.value = value
    loading.value = false
  }

  function setToken(value: string | null) {
    token.value = value
    loading.value = false

    if (value) {
      const decoded = jwtDecode<TokenPayload>(value)
      permissions.value = decoded.permissions.split(",")
    }
  }

  onMounted(async () => {
    try {
      await refreshToken();
    } catch (e) {
      console.error("Error al refrescar token:", e);
    } finally {
      loading.value = false;
    }
  });

  return {
    isAuth,
    token,
    permissions,
    loading,
    setToken,
    setAuth,
  }
})
