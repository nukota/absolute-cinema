import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { savesApi } from '../src/services/savesService';
import { server } from './server';

const save = {
  customer_id: 'customer-1',
  movie_id: 'movie-1',
  movie: {
    title: 'Dune: Part Two',
    poster_url: 'https://example.com/dune.jpg',
  },
};

describe('saves API', () => {
  it('save a movie', async () => {
    server.use(
      http.post('http://localhost:8000/saves', async ({ request }) => {
        expect(await request.json()).toEqual({
          customer_id: save.customer_id,
          movie_id: save.movie_id,
        });
        return HttpResponse.json(save, { status: 201 });
      }),
    );

    await expect(
      savesApi.saveMovie({
        customer_id: save.customer_id,
        movie_id: save.movie_id,
      }),
    ).resolves.toEqual(save);
  });

  it('gets all saves and one save by customer ID', async () => {
    server.use(
      http.get('http://localhost:8000/saves', () => HttpResponse.json([save])),
      http.get('http://localhost:8000/saves/:customerId', ({ params }) => {
        expect(params.customerId).toBe(save.customer_id);
        return HttpResponse.json([save]);
      }),
    );

    await expect(savesApi.getAllSaves()).resolves.toEqual([save]);
    await expect(
      savesApi.getSavedMoviesByCustomer(save.customer_id),
    ).resolves.toEqual([save]);
  });

  it('removes a saved movie', async () => {
    server.use(
      http.delete(
        'http://localhost:8000/saves/:customerId/:movieId',
        ({ params }) => {
          expect(params).toEqual({
            customerId: save.customer_id,
            movieId: save.movie_id,
          });
          return new HttpResponse(null, { status: 204 });
        },
      ),
    );
    await expect(
      savesApi.removeSavedMovie(save.customer_id, save.movie_id),
    ).resolves.toBeUndefined();
  });
});
