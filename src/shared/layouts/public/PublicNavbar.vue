<script setup lang="ts">

</script>

<template>
<nav>
  <div class="container mx-auto flex justify-between items-center p-4">
    <RouterLink to="/" class="font-bold text-xl">Neo Vortex</RouterLink>
    <div>
      <RouterLink :to="{name: 'login'}" class="mr-4">Iniciar sesion</RouterLink>
      <RouterLink :to="{name: 'register'}">Registrarse</RouterLink>
    </div>
  </div>
</nav>
</template>
