import { expect, test } from '@playwright/test';

const appUrl = process.env.E2E_APP_URL ?? 'http://127.0.0.1:5173';
const apiUrl = (
  process.env.E2E_API_BASE_URL ?? 'http://127.0.0.1:8000'
).replace(/\/$/, '');
const email = process.env.E2E_CUSTOMER_EMAIL;
const password = process.env.E2E_CUSTOMER_PASSWORD;

type Movie = { movie_id: string; slug?: string; status: string };
type Showtime = {
  showtime_id: string;
  room: { room_id: string };
  start_time: string;
};
type Seat = { available: boolean };

test.describe.configure({ mode: 'serial' });

test('customer books an available ticket using the real backend', async ({
  page,
  request,
}) => {
  test.skip(
    !email || !password,
    'Set E2E_CUSTOMER_EMAIL and E2E_CUSTOMER_PASSWORD to run against the real backend.',
  );

  const signInResponse = await request.post(`${apiUrl}/auth/signin`, {
    data: { email, password },
  });
  const signInError = signInResponse.ok()
    ? ''
    : ` Backend responded with ${signInResponse.status()}: ${await signInResponse.text()}`;
  expect(
    signInResponse.ok(),
    `The configured E2E customer must be able to sign in.${signInError}`,
  ).toBeTruthy();
  const auth = await signInResponse.json();

  const headers = { Authorization: `Bearer ${auth.access_token}` };
  const moviesResponse = await request.get(`${apiUrl}/movies`, { headers });
  expect(
    moviesResponse.ok(),
    'The movie catalogue must be available',
  ).toBeTruthy();
  const movies = (await moviesResponse.json()) as Movie[];

  let selectedMovie: Movie | undefined;
  let selectedShowtime: Showtime | undefined;
  for (const movie of movies.filter(
    (candidate) => candidate.status === 'now showing' && candidate.slug,
  )) {
    const showtimesResponse = await request.get(
      `${apiUrl}/showtimes/movie/${movie.movie_id}`,
      { headers },
    );
    if (!showtimesResponse.ok()) continue;

    const [firstShowtime] = (await showtimesResponse.json()) as Showtime[];
    if (!firstShowtime) continue;
    const seatsResponse = await request.get(
      `${apiUrl}/seats/room/${firstShowtime.room.room_id}?showtime_id=${firstShowtime.showtime_id}`,
      { headers },
    );
    if (
      seatsResponse.ok() &&
      ((await seatsResponse.json()) as Seat[]).some((seat) => seat.available)
    ) {
      selectedMovie = movie;
      selectedShowtime = firstShowtime;
      break;
    }
    if (selectedMovie) break;
  }

  expect(
    selectedMovie,
    'The backend needs a now-showing movie with an available seat',
  ).toBeDefined();
  expect(selectedShowtime).toBeDefined();

  await page.addInitScript(
    ({ accessToken, refreshToken, user }) => {
      localStorage.setItem('access_token', accessToken);
      if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    },
    {
      accessToken: auth.access_token,
      refreshToken: auth.refresh_token,
      user: auth.user,
    },
  );

  await page.goto(`${appUrl}/movie/${selectedMovie!.slug}`);

  const showtimeLabel = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(selectedShowtime!.start_time));
  await page.getByText(showtimeLabel, { exact: true }).first().click();
  await page
    .getByRole('button', { name: 'Continue to Seat Selection' })
    .click();
  await expect(page).toHaveURL(/\/booking$/);

  const proceedToPayment = page.getByRole('button', {
    name: 'Proceed to Payment',
  });
  for (const seat of await page
    .locator("svg[data-testid='EventSeatIcon']")
    .all()) {
    await seat.locator('..').click();
    if (await proceedToPayment.isEnabled()) break;
  }
  await expect(proceedToPayment).toBeEnabled();

  await proceedToPayment.click();
  await expect(page).toHaveURL(/\/payment$/);
  await page.getByText('Bank Transfer', { exact: true }).click();
  await page.getByRole('button', { name: 'Complete Payment' }).click();

  await expect(page).toHaveURL(/\/confirmation$/);
  await expect(page.getByText('Booking Confirmed!')).toBeVisible();
  await expect(
    page.getByText(auth.user.full_name, { exact: true }),
  ).toBeVisible();
});
