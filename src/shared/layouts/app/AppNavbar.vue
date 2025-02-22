<script setup lang="ts">

import {useLogout} from "@/core/services/authService.ts";
import {useRouter} from "vue-router";

const {mutateAsync: logout} = useLogout()
const router = useRouter()

const handleLogout = async () => {
  await logout(undefined, {
    onSuccess: async () => {
      await router.push({name: "login"})
    }
  })
}

</script>

<template>
  <nav>
    <button type="button" @click="handleLogout">
      Cerrar Sesion
    </button>
  </nav>
</template>
