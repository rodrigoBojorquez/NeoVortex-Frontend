<script setup lang="ts">
import AdminNavbar from "@/shared/layouts/admin/AdminNavbar.vue";
</script>

<template>
  <v-layout>
    <AdminNavbar />
    <v-main>
      <v-container>
        <RouterView/>
      </v-container>
    </v-main>
  </v-layout>
</template>
