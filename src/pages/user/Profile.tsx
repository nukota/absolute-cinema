import { Box, Button, Card, CardContent, Container, Divider, Paper, Tab, Tabs, Typography } from '@mui/material';
import { Person, History, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Mock user data
  const user = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+84 123 456 789',
    memberSince: '2024-01-15',
    totalBookings: 12,
  };

  // Mock booking history
  const bookingHistory = [
    {
      id: 'BK001',
      movieTitle: 'Inception',
      cinema: 'Absolute Cinema - District 1',
      date: '2024-10-25',
      seats: ['A5', 'A6'],
      total: 200000,
      status: 'Completed',
    },
    {
      id: 'BK002',
      movieTitle: 'The Dark Knight',
      cinema: 'Absolute Cinema - District 2',
      date: '2024-10-20',
      seats: ['B3', 'B4'],
      total: 180000,
      status: 'Completed',
    },
    {
      id: 'BK003',
      movieTitle: 'Interstellar',
      cinema: 'Absolute Cinema - District 1',
      date: '2024-10-15',
      seats: ['C1', 'C2', 'C3'],
      total: 270000,
      status: 'Completed',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your account and view booking history
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
            gap: 3,
          }}
        >
          {/* Profile Sidebar */}
          <Paper sx={{ p: 3, height: 'fit-content' }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  margin: '0 auto 16px',
                }}
              >
                {user.fullName.split(' ').map(n => n[0]).join('')}
              </Box>
              <Typography variant="h6" fontWeight={600}>
                {user.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Member Since
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {new Date(user.memberSince).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Total Bookings
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {user.totalBookings}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<Settings />}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </Paper>

          {/* Main Content */}
          <Paper>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}
            >
              <Tab icon={<Person />} label="Account" />
              <Tab icon={<History />} label="Booking History" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Account Information
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 3,
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.fullName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.email}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {user.phone}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Member Status
                    </Typography>
                    <Typography variant="body1" fontWeight={600} color="primary.main">
                      Gold Member
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Booking History
                </Typography>
                {bookingHistory.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      No bookings yet
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/movies')}
                      sx={{ mt: 2 }}
                    >
                      Browse Movies
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {bookingHistory.map((booking) => (
                      <Card key={booking.id} variant="outlined">
                        <CardContent>
                          <Box
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr' },
                              gap: 2,
                            }}
                          >
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Booking ID: {booking.id}
                              </Typography>
                              <Typography variant="h6" fontWeight={600}>
                                {booking.movieTitle}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {booking.cinema}
                              </Typography>
                              <Typography variant="caption">
                                Seats: {booking.seats.join(', ')}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Date
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                {new Date(booking.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Total
                              </Typography>
                              <Typography variant="body1" fontWeight={600} color="primary.main">
                                {new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND',
                                }).format(booking.total)}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'inline-block',
                                  px: 1,
                                  py: 0.5,
                                  bgcolor: 'success.lighter',
                                  color: 'success.dark',
                                  borderRadius: 1,
                                  mt: 1,
                                }}
                              >
                                {booking.status}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
