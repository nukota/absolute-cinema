import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { roomsApi } from '../src/services/roomsService';
import { server } from './server';
import { API_BASE_URL } from '../src/lib/apiClient.ts';

const room = {
  room_id: 'room-1',
  cinema: { cinema_id: 'cinema-1', name: 'District 1' },
  name: 'Room 1',
  capacity: 2,
};
const seats = [
  { row: 1, col: 1, seat_label: 'A1' },
  { row: 1, col: 2, seat_label: 'A2' },
];

describe('rooms API', () => {
  it('creates and updates rooms', async () => {
    server.use(
      http.post(`${API_BASE_URL}/rooms`, async ({ request }) => {
        expect(await request.json()).toEqual({
          cinema_id: 'cinema-1',
          name: room.name,
          seats,
        });
        return HttpResponse.json(room, { status: 201 });
      }),
      http.patch(`${API_BASE_URL}/rooms/room-1`, async ({ request }) => {
        expect(await request.json()).toEqual({ name: 'Premium Room' });
        return HttpResponse.json({ ...room, name: 'Premium Room' });
      }),
    );
    await expect(
      roomsApi.createRoom({ cinema_id: 'cinema-1', name: room.name, seats }),
    ).resolves.toEqual(room);
    await expect(
      roomsApi.updateRoom(room.room_id, { name: 'Premium Room' }),
    ).resolves.toEqual({ ...room, name: 'Premium Room' });
  });

  it('gets room lists and details, then deletes a room', async () => {
    server.use(
      http.get(`${API_BASE_URL}/rooms`, () => HttpResponse.json([room])),
      http.get(`${API_BASE_URL}/rooms/room-1`, () => HttpResponse.json(room)),
      http.delete(
        `${API_BASE_URL}/rooms/room-1`,
        () => new HttpResponse(null, { status: 204 }),
      ),
    );
    await expect(roomsApi.getAllRooms()).resolves.toEqual([room]);
    await expect(roomsApi.getRoomById(room.room_id)).resolves.toEqual(room);
    await expect(roomsApi.deleteRoom(room.room_id)).resolves.toBeUndefined();
  });
});
