import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { CreditCard, AccountBalance, Smartphone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PaymentMethod } from '../../utils/enum';
import { formatDateLong, formatTime } from '../../utils/helper';

// Enhanced Paper component with animated gradient background and border
const EnhancedPaper = styled(Paper)(() => ({
  background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(156, 39, 176, 0.2)',
  position: 'relative',
  overflow: 'hidden',
}));

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>(
    PaymentMethod.Card,
  );

  // Mock user data for now (user must be signed in to access this page)
  const [customerInfo] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+84 123 456 789',
  });

  // Get booking data from localStorage
  const bookingDataStr = localStorage.getItem('bookingData');
  const bookingData = bookingDataStr ? JSON.parse(bookingDataStr) : null;

  if (!bookingData) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">No booking data found</Typography>
        <Button onClick={() => navigate('/movies')} sx={{ mt: 2 }}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store customer info and payment method
    const completeBooking = {
      ...bookingData,
      customerInfo,
      paymentMethod,
      bookingId: `BK${Date.now()}`,
      bookingDate: new Date().toISOString(),
    };

    localStorage.setItem('completedBooking', JSON.stringify(completeBooking));
    localStorage.removeItem('bookingData');

    navigate('/confirmation');
  };

  return (
    <Box
      sx={{
        background:
          'radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)',
        minHeight: '100vh',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom color="white">
          Payment
        </Typography>
        <Typography
          variant="body1"
          color="rgba(255, 255, 255, 0.7)"
          sx={{ mb: 4 }}
        >
          Complete your booking by providing payment details
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
              gap: 4,
            }}
          >
            {/* Payment Form */}
            <Box>
              {/* Customer Information */}
              <EnhancedPaper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Customer Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Full Name"
                    required
                    fullWidth
                    value={customerInfo.fullName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        cursor: 'default',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      },
                    }}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    value={customerInfo.email}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        cursor: 'default',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      },
                    }}
                  />
                  <TextField
                    label="Phone Number"
                    required
                    fullWidth
                    value={customerInfo.phone}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        cursor: 'default',
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      },
                    }}
                  />
                </Box>
              </EnhancedPaper>

              {/* Payment Method */}
              <EnhancedPaper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Payment Method
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <Card
                      sx={{
                      mb: 2,
                      border: 2,
                      borderColor:
                        paymentMethod === PaymentMethod.Card
                        ? 'primary.main'
                        : 'divider',
                      cursor: 'pointer',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                      onClick={() => setPaymentMethod(PaymentMethod.Card)}
                    >
                      <CardContent
                      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                      <FormControlLabel
                        value={PaymentMethod.Card}
                        control={<Radio />}
                        label=""
                        sx={{ m: 0 }}
                      />
                      <CreditCard color="primary" />
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                        Credit/Debit Card
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                        Visa, Mastercard, JCB
                        </Typography>
                      </Box>
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                      mb: 2,
                      border: 2,
                      borderColor:
                        paymentMethod === PaymentMethod.Banking
                        ? 'primary.main'
                        : 'divider',
                      cursor: 'pointer',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                      onClick={() => setPaymentMethod(PaymentMethod.Banking)}
                    >
                      <CardContent
                      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                      <FormControlLabel
                        value={PaymentMethod.Banking}
                        control={<Radio />}
                        label=""
                        sx={{ m: 0 }}
                      />
                      <AccountBalance color="primary" />
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                        Internet Banking
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                        All major banks
                        </Typography>
                      </Box>
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                      border: 2,
                      borderColor:
                        paymentMethod === PaymentMethod.Momo
                        ? 'primary.main'
                        : 'divider',
                      cursor: 'pointer',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                      onClick={() => setPaymentMethod(PaymentMethod.Momo)}
                    >
                      <CardContent
                      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                      <FormControlLabel
                        value={PaymentMethod.Momo}
                        control={<Radio />}
                        label=""
                        sx={{ m: 0 }}
                      />
                      <Smartphone color="primary" />
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                        MoMo E-Wallet
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                        Fast and secure
                        </Typography>
                      </Box>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </FormControl>

                {/* Card Details (shown when card is selected) */}
                {paymentMethod === PaymentMethod.Card && (
                  <Box
                    sx={{
                      mt: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Card Number"
                      required
                      fullWidth
                      placeholder="1234 5678 9012 3456"
                    />
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 2,
                      }}
                    >
                      <TextField
                        label="Expiry Date"
                        required
                        placeholder="MM/YY"
                      />
                      <TextField label="CVV" required placeholder="123" />
                    </Box>
                    <TextField label="Cardholder Name" required fullWidth />
                  </Box>
                )}
              </EnhancedPaper>
            </Box>

            {/* Order Summary */}
            <Box>
              <EnhancedPaper sx={{ p: 3, position: 'sticky', top: 24 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Order Summary
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Movie
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {bookingData.showtime.movie.title}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Cinema
                  </Typography>
                  <Typography variant="body1">
                    {bookingData.showtime.cinema.name}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Date & Time
                  </Typography>
                  <Typography variant="body1">
                    {formatDateLong(bookingData.showtime.start_time)}
                  </Typography>
                  <Typography variant="body2">
                    {formatTime(bookingData.showtime.start_time)}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Seats
                  </Typography>
                  <Typography variant="body1">
                    {bookingData.seats.join(', ')}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Tickets ({bookingData.seats.length})
                    </Typography>
                    <Typography variant="body2">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(
                        bookingData.seats.length * bookingData.showtime.price,
                      )}
                    </Typography>
                  </Box>

                  {Object.keys(bookingData.products || {}).length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Products
                      </Typography>
                      <Typography variant="body2">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(
                          bookingData.total -
                            bookingData.seats.length *
                              bookingData.showtime.price,
                        )}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="primary.main"
                  >
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(bookingData.total)}
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                >
                  Complete Payment
                </Button>
                <Button
                  variant="text"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              </EnhancedPaper>
            </Box>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default Payment;
