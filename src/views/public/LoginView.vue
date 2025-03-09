<script setup lang="ts">

import {useForm} from "vee-validate";
import {loginSchema} from "@/core/schemas/auth.ts";
import {useLogin} from "@/core/services/authService.ts";
import {toTypedSchema} from "@vee-validate/yup";
import {useAuthStore} from "@/core/stores/authStore.ts";
import {useRouter} from "vue-router";
import {isSuperAdmin} from "@/core/common/composables/authUtilities.ts";

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

      if (isSuperAdmin())
        await router.push({name: "admin-users"})
      else
        await router.push({name: "app-books"})
    },
  })
})

</script>

<template>
  <v-main class="d-flex justify-center align-center">
    <v-container class="d-flex justify-center align-center min-vh-100">
      <v-card class="pa-6 rounded-lg w-75" elevation="3">
        <v-card-title class="text-h4 font-weight-black">Iniciar sesión</v-card-title>
        <v-card-subtitle class="text-h6">Bienvenido de nuevo a tu Biblioteca</v-card-subtitle>

        <v-form @submit.prevent="onSubmit" class="mt-10">
          <v-text-field
            variant="outlined"
            label="Correo"
            v-model="email"
            :error-messages="errors.email"
            prepend-inner-icon="mdi-email"
            class="mb-4"
            clearable
            required
          ></v-text-field>

          <v-text-field
            variant="outlined"
            label="Contraseña"
            v-model="password"
            type="password"
            clearable
            :error-messages="errors.password"
            prepend-inner-icon="mdi-lock"
            class="mb-4"
            required
          ></v-text-field>

          <v-btn type="submit" variant="flat" rounded="xl" color="blue font-weight-bold" block class="mt-3">Ingresar</v-btn>

        </v-form>
        <v-card-text class="text-center mt-2">
          ¿No tienes cuenta?
          <RouterLink :to="{ name: 'register' }" class="blue">Regístrate</RouterLink>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>
