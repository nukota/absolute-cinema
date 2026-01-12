import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CustomDataGrid from "../../components/layouts/DataGrid";
import {
  useAllCustomers,
  useDeleteCustomer,
  useUpdateCustomer,
} from "../../services/customersService";
import { useFeedback } from "../../provider/FeedbackProvider";
import type { GridColDef } from "@mui/x-data-grid";
import type { CustomerDTO } from "../../utils/dtos/customerDTO";
import DetailCustomerDialog from "../../components/dialogs/detail-dialogs/DetailCustomerDialog";

const Customers = () => {
  const { data: customers, isLoading: loading } = useAllCustomers();
  const deleteCustomerMutation = useDeleteCustomer();
  const updateCustomerMutation = useUpdateCustomer();
  const { showSnackbar } = useFeedback();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDTO | null>(
    null
  );

  const handleViewDetails = (id: string) => {
    const customer = customers?.find((c) => c.customer_id === id);
    if (customer) {
      setSelectedCustomer(customer);
      setOpenDetailDialog(true);
    }
  };

  const handleUpdateCustomer = (
    id: string,
    data: {
      full_name?: string;
      email?: string;
      dob?: string;
      phone_number?: string;
      cccd?: string;
    }
  ) => {
    updateCustomerMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Customer updated successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Update customer error:", error);
          showSnackbar({
            message: "Failed to update customer. Please try again.",
            severity: "error",
          });
        },
      }
    );
  };

  const handleDelete = () => {
    if (selectedCustomer) {
      deleteCustomerMutation.mutate(selectedCustomer.customer_id, {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Customer deleted successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Delete customer error:", error);
          showSnackbar({
            message: "Failed to delete customer. Please try again.",
            severity: "error",
          });
        },
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "customer_id",
      headerName: "ID",
      width: 80,
      sortable: true,
    },
    {
      field: "full_name",
      headerName: "Full Name",
      flex: 1,
      minWidth: 160,
      sortable: true,
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      width: 130,
      sortable: true,
      valueFormatter: (value) => {
        if (!value) return "";
        const date = new Date(value);
        return date.toLocaleDateString("en-GB");
      },
    },
    {
      field: "cccd",
      headerName: "CCCD",
      width: 140,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      sortable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
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
    if (selectedRows.length === 0) return;

    // For now, just delete the first selected item
    // In a real implementation, you might want to handle bulk delete
    const customerId = selectedRows[0];
    deleteCustomerMutation.mutate(customerId, {
      onSuccess: () => {
        setSelectedRows([]);
        showSnackbar({
          message: `${selectedRows.length} customer(s) deleted successfully!`,
          severity: "success",
        });
      },
      onError: (error) => {
        console.error("Delete customers error:", error);
        showSnackbar({
          message: "Failed to delete customers. Please try again.",
          severity: "error",
        });
      },
    });
  };

  return (
    <>
      <CustomDataGrid
        title="Customers Management"
        loading={loading}
        rows={customers || []}
        columns={columns}
        selectedRows={selectedRows}
        onRowSelectionChange={setSelectedRows}
        onDeleteSelected={handleDeleteSelected}
        showCheckboxSelection={true}
        getRowId={(row) => row.customer_id}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
      />
      <DetailCustomerDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        customer={selectedCustomer}
        onUpdate={handleUpdateCustomer}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Customers;
