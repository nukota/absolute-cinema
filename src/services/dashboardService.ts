// API Service for Dashboard
import { api } from "../lib/apiClient";
import type { DashboardData } from "../utils/dtos/dashboardDTO";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

// Dashboard API endpoints
export const dashboardApi = {
  // Get dashboard statistics for a specific month
  getDashboardStats: async (month?: string): Promise<DashboardData> => {
    const params = month ? `?month=${month}` : "";
    const response = await api.get<DashboardData>(
      `/invoices/dashboard/stats${params}`
    );
    return response.data;
  },
};

// Query Keys
export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: (month?: string) => [...dashboardKeys.all, "stats", month] as const,
};

// React Query Hooks
export const useDashboardStats = (
  month?: string,
  options?: Omit<
    UseQueryOptions<DashboardData, AxiosError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<DashboardData, AxiosError>({
    queryKey: dashboardKeys.stats(month),
    queryFn: () => dashboardApi.getDashboardStats(month),
    ...options,
  });
};
