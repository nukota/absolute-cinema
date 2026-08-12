import { expect, test } from '@playwright/test';

const appUrl = process.env.E2E_APP_URL ?? 'http://localhost:4173';
const email = process.env.E2E_CUSTOMER_EMAIL;
const password = process.env.E2E_CUSTOMER_PASSWORD;

test.describe.configure({ mode: 'serial' });

test('customer books a ticket through the UI', async ({ page }) => {
  // This test interacts with the real frontend/backend, so allow more time.
  test.setTimeout(120_000);

  test.skip(
    !email || !password,
    'Set E2E_CUSTOMER_EMAIL and E2E_CUSTOMER_PASSWORD to run against the real backend.',
  );

  await page.goto(`${appUrl}/signin`, {
    timeout: 30_000,
  });

  await page.getByLabel('Email').fill(email!);
  await page.getByLabel('Password').fill(password!);

  await page.getByRole('button', { name: 'Sign In' }).click();

  // A customer is redirected from the sign-in page to the customer home page.
  await expect(page).toHaveURL(`${appUrl}/`, {
    timeout: 30_000,
  });

  const nowShowing = page
    .getByRole('heading', { name: 'Now Showing' })
    .locator('..');

  await expect(nowShowing).toBeVisible({
    timeout: 30_000,
  });

  const firstBookButton = nowShowing
    .getByRole('button', { name: 'Book' })
    .first();

  await expect(firstBookButton).toBeVisible({
    timeout: 30_000,
  });

  await firstBookButton.click();

  await expect(page).toHaveURL(/\/movie\//, {
    timeout: 30_000,
  });

  await expect(
    page.getByRole('heading', { name: 'Select Showtime' }),
  ).toBeVisible({
    timeout: 30_000,
  });

  const firstShowtime = page
    .locator('.MuiCard-root')
    .filter({ hasText: /AM|PM/ })
    .first();

  await expect(firstShowtime).toBeVisible({
    timeout: 30_000,
  });

  await firstShowtime.click();

  const continueButton = page.getByRole('button', {
    name: 'Continue to Seat Selection',
  });

  await expect(continueButton).toBeEnabled({
    timeout: 15_000,
  });

  await continueButton.click();

  await expect(page).toHaveURL(/\/booking$/, {
    timeout: 30_000,
  });

  const proceedToPayment = page.getByRole('button', {
    name: 'Proceed to Payment',
  });

  const seats = page.locator('[data-testid^="seat-"]');

  await expect(
    seats.first(),
    'The selected showtime should load at least one seat before selection begins.',
  ).toBeVisible({
    timeout: 30_000,
  });

  await expect
    .poll(async () => seats.count(), {
      timeout: 15_000,
      message: 'The selected showtime should have seats.',
    })
    .toBeGreaterThan(0);

  for (const seat of await seats.all()) {
    await seat.click();

    if (await proceedToPayment.isEnabled()) {
      break;
    }
  }

  await expect(proceedToPayment).toBeEnabled({
    timeout: 15_000,
  });

  const addFirstProduct = page.getByRole('button', { name: '+' }).first();

  await expect(addFirstProduct).toBeVisible({
    timeout: 15_000,
  });

  await addFirstProduct.click();

  await expect(page.getByText('Products', { exact: true })).toBeVisible({
    timeout: 15_000,
  });

  await proceedToPayment.click();

  await expect(page).toHaveURL(/\/payment$/, {
    timeout: 30_000,
  });

  await expect(page.getByText('Products', { exact: true })).toBeVisible({
    timeout: 15_000,
  });

  await page.getByText('Bank Transfer', { exact: true }).click();

  await page
    .getByRole('button', {
      name: 'Complete Payment',
    })
    .click();

  await expect(page).toHaveURL(/\/confirmation$/, {
    timeout: 30_000,
  });

  await expect(page.getByText('Booking Confirmed!')).toBeVisible({
    timeout: 30_000,
  });

  await expect(page.getByText(/confirm/i, { exact: true })).toBeVisible({
    timeout: 15_000,
  });
});
