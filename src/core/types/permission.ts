interface Permission {
  id: string
  name: string
  module: {
    id: string
    name: string
  }
}

export type { Permission }
