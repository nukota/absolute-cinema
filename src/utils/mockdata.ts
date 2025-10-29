export interface Customer {
  _id: string;
  full_name: string;
  dob: string;
  cccd: string;
  email: string;
}

export interface Invoice {
  _id: string;
  customer_id: string;
  customer_name: string;
  total_amount: number;
  payment_method: string;
  paid_at: string;
}

export interface Movie {
  _id: string;
  title: string;
}

export interface Rating {
  _id: string;
  customer_id: string;
  customer_name: string;
  movie_id: string;
  movie_title: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Showtime {
  _id: string;
  movie_id: string;
  movie_title: string;
  room_id: string;
  room_name: string;
  start_time: string;
  end_time: string;
  price: number;
}

export interface Movie {
  _id: string;
  title: string;
  poster: string;
  genre: string[];
  duration: number;
  rating: number;
  release_date: string;
  status: string;
  description: string;
}

export interface Cinema {
  _id: string;
  name: string;
  address: string;
  total_rooms: number;
}

export interface Room {
  _id: string;
  name: string;
  cinema_id: string;
  cinema_name: string;
  type: string;
  capacity: number;
  status: string;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export const mockCustomers: Customer[] = [
  {
    _id: "1",
    full_name: "Nguyễn Văn An",
    dob: "1990-05-15",
    cccd: "001090012345",
    email: "nguyenvanan@example.com",
  },
  {
    _id: "2",
    full_name: "Trần Thị Bình",
    dob: "1985-08-22",
    cccd: "001085067890",
    email: "tranthibinh@example.com",
  },
  {
    _id: "3",
    full_name: "Lê Hoàng Cường",
    dob: "1995-03-10",
    cccd: "001095023456",
    email: "lehoangcuong@example.com",
  },
  {
    _id: "4",
    full_name: "Phạm Minh Đức",
    dob: "1988-11-30",
    cccd: "001088045678",
    email: "phamminhduc@example.com",
  },
  {
    _id: "5",
    full_name: "Võ Thu Hà",
    dob: "1992-07-18",
    cccd: "001092034567",
    email: "vothuha@example.com",
  },
  {
    _id: "6",
    full_name: "Đặng Quốc Hùng",
    dob: "1987-12-25",
    cccd: "001087056789",
    email: "dangquochung@example.com",
  },
  {
    _id: "7",
    full_name: "Hoàng Thị Lan",
    dob: "1993-04-08",
    cccd: "001093078901",
    email: "hoangthilan@example.com",
  },
  {
    _id: "8",
    full_name: "Bùi Văn Long",
    dob: "1991-09-14",
    cccd: "001091089012",
    email: "buivanlong@example.com",
  },
  {
    _id: "9",
    full_name: "Dương Thị Mai",
    dob: "1989-06-20",
    cccd: "001089090123",
    email: "duongthimai@example.com",
  },
  {
    _id: "10",
    full_name: "Lý Minh Nam",
    dob: "1994-02-28",
    cccd: "001094012345",
    email: "lyminhnam@example.com",
  },
  {
    _id: "11",
    full_name: "Ngô Thị Phương",
    dob: "1986-10-05",
    cccd: "001086023456",
    email: "ngothiphuong@example.com",
  },
  {
    _id: "12",
    full_name: "Trịnh Văn Quân",
    dob: "1996-01-12",
    cccd: "001096034567",
    email: "trinhvanquan@example.com",
  },
];

export const mockInvoices: Invoice[] = [
  {
    _id: "INV001",
    customer_id: "1",
    customer_name: "Nguyễn Văn An",
    total_amount: 250000,
    payment_method: "Credit Card",
    paid_at: "2025-10-28T14:30:00",
  },
  {
    _id: "INV002",
    customer_id: "2",
    customer_name: "Trần Thị Bình",
    total_amount: 180000,
    payment_method: "Cash",
    paid_at: "2025-10-28T15:45:00",
  },
  {
    _id: "INV003",
    customer_id: "3",
    customer_name: "Lê Hoàng Cường",
    total_amount: 320000,
    payment_method: "E-Wallet",
    paid_at: "2025-10-27T18:20:00",
  },
  {
    _id: "INV004",
    customer_id: "4",
    customer_name: "Phạm Minh Đức",
    total_amount: 150000,
    payment_method: "Credit Card",
    paid_at: "2025-10-27T20:10:00",
  },
  {
    _id: "INV005",
    customer_id: "5",
    customer_name: "Võ Thu Hà",
    total_amount: 275000,
    payment_method: "Debit Card",
    paid_at: "2025-10-26T16:30:00",
  },
  {
    _id: "INV006",
    customer_id: "6",
    customer_name: "Đặng Quốc Hùng",
    total_amount: 200000,
    payment_method: "E-Wallet",
    paid_at: "2025-10-26T19:45:00",
  },
  {
    _id: "INV007",
    customer_id: "7",
    customer_name: "Hoàng Thị Lan",
    total_amount: 340000,
    payment_method: "Cash",
    paid_at: "2025-10-25T14:20:00",
  },
  {
    _id: "INV008",
    customer_id: "8",
    customer_name: "Bùi Văn Long",
    total_amount: 190000,
    payment_method: "Credit Card",
    paid_at: "2025-10-25T17:00:00",
  },
  {
    _id: "INV009",
    customer_id: "9",
    customer_name: "Dương Thị Mai",
    total_amount: 260000,
    payment_method: "E-Wallet",
    paid_at: "2025-10-24T15:30:00",
  },
  {
    _id: "INV010",
    customer_id: "10",
    customer_name: "Lý Minh Nam",
    total_amount: 300000,
    payment_method: "Debit Card",
    paid_at: "2025-10-24T20:15:00",
  },
];

export const mockRatings: Rating[] = [
  {
    _id: "1",
    customer_id: "1",
    customer_name: "Nguyễn Văn An",
    movie_id: "M001",
    movie_title: "Avengers: Endgame",
    rating: 5,
    comment: "Phim rất hay và cảm động, diễn xuất tuyệt vời!",
    date: "2025-10-28T10:30:00",
  },
  {
    _id: "2",
    customer_id: "2",
    customer_name: "Trần Thị Bình",
    movie_id: "M002",
    movie_title: "The Batman",
    rating: 4,
    comment: "Phim hay nhưng hơi dài, đáng xem!",
    date: "2025-10-27T14:20:00",
  },
  {
    _id: "3",
    customer_id: "3",
    customer_name: "Lê Hoàng Cường",
    movie_id: "M003",
    movie_title: "Spider-Man: No Way Home",
    rating: 5,
    comment: "Tuyệt vời! Không thể tin được!",
    date: "2025-10-27T16:45:00",
  },
  {
    _id: "4",
    customer_id: "4",
    customer_name: "Phạm Minh Đức",
    movie_id: "M001",
    movie_title: "Avengers: Endgame",
    rating: 4,
    comment: "Phim hay, đáng xem nhiều lần.",
    date: "2025-10-26T18:30:00",
  },
  {
    _id: "5",
    customer_id: "5",
    customer_name: "Võ Thu Hà",
    movie_id: "M004",
    movie_title: "Interstellar",
    rating: 5,
    comment: "Kiệt tác điện ảnh, cảnh quay đẹp!",
    date: "2025-10-26T20:15:00",
  },
  {
    _id: "6",
    customer_id: "6",
    customer_name: "Đặng Quốc Hùng",
    movie_id: "M002",
    movie_title: "The Batman",
    rating: 3,
    comment: "Phim ổn nhưng không đặc sắc lắm.",
    date: "2025-10-25T15:00:00",
  },
  {
    _id: "7",
    customer_id: "7",
    customer_name: "Hoàng Thị Lan",
    movie_id: "M005",
    movie_title: "Inception",
    rating: 5,
    comment: "Phim hay, cốt truyện phức tạp nhưng hấp dẫn!",
    date: "2025-10-25T19:30:00",
  },
  {
    _id: "8",
    customer_id: "8",
    customer_name: "Bùi Văn Long",
    movie_id: "M003",
    movie_title: "Spider-Man: No Way Home",
    rating: 4,
    comment: "Phim hay, nhiều bất ngờ!",
    date: "2025-10-24T14:45:00",
  },
  {
    _id: "9",
    customer_id: "9",
    customer_name: "Dương Thị Mai",
    movie_id: "M004",
    movie_title: "Interstellar",
    rating: 5,
    comment: "Xuất sắc! Âm nhạc và hình ảnh tuyệt vời!",
    date: "2025-10-24T17:20:00",
  },
  {
    _id: "10",
    customer_id: "10",
    customer_name: "Lý Minh Nam",
    movie_id: "M001",
    movie_title: "Avengers: Endgame",
    rating: 5,
    comment: "Phim kết thúc hoàn hảo cho series!",
    date: "2025-10-23T16:00:00",
  },
  {
    _id: "11",
    customer_id: "11",
    customer_name: "Ngô Thị Phương",
    movie_id: "M005",
    movie_title: "Inception",
    rating: 4,
    comment: "Phim hay nhưng hơi khó hiểu một chút.",
    date: "2025-10-23T19:45:00",
  },
  {
    _id: "12",
    customer_id: "12",
    customer_name: "Trịnh Văn Quân",
    movie_id: "M002",
    movie_title: "The Batman",
    rating: 4,
    comment: "Diễn xuất tốt, cốt truyện thú vị.",
    date: "2025-10-22T15:30:00",
  },
];

export const mockShowtimes: Showtime[] = [
  {
    _id: "ST001",
    movie_id: "M001",
    movie_title: "Avengers: Endgame",
    room_id: "R001",
    room_name: "Room 1 - IMAX",
    start_time: "2025-10-28T10:00:00",
    end_time: "2025-10-28T13:00:00",
    price: 150000,
  },
  {
    _id: "ST002",
    movie_id: "M002",
    movie_title: "The Batman",
    room_id: "R002",
    room_name: "Room 2 - Standard",
    start_time: "2025-10-28T11:30:00",
    end_time: "2025-10-28T14:30:00",
    price: 120000,
  },
  {
    _id: "ST003",
    movie_id: "M003",
    movie_title: "Spider-Man: No Way Home",
    room_id: "R003",
    room_name: "Room 3 - VIP",
    start_time: "2025-10-28T13:00:00",
    end_time: "2025-10-28T15:30:00",
    price: 180000,
  },
  {
    _id: "ST004",
    movie_id: "M004",
    movie_title: "Interstellar",
    room_id: "R001",
    room_name: "Room 1 - IMAX",
    start_time: "2025-10-28T14:00:00",
    end_time: "2025-10-28T17:00:00",
    price: 150000,
  },
  {
    _id: "ST005",
    movie_id: "M005",
    movie_title: "Inception",
    room_id: "R002",
    room_name: "Room 2 - Standard",
    start_time: "2025-10-28T15:30:00",
    end_time: "2025-10-28T18:00:00",
    price: 120000,
  },
  {
    _id: "ST006",
    movie_id: "M001",
    movie_title: "Avengers: Endgame",
    room_id: "R004",
    room_name: "Room 4 - 4DX",
    start_time: "2025-10-28T17:00:00",
    end_time: "2025-10-28T20:00:00",
    price: 200000,
  },
  {
    _id: "ST007",
    movie_id: "M002",
    movie_title: "The Batman",
    room_id: "R003",
    room_name: "Room 3 - VIP",
    start_time: "2025-10-28T18:30:00",
    end_time: "2025-10-28T21:30:00",
    price: 180000,
  },
  {
    _id: "ST008",
    movie_id: "M003",
    movie_title: "Spider-Man: No Way Home",
    room_id: "R001",
    room_name: "Room 1 - IMAX",
    start_time: "2025-10-28T19:00:00",
    end_time: "2025-10-28T21:30:00",
    price: 150000,
  },
  {
    _id: "ST009",
    movie_id: "M004",
    movie_title: "Interstellar",
    room_id: "R005",
    room_name: "Room 5 - Premium",
    start_time: "2025-10-28T20:00:00",
    end_time: "2025-10-28T23:00:00",
    price: 140000,
  },
  {
    _id: "ST010",
    movie_id: "M005",
    movie_title: "Inception",
    room_id: "R004",
    room_name: "Room 4 - 4DX",
    start_time: "2025-10-28T21:30:00",
    end_time: "2025-10-29T00:00:00",
    price: 200000,
  },
  {
    _id: "ST011",
    movie_id: "M001",
    movie_title: "Avengers: Endgame",
    room_id: "R002",
    room_name: "Room 2 - Standard",
    start_time: "2025-10-29T10:00:00",
    end_time: "2025-10-29T13:00:00",
    price: 120000,
  },
  {
    _id: "ST012",
    movie_id: "M003",
    movie_title: "Spider-Man: No Way Home",
    room_id: "R005",
    room_name: "Room 5 - Premium",
    start_time: "2025-10-29T14:00:00",
    end_time: "2025-10-29T16:30:00",
    price: 140000,
  },
];

export const mockMovies: Movie[] = [
  {
    _id: "M001",
    title: "Avengers: Endgame",
    poster: "https://via.placeholder.com/300x450?text=Avengers+Endgame",
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: 181,
    rating: 8.4,
    release_date: "2019-04-26",
    status: "Now Showing",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins.",
  },
  {
    _id: "M002",
    title: "The Batman",
    poster: "https://via.placeholder.com/300x450?text=The+Batman",
    genre: ["Action", "Crime", "Drama"],
    duration: 176,
    rating: 7.8,
    release_date: "2022-03-04",
    status: "Now Showing",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham.",
  },
  {
    _id: "M003",
    title: "Spider-Man: No Way Home",
    poster: "https://via.placeholder.com/300x450?text=Spider-Man",
    genre: ["Action", "Adventure", "Fantasy"],
    duration: 148,
    rating: 8.2,
    release_date: "2021-12-17",
    status: "Now Showing",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help.",
  },
  {
    _id: "M004",
    title: "Interstellar",
    poster: "https://via.placeholder.com/300x450?text=Interstellar",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    duration: 169,
    rating: 8.6,
    release_date: "2014-11-07",
    status: "Coming Soon",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    _id: "M005",
    title: "Inception",
    poster: "https://via.placeholder.com/300x450?text=Inception",
    genre: ["Action", "Sci-Fi", "Thriller"],
    duration: 148,
    rating: 8.8,
    release_date: "2010-07-16",
    status: "Coming Soon",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
  },
  {
    _id: "M006",
    title: "The Dark Knight",
    poster: "https://via.placeholder.com/300x450?text=Dark+Knight",
    genre: ["Action", "Crime", "Drama"],
    duration: 152,
    rating: 9.0,
    release_date: "2008-07-18",
    status: "Now Showing",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
  },
];

export const mockCinemas: Cinema[] = [
  {
    _id: "C001",
    name: "Absolute Cinema - District 1",
    address: "123 Nguyen Hue Street",
    total_rooms: 8,
  },
  {
    _id: "C002",
    name: "Absolute Cinema - District 3",
    address: "456 Le Van Sy Street",
    total_rooms: 6,
  },
  {
    _id: "C003",
    name: "Absolute Cinema - District 7",
    address: "789 Nguyen Van Linh Boulevard",
    total_rooms: 10,
  },
  {
    _id: "C004",
    name: "Absolute Cinema - Binh Thanh",
    address: "321 Xo Viet Nghe Tinh Street",
    total_rooms: 5,
  },
];

export const mockRooms: Room[] = [
  {
    _id: "R001",
    name: "Room 1 - IMAX",
    cinema_id: "C001",
    cinema_name: "Absolute Cinema - District 1",
    type: "IMAX",
    capacity: 300,
    status: "Available",
  },
  {
    _id: "R002",
    name: "Room 2 - Standard",
    cinema_id: "C001",
    cinema_name: "Absolute Cinema - District 1",
    type: "Standard",
    capacity: 150,
    status: "Available",
  },
  {
    _id: "R003",
    name: "Room 3 - VIP",
    cinema_id: "C001",
    cinema_name: "Absolute Cinema - District 1",
    type: "VIP",
    capacity: 80,
    status: "Available",
  },
  {
    _id: "R004",
    name: "Room 4 - 4DX",
    cinema_id: "C002",
    cinema_name: "Absolute Cinema - District 3",
    type: "4DX",
    capacity: 120,
    status: "Maintenance",
  },
  {
    _id: "R005",
    name: "Room 5 - Premium",
    cinema_id: "C002",
    cinema_name: "Absolute Cinema - District 3",
    type: "Premium",
    capacity: 100,
    status: "Available",
  },
  {
    _id: "R006",
    name: "Room 1 - IMAX",
    cinema_id: "C003",
    cinema_name: "Absolute Cinema - District 7",
    type: "IMAX",
    capacity: 350,
    status: "Available",
  },
];

export const mockProducts: Product[] = [
  {
    _id: "P001",
    name: "Popcorn - Small",
    category: "Food",
    price: 45000,
    stock: 150,
    image: "https://via.placeholder.com/200x200?text=Popcorn+S",
    description: "Fresh buttery popcorn",
  },
  {
    _id: "P002",
    name: "Popcorn - Medium",
    category: "Food",
    price: 60000,
    stock: 120,
    image: "https://via.placeholder.com/200x200?text=Popcorn+M",
    description: "Fresh buttery popcorn",
  },
  {
    _id: "P003",
    name: "Popcorn - Large",
    category: "Food",
    price: 75000,
    stock: 100,
    image: "https://via.placeholder.com/200x200?text=Popcorn+L",
    description: "Fresh buttery popcorn",
  },
  {
    _id: "P004",
    name: "Coca Cola",
    category: "Drink",
    price: 35000,
    stock: 200,
    image: "https://via.placeholder.com/200x200?text=Coca+Cola",
    description: "Cold refreshing Coca Cola",
  },
  {
    _id: "P005",
    name: "Pepsi",
    category: "Drink",
    price: 35000,
    stock: 180,
    image: "https://via.placeholder.com/200x200?text=Pepsi",
    description: "Cold refreshing Pepsi",
  },
  {
    _id: "P006",
    name: "Nachos with Cheese",
    category: "Food",
    price: 55000,
    stock: 80,
    image: "https://via.placeholder.com/200x200?text=Nachos",
    description: "Crispy nachos with melted cheese",
  },
  {
    _id: "P007",
    name: "Hot Dog",
    category: "Food",
    price: 50000,
    stock: 90,
    image: "https://via.placeholder.com/200x200?text=Hot+Dog",
    description: "Delicious hot dog with toppings",
  },
  {
    _id: "P008",
    name: "Movie T-Shirt",
    category: "Souvenirs",
    price: 250000,
    stock: 50,
    image: "https://via.placeholder.com/200x200?text=T-Shirt",
    description: "Official movie merchandise",
  },
];
