import type { MovieStatus } from '../enum';

export interface MovieDTO {
  movie_id: string;
  title: string;
  description?: string;
  duration_min: number;
  release_date: string; // date
  rating?: number;
  poster_url?: string;
  director?: string;
  actors?: any; // JSON (can be array or object)
  genre?: any; // JSON (can be array or object)
  created_at?: string; // timestamp
  status: MovieStatus; // IMPORTANT! (calculate this based on release_date)
  //if release_date <= today => Coming Soon,
  //if release_date > today + 30 days => Stopped
}

// API: return array of UserMovieDTO (GET with user_id param)
export interface UserMovieDTO {
  movie_id: string;
  title: string;
  description?: string;
  duration_min: number;
  release_date: string; // date
  rating?: number;
  poster_url?: string;
  director?: string;
  actors?: any; // JSON (can be array or object)
  genre?: any; // JSON (can be array or object)
  created_at?: string; // timestamp
  status: MovieStatus;
  isSaved?: boolean;
}
