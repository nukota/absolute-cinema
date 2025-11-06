import { useEffect } from 'react';
import { Box, Button, Container, Divider, Paper, Typography, styled } from '@mui/material';
import { CheckCircle, Email, Print } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatDateLong, formatTime } from '../../utils/helper';

// Enhanced Paper component with animated gradient background and border
const EnhancedPaper = styled(Paper)(() => ({
  background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(156, 39, 176, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #9c27b0, #6366f1, #ec4899, #9c27b0)',
    backgroundSize: '300% 300%',
    animation: 'borderGlow 4.5s ease infinite',
    borderRadius: 'inherit',
    zIndex: -1,
    opacity: 0.5,
  },
  '@keyframes borderGlow': {
    '0%, 100%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
  }
}));

const Confirmation = () => {
  const navigate = useNavigate();

  // Get completed booking data
  const bookingDataStr = localStorage.getItem('completedBooking');
  const bookingData = bookingDataStr ? JSON.parse(bookingDataStr) : null;

  useEffect(() => {
    if (!bookingData) {
      navigate('/movies');
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box
      sx={{
        background:
          "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <EnhancedPaper sx={{ p: 4, color: 'white' }}>
          {/* Success Icon */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircle
              sx={{ 
                fontSize: 80, 
                color: 'success.main', 
                mb: 2,
                filter: 'drop-shadow(0 0 20px rgba(76, 175, 80, 0.5))',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                }
              }}
            />
            <Typography 
              variant="h3" 
              fontWeight={700} 
              gutterBottom
              sx={{
                textShadow: '0 2px 10px rgba(0,0,0,0.3), 0 0 20px rgba(156, 39, 176, 0.5)',
              }}
            >
              Booking Confirmed!
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Your tickets have been booked successfully
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(156, 39, 176, 0.3)' }} />

          {/* Booking Details */}
          <Box 
            sx={{ 
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: 'rgba(156, 39, 176, 0.05)',
              border: '1px solid rgba(156, 39, 176, 0.15)',
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight={600} 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #9c27b0 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Booking Information
            </Typography>
            
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Booking ID
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {bookingData.bookingId}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Booking Date
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {new Date(bookingData.bookingDate).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(156, 39, 176, 0.3)' }} />

          {/* Customer Details */}
          <Box 
            sx={{ 
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: 'rgba(156, 39, 176, 0.05)',
              border: '1px solid rgba(156, 39, 176, 0.15)',
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight={600} 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #9c27b0 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Customer Details
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Name
                </Typography>
                <Typography variant="body1">
                  {bookingData.customerInfo.fullName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Email
                </Typography>
                <Typography variant="body1">
                  {bookingData.customerInfo.email}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Phone
                </Typography>
                <Typography variant="body1">
                  {bookingData.customerInfo.phone}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(156, 39, 176, 0.3)' }} />

          {/* Movie Details */}
          <Box 
            sx={{ 
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: 'rgba(156, 39, 176, 0.05)',
              border: '1px solid rgba(156, 39, 176, 0.15)',
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight={600} 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #9c27b0 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Movie Details
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Movie
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {bookingData.showtime.movie.title}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Cinema
                </Typography>
                <Typography variant="body1">
                  {bookingData.showtime.cinema.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Room
                </Typography>
                <Typography variant="body1">
                  {bookingData.showtime.room.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Date & Time
                </Typography>
                <Typography variant="body1">
                  {formatDateLong(bookingData.showtime.start_time)}
                </Typography>
                <Typography variant="body2">
                  {formatTime(bookingData.showtime.start_time)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(156, 39, 176, 0.3)' }} />

          {/* Seat Information */}
          <Box 
            sx={{ 
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: 'rgba(156, 39, 176, 0.05)',
              border: '1px solid rgba(156, 39, 176, 0.15)',
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight={600} 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #9c27b0 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Seat Numbers
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {bookingData.seats.map((seat: string) => (
                <Box
                  key={seat}
                  sx={{
                    px: 2,
                    py: 1,
                    background: 'linear-gradient(135deg, #9c27b0 0%, #6366f1 100%)',
                    color: 'white',
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(156, 39, 176, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(156, 39, 176, 0.5)',
                    }
                  }}
                >
                  {seat}
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(156, 39, 176, 0.3)' }} />

          {/* Payment Summary */}
          <Box 
            sx={{ 
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: 'rgba(156, 39, 176, 0.05)',
              border: '1px solid rgba(156, 39, 176, 0.15)',
            }}
          >
            <Typography 
              variant="h6" 
              fontWeight={600} 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #9c27b0 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Payment Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">
                Tickets ({bookingData.seats.length})
              </Typography>
              <Typography variant="body1">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(bookingData.seats.length * bookingData.showtime.price)}
              </Typography>
            </Box>
            {Object.keys(bookingData.products || {}).length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Products</Typography>
                <Typography variant="body1">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(bookingData.total - (bookingData.seats.length * bookingData.showtime.price))}
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 2, borderColor: 'rgba(156, 39, 176, 0.2)' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight={600}>
                Total Paid
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight={600}
                sx={{
                  background: 'linear-gradient(135deg, #9c27b0 0%, #6366f1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(bookingData.total)}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Payment Method: {bookingData.paymentMethod.charAt(0).toUpperCase() + bookingData.paymentMethod.slice(1)}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Print />}
              onClick={handlePrint}
              sx={{
                borderColor: 'rgba(156, 39, 176, 0.5)',
                color: 'white',
                borderRadius: 2,
                '&:hover': {
                  borderColor: '#9c27b0',
                  background: 'rgba(156, 39, 176, 0.1)',
                }
              }}
            >
              Print Ticket
            </Button>
            <Button
              variant="outlined"
              startIcon={<Email />}
              sx={{
                borderColor: 'rgba(156, 39, 176, 0.5)',
                color: 'white',
                borderRadius: 2,
                '&:hover': {
                  borderColor: '#9c27b0',
                  background: 'rgba(156, 39, 176, 0.1)',
                }
              }}
            >
              Email Ticket
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/movies')}
              sx={{
                background: 'linear-gradient(135deg, #9c27b0 0%, #6366f1 100%)',
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(156, 39, 176, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6366f1 0%, #9c27b0 100%)',
                  boxShadow: '0 6px 24px rgba(156, 39, 176, 0.5)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Book More
            </Button>
          </Box>

          <Box
            sx={{
              mt: 4,
              p: 2,
              background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 193, 7, 0.1) 100%)',
              borderRadius: 2,
              border: '1px solid rgba(255, 152, 0, 0.3)',
              boxShadow: '0 2px 8px rgba(255, 152, 0, 0.2)',
            }}
          >
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.95)' }}>
              <strong>⚠️ Important:</strong> Please arrive at least 15 minutes before the showtime.
              Bring a valid ID and show this confirmation at the cinema entrance.
            </Typography>
          </Box>
        </EnhancedPaper>
      </Container>
    </Box>
  );
};

export default Confirmation;
