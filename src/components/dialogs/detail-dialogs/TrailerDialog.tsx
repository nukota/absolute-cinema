import { Dialog, DialogContent } from '@mui/material';

interface TrailerDialogProps {
  open: boolean;
  onClose: () => void;
  trailerUrl?: string;
}

const TrailerDialog = ({ open, onClose, trailerUrl }: TrailerDialogProps) => {
  const getEmbedUrl = (url?: string) => {
    if (!url) return '';

    // Handle YouTube URLs
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Handle Vimeo URLs
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }

    // Return as-is if already an embed URL or other format
    return url;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: 'black',
          borderRadius: 2,
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        {trailerUrl && (
          <iframe
            width="100%"
            height="562.5"
            src={getEmbedUrl(trailerUrl)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Movie Trailer"
            style={{
              border: 'none',
              borderRadius: '8px',
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrailerDialog;