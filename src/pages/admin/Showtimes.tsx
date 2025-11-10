import { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CustomDataGrid from '../../components/layouts/DataGrid';
import { mockShowtimes } from '../../utils/mockdata';
import type { GridColDef } from '@mui/x-data-grid';
import CreateShowtimeDialog from '../../components/dialogs/create-dialogs/CreateShowtimeDialog';

const Showtimes = () => {
  const [loading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleAddNewShowtime = () => {
    setOpenCreateDialog(true);
  };

  const handleViewDetails = (id: string) => {
    console.log('View details for showtime:', id);
    // Navigate to showtime details page or open a modal
  };

  const columns: GridColDef[] = [
    {
      field: 'showtime_id',
      headerName: 'ID',
      width: 70,
      sortable: true,
    },
    {
      field: 'movie',
      headerName: 'Movie',
      flex: 1,
      minWidth: 200,
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
            ID: {params.row.movie.movie_id}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {params.row.movie.title}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'cinema',
      headerName: 'Cinema',
      flex: 1,
      minWidth: 180,
      sortable: true,
      valueGetter: (_value, row) => row.cinema.name,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.row.cinema.name}
        </Typography>
      ),
    },
    {
      field: 'room',
      headerName: 'Room',
      flex: 1,
      minWidth: 150,
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
            ID: {params.row.room.room_id}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {params.row.room.name}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'time',
      headerName: 'Time',
      flex: 1,
      minWidth: 200,
      sortable: true,
      renderCell: (params) => {
        const startDate = new Date(params.row.start_time);
        const endDate = new Date(params.row.end_time);

        const startTime = startDate.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        });
        const endTime = endDate.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        });
        const date = startDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        return (
          <Typography variant="body2">
            {startTime} - {endTime}, {date}
          </Typography>
        );
      },
    },
    {
      field: 'price',
      headerName: 'Price',
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
      field: 'actions',
      headerName: 'Actions',
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
    console.log('Delete selected showtimes:', selectedRows);
    // Implement delete logic here
  };

  return (
    <>
      <CustomDataGrid
        title="Showtimes Management"
        loading={loading}
        rows={mockShowtimes}
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
      />
    </>
  );
};

export default Showtimes;
