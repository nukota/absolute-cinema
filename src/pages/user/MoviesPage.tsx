import { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Chip, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockMovies } from '../../utils/mockdata';
import { MovieStatus } from '../../utils/enum';

const Movies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter movies based on search and status
  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || movie.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom>
          All Movies
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Browse our collection of movies and book your tickets today
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Movies</MenuItem>
              <MenuItem value={MovieStatus.NowShowing}>Now Showing</MenuItem>
              <MenuItem value={MovieStatus.ComingSoon}>Coming Soon</MenuItem>
              <MenuItem value={MovieStatus.Stopped}>Stopped</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No movies found
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {filteredMovies.map((movie) => (
              <Card
                key={movie.movie_id}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() => navigate(`/movie/${movie.movie_id}`)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="350"
                    image={movie.poster_url || 'https://via.placeholder.com/300x400?text=No+Image'}
                    alt={movie.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Chip
                    label={getStatusLabel(movie.status)}
                    color={getStatusColor(movie.status)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre || 'N/A'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                    Duration: {movie.duration_min} min | Rating: {movie.rating || 'N/A'}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="small"
                      disabled={movie.status !== MovieStatus.NowShowing}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movie/${movie.movie_id}`);
                      }}
                    >
                      {movie.status === MovieStatus.NowShowing ? 'Book Now' : 'View Details'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Movies;
