import type {
  CinemaDTO,
  CustomerDTO,
  InvoiceDTO,
  MovieDTO,
  ProductDTO,
  RatingDTO,
  RoomDTO,
  ShowtimeDTO,
} from "./dtos/admin";
import {
  InvoiceStatus,
  PaymentMethod,
  ProductCategory,
  MovieStatus,
} from "./enum";

import movie1 from "../assets/images/examples/movie1.jpg";
import movie2 from "../assets/images/examples/movie2.jpg";
import movie3 from "../assets/images/examples/movie3.jpg";
import movie4 from "../assets/images/examples/movie4.jpg";
import movie5 from "../assets/images/examples/movie5.jpg";
import movie6 from "../assets/images/examples/movie6.jpg";
import movie7 from "../assets/images/examples/movie7.jpg";
import movie8 from "../assets/images/examples/movie8.jpg";
import movie9 from "../assets/images/examples/movie9.jpg";
import movie10 from "../assets/images/examples/movie10.jpg";
import movie11 from "../assets/images/examples/movie11.jpg";
import movie12 from "../assets/images/examples/movie12.jpg";
import movie13 from "../assets/images/examples/movie13.jpg";
import movie14 from "../assets/images/examples/movie14.jpg";
import movie15 from "../assets/images/examples/movie15.jpg";
import movie16 from "../assets/images/examples/movie16.jpg";

// Re-export DTO types for convenience
export type {
  CinemaDTO,
  CustomerDTO,
  InvoiceDTO,
  MovieDTO,
  ProductDTO,
  RatingDTO,
  RoomDTO,
  ShowtimeDTO,
} from "./dtos/admin";

export const mockCustomers: CustomerDTO[] = [
  {
    customer_id: "1",
    full_name: "Nguyễn Văn An",
    email: "nguyenvanan@example.com",
    password_hash: "hashed_password_1",
    phone_number: "0901234567",
    CCCD: "001090012345",
    created_at: "2023-01-15T10:00:00Z",
  },
  {
    customer_id: "2",
    full_name: "Trần Thị Bình",
    email: "tranthibinh@example.com",
    password_hash: "hashed_password_2",
    phone_number: "0902345678",
    CCCD: "001085067890",
    created_at: "2023-02-20T10:00:00Z",
  },
  {
    customer_id: "3",
    full_name: "Lê Hoàng Cường",
    email: "lehoangcuong@example.com",
    password_hash: "hashed_password_3",
    phone_number: "0903456789",
    CCCD: "001095023456",
    created_at: "2023-03-10T10:00:00Z",
  },
  {
    customer_id: "4",
    full_name: "Phạm Minh Đức",
    email: "phamminhduc@example.com",
    password_hash: "hashed_password_4",
    phone_number: "0904567890",
    CCCD: "001088045678",
    created_at: "2023-04-05T10:00:00Z",
  },
  {
    customer_id: "5",
    full_name: "Võ Thu Hà",
    email: "vothuha@example.com",
    password_hash: "hashed_password_5",
    phone_number: "0905678901",
    CCCD: "001092034567",
    created_at: "2023-05-12T10:00:00Z",
  },
  {
    customer_id: "6",
    full_name: "Đặng Quốc Hùng",
    email: "dangquochung@example.com",
    password_hash: "hashed_password_6",
    phone_number: "0906789012",
    CCCD: "001087056789",
    created_at: "2023-06-18T10:00:00Z",
  },
  {
    customer_id: "7",
    full_name: "Hoàng Thị Lan",
    email: "hoangthilan@example.com",
    password_hash: "hashed_password_7",
    phone_number: "0907890123",
    CCCD: "001093078901",
    created_at: "2023-07-22T10:00:00Z",
  },
  {
    customer_id: "8",
    full_name: "Bùi Văn Long",
    email: "buivanlong@example.com",
    password_hash: "hashed_password_8",
    phone_number: "0908901234",
    CCCD: "001091089012",
    created_at: "2023-08-30T10:00:00Z",
  },
  {
    customer_id: "9",
    full_name: "Dương Thị Mai",
    email: "duongthimai@example.com",
    password_hash: "hashed_password_9",
    phone_number: "0909012345",
    CCCD: "001089090123",
    created_at: "2023-09-14T10:00:00Z",
  },
  {
    customer_id: "10",
    full_name: "Lý Minh Nam",
    email: "lyminhnam@example.com",
    password_hash: "hashed_password_10",
    phone_number: "0900123456",
    CCCD: "001094012345",
    created_at: "2023-10-08T10:00:00Z",
  },
  {
    customer_id: "11",
    full_name: "Ngô Thị Phương",
    email: "ngothiphuong@example.com",
    password_hash: "hashed_password_11",
    phone_number: "0911234567",
    CCCD: "001086023456",
    created_at: "2023-11-15T10:00:00Z",
  },
  {
    customer_id: "12",
    full_name: "Trịnh Văn Quân",
    email: "trinhvanquan@example.com",
    password_hash: "hashed_password_12",
    phone_number: "0912345678",
    CCCD: "001096034567",
    created_at: "2023-12-20T10:00:00Z",
  },
];

