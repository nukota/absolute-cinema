// Global type definitions for React Query and API

import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

// Custom query options type with AxiosError
export type QueryOptions<TData, TError = AxiosError> = Omit<
  UseQueryOptions<TData, TError>,
  'queryKey' | 'queryFn'
>;

// Custom mutation options type with AxiosError
export type MutationOptions<TData, TVariables, TError = AxiosError> = Omit<
  UseMutationOptions<TData, TError, TVariables>,
  'mutationFn'
>;

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Error
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
