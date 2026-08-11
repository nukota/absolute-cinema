import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { ratingsApi } from '../src/services/ratingsService';
import { server } from './server';
import { API_BASE_URL } from '../src/lib/apiClient.ts';

const rating = {
  rating_id: 'rating-1',
  customer: {
    customer_id: 'customer-1',
    full_name: 'Cinema Customer',
    email: 'customer@example.com',
  },
  movie: {
    movie_id: 'movie-1',
    title: 'Dune: Part Two',
  },
  rating_value: 5,
  review: 'Great movie!',
};

describe('ratings API', () => {
  it('creates a rating', async () => {
    server.use(
      http.post(`${API_BASE_URL}/ratings`, async ({ request }) => {
        expect(await request.json()).toEqual({
          movie_id: rating.movie.movie_id,
          customer_id: rating.customer.customer_id,
          rating: rating.rating_value,
          review: rating.review,
        });
        return HttpResponse.json(rating, { status: 201 });
      }),
    );

    await expect(
      ratingsApi.createRating({
        movie_id: rating.movie.movie_id,
        customer_id: rating.customer.customer_id,
        rating: rating.rating_value,
        review: rating.review,
      }),
    ).resolves.toEqual(rating);
  });

  it('gets all ratings and one rating by ID', async () => {
    server.use(
      http.get(`${API_BASE_URL}/ratings`, () => HttpResponse.json([rating])),
      http.get(`${API_BASE_URL}/ratings/rating-1`, () =>
        HttpResponse.json(rating),
      ),
    );

    await expect(ratingsApi.getAllRatings()).resolves.toEqual([rating]);
    await expect(ratingsApi.getRatingById(rating.rating_id)).resolves.toEqual(
      rating,
    );
  });

  it('updates a rating and deletes it', async () => {
    server.use(
      http.patch(`${API_BASE_URL}/ratings/rating-1`, async ({ request }) => {
        expect(await request.json()).toEqual({ rating: 4 });
        return HttpResponse.json({ ...rating, rating_value: 4 });
      }),
      http.delete(
        `${API_BASE_URL}/ratings/rating-1`,
        () => new HttpResponse(null, { status: 204 }),
      ),
    );

    await expect(
      ratingsApi.updateRating(rating.rating_id, { rating: 4 }),
    ).resolves.toEqual({ ...rating, rating_value: 4 });
    await expect(
      ratingsApi.deleteRating(rating.rating_id),
    ).resolves.toBeUndefined();
  });
});
