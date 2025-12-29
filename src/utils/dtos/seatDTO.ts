// Create Seat DTO
export interface CreateSeatDto {
  room_id: string;
  row: number;
  col: number;
  seat_label: string;
}

// Update Seat DTO (partial update)
export interface UpdateSeatDto {
  row?: number;
  col?: number;
  seat_label?: string;
}

// Seat interface
export interface SeatDTO {
  seat_id: string;
  room_id: string;
  row: number;
  col: number;
  seat_label: string;
}

// Seat with booking status
export interface SeatWithBookingStatus {
  seat_id: string;
  room_id: string;
  row: number;
  col: number;
  seat_label: string;
  is_booked: boolean;
}
