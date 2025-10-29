import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { LocationOnOutlined, MeetingRoomOutlined } from '@mui/icons-material';
import type { Cinema as CinemaType } from '../../utils/mockdata';

interface CinemaProps {
  cinema: CinemaType;
}

const Cinema = ({ cinema }: CinemaProps) => {
  return (
    <Card
      sx={{
        maxWidth: 280,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        border: 1,
        borderColor: 'divider',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom fontSize="1rem">
          {cinema.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
          <LocationOnOutlined fontSize="small" color="action" />
          <Box>
            <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
              {cinema.address}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MeetingRoomOutlined fontSize="small" color="action" />
          <Chip
            label={`${cinema.total_rooms} Rooms`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Cinema;
