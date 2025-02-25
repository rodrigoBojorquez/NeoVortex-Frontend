<script setup lang="ts">
import AppNavbar from "@/shared/layouts/app/AppNavbar.vue";
import {useAuthStore} from "@/core/stores/authStore.ts";
import {storeToRefs} from "pinia";
import AppLoader from "@/shared/components/AppLoader.vue";

const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)

</script>

<template>
  <main class="h-dvh">
    <AppNavbar />
    <div class="grow p-5 container max-w-7xl mx-auto">
      <RouterView v-if="!loading" />
      <AppLoader v-else />
    </div>
  </main>
</template>
