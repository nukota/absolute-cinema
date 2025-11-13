import { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CustomDataGrid from '../../components/layouts/DataGrid';
import { mockInvoices } from '../../utils/mockdata';
import type { GridColDef } from '@mui/x-data-grid';
import type { InvoiceDTO } from '../../utils/dtos/invoiceDTO';
import DetailInvoiceDialog from '../../components/dialogs/detail-dialogs/DetailInvoiceDialog';

const Invoices = () => {
  const [loading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDTO | null>(null);

  const handleViewDetails = (id: string) => {
    const invoice = mockInvoices.find((i) => i.invoice_id === id);
    if (invoice) {
      setSelectedInvoice(invoice);
      setOpenDetailDialog(true);
    }
  };

  const handleSave = (invoice: InvoiceDTO) => {
    console.log('Saving invoice:', invoice);
    setOpenDetailDialog(false);
  };

  const handleDelete = () => {
    console.log('Deleting invoice:', selectedInvoice?.invoice_id);
    setOpenDetailDialog(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'invoice_id',
      headerName: 'Invoice ID',
      width: 120,
      sortable: true,
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      minWidth: 160,
      sortable: true,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            sx={{
              maxWidth: 100,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            variant="caption"
            color="text.secondary"
          >
            ID: {params.row.customer.customer_id}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {params.row.customer.full_name}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'total_amount',
      headerName: 'Total Amount',
      width: 140,
      sortable: true,
      valueFormatter: (value) => {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(value);
      },
    },
    {
      field: 'payment_method',
      headerName: 'Payment Method',
      width: 150,
      sortable: true,
    },
    {
      field: 'created_at',
      headerName: 'Paid At',
      flex: 1,
      minWidth: 180,
      sortable: true,
      valueFormatter: (value) => {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="View Details">
          <IconButton
            size="small"
            onClick={() => handleViewDetails(params.row.invoice_id)}
            sx={{
              width: 32,
              height: 32,
            }}
          >
            <InfoOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const handleDeleteSelected = () => {
    console.log('Delete selected invoices:', selectedRows);
    // Implement delete logic here
  };

  return (
    <>
      <CustomDataGrid
        title="Invoices Management"
        loading={loading}
        rows={mockInvoices}
        columns={columns}
        selectedRows={selectedRows}
        onRowSelectionChange={setSelectedRows}
        onDeleteSelected={handleDeleteSelected}
        showCheckboxSelection={true}
        getRowId={(row) => row.invoice_id}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
      />
      <DetailInvoiceDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        invoice={selectedInvoice}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Invoices;
