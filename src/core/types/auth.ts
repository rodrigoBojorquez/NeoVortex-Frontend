import type {JwtPayload} from "jwt-decode";

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

interface TokenPayload extends JwtPayload {
  permissions: string
}

export type { LoginRequest, RegisterRequest, AuthResponse, TokenPayload }
