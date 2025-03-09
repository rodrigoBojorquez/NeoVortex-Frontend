interface Category {
  id: string
  name: string
  description?: string,
  color?: string
}

interface EditCategoryRequest {
  id: string
  name: string
  description?: string,
  color?: string
}

interface AddCategoryRequest {
  name: string
  description?: string,
  color?: string
}

interface CategoryForm {
  name: string
  description?: string,
  color?: string
}

export type { Category, EditCategoryRequest, AddCategoryRequest, CategoryForm }
