<script setup lang="ts">
import AppNavbar from "@/shared/layouts/app/AppNavbar.vue";
import {useAuthStore} from "@/core/stores/authStore.ts";
import {storeToRefs} from "pinia";
import AppLoader from "@/shared/components/AppLoader.vue";
import AdminNavbar from "@/shared/layouts/admin/AdminNavbar.vue";

const authStore = useAuthStore()
const { loading } = storeToRefs(authStore)

</script>

<template>
  <v-layout>
    <AppNavbar/>
    <v-main>
      <v-container>
        <RouterView/>
      </v-container>
    </v-main>
  </v-layout>
</template>

