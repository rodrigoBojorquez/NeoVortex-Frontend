<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, reactive, watch} from "vue";
import type {AddRoleRequest, EditRoleRequest} from "@/core/types/role.ts";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/yup";
import {getRole, useAddRole, useEditRole} from "@/core/services/rolesService.ts";
import {roleFormSchema} from "@/core/schemas/role.ts";
import {useQuery} from "@tanstack/vue-query";
import {listPermissions} from "@/core/services/permissionsService.ts"

const route = useRoute();
const router = useRouter();
const roleId = route.params.id as string;
const isEditing = computed(() => route.name === 'admin-roles-edit')

const {data: permissionsData} = useQuery({
  queryKey: ["permissions"],
  queryFn: () => listPermissions(),
});

const {data: role} = useQuery({
  queryKey: ["roles", roleId],
  queryFn: () => getRole(roleId),
  enabled: isEditing.value,
});

const {errors, handleSubmit, defineField, resetForm, setValues,} = useForm({
  validationSchema: toTypedSchema(roleFormSchema),
  initialValues: {
    name: role?.value?.name || "",
    description: role?.value?.description || "",
    permissions: role?.value?.permissions || [],
  },
});

const togglePermission = (permissionId: string) => {
  const index = permissions.value.indexOf(permissionId);
  if (index === -1) {
    permissions.value.push(permissionId);
  } else {
    permissions.value.splice(index, 1);
  }
};

watch(role, (newRole) => {
  if (newRole) {
    setValues({
      name: newRole.name || "",
      description: newRole.description || "",
      permissions: newRole.permissions || [],
    });
  }
}, {immediate: true});

const [name] = defineField("name");
const [description] = defineField("description");
const [permissions] = defineField("permissions");

const {mutate: addRole, isPending: addRolePending} = useAddRole();
const {mutate: editRole, isPending: editRolePending} = useEditRole();

const onSubmit = handleSubmit((values) => {
  if (isEditing.value) {
    const editRequest: EditRoleRequest = {id: roleId, ...values};
    editRole(editRequest, {
      onSuccess: () => router.push({name: "admin-roles"}),
    });
  } else {
    const addRequest: AddRoleRequest = {...values};
    addRole(addRequest, {
      onSuccess: () => {
        resetForm();
        router.push({name: "admin-roles"});
      },
    });
  }
});
</script>

<template>
  <v-card class="pa-6 rounded-lg" variant="flat">
    <v-card-title class="text-h4 font-weight-bold">
      {{ isEditing ? "Editar Rol" : "Crear Rol" }}
    </v-card-title>
    <v-card-subtitle class="text-h6">
      {{
        isEditing ? "Modifica la información del rol" : "Llena los datos para registrar un nuevo rol"
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
        label="Descripción"
        v-model="description"
        :error-messages="errors.description"
        prepend-inner-icon="mdi-text"
        class="mb-4"
        clearable
      />

      <v-select
        :items="permissionsData?.items"
        v-model="permissions"
        item-value="id"
        item-title="name"
        variant="outlined"
        label="Permisos"
        :error-messages="errors.permissions"
        prepend-inner-icon="mdi-lock"
        class="mb-4"
        multiple
        required
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 10">
            <span>{{ item.title }}</span>
          </v-chip>
        </template>
      </v-select>

<!--      <v-container fluid class="mb-4">-->
<!--        <v-row>-->
<!--          <v-col v-for="permission in permissionsData?.items" :key="permission.id" cols="12" md="4">-->
<!--            <v-switch-->
<!--              :label="permission.name"-->
<!--              :value="permission.id"-->
<!--              :model-value="permissions.includes(permission.id)"-->
<!--              @change="togglePermission(permission.id)"-->
<!--              color="primary"-->
<!--              hide-details-->
<!--            />-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->

      <div class="d-flex justify-end">
        <v-btn type="submit" inline-block variant="flat" rounded="xl" color="blue"
               class=" text-white" :loading="isEditing ? editRolePending : addRolePending">
          <v-icon left>{{ isEditing ? "mdi-content-save" : "mdi-plus" }}</v-icon>
          {{ isEditing ? "Guardar Cambios" : "Crear Rol" }}
        </v-btn>
        <v-btn type="button" inline-block variant="tonal" rounded="xl" class="ml-5"
               color="grey-darken-1"
               @click="router.push({ name: 'admin-roles' })">
          <v-icon left>mdi-arrow-left</v-icon>
          Cancelar
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
