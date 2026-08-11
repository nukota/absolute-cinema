import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { api } from '../src/lib/apiClient';
import { server } from './server';

describe('api client authentication', () => {
  it('adds the stored access token to outgoing requests', async () => {
    localStorage.setItem('access_token', 'stored-token');
    server.use(
      http.get('http://localhost:8000/movies', ({ request }) => {
        expect(request.headers.get('authorization')).toBe(
          'Bearer stored-token',
        );
        return HttpResponse.json({ movies: [] });
      }),
    );

    const response = await api.get<{ movies: unknown[] }>('/movies');

    expect(response.data.movies).toEqual([]);
  });

  it('refreshes an expired token once and retries the original request', async () => {
    localStorage.setItem('access_token', 'expired-token');
    localStorage.setItem('refresh_token', 'refresh-token');
    let protectedRequestCount = 0;

    server.use(
      http.post('http://localhost:8000/auth/refresh', async ({ request }) => {
        expect(await request.json()).toEqual({
          refresh_token: 'refresh-token',
        });
        return HttpResponse.json({
          access_token: 'new-access-token',
          refresh_token: 'new-refresh-token',
        });
      }),
      http.get('http://localhost:8000/protected', ({ request }) => {
        protectedRequestCount += 1;
        if (request.headers.get('authorization') === 'Bearer expired-token') {
          return HttpResponse.json({ message: 'Expired' }, { status: 401 });
        }

        expect(request.headers.get('authorization')).toBe(
          'Bearer new-access-token',
        );
        return HttpResponse.json({ ok: true });
      }),
    );

    const response = await api.get<{ ok: boolean }>('/protected');

    expect(response.data).toEqual({ ok: true });
    expect(protectedRequestCount).toBe(2);
    expect(localStorage.getItem('access_token')).toBe('new-access-token');
    expect(localStorage.getItem('refresh_token')).toBe('new-refresh-token');
  });
});
