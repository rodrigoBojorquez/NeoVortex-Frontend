interface ListResponse<T> {
  page: number
  pageSize: number
  totalItems: number
  items: T[]
}

interface ListQueryParams {
  page: number
  pageSize: number
  search?: string
  [key: string]: unknown
}

export type { ListResponse, ListQueryParams }
