// Authentication DTOs
export interface SignUpDTO {
  email: string;
  password: string;
  full_name?: string;
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
    created_at?: string;
  };
}
