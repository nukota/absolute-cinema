import { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  TrendingUpOutlined,
  PeopleOutlined,
  MovieOutlined,
  AttachMoneyOutlined,
} from '@mui/icons-material';
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line, PieChart, Cell, Pie } from 'recharts';
import StatCard from '../../components/items/StatCard';

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
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Revenue Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4caf50" />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Genre Distribution Pie Chart */}
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Genre Distribution
          </Typography>
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
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 5]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
          gap: 3,
        }}
      >
        {/* Top Movies Bar Chart */}
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Top Movies
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topMoviesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="movie" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tickets" fill="#9c27b0" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Tickets Sold Line Chart */}
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Tickets Sold
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tickets" stroke="#2196f3" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
