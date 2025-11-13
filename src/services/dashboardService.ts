// API Service for Dashboard
import { api } from '../lib/apiClient';
import type { DashboardData } from '../utils/dtos/dashboardDTO';

// Dashboard API endpoints
export const dashboardApi = {
  // Get dashboard data for a specific month
  getDashboardData: async (yearMonth: string): Promise<DashboardData> => {
    const response = await api.get<DashboardData>(`/dashboard/${yearMonth}`);
    return response.data;
  },
  
  // Get overall statistics
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
};
