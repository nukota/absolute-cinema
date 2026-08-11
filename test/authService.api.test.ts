import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { authApi } from '../src/services/authService';
import { UserRole } from '../src/utils/enum';
import { server } from './server';

const user = {
  id: 'user-1',
  email: 'customer@example.com',
  full_name: 'Cinema Customer',
  role: UserRole.Customer,
};

describe('auth API', () => {
  it('sends signup data and returns the created authentication session', async () => {
    server.use(
      http.post('http://localhost:8000/auth/signup', async ({ request }) => {
        expect(await request.json()).toEqual({
          email: user.email,
          password: 'safe-password',
          full_name: user.full_name,
          role: UserRole.Customer,
        });
        return HttpResponse.json({
          user,
          access_token: 'signup-access-token',
          refresh_token: 'signup-refresh-token',
        });
      }),
    );

    await expect(
      authApi.signUp({
        email: user.email,
        password: 'safe-password',
        full_name: user.full_name,
        role: UserRole.Customer,
      }),
    ).resolves.toMatchObject({
      user,
      access_token: 'signup-access-token',
    });
  });

  it('sends credentials to signin and returns the authentication session', async () => {
    server.use(
      http.post('http://localhost:8000/auth/signin', async ({ request }) => {
        expect(await request.json()).toEqual({
          email: user.email,
          password: 'safe-password',
        });
        return HttpResponse.json({
          user,
          access_token: 'signin-access-token',
          refresh_token: 'signin-refresh-token',
        });
      }),
    );

    await expect(
      authApi.signIn({ email: user.email, password: 'safe-password' }),
    ).resolves.toMatchObject({
      user,
      access_token: 'signin-access-token',
    });
  });

  it('calls signout and returns the server confirmation', async () => {
    server.use(
      http.post('http://localhost:8000/auth/signout', () =>
        HttpResponse.json({ message: 'Signed out' }),
      ),
    );

    await expect(authApi.signOut()).resolves.toEqual({ message: 'Signed out' });
  });

  it('gets the current user and normalizes a legacy name field', async () => {
    server.use(
      http.get('http://localhost:8000/auth/me', () =>
        HttpResponse.json({
          id: user.id,
          email: user.email,
          name: 'Legacy Customer',
          role: UserRole.Customer,
        }),
      ),
    );

    await expect(authApi.getCurrentUser()).resolves.toEqual({
      id: user.id,
      email: user.email,
      full_name: 'Legacy Customer',
      role: UserRole.Customer,
    });
  });
});
