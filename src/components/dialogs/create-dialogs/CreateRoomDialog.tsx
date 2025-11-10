import { useState, useEffect } from 'react';
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  TextField,
  Autocomplete,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { mockCinemas } from '../../../utils/mockdata';

interface CreateRoomDialogProps {
  open: boolean;
  onClose: () => void;
}

interface Seat {
  gridRow: number; // Absolute grid position (1-13)
  gridColumn: number; // Absolute grid position (-6 to 6)
  isActive: boolean;
}

const CustomDialogContent = styled(DialogContent)({
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#999',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#666',
  },
  overflowX: 'hidden',
});

const SeatButton = styled(IconButton)<{ active: boolean }>(({ active }) => ({
  width: 40,
  height: 28,
  borderRadius: 6,
  backgroundColor: active ? '#bbdefb' : '#f5f5f5',
  fontSize: 14,
  fontWeight: 600,
  color: active ? '#1976d2' : '#999',
  '&:hover': {
    backgroundColor: active ? '#90caf9' : '#eeeeee',
  },
  transition: 'all 0.2s',
}));

const CreateRoomDialog: React.FC<CreateRoomDialogProps> = ({
  open,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [cinema, setCinema] = useState<{ cinema_id: string; name: string } | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [error, setError] = useState('');

  const cinemaOptions = mockCinemas.map((c) => ({
    cinema_id: c.cinema_id,
    name: c.name,
  }));

  // Initialize seats (13 rows x 13 columns)
  // Pre-select only center area: 11 rows (rows 2-12) x 9 columns (columns -4 to 4)
  useEffect(() => {
    const initialSeats: Seat[] = [];
    for (let gridRow = 1; gridRow <= 13; gridRow++) {
      for (let gridCol = -6; gridCol <= 6; gridCol++) {
        // Only activate center area: rows 2-12 and columns -4 to 4
        const isInCenterArea = gridRow >= 2 && gridRow <= 12 && gridCol >= -4 && gridCol <= 4;
        
        initialSeats.push({
          gridRow,
          gridColumn: gridCol,
          isActive: isInCenterArea,
        });
      }
    }
    setSeats(initialSeats);
  }, []);

  // Calculate labels dynamically based on active seats
  const getSeatsWithLabels = () => {
    const activeSeats = seats.filter((s) => s.isActive);
    if (activeSeats.length === 0) return [];

    // Find the bounds of active seats
    const activeRows = [...new Set(activeSeats.map((s) => s.gridRow))].sort((a, b) => a - b);
    const activeColumns = [...new Set(activeSeats.map((s) => s.gridColumn))].sort((a, b) => a - b);

    // Create mapping from grid position to display position
    const rowMap = new Map(activeRows.map((gridRow, index) => [gridRow, index]));
    const colMap = new Map(activeColumns.map((gridCol, index) => [gridCol, index]));

    return seats.map((seat) => {
      if (!seat.isActive) {
        return { ...seat, label: '' };
      }

      const displayRow = rowMap.get(seat.gridRow)!;
      const displayCol = colMap.get(seat.gridColumn)!;
      
      const rowLetter = String.fromCharCode(65 + displayRow); // A=65
      const colNumber = displayCol + 1; // 1-based
      const label = `${rowLetter}${colNumber.toString().padStart(2, '0')}`;

      return { ...seat, label };
    });
  };

  const seatsWithLabels = getSeatsWithLabels();
  const capacity = seats.filter((s) => s.isActive).length;

  const toggleSeat = (gridRow: number, gridColumn: number) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.gridRow === gridRow && seat.gridColumn === gridColumn
          ? { ...seat, isActive: !seat.isActive }
          : seat
      )
    );
  };

  const handleAdd = () => {
    // Validation
    if (!name.trim()) {
      setError('Room name is required');
      return;
    }
    if (!cinema) {
      setError('Cinema is required');
      return;
    }
    if (capacity === 0) {
      setError('Room must have at least one active seat');
      return;
    }

    // TODO: Add room logic here
    const activeSeats = seats.filter((s) => s.isActive);
    console.log('Creating room:', {
      name,
      cinema,
      capacity,
      seats: activeSeats,
    });

    // Reset form and close
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setCinema(null);
    setError('');
    onClose();
  };

  // Group seats by grid row
  const seatsByRow: { [key: number]: Array<Seat & { label: string }> } = {};
  seatsWithLabels.forEach((seat) => {
    if (!seatsByRow[seat.gridRow]) {
      seatsByRow[seat.gridRow] = [];
    }
    seatsByRow[seat.gridRow].push(seat);
  });

  return (
    <MuiDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: 24,
          padding: '16px 24px',
        }}
      >
        Add New Room
      </DialogTitle>
      <CustomDialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            color="primary"
            fontWeight={550}
            sx={{ mt: 1 }}
          >
            Room Information
          </Typography>
          
          {/* Cinema and Room Name in the same row */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Typography sx={{ mr: 2, width: 120 }}>Cinema:</Typography>
              <Autocomplete
                options={cinemaOptions}
                value={cinema}
                onChange={(_, newValue) => setCinema(newValue)}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    size="small"
                    placeholder="Select cinema"
                  />
                )}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Typography sx={{ mr: 2, width: 140 }}>Room Name:</Typography>
              <TextField
                margin="dense"
                size="small"
                fullWidth
                placeholder="Enter room name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {/* Seat Map Section */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight={550}
            >
              Seat Map
            </Typography>
            <Typography variant="h6" fontWeight={700} color="black">
              Capacity: {capacity}
            </Typography>
          </Box>

          {/* Screen indicator */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, mt: 2 }}>
            <Box
              sx={{
                width: 640,
                height: 28,
                backgroundColor: '#f5f5f5',
                border: '2px solid #999',
                borderRadius: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body1" fontWeight={700} color="text.secondary">
                SCREEN
              </Typography>
            </Box>
          </Box>

          {/* Seat Grid */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {Object.keys(seatsByRow)
              .map(Number)
              .sort((a, b) => a - b)
              .map((rowNum) => (
                <Box
                  key={rowNum}
                  sx={{
                    display: 'flex',
                    gap: 0.5,
                    justifyContent: 'center',
                  }}
                >
                  {seatsByRow[rowNum]
                    .sort((a, b) => a.gridColumn - b.gridColumn)
                    .map((seat) => (
                      <SeatButton
                        key={`${seat.gridRow}-${seat.gridColumn}`}
                        active={seat.isActive}
                        onClick={() => toggleSeat(seat.gridRow, seat.gridColumn)}
                        title={seat.isActive ? `${seat.label} - Click to disable` : 'Click to enable'}
                      >
                        {seat.label}
                      </SeatButton>
                    ))}
                </Box>
              ))}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            Click on seats to enable/disable them
          </Typography>
        </Box>
      </CustomDialogContent>

      {/* Error display */}
      {error && (
        <Box sx={{ px: 3, pt: 1 }}>
          <Typography color="error" variant="body2" sx={{ textAlign: 'right' }}>
            {error}
          </Typography>
        </Box>
      )}

      <DialogActions sx={{ mb: 1.5, mr: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ width: 130 }}
          disableElevation
        >
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          sx={{ width: 130 }}
          disableElevation
        >
          Add
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default CreateRoomDialog;
