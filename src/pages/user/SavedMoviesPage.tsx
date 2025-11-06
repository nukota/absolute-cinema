import { useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { mockMovies } from '../../utils/mockdata';
import SlideItem from '../../components/items/SlideItem';

const SavedMoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // For now, filter from mockMovies - in real app, this would be user's saved movies
  // You can later add a "saved" property to filter only saved movies
  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <Box sx={{ 
      background: 'radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)',
      minHeight: '100vh', 
      py: 6 
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom color="white">
          Saved Movies
        </Typography>
        <Typography variant="body1" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 4 }}>
          We'll notify you when these movies are released or available for booking
        </Typography>

        {/* Search Filter */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search saved movies..."
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
        </Box>

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="rgba(255, 255, 255, 0.7)">
              No saved movies found
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

export default SavedMoviesPage;
