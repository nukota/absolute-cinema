import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { vnpayApi } from '../src/services/vnpayService';
import { server } from './server';
import { API_BASE_URL } from '../src/lib/apiClient.ts';

describe('VNPay API', () => {
  it('creates a payment URL from the order details', async () => {
    const payment = {
      amount: 180000,
      orderId: 'INV-001',
      orderInfo: 'Movie tickets',
    };
    server.use(
      http.post(`${API_BASE_URL}/vnpay/create-payment`, async ({ request }) => {
        expect(await request.json()).toEqual(payment);
        return HttpResponse.json({
          paymentUrl: 'https://sandbox.vnpayment.vn/pay',
        });
      }),
    );

    await expect(vnpayApi.createPayment(payment)).resolves.toEqual({
      paymentUrl: 'https://sandbox.vnpayment.vn/pay',
    });
  });
});
