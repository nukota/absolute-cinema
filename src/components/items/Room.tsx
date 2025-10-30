import React from 'react';
import type { RoomDTO } from '../../utils/mockdata';
import { Typography, Button, Box } from '@mui/material';

interface RoomProps {
  room: RoomDTO;
  handleInfoClick: () => void;
}

const Room: React.FC<RoomProps> = ({ room, handleInfoClick }) => {
  return (
    <Box
      sx={{
        width: 180,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #7c3aed',
        borderRadius: 2,
        boxShadow: 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          component="h3"
          sx={{
            fontSize: '20px',
            fontWeight: 500,
            color: '#374151',
            textAlign: 'flex-start',
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {room.name}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '21px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#333',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
              }}
            >
              {room.cinema?.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '21px',
            }}
          >
            <Typography variant="body2" sx={{ color: '#000' }}>
              Capacity:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                ml: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {room.capacity}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 0 }}>
        <Button
          variant="text"
          color="primary"
          onClick={handleInfoClick}
          sx={{
            backgroundColor: 'rgba(124, 58, 237, 0.05)',
            width: '100%',
            borderRadius: 0,
          }}
        >
          View Info
        </Button>
      </Box>
    </Box>
  );
};

export default Room;