export const mockInvoices: InvoiceDTO[] = [
  {
    invoice_id: "INV001",
    invoice_code: "INV001",
    customer: {
      customer_id: "1",
      full_name: "Nguyễn Văn An",
      email: "nguyenvanan@example.com",
    },
    ticket_count: 2,
    product_count: 1,
    tickets: {
      title: "Avengers: Endgame",
      showtime: "2025-10-28T14:30:00Z",
      price: 125000,
      seats: ["A01", "A02"],
    },
    products: [
      {
        product_id: "P002",
        name: "Combo 1 (Big Popcorn + Coke)",
        quantity: 1,
        price: 90000,
        total: 90000,
      },
    ],
    payment_method: PaymentMethod.Card,
    total_amount: 340000,
    status: InvoiceStatus.Completed,
    created_at: "2025-10-28T14:30:00Z",
  },
  {
    invoice_id: "INV002",
    invoice_code: "INV002",
    customer: {
      customer_id: "2",
      full_name: "Trần Thị Bình",
      email: "tranthibinh@example.com",
    },
    ticket_count: 1,
    product_count: 0,
    tickets: {
      title: "The Batman",
      showtime: "2025-10-28T15:45:00Z",
      price: 180000,
      seats: ["B05"],
    },
    products: [],
    payment_method: PaymentMethod.Momo,
    total_amount: 180000,
    status: InvoiceStatus.Completed,
    created_at: "2025-10-28T15:45:00Z",
  },
  {
    invoice_id: "INV003",
    invoice_code: "INV003",
    customer: {
      customer_id: "3",
      full_name: "Lê Hoàng Cường",
      email: "lehoangcuong@example.com",
    },
    ticket_count: 2,
    product_count: 2,
    tickets: {
      title: "Spider-Man: No Way Home",
      showtime: "2025-10-27T18:20:00Z",
      price: 150000,
      seats: ["C10", "C11"],
    },
    products: [
      {
        product_id: "P001",
        name: "Big Popcorn 35 Oz",
        quantity: 1,
        price: 70000,
        total: 70000,
      },
      {
        product_id: "P007",
        name: "Coke 20 Oz",
        quantity: 1,
        price: 30000,
        total: 30000,
      },
    ],
    payment_method: PaymentMethod.Banking,
    total_amount: 400000,
    status: InvoiceStatus.Completed,
    created_at: "2025-10-27T18:20:00Z",
  },
  {
    invoice_id: "INV004",
    invoice_code: "INV004",
    customer: {
      customer_id: "4",
      full_name: "Phạm Minh Đức",
      email: "phamminhduc@example.com",
    },
    ticket_count: 1,
    product_count: 0,
    tickets: {
      title: "Interstellar",
      showtime: "2025-10-27T20:10:00Z",
      price: 150000,
      seats: ["D15"],
    },
    products: [],
    payment_method: PaymentMethod.Card,
    total_amount: 150000,
    status: InvoiceStatus.Pending,
    created_at: "2025-10-27T20:10:00Z",
  },
  {
    invoice_id: "INV005",
    invoice_code: "INV005",
    customer: {
      customer_id: "5",
      full_name: "Võ Thu Hà",
      email: "vothuha@example.com",
    },
    ticket_count: 3,
    product_count: 1,
    tickets: {
      title: "Inception",
      showtime: "2025-10-26T16:30:00Z",
      price: 120000,
      seats: ["E01", "E02", "E03"],
    },
    products: [
      {
        product_id: "P003",
        name: "Combo 2 (2 Big Popcorn + 2 Coke)",
        quantity: 1,
        price: 175000,
        total: 175000,
      },
    ],
    payment_method: PaymentMethod.Momo,
    total_amount: 535000,
    status: InvoiceStatus.Completed,
    created_at: "2025-10-26T16:30:00Z",
  },
];

