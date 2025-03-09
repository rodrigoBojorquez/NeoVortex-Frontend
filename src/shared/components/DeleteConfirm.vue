<script setup lang="ts">
import {defineProps, defineEmits, type Ref, ref} from 'vue';

interface Action {
  text: string;
  color: string;
  variant: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain';
  handler: () => void;
  icon?: string;
}

const props = defineProps<{
  isOpen: boolean;
  title: string;
  message: string;
  imageSrc?: string;
  actions: Action[];
}>();

const emit = defineEmits(['update:isOpen']);

const closeDialog = () => {
  emit('update:isOpen', false);
};
</script>

<template>
  <v-dialog v-model="props.isOpen" max-width="400">
    <v-card class="px-6 py-8 rounded-xl">
      <v-card-title class="text-h4 font-weight-black grey-darken-4 text-center">{{ title }}</v-card-title>
      <img v-if="imageSrc" :src="imageSrc" alt="dialog image" class="mx-auto my-5" style="width: 12rem; height: 12rem;">
      <v-card-text class="text-h6 font-weight-medium text-center">{{ message }}</v-card-text>
      <v-card-actions class="justify-center mt-4">
        <v-btn color="grey-darken-2" variant="tonal" class="px-6 py-3 rounded-lg text-white" @click="closeDialog">
          Cancelar
        </v-btn>
        <v-btn
          v-for="(action, index) in actions"
          :key="index"
          :color="action.color"
          :variant="action.variant"
          class="px-6 py-3 rounded-lg text-white"
          @click="action.handler"
        >
          <v-icon left v-if="action.icon">{{ action.icon }}</v-icon>
          {{ action.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
