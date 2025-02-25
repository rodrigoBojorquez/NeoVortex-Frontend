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
  <nav class="bg-white shadow-md">
    <div class="container mx-auto flex justify-between items-center p-4">
      <RouterLink to="/" class="text-2xl font-bold text-gray-800">Neo Vortex</RouterLink>
      <div class="flex space-x-4">
        <RouterLink to="/dashboard" class="text-gray-600 hover:text-gray-800">Dashboard</RouterLink>
        <RouterLink to="/profile" class="text-gray-600 hover:text-gray-800">Profile</RouterLink>
        <RouterLink to="/settings" class="text-gray-600 hover:text-gray-800">Settings</RouterLink>
        <button @click="handleLogout" class="text-gray-600 hover:text-gray-800">Cerrar Sesión</button>
      </div>
    </div>
  </nav>
</template>
