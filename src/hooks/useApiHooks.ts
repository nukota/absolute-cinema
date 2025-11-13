// Common React Query hooks and utilities
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

// Generic mutation hook with error handling
export const useApiMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, AxiosError, TVariables>, 'mutationFn'>
) => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn,
    ...options,
  });
};

// Hook to invalidate queries
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();
  
  return (queryKey: unknown[]) => {
    queryClient.invalidateQueries({ queryKey });
  };
};

// Hook to prefetch data
export const usePrefetchQuery = () => {
  const queryClient = useQueryClient();
  
  return async <TData>(
    queryKey: unknown[],
    queryFn: () => Promise<TData>
  ) => {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
    });
  };
};

// Type for API error response
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// Helper to extract error message from axios error
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return axiosError.response?.data?.message || 'An error occurred';
  }
  
  return 'An unknown error occurred';
};
