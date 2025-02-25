<script setup lang="ts">
import PublicNavbar from "@/shared/layouts/public/PublicNavbar.vue";
import {useAuthStore} from "@/core/stores/authStore.ts";
import {storeToRefs} from "pinia";
import AppLoader from "@/shared/components/AppLoader.vue";

const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)

</script>

<template>
  <main class=" h-dvh">
    <PublicNavbar/>

    <div class="grow p-5 container max-w-7xl mx-auto">
      <RouterView v-if="!loading"/>
      <AppLoader v-else/>
    </div>
  </main>
</template>
