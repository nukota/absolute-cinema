// Authentication DTOs
import { UserRole } from "../enum";

export interface SignUpDTO {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  phone_number?: string;
  cccd?: string;
  dob?: string;
}

export interface SignInDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token?: string;
  refresh_token?: string;
  message?: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    role: UserRole;
    created_at?: string;
  };
  session?: null;
}
