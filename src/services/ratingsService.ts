import { api } from '../lib/apiClient';
import type {
  CreateRatingDTO,
  RatingDTO,
  UpdateRatingDTO,
} from '../utils/dtos/ratingDTO';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const createRating = async (data: CreateRatingDTO): Promise<RatingDTO> => {
  const response = await api.post<RatingDTO>('/ratings', data);
  return response.data;
};

const getAllRatings = async (): Promise<RatingDTO[]> => {
  const response = await api.get<RatingDTO[]>('/ratings');
  return response.data;
};

const getRatingById = async (id: string): Promise<RatingDTO> => {
  const response = await api.get<RatingDTO>(`/ratings/${id}`);
  return response.data;
};

const updateRating = async (
  id: string,
  data: UpdateRatingDTO,
): Promise<RatingDTO> => {
  const response = await api.patch<RatingDTO>(`/ratings/${id}`, data);
  return response.data;
};

const deleteRating = async (id: string): Promise<void> => {
  await api.delete(`/ratings/${id}`);
};

export const ratingsApi = {
  createRating,
  getAllRatings,
  getRatingById,
  updateRating,
  deleteRating,
};

export const ratingsKeys = {
  all: ['ratings'] as const,
  lists: () => [...ratingsKeys.all, 'list'] as const,
  list: (filters?: string) => [...ratingsKeys.lists(), filters] as const,
  details: () => [...ratingsKeys.all, 'detail'] as const,
  detail: (id: string) => [...ratingsKeys.details(), id] as const,
};

export const useCreateRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingsKeys.lists() });
    },
  });
};

export const useAllRatings = () => {
  return useQuery({
    queryKey: ratingsKeys.lists(),
    queryFn: getAllRatings,
  });
};

export const useRating = (id: string) => {
  return useQuery({
    queryKey: ratingsKeys.detail(id),
    queryFn: () => getRatingById(id),
    enabled: !!id,
  });
};

export const useUpdateRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRatingDTO }) =>
      updateRating(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ratingsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ratingsKeys.detail(id) });
    },
  });
};

export const useDeleteRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingsKeys.lists() });
    },
  });
};
