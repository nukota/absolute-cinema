/**
 * Utility functions for date and time formatting
 */

/**
 * Formats a date string to a short readable date format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Mon, Oct 31")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

/**
 * Formats a date string to a long readable date format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Monday, October 31, 2025")
 */
export const formatDateLong = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Formats a date string to a readable time format
 * @param dateString - ISO date string
 * @returns Formatted time string (e.g., "02:30 PM")
 */
export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Generate last 12 months options for dashboard
 * @returns Array of month options with value (YYYY-MM) and label (Mon YYYY)
 */
export const generateLast12Months = (): Array<{
  value: string;
  label: string;
}> => {
  const months: Array<{ value: string; label: string }> = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    months.push({
      value: `${year}-${String(month + 1).padStart(2, "0")}`,
      label: `${monthNames[month]} ${year}`,
    });
  }

  return months;
};

/**
 * Generate daily data points for a month (15 points, one per 2 days)
 * @param year - Year number
 * @param month - Month number (1-12)
 * @returns Array of date strings in YYYY-MM-DD format
 */
export const generateDailyDataPoints = (
  year: number,
  month: number
): string[] => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const points: string[] = [];

  for (let day = 1; day <= daysInMonth; day += 2) {
    const date = new Date(year, month - 1, day);
    points.push(date.toISOString().split("T")[0]);
  }

  return points;
};

/**
 * Format date for display (e.g., "1-2", "3-4", etc.)
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Formatted date range string
 */
export const formatDateRange = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const nextDay = day + 1;
  return `${day}-${nextDay}`;
};

/**
 * Generates HTML for a ticket PDF
 * @param bookingData - The booking data from localStorage
 * @returns HTML string for the ticket
 */
export const generateTicketHtml = (
  bookingData: any,
  cinema?: any,
  room?: any
): string => {
  const cinemaName = cinema?.name || "Absolute Cinema";
  const address = cinema?.address || "Địa chỉ rạp";
  const roomName = room?.name || "Phòng chiếu";
  const timeRaw = bookingData.tickets?.showtime || "";

  // Format time
  let time = "";
  if (timeRaw) {
    const d = new Date(timeRaw);
    const pad = (n: number) => n.toString().padStart(2, "0");
    time = `${pad(d.getDate())}/${pad(
      d.getMonth() + 1
    )}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  const movie = bookingData.tickets?.title || "";
  const seats = bookingData.tickets?.seats?.join(", ") || "";

  // Format ordered_at
  const orderedAt = new Date(bookingData.created_at).toLocaleString("vi-VN");

  // Format total price
  const totalPrice = new Intl.NumberFormat("vi-VN").format(
    bookingData.total_amount
  );

  // Format products
  const products = bookingData.products || [];

  return `
    <html>
    <head>
        <meta charset="utf-8" />
        <style>
            body {
                font-family: 'Segoe UI', Arial, sans-serif;
                margin: 0;
                padding: 0;
                background: #fff9ed;
            }
            .card-container {
                padding: 20px;
            }
            .ticket-card {
                width: 100%;
                border: 2px solid black;
                border-radius: 10px;
                display: flex;
                overflow: hidden;
            }
            .ticket-left {
                flex: 2;
                padding: 14px 18px;
                display: flex;
                flex-direction: column;
                justify-content: start;
            }
            .ticket-middle {
                flex: 1.4;
                padding: 14px 18px;
                border-left: 2px dashed #484848;
                display: flex;
                flex-direction: column;
            }
            .ticket-right {
                width: 70px;
                min-width: 70px;
                background: #fdf0f0;
                border-left: 2px dashed #484848;
                display: flex;
                align-items: center;
                justify-content: center;
                writing-mode: vertical-rl;
                text-orientation: mixed;
                font-size: 1.8rem;
                font-weight: bold;
                color: #484848;
                padding: 6px 0;
                letter-spacing: 2px;
            }
            .ticket-title {
                font-size: 1.6rem;
                font-weight: 700;
                color: #333;
                margin-bottom: 24px;
            }
            .ticket-info {
                font-size: 1rem;
                margin-bottom: 6px;
                color: #222;
            }
            .ticket-label {
                font-weight: 600;
                color: #222;
            }
            .ticket-section {
                margin-bottom: 10px;
            }
            .ticket-products {
                margin: 4px 0 0 16px;
                padding: 0;
                list-style: disc;
                color: #222;
            }
            .ticket-products li {
                font-size: 0.85rem;
                margin-bottom: 3px;
            }
            .ticket-footer {
                margin-top: auto;
                font-size: 0.85rem;
                font-style: italic;
                color: #444;
                text-align: right;
                margin-top: 16px;
            }
            .showtime-seats {
                border-bottom: 1px dashed #484848;
                padding-bottom: 8px;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="card-container">
            <div class="ticket-card">
                <div class="ticket-left">
                    <div class="ticket-title">HÓA ĐƠN ĐẶT VÉ</div>
                    <div class="ticket-info"><span class="ticket-label">Ngày đặt:</span> ${orderedAt}</div>
                    <div class="ticket-info"><span class="ticket-label">Tổng tiền:</span> ${totalPrice} VND</div>
                    <div class="ticket-section">
                        <div class="ticket-info"><span class="ticket-label">Rạp:</span> ${cinemaName}</div>
                        <div class="ticket-info"><span class="ticket-label">Địa chỉ:</span> ${address}</div>
                    </div>
                </div>
                <div class="ticket-middle">
                    <div class="showtime-seats">
                        <div class="ticket-info"><span class="ticket-label">Phim:</span> ${movie}</div>
                        <div class="ticket-info"><span class="ticket-label">Phòng:</span> ${roomName}</div>
                        <div class="ticket-info"><span class="ticket-label">Suất chiếu:</span> ${time}</div>
                        <div class="ticket-info"><span class="ticket-label">Ghế:</span> ${
                          seats || "Không có"
                        }</div>
                    </div>
                    <div class="ticket-label" style="font-size:1.05rem; margin-bottom:6px;">Sản phẩm</div>
                    <ul class="ticket-products">
                        ${
                          products.length > 0
                            ? products
                                .map(
                                  (product: any) =>
                                    `<li>${product.name} x${product.quantity}</li>`
                                )
                                .join("")
                            : "<li>Không có</li>"
                        }
                    </ul>
                    <div class="ticket-footer">Chúc bạn xem phim vui vẻ!</div>
                </div>
                <div class="ticket-right">
                    ${bookingData.invoice_code || "ABSOLUTE"}
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};
