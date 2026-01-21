import { useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CustomDataGrid from "../../components/layouts/DataGrid";
import {
  useAllShowtimes,
  useDeleteShowtime,
  useCreateShowtime,
  useUpdateShowtime,
  useNotifyUsers,
} from "../../services/showtimesSerivce";
import type { GridColDef } from "@mui/x-data-grid";
import type { ShowtimeDTO } from "../../utils/dtos/showtimeDTO";
import CreateShowtimeDialog from "../../components/dialogs/create-dialogs/CreateShowtimeDialog";
import DetailShowtimeDialog from "../../components/dialogs/detail-dialogs/DetailShowtimeDialog";
import { useFeedback } from "../../provider/FeedbackProvider";

const Showtimes = () => {
  const { data: showtimes, isLoading: loading } = useAllShowtimes();
  const deleteShowtimeMutation = useDeleteShowtime();
  const createShowtimeMutation = useCreateShowtime();
  const updateShowtimeMutation = useUpdateShowtime();
  const notifyUsersMutation = useNotifyUsers();
  const { showSnackbar } = useFeedback();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState<ShowtimeDTO | null>(
    null,
  );

  const handleAddNewShowtime = () => {
    setOpenCreateDialog(true);
  };

  const handleViewDetails = (id: string) => {
    const showtime = showtimes?.find((s) => s.showtime_id === id);
    if (showtime) {
      setSelectedShowtime(showtime);
      setOpenDetailDialog(true);
    }
  };

  const handleCreateShowtime = async (data: any) => {
    const { notifyUsers, ...showtimeData } = data;
    try {
      const createdShowtime =
        await createShowtimeMutation.mutateAsync(showtimeData);

      setOpenCreateDialog(false);
      showSnackbar({
        message: "Showtime created successfully!",
        severity: "success",
      });

      if (notifyUsers) {
        try {
          await notifyUsersMutation.mutateAsync({
            showtime_id: createdShowtime.showtime_id,
          });
          showSnackbar({
            message: "Users notified successfully!",
            severity: "success",
          });
        } catch (notifyError) {
          console.error("Notify users error:", notifyError);
          showSnackbar({
            message: "Failed to notify users. Please try again.",
            severity: "error",
          });
        }
      }
    } catch (error) {
      console.error("Create showtime error:", error);
      showSnackbar({
        message: "Failed to create showtime. Please try again.",
        severity: "error",
      });
    }
  };

  const handleUpdateShowtime = (id: string, data: any) => {
    updateShowtimeMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Showtime updated successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Update showtime error:", error);
          showSnackbar({
            message: "Failed to update showtime. Please try again.",
            severity: "error",
          });
        },
      },
    );
  };

  const handleDelete = () => {
    if (selectedShowtime) {
      deleteShowtimeMutation.mutate(selectedShowtime.showtime_id, {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Showtime deleted successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Delete showtime error:", error);
          showSnackbar({
            message: "Failed to delete showtime. Please try again.",
            severity: "error",
          });
        },
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "showtime_id",
      headerName: "ID",
      width: 70,
      sortable: true,
    },
    {
      field: "movie",
      headerName: "Movie",
      flex: 1,
      minWidth: 200,
      sortable: true,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            sx={{
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            variant="caption"
            color="text.secondary"
          >
            ID: {params.row.movie?.movie_id || "N/A"}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {params.row.movie?.title || "Unknown Movie"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "cinema",
      headerName: "Cinema",
      flex: 1,
      minWidth: 180,
      sortable: true,
      valueGetter: (_value, row) => row.cinema?.name || "Unknown Cinema",
      renderCell: (params) => (
        <Typography variant="body2">
          {params.row.cinema?.name || "Unknown Cinema"}
        </Typography>
      ),
    },
    {
      field: "room",
      headerName: "Room",
      flex: 1,
      minWidth: 150,
      sortable: true,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            sx={{
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            variant="caption"
            color="text.secondary"
          >
            ID: {params.row.room?.room_id || "N/A"}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {params.row.room?.name || "Unknown Room"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        const startDate = new Date(params.row.start_time);
        const endDate = new Date(params.row.end_time);

        const startTime = startDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const endTime = endDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const date = startDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        return (
          <Typography variant="body2">
            {startTime} - {endTime}, {date}
          </Typography>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 140,
      sortable: true,
      valueFormatter: (value) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      },
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
            onClick={() => handleViewDetails(params.row.showtime_id)}
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
    if (selectedRows.length > 0) {
      // For now, just delete the first selected showtime
      // In a real implementation, you might want to delete all selected
      deleteShowtimeMutation.mutate(selectedRows[0], {
        onSuccess: () => {
          setSelectedRows([]);
          showSnackbar({
            message: "Selected showtime deleted successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Delete showtime error:", error);
          showSnackbar({
            message: "Failed to delete showtime. Please try again.",
            severity: "error",
          });
        },
      });
    }
  };

  return (
    <>
      <CustomDataGrid
        title="Showtimes Management"
        loading={loading}
        rows={showtimes || []}
        columns={columns}
        onAddNew={handleAddNewShowtime}
        addButtonText="Add New Showtime"
        selectedRows={selectedRows}
        onRowSelectionChange={setSelectedRows}
        onDeleteSelected={handleDeleteSelected}
        showCheckboxSelection={true}
        getRowId={(row) => row.showtime_id}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
      />
      <CreateShowtimeDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onCreate={handleCreateShowtime}
      />
      <DetailShowtimeDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        showtime={selectedShowtime}
        onUpdate={handleUpdateShowtime}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Showtimes;
