import type { MovieStatus } from '../enum';

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
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  booking_time: string;
}

// API:
export interface UserProfileDTO {
  // ....
  member_since: string; // timestamp
  total_bookings: number;
  booking_history: BookingHistoryDTO[];
}
