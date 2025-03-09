<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, watch} from "vue";
import type {AddCategoryRequest, EditCategoryRequest} from "@/core/types/categories.ts";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";
import {getCategory, useAddCategory, useEditCategory} from "@/core/services/categoriesService.ts";
import {categoryFormSchema} from "@/core/schemas/category.ts";
import {useQuery} from "@tanstack/vue-query";

const route = useRoute();
const router = useRouter();
const categoryId = route.params.id as string;
const isEditing = computed(() => route.name === 'admin-categories-edit');

const { data: category } = useQuery({
  queryKey: ["categories", categoryId],
  queryFn: () => getCategory(categoryId),
  enabled: isEditing.value,
});

const {errors, handleSubmit, defineField, resetForm, setValues, } = useForm({
  validationSchema: toTypedSchema(categoryFormSchema),
  initialValues: {
    name: category?.value?.name || "",
    description: category?.value?.description || "",
    color: category?.value?.color || "",
  },
});

watch(category, (newCategory) => {
  if (newCategory) {
    setValues({
      name: newCategory.name || "",
      description: newCategory.description || "",
      color: newCategory.color || "",
    });
  }
}, { immediate: true });

const [name] = defineField("name");
const [description] = defineField("description");
const [color] = defineField("color");

const {mutate: addCategory, isPending: addCategoryPending} = useAddCategory();
const {mutate: editCategory, isPending: editCategoryPending} = useEditCategory();

const onSubmit = handleSubmit((values) => {
  if (isEditing.value) {
    const editRequest: EditCategoryRequest = {id: categoryId, ...values};
    editCategory(editRequest, {
      onSuccess: () => router.push({name: "admin-categories"}),
    });
  } else {
    const addRequest: AddCategoryRequest = {...values};
    addCategory(addRequest, {
      onSuccess: () => {
        resetForm();
        router.push({name: "admin-categories"});
      },
    });
  }
});
</script>

<template>
  <v-card class="pa-6 rounded-lg" variant="flat">
    <v-card-title class="text-h4 font-weight-bold">
      {{ isEditing ? "Editar Categoría" : "Crear Categoría" }}
    </v-card-title>
    <v-card-subtitle class="text-h6">
      {{
        isEditing ? "Modifica la información de la categoría" : "Llena los datos para registrar una nueva categoría"
      }}
    </v-card-subtitle>

    <v-form @submit.prevent="onSubmit" class="mt-6">
      <v-text-field
        variant="outlined"
        label="Nombre"
        v-model="name"
        :error-messages="errors.name"
        prepend-inner-icon="mdi-tag"
        class="mb-4"
        clearable
        required
      />

      <v-text-field
        variant="outlined"
        label="Descripción"
        v-model="description"
        :error-messages="errors.description"
        prepend-inner-icon="mdi-text"
        class="mb-4"
        clearable
      />

      <v-row class="mb-4">
        <v-col cols="12">
          <label class="v-label">Color</label>
          <v-color-picker v-model="color" elevation="0" border mode="hex"></v-color-picker>
        </v-col>
      </v-row>

      <div class="d-flex justify-end">
        <v-btn type="submit" inline-block variant="flat" rounded="xl" color="blue"
               class=" text-white" :loading="isEditing ? editCategoryPending : addCategoryPending">
          <v-icon left>{{ isEditing ? "mdi-content-save" : "mdi-plus" }}</v-icon>
          {{ isEditing ? "Guardar Cambios" : "Crear Categoría" }}
        </v-btn>
        <v-btn type="button" inline-block variant="tonal" rounded="xl" class="ml-5" color="grey-darken-1"
               @click="router.push({ name: 'admin-categories' })">
          <v-icon left>mdi-arrow-left</v-icon>
          Cancelar
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
