<script setup lang="ts">
import {RouterView} from 'vue-router'
import {useAuthStore} from "@/core/stores/authStore.ts";
import AppLoader from "@/shared/components/AppLoader.vue";

const store = useAuthStore()

</script>

<template>
  <v-app>

    <RouterView v-if="!store.loading"/>
    <AppLoader v-else/>
  </v-app>
</template>
