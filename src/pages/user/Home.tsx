import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useMoviesByCustomer } from "../../services/moviesService";
import { useCurrentUser } from "../../services/authService";
import { useSaveMovie, useRemoveSavedMovie } from "../../services/savesService";
import { useFeedback } from "../../provider/FeedbackProvider";
import { useTheme } from "../../provider/ThemeProvider";
import { MovieStatus } from "../../utils/enum";
import MovieSwiper from "../../components/elements/user/MovieSwiper";
import HeroSection from "../../components/elements/user/HeroSection";
import { Helmet } from "react-helmet";

const Home = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: movies, isLoading } = useMoviesByCustomer(
    currentUser?.id || null,
  );
  const saveMovieMutation = useSaveMovie();
  const removeSavedMovieMutation = useRemoveSavedMovie();
  const { showSnackbar } = useFeedback();
  const { t } = useTheme();

  const featuredMovies =
    movies
      ?.filter((movie) => movie.status === MovieStatus.NowShowing)
      .slice(0, 6) || [];
  const comingSoonMovies =
    movies
      ?.filter((movie) => movie.status === MovieStatus.ComingSoon)
      .slice(0, 6) || [];

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

  // Show snackbar when movie is successfully saved
  useEffect(() => {
    if (saveMovieMutation.isSuccess) {
      showSnackbar({
        message: t("home.movieSaved"),
        severity: "success",
      });
      // Reset the mutation state to prevent repeated snackbars
      saveMovieMutation.reset();
    }
  }, [saveMovieMutation.isSuccess, showSnackbar, saveMovieMutation, t]);

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

  return (
    <Box
      sx={{
        background:
          "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)",
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title>Absolute Cinema - Book Movie Tickets Online</title>
        <meta
          name="description"
          content="Discover and book the latest movies at Absolute Cinema. Enjoy now showing and coming soon films with easy online ticket booking."
        />
        <meta
          property="og:title"
          content="Absolute Cinema - Book Movie Tickets Online"
        />
        <meta
          property="og:description"
          content="Discover and book the latest movies at Absolute Cinema. Enjoy now showing and coming soon films with easy online ticket booking."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cinema.nct.pro.vn/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      {/* Hero Section */}
      <HeroSection movies={movies || []} />

      {/* Now Showing Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <MovieSwiper
          title={t("home.nowShowing")}
          movies={featuredMovies}
          onSaveMovie={handleSaveMovie}
          onUnsaveMovie={handleUnsaveMovie}
        />
      </Container>

      {/* Coming Soon Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <MovieSwiper
          title={t("home.comingSoon")}
          movies={comingSoonMovies}
          onSaveMovie={handleSaveMovie}
          onUnsaveMovie={handleUnsaveMovie}
        />
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            mb={6}
            color="primary.secondary"
          >
            {t("home.whyChooseUs")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
            }}
          >
            <Box textAlign="center">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "2rem",
                }}
              >
                🎬
              </Box>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                color="white"
              >
                {t("home.latestMovies")}
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)">
                {t("home.latestMoviesDesc")}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "2rem",
                }}
              >
                🪑
              </Box>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                color="white"
              >
                {t("home.comfortableSeats")}
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)">
                {t("home.comfortableSeatsDesc")}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "2rem",
                }}
              >
                🎟️
              </Box>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                color="white"
              >
                {t("home.easyBooking")}
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)">
                {t("home.easyBookingDesc")}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
