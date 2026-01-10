import { api } from "../lib/apiClient";
import type {
  SeatWithBookingStatus,
} from "../utils/dtos/seatDTO";
import { useQuery } from "@tanstack/react-query";

// Combined function for both room seats and room+showtime seats
const getSeatsByRoom = async (
  roomId: string,
  showtimeId?: string
): Promise<SeatWithBookingStatus[]> => {
  const url = showtimeId
    ? `/seats/room/${roomId}?showtime_id=${showtimeId}`
    : `/seats/room/${roomId}`;
  const response = await api.get<SeatWithBookingStatus[]>(url);
  return response.data;
};

// Query Keys
export const seatsKeys = {
  all: ["seats"] as const,
  byRoom: (roomId: string, showtimeId?: string) =>
    [...seatsKeys.all, "room", roomId, ...(showtimeId ? ["showtime", showtimeId] : [])] as const,
};

export const useSeatsByRoom = (roomId: string, showtimeId?: string) => {
  return useQuery({
    queryKey: seatsKeys.byRoom(roomId, showtimeId),
    queryFn: () => getSeatsByRoom(roomId, showtimeId),
    enabled: !!roomId,
  });
};

// Legacy alias for backward compatibility
export const useSeatsByRoomAndShowtime = (roomId: string, showtimeId: string) => {
  return useSeatsByRoom(roomId, showtimeId);
};