export const mockRatings: RatingDTO[] = [
  {
    rating_id: "1",
    customer: {
      customer_id: "1",
      full_name: "Nguyễn Văn An",
      email: "nguyenvanan@example.com",
    },
    movie: {
      movie_id: "M001",
      title: "Avengers: Endgame",
    },
    rating_value: 5,
    review: "Phim rất hay và cảm động, diễn xuất tuyệt vời!",
    created_at: "2025-10-28T10:30:00",
  },
  {
    rating_id: "2",
    customer: {
      customer_id: "2",
      full_name: "Trần Thị Bình",
      email: "tranthibinh@example.com",
    },
    movie: {
      movie_id: "M002",
      title: "The Batman",
    },
    rating_value: 4,
    review: "Phim hay nhưng hơi dài, đáng xem!",
    created_at: "2025-10-27T14:20:00",
  },
  {
    rating_id: "3",
    customer: {
      customer_id: "3",
      full_name: "Lê Hoàng Cường",
      email: "lehoangcuong@example.com",
    },
    movie: {
      movie_id: "M003",
      title: "Spider-Man: No Way Home",
    },
    rating_value: 5,
    review: "Tuyệt vời! Không thể tin được!",
    created_at: "2025-10-27T16:45:00",
  },
  {
    rating_id: "4",
    customer: {
      customer_id: "4",
      full_name: "Phạm Minh Đức",
      email: "phamminhduc@example.com",
    },
    movie: {
      movie_id: "M001",
      title: "Avengers: Endgame",
    },
    rating_value: 4,
    review: "Phim hay, đáng xem nhiều lần.",
    created_at: "2025-10-26T18:30:00",
  },
  {
    rating_id: "5",
    customer: {
      customer_id: "5",
      full_name: "Võ Thu Hà",
      email: "vothuha@example.com",
    },
    movie: {
      movie_id: "M004",
      title: "Interstellar",
    },
    rating_value: 5,
    review: "Kiệt tác điện ảnh, cảnh quay đẹp!",
    created_at: "2025-10-26T20:15:00",
  },
  {
    rating_id: "6",
    customer: {
      customer_id: "6",
      full_name: "Đặng Quốc Hùng",
      email: "dangquochung@example.com",
    },
    movie: {
      movie_id: "M002",
      title: "The Batman",
    },
    rating_value: 3,
    review: "Phim ổn nhưng không đặc sắc lắm.",
    created_at: "2025-10-25T15:00:00",
  },
  {
    rating_id: "7",
    customer: {
      customer_id: "7",
      full_name: "Hoàng Thị Lan",
      email: "hoangthilan@example.com",
    },
    movie: {
      movie_id: "M005",
      title: "Inception",
    },
    rating_value: 5,
    review: "Phim hay, cốt truyện phức tạp nhưng hấp dẫn!",
    created_at: "2025-10-25T19:30:00",
  },
  {
    rating_id: "8",
    customer: {
      customer_id: "8",
      full_name: "Bùi Văn Long",
      email: "buivanlong@example.com",
    },
    movie: {
      movie_id: "M003",
      title: "Spider-Man: No Way Home",
    },
    rating_value: 4,
    review: "Phim hay, nhiều bất ngờ!",
    created_at: "2025-10-24T14:45:00",
  },
  {
    rating_id: "9",
    customer: {
      customer_id: "9",
      full_name: "Dương Thị Mai",
      email: "duongthimai@example.com",
    },
    movie: {
      movie_id: "M004",
      title: "Interstellar",
    },
    rating_value: 5,
    review: "Xuất sắc! Âm nhạc và hình ảnh tuyệt vời!",
    created_at: "2025-10-24T17:20:00",
  },
  {
    rating_id: "10",
    customer: {
      customer_id: "10",
      full_name: "Lý Minh Nam",
      email: "lyminhnam@example.com",
    },
    movie: {
      movie_id: "M001",
      title: "Avengers: Endgame",
    },
    rating_value: 5,
    review: "Phim kết thúc hoàn hảo cho series!",
    created_at: "2025-10-23T16:00:00",
  },
  {
    rating_id: "11",
    customer: {
      customer_id: "11",
      full_name: "Ngô Thị Phương",
      email: "ngothiphuong@example.com",
    },
    movie: {
      movie_id: "M005",
      title: "Inception",
    },
    rating_value: 4,
    review: "Phim hay nhưng hơi khó hiểu một chút.",
    created_at: "2025-10-23T19:45:00",
  },
  {
    rating_id: "12",
    customer: {
      customer_id: "12",
      full_name: "Trịnh Văn Quân",
      email: "trinhvanquan@example.com",
    },
    movie: {
      movie_id: "M002",
      title: "The Batman",
    },
    rating_value: 4,
    review: "Diễn xuất tốt, cốt truyện thú vị.",
    created_at: "2025-10-22T15:30:00",
  },
];

