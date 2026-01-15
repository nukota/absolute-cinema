import React from "react";
import type { CinemaDTO } from "../../utils/mockdata";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";

interface CinemaProps {
  cinema: CinemaDTO;
  handleInfoClick: () => void;
}

const Cinema: React.FC<CinemaProps> = ({ cinema, handleInfoClick }) => {
  return (
    <Card
      sx={{
        width: 300,
        height: 200,
        display: "flex",
        flexDirection: "column",
        border: 2,
        borderColor: "primary.main",
        borderRadius: 3,
        boxShadow: "none",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: (theme) =>
            `0 12px 30px ${
              theme.palette.mode === "dark"
                ? "rgba(186, 104, 200, 0.2)"
                : "rgba(124, 58, 237, 0.2)"
            }`,
          borderColor: "primary.dark",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "60px",
          height: "60px",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(45deg, rgba(186, 104, 200, 0.1), rgba(123, 31, 162, 0.05))"
              : "linear-gradient(45deg, #faf5ff, #f3e8ff)",
          borderRadius: "0 0 0 100%",
          zIndex: 1,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2, position: "relative", zIndex: 2 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "text.primary",
            mb: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {cinema.name}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocationOnOutlinedIcon
              sx={{ fontSize: 18, color: "text.secondary" }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cinema.address}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MeetingRoomOutlinedIcon
              sx={{ fontSize: 18, color: "text.secondary" }}
            />
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Rooms:{" "}
              <Box
                component="span"
                sx={{ fontWeight: 700, color: "primary.main" }}
              >
                {cinema.room_count}
              </Box>
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 0 }}>
        <Button
          variant="text"
          color="primary"
          onClick={handleInfoClick}
          sx={{
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(45deg, rgba(186, 104, 200, 0.1), rgba(123, 31, 162, 0.05))"
                : "linear-gradient(45deg, rgba(124, 58, 237, 0.1), rgba(109, 40, 217, 0.05))",
            width: "100%",
            borderRadius: 0,
            py: 1,
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "primary.main",
            "&:hover": {
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, rgba(186, 104, 200, 0.15), rgba(123, 31, 162, 0.1))"
                  : "linear-gradient(45deg, rgba(124, 58, 237, 0.15), rgba(109, 40, 217, 0.1))",
            },
          }}
        >
          View Details
        </Button>
      </CardActions>

      {/* Decorative background text */}
      <Typography
        sx={{
          position: "absolute",
          top: -20,
          right: -30,
          fontSize: "72px",
          color: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(186, 104, 200, 0.05)"
              : "#faf5ff",
          zIndex: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 900,
          opacity: 1,
        }}
      >
        {cinema.name}
      </Typography>
    </Card>
  );
};

export default Cinema;
