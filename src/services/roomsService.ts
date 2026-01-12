import { api } from "../lib/apiClient";
import type {
  RoomDTO,
  CreateRoomDTO,
  UpdateRoomDTO,
} from "../utils/dtos/roomDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { seatsKeys } from "./seatsService";

const createRoom = async (data: CreateRoomDTO): Promise<RoomDTO> => {
  const response = await api.post<RoomDTO>("/rooms", data);
  return response.data;
};

const getAllRooms = async (): Promise<RoomDTO[]> => {
  const response = await api.get<RoomDTO[]>("/rooms");
  return response.data;
};

const getRoomById = async (id: string): Promise<RoomDTO> => {
  const response = await api.get<RoomDTO>(`/rooms/${id}`);
  return response.data;
};

const updateRoom = async (
  id: string,
  data: UpdateRoomDTO
): Promise<RoomDTO> => {
  const response = await api.patch<RoomDTO>(`/rooms/${id}`, data);
  return response.data;
};

const deleteRoom = async (id: string): Promise<void> => {
  await api.delete(`/rooms/${id}`);
};

export const roomsKeys = {
  all: ["rooms"] as const,
  lists: () => [...roomsKeys.all, "list"] as const,
  list: (filters?: string) => [...roomsKeys.lists(), filters] as const,
  details: () => [...roomsKeys.all, "detail"] as const,
  detail: (id: string) => [...roomsKeys.details(), id] as const,
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.lists() });
    },
  });
};

export const useAllRooms = () => {
  return useQuery({
    queryKey: roomsKeys.lists(),
    queryFn: getAllRooms,
  });
};

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: roomsKeys.detail(id),
    queryFn: () => getRoomById(id),
    enabled: !!id,
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoomDTO }) =>
      updateRoom(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: roomsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: seatsKeys.byRoom(id) });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.lists() });
    },
  });
};
