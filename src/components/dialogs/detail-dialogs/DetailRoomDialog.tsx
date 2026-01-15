import { useState, useEffect } from "react";
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { RoomDTO } from "../../../utils/dtos/roomDTO";
import type { SeatWithBookingStatus } from "../../../utils/dtos/seatDTO";

interface DetailRoomDialogProps {
  open: boolean;
  onClose: () => void;
  room: RoomDTO | null;
  seatsData?: SeatWithBookingStatus[];
  onSave?: (roomData: {
    name: string;
    seats: { row: number; col: number; isActive: boolean }[];
  }) => void;
  onDelete?: () => void;
}

interface Seat {
  gridRow: number;
  gridColumn: number;
  label: string;
  isActive: boolean;
}

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.mode === "dark" ? "#2a2a2a" : "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.mode === "dark" ? "#555" : "#999",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.mode === "dark" ? "#777" : "#666",
  },
  overflowX: "hidden",
}));

const SeatButton = styled(IconButton)<{ active: boolean }>(
  ({ active, theme }) => ({
    width: 40,
    height: 28,
    borderRadius: 6,
    backgroundColor: active
      ? theme.palette.mode === "dark"
        ? "rgba(156, 39, 176, 0.3)"
        : "#bbdefb"
      : theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "#f5f5f5",
    fontSize: 14,
    fontWeight: 600,
    color: active
      ? theme.palette.mode === "dark"
        ? "#ce93d8"
        : "#1976d2"
      : theme.palette.mode === "dark"
      ? "#666"
      : "#999",
    "&:hover": {
      backgroundColor: active
        ? theme.palette.mode === "dark"
          ? "rgba(156, 39, 176, 0.4)"
          : "#90caf9"
        : theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "#eeeeee",
    },
    transition: "all 0.2s",
  })
);

