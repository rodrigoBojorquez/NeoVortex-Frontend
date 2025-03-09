import type {ListResponse} from "@/core/types/common.ts";
import type {EditRoleRequest, Role} from "@/core/types/role.ts";
import {apiClient} from "@/core/common/configuration/axiosClient.ts";
import {useToastMutation} from "@/core/common/composables/serviceHooks.ts";

export const listRoles = async (page: number, pageSize: number, search?: string): Promise<ListResponse<Role>> => {
  return (await apiClient.get('/roles', {
    params: {page, pageSize, search}
  })).data;
}

export const getRole = async (id: string): Promise<Role> => {
  return (await apiClient.get(`/roles/${id}`)).data;
}

const editRole = async (data: EditRoleRequest) => {
  await apiClient.put(`/roles`, data);
}

const deleteRole = async (id: string) => {
  await apiClient.delete(`/roles/${id}`);
}

const addRole = async (request: EditRoleRequest) => {
  await apiClient.post(`/roles`, request);
}


/**
 * Hooks
 */
export function useEditRole() {
  return useToastMutation<void, EditRoleRequest>(
    editRole,
    {
      mutationKey: ["roles"],
    },
    {
      success: "Rol editado",
    }
  );
}

export function useDeleteRole() {
  return useToastMutation<void, string>(
    deleteRole,
    {
      mutationKey: ["roles"]
    }, {
      success: "Rol eliminado"
    }
  )
}

export function useAddRole() {
  return useToastMutation<void, EditRoleRequest>(
    addRole,
    {
      mutationKey: ["roles"]
    }, {
      success: "Rol añadido"
    }
  )
}
