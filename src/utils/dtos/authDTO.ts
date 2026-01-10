// Authentication DTOs
import { UserRole } from "../enum";

export interface SignUpDTO {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignInDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    created_at?: string;
  };
}
