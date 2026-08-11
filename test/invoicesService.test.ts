import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { invoicesApi } from '../src/services/invoicesService';
import { server } from './server';

const invoice = {
  invoice_id: 'invoice-1',
  invoice_code: 'INV-001',
  customer: {
    customer_id: 'customer-1',
    full_name: 'Cinema Customer',
    email: 'customer@example.com',
  },
  ticket_count: 2,
  product_count: 1,
  tickets: {
    title: 'Dune: Part Two',
    showtime: '2026-08-10T19:00:00',
    price: 90000,
    seats: ['A1', 'A2'],
  },
  products: [
    {
      product_id: 'product-1',
      name: 'Popcorn',
      quantity: 1,
      price: 50000,
      total: 50000,
    },
  ],
  payment_method: 'vnpay' as const,
  total_amount: 230000,
  status: 'completed' as const,
  created_at: '2026-08-08T10:00:00',
};
const booking = {
  customer_id: 'customer-1',
  amount: 230000,
  products: [{ product_id: 'product-1', quantity: 1 }],
  tickets: { showtime_id: 'showtime-1', seats: ['A1', 'A2'] },
  payment_method: 'vnpay' as const,
  total_amount: 230000,
};
const profile = {
  customer_id: 'customer-1',
  full_name: 'Cinema Customer',
  email: 'customer@example.com',
  member_since: '2024-01-01',
  total_bookings: 1,
  booking_history: [],
};
const history = [
  {
    booking_id: 'invoice-1',
    movie_title: 'Dune: Part Two',
    cinema_name: 'District 1',
    showtime: '2026-08-10T19:00:00',
    seats: ['A1'],
    total_price: 90000,
  },
];

describe('invoices API', () => {
  it('creates a booking with its tickets, products, and payment details', async () => {
    server.use(
      http.post(
        'http://localhost:8000/invoices/booking',
        async ({ request }) => {
          expect(await request.json()).toEqual(booking);
          return HttpResponse.json(invoice, { status: 201 });
        },
      ),
    );
    await expect(invoicesApi.createBooking(booking)).resolves.toEqual(invoice);
  });

  it('gets invoice lists and a single invoice', async () => {
    server.use(
      http.get('http://localhost:8000/invoices', () =>
        HttpResponse.json([invoice]),
      ),
      http.get('http://localhost:8000/invoices/invoice-1', () =>
        HttpResponse.json(invoice),
      ),
    );
    await expect(invoicesApi.getAllInvoices()).resolves.toEqual([invoice]);
    await expect(
      invoicesApi.getInvoiceById(invoice.invoice_id),
    ).resolves.toEqual(invoice);
  });

  it("gets a customer's invoice-backed profile and booking history", async () => {
    server.use(
      http.get('http://localhost:8000/invoices/customer/customer-1', () =>
        HttpResponse.json(profile),
      ),
      http.get(
        'http://localhost:8000/invoices/customer/customer-1/history',
        () => HttpResponse.json(history),
      ),
    );
    await expect(invoicesApi.getUserProfile('customer-1')).resolves.toEqual(
      profile,
    );
    await expect(invoicesApi.getBookingHistory('customer-1')).resolves.toEqual(
      history,
    );
  });

  it('deletes an invoice', async () => {
    server.use(
      http.delete(
        'http://localhost:8000/invoices/invoice-1',
        () => new HttpResponse(null, { status: 204 }),
      ),
    );
    await expect(
      invoicesApi.deleteInvoice(invoice.invoice_id),
    ).resolves.toBeUndefined();
  });
});
