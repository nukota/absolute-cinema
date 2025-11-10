export interface CustomerDTO {
  customer_id: string;
  full_name: string;
  email: string;
  dob: string;
  password_hash: string;
  phone_number?: string;
  created_at?: string; // timestamp
  CCCD?: string;
}
