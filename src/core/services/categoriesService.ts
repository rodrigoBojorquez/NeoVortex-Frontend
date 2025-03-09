import {apiClient} from "@/core/common/configuration/axiosClient.ts";
import type {ListResponse} from "@/core/types/common.ts";
import type {AddCategoryRequest, Category, EditCategoryRequest} from "@/core/types/categories.ts";
import {useToastMutation} from "@/core/common/composables/serviceHooks.ts";

export const listCategories = async (page: number, pageSize: number, search?: string): Promise<ListResponse<Category>> => {
  const {data} = await apiClient.get('/categories', {
    params: {page, pageSize, search}
  });
  return data;
};

export const getCategory = async (id: string): Promise<Category> => {
  return (await apiClient.get(`/categories/${id}`)).data;
};

const editCategory = async (data: EditCategoryRequest) => {
    await apiClient.put(`/categories`, data);
}

const deleteCategory = async (id: string) => {
    await apiClient.delete(`/categories/${id}`);
}

const addCategory = async (request: AddCategoryRequest) => {
    await apiClient.post(`/categories`, request);
}

/**
 * Hooks
 */
export function useEditCategory() {
  return useToastMutation<void, EditCategoryRequest>(
    editCategory,
    {
      mutationKey: ["categories"],
    },
    {
      success: "Categoria editada",
    }
  );
}

export function useDeleteCategory() {
  return useToastMutation<void, string>(
    deleteCategory,
    {
      mutationKey: ["categories"]
    }, {
      success: "Categoria eliminada"
    }
  )
}

export function useAddCategory() {
  return useToastMutation<void, AddCategoryRequest>(
    addCategory,
    {
      mutationKey: ["categories"]
    }, {
      success: "Categoria añadida"
    }
  )
}
