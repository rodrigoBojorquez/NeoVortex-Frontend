interface Role {
  id: string
  name: string
  description?: string
  permissions: string[]
}

interface EditRoleRequest {
  id: string
  name: string
  permissions: string[]
  description?: string
}

interface AddRoleRequest {
  name: string
  permissions: string[]
  description?: string
}

interface RoleForm {
  name: string
  permissions: string[]
  description?: string
}

export type { Role, EditRoleRequest, AddRoleRequest, RoleForm }
