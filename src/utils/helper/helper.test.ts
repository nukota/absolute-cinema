import { describe, expect, it } from "vitest";
import {
  formatDateRange,
  generateDailyDataPoints,
  generateTicketHtml,
} from "./helper";

describe("generateDailyDataPoints", () => {
  it("includes every other day through the final day of a leap-year February", () => {
    const points = generateDailyDataPoints(2024, 2);

    expect(points).toHaveLength(15);
    expect(points[0]).toBe("2024-02-01");
    expect(points.at(-1)).toBe("2024-02-29");
  });
});

describe("formatDateRange", () => {
  it("creates the display range from a calendar date", () => {
    expect(formatDateRange("2024-05-07T12:00:00")).toBe("7-8");
  });
});

describe("generateTicketHtml", () => {
  it("renders booking, cinema, room, and product details", () => {
    const html = generateTicketHtml(
      {
        created_at: "2024-05-01T10:30:00",
        total_amount: 180000,
        invoice_code: "INV-001",
        tickets: {
          title: "Dune: Part Two",
          showtime: "2024-05-10T19:30:00",
          seats: ["A1", "A2"],
        },
        products: [{ name: "Popcorn", quantity: 2 }],
      },
      { name: "District 1", address: "1 Main Street" },
      { name: "Room 3" },
    );

    expect(html).toContain("Dune: Part Two");
    expect(html).toContain("District 1");
    expect(html).toContain("Room 3");
    expect(html).toContain("A1, A2");
    expect(html).toContain("Popcorn x2");
    expect(html).toContain("INV-001");
  });
});
