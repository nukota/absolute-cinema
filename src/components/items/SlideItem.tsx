import { useState } from 'react';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import {
  AccessTime,
  PlayCircle,
  LocalActivity,
  Movie,
  Star,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { MovieDTO } from '../../utils/types';

interface SlideItemProps {
  movie: MovieDTO;
}

const SlideItem: React.FC<SlideItemProps> = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handlePlayTrailerClicked = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuyTicketClicked = () => {
    navigate(`/movie/${movie.movie_id}`);
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  if (!movie) {
    return (
      <Box sx={{ color: 'white' }}>
        Loading...
      </Box>
    );
  }

  return (
    <Box
      className="slide-item"
      sx={{
        position: 'relative',
        flexShrink: 0,
        width: 250,
        height: 480,
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        className="slide-item-poster"
        src={movie.poster_url || 'https://via.placeholder.com/250x375?text=No+Image'}
        alt={`${movie.title} poster`}
        sx={{
          position: 'absolute',
          width: 250,
          height: 375,
          objectFit: 'cover',
          borderRadius: 1,
          zIndex: 9,
        }}
      />
      <Typography
        sx={{
          position: 'absolute',
          top: 391,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.25rem',
          fontWeight: 500,
          color: 'white',
          px: 1,
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: '"Montserrat Alternates", sans-serif',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {movie.title}
        </Box>
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          top: 441,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          border: 1,
          borderColor: 'secondary.main',
          borderRadius: 2,
          backgroundColor: 'transparent',
          overflow: 'hidden',
        }}
      >
        <Button
          variant="text"
          fullWidth
          color="secondary"
          startIcon={<PlayCircle sx={{ fontSize: 10 }} />}
          sx={{ fontSize: 12, fontWeight: 600, flex: 1 }}
          onClick={handlePlayTrailerClicked}
        >
          Trailer
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          startIcon={<LocalActivity sx={{ fontSize: 10 }} />}
          sx={{
            fontSize: 12,
            fontWeight: 500,
            px: 2,
            flex: 0.75,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          onClick={handleBuyTicketClicked}
          disableElevation
        >
          Book
        </Button>
      </Box>
      <Box
        className="slide-item-filter"
        sx={{
          position: 'absolute',
          width: 250,
          height: 375,
          bgcolor: 'black',
          zIndex: 10,
        }}
      />
      <Box
        className="slide-item-info"
        sx={{
          position: 'absolute',
          width: '100%',
          height: 170,
          zIndex: 11,
        }}
      >
        <Box
          sx={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            py: 2,
            pl: 3,
          }}
        >
          <Typography sx={{ fontSize: 18, my: 1 }}>
            {movie.title}
          </Typography>
          <Box
            sx={{
              fontSize: 14,
              pl: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Movie sx={{ fontSize: 16, color: 'primary.main' }} />
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'white',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                }}
              >
                Genre: {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime sx={{ fontSize: 16, color: 'primary.main' }} />
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'white',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                }}
              >
                Duration: {movie.duration_min} min
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star sx={{ fontSize: 16, color: 'primary.main' }} />
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'white',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                }}
              >
                Rating: {movie.rating || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent sx={{ p: 0, bgcolor: 'black' }}>
          {getEmbedUrl(movie.poster_url || '') ? (
            <iframe
              width="1000"
              height="562"
              src={getEmbedUrl(movie.poster_url || '')}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer"
            />
          ) : (
            <Box
              sx={{
                width: 1000,
                height: 562,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <Typography variant="h6">Trailer not available</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SlideItem;
