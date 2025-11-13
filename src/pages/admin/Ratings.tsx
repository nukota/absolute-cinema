import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Rating as MuiRating,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CustomDataGrid from '../../components/layouts/DataGrid';
import { mockRatings } from '../../utils/mockdata';
import type { GridColDef } from '@mui/x-data-grid';
import type { RatingDTO } from '../../utils/dtos/ratingDTO';
import DetailRatingDialog from '../../components/dialogs/detail-dialogs/DetailRatingDialog';

const Ratings = () => {
  const [loading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedRating, setSelectedRating] = useState<RatingDTO | null>(null);

  const handleViewDetails = (id: string) => {
    const rating = mockRatings.find((r) => r.rating_id === id);
    if (rating) {
      setSelectedRating(rating);
      setOpenDetailDialog(true);
    }
  };

  const handleDelete = () => {
    console.log('Deleting rating:', selectedRating?.rating_id);
    setOpenDetailDialog(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'rating_id',
      headerName: 'ID',
      width: 80,
      sortable: true,
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      minWidth: 180,
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
      field: 'movie',
      headerName: 'Movie',
      flex: 1,
      minWidth: 180,
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
      field: 'rating_value',
      headerName: 'Rating',
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <MuiRating value={params.row.rating_value} readOnly size="small" />
      ),
    },
    {
      field: 'review',
      headerName: 'Comment',
      flex: 1,
      minWidth: 200,
      sortable: false,
    },
    {
      field: 'created_at',
      headerName: 'Date',
      width: 180,
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
            onClick={() => handleViewDetails(params.row.rating_id)}
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
    console.log('Delete selected ratings:', selectedRows);
    // Implement delete logic here
  };

  return (
    <>
      <CustomDataGrid
        title="Ratings Management"
        loading={loading}
        rows={mockRatings}
        columns={columns}
        selectedRows={selectedRows}
        onRowSelectionChange={setSelectedRows}
        onDeleteSelected={handleDeleteSelected}
        showCheckboxSelection={true}
        getRowId={(row) => row.rating_id}
        pageSize={10}
        pageSizeOptions={[10, 20, 50]}
      />
      <DetailRatingDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        rating={selectedRating}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Ratings;