const DetailRoomDialog: React.FC<DetailRoomDialogProps> = ({
  open,
  onClose,
  room,
  seatsData,
  onSave,
  onDelete,
}) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(room?.name || "");
  const [gridSeats, setGridSeats] = useState<Seat[]>([]);
  const [error, setError] = useState("");

  // Reset editing state when dialog closes
  useEffect(() => {
    if (!open) {
      setIsEditing(false);
    }
  }, [open]);

  // Initialize seats when dialog opens or room/seats change
  useEffect(() => {
    if (room && seatsData && seatsData.length > 0 && open) {
      setName(room.name);

      // Convert seats data to grid format (13x13 grid with center area)
      const initialSeats: Seat[] = [];
      const seatMap = new Map(
        seatsData.map((s) => [`${s.row}-${s.column}`, s.seat_label])
      );

      for (let gridRow = 1; gridRow <= 13; gridRow++) {
        for (let gridCol = -6; gridCol <= 6; gridCol++) {
          // Use gridCol directly as the column value (matches CreateRoomDialog)
          const seatKey = `${gridRow}-${gridCol}`;
          const seatLabel = seatMap.get(seatKey);
          const isActive = seatLabel !== undefined;

          initialSeats.push({
            gridRow,
            gridColumn: gridCol,
            label: seatLabel || "",
            isActive,
          });
        }
      }

      setGridSeats(initialSeats);
    }
  }, [room, seatsData, open]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!room) return;

    // Validation
    if (!name.trim()) {
      setError("Room name is required");
      return;
    }

    const activeSeats = gridSeats.filter((s) => s.isActive);
    if (activeSeats.length === 0) {
      setError("Room must have at least one active seat");
      return;
    }

    const roomData = {
      name: name.trim(),
      seats: gridSeats.map((seat) => ({
        row: seat.gridRow,
        col: seat.gridColumn,
        isActive: seat.isActive,
      })),
    };

    onSave?.(roomData);
    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setName(room?.name || "");
      setError("");
    } else {
      onClose();
    }
  };

  const toggleSeat = (gridRow: number, gridColumn: number) => {
    if (!isEditing) return;

    setGridSeats((prev) =>
      prev.map((seat) => {
        if (seat.gridRow === gridRow && seat.gridColumn === gridColumn) {
          return { ...seat, isActive: !seat.isActive };
        }
        return seat;
      })
    );
  };

  const capacity = gridSeats.filter((s) => s.isActive).length;

  // Group seats by grid row
  const seatsByRow: { [key: number]: Seat[] } = {};
  gridSeats.forEach((seat) => {
    if (!seatsByRow[seat.gridRow]) {
      seatsByRow[seat.gridRow] = [];
    }
    seatsByRow[seat.gridRow].push(seat);
  });

  const actions: Array<{
    label: string;
    onClick: () => void;
    variant: "outlined" | "contained";
  }> = [
    {
      label: "Cancel",
      onClick: handleCancel,
      variant: "outlined",
    },
  ];

  if (isEditing) {
    actions.push({
      label: "Save",
      onClick: handleSave,
      variant: "contained",
    });
  } else {
    if (onDelete) {
      actions.push({
        label: "Delete",
        onClick: onDelete,
        variant: "outlined",
      });
    }
    actions.push({
      label: "Edit",
      onClick: handleEdit,
      variant: "contained",
    });
  }

  return (
    <MuiDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: 24,
          padding: "16px 24px",
        }}
      >
        Room Details
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
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              <Typography sx={{ mr: 2, width: 120 }}>Cinema:</Typography>
              <TextField
                margin="dense"
                size="small"
                fullWidth
                value={room?.cinema.name || ""}
                disabled
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              <Typography sx={{ mr: 2, width: 140 }}>Room Name:</Typography>
              <TextField
                margin="dense"
                size="small"
                fullWidth
                placeholder="Enter room name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
            </Box>
          </Box>
        </Box>

        {/* Seat Map Section */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6" color="primary" fontWeight={550}>
              Seat Map
            </Typography>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              Capacity: {capacity}
            </Typography>
          </Box>

          {/* Screen indicator */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3, mt: 2 }}>
            <Box
              sx={{
                width: 640,
                height: 28,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#f5f5f5",
                border: `2px solid ${
                  theme.palette.mode === "dark" ? "#555" : "#999"
                }`,
                borderRadius: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body1"
                fontWeight={700}
                color="text.secondary"
              >
                SCREEN
              </Typography>
            </Box>
          </Box>

          {/* Seat Grid */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                    display: "flex",
                    gap: 0.5,
                    justifyContent: "center",
                  }}
                >
                  {seatsByRow[rowNum]
                    .sort((a, b) => a.gridColumn - b.gridColumn)
                    .map((seat) => (
                      <SeatButton
                        key={`${seat.gridRow}-${seat.gridColumn}`}
                        active={seat.isActive}
                        onClick={() =>
                          toggleSeat(seat.gridRow, seat.gridColumn)
                        }
                        disabled={!isEditing}
                        title={
                          seat.isActive
                            ? `${seat.label}${
                                isEditing ? " - Click to disable" : ""
                              }`
                            : isEditing
                            ? "Click to enable"
                            : ""
                        }
                      >
                        {seat.label}
                      </SeatButton>
                    ))}
                </Box>
              ))}
          </Box>

          {isEditing && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Click on seats to enable/disable them
            </Typography>
          )}
        </Box>
      </CustomDialogContent>

      {/* Error display */}
      {error && (
        <Box sx={{ px: 3, pt: 1 }}>
          <Typography color="error" variant="body2" sx={{ textAlign: "right" }}>
            {error}
          </Typography>
        </Box>
      )}

      <DialogActions sx={{ mb: 1.5, mr: 2 }}>
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            variant={action.variant}
            sx={{ width: 130 }}
            disableElevation
          >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </MuiDialog>
  );
};

export default DetailRoomDialog;
