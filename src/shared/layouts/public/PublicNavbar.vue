<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();

const links = [
  { path: "/app/books", label: "📔 Libros" },
  { path: "/contact", label: "📑 Contacto" },
];

const isActive = (linkPath: string) => {
  if (linkPath === "/admin") return route.path === "/admin"; // Exact match for dashboard
  return route.path.startsWith(linkPath);
};
</script>

<template>
  <v-app-bar app color="grey-lighten-4" elevation="2">
    <v-container class="d-flex justify-center align-center">
      <v-app-bar-title>
        <RouterLink to="/" class="text-decoration-none text-grey-darken-3 font-weight-bold text-h6">
          📖 Librería Vortex
        </RouterLink>
      </v-app-bar-title>


      <v-row justify="center" class="">
        <v-btn class="mx-2" v-for="link in links" :key="link.path" :to="link.path"
               :color="isActive(link.path) ? 'primary' : 'grey-darken-1'"
        >
          {{ link.label }}
        </v-btn>
      </v-row>

      <v-btn :to="{name: 'login'}" variant="flat" color="blue-lighten-1">🚪 Iniciar sesión</v-btn>
      <v-btn :to="{name: 'register'}" variant="tonal" color="grey-darken-2" class="ml-3">😃 Registrarse</v-btn>

    </v-container>
  </v-app-bar>
</template>
