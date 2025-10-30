import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mockMovies } from '../../utils/mockdata';
import { PlayArrow, LocalActivity, AccessTime } from '@mui/icons-material';
import { MovieStatus } from '../../utils/enum';
import MovieSwiper from '../../components/elements/user/MovieSwiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import type { MovieDTO } from '../../utils/types';

const Home = () => {
  const navigate = useNavigate();

  // Get featured movies (currently showing)
  const featuredMovies = mockMovies.filter(movie => movie.status === MovieStatus.NowShowing).slice(0, 6);

  // Get now showing movies for hero swiper
  const nowShowingMovies = mockMovies.filter(movie => movie.status === MovieStatus.NowShowing);

  const handleBookTicket = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handleWatchTrailer = (movie: MovieDTO) => {
    // For now, just navigate to movie detail page
    // In a real app, this would open a trailer modal
    navigate(`/movie/${movie.movie_id}`);
  };

  return (
    <Box>
      {/* Hero Section - Full Screen Swiper */}
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          style={{ height: '100%' }}
        >
          {nowShowingMovies.map((movie) => (
            <SwiperSlide key={movie.movie_id}>
              <Box
                sx={{
                  height: 'calc(100vh - 64px)',
                  width: '100%',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundImage: `url(${movie.poster_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.75) 0%, rgba(0, 0, 0, 0.65) 100%)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1,
                  },
                }}
              >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: 'center',
                      minHeight: 'calc(100vh - 64px)',
                      py: 4,
                    }}
                  >
                    {/* Movie Poster */}
                    <Box
                      sx={{
                        flex: { xs: 'none', md: '0 0 300px' },
                        mb: { xs: 4, md: 0 },
                        mr: { md: 6 },
                      }}
                    >
                      <Box
                        component="img"
                        src={movie.poster_url}
                        alt={`${movie.title} poster`}
                        sx={{
                          width: '100%',
                          maxWidth: 300,
                          height: 'auto',
                          borderRadius: 2,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        }}
                      />
                    </Box>

                    {/* Movie Info */}
                    <Box
                      sx={{
                        flex: 1,
                        color: 'white',
                        textAlign: { xs: 'center', md: 'left' },
                      }}
                    >
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        gutterBottom
                        sx={{
                          fontSize: { xs: '2rem', md: '3rem' },
                          mb: 2,
                        }}
                      >
                        Welcome to Absolute Cinema
                      </Typography>

                      <Typography
                        variant="h4"
                        fontWeight={600}
                        gutterBottom
                        sx={{
                          fontSize: { xs: '1.5rem', md: '2.5rem' },
                          mb: 1,
                        }}
                      >
                        {movie.title}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: { xs: 'center', md: 'flex-start' },
                          gap: 2,
                          mb: 2,
                          flexWrap: 'wrap',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                            }}
                          />
                          <Typography variant="body1">
                            {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTime sx={{ fontSize: 20, color: 'primary.main' }} />
                          <Typography variant="body1">{movie.duration_min} min</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Rating: {movie.rating}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          mb: 4,
                          maxWidth: 600,
                          lineHeight: 1.6,
                          opacity: 0.9,
                        }}
                      >
                        {movie.description}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          gap: 2,
                          flexWrap: 'wrap',
                          justifyContent: { xs: 'center', md: 'flex-start' },
                        }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<LocalActivity />}
                          onClick={() => handleBookTicket(movie.movie_id)}
                          sx={{
                            bgcolor: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.dark',
                            },
                            px: 4,
                            py: 1.5,
                          }}
                        >
                          Book Ticket
                        </Button>
                        <Button
                          variant="outlined"
                          size="large"
                          startIcon={<PlayArrow />}
                          onClick={() => handleWatchTrailer(movie)}
                          sx={{
                            borderColor: 'white',
                            color: 'white',
                            '&:hover': {
                              borderColor: 'white',
                              bgcolor: 'rgba(255,255,255,0.1)',
                            },
                            px: 4,
                            py: 1.5,
                          }}
                        >
                          Watch Trailer
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Now Showing Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <MovieSwiper title="Now Showing" movies={featuredMovies} />
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
            Why Choose Us
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
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Latest Movies
              </Typography>
              <Typography color="text.secondary">
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
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Comfortable Seats
              </Typography>
              <Typography color="text.secondary">
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
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Easy Booking
              </Typography>
              <Typography color="text.secondary">
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
