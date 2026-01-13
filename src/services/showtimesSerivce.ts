import { api } from "../lib/apiClient";
import type {
  ShowtimeDTO,
  CreateShowtimeDto,
  UpdateShowtimeDTO,
} from "../utils/dtos/showtimeDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createShowtime = async (
  data: CreateShowtimeDto
): Promise<ShowtimeDTO> => {
  const response = await api.post<ShowtimeDTO>("/showtimes", data);
  return response.data;
};

const getAllShowtimes = async (): Promise<ShowtimeDTO[]> => {
  const response = await api.get<ShowtimeDTO[]>("/showtimes");
  return response.data;
};

const getShowtimesByMovieId = async (
  movieId: string
): Promise<ShowtimeDTO[]> => {
  const response = await api.get<ShowtimeDTO[]>(`/showtimes/movie/${movieId}`);
  return response.data;
};

const getShowtimeById = async (id: string): Promise<ShowtimeDTO> => {
  const response = await api.get<ShowtimeDTO>(`/showtimes/${id}`);
  return response.data;
};

export { getShowtimeById };

const updateShowtime = async (
  id: string,
  data: UpdateShowtimeDTO
): Promise<ShowtimeDTO> => {
  const response = await api.patch<ShowtimeDTO>(`/showtimes/${id}`, data);
  return response.data;
};

const deleteShowtime = async (id: string): Promise<void> => {
  await api.delete(`/showtimes/${id}`);
};

const notifyUsers = async (
  showtime_id: string
): Promise<{ message: string; notified_users: number }> => {
  const response = await api.post<{
    message: string;
    notified_users: number;
  }>("/showtimes/notify", { showtime_id });
  return response.data;
};

export const showtimesKeys = {
  all: ["showtimes"] as const,
  lists: () => [...showtimesKeys.all, "list"] as const,
  list: (filters?: string) => [...showtimesKeys.lists(), filters] as const,
  details: () => [...showtimesKeys.all, "detail"] as const,
  detail: (id: string) => [...showtimesKeys.details(), id] as const,
  byMovie: (movieId: string) =>
    [...showtimesKeys.all, "movie", movieId] as const,
};

export const useCreateShowtime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createShowtime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: showtimesKeys.lists() });
    },
  });
};

export const useAllShowtimes = () => {
  return useQuery({
    queryKey: showtimesKeys.lists(),
    queryFn: getAllShowtimes,
  });
};

export const useShowtimesByMovie = (movieId: string) => {
  return useQuery({
    queryKey: showtimesKeys.byMovie(movieId),
    queryFn: () => getShowtimesByMovieId(movieId),
    enabled: !!movieId,
  });
};

export const useShowtime = (id: string) => {
  return useQuery({
    queryKey: showtimesKeys.detail(id),
    queryFn: () => getShowtimeById(id),
    enabled: !!id,
  });
};

export const useUpdateShowtime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateShowtimeDTO }) =>
      updateShowtime(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: showtimesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: showtimesKeys.detail(id),
      });
    },
  });
};

export const useDeleteShowtime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteShowtime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: showtimesKeys.lists() });
    },
  });
};

export const useNotifyUsers = () => {
  return useMutation({
    mutationFn: notifyUsers,
  });
};
