import { api } from "../lib/apiClient";
import type {
  MovieDTO,
  UserMovieDTO,
  CreateMovieDTO,
  UpdateMovieDTO,
} from "../utils/dtos/movieDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createMovie = async (data: CreateMovieDTO): Promise<MovieDTO> => {
  const response = await api.post<MovieDTO>("/movies", data);
  return response.data;
};

const getAllMovies = async (): Promise<MovieDTO[]> => {
  const response = await api.get<MovieDTO[]>("/movies");
  return response.data;
};

const getMovieById = async (id: string): Promise<MovieDTO> => {
  const response = await api.get<MovieDTO>(`/movies/${id}`);
  return response.data;
};

const getMovieBySlug = async (slug: string): Promise<MovieDTO> => {
  const response = await api.get<MovieDTO>(`/movies/slug/${slug}`);
  return response.data;
};

const getMoviesByCustomerId = async (
  customerId: string
): Promise<UserMovieDTO[]> => {
  const response = await api.get<UserMovieDTO[]>(
    `/movies/customer/${customerId}`
  );
  return response.data;
};

const updateMovie = async (
  id: string,
  data: UpdateMovieDTO
): Promise<MovieDTO> => {
  const response = await api.patch<MovieDTO>(`/movies/${id}`, data);
  return response.data;
};

const deleteMovie = async (id: string): Promise<void> => {
  await api.delete(`/movies/${id}`);
};

export const moviesKeys = {
  all: ["movies"] as const,
  lists: () => [...moviesKeys.all, "list"] as const,
  list: (filters?: string) => [...moviesKeys.lists(), filters] as const,
  details: () => [...moviesKeys.all, "detail"] as const,
  detail: (id: string) => [...moviesKeys.details(), id] as const,
  bySlug: (slug: string) => [...moviesKeys.all, "slug", slug] as const,
  byCustomer: (customerId: string) =>
    [...moviesKeys.all, "customer", customerId] as const,
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moviesKeys.lists() });
    },
  });
};

export const useAllMovies = () => {
  return useQuery({
    queryKey: moviesKeys.lists(),
    queryFn: getAllMovies,
  });
};

export const useMovie = (id: string) => {
  return useQuery({
    queryKey: moviesKeys.detail(id),
    queryFn: () => getMovieById(id),
    enabled: !!id,
  });
};

export const useMovieBySlug = (slug: string) => {
  return useQuery({
    queryKey: moviesKeys.bySlug(slug),
    queryFn: () => getMovieBySlug(slug),
    enabled: !!slug,
  });
};

export const useMoviesByCustomer = (customerId: string) => {
  return useQuery({
    queryKey: moviesKeys.byCustomer(customerId),
    queryFn: () => getMoviesByCustomerId(customerId),
    enabled: !!customerId,
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMovieDTO }) =>
      updateMovie(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: moviesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: moviesKeys.detail(id) });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moviesKeys.lists() });
    },
  });
};
