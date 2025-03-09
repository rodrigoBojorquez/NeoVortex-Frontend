<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, reactive, watch} from "vue";
import type {AddUserRequest, EditUserRequest} from "@/core/types/user.ts";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";
import {getUser, useAddUser, useEditUser} from "@/core/services/userService.ts";
import {userFormSchema} from "@/core/schemas/user.ts";
import {useQuery} from "@tanstack/vue-query";
import {listRoles} from "@/core/services/rolesService.ts";
import type {ListQueryParams} from "@/core/types/common.ts";

const route = useRoute();
const router = useRouter();
const userId = route.params.id as string;
const roleListParams = reactive<ListQueryParams>({page: 1, pageSize: 10});
const isEditing = computed(() => route.name === 'admin-users-edit')

const {data: roles} = useQuery({
  queryKey: ["roles", roleListParams],
  queryFn: () => listRoles(roleListParams.page, roleListParams.pageSize),
});

const { data: user } = useQuery({
  queryKey: ["users", userId],
  queryFn: () => getUser(userId),
  enabled: isEditing.value,
});

const {errors, handleSubmit, defineField, resetForm, setValues, } = useForm({
  validationSchema: toTypedSchema(userFormSchema),
  initialValues: {
    name: user?.value?.name || "",
    email: user?.value?.email || "",
    password: "",
    roleId: user?.value?.roleId || "",
  },
});

watch(user, (newUser) => {
  if (newUser) {
    setValues({
      name: newUser.name || "",
      email: newUser.email || "",
      password: "",
      roleId: newUser.roleId || "",
    });
  }
}, { immediate: true });


const [name] = defineField("name");
const [email] = defineField("email");
const [password] = defineField("password");
const [roleId] = defineField("roleId");

const {mutate: addUser, isPending: addUserPending} = useAddUser();
const {mutate: editUser, isPending: editUserPending} = useEditUser();

const onSubmit = handleSubmit((values) => {
  console.log(isEditing.value)
  if (isEditing.value) {

    const editRequest: EditUserRequest = {id: userId, ...values};
    editUser(editRequest, {
      onSuccess: () => router.push({name: "admin-users"}),
    });
  } else {
    const addRequest: AddUserRequest = {...values};
    addUser(addRequest, {
      onSuccess: () => {
        resetForm();
        router.push({name: "admin-users"});
      },
    });
  }
});
</script>


<template>
  <v-card class="pa-6 rounded-lg" variant="flat">
    <v-card-title class="text-h4 font-weight-bold">
      {{ isEditing ? "Editar Usuario" : "Crear Usuario" }}
    </v-card-title>
    <v-card-subtitle class="text-h6">
      {{
        isEditing ? "Modifica la información del usuario" : "Llena los datos para registrar un nuevo usuario"
      }}
    </v-card-subtitle>

    <v-form @submit.prevent="onSubmit" class="mt-6">
      <v-text-field
        variant="outlined"
        label="Nombre"
        v-model="name"
        :error-messages="errors.name"
        prepend-inner-icon="mdi-account"
        class="mb-4"
        clearable
        required
      />

      <v-text-field
        variant="outlined"
        label="Correo Electrónico"
        v-model="email"
        :error-messages="errors.email"
        prepend-inner-icon="mdi-email"
        class="mb-4"
        clearable
        required
      />

      <v-text-field
        variant="outlined"
        label="Contraseña"
        v-model="password"
        type="password"
        clearable
        :error-messages="errors.password"
        prepend-inner-icon="mdi-lock"
        class="mb-4"
        required
      />

      <v-select
        :items="roles?.items"
        v-model="roleId"
        item-value="id"
        item-title="name"
        variant="outlined"
        label="Rol"
        :error-messages="errors.roleId"
        prepend-inner-icon="mdi-account-group"
        class="mb-4"
        required
      />

      <div class="d-flex justify-end">
        <v-btn type="submit" inline-block variant="flat" rounded="xl" color="blue"
               class=" text-white" :loading="isEditing ? editUserPending : addUserPending">
          <v-icon left>{{ isEditing ? "mdi-content-save" : "mdi-account-plus" }}</v-icon>
          {{ isEditing ? "Guardar Cambios" : "Crear Usuario" }}
        </v-btn>
        <v-btn type="button" inline-block variant="tonal" rounded="xl" class="ml-5" color="grey-darken-1"
               @click="router.push({ name: 'admin-users' })">
          <v-icon left>mdi-arrow-left</v-icon>
          Cancelar
        </v-btn>
      </div>
    </v-form>

  </v-card>
</template>