export const mockShowtimes: ShowtimeDTO[] = [
  {
    showtime_id: "ST001",
    room: {
      room_id: "R001",
      name: "Room 1 - IMAX",
    },
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    movie: {
      movie_id: "M001",
      title: "Avengers: Endgame",
    },
    start_time: "2025-10-28T10:00:00",
    end_time: "2025-10-28T13:00:00",
    price: 150000,
    created_at: "2025-10-28T10:00:00Z",
  },
  {
    showtime_id: "ST002",
    room: {
      room_id: "R002",
      name: "Room 2 - Standard",
    },
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    movie: {
      movie_id: "M002",
      title: "The Batman",
    },
    start_time: "2025-10-28T11:30:00",
    end_time: "2025-10-28T14:30:00",
    price: 120000,
    created_at: "2025-10-28T11:30:00Z",
  },
  {
    showtime_id: "ST003",
    room: {
      room_id: "R003",
      name: "Room 3 - VIP",
    },
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    movie: {
      movie_id: "M003",
      title: "Spider-Man: No Way Home",
    },
    start_time: "2025-10-28T13:00:00",
    end_time: "2025-10-28T15:30:00",
    price: 180000,
    created_at: "2025-10-28T13:00:00Z",
  },
  {
    showtime_id: "ST004",
    room: {
      room_id: "R001",
      name: "Room 1 - IMAX",
    },
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    movie: {
      movie_id: "M004",
      title: "Interstellar",
    },
    start_time: "2025-10-28T14:00:00",
    end_time: "2025-10-28T17:00:00",
    price: 150000,
    created_at: "2025-10-28T14:00:00Z",
  },
  {
    showtime_id: "ST005",
    room: {
      room_id: "R002",
      name: "Room 2 - Standard",
    },
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    movie: {
      movie_id: "M005",
      title: "Inception",
    },
    start_time: "2025-10-28T15:30:00",
    end_time: "2025-10-28T18:00:00",
    price: 120000,
    created_at: "2025-10-28T15:30:00Z",
  },
  {
    showtime_id: "ST006",
    room: {
      room_id: "R004",
      name: "Room 4 - 4DX",
    },
    cinema: {
      cinema_id: "C002",
      name: "Absolute Cinema - District 3",
    },
    movie: {
      movie_id: "M001",
      title: "Avengers: Endgame",
    },
    start_time: "2025-10-28T17:00:00",
    end_time: "2025-10-28T20:00:00",
    price: 200000,
    created_at: "2025-10-28T17:00:00Z",
  },
  {
    showtime_id: "ST007",
    room: {
      room_id: "R003",
      name: "Room 3 - VIP",
    },
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    movie: {
      movie_id: "M002",
      title: "The Batman",
    },
    start_time: "2025-10-28T18:30:00",
    end_time: "2025-10-28T21:30:00",
    price: 180000,
    created_at: "2025-10-28T18:30:00Z",
  },
  {
    showtime_id: "ST008",
    room: {
      room_id: "R001",
      name: "Room 1 - IMAX",
    },
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    movie: {
      movie_id: "M003",
      title: "Spider-Man: No Way Home",
    },
    start_time: "2025-10-28T19:00:00",
    end_time: "2025-10-28T21:30:00",
    price: 150000,
    created_at: "2025-10-28T19:00:00Z",
  },
  {
    showtime_id: "ST009",
    room: {
      room_id: "R005",
      name: "Room 5 - Premium",
    },
    cinema: {
      cinema_id: "C002",
      name: "Absolute Cinema - District 3",
    },
    movie: {
      movie_id: "M004",
      title: "Interstellar",
    },
    start_time: "2025-10-28T20:00:00",
    end_time: "2025-10-28T23:00:00",
    price: 140000,
    created_at: "2025-10-28T20:00:00Z",
  },
  {
    showtime_id: "ST010",
    room: {
      room_id: "R004",
      name: "Room 4 - 4DX",
    },
    cinema: {
      cinema_id: "C002",
      name: "Absolute Cinema - District 3",
    },
    movie: {
      movie_id: "M005",
      title: "Inception",
    },
    start_time: "2025-10-28T21:30:00",
    end_time: "2025-10-29T00:00:00",
    price: 200000,
    created_at: "2025-10-28T21:30:00Z",
  },
  {
    showtime_id: "ST011",
    room: {
      room_id: "R002",
      name: "Room 2 - Standard",
    },
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    movie: {
      movie_id: "M001",
      title: "Avengers: Endgame",
    },
    start_time: "2025-10-29T10:00:00",
    end_time: "2025-10-29T13:00:00",
    price: 120000,
    created_at: "2025-10-29T10:00:00Z",
  },
  {
    showtime_id: "ST012",
    room: {
      room_id: "R005",
      name: "Room 5 - Premium",
    },
    cinema: {
      cinema_id: "C002",
      name: "Absolute Cinema - District 3",
    },
    movie: {
      movie_id: "M003",
      title: "Spider-Man: No Way Home",
    },
    start_time: "2025-10-29T14:00:00",
    end_time: "2025-10-29T16:30:00",
    price: 140000,
    created_at: "2025-10-29T14:00:00Z",
  },
];

