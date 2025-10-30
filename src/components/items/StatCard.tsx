import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: 'white',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box
          sx={{
            color: color,
            display: 'flex',
            alignItems: 'center',
            mr: 1.5,
          }}
        >
          {icon}
        </Box>
        <Typography variant="body2" fontWeight={500} sx={{ color: color }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight={700} sx={{ color: 'text.primary' }}>
        {value}
      </Typography>
    </Box>
  );
};

export default StatCard;
