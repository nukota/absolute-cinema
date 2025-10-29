import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import CustomTabs from '../../components/layouts/Tabs';
import { mockMovies } from '../../utils/mockdata';

const Movies = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading] = useState(false);

  const tabs = [
    { label: 'All', value: 'All' },
    { label: 'Now Showing', value: 'Now Showing' },
    { label: 'Coming Soon', value: 'Coming Soon' },
  ];

  const handleAddNew = () => {
    console.log('Add new movie');
  };

  return (
    <CustomTabs
      title="Movies"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
      data={mockMovies}
      loading={loading}
      onAddNew={handleAddNew}
      addButtonText="Add Movie"
      searchColumns={['title', 'genre']}
      gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      gap="gap-6"
    >
      {(filteredData) =>
        filteredData.map((movie) => (
          <Card
            key={movie._id}
            sx={{
              maxWidth: 280,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
              },
            }}
          >
            <CardMedia
              component="img"
              height="400"
              image={movie.poster}
              alt={movie.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                {movie.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                {movie.genre.slice(0, 2).map((genre: string, index: number) => (
                  <Chip key={index} label={genre} size="small" />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                Duration: {movie.duration} min
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: ⭐ {movie.rating}/10
              </Typography>
              <Chip
                label={movie.status}
                color={movie.status === 'Now Showing' ? 'success' : 'warning'}
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        ))
      }
    </CustomTabs>
  );
};

export default Movies;
