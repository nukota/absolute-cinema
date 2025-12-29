export interface CinemaDTO {
  cinema_id: string;
  name: string;
  address: string;
  room_count: number;
}

export interface CreateCinemaDTO {
  name: string;
  address: string;
}

export interface UpdateCinemaDTO extends Partial<CreateCinemaDTO> {}
