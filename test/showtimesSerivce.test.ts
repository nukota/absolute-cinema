import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { showtimesApi } from '../src/services/showtimesSerivce';
import { server } from './server';

const showtime = {
  showtime_id: 'showtime-1',
  cinema: { cinema_id: 'cinema-1', name: 'District 1' },
  room: { room_id: 'room-1', name: 'Room 1' },
  movie: { movie_id: 'movie-1', title: 'Dune: Part Two' },
  start_time: '2026-08-10T19:00:00',
  end_time: '2026-08-10T21:30:00',
  price: 90000,
};
const createData = {
  movie_id: 'movie-1',
  room_id: 'room-1',
  start_time: showtime.start_time,
  end_time: showtime.end_time,
  price: showtime.price,
};

describe('showtimes API', () => {
  it('creates, updates, and notifies users about a showtime', async () => {
    server.use(
      http.post('http://localhost:8000/showtimes', async ({ request }) => {
        expect(await request.json()).toEqual(createData);
        return HttpResponse.json(showtime, { status: 201 });
      }),
      http.patch(
        'http://localhost:8000/showtimes/showtime-1',
        async ({ request }) => {
          expect(await request.json()).toEqual({ price: 100000 });
          return HttpResponse.json({ ...showtime, price: 100000 });
        },
      ),
      http.post(
        'http://localhost:8000/showtimes/notify',
        async ({ request }) => {
          expect(await request.json()).toEqual({
            showtime_id: showtime.showtime_id,
          });
          return HttpResponse.json({
            message: 'Users notified',
            notified_users: 3,
          });
        },
      ),
    );
    await expect(showtimesApi.createShowtime(createData)).resolves.toEqual(
      showtime,
    );
    await expect(
      showtimesApi.updateShowtime(showtime.showtime_id, { price: 100000 }),
    ).resolves.toEqual({ ...showtime, price: 100000 });
    await expect(
      showtimesApi.notifyUsers({ showtime_id: showtime.showtime_id }),
    ).resolves.toEqual({ message: 'Users notified', notified_users: 3 });
  });

  it('gets showtimes by list, movie, and ID, then deletes one', async () => {
    server.use(
      http.get('http://localhost:8000/showtimes', () =>
        HttpResponse.json([showtime]),
      ),
      http.get('http://localhost:8000/showtimes/movie/movie-1', () =>
        HttpResponse.json([showtime]),
      ),
      http.get('http://localhost:8000/showtimes/showtime-1', () =>
        HttpResponse.json(showtime),
      ),
      http.delete(
        'http://localhost:8000/showtimes/showtime-1',
        () => new HttpResponse(null, { status: 204 }),
      ),
    );
    await expect(showtimesApi.getAllShowtimes()).resolves.toEqual([showtime]);
    await expect(
      showtimesApi.getShowtimesByMovieId('movie-1'),
    ).resolves.toEqual([showtime]);
    await expect(
      showtimesApi.getShowtimeById(showtime.showtime_id),
    ).resolves.toEqual(showtime);
    await expect(
      showtimesApi.deleteShowtime(showtime.showtime_id),
    ).resolves.toBeUndefined();
  });
});
