<script setup lang="ts">
import {useQuery, useQueryClient} from "@tanstack/vue-query";
import {listBooks, useDeleteBook} from "@/core/services/bookService";
import {computed, onMounted, reactive, ref} from "vue";
import type {ListQueryParams} from "@/core/types/common.ts";
import Danger from "@/shared/assets/danger.png";
import DeleteConfirm from "@/shared/components/DeleteConfirm.vue";
import {listCategories} from "@/core/services/categoriesService.ts";
import {listUsers} from "@/core/services/userService.ts";
import {useToast} from "vue-toastification";

const params = reactive<ListQueryParams>({page: 1, pageSize: 10, search: "", categoryId: ""});
const dialog = ref(false);
const bookIdToDelete = ref<string | null>(null);
const categoriesParams: ListQueryParams = reactive({page: 1, pageSize: 100});

const bookIdToLoan = ref<string | null>(null);
const selectedUserId = ref<string | null>(null)
const loanDialog = ref(false);
const toast = useToast()

const pageCount = computed(() => {
  const totalItems = data.value?.totalItems ?? 0;
  return totalItems > 0 ? Math.ceil(totalItems / params.pageSize) : 1;
});

const {data, isPending} = useQuery({
  queryKey: ["books", params],
  queryFn: () => listBooks(params.page, params.pageSize, params.search, params.categoryId),
});

const {data: categories} = useQuery({
  queryKey: ["categories"],
  queryFn: () => listCategories(categoriesParams.page, categoriesParams.pageSize),
});

const { data: users } = useQuery({
  queryKey: ["users"],
  queryFn: () => listUsers(1, 100),
});

const {mutate: deleteBook} = useDeleteBook();
const queryClient = useQueryClient();

const headers = [
  {title: "Titulo", key: "title"},
  {title: "Autor", key: "author"},
  {title: "Categoria", key: "categoryName"},
  {title: "Fecha de publicacion", key: "publishDate"},
  {title: "Cantidad", key: "quantity"},
  {title: "Numero de paginas", key: "pageCount"},
  {title: "Acciones", key: "actions", sortable: false},
];

const openDialog = (id: string) => {
  bookIdToDelete.value = id;
  dialog.value = true;
};

const openLoanDialog = (id: string) => {
  bookIdToLoan.value = id;
  loanDialog.value = true;
};

const filterByCategory = (categoryId: string) => {
  params.categoryId = params.categoryId === categoryId ? "" : categoryId; // Toggle filtro
  queryClient.invalidateQueries({ queryKey: ["books"] });
};

const confirmLoan = () => {
  if (!bookIdToLoan.value || !selectedUserId.value) return;

  toast.success("Libro prestado con exito 📖")

  loanDialog.value = false;
  selectedUserId.value = null;
};

const confirmDelete = () => {
  if (!bookIdToDelete.value) return;

  deleteBook(bookIdToDelete.value, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["books"]});
      dialog.value = false;
    },
  });
};

const loadItems = (newParams: { page: number, itemsPerPage: number, search?: string }) => {
  params.page = newParams.page;
  params.pageSize = newParams.itemsPerPage;
  params.search = newParams.search;
  queryClient.invalidateQueries({queryKey: ["books"]});
};

onMounted(() => {
  loadItems({page: params.page, itemsPerPage: params.pageSize, search: params.search});
});
</script>

<template>
  <v-container>
    <div class="d-flex items-center mb-10">
      <h1 class="font-weight-bold">Libros</h1>
      <v-btn color="info" class="ml-5" icon="mdi-plus" :to="{ name: 'admin-books-create' }">
      </v-btn>
    </div>

    <v-container class="d-flex mb-4">
      <v-btn
        v-for="category in categories?.items"
        :variant="params.categoryId === category.id ? 'tonal' : 'outlined'"
        :key="category.id"
        :color="params.categoryId === category.id ? 'primary' : 'default'"
        class="mr-2"
        @click="filterByCategory(category.id)"
      >
        {{ category.name }}
      </v-btn>
    </v-container>

    <v-text-field v-model="params.search" prepend-inner-icon="mdi-magnify" variant="outlined"
                  hide-details single-line label="Buscar libro" class="mb-4"
                  clearable></v-text-field>

    <v-data-table-server
      :fixed-header="true"
      v-model:page="params.page"
      :headers="headers"
      :items="data?.items || []"
      :no-data-text="'No hay libros'"
      :items-length="data?.totalItems || 0"
      v-model:items-per-page="params.pageSize"
      v-model:search="params.search"
      :loading="isPending"
      class="mt-4"
      @update:options="loadItems"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.categoryName }}</td>
          <td>{{ item.publishDate }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.pageCount }}</td>
          <td>
            <div class="d-flex">
              <v-btn size="small" color="info" :to="`books/${item.id}/edit`" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn size="small" class="ml-5" color="error" icon @click="openDialog(item.id)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
              <v-btn size="small" class="ml-5" color="green" icon @click="openLoanDialog(item.id)">
                <v-icon>mdi-bookmark</v-icon>
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
      title="¿Estas seguro?"
      message="Estas a punto de eliminar un libro. Esta acción no se puede deshacer."
      :imageSrc="Danger"
      :actions="[
        { text: 'Delete', color: 'red-darken-4', variant: 'elevated', handler: confirmDelete, icon: 'mdi-trash-can' }
      ]"
      @update:isOpen="dialog = $event"
    />

    <v-dialog v-model="loanDialog" max-width="400px">
      <v-card>
        <v-card-title>Prestar Libro</v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedUserId"
            :items="users?.items"
            item-title="name"
            item-value="id"
            label="Selecciona un usuario"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="confirmLoan">Confirmar</v-btn>
          <v-btn color="red" @click="loanDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
