<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/yup";
import {useForm} from "vee-validate";
import {registerSchema} from "@/core/schemas/auth.ts";
import {useRegister} from "@/core/services/authService.ts";
import {useAuthStore} from "@/core/stores/authStore.ts";
import {useRouter} from "vue-router";

const {errors, handleSubmit, defineField} = useForm({
  validationSchema: toTypedSchema(registerSchema)
});

const [name] = defineField("name");
const [email] = defineField("email");
const [password] = defineField("password");
const {mutate} = useRegister();
const authStore = useAuthStore();
const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  mutate(values, {
    onSuccess: async (data) => {
      authStore.setAuth(true);
      authStore.setToken(data.token);
      await router.push({name: "app-home"});
    },
  });
});
</script>

<template>
  <v-main class="d-flex justify-center align-center">
    <v-container class="d-flex justify-center align-center min-vh-100">
      <v-card class="pa-6 rounded-lg w-75" elevation="3">
        <v-card-title class="text-h4 font-weight-black">Crea tu cuenta</v-card-title>
        <v-card-subtitle class="text-h6">Y dale un vistazo a nuestro catalogo de libros</v-card-subtitle>

        <v-form @submit.prevent="onSubmit" class="mt-10">
          <v-text-field
            variant="outlined"
            label="Nombre"
            v-model="name"
            :error-messages="errors.name"
            prepend-inner-icon="mdi-account"
            class="mb-4"
            clearable
            required
          ></v-text-field>

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

          <v-btn type="submit" variant="flat" rounded="xl" color="blue font-weight-bold" block class="mt-3">Registrarse</v-btn>
        </v-form>
        <v-card-text class="text-center mt-2">
          ¿Ya tienes cuenta?
          <RouterLink :to="{ name: 'login' }" class="blue">Iniciar sesión</RouterLink>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>
