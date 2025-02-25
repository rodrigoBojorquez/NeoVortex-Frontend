<script setup lang="ts">
import { apiClient } from '@/core/common/configuration/axiosClient';
import axios from 'axios';

const loadColabora = async () => {
  const formData = new FormData();
  formData.append("access_token", "test"); // Token que se enviaba en el formulario

  try {
    const response = await axios.post(
      "https://127.0.0.1:9980/browser/2215ad7e96ad93e1df2cc197295bac4dd4ce627e3fa60e8334229952fb7422b1/cool.html?WOPISrc=http://localhost:5050/api/wopi/files/1",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log("Respuesta:", response.data);
  } catch (error) {
    console.error("Error al cargar Collabora:", error);
  }
};

</script>

<template>
  <h1>Landing</h1>

  <button type="button" @click="loadColabora">
    Cargar colabora
  </button>
</template>
