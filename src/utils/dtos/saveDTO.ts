// Create Save DTO
export interface CreateSaveDto {
  customer_id: string;
  movie_id: string;
}

// Saved movie response interface
export interface SavedMovieResponse {
  customer_id: string;
  movie_id: string;
  movie: {
    title: string;
    poster_url: string;
  };
}
