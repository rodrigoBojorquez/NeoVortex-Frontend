interface Book {
  id: string
  title: string
  description?: string,
  author?: string
  imageUrl?: string
  categoryName: string
  categoryId: string
  publishDate: string
  createDate: string
  quantity: number
  pageCount: number
}

interface EditBookRequest {
  id: string
  title: string
  description?: string,
  author?: string
  categoryId: string
  publishDate: string
  quantity: number
  pageCount: number
}

interface AddBookRequest {
  title: string
  description?: string,
  author?: string
  categoryId: string
  publishDate: string
  quantity: number
  pageCount: number
}

interface BookForm {
  title: string
  description?: string,
  author?: string
  categoryId: string
  publishDate: Date
  quantity: number
  pageCount: number
}

export type { Book, EditBookRequest, AddBookRequest, BookForm }
