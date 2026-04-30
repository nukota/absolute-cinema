import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { customersApi } from "./customersService";
import { server } from "../test/server";

const customer = {
  customer_id: "customer-1", full_name: "Cinema Customer", email: "customer@example.com",
  dob: "2000-01-01", password_hash: "hashed-password", phone_number: "0900000000",
};
const profile = {
  customer_id: customer.customer_id, full_name: customer.full_name, email: customer.email,
  member_since: "2024-01-01", total_bookings: 1, booking_history: [],
};

describe("customers API", () => {
  it("creates and updates a customer", async () => {
    const createData = { full_name: customer.full_name, email: customer.email, dob: customer.dob, phone_number: customer.phone_number, password: "safe-password" };
    server.use(
      http.post("http://localhost:8000/customers", async ({ request }) => {
        expect(await request.json()).toEqual(createData);
        return HttpResponse.json(customer, { status: 201 });
      }),
      http.patch("http://localhost:8000/customers/customer-1", async ({ request }) => {
        expect(await request.json()).toEqual({ phone_number: "0911111111" });
        return HttpResponse.json({ ...customer, phone_number: "0911111111" });
      }),
    );
    await expect(customersApi.createCustomer(createData)).resolves.toEqual(customer);
    await expect(customersApi.updateCustomer(customer.customer_id, { phone_number: "0911111111" })).resolves.toEqual({ ...customer, phone_number: "0911111111" });
  });

  it("gets customers, a customer detail, and its invoice-backed profile", async () => {
    server.use(
      http.get("http://localhost:8000/customers", () => HttpResponse.json([customer])),
      http.get("http://localhost:8000/customers/customer-1", () => HttpResponse.json(customer)),
      http.get("http://localhost:8000/invoices/customer/customer-1", () => HttpResponse.json(profile)),
    );
    await expect(customersApi.getAllCustomers()).resolves.toEqual([customer]);
    await expect(customersApi.getCustomerById(customer.customer_id)).resolves.toEqual(customer);
    await expect(customersApi.getUserProfile(customer.customer_id)).resolves.toEqual(profile);
  });

  it("deletes a customer", async () => {
    server.use(http.delete("http://localhost:8000/customers/customer-1", () => new HttpResponse(null, { status: 204 })));
    await expect(customersApi.deleteCustomer(customer.customer_id)).resolves.toBeUndefined();
  });
});
