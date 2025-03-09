<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, reactive, watch} from "vue";
import type {AddBookRequest, EditBookRequest} from "@/core/types/book.ts";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";
import {getBook, useAddBook, useEditBook} from "@/core/services/bookService.ts";
import {bookFormSchema} from "@/core/schemas/book.ts";
import {useQuery} from "@tanstack/vue-query";
import {listCategories} from "@/core/services/categoriesService.ts";
import type {ListQueryParams} from "@/core/types/common.ts";

const route = useRoute();
const router = useRouter();
const bookId = route.params.id as string;
const isEditing = computed(() => route.name === 'admin-books-edit');
const categoriesParams: ListQueryParams = reactive({page: 1, pageSize: 100});

const {data: book} = useQuery({
  queryKey: ["books", bookId],
  queryFn: () => getBook(bookId),
  enabled: isEditing.value,
});

const {data: categories} = useQuery({
  queryKey: ["categories"],
  queryFn: () => listCategories(categoriesParams.page, categoriesParams.pageSize),
});

const {errors, handleSubmit, defineField, resetForm, setValues,} = useForm({
  validationSchema: toTypedSchema(bookFormSchema),
  initialValues: {
    title: book?.value?.title || "",
    description: book?.value?.description || "",
    author: book?.value?.author || "",
    categoryId: book?.value?.categoryId || "",
    publishDate: book?.value?.publishDate ? new Date(book.value.publishDate) : new Date(),
    quantity: book?.value?.quantity || 0,
    pageCount: book?.value?.pageCount || 0,
  },
});

watch(book, (newBook) => {
  if (newBook) {
    setValues({
      title: newBook.title || "",
      description: newBook.description || "",
      author: newBook.author || "",
      categoryId: newBook.categoryId || "",
      publishDate: newBook.publishDate || "",
      quantity: newBook.quantity || 0,
      pageCount: newBook.pageCount || 0,
    });
  }
}, {immediate: true});

const [title] = defineField("title");
const [description] = defineField("description");
const [author] = defineField("author");
const [categoryId] = defineField("categoryId");
const [publishDate] = defineField("publishDate");
const [quantity] = defineField("quantity");
const [pageCount] = defineField("pageCount");

const {mutate: addBook, isPending: addBookPending} = useAddBook();
const {mutate: editBook, isPending: editBookPending} = useEditBook();

const onSubmit = handleSubmit((values) => {
  const formattedPublishDate = values.publishDate instanceof Date
    ? values.publishDate.toISOString().split("T")[0]
    : values.publishDate;

  if (isEditing.value) {
    const editRequest: EditBookRequest = {
      id: bookId,
      ...values,
      publishDate: formattedPublishDate
    };
    editBook(editRequest, {
      onSuccess: () => router.push({ name: "admin-books" }),
    });
  } else {
    const addRequest: AddBookRequest = {
      ...values,
      publishDate: formattedPublishDate
    };
    addBook(addRequest, {
      onSuccess: () => {
        resetForm();
        router.push({ name: "admin-books" });
      },
    });
  }
});

</script>

<template>
  <v-card class="pa-6 rounded-lg" variant="flat">
    <v-card-title class="text-h4 font-weight-bold">
      {{ isEditing ? "Editar Libro" : "Agregar Libro" }}
    </v-card-title>
    <v-card-subtitle class="text-h6">
      {{
        isEditing ? "Modifica la informacion de libro" : "Llena los datos para registrar un nuevo libro"
      }}
    </v-card-subtitle>

    <v-form @submit.prevent="onSubmit" class="mt-6">
      <v-text-field
        variant="outlined"
        label="Titulo"
        v-model="title"
        :error-messages="errors?.title"
        prepend-inner-icon="mdi-book"
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
      />

      <v-text-field
        variant="outlined"
        label="Autor"
        v-model="author"
        :error-messages="errors.author"
        prepend-inner-icon="mdi-account"
        class="mb-4"
      />

      <v-select
        :items="categories?.items"
        v-model="categoryId"
        item-value="id"
        item-title="name"
        variant="outlined"
        label="Categoria"
        :error-messages="errors.categoryId"
        prepend-inner-icon="mdi-tag"
        class="mb-4"
        required
      ></v-select>

      <v-date-input
        v-model="publishDate"
        variant="outlined"
        prepend-icon=""
        prepend-inner-icon="$calendar"
        :error-messages="errors.publishDate"
        label="Fecha de publicación"
      ></v-date-input>


      <v-text-field
        variant="outlined"
        label="Page Count"
        v-model="pageCount"
        :error-messages="errors.pageCount"
        prepend-inner-icon="mdi-book-open-page-variant"
        class="mb-4"
        clearable
      />

      <v-text-field
        variant="outlined"
        label="¿Cuantos desea agregar?"
        v-model="quantity"
        :error-messages="errors.quantity"
        prepend-inner-icon="mdi-numeric"
        class="mb-4"
        clearable
        required
      />

      <div class="d-flex justify-end">
        <v-btn type="submit" inline-block variant="flat" rounded="xl" color="blue"
               class=" text-white" :loading="isEditing ? editBookPending : addBookPending">
          <v-icon left>{{ isEditing ? "mdi-content-save" : "mdi-plus" }}</v-icon>
          {{ isEditing ? "Guardar cambios" : "Crear libro" }}
        </v-btn>
        <v-btn type="button" inline-block variant="tonal" rounded="xl" class="ml-5"
               color="grey-darken-1"
               @click="router.push({ name: 'admin-books' })">
          <v-icon left>mdi-arrow-left</v-icon>
          Cancel
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
