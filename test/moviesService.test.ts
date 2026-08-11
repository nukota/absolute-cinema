import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { moviesApi } from '../src/services/moviesService';
import { server } from './server';
import { API_BASE_URL } from '../src/lib/apiClient.ts';

const movie = {
  movie_id: 'movie-1',
  title: 'Dune: Part Two',
  duration_min: 166,
  release_date: '2024-03-01',
  poster_url: 'https://example.com/dune.jpg',
  status: 'now showing' as const,
  slug: 'dune-part-two',
};

describe('movies API', () => {
  it('creates and updates a movie with the supplied payload', async () => {
    const createData = {
      title: movie.title,
      duration_min: movie.duration_min,
      release_date: movie.release_date,
      poster_url: movie.poster_url,
    };
    server.use(
      http.post(`${API_BASE_URL}/movies`, async ({ request }) => {
        expect(await request.json()).toEqual(createData);
        return HttpResponse.json(movie, { status: 201 });
      }),
      http.patch(`${API_BASE_URL}/movies/movie-1`, async ({ request }) => {
        expect(await request.json()).toEqual({ title: 'Dune Part Two' });
        return HttpResponse.json({ ...movie, title: 'Dune Part Two' });
      }),
    );

    await expect(moviesApi.createMovie(createData)).resolves.toEqual(movie);
    await expect(
      moviesApi.updateMovie(movie.movie_id, { title: 'Dune Part Two' }),
    ).resolves.toEqual({ ...movie, title: 'Dune Part Two' });
  });

  it('gets movies by list, ID, slug, and customer', async () => {
    server.use(
      http.get(`${API_BASE_URL}/movies`, () => HttpResponse.json([movie])),
      http.get(`${API_BASE_URL}/movies/movie-1`, () =>
        HttpResponse.json(movie),
      ),
      http.get(`${API_BASE_URL}/movies/slug/dune-part-two`, () =>
        HttpResponse.json(movie),
      ),
      http.get(`${API_BASE_URL}/movies/customer`, ({ request }) => {
        expect(new URL(request.url).searchParams.get('customer_id')).toBe(
          'customer-1',
        );
        return HttpResponse.json([{ ...movie, isSaved: true }]);
      }),
    );

    await expect(moviesApi.getAllMovies()).resolves.toEqual([movie]);
    await expect(moviesApi.getMovieById(movie.movie_id)).resolves.toEqual(
      movie,
    );
    await expect(moviesApi.getMovieBySlug(movie.slug)).resolves.toEqual(movie);
    await expect(
      moviesApi.getMoviesByCustomerId('customer-1'),
    ).resolves.toEqual([{ ...movie, isSaved: true }]);
  });

  it('deletes a movie', async () => {
    server.use(
      http.delete(
        `${API_BASE_URL}/movies/movie-1`,
        () => new HttpResponse(null, { status: 204 }),
      ),
    );
    await expect(
      moviesApi.deleteMovie(movie.movie_id),
    ).resolves.toBeUndefined();
  });
});
