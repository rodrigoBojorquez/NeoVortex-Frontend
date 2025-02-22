<script setup lang="ts">

import {useForm} from "vee-validate";
import {loginSchema} from "@/core/schemas/auth.ts";
import {useLogin} from "@/core/services/authService.ts";
import {toTypedSchema} from "@vee-validate/yup";
import {useAuthStore} from "@/core/stores/authStore.ts";
import {useRouter} from "vue-router";

const {errors, handleSubmit, defineField} = useForm({
  validationSchema: toTypedSchema(loginSchema)
})

const [email] = defineField("email")
const [password] = defineField("password")
const {mutate} = useLogin()
const authStore = useAuthStore()
const router = useRouter()


const onSubmit = handleSubmit(async (values) => {
  mutate(values, {
    onSuccess: async (data) => {
      authStore.setAuth(true)
      authStore.setToken(data.token)
      await router.push({name: "app-home"})
    },
  })
})

</script>

<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Iniciar sesión</h1>

    <form @submit="onSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <span class="text-red-500 text-sm">{{ errors.password }}</span>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        Iniciar sesión
      </button>

      <p>¿No tienes cuenta?</p>

      <RouterLink :to="{name: 'register'}" class="text-blue-500 hover:text-blue-600">Regístrate</RouterLink>
    </form>
  </div>
</template>
