import { api } from "../lib/apiClient";
import type { SeatsDTO } from "../utils/dtos/roomDTO";
import type {
  CreateSeatDto,
  UpdateSeatDto,
  SeatDTO,
  SeatWithBookingStatus,
} from "../utils/dtos/seatDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createSeat = async (data: CreateSeatDto): Promise<SeatDTO> => {
  const response = await api.post<SeatDTO>("/seats", data);
  return response.data;
};

const getAllSeats = async (): Promise<SeatDTO[]> => {
  const response = await api.get<SeatDTO[]>("/seats");
  return response.data;
};

const getSeatById = async (id: string): Promise<SeatDTO> => {
  const response = await api.get<SeatDTO>(`/seats/${id}`);
  return response.data;
};

const getSeatsByRoomAndShowtime = async (
  roomId: string,
  showtimeId: string
): Promise<SeatWithBookingStatus[]> => {
  const response = await api.get<SeatWithBookingStatus[]>(
    `/seats/room/${roomId}/showtime/${showtimeId}`
  );
  return response.data;
};

const getSeatsByRoom = async (roomId: string): Promise<SeatsDTO> => {
  const response = await api.get<SeatsDTO>(`/seats/room/${roomId}`);
  return response.data;
};

const updateSeat = async (
  id: string,
  data: UpdateSeatDto
): Promise<SeatDTO> => {
  const response = await api.patch<SeatDTO>(`/seats/${id}`, data);
  return response.data;
};

const deleteSeat = async (id: string): Promise<void> => {
  await api.delete(`/seats/${id}`);
};

// Query Keys
export const seatsKeys = {
  all: ["seats"] as const,
  lists: () => [...seatsKeys.all, "list"] as const,
  list: (filters?: string) => [...seatsKeys.lists(), filters] as const,
  details: () => [...seatsKeys.all, "detail"] as const,
  detail: (id: string) => [...seatsKeys.details(), id] as const,
  byRoomAndShowtime: (roomId: string, showtimeId: string) =>
    [...seatsKeys.all, "room", roomId, "showtime", showtimeId] as const,
  byRoom: (roomId: string) => [...seatsKeys.all, "room", roomId] as const,
};

export const useCreateSeat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSeat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: seatsKeys.lists() });
    },
  });
};

export const useAllSeats = () => {
  return useQuery({
    queryKey: seatsKeys.lists(),
    queryFn: getAllSeats,
  });
};

export const useSeat = (id: string) => {
  return useQuery({
    queryKey: seatsKeys.detail(id),
    queryFn: () => getSeatById(id),
    enabled: !!id,
  });
};

export const useSeatsByRoomAndShowtime = (
  roomId: string,
  showtimeId: string
) => {
  return useQuery({
    queryKey: seatsKeys.byRoomAndShowtime(roomId, showtimeId),
    queryFn: () => getSeatsByRoomAndShowtime(roomId, showtimeId),
    enabled: !!roomId && !!showtimeId,
  });
};

export const useSeatsByRoom = (roomId: string) => {
  return useQuery({
    queryKey: seatsKeys.byRoom(roomId),
    queryFn: () => getSeatsByRoom(roomId),
    enabled: !!roomId,
  });
};

export const useUpdateSeat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSeatDto }) =>
      updateSeat(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: seatsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: seatsKeys.detail(id) });
    },
  });
};

export const useDeleteSeat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSeat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: seatsKeys.lists() });
    },
  });
};
