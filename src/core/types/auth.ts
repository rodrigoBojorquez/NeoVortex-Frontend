interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface AuthResponse {
  token: string
}

export type { LoginRequest, RegisterRequest, AuthResponse }
