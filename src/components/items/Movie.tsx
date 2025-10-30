import React from 'react';
import { Typography, Box } from '@mui/material';
import type { MovieDTO } from '../../utils/mockdata';

interface MovieProps {
  movie: MovieDTO;
  handleInfoClick: () => void;
}

const Movie: React.FC<MovieProps> = ({ movie, handleInfoClick }) => {
  const formattedDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'now showing':
        return '#166534'; // green-800
      case 'coming soon':
        return '#0c4a6e'; // sky-800
      case 'stopped':
        return '#9f1239'; // rose-800
      default:
        return '#6b7280'; // gray-500
    }
  };

  return (
    <Box
      sx={{
        height: 280,
        width: 180,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-10px)',
        },
      }}
      onClick={handleInfoClick}
    >
      <Box sx={{ position: 'relative', height: 220, width: '100%' }}>
        <Box
          component="img"
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            border: '1px solid #C4C4C4',
          }}
          src={movie.poster_url}
          alt="movie poster"
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '16px',
            color: 'black',
            my: 0.75,
            height: '24px', // Fixed height for 1 line
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {movie.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: 8,
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              color: 'gray',
              flex: 1,
              mr: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {formattedDate}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: getStatusColor(movie.status),
              textTransform: 'uppercase',
            }}
          >
            {movie.status}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Movie;
