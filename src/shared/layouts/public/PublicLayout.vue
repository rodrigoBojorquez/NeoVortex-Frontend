<script setup lang="ts">
import PublicNavbar from "@/shared/layouts/public/PublicNavbar.vue";
</script>

<template>
  <v-layout>
    <PublicNavbar/>
    <v-main>
        <RouterView/>
    </v-main>
  </v-layout>
</template>

