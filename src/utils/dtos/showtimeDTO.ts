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

// API: return array of ShowtimeDTO but only return near future showtimes (within 7 days) (GET with movie_id param)
