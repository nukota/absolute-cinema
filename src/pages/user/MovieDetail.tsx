import { useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Container, Divider, Typography } from '@mui/material';
import { AccessTime, CalendarToday, Person, Star } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { mockMovies, mockShowtimes } from '../../utils/mockdata';
import { MovieStatus } from '../../utils/enum';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  // Find the movie
  const movie = mockMovies.find(m => m.movie_id === id);

  // Find showtimes for this movie
  const movieShowtimes = mockShowtimes.filter(s => s.movie.movie_id === id);

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">Movie not found</Typography>
        <Button onClick={() => navigate('/movies')} sx={{ mt: 2 }}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case MovieStatus.NowShowing:
        return 'success';
      case MovieStatus.ComingSoon:
        return 'info';
      case MovieStatus.Stopped:
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case MovieStatus.NowShowing:
        return 'Now Showing';
      case MovieStatus.ComingSoon:
        return 'Coming Soon';
      case MovieStatus.Stopped:
        return 'Stopped';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Group showtimes by date
  const groupedShowtimes = movieShowtimes.reduce((acc, showtime) => {
    const date = formatDate(showtime.start_time);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(showtime);
    return acc;
  }, {} as Record<string, typeof movieShowtimes>);

  const handleBooking = () => {
    if (selectedShowtime) {
      navigate(`/booking/${selectedShowtime}`);
    }
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'black',
          color: 'white',
          py: 4,
          backgroundImage: movie.poster_url ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${movie.poster_url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
              gap: 4,
            }}
          >
            <Box>
              <Box
                component="img"
                src={movie.poster_url || 'https://via.placeholder.com/300x400?text=No+Image'}
                alt={movie.title}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              />
            </Box>
            <Box>
              <Chip
                label={getStatusLabel(movie.status)}
                color={getStatusColor(movie.status)}
                size="small"
                sx={{ mb: 2, fontWeight: 600 }}
              />
              <Typography variant="h3" fontWeight={700} gutterBottom>
                {movie.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime fontSize="small" />
                  <Typography>{movie.duration_min} min</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star fontSize="small" />
                  <Typography>{movie.rating || 'N/A'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday fontSize="small" />
                  <Typography>{new Date(movie.release_date).getFullYear()}</Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                {movie.description || 'No description available'}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>
                  Genre
                </Typography>
                <Typography variant="body1">
                  {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre || 'N/A'}
                </Typography>
              </Box>
              {movie.director && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>
                    Director
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person fontSize="small" />
                    <Typography variant="body1">{movie.director}</Typography>
                  </Box>
                </Box>
              )}
              {movie.actors && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.7 }}>
                    Cast
                  </Typography>
                  <Typography variant="body1">
                    {Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Showtimes Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {movie.status === MovieStatus.NowShowing && movieShowtimes.length > 0 ? (
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Select Showtime
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Choose your preferred date and time
            </Typography>

            {Object.entries(groupedShowtimes).map(([date, showtimes]) => (
              <Box key={date} sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  {date}
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                    gap: 2,
                  }}
                >
                  {showtimes.map((showtime) => (
                    <Card
                      key={showtime.showtime_id}
                      sx={{
                        cursor: 'pointer',
                        border: 2,
                        borderColor: selectedShowtime === showtime.showtime_id ? 'primary.main' : 'transparent',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.light',
                          transform: 'translateY(-2px)',
                        },
                      }}
                      onClick={() => setSelectedShowtime(showtime.showtime_id)}
                    >
                      <CardContent>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {formatTime(showtime.start_time)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {showtime.cinema.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {showtime.room.name}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body1" fontWeight={600} color="primary">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(showtime.price)}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            ))}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                disabled={!selectedShowtime}
                onClick={handleBooking}
                sx={{ px: 6, py: 1.5 }}
              >
                Continue to Seat Selection
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom>
              {movie.status === MovieStatus.ComingSoon
                ? 'This movie is coming soon!'
                : 'No showtimes available'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {movie.status === MovieStatus.ComingSoon
                ? 'Check back later for showtime updates'
                : 'This movie is no longer showing'}
            </Typography>
            <Button variant="outlined" onClick={() => navigate('/movies')}>
              Browse Other Movies
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetail;
