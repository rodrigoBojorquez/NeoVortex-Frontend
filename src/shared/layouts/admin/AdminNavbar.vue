<script setup lang="ts">
import {useLogout} from "@/core/services/authService.ts";
import {useRoute, useRouter} from "vue-router";

const { mutateAsync: logout } = useLogout();
const router = useRouter();
const route = useRoute();

const handleLogout = async () => {
  await logout(undefined, {
    onSuccess: async () => {
      await router.push({ name: "login" });
    },
  });
};

const links = [
  { path: "/admin/users", label: "👥 Usuarios" },
  { path: "/admin/roles", label: "🔐 Roles" },
  { path: "/admin/books", label: "📚 Libros" },
  { path: "/admin/categories", label: "📂 Categorías" },
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


      <v-btn @click="handleLogout" color="red-darken-1">🚪 Cerrar Sesión</v-btn>
    </v-container>
  </v-app-bar>
</template>
