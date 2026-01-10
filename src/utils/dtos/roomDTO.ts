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

// API: POST
export interface CreateRoomDTO {
  cinema_id: string;
  name: string;
  seats: {
    row: number;
    col: number;
    seat_label: string;
  }[];
}

// API: POST
export interface UpdateRoomDTO {
  name?: string; // Mỗi lần update thỉ đổi name hoặc seats
  // nếu đổi cả hai thì coi như tạo lại từ đầu :v
  seats?: {
    row: number;
    col: number;
    seat_label: string;
  }[]; // Coi như tạo lại các seats từ đầu
}