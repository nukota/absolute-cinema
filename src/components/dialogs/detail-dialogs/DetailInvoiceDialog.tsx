import React from "react";
import DetailDialog from "../template/DetailDialog";
import type { FormSection } from "../template/DetailDialog";
import type { InvoiceDTO } from "../../../utils/dtos/invoiceDTO";
import { InvoiceStatus, PaymentMethod } from "../../../utils/enum";

interface DetailInvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  invoice: InvoiceDTO | null;
  onDelete?: () => void;
}

const DetailInvoiceDialog: React.FC<DetailInvoiceDialogProps> = ({
  open,
  onClose,
  invoice,
  onDelete,
}) => {
  const statusOptions = [
    { value: InvoiceStatus.Pending, label: "Pending" },
    { value: InvoiceStatus.Completed, label: "Completed" },
  ];

  const paymentMethodOptions = [
    { value: PaymentMethod.Card, label: "Card" },
    { value: PaymentMethod.Momo, label: "Momo" },
    { value: PaymentMethod.Banking, label: "Banking" },
  ];

  const sections: FormSection[] = [
    {
      title: "Invoice Information",
      fields: [
        {
          name: "invoice_code",
          label: "Invoice Code",
          type: "text",
          value: invoice?.invoice_code || "",
          onChange: () => {},
          disabled: true,
        },
        {
          name: "created_at",
          label: "Created At",
          type: "datetime-local",
          value: invoice?.created_at
            ? new Date(invoice.created_at).toISOString().slice(0, 16)
            : "",
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: "Customer Information",
      fields: [
        {
          name: "customer_name",
          label: "Customer Name",
          type: "text",
          value: invoice?.customer.full_name || "",
          onChange: () => {},
          disabled: true,
        },
        {
          name: "customer_email",
          label: "Customer Email",
          type: "email",
          value: invoice?.customer.email || "",
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: "Ticket Information",
      fields: [
        {
          name: "movie_title",
          label: "Movie Title",
          type: "text",
          value: invoice?.tickets.title || "",
          onChange: () => {},
          disabled: true,
        },
        {
          name: "showtime",
          label: "Showtime",
          type: "datetime-local",
          value: invoice?.tickets.showtime
            ? new Date(invoice.tickets.showtime).toISOString().slice(0, 16)
            : "",
          onChange: () => {},
          disabled: true,
        },
        {
          name: "seats",
          label: "Seats",
          type: "text",
          value: invoice?.tickets.seats.join(", ") || "",
          onChange: () => {},
          disabled: true,
        },
        {
          name: "ticket_count",
          label: "Ticket Count",
          type: "number",
          value: invoice?.ticket_count || 0,
          onChange: () => {},
          disabled: true,
        },
        {
          name: "ticket_price",
          label: "Price per Ticket",
          type: "number",
          value: invoice?.tickets.price || 0,
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: "Product Information",
      fields: [
        {
          name: "product_count",
          label: "Product Count",
          type: "number",
          value: invoice?.product_count || 0,
          onChange: () => {},
          disabled: true,
        },
        {
          name: "products_list",
          label: "Products",
          type: "longtext",
          value:
            invoice?.products
              .map(
                (p) =>
                  `${p.name} x${p.quantity} = ${p.total.toLocaleString()} VND`
              )
              .join("\n") || "",
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: "Payment Information",
      fields: [
        {
          name: "payment_method",
          label: "Payment Method",
          type: "autocomplete",
          value:
            paymentMethodOptions.find(
              (opt) => opt.value === invoice?.payment_method
            ) || null,
          options: paymentMethodOptions,
          getOptionLabel: (option: any) => option.label,
          onChange: () => {},
          disabled: true,
        },
        {
          name: "total_amount",
          label: "Total Amount",
          type: "number",
          value: invoice?.total_amount || 0,
          onChange: () => {},
          disabled: true,
        },
        {
          name: "status",
          label: "Status",
          type: "autocomplete",
          value:
            statusOptions.find((opt) => opt.value === invoice?.status) || null,
          options: statusOptions,
          getOptionLabel: (option: any) => option.label,
          onChange: () => {},
          disabled: true,
        },
      ],
    },
  ];

  return (
    <DetailDialog
      open={open}
      onClose={onClose}
      title="Invoice Details"
      sections={sections}
      onDelete={onDelete}
    />
  );
};

export default DetailInvoiceDialog;
