import { useEffect } from 'react';
import { Box, Button, Container, Divider, Paper, Typography } from '@mui/material';
import { CheckCircle, Email, Print } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatDateLong, formatTime } from '../../utils/helper';

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
        <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #4a148c 0%, #543468 100%)', color: 'white' }}>
          {/* Success Icon */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircle
              sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
            />
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Booking Confirmed!
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Your tickets have been booked successfully
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Booking Details */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
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

          <Divider sx={{ my: 3 }} />

          {/* Customer Details */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
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

          <Divider sx={{ my: 3 }} />

          {/* Movie Details */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
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

          <Divider sx={{ my: 3 }} />

          {/* Seat Information */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Seat Numbers
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {bookingData.seats.map((seat: string) => (
                <Box
                  key={seat}
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: 1,
                    fontWeight: 600,
                  }}
                >
                  {seat}
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Payment Summary */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
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
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight={600}>
                Total Paid
              </Typography>
              <Typography variant="h6" fontWeight={600} color="primary.main">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(bookingData.total)}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
            >
              Print Ticket
            </Button>
            <Button
              variant="outlined"
              startIcon={<Email />}
            >
              Email Ticket
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/movies')}
            >
              Book More
            </Button>
          </Box>

          <Box
            sx={{
              mt: 4,
              p: 2,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 1,
            }}
          >
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <strong>Important:</strong> Please arrive at least 15 minutes before the showtime.
              Bring a valid ID and show this confirmation at the cinema entrance.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Confirmation;
