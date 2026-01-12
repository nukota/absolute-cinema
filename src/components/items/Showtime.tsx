import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import type { ShowtimeDTO } from "../../utils/dtos/showtimeDTO";
import { formatTime } from "../../utils/helper/helper";

interface ShowtimeItemProps {
  showtime: ShowtimeDTO;
  isSelected: boolean;
  onSelect: (showtimeId: string) => void;
}

const ShowtimeItem: React.FC<ShowtimeItemProps> = ({
  showtime,
  isSelected,
  onSelect,
}) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        border: 4,
        borderColor: isSelected ? "secondary.main" : "transparent",
        transition: "all 0.2s",
        background: "linear-gradient(135deg, #4a148c 0%, #543468 100%)",
        color: "white",
        "&:hover": {
          borderColor: "secondary.light",
          transform: "translateY(-2px)",
        },
      }}
      onClick={() => onSelect(showtime.showtime_id)}
    >
      <CardContent sx={{ justifyContent: "center", textAlign: "center" }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {formatTime(showtime.start_time)}
        </Typography>
        <Typography variant="body1" fontWeight={600} color="secondary">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(showtime.price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShowtimeItem;
