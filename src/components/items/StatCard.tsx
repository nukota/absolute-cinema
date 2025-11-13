import { Box, Typography, Paper } from '@mui/material';
import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography 
            variant="body2" 
            fontWeight={600} 
            sx={{ 
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: '0.75rem',
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h5" 
            fontWeight={700} 
            sx={{ 
              color: 'text.primary',
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2.5,
            background: `linear-gradient(135deg, ${color}20, ${color}10)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            fontSize: 28,
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
};

export default StatCard;
