import { expect, test } from '@playwright/test';

const appUrl = process.env.E2E_APP_URL ?? 'http://127.0.0.1:5173';
const email = process.env.E2E_CUSTOMER_EMAIL;
const password = process.env.E2E_CUSTOMER_PASSWORD;

test.describe.configure({ mode: 'serial' });

test('customer books a ticket through the UI', async ({ page }) => {
  test.skip(
    !email || !password,
    'Set E2E_CUSTOMER_EMAIL and E2E_CUSTOMER_PASSWORD to run against the real backend.',
  );

  await page.goto(`${appUrl}/signin`);
  await page.getByLabel('Email').fill(email!);
  await page.getByLabel('Password').fill(password!);
  await page.getByRole('button', { name: 'Sign In' }).click();

  // A customer is redirected from the sign-in page to the customer home page.
  await expect(page).toHaveURL(`${appUrl}/`);

  const nowShowing = page.getByRole('heading', { name: 'Now Showing' }).locator('..');
  await expect(nowShowing.getByRole('button', { name: 'Book' }).first()).toBeVisible();
  await nowShowing.getByRole('button', { name: 'Book' }).first().click();

  await expect(page).toHaveURL(/\/movie\//);
  await expect(page.getByRole('heading', { name: 'Select Showtime' })).toBeVisible();
  await page.locator('.MuiCard-root').filter({ hasText: /AM|PM/ }).first().click();
  await page.getByRole('button', { name: 'Continue to Seat Selection' }).click();
  await expect(page).toHaveURL(/\/booking$/);

  const proceedToPayment = page.getByRole('button', {
    name: 'Proceed to Payment',
  });
  for (const seat of await page.locator("svg[data-testid='EventSeatIcon']").all()) {
    await seat.locator('..').click();
    if (await proceedToPayment.isEnabled()) break;
  }
  await expect(proceedToPayment).toBeEnabled();

  const addFirstProduct = page.getByRole('button', { name: '+' }).first();
  await expect(addFirstProduct).toBeVisible();
  await addFirstProduct.click();
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

  await proceedToPayment.click();
  await expect(page).toHaveURL(/\/payment$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await page.getByText('Bank Transfer', { exact: true }).click();
  await page.getByRole('button', { name: 'Complete Payment' }).click();

  await expect(page).toHaveURL(/\/confirmation$/);
  await expect(page.getByText('Booking Confirmed!')).toBeVisible();
  await expect(page.getByText(email!, { exact: true })).toBeVisible();
});
