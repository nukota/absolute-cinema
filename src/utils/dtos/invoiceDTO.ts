import type {
  InvoiceStatus,
  PaymentMethod,
} from '../enum';

export interface InvoiceDTO {
  invoice_id: string;
  invoice_code: string;
  customer: {
    customer_id: string;
    full_name: string;
    email: string;
  };
  ticket_count: number;
  product_count: number;
  tickets: {
    title: string; // movie title
    showtime: string; // timestamp
    price: number; // price per ticket
    seats: string[]; //eg. A01, A02
  };
  products: {
    product_id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  payment_method: PaymentMethod;
  total_amount: number;
  status: InvoiceStatus;
  created_at: string; // timestamp
}

// API: POST request body for creating an order
export interface CreateInvoiceDTO {
  customer_id: string;
  amount: number;
  products: {
    product_id: string;
    quantity: number;
  }[];
  tickets: {
    showtime_id: string;
    seats: string[]; // array of seat IDs
  };
  payment_method: PaymentMethod;
  total_amount: number;
}