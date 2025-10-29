export const InvoiceStatus = {
  Pending: "pending",
  Completed: "completed",
} as const;
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];

export const PaymentMethod = {
  Momo: "momo",
  Card: "card",
  Banking: "banking",
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const ProductCategory = {
  Food: "food",
  Drink: "drink",
  Souvenir: "souvenir",
  Other: "other",
} as const;
export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];

  export const MovieStatus = {
    NowShowing: "now showing",
    Stopped: "stopped",
    ComingSoon: "coming soon",
    Unknown: "unknown",
  } as const;
  export type MovieStatus = (typeof MovieStatus)[keyof typeof MovieStatus];