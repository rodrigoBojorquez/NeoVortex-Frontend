import {apiClient} from "@/core/common/configuration/axiosClient.ts";
import type {AddBookRequest, Book, EditBookRequest} from "@/core/types/book.ts";
import {useToastMutation} from "@/core/common/composables/serviceHooks.ts";
import type {ListResponse} from "@/core/types/common.ts";

export const listBooks = async (page: number, pageSize: number, search?: string, categoryId?: string): Promise<ListResponse<Book>> => {
  return (await apiClient.get('/books', {
    params: {page, pageSize, search, categoryId}
  })).data;
}

export const getBook = async (id: string): Promise<Book> => {
  return (await apiClient.get(`/books/${id}`)).data;
}

const editBook = async (data: EditBookRequest) => {
  await apiClient.put(`/books`, data);
}

const deleteBook = async (id: string) => {
  await apiClient.delete(`/books/${id}`);
}

const addBook = async (request: AddBookRequest) => {
  await apiClient.post(`/books`, request);
}

/**
 * Hooks
 */
export function useEditBook() {
  return useToastMutation<void, EditBookRequest>(
    editBook,
    {
      mutationKey: ["books"],
    },
    {
      success: "Libro editado",
    }
  );
}

export function useDeleteBook() {
  return useToastMutation<void, string>(
    deleteBook,
    {
      mutationKey: ["books"]
    }, {
      success: "Libro eliminado"
    }
  )
}


export function useAddBook() {
  return useToastMutation<void, AddBookRequest>(
    addBook,
    {
      mutationKey: ["books"]
    }, {
      success: "Libro añadido"
    }
  )
}
