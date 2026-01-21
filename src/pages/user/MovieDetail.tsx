import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { EventSeat } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieBySlug } from "../../services/moviesService";
import { useShowtimesByMovie } from "../../services/showtimesSerivce";
import MovieInfo from "../../components/elements/user/MovieInfo";
import ShowtimeItem from "../../components/items/Showtime";
import { MovieStatus } from "../../utils/enum";
import { formatDate } from "../../utils/helper/helper";
import { useTheme } from "../../provider/ThemeProvider";
import { Helmet } from "react-helmet";

const MovieDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const { t } = useTheme();

  // API calls
  const { data: movie, isLoading: movieLoading } = useMovieBySlug(slug || "");
  const { data: showtimes, isLoading: showtimesLoading } = useShowtimesByMovie(
    movie?.movie_id || "",
  );

  // Get unique dates and cinemas from showtimes
  const availableDates = showtimes
    ? [...new Set(showtimes.map((s) => new Date(s.start_time).toDateString()))]
        .map((dateStr) => new Date(dateStr))
        .sort((a, b) => a.getTime() - b.getTime())
        .map((date) => formatDate(date.toISOString()))
    : [];

  const availableCinemas = showtimes
    ? [...new Set(showtimes.map((s) => s.cinema.cinema_id))]
        .map(
          (cinemaId) =>
            showtimes.find((s) => s.cinema.cinema_id === cinemaId)?.cinema,
        )
        .filter(Boolean)
    : [];

  // Filter showtimes based on selected date and cinema
  const filteredShowtimes =
    showtimes?.filter((showtime) => {
      const showtimeDate = formatDate(showtime.start_time);
      const matchesDate = !selectedDate || showtimeDate === selectedDate;
      const matchesCinema =
        !selectedCinema || showtime.cinema.cinema_id === selectedCinema;
      return matchesDate && matchesCinema;
    }) || [];

  const isLoading = movieLoading || showtimesLoading;

  if (isLoading) {
    return (
      <Box
        sx={{
          background:
            "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} sx={{ color: "primary.main" }} />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">{t("movieDetail.movieNotFound")}</Typography>
        <Button onClick={() => navigate("/movies")} sx={{ mt: 2 }}>
          {t("movieDetail.backToMovies")}
        </Button>
      </Container>
    );
  }

  const handleBooking = () => {
    if (selectedShowtime) {
      navigate("/booking", { state: { showtimeId: selectedShowtime } });
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
      <Helmet>
        <title>{movie.title} - Book Tickets | Absolute Cinema</title>
        <meta
          name="description"
          content={`Book tickets for ${movie.title}. ${movie.description?.substring(0, 150)}...`}
        />
        <meta
          property="og:title"
          content={`${movie.title} - Book Tickets | Absolute Cinema`}
        />
        <meta
          property="og:description"
          content={`Book tickets for ${movie.title}. ${movie.description?.substring(0, 150)}...`}
        />
        <meta property="og:image" content={movie.poster_url} />
        <meta property="og:type" content="video.movie" />
        <meta
          property="og:url"
          content={`https://cinema.nct.pro.vn/movies/${movie.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      {/* Hero Section */}
      <MovieInfo movie={movie} />

      {/* Showtimes Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {movie.status === MovieStatus.NowShowing &&
        showtimes &&
        showtimes.length > 0 ? (
          <Box>
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              color="rgba(255, 255, 255, 0.7)"
            >
              {t("movieDetail.selectShowtime")}
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255, 255, 255, 0.5)"
              sx={{ mb: 4 }}
            >
              {t("movieDetail.chooseDateTime")}
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
                <InputLabel sx={{ color: "white" }}>
                  {t("movieDetail.selectDate")}
                </InputLabel>
                <Select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  label={t("movieDetail.selectDate")}
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
                    <em>{t("movieDetail.allDates")}</em>
                  </MenuItem>
                  {availableDates.map((date) => (
                    <MenuItem key={date} value={date}>
                      {date}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel sx={{ color: "white" }}>
                  {t("movieDetail.selectCinema")}
                </InputLabel>
                <Select
                  value={selectedCinema}
                  onChange={(e) => setSelectedCinema(e.target.value)}
                  label={t("movieDetail.selectCinema")}
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
                    <em>{t("movieDetail.allCinemas")}</em>
                  </MenuItem>
                  {availableCinemas.map(
                    (cinema) =>
                      cinema && (
                        <MenuItem
                          key={cinema.cinema_id}
                          value={cinema.cinema_id}
                        >
                          <Typography variant="body1">
                            {cinema.name}
                            {cinema.address ? ` (${cinema.address})` : ""}
                          </Typography>
                        </MenuItem>
                      ),
                  )}
                </Select>
              </FormControl>
            </Box>

            {/* Showtimes Display */}
            {filteredShowtimes.length > 0 ? (
              <Box>
                {Object.entries(
                  filteredShowtimes.reduce(
                    (acc, showtime) => {
                      const date = formatDate(showtime.start_time);
                      if (!acc[date]) {
                        acc[date] = [];
                      }
                      acc[date].push(showtime);
                      return acc;
                    },
                    {} as Record<string, typeof showtimes>,
                  ),
                ).map(([date, showtimes]) => (
                  <Box key={date} sx={{ mb: 6 }}>
                    <Typography
                      variant="h5"
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
                          sm: "repeat(3, 1fr)",
                          md: "repeat(5, 1fr)",
                          lg: "repeat(7, 1fr)",
                        },
                        gap: 2,
                      }}
                    >
                      {showtimes.map((showtime) => (
                        <ShowtimeItem
                          key={showtime.showtime_id}
                          showtime={showtime}
                          isSelected={selectedShowtime === showtime.showtime_id}
                          onSelect={setSelectedShowtime}
                        />
                      ))}
                    </Box>
                  </Box>
                ))}

                <Box
                  sx={{ mt: 6, display: "flex", justifyContent: "flex-end" }}
                >
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
                      background:
                        "linear-gradient(135deg, #ffd700 0%, #ffb300 100%)",
                      color: "#1a0a2e",
                      border: "2px solid transparent",
                      borderRadius: 3,
                      boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #ffb300 0%, #ff8f00 100%)",
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
                    {t("movieDetail.continueToSeats")}
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
                  {t("movieDetail.noShowtimes")}
                </Typography>
                <Typography variant="body1" color="rgba(255, 255, 255, 0.7)">
                  {t("movieDetail.tryDifferent")}
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
              {t("movieDetail.noShowtimes")}
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255, 255, 255, 0.7)"
              sx={{ mb: 3 }}
            >
              {movie.status === MovieStatus.ComingSoon
                ? t("movieDetail.checkBack")
                : t("movieDetail.noLongerShowing")}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate("/movies")}
              sx={{ color: "white", borderColor: "white" }}
            >
              {t("movieDetail.browseOther")}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetail;
