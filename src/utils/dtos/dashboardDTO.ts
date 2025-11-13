export interface DashboardStats {
  total_revenue: number;
  total_customers: number;
  movies_showing: number;
  tickets_sold: number;
}

export interface DailyData {
  date: string; // Format: "YYYY-MM-DD"
  revenue: number;
  tickets: number;
}

export interface GenreDistribution {
  genre: string;
  percentage: number;
}

export interface TopMovie {
  movie_name: string;
  tickets_sold: number;
}

export interface DashboardData {
  stats: DashboardStats;
  daily_data: DailyData[]; // Data for the selected month (15 entries, one per 2 days)
  genre_distribution: GenreDistribution[];
  top_movies: TopMovie[];
  month: string; // Format: "YYYY-MM"
}
