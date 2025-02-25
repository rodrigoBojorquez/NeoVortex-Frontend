<script setup lang="ts">

</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto flex justify-between items-center p-4">
      <RouterLink to="/" class="text-2xl font-bold text-gray-800">Neo Vortex</RouterLink>
      <div class="flex space-x-4">
        <RouterLink to="/about" class="text-gray-600 hover:text-gray-800">About</RouterLink>
        <RouterLink to="/services" class="text-gray-600 hover:text-gray-800">Services</RouterLink>
        <RouterLink to="/contact" class="text-gray-600 hover:text-gray-800">Contact</RouterLink>
        <RouterLink to="/login" class="text-gray-600 hover:text-gray-800">Iniciar Sesión</RouterLink>
        <RouterLink to="/register" class="text-gray-600 hover:text-gray-800">Registrarse</RouterLink>
      </div>
    </div>
  </nav>
</template>
