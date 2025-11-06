import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, LocalActivity, AccessTime, Category, CalendarToday, Person, People } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { mockMovies } from '../../../utils/mockdata';
import { MovieStatus } from '../../../utils/enum';
import type { MovieDTO } from '../../../utils/dtos/admin';

const HeroSection = () => {
  const navigate = useNavigate();

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
    <Box
      sx={{
        height: 'calc(100vh)',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '-64px',
        '& .swiper-pagination': {
          bottom: '60px !important',
        },
        '& .swiper-pagination-bullet': {
          width: '12px',
          height: '12px',
          opacity: 0.5,
          backgroundColor: 'white',
          margin: '0 8px !important',
        },
        '& .swiper-pagination-bullet-active': {
          opacity: 1,
          backgroundColor: 'white',
        },
      }}
    >
      {/* Static "Welcome to Absolute Cinema" text */}
      <Container maxWidth="lg" sx={{ position: 'absolute', top: '80px', left: 0, right: 0, zIndex: 10, display: { xs: 'none', md: 'block' } }}>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            fontFamily: '"Montserrat Alternates", sans-serif',
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
            opacity: 0.75,
            color: 'white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Showing movies on Absolute Cinema!
        </Typography>
      </Container>

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
                height: 'calc(100vh)',
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
                  background: 'rgba(0, 0, 0, 0.85)',
                  zIndex: 1,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '64px',
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
                  zIndex: 2,
                },
              }}
            >
              {/* Bottom gradient overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '64px',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
                  zIndex: 2,
                }}
              />
              
              <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    minHeight: 'calc(100vh)',
                    py: 4,
                    pt: 12,
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
                      variant="h4"
                      fontWeight={600}
                      gutterBottom
                      color="#ccc"
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
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        justifyContent: 'flex-start',
                        gap: 1,
                        my: 2,
                        color: "#bbb",
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Category sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          <Typography component="span" sx={{ color: '#999', mr: 1 }}>
                            Genre:
                          </Typography>
                          {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          <Typography component="span" sx={{ color: '#999', mr: 1 }}>
                            Duration:
                          </Typography>
                          {movie.duration_min} min
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          <Typography component="span" sx={{ color: '#999', mr: 1 }}>
                            Year:
                          </Typography>
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          <Typography component="span" sx={{ color: '#999', mr: 1 }}>
                            Director:
                          </Typography>
                          {movie.director || 'N/A'}
                        </Typography>
                      </Box>
                      {movie.actors && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <People sx={{ fontSize: 20, color: 'primary.main' }} />
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            <Typography component="span" sx={{ color: '#999', mr: 1 }}>
                              Cast:
                            </Typography>
                            {Array.isArray(movie.actors) ? movie.actors.slice(0, 3).join(', ') + (movie.actors.length > 3 ? '...' : '') : movie.actors}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "#aaa",
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
  );
};

export default HeroSection;
