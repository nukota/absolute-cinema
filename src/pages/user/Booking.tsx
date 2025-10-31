import { useState } from 'react';
import { Box, Button, Chip, Container, Paper, Typography } from '@mui/material';
import { EventSeat } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { mockShowtimes, mockProducts } from '../../utils/mockdata';
import { formatDateLong, formatTime } from '../../utils/helper';

const Booking = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const navigate = useNavigate();
  
  const showtime = mockShowtimes.find(s => s.showtime_id === showtimeId);
  
  // Generate seat layout (8 rows x 12 seats)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});
  
  // Randomly mark some seats as occupied for demo
  const occupiedSeats = ['A5', 'A6', 'B5', 'B6', 'D7', 'D8', 'E7', 'E8'];

  if (!showtime) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">Showtime not found</Typography>
        <Button onClick={() => navigate('/movies')} sx={{ mt: 2 }}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  const toggleSeat = (seat: string) => {
    if (occupiedSeats.includes(seat)) return;
    
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const handleProductQuantityChange = (productId: string, change: number) => {
    setSelectedProducts(prev => {
      const current = prev[productId] || 0;
      const newValue = Math.max(0, current + change);
      if (newValue === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newValue };
    });
  };

  const calculateTotal = () => {
    const seatTotal = selectedSeats.length * showtime.price;
    const productTotal = Object.entries(selectedProducts).reduce((sum, [productId, quantity]) => {
      const product = mockProducts.find(p => p.product_id === productId);
      return sum + (product?.price || 0) * quantity;
    }, 0);
    return seatTotal + productTotal;
  };

  const handleProceedToPayment = () => {
    const bookingData = {
      showtime,
      seats: selectedSeats,
      products: selectedProducts,
      total: calculateTotal(),
    };
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    navigate('/payment');
  };

  return (
    <Box sx={{ 
      background: 'radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)',
      minHeight: '100vh', 
      py: 6 
    }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom color="white">
          Select Seats
        </Typography>
        
        {/* Movie Info */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">Movie</Typography>
              <Typography variant="body1" fontWeight={600}>{showtime.movie.title}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Cinema</Typography>
              <Typography variant="body1" fontWeight={600}>{showtime.cinema.name}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Date & Time</Typography>
              <Typography variant="body1" fontWeight={600}>
                {formatDateLong(showtime.start_time)}
              </Typography>
              <Typography variant="body2">{formatTime(showtime.start_time)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Room</Typography>
              <Typography variant="body1" fontWeight={600}>{showtime.room.name}</Typography>
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
            gap: 4,
          }}
        >
          {/* Seat Selection */}
          <Box>
            <Paper sx={{ p: 4 }}>
              {/* Screen */}
              <Box
                sx={{
                  bgcolor: 'grey.800',
                  color: 'white',
                  py: 1,
                  textAlign: 'center',
                  borderRadius: 1,
                  mb: 4,
                }}
              >
                <Typography variant="body2">SCREEN</Typography>
              </Box>

              {/* Seats */}
              <Box sx={{ mb: 3 }}>
                {rows.map(row => (
                  <Box
                    key={row}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        width: 24,
                        fontWeight: 600,
                        color: 'text.secondary',
                      }}
                    >
                      {row}
                    </Typography>
                    {Array.from({ length: seatsPerRow }, (_, i) => {
                      const seatNumber = `${row}${i + 1}`;
                      const isOccupied = occupiedSeats.includes(seatNumber);
                      const isSelected = selectedSeats.includes(seatNumber);

                      return (
                        <Box
                          key={seatNumber}
                          onClick={() => toggleSeat(seatNumber)}
                          sx={{
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isOccupied ? 'not-allowed' : 'pointer',
                            borderRadius: 1,
                            bgcolor: isOccupied
                              ? 'grey.400'
                              : isSelected
                              ? 'primary.main'
                              : 'grey.200',
                            color: isOccupied || isSelected ? 'white' : 'text.primary',
                            transition: 'all 0.2s',
                            '&:hover': {
                              bgcolor: isOccupied
                                ? 'grey.400'
                                : isSelected
                                ? 'primary.dark'
                                : 'grey.300',
                            },
                          }}
                        >
                          <EventSeat fontSize="small" />
                        </Box>
                      );
                    })}
                  </Box>
                ))}
              </Box>

              {/* Legend */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 4,
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 24, height: 24, bgcolor: 'grey.200', borderRadius: 1 }} />
                  <Typography variant="caption">Available</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: 1 }} />
                  <Typography variant="caption">Selected</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 24, height: 24, bgcolor: 'grey.400', borderRadius: 1 }} />
                  <Typography variant="caption">Occupied</Typography>
                </Box>
              </Box>
            </Paper>

            {/* Products */}
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Add Snacks & Drinks
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mockProducts.slice(0, 6).map(product => (
                  <Box
                    key={product.product_id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="primary.main" fontWeight={600}>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(product.price)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleProductQuantityChange(product.product_id, -1)}
                        disabled={!selectedProducts[product.product_id]}
                      >
                        -
                      </Button>
                      <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                        {selectedProducts[product.product_id] || 0}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleProductQuantityChange(product.product_id, 1)}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Booking Summary */}
          <Box>
            <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Booking Summary
              </Typography>
              
              <Box sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Selected Seats ({selectedSeats.length})
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map(seat => (
                      <Chip key={seat} label={seat} size="small" onDelete={() => toggleSeat(seat)} />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No seats selected
                    </Typography>
                  )}
                </Box>
                {selectedSeats.length > 0 && (
                  <Typography variant="body1">
                    {selectedSeats.length} × {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(showtime.price)} = {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(selectedSeats.length * showtime.price)}
                  </Typography>
                )}
              </Box>

              {Object.keys(selectedProducts).length > 0 && (
                <Box sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Products
                  </Typography>
                  {Object.entries(selectedProducts).map(([productId, quantity]) => {
                    const product = mockProducts.find(p => p.product_id === productId);
                    if (!product) return null;
                    return (
                      <Typography key={productId} variant="body2">
                        {product.name} × {quantity} = {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(product.price * quantity)}
                      </Typography>
                    );
                  })}
                </Box>
              )}

              <Box
                sx={{
                  borderTop: 1,
                  borderColor: 'divider',
                  pt: 2,
                  mt: 2,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="primary.main">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(calculateTotal())}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={selectedSeats.length === 0}
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Booking;