export const mockMovies: MovieDTO[] = [
  {
    movie_id: "M001",
    title: "Avengers: Endgame",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins.",
    duration_min: 181,
    release_date: "2019-04-26",
    rating: 4.5,
    poster_url: movie1,
    director: "Anthony Russo, Joe Russo",
    actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    genre: ["Action", "Adventure", "Sci-Fi"],
    created_at: "2019-04-26T00:00:00Z",
    status: MovieStatus.NowShowing,
  },
  {
    movie_id: "M002",
    title: "The Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham.",
    duration_min: 176,
    release_date: "2022-03-04",
    rating: 4.5,
    poster_url: movie2,
    director: "Matt Reeves",
    actors: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright"],
    genre: ["Action", "Crime", "Drama"],
    created_at: "2022-03-04T00:00:00Z",
    status: MovieStatus.ComingSoon,
  },
  {
    movie_id: "M003",
    title: "Spider-Man: No Way Home",
    description:
      "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help.",
    duration_min: 148,
    release_date: "2021-12-17",
    rating: 4.5,
    poster_url: movie3,
    director: "Jon Watts",
    actors: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    genre: ["Action", "Adventure", "Fantasy"],
    created_at: "2021-12-17T00:00:00Z",
    status: MovieStatus.NowShowing,
  },
  {
    movie_id: "M004",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    duration_min: 169,
    release_date: "2014-11-07",
    rating: 4.5,
    poster_url: movie4,
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    genre: ["Adventure", "Drama", "Sci-Fi"],
    created_at: "2014-11-07T00:00:00Z",
    status: MovieStatus.NowShowing,
  },
  {
    movie_id: "M005",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology.",
    duration_min: 148,
    release_date: "2010-07-16",
    rating: 4.5,
    poster_url: movie5,
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    genre: ["Action", "Sci-Fi", "Thriller"],
    created_at: "2010-07-16T00:00:00Z",
    status: MovieStatus.Stopped,
  },
  {
    movie_id: "M006",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
    duration_min: 152,
    release_date: "2008-07-18",
    rating: 4.5,
    poster_url: movie6,
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    genre: ["Action", "Crime", "Drama"],
    created_at: "2008-07-18T00:00:00Z",
    status: MovieStatus.Stopped,
  },
  {
    movie_id: "M007",
    title: "The Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality.",
    duration_min: 136,
    release_date: "1999-03-31",
    rating: 4,
    poster_url: movie7,
    director: "Lana Wachowski, Lilly Wachowski",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    genre: ["Action", "Sci-Fi"],
    created_at: "1999-03-31T00:00:00Z",
    status: MovieStatus.NowShowing,
  },
  {
    movie_id: "M008",
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    duration_min: 154,
    release_date: "1994-10-14",
    rating: 4,
    poster_url: movie8,
    director: "Quentin Tarantino",
    actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    genre: ["Crime", "Drama"],
    created_at: "1994-10-14T00:00:00Z",
    status: MovieStatus.Stopped,
  },
  {
    movie_id: "M009",
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    duration_min: 142,
    release_date: "1994-07-06",
    rating: 4.5,
    poster_url: movie9,
    director: "Robert Zemeckis",
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    genre: ["Drama", "Romance"],
    created_at: "1994-07-06T00:00:00Z",
    status: MovieStatus.NowShowing,
  },
  {
    movie_id: "M010",
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    duration_min: 142,
    release_date: "1994-09-23",
    rating: 4,
    poster_url: movie10,
    director: "Frank Darabont",
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    genre: ["Drama"],
    created_at: "1994-09-23T00:00:00Z",
    status: MovieStatus.Stopped,
  },
  {
    movie_id: "M011",
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    duration_min: 139,
    release_date: "1999-10-15",
    rating: 4,
    poster_url: movie11,
    director: "David Fincher",
    actors: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    genre: ["Drama"],
    created_at: "1999-10-15T00:00:00Z",
    status: MovieStatus.ComingSoon,
  },
  {
    movie_id: "M012",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    duration_min: 178,
    release_date: "2001-12-19",
    rating: 4.5,
    poster_url: movie12,
    director: "Peter Jackson",
    actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    genre: ["Action", "Adventure", "Drama"],
    created_at: "2001-12-19T00:00:00Z",
    status: MovieStatus.NowShowing,
  },
  {
    movie_id: "M013",
    title: "Star Wars: A New Hope",
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
    duration_min: 121,
    release_date: "1977-05-25",
    rating: 4,
    poster_url: movie13,
    director: "George Lucas",
    actors: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    genre: ["Action", "Adventure", "Fantasy"],
    created_at: "1977-05-25T00:00:00Z",
    status: MovieStatus.Stopped,
  },
  {
    movie_id: "M014",
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    duration_min: 175,
    release_date: "1972-03-24",
    rating: 4,
    poster_url: movie14,
    director: "Francis Ford Coppola",
    actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    genre: ["Crime", "Drama"],
    created_at: "1972-03-24T00:00:00Z",
    status: MovieStatus.ComingSoon,
  },
  {
    movie_id: "M015",
    title: "Titanic",
    description:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    duration_min: 194,
    release_date: "1997-12-19",
    rating: 4.5,
    poster_url: movie15,
    director: "James Cameron",
    actors: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"],
    genre: ["Drama", "Romance"],
    created_at: "1997-12-19T00:00:00Z",
    status: MovieStatus.NowShowing,
  },
  {
    movie_id: "M016",
    title: "Jurassic Park",
    description:
      "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    duration_min: 127,
    release_date: "1993-06-11",
    rating: 4.5,
    poster_url: movie16,
    director: "Steven Spielberg",
    actors: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
    genre: ["Action", "Adventure", "Sci-Fi"],
    created_at: "1993-06-11T00:00:00Z",
    status: MovieStatus.Stopped,
  },
];

