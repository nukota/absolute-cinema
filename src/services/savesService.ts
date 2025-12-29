import { api } from "../lib/apiClient";
import type { CreateSaveDto, SavedMovieResponse } from "../utils/dtos/saveDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const saveMovie = async (data: CreateSaveDto): Promise<SavedMovieResponse> => {
  const response = await api.post<SavedMovieResponse>("/saves", data);
  return response.data;
};

const getAllSaves = async (): Promise<SavedMovieResponse[]> => {
  const response = await api.get<SavedMovieResponse[]>("/saves");
  return response.data;
};

const getSavedMoviesByCustomer = async (
  customerId: string
): Promise<SavedMovieResponse[]> => {
  const response = await api.get<SavedMovieResponse[]>(`/saves/${customerId}`);
  return response.data;
};

const removeSavedMovie = async (
  customerId: string,
  movieId: string
): Promise<void> => {
  await api.delete(`/saves/${customerId}/${movieId}`);
};

export const savesKeys = {
  all: ["saves"] as const,
  lists: () => [...savesKeys.all, "list"] as const,
  list: (filters?: string) => [...savesKeys.lists(), filters] as const,
  byCustomer: (customerId: string) =>
    [...savesKeys.all, "customer", customerId] as const,
};

export const useSaveMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savesKeys.lists() });
    },
  });
};

export const useAllSaves = () => {
  return useQuery({
    queryKey: savesKeys.lists(),
    queryFn: getAllSaves,
  });
};

export const useSavedMoviesByCustomer = (customerId: string) => {
  return useQuery({
    queryKey: savesKeys.byCustomer(customerId),
    queryFn: () => getSavedMoviesByCustomer(customerId),
    enabled: !!customerId,
  });
};

export const useRemoveSavedMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      customerId,
      movieId,
    }: {
      customerId: string;
      movieId: string;
    }) => removeSavedMovie(customerId, movieId),
    onSuccess: (_, { customerId }) => {
      queryClient.invalidateQueries({ queryKey: savesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: savesKeys.byCustomer(customerId),
      });
    },
  });
};
