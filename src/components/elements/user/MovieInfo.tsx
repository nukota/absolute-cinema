import { Box, Container, Typography, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  AccessTime,
  CalendarToday,
  Person,
  Star,
  Movie,
  People,
  PlayArrow,
} from "@mui/icons-material";
import type { MovieDTO } from "../../../utils/types";
import { MovieStatus } from "../../../utils/enum";

interface MovieInfoProps {
  movie: MovieDTO;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
  const statusColors = {
    success: "#4caf50",
    info: "#2196f3",
    grey: "#9e9e9e",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case MovieStatus.NowShowing:
        return "success";
      case MovieStatus.ComingSoon:
        return "info";
      case MovieStatus.Stopped:
        return "grey";
      default:
        return "grey";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case MovieStatus.NowShowing:
        return "Now Showing";
      case MovieStatus.ComingSoon:
        return "Coming Soon";
      case MovieStatus.Stopped:
        return "Stopped";
      default:
        return "Unknown";
    }
  };

  return (
    <Box
      sx={{
        color: "white",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "360px 1fr" },
            gap: 4,
          }}
        >
          <Box
            component="img"
            src={
              movie.poster_url ||
              "https://via.placeholder.com/300x400?text=No+Image"
            }
            alt={movie.title}
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          />
          <Box>
            <Box
              sx={{
                mb: 2,
                fontWeight: 600,
                marginTop: { xs: 0, lg: 2 },
                color: statusColors[getStatusColor(movie.status)],
                backgroundColor: alpha(
                  statusColors[getStatusColor(movie.status)],
                  0.1
                ),
                px: 2,
                py: 1,
                borderRadius: 1,
                display: "inline-block",
                fontSize: "1.25rem",
              }}
            >
              {getStatusLabel(movie.status)}
            </Box>
            <Typography variant="h2" fontWeight={700} gutterBottom>
              {movie.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                mb: 2,
                opacity: 0.9,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {movie.description || "No description available"}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTime fontSize="small" color="secondary" />
                <Typography
                  sx={{
                    opacity: 0.8,
                    minWidth: 60,
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "1.1rem",
                  }}
                >
                  Duration:
                </Typography>
                <Typography
                  sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem" }}
                >
                  {movie.duration_min} min
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Star fontSize="small" color="secondary" />
                <Typography
                  sx={{
                    opacity: 0.8,
                    minWidth: 60,
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "1.1rem",
                  }}
                >
                  Rating:
                </Typography>
                <Typography
                  sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem" }}
                >
                  {movie.rating || "N/A"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarToday fontSize="small" color="secondary" />
                <Typography
                  sx={{
                    opacity: 0.8,
                    minWidth: 60,
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "1.1rem",
                  }}
                >
                  Year:
                </Typography>
                <Typography
                  sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem" }}
                >
                  {new Date(movie.release_date).getFullYear()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Movie fontSize="small" color="secondary" />
                <Typography
                  sx={{
                    opacity: 0.8,
                    minWidth: 60,
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "1.1rem",
                  }}
                >
                  Genre:
                </Typography>
                <Typography
                  sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem" }}
                >
                  {Array.isArray(movie.genre)
                    ? movie.genre.join(", ")
                    : movie.genre || "N/A"}
                </Typography>
              </Box>
              {movie.director && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Person fontSize="small" color="secondary" />
                  <Typography
                    sx={{
                      opacity: 0.8,
                      minWidth: 60,
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "1.1rem",
                    }}
                  >
                    Director:
                  </Typography>
                  <Typography
                    sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem" }}
                  >
                    {movie.director}
                  </Typography>
                </Box>
              )}
              {movie.actors && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <People fontSize="small" color="secondary" />
                  <Typography
                    sx={{
                      opacity: 0.8,
                      minWidth: 60,
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "1.1rem",
                    }}
                  >
                    Cast:
                  </Typography>
                  <Typography
                    sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem" }}
                  >
                    {Array.isArray(movie.actors)
                      ? movie.actors.join(", ")
                      : movie.actors}
                  </Typography>
                </Box>
              )}
              
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<PlayArrow />}
              sx={{
                maxWidth: 160,
                mt: 2,
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
              }}
            >
              Play Trailer
            </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MovieInfo;
