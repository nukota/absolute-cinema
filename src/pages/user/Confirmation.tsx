import { useEffect } from 'react';
import { Box, Button, Container, Divider, Paper, Typography } from '@mui/material';
import { CheckCircle, Email, Print } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          {/* Success Icon */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircle
              sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
            />
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Booking Confirmed!
            </Typography>
            <Typography variant="body1" color="text.secondary">
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
                <Typography variant="caption" color="text.secondary">
                  Booking ID
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {bookingData.bookingId}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
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
                <Typography variant="caption" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">
                  {bookingData.customerInfo.fullName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {bookingData.customerInfo.email}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
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
                <Typography variant="caption" color="text.secondary">
                  Movie
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {bookingData.showtime.movie.title}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Cinema
                </Typography>
                <Typography variant="body1">
                  {bookingData.showtime.cinema.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Room
                </Typography>
                <Typography variant="body1">
                  {bookingData.showtime.room.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Date & Time
                </Typography>
                <Typography variant="body1">
                  {formatDate(bookingData.showtime.start_time)}
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
            <Typography variant="caption" color="text.secondary">
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

          {/* Important Notice */}
          <Box
            sx={{
              mt: 4,
              p: 2,
              bgcolor: 'info.lighter',
              borderRadius: 1,
            }}
          >
            <Typography variant="caption" color="text.secondary">
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
