import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { mockMovies } from '../../utils/mockdata';
import { MovieStatus } from '../../utils/enum';
import SlideItem from '../../components/items/SlideItem';

const Movies = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNowShowing, setShowNowShowing] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(true);

  // Initialize search term from URL query parameter
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  // Filter movies based on search and status
  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = 
      (showNowShowing && movie.status === MovieStatus.NowShowing) ||
      (showComingSoon && movie.status === MovieStatus.ComingSoon);
    return matchesSearch && matchesStatus;
  });



  return (
    <Box sx={{ 
      background: 'radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)',
      minHeight: '100vh', 
      py: 6 
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom color="white">
          All Movies
        </Typography>
        <Typography variant="body1" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 4 }}>
          Browse our collection of movies and book your tickets today
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', minWidth: 300 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showNowShowing}
                  onChange={(e) => setShowNowShowing(e.target.checked)}
                  sx={{ color: 'white' }}
                />
              }
              label="Now Showing"
              sx={{ color: 'white', minWidth: 160 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showComingSoon}
                  onChange={(e) => setShowComingSoon(e.target.checked)}
                  sx={{ color: 'white' }}
                />
              }
              label="Coming Soon"
              sx={{ color: 'white', minWidth: 160 }}
            />
          </Box>
        </Box>

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="rgba(255, 255, 255, 0.7)">
              No movies found
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 4,
              justifyItems: 'center',
            }}
          >
            {filteredMovies.map((movie) => (
              <SlideItem key={movie.movie_id} movie={movie} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Movies;
