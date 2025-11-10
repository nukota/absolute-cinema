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