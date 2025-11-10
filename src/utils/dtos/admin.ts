import type {
  InvoiceStatus,
  MovieStatus,
  PaymentMethod,
  ProductCategory,
} from '../enum';

export interface CinemaDTO {
  cinema_id: string;
  name: string;
  address: string;
  employee_count: number;
  room_count: number;
}

export interface CustomerDTO {
  customer_id: string;
  full_name: string;
  email: string;
  dob: string;
  password_hash: string;
  phone_number?: string;
  created_at?: string; // timestamp
  CCCD?: string;
}

export interface InvoiceDTO {
  invoice_id: string;
  invoice_code: string;
  customer: {
    customer_id: string;
    full_name: string;
    email: string;
  };
  ticket_count: number;
  product_count: number;
  tickets: {
    title: string; // movie title
    showtime: string; // timestamp
    price: number; // price per ticket
    seats: string[]; //eg. A01, A02
  };
  products: {
    product_id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  payment_method: PaymentMethod;
  total_amount: number;
  status: InvoiceStatus;
  created_at: string; // timestamp
}

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

export interface ProductDTO {
  product_id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image?: string;
  created_at?: string; // timestamp
}

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

export interface RoomDTO {
  room_id: string;
  cinema: {
    cinema_id: string;
    name: string;
  };
  name: string;
  capacity: number;
  created_at?: string; // timestamp
}

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
