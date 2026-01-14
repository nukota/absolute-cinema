import { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useMoviesByCustomer } from "../../services/moviesService";
import { useCurrentUser } from "../../services/authService";
import { useSaveMovie, useRemoveSavedMovie } from "../../services/savesService";
import { useFeedback } from "../../provider/FeedbackProvider";
import SlideItem from "../../components/items/SlideItem";
import { useTheme } from "../../provider/ThemeProvider";

const SavedMoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: currentUser } = useCurrentUser();
  const { data: movies, isLoading } = useMoviesByCustomer(
    currentUser?.id || ""
  );
  const saveMovieMutation = useSaveMovie();
  const removeSavedMovieMutation = useRemoveSavedMovie();
  const { showSnackbar } = useFeedback();
  const { t } = useTheme();

  // Show snackbar when movie is successfully saved
  useEffect(() => {
    if (saveMovieMutation.isSuccess) {
      showSnackbar({
        message: t("savedMovies.movieSaved"),
        severity: "success",
      });
      saveMovieMutation.reset();
    }
  }, [saveMovieMutation.isSuccess, showSnackbar, saveMovieMutation, t]);

  const handleSaveMovie = (movieId: string) => {
    if (currentUser?.id) {
      saveMovieMutation.mutate({
        customer_id: currentUser.id,
        movie_id: movieId,
      });
    }
  };

  const handleUnsaveMovie = (movieId: string) => {
    if (currentUser?.id) {
      removeSavedMovieMutation.mutate({
        customerId: currentUser.id,
        movieId,
      });
    }
  };

  // Filter saved movies based on search
  const filteredMovies =
    movies?.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const isSaved = movie.isSaved === true;
      return matchesSearch && isSaved;
    }) || [];

  return (
    <Box
      sx={{
        background:
          "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom color="white">
          {t("savedMovies.title")}
        </Typography>
        <Typography
          variant="body1"
          color="rgba(255, 255, 255, 0.7)"
          sx={{ mb: 4 }}
        >
          {t("savedMovies.subtitle")}
        </Typography>

        {/* Search Filter */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            size="small"
            placeholder={t("savedMovies.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color: "white",
              },
            }}
          />
        </Box>

        {/* Loading State */}
        {isLoading || !currentUser ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} sx={{ color: "primary.main" }} />
          </Box>
        ) : (
          <>
            {/* Movie Grid */}
            {filteredMovies.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="rgba(255, 255, 255, 0.7)">
                  {t("savedMovies.noMovies")}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: 4,
                  justifyItems: "center",
                }}
              >
                {filteredMovies.map((movie) => (
                  <SlideItem
                    key={movie.movie_id}
                    movie={movie}
                    onSaveMovie={handleSaveMovie}
                    onUnsaveMovie={handleUnsaveMovie}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default SavedMoviesPage;
