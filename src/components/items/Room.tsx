import React from "react";
import type { RoomDTO } from "../../utils/mockdata";
import { Typography, Button, Box, useTheme } from "@mui/material";

interface RoomProps {
  room: RoomDTO;
  handleInfoClick: () => void;
}

const Room: React.FC<RoomProps> = ({ room, handleInfoClick }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 180,
        height: 200,
        display: "flex",
        flexDirection: "column",
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 2,
        boxShadow:
          theme.palette.mode === "dark" ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.2s ease",
        cursor: "pointer",
        backgroundColor: "background.paper",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 12px rgba(0,0,0,0.4)"
              : "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          component="h3"
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            color: "text.primary",
            textAlign: "flex-start",
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {room.name}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "21px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}
            >
              {room.cinema?.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "21px",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Capacity:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                ml: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {room.capacity}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 0 }}>
        <Button
          variant="text"
          color="primary"
          onClick={handleInfoClick}
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(156, 39, 176, 0.1)"
                : "rgba(124, 58, 237, 0.05)",
            width: "100%",
            borderRadius: 0,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(156, 39, 176, 0.2)"
                  : "rgba(124, 58, 237, 0.1)",
            },
          }}
        >
          View Info
        </Button>
      </Box>
    </Box>
  );
};

export default Room;
