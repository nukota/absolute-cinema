import { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  styled,
} from '@mui/material';
import {
  TrendingUpOutlined,
  PeopleOutlined,
  MovieOutlined,
  AttachMoneyOutlined,
} from '@mui/icons-material';
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line, PieChart, Cell, Pie } from 'recharts';
import StatCard from '../../components/items/StatCard';

// Enhanced Paper component with gradient background
const EnhancedPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
}));

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('10');

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      icon: <AttachMoneyOutlined />,
      color: '#4caf50',
    },
    {
      title: 'Total Customers',
      value: '1,234',
      icon: <PeopleOutlined />,
      color: '#2196f3',
    },
    {
      title: 'Movies Showing',
      value: '24',
      icon: <MovieOutlined />,
      color: '#ff9800',
    },
    {
      title: 'Tickets Sold',
      value: '3,456',
      icon: <TrendingUpOutlined />,
      color: '#9c27b0',
    },
  ];

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  // Chart data
  const revenueData = [4200, 3800, 4500, 5200, 4800, 5500, 6200];
  const ticketsData = [320, 280, 340, 390, 360, 410, 450];
  const xLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'];

  const genreData = [
    { id: 0, value: 35, label: 'Action' },
    { id: 1, value: 25, label: 'Drama' },
    { id: 2, value: 20, label: 'Comedy' },
    { id: 3, value: 15, label: 'Sci-Fi' },
    { id: 4, value: 5, label: 'Horror' },
  ];

  const topMoviesData = [
    { movie: 'Avengers', tickets: 450 },
    { movie: 'Spider-Man', tickets: 380 },
    { movie: 'Batman', tickets: 320 },
    { movie: 'Inception', tickets: 280 },
    { movie: 'Interstellar', tickets: 250 },
  ];

  // Prepare data for Recharts
  const lineData = xLabels.map((label, index) => ({
    week: label,
    tickets: ticketsData[index],
  }));

  const revenueLineData = xLabels.map((label, index) => ({
    week: label,
    revenue: revenueData[index],
  }));

  const genrePieData = genreData.map(item => ({
    name: item.label,
    value: item.value,
  }));

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Welcome back! Here's what's happening with your cinema.
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Month"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Revenue Line Chart */}
        <EnhancedPaper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <AttachMoneyOutlined sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Revenue Overview
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueLineData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4caf50" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="week" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#4caf50" 
                strokeWidth={3}
                dot={{ fill: '#4caf50', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </EnhancedPaper>

        {/* Genre Distribution Pie Chart */}
        <EnhancedPaper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <MovieOutlined sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Genre Distribution
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genrePieData}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent as number * 100).toFixed(0)}%`}
                outerRadius={90}
                innerRadius={54}
                dataKey="value"
                cornerRadius={7}
              >
                {genrePieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={['#667eea', '#00d4ff', '#f093fb', '#4facfe', '#fa709a'][index % 5]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </EnhancedPaper>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
          gap: 3,
        }}
      >
        {/* Top Movies Bar Chart */}
        <EnhancedPaper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <TrendingUpOutlined sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Top Movies
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topMoviesData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9c27b0" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#ce93d8" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="movie" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                }}
              />
              <Legend />
              <Bar 
                dataKey="tickets" 
                fill="url(#barGradient)" 
                radius={[8, 8, 0, 0]} 
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </EnhancedPaper>

        {/* Tickets Sold Line Chart */}
        <EnhancedPaper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <PeopleOutlined sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Tickets Sold
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <defs>
                <linearGradient id="ticketsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2196f3" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="week" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tickets" 
                stroke="#2196f3" 
                strokeWidth={3}
                dot={{ fill: '#2196f3', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </EnhancedPaper>
      </Box>
    </Box>
  );
};

export default Dashboard;
