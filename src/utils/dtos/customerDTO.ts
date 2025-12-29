export interface CustomerDTO {
  customer_id: string;
  full_name: string;
  email: string;
  dob: string;
  password_hash: string;
  phone_number?: string;
  created_at?: string; // timestamp
  cccd?: string;
}

export type CreateCustomerDTO = Omit<
  CustomerDTO,
  "customer_id" | "password_hash"
> & {
  password: string;
};

export type UpdateCustomerDTO = Partial<
  Pick<
    CreateCustomerDTO,
    "full_name" | "email" | "phone_number" | "cccd" | "dob"
  >
>;
