import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { cinemasApi } from '../src/services/cinemasService';
import { server } from './server';

const cinema = {
  cinema_id: 'cinema-1',
  name: 'District 1 Cinema',
  address: '1 Main Street',
  room_count: 5,
};

describe('cinemas API', () => {
  it('creates a cinema', async () => {
    server.use(
      http.post('http://localhost:8000/cinemas', async ({ request }) => {
        expect(await request.json()).toEqual({
          name: cinema.name,
          address: cinema.address,
        });
        return HttpResponse.json(cinema, { status: 201 });
      }),
    );

    await expect(
      cinemasApi.createCinema({ name: cinema.name, address: cinema.address }),
    ).resolves.toEqual(cinema);
  });

  it('gets all cinemas and one cinema by ID', async () => {
    server.use(
      http.get('http://localhost:8000/cinemas', () =>
        HttpResponse.json([cinema]),
      ),
      http.get('http://localhost:8000/cinemas/cinema-1', () =>
        HttpResponse.json(cinema),
      ),
    );

    await expect(cinemasApi.getAllCinemas()).resolves.toEqual([cinema]);
    await expect(cinemasApi.getCinemaById(cinema.cinema_id)).resolves.toEqual(
      cinema,
    );
  });

  it('updates a cinema and deletes it', async () => {
    server.use(
      http.patch(
        'http://localhost:8000/cinemas/cinema-1',
        async ({ request }) => {
          expect(await request.json()).toEqual({ name: 'Renamed Cinema' });
          return HttpResponse.json({ ...cinema, name: 'Renamed Cinema' });
        },
      ),
      http.delete(
        'http://localhost:8000/cinemas/cinema-1',
        () => new HttpResponse(null, { status: 204 }),
      ),
    );

    await expect(
      cinemasApi.updateCinema(cinema.cinema_id, { name: 'Renamed Cinema' }),
    ).resolves.toEqual({ ...cinema, name: 'Renamed Cinema' });
    await expect(
      cinemasApi.deleteCinema(cinema.cinema_id),
    ).resolves.toBeUndefined();
  });
});
