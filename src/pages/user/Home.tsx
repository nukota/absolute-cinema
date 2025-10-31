import { Box, Container, Typography } from '@mui/material';
import { mockMovies } from '../../utils/mockdata';
import { MovieStatus } from '../../utils/enum';
import MovieSwiper from '../../components/elements/user/MovieSwiper';
import HeroSection from '../../components/elements/user/HeroSection';

const Home = () => {
  // Get featured movies (currently showing)
  const featuredMovies = mockMovies.filter(movie => movie.status === MovieStatus.NowShowing).slice(0, 6);

  // Get coming soon movies
  const comingSoonMovies = mockMovies.filter(movie => movie.status === MovieStatus.ComingSoon).slice(0, 6);

  return (
    <Box 
      sx={{
        background: 'radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Now Showing Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <MovieSwiper title="Now Showing" movies={featuredMovies} />
      </Container>

      {/* Coming Soon Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <MovieSwiper title="Coming Soon" movies={comingSoonMovies} />
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={6} color="primary.secondary">
            WHY CHOOSE US
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            <Box textAlign="center">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '2rem',
                }}
              >
                🎬
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom color="white">
                Latest Movies
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)">
                Watch the newest releases and blockbusters
              </Typography>
            </Box>
            <Box textAlign="center">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '2rem',
                }}
              >
                🪑
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom color="white">
                Comfortable Seats
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)">
                Premium seating with maximum comfort
              </Typography>
            </Box>
            <Box textAlign="center">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '2rem',
                }}
              >
                🎟️
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom color="white">
                Easy Booking
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)">
                Book tickets online in just a few clicks
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
