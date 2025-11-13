import { useState, useMemo } from 'react';
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
import { generateLast12Months, formatDateRange } from '../../utils/helper';
import { generateMockDashboardData } from '../../utils/mockdata';

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
  // Generate last 12 months
  const months = useMemo(() => generateLast12Months(), []);
  
  // Set default to current month
  const [selectedMonth, setSelectedMonth] = useState(months[0].value);

  // Generate dashboard data based on selected month
  const dashboardData = useMemo(() => generateMockDashboardData(selectedMonth), [selectedMonth]);

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${(dashboardData.stats.total_revenue / 1000).toFixed(1)}k`,
      icon: <AttachMoneyOutlined />,
      color: '#4caf50',
    },
    {
      title: 'Total Customers',
      value: dashboardData.stats.total_customers.toLocaleString(),
      icon: <PeopleOutlined />,
      color: '#2196f3',
    },
    {
      title: 'Movies Showing',
      value: dashboardData.stats.movies_showing.toString(),
      icon: <MovieOutlined />,
      color: '#ff9800',
    },
    {
      title: 'Tickets Sold',
      value: dashboardData.stats.tickets_sold.toLocaleString(),
      icon: <TrendingUpOutlined />,
      color: '#9c27b0',
    },
  ];

  // Prepare data for line charts (one point per 2 days)
  const lineData = dashboardData.daily_data.map((data) => ({
    date: formatDateRange(data.date),
    tickets: data.tickets,
  }));

  const revenueLineData = dashboardData.daily_data.map((data) => ({
    date: formatDateRange(data.date),
    revenue: data.revenue,
  }));

  const genrePieData = dashboardData.genre_distribution.map(item => ({
    name: item.genre,
    value: item.percentage,
  }));

  const topMoviesData = dashboardData.top_movies.map(movie => ({
    movie: movie.movie_name,
    tickets: movie.tickets_sold,
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
              <XAxis dataKey="date" stroke="#666" />
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
                dot={{ fill: '#4caf50', r: 3 }}
                activeDot={{ r: 5 }}
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
              <XAxis dataKey="date" stroke="#666" />
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
                dot={{ fill: '#2196f3', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </EnhancedPaper>
      </Box>
    </Box>
  );
};

export default Dashboard;