export const mockCinemas: CinemaDTO[] = [
  {
    cinema_id: "C001",
    name: "Starlight Cinema",
    address: "123 Nguyen Hue Street",
    employee_count: 50,
    room_count: 8,
  },
  {
    cinema_id: "C002",
    name: "Galaxy Movies",
    address: "456 Le Van Sy Street",
    employee_count: 40,
    room_count: 6,
  },
  {
    cinema_id: "C003",
    name: "Premier Cinema",
    address: "789 Nguyen Van Linh Boulevard",
    employee_count: 60,
    room_count: 10,
  },
  {
    cinema_id: "C004",
    name: "Elite Films Binh Thanh",
    address: "321 Xo Viet Nghe Tinh Street",
    employee_count: 30,
    room_count: 5,
  },
];

export const mockRooms: RoomDTO[] = [
  {
    room_id: "R001",
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    name: "Room 1 - IMAX",
    capacity: 300,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    room_id: "R002",
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    name: "Room 2 - Standard",
    capacity: 150,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    room_id: "R003",
    cinema: {
      cinema_id: "C001",
      name: "Absolute Cinema - District 1",
    },
    name: "Room 3 - VIP",
    capacity: 80,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    room_id: "R004",
    cinema: {
      cinema_id: "C002",
      name: "Absolute Cinema - District 3",
    },
    name: "Room 4 - 4DX",
    capacity: 120,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    room_id: "R005",
    cinema: {
      cinema_id: "C002",
      name: "Absolute Cinema - District 3",
    },
    name: "Room 5 - Premium",
    capacity: 100,
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    room_id: "R006",
    cinema: {
      cinema_id: "C003",
      name: "Absolute Cinema - District 7",
    },
    name: "Room 1 - IMAX",
    capacity: 350,
    created_at: "2023-01-01T00:00:00Z",
  },
];

