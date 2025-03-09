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
      <RouterLink to="/" class="text-2xl font-bold text-gray-800">Libreria Vortex</RouterLink>
      <div class="flex space-x-4">
        <RouterLink :to="{name: 'app-books'}" class="text-gray-600 hover:text-gray-800">Inicio</RouterLink>
        <RouterLink :to="{name: 'app-books'}" class="text-gray-600 hover:text-gray-800">Libros</RouterLink>
        <RouterLink :to="{name: 'app-categories'}" class="text-gray-600 hover:text-gray-800" >Categorías</RouterLink>
        <button @click="handleLogout" class="text-gray-600 hover:text-gray-800">Cerrar Sesión</button>
      </div>
    </div>
  </nav>
</template>
