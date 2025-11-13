// React Query hooks for Dashboard
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../services/dashboardService';
import type { DashboardData } from '../utils/dtos/dashboardDTO';

// Query keys for dashboard
export const dashboardKeys = {
  all: ['dashboard'] as const,
  data: (yearMonth: string) => [...dashboardKeys.all, 'data', yearMonth] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
};

// Hook to fetch dashboard data for a specific month
export const useDashboardData = (yearMonth: string) => {
  return useQuery<DashboardData>({
    queryKey: dashboardKeys.data(yearMonth),
    queryFn: () => dashboardApi.getDashboardData(yearMonth),
    enabled: !!yearMonth, // Only run query if yearMonth is provided
  });
};

// Hook to fetch dashboard stats
export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: dashboardApi.getStats,
  });
};