export const mockProducts: ProductDTO[] = [
  {
    product_id: "P001",
    name: "Big Popcorn 35 Oz",
    category: ProductCategory.Food,
    price: 70000,
    image: "https://i.imgur.com/HphT7KN.png",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    product_id: "P002",
    name: "Combo 1 (Big Popcorn + Coke)",
    category: ProductCategory.Food,
    price: 90000,
    image: "https://i.imgur.com/Qr2pwRW.png",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    product_id: "P003",
    name: "Combo 2 (2 Big Popcorn + 2 Coke)",
    category: ProductCategory.Food,
    price: 175000,
    image: "https://i.imgur.com/J8NgzaV.png",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    product_id: "P004",
    name: "Lays 30 Oz",
    category: ProductCategory.Food,
    price: 45000,
    image: "https://i.imgur.com/xH3XypR.png",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    product_id: "P005",
    name: "Water 20 Oz",
    category: ProductCategory.Drink,
    price: 20000,
    image: "https://i.imgur.com/cg8Zow1.png",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    product_id: "P006",
    name: "Sprite 20 Oz",
    category: ProductCategory.Drink,
    price: 35000,
    image: "https://i.imgur.com/vUFvQDy.png",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    product_id: "P007",
    name: "Coke 20 Oz",
    category: ProductCategory.Drink,
    price: 30000,
    image: "https://i.imgur.com/AJDaGc7.png",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    product_id: "P008",
    name: "Small Popcorn 20 Oz",
    category: ProductCategory.Food,
    price: 55000,
    image: "https://i.imgur.com/grWOYhi.png",
    created_at: "2023-01-01T00:00:00Z",
  },
];

// Mock user data
export const mockUser = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+84 123 456 789",
  memberSince: "2024-01-15",
  totalBookings: 12,
};

// Mock booking history
export const mockBookingHistory = [
  {
    id: "BK001",
    movieTitle: "Inception",
    cinema: "Absolute Cinema - District 1",
    date: "2024-10-25",
    seats: ["A5", "A6"],
    total: 200000,
    status: "Completed",
  },
  {
    id: "BK002",
    movieTitle: "The Dark Knight",
    cinema: "Absolute Cinema - District 2",
    date: "2024-10-20",
    seats: ["B3", "B4"],
    total: 180000,
    status: "Completed",
  },
  {
    id: "BK003",
    movieTitle: "Interstellar",
    cinema: "Absolute Cinema - District 1",
    date: "2024-10-15",
    seats: ["C1", "C2", "C3"],
    total: 270000,
    status: "Completed",
  },
];
