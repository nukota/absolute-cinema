export interface ShowtimeDTO {
  showtime_id: string;
  cinema: {
    cinema_id: string;
    name: string;
  };
  room: {
    room_id: string;
    name: string;
  };
  movie: {
    movie_id: string;
    title: string;
  };
  start_time: string; // timestamp
  end_time: string; // timestamp
  price: number;
  created_at?: string; // timestamp
}

// Create Showtime DTO
export interface CreateShowtimeDto {
  movie_id: string;
  room_id: string;
  start_time: string;
  end_time: string;
  price: number;
}

// Update Showtime DTO (partial update)
export interface UpdateShowtimeDTO {
  movie_id?: string;
  room_id?: string;
  start_time?: string;
  end_time?: string;
  price?: number;
}

// API: return array of ShowtimeDTO but only return near future showtimes (within 7 days) (GET with movie_id param)
