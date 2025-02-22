import {defineStore} from "pinia";
import {onMounted, ref} from "vue";
import {refreshToken} from "@/core/services/authService.ts";

export const useAuthStore = defineStore("auth",() => {
  const isAuth = ref<boolean>(false)
  const token = ref<string | null>(null)
  const loading = ref<boolean>(true)

  // Actions
  function setAuth(value: boolean) {
    isAuth.value = value
    loading.value = false
  }

  function setToken(value: string | null) {
    token.value = value
    loading.value = false
  }

  function finishLoading() {
    loading.value = false
  }

  onMounted(async () => {
    try {
      await refreshToken();
    } catch (e) {
      console.error("Error al refrescar token:", e);
    } finally {
      finishLoading();
    }
  });

  return {
    isAuth,
    token,
    loading,
    setToken,
    setAuth,
    finishLoading
  }
})
