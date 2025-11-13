import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CustomDataGrid from '../../components/layouts/DataGrid';
import { mockCustomers } from '../../utils/mockdata';
import type { GridColDef } from '@mui/x-data-grid';
import type { CustomerDTO } from '../../utils/dtos/customerDTO';
import CreateCustomerDialog from '../../components/dialogs/create-dialogs/CreateCustomerDialog';
import DetailCustomerDialog from '../../components/dialogs/detail-dialogs/DetailCustomerDialog';

const Customers = () => {
  const [loading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDTO | null>(null);

  const handleAddNewCustomer = () => {
    setOpenCreateDialog(true);
  };

  const handleViewDetails = (id: string) => {
    const customer = mockCustomers.find((c) => c.customer_id === id);
    if (customer) {
      setSelectedCustomer(customer);
      setOpenDetailDialog(true);
    }
  };

  const handleSave = (customer: CustomerDTO) => {
    console.log('Saving customer:', customer);
    setOpenDetailDialog(false);
  };

  const handleDelete = () => {
    console.log('Deleting customer:', selectedCustomer?.customer_id);
    setOpenDetailDialog(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'customer_id',
      headerName: 'ID',
      width: 80,
      sortable: true,
    },
    {
      field: 'full_name',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 160,
      sortable: true,
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      width: 130,
      sortable: true,
      valueFormatter: (value) => {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      field: 'CCCD',
      headerName: 'CCCD',
      width: 140,
      sortable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
      sortable: true,
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
            onClick={() => handleViewDetails(params.row.customer_id)}
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
    console.log('Delete selected customers:', selectedRows);
    // Implement delete logic here
  };

  return (
    <>
      <CustomDataGrid
        title="Customers Management"
        loading={loading}
        rows={mockCustomers}
        columns={columns}
        onAddNew={handleAddNewCustomer}
        addButtonText="Add New Customer"
        selectedRows={selectedRows}
        onRowSelectionChange={setSelectedRows}
        onDeleteSelected={handleDeleteSelected}
        showCheckboxSelection={true}
        getRowId={(row) => row.customer_id}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
      />
      <CreateCustomerDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
      <DetailCustomerDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        customer={selectedCustomer}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Customers;
