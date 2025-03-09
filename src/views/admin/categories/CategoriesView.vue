<script setup lang="ts">
import {useQuery, useQueryClient} from "@tanstack/vue-query";
import {listCategories, useDeleteCategory} from "@/core/services/categoriesService";
import {computed, onMounted, reactive, ref} from "vue";
import type {ListQueryParams} from "@/core/types/common.ts";
import Danger from "@/shared/assets/danger.png";
import DeleteConfirm from "@/shared/components/DeleteConfirm.vue";

const params = reactive<ListQueryParams>({page: 1, pageSize: 10, search: ""});
const dialog = ref(false);
const categoryIdToDelete = ref<string | null>(null);

const pageCount = computed(() => {
  const totalItems = data.value?.totalItems ?? 0;
  return totalItems > 0 ? Math.ceil(totalItems / params.pageSize) : 1;
});

const {data, isPending} = useQuery({
  queryKey: ["categories", params],
  queryFn: () => listCategories(params.page, params.pageSize, params.search),
});

const {mutate: deleteCategory} = useDeleteCategory();
const queryClient = useQueryClient();

const headers = [
  {title: "Nombre", key: "name"},
  {title: "Descripción", key: "description"},
  {title: "Color", key: "color"},
  {title: "Acciones", key: "actions", sortable: false},
];

const openDialog = (id: string) => {
  categoryIdToDelete.value = id;
  dialog.value = true;
};

const confirmDelete = () => {
  if (!categoryIdToDelete.value) return;

  deleteCategory(categoryIdToDelete.value, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["categories"]});
      dialog.value = false;
    },
  });
};

const loadItems = (newParams: { page: number, itemsPerPage: number, search?: string }) => {
  params.page = newParams.page;
  params.pageSize = newParams.itemsPerPage;
  params.search = newParams.search;
  queryClient.invalidateQueries({queryKey: ["categories"]});
};

onMounted(() => {
  loadItems({page: params.page, itemsPerPage: params.pageSize, search: params.search});
});
</script>

<template>
  <v-container>
    <div class="d-flex items-center mb-10">
      <h1 class="font-weight-bold">Categorías</h1>
      <v-btn color="info" class="ml-5" icon="mdi-plus" :to="{ name: 'admin-categories-create' }">
      </v-btn>
    </div>

    <v-text-field v-model="params.search" prepend-inner-icon="mdi-magnify" variant="outlined"
                  hide-details single-line label="Buscar categoría" class="mb-4"
                  clearable></v-text-field>

    <v-data-table-server
      :fixed-header="true"
      v-model:page="params.page"
      :headers="headers"
      :items="data?.items || []"
      :items-length="data?.totalItems || 0"
      v-model:items-per-page="params.pageSize"
      v-model:search="params.search"
      :loading="isPending"
      class="mt-4"
      @update:options="loadItems"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td :style="{ backgroundColor: item.color, color: '#fff' }">{{ item.color }}</td>          <td>
            <div class="d-flex">
              <v-btn size="small" color="info" :to="`categories/${item.id}/edit`" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn size="small" class="ml-5" color="error" icon @click="openDialog(item.id)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>

      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="params.page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table-server>

    <DeleteConfirm
      :isOpen="dialog"
      title="¿Estás seguro?"
      message="Esta acción no se puede deshacer."
      :imageSrc="Danger"
      :actions="[
        { text: 'Eliminar', color: 'red-darken-4', variant: 'elevated', handler: confirmDelete, icon: 'mdi-trash-can' }
      ]"
      @update:isOpen="dialog = $event"
    />
  </v-container>
</template>
