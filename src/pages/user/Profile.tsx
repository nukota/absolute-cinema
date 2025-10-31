import { Box, Button, Card, CardContent, Container, Divider, Paper, Tab, Tabs, Typography, TextField, IconButton } from '@mui/material';
import { Person, History, Edit, Save, Cancel } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockBookingHistory, mockUser } from '../../utils/mockdata';

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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: mockUser.fullName,
    email: mockUser.email,
    phone: mockUser.phone,
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes (in a real app, this would make an API call)
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: mockUser.fullName,
      email: mockUser.email,
      phone: mockUser.phone,
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box sx={{ 
      background: 'radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)',
      minHeight: '100vh', 
      py: 6 
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom color="white">
          My Profile
        </Typography>
        <Typography variant="body1" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 4 }}>
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
          <Paper sx={{ 
            p: 3, 
            height: 'fit-content',
            background: 'linear-gradient(135deg, #3a0a7c 0%, #543468 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: '#ffd700',
                  color: '#4a148c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  margin: '0 auto 16px',
                }}
              >
                {mockUser.fullName.split(' ').map(n => n[0]).join('')}
              </Box>
              <Typography variant="h6" fontWeight={600} sx={{ color: 'white' }}>
                {mockUser.fullName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                {mockUser.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Member Since
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ color: 'white' }}>
                {new Date(mockUser.memberSince).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Total Bookings
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ color: 'white' }}>
                {mockUser.totalBookings}
              </Typography>
            </Box>
          </Paper>

          {/* Main Content */}
          <Paper sx={{
            background: 'linear-gradient(135deg, #3a0a7c 0%, #6d5e53 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            overflow: 'hidden',
          }}>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              sx={{ 
                borderBottom: 1, 
                borderColor: 'rgba(255,255,255,0.3)', 
                px: 3,
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&.Mui-selected': {
                    color: 'white',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'white',
                },
              }}
            >
              <Tab icon={<Person />} label="Account" />
              <Tab icon={<History />} label="Booking History" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ px: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} color="white">
                    Account Information
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {isEditing ? (
                      <>
                        <IconButton 
                          onClick={handleEditToggle}
                          sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                        >
                          <Save />
                        </IconButton>
                        <IconButton 
                          onClick={handleCancel}
                          sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                        >
                          <Cancel />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton 
                        onClick={handleEditToggle}
                        sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                      >
                        <Edit />
                      </IconButton>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 3,
                    mb: 3,
                  }}
                >
                  <TextField
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                    sx={{
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' },
                      '& .MuiInput-underline:hover:before': { borderBottomColor: 'rgba(255,255,255,0.5)' },
                      '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    }}
                  />
                  <TextField
                    label="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                    sx={{
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' },
                      '& .MuiInput-underline:hover:before': { borderBottomColor: 'rgba(255,255,255,0.5)' },
                      '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    }}
                  />
                  <TextField
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                    sx={{
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' },
                      '& .MuiInput-underline:hover:before': { borderBottomColor: 'rgba(255,255,255,0.5)' },
                      '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                    }}
                  />
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Member Status
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ color: '#ffd700' }}>
                      Gold Member
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: 'white' }}>
                  Booking History
                </Typography>
                {mockBookingHistory.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }} gutterBottom>
                      No bookings yet
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/movies')}
                      sx={{ mt: 2, bgcolor: '#ffd700', color: '#4a148c', '&:hover': { bgcolor: '#e6c300' } }}
                    >
                      Browse Movies
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {mockBookingHistory.map((booking) => (
                      <Card key={booking.id} sx={{ 
                        bgcolor: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 2,
                      }}>
                        <CardContent>
                          <Box
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr' },
                              gap: 2,
                            }}
                          >
                            <Box>
                              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                Booking ID: {booking.id}
                              </Typography>
                              <Typography variant="h6" fontWeight={600} sx={{ color: 'white' }}>
                                {booking.movieTitle}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                {booking.cinema}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                Seats: {booking.seats.join(', ')}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                Date
                              </Typography>
                              <Typography variant="body1" fontWeight={600} sx={{ color: 'white' }}>
                                {new Date(booking.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                Total
                              </Typography>
                              <Typography variant="body1" fontWeight={600} sx={{ color: '#ffd700' }}>
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
                                  bgcolor: 'rgba(76, 175, 80, 0.2)',
                                  color: '#81c784',
                                  borderRadius: 1,
                                  mt: 1,
                                  border: '1px solid rgba(76, 175, 80, 0.3)',
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
