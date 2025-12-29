export interface RatingDTO {
  rating_id: string;
  customer: {
    customer_id: string;
    full_name: string;
    email: string;
  };
  movie: {
    movie_id: string;
    title: string;
  };
  rating_value: number;
  review?: string;
  created_at?: string; // timestamp
}

// Create Rating DTO
export interface CreateRatingDTO {
  movie_id: string;
  customer_id: string;
  rating: number;
  review?: string;
}

// Update Rating DTO (partial update)
export interface UpdateRatingDTO {
  rating?: number;
  review?: string;
}
