// Booking History DTO
export interface BookingHistoryDTO {
  booking_id: string;
  movie_title: string;
  cinema_name: string;
  showtime: string;
  seats: string[];
  total_price: number;
}

// API: GET /invoices/customer/:customer_id
export interface UserProfileDTO {
  customer_id: string;
  full_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  member_since: string;
  total_bookings: number;
  booking_history: BookingHistoryDTO[];
}
