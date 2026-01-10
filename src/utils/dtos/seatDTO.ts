// Seat with booking status
export interface SeatWithBookingStatus {
  seat_id: string;
  row: number;
  column: number;
  seat_label: string;
  available: boolean;
}
