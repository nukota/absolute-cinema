import type { MovieStatus, PaymentMethod } from '../enum';

// API: return array of UserMovieDTO (GET with user_id param)
export interface UserMovieDTO {
  movie_id: string;
  title: string;
  description?: string;
  duration_min: number;
  release_date: string; // date
  rating?: number;
  poster_url?: string;
  director?: string;
  actors?: any; // JSON (can be array or object)
  genre?: any; // JSON (can be array or object)
  created_at?: string; // timestamp
  status: MovieStatus;
  isSaved?: boolean;
}

// API: return array of ShowtimeDTO but only return near future showtimes (within 7 days) (GET with movie_id param)

// API: return array of all the seats in a room (GET with room_id param)
export interface SeatDTO {
  seat_id: number;
  row: number;
  column: number;
  seat_label: string;
  available: boolean;
}

// Booking History DTO
export interface BookingHistoryDTO {
  booking_id: string;
  movie_title: string;
  cinema_name: string;
  showtime: string;
  seats: string[];
  total_price: number;
}

// API:
export interface UserProfileDTO {
  customer_id: string;
  full_name: string;
  email: string;
  dob: string;
  phone_number?: string;
  CCCD?: string;
  member_since?: string; // this is created_at timestamp
  total_bookings: number;
  booking_history: BookingHistoryDTO[];
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