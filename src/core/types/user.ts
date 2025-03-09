interface User {
  id: string
  name: string
  email: string
  roleName: string
  roleId: string
}

interface EditUserRequest {
  id: string
  name: string
  email: string
  password: string
  roleId: string
}

interface AddUserRequest {
  name: string
  email: string
  password: string
  roleId: string
}

interface UserForm {
  name: string
  email: string
  password: string
  roleId: string
}

export type { User, EditUserRequest, AddUserRequest, UserForm }
