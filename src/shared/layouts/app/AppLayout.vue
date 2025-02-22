<script setup lang="ts">
import AppNavbar from "@/shared/layouts/app/AppNavbar.vue";
import {useAuthStore} from "@/core/stores/authStore.ts";
import {storeToRefs} from "pinia";
import AppLoader from "@/shared/components/AppLoader.vue";

const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)

</script>

<template>
  <main class="container max-w-7xl mx-auto p-4 h-dvh">
    <AppNavbar />
    <div class="grow">
      <RouterView v-if="!loading" />
      <AppLoader v-else />
    </div>
  </main>
</template>
