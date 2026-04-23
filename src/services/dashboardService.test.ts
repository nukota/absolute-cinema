import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { dashboardApi } from "./dashboardService";
import { server } from "../test/server";

const dashboard = {
  stats: { total_revenue: 180000, total_customers: 2, movies_showing: 4, tickets_sold: 3 },
  daily_data: [{ date: "2026-08-01", revenue: 180000, tickets: 3 }],
  genre_distribution: [{ genre: "Sci-Fi", percentage: 100 }],
  top_movies: [{ movie_name: "Dune: Part Two", tickets_sold: 3 }],
  month: "2026-08",
};

describe("dashboard API", () => {
  it("requests dashboard statistics for the selected month", async () => {
    server.use(
      http.get("http://localhost:8000/invoices/dashboard/stats", ({ request }) => {
        expect(new URL(request.url).searchParams.get("month")).toBe("2026-08");
        return HttpResponse.json(dashboard);
      }),
    );
    await expect(dashboardApi.getDashboardStats("2026-08")).resolves.toEqual(dashboard);
  });

  it("requests current dashboard statistics when no month is supplied", async () => {
    server.use(
      http.get("http://localhost:8000/invoices/dashboard/stats", ({ request }) => {
        expect(new URL(request.url).search).toBe("");
        return HttpResponse.json(dashboard);
      }),
    );
    await expect(dashboardApi.getDashboardStats()).resolves.toEqual(dashboard);
  });
});
