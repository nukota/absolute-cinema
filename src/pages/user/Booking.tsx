import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { EventSeat } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateLong, formatTime } from "../../utils/helper/helper";
import { useSeatsByRoom } from "../../services/seatsService";
import { useAllProducts } from "../../services/productsService";
import { useShowtime } from "../../services/showtimesSerivce";
import ProductItem from "../../components/items/ProductItem";

// Enhanced Paper component with animated gradient background and border
const EnhancedPaper = styled(Paper)(() => ({
  background:
    "linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(156, 39, 176, 0.2)",
  position: "relative",
  overflow: "hidden",
}));

const Booking = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const navigate = useNavigate();

  const {
    data: showtime,
    isLoading: showtimeLoading,
    error: showtimeError,
  } = useShowtime(showtimeId || "");
  console.log("Showtime:", showtime);
  const { data: seats, isLoading: seatsLoading } = useSeatsByRoom(
    showtime?.room.room_id || "",
    showtimeId || ""
  );
  const { data: products, isLoading: productsLoading } = useAllProducts();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, number>
  >({});

  // Loading and error states
  if (showtimeLoading || seatsLoading || productsLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">Loading...</Typography>
      </Container>
    );
  }

  if (showtimeError || !showtime) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">Showtime not found</Typography>
        <Button onClick={() => navigate("/movies")} sx={{ mt: 2 }}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  const toggleSeat = (seatId: string) => {
    const seat = seats?.find((s) => s.seat_id === seatId);
    if (!seat || !seat.available) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleProductQuantityChange = (productId: string, change: number) => {
    setSelectedProducts((prev) => {
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
    const productTotal = Object.entries(selectedProducts).reduce(
      (sum, [productId, quantity]) => {
        const product = products?.find((p) => p.product_id === productId);
        return sum + (product?.price || 0) * quantity;
      },
      0
    );
    return seatTotal + productTotal;
  };

  const handleProceedToPayment = () => {
    const selectedSeatLabels = selectedSeats.map((seatId) => {
      const seat = seats?.find((s) => s.seat_id === seatId);
      return seat?.seat_label || seatId;
    });

    // Get full product details for selected products
    const selectedProductDetails = Object.entries(selectedProducts)
      .map(([productId, quantity]) => {
        const product = products?.find((p) => p.product_id === productId);
        return product ? { ...product, quantity } : null;
      })
      .filter(Boolean);

    const bookingData = {
      showtime,
      seats: selectedSeats,
      seatLabels: selectedSeatLabels,
      products: selectedProducts,
      productDetails: selectedProductDetails,
      total: calculateTotal(),
    };
    navigate("/payment", { state: bookingData });
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
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom color="white">
          Select Seats
        </Typography>

        {/* Movie Info */}
        <EnhancedPaper sx={{ p: 3, mb: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Movie
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {showtime.movie.title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Cinema
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {showtime.cinema.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Date & Time
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {formatDateLong(showtime.start_time)}
              </Typography>
              <Typography variant="body2">
                {formatTime(showtime.start_time)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Room
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {showtime.room.name}
              </Typography>
            </Box>
          </Box>
        </EnhancedPaper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
            gap: 4,
          }}
        >
          {/* Seat Selection */}
          <Box>
            <EnhancedPaper sx={{ p: 4 }}>
              {/* Screen */}
              <Box
                sx={{
                  bgcolor: "grey.800",
                  color: "white",
                  py: 1,
                  textAlign: "center",
                  borderRadius: 1,
                  mb: 4,
                }}
              >
                <Typography variant="body2">SCREEN</Typography>
              </Box>

              {/* Seats */}
              <Box sx={{ mb: 3 }}>
                {seats &&
                  (() => {
                    // Group seats by row
                    const seatsByRow = seats.reduce((acc, seat) => {
                      if (!acc[seat.row]) acc[seat.row] = [];
                      acc[seat.row].push(seat);
                      return acc;
                    }, {} as Record<number, typeof seats>);

                    return Object.entries(seatsByRow)
                      .sort(([a], [b]) => parseInt(a) - parseInt(b))
                      .map(([row, rowSeats]) => {
                        const sortedRowSeats = rowSeats.sort(
                          (a, b) => a.column - b.column
                        );

                        return (
                          <Box
                            key={row}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                width: 24,
                                fontWeight: 600,
                                color: "text.secondary",
                              }}
                            >
                              {row}
                            </Typography>
                            <Box
                              sx={{
                                display: "grid",
                                gridTemplateColumns: `repeat(13, 36px)`,
                                gap: 1,
                              }}
                            >
                              {sortedRowSeats.map((seat) => {
                                const gridColumn = seat.column + 7;
                                const isSelected = selectedSeats.includes(
                                  seat.seat_id
                                );

                                return (
                                  <Box
                                    key={seat.seat_id}
                                    onClick={() => toggleSeat(seat.seat_id)}
                                    sx={{
                                      width: 36,
                                      height: 36,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      cursor: seat.available
                                        ? "pointer"
                                        : "not-allowed",
                                      borderRadius: 1,
                                      bgcolor: !seat.available
                                        ? "grey.300"
                                        : isSelected
                                        ? "primary.main"
                                        : "grey.700",
                                      color:
                                        !seat.available || isSelected
                                          ? "white"
                                          : "text.primary",
                                      transition: "all 0.2s",
                                      "&:hover": {
                                        bgcolor: !seat.available
                                          ? "grey.300"
                                          : isSelected
                                          ? "primary.dark"
                                          : "grey.500",
                                      },
                                      gridColumn: gridColumn,
                                    }}
                                  >
                                    <EventSeat fontSize="small" />
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                        );
                      });
                  })()}
              </Box>

              {/* Legend */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: "grey.400",
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="caption">Available</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: "primary.main",
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="caption">Selected</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: "grey.300",
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="caption">Occupied</Typography>
                </Box>
              </Box>
            </EnhancedPaper>

            {/* Products */}
            <EnhancedPaper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Add Snacks & Drinks
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 2,
                }}
              >
                {products?.slice(0, 6).map((product) => (
                  <ProductItem
                    key={product.product_id}
                    product={product}
                    quantity={selectedProducts[product.product_id] || 0}
                    onQuantityChange={handleProductQuantityChange}
                  />
                ))}
              </Box>
            </EnhancedPaper>
          </Box>

          {/* Booking Summary */}
          <Box>
            <EnhancedPaper sx={{ p: 3, position: "sticky", top: 80 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Booking Summary
              </Typography>

              <Box sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Selected Seats ({selectedSeats.length})
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((seatId) => {
                      const seat = seats?.find((s) => s.seat_id === seatId);
                      return (
                        <Chip
                          key={seatId}
                          label={seat?.seat_label || seatId}
                          size="small"
                          onDelete={() => toggleSeat(seatId)}
                        />
                      );
                    })
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No seats selected
                    </Typography>
                  )}
                </Box>
                {selectedSeats.length > 0 && (
                  <Typography variant="body1">
                    {selectedSeats.length} ×{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(showtime.price)}{" "}
                    ={" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(selectedSeats.length * showtime.price)}
                  </Typography>
                )}
              </Box>

              {Object.keys(selectedProducts).length > 0 && (
                <Box sx={{ my: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Products
                  </Typography>
                  {Object.entries(selectedProducts).map(
                    ([productId, quantity]) => {
                      const product = products?.find(
                        (p) => p.product_id === productId
                      );
                      if (!product) return null;
                      return (
                        <Typography key={productId} variant="body2">
                          {product.name} × {quantity} ={" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price * quantity)}
                        </Typography>
                      );
                    }
                  )}
                </Box>
              )}

              <Box
                sx={{
                  borderTop: 1,
                  borderColor: "divider",
                  pt: 2,
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
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
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
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
            </EnhancedPaper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Booking;
