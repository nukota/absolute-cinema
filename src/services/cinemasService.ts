import { api } from "../lib/apiClient";
import type {
  CinemaDTO,
  CreateCinemaDTO,
  UpdateCinemaDTO,
} from "../utils/dtos/cinemaDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createCinema = async (data: CreateCinemaDTO): Promise<CinemaDTO> => {
  const response = await api.post<CinemaDTO>("/cinemas", data);
  return response.data;
};

const getAllCinemas = async (): Promise<CinemaDTO[]> => {
  const response = await api.get<CinemaDTO[]>("/cinemas");
  return response.data;
};

const getCinemaById = async (id: string): Promise<CinemaDTO> => {
  const response = await api.get<CinemaDTO>(`/cinemas/${id}`);
  return response.data;
};

const updateCinema = async (
  id: string,
  data: UpdateCinemaDTO
): Promise<CinemaDTO> => {
  const response = await api.patch<CinemaDTO>(`/cinemas/${id}`, data);
  return response.data;
};

const deleteCinema = async (id: string): Promise<void> => {
  await api.delete(`/cinemas/${id}`);
};

export const cinemasKeys = {
  all: ["cinemas"] as const,
  lists: () => [...cinemasKeys.all, "list"] as const,
  list: (filters?: string) => [...cinemasKeys.lists(), filters] as const,
  details: () => [...cinemasKeys.all, "detail"] as const,
  detail: (id: string) => [...cinemasKeys.details(), id] as const,
};

export const useCreateCinema = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCinema,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cinemasKeys.lists() });
    },
  });
};

export const useAllCinemas = () => {
  return useQuery({
    queryKey: cinemasKeys.lists(),
    queryFn: getAllCinemas,
  });
};

export const useCinema = (id: string) => {
  return useQuery({
    queryKey: cinemasKeys.detail(id),
    queryFn: () => getCinemaById(id),
    enabled: !!id,
  });
};

export const useUpdateCinema = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCinemaDTO }) =>
      updateCinema(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: cinemasKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cinemasKeys.detail(id) });
    },
  });
};

export const useDeleteCinema = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCinema,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cinemasKeys.lists() });
    },
  });
};
