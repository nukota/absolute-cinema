import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  TrendingUpOutlined,
  PeopleOutlined,
  MovieOutlined,
  AttachMoneyOutlined,
} from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$45,231', icon: <AttachMoneyOutlined />, color: '#4caf50' },
    { title: 'Total Customers', value: '1,234', icon: <PeopleOutlined />, color: '#2196f3' },
    { title: 'Movies Showing', value: '24', icon: <MovieOutlined />, color: '#ff9800' },
    { title: 'Tickets Sold', value: '3,456', icon: <TrendingUpOutlined />, color: '#9c27b0' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's what's happening with your cinema today.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
        {stats.map((stat) => (
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }} key={stat.title}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: stat.color,
                    color: 'white',
                    p: 1,
                    borderRadius: 1,
                    display: 'flex',
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
