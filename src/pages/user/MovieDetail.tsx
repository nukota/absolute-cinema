import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  EventSeat,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { mockMovies, mockShowtimes, mockCinemas } from "../../utils/mockdata";
import MovieInfo from "../../components/elements/user/MovieInfo";
import { MovieStatus } from "../../utils/enum";
import { formatDate, formatTime } from "../../utils/helper";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCinema, setSelectedCinema] = useState<string>("");

  // Find the movie
  const movie = mockMovies.find((m) => m.movie_id === id);

  // Find showtimes for this movie
  const movieShowtimes = mockShowtimes.filter((s) => s.movie.movie_id === id);

  // Get unique dates and cinemas
  const availableDates = [
    ...new Set(movieShowtimes.map((s) => formatDate(s.start_time))),
  ].sort();
  const availableCinemas = [
    ...new Set(movieShowtimes.map((s) => s.cinema.cinema_id)),
  ]
    .map((cinemaId) => mockCinemas.find((c) => c.cinema_id === cinemaId))
    .filter(Boolean);

  // Filter showtimes based on selected date and cinema
  const filteredShowtimes = movieShowtimes.filter((showtime) => {
    const showtimeDate = formatDate(showtime.start_time);
    const matchesDate = !selectedDate || showtimeDate === selectedDate;
    const matchesCinema =
      !selectedCinema || showtime.cinema.cinema_id === selectedCinema;
    return matchesDate && matchesCinema;
  });

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">Movie not found</Typography>
        <Button onClick={() => navigate("/movies")} sx={{ mt: 2 }}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  const handleBooking = () => {
    if (selectedShowtime) {
      navigate(`/booking/${selectedShowtime}`);
    }
  };

  return (
    <Box
      sx={{
        background:
          "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <MovieInfo movie={movie} />

      {/* Showtimes Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {movie.status === MovieStatus.NowShowing &&
        movieShowtimes.length > 0 ? (
          <Box>
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              color="rgba(255, 255, 255, 0.7)"
            >
              Select Showtime
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255, 255, 255, 0.5)"
              sx={{ mb: 4 }}
            >
              Choose your preferred date and time
            </Typography>

            {/* Date and Cinema Selection */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
                mb: 4,
                p: 3,
                bgcolor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel sx={{ color: "white" }}>Select Date</InputLabel>
                <Select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  label="Select Date"
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>All Dates</em>
                  </MenuItem>
                  {availableDates.map((date) => (
                    <MenuItem key={date} value={date}>
                      {date}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel sx={{ color: "white" }}>Select Cinema</InputLabel>
                <Select
                  value={selectedCinema}
                  onChange={(e) => setSelectedCinema(e.target.value)}
                  label="Select Cinema"
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>All Cinemas</em>
                  </MenuItem>
                  {availableCinemas.map(
                    (cinema) =>
                      cinema && (
                        <MenuItem
                          key={cinema.cinema_id}
                          value={cinema.cinema_id}
                        >
                          <Typography variant="body1">
                            {cinema.name} ({cinema.address})
                          </Typography>
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>
            </Box>

            {/* Showtimes Display */}
            {filteredShowtimes.length > 0 ? (
              <Box>
                {Object.entries(
                  filteredShowtimes.reduce((acc, showtime) => {
                    const date = formatDate(showtime.start_time);
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(showtime);
                    return acc;
                  }, {} as Record<string, typeof movieShowtimes>)
                ).map(([date, showtimes]) => (
                  <Box key={date} sx={{ mb: 6 }}>
                    <Typography
                      variant="h4"
                      fontWeight={600}
                      sx={{ mb: 2 }}
                      color="secondary"
                    >
                      {date}
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "repeat(2, 1fr)",
                          md: "repeat(4, 1fr)",
                          lg: "repeat(5, 1fr)",
                        },
                        gap: 2,
                      }}
                    >
                      {showtimes.map((showtime) => (
                        <Card
                          key={showtime.showtime_id}
                          sx={{
                            cursor: "pointer",
                            border: 2,
                            borderColor:
                              selectedShowtime === showtime.showtime_id
                                ? "secondary.main"
                                : "transparent",
                            transition: "all 0.2s",
                            background: "linear-gradient(135deg, #4a148c 0%, #543468 100%)",
                            color: "white",
                            "&:hover": {
                              borderColor: "secondary.light",
                              transform: "translateY(-2px)",
                            },
                          }}
                          onClick={() =>
                            setSelectedShowtime(showtime.showtime_id)
                          }
                        >
                          <CardContent>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              {formatTime(showtime.start_time)}
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight={600}
                              color="secondary"
                            >
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(showtime.price)}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </Box>
                ))}

                <Box sx={{ mt: 6, display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    size="large"
                    disabled={!selectedShowtime}
                    onClick={handleBooking}
                    sx={{
                      px: 3,
                      py: 1,
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      background: "linear-gradient(135deg, #ffd700 0%, #ffb300 100%)",
                      color: "#1a0a2e",
                      border: "2px solid transparent",
                      borderRadius: 3,
                      boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(135deg, #ffb300 0%, #ff8f00 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(255, 215, 0, 0.4)",
                        borderColor: "#ffd700",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                        boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                      },
                      "&:disabled": {
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "rgba(255, 255, 255, 0.5)",
                        boxShadow: "none",
                        transform: "none",
                      },
                    }}
                  >
                    Continue to Seat Selection
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <EventSeat
                  sx={{ fontSize: 64, color: "secondary.main", mb: 2 }}
                />
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="secondary.main"
                  sx={{ textTransform: "uppercase", mb: 2 }}
                >
                  Currently there're no showtimes
                </Typography>
                <Typography variant="body1" color="rgba(255, 255, 255, 0.7)">
                  Try selecting different date or cinema options
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <EventSeat sx={{ fontSize: 64, color: "secondary.main", mb: 2 }} />
            <Typography
              variant="h4"
              fontWeight={700}
              color="secondary.main"
              sx={{ textTransform: "uppercase", mb: 2 }}
            >
              Currently there're no showtimes
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255, 255, 255, 0.7)"
              sx={{ mb: 3 }}
            >
              {movie.status === MovieStatus.ComingSoon
                ? "Check back later for showtime updates"
                : "This movie is no longer showing"}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate("/movies")}
              sx={{ color: "white", borderColor: "white" }}
            >
              Browse Other Movies
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetail;
