import { useState } from 'react';
import DetailDialog from '../template/DetailDialog';
import type { FormSection } from '../template/DetailDialog';
import type { InvoiceDTO } from '../../../utils/dtos/invoiceDTO';
import { InvoiceStatus, PaymentMethod } from '../../../utils/enum';

interface DetailInvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  invoice: InvoiceDTO | null;
  onSave?: (invoice: InvoiceDTO) => void;
  onDelete?: () => void;
}

const DetailInvoiceDialog: React.FC<DetailInvoiceDialogProps> = ({
  open,
  onClose,
  invoice,
  onSave,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState<InvoiceDTO | null>(invoice);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInvoice(invoice);
  };

  const handleSave = () => {
    if (!editedInvoice) return;

    onSave?.(editedInvoice);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedInvoice(invoice);
      setError('');
    } else {
      onClose();
    }
  };

  const statusOptions = [
    { value: InvoiceStatus.Pending, label: 'Pending' },
    { value: InvoiceStatus.Completed, label: 'Completed' },
  ];

  const paymentMethodOptions = [
    { value: PaymentMethod.Card, label: 'Card' },
    { value: PaymentMethod.Momo, label: 'Momo' },
    { value: PaymentMethod.Banking, label: 'Banking' },
  ];

  const sections: FormSection[] = [
    {
      title: 'Invoice Information',
      fields: [
        {
          name: 'invoice_code',
          label: 'Invoice Code',
          type: 'text',
          value: editedInvoice?.invoice_code || '',
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'created_at',
          label: 'Created At',
          type: 'datetime-local',
          value: editedInvoice?.created_at
            ? new Date(editedInvoice.created_at).toISOString().slice(0, 16)
            : '',
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: 'Customer Information',
      fields: [
        {
          name: 'customer_name',
          label: 'Customer Name',
          type: 'text',
          value: editedInvoice?.customer.full_name || '',
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'customer_email',
          label: 'Customer Email',
          type: 'email',
          value: editedInvoice?.customer.email || '',
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: 'Ticket Information',
      fields: [
        {
          name: 'movie_title',
          label: 'Movie Title',
          type: 'text',
          value: editedInvoice?.tickets.title || '',
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'showtime',
          label: 'Showtime',
          type: 'datetime-local',
          value: editedInvoice?.tickets.showtime
            ? new Date(editedInvoice.tickets.showtime).toISOString().slice(0, 16)
            : '',
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'seats',
          label: 'Seats',
          type: 'text',
          value: editedInvoice?.tickets.seats.join(', ') || '',
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'ticket_count',
          label: 'Ticket Count',
          type: 'number',
          value: editedInvoice?.ticket_count || 0,
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'ticket_price',
          label: 'Price per Ticket',
          type: 'number',
          value: editedInvoice?.tickets.price || 0,
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: 'Product Information',
      fields: [
        {
          name: 'product_count',
          label: 'Product Count',
          type: 'number',
          value: editedInvoice?.product_count || 0,
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'products_list',
          label: 'Products',
          type: 'longtext',
          value: editedInvoice?.products
            .map((p) => `${p.name} x${p.quantity} = ${p.total.toLocaleString()} VND`)
            .join('\n') || '',
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: 'Payment Information',
      fields: [
        {
          name: 'payment_method',
          label: 'Payment Method',
          type: 'autocomplete',
          value:
            paymentMethodOptions.find(
              (opt) => opt.value === editedInvoice?.payment_method
            ) || null,
          options: paymentMethodOptions,
          getOptionLabel: (option: any) => option.label,
          onChange: (value) =>
            setEditedInvoice((prev) =>
              prev ? { ...prev, payment_method: value?.value } : null
            ),
        },
        {
          name: 'total_amount',
          label: 'Total Amount',
          type: 'number',
          value: editedInvoice?.total_amount || 0,
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'status',
          label: 'Status',
          type: 'autocomplete',
          value:
            statusOptions.find((opt) => opt.value === editedInvoice?.status) ||
            null,
          options: statusOptions,
          getOptionLabel: (option: any) => option.label,
          onChange: (value) =>
            setEditedInvoice((prev) =>
              prev ? { ...prev, status: value?.value } : null
            ),
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
      error={error}
      isEditable={isEditing}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={onDelete}
    />
  );
};

export default DetailInvoiceDialog;
