import { useState } from "react";
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
} from "@mui/material";
import { CreditCard, AccountBalance } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { PaymentMethod } from "../../utils/enum";
import type { InvoiceDTO } from "../../utils/dtos/invoiceDTO";
import { formatDateLong, formatTime } from "../../utils/helper/helper";
import { useCurrentUser } from "../../services/authService";
import { useCreateBooking } from "../../services/invoicesService";
import { useCreatePayment } from "../../services/vnpayService";
import VNPayImg from "../../assets/images/vnpay.png";
import MomoImg from "../../assets/images/momo.png";
import { useTheme } from "../../provider/ThemeProvider";

// Enhanced Paper component with animated gradient background and border
const EnhancedPaper = styled(Paper)(() => ({
  background:
    "linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(156, 39, 176, 0.2)",
  position: "relative",
  overflow: "hidden",
}));

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState<string>(
    PaymentMethod.Card,
  );

  const { data: currentUser } = useCurrentUser();
  const createBookingMutation = useCreateBooking();
  const createPaymentMutation = useCreatePayment();

  // Get booking data from navigation state
  const bookingData = location.state as any;

  if (!bookingData || !currentUser) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4">{t("payment.noBookingData")}</Typography>
        <Button onClick={() => navigate("/movies")} sx={{ mt: 2 }}>
          {t("movieDetail.backToMovies")}
        </Button>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare booking data for API
    const bookingPayload = {
      customer_id: currentUser.id,
      amount: bookingData.total,
      products: Object.entries(bookingData.products).map(
        ([productId, quantity]) => ({
          product_id: productId,
          quantity: quantity as number,
        }),
      ),
      tickets: {
        showtime_id: bookingData.showtime.showtime_id,
        seats: bookingData.seats, // array of seat IDs
      },
      payment_method: paymentMethod as any,
      total_amount: bookingData.total,
      status: "completed",
    };

    try {
      if (paymentMethod === PaymentMethod.VNPay) {
        // For VNPay, create booking first with banking method, then create payment URL
        const vnpayBookingPayload = {
          ...bookingPayload,
          payment_method: PaymentMethod.Banking,
        };
        const bookingResponse =
          await createBookingMutation.mutateAsync(vnpayBookingPayload);

        // Create VNPay payment
        const paymentResponse = await createPaymentMutation.mutateAsync({
          amount: bookingData.total,
          orderId: bookingResponse.invoice_id,
          orderInfo: `Payment for invoice ${bookingResponse.invoice_id}`,
        });

        // Navigate to VNPay payment page
        navigate("/vnpay-payment", {
          state: {
            paymentUrl: paymentResponse.paymentUrl,
          },
        });
      } else {
        // For other payment methods, create booking and go to confirmation
        const finalBookingPayload = {
          ...bookingPayload,
          status: "completed",
        };
        const bookingResponse =
          await createBookingMutation.mutateAsync(finalBookingPayload);

        // Navigate to confirmation with server response data and cinema info
        navigate("/confirmation", {
          state: {
            bookingData: bookingResponse,
            cinema: bookingData.showtime.cinema,
            room: bookingData.showtime.room,
          },
        });
      }
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle error - maybe show a toast or error message
    }
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
          {t("payment.title")}
        </Typography>
        <Typography
          variant="body1"
          color="rgba(255, 255, 255, 0.7)"
          sx={{ mb: 4 }}
        >
          {t("payment.subtitle")}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
              gap: 4,
            }}
          >
            {/* Payment Form */}
            <Box>
              {/* Customer Information */}
              <EnhancedPaper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {t("payment.customerInfo")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", gap: 4 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {t("payment.name")}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {currentUser.full_name}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {t("payment.email")}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {currentUser.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </EnhancedPaper>

              {/* Payment Method */}
              <EnhancedPaper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {t("payment.paymentMethod")}
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
                            ? "primary.main"
                            : "divider",
                        cursor: "pointer",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      }}
                      onClick={() => setPaymentMethod(PaymentMethod.Card)}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <FormControlLabel
                          value={PaymentMethod.Card}
                          control={<Radio />}
                          label=""
                          sx={{ m: 0 }}
                        />
                        <CreditCard color="secondary" />
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {t("payment.creditCard")}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t("payment.creditCardDesc")}
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
                            ? "primary.main"
                            : "divider",
                        cursor: "pointer",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      }}
                      onClick={() => setPaymentMethod(PaymentMethod.Banking)}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <FormControlLabel
                          value={PaymentMethod.Banking}
                          control={<Radio />}
                          label=""
                          sx={{ m: 0 }}
                        />
                        <AccountBalance color="secondary" />
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {t("payment.banking")}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t("payment.bankingDesc")}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                        mb: 2,
                        border: 2,
                        borderColor:
                          paymentMethod === PaymentMethod.Momo
                            ? "primary.main"
                            : "divider",
                        cursor: "pointer",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      }}
                      onClick={() => setPaymentMethod(PaymentMethod.Momo)}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <FormControlLabel
                          value={PaymentMethod.Momo}
                          control={<Radio />}
                          label=""
                          sx={{ m: 0 }}
                        />
                        <img
                          src={MomoImg}
                          alt="Momo"
                          style={{ height: 24, width: 24 }}
                        />
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            Momo
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Pay with Momo wallet
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                        border: 2,
                        borderColor:
                          paymentMethod === PaymentMethod.VNPay
                            ? "primary.main"
                            : "divider",
                        cursor: "pointer",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      }}
                      onClick={() => setPaymentMethod(PaymentMethod.VNPay)}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <FormControlLabel
                          value={PaymentMethod.VNPay}
                          control={<Radio />}
                          label=""
                          sx={{ m: 0 }}
                        />
                        <img
                          src={VNPayImg}
                          alt="VNPay"
                          style={{ height: 24, width: 24 }}
                        />
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {t("payment.vnpay")}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t("payment.vnpayDesc")}
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
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <TextField
                      label={t("payment.cardNumber")}
                      required
                      fullWidth
                      placeholder="1234 5678 9012 3456"
                    />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                      }}
                    >
                      <TextField
                        label={t("payment.expiryDate")}
                        required
                        placeholder="MM/YY"
                      />
                      <TextField
                        label={t("payment.cvv")}
                        required
                        placeholder="123"
                      />
                    </Box>
                    <TextField
                      label={t("payment.cardholderName")}
                      required
                      fullWidth
                    />
                  </Box>
                )}
              </EnhancedPaper>
            </Box>

            {/* Order Summary */}
            <Box>
              <EnhancedPaper sx={{ p: 3, position: "sticky", top: 24 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {t("payment.orderSummary")}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {t("payment.movie")}
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
                    {t("payment.cinema")}
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
                    {t("payment.dateTime")}
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
                    {t("payment.seats")}
                  </Typography>
                  <Typography variant="body1">
                    {bookingData.seatLabels.join(", ")}
                  </Typography>
                </Box>

                {bookingData.productDetails &&
                  bookingData.productDetails.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {t("payment.products")}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {bookingData.productDetails.map(
                          (product: InvoiceDTO["products"][0]) => (
                            <Box
                              key={product.product_id}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  flex: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  mr: 2,
                                }}
                              >
                                {product.name} × {product.quantity}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ flexShrink: 0 }}
                              >
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(product.price * product.quantity)}
                              </Typography>
                            </Box>
                          ),
                        )}
                      </Box>
                    </Box>
                  )}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {t("payment.tickets")} ({bookingData.seats.length})
                    </Typography>
                    <Typography variant="body2">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        bookingData.seats.length * bookingData.showtime.price,
                      )}
                    </Typography>
                  </Box>

                  {Object.keys(bookingData.products || {}).length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {t("payment.products")}
                      </Typography>
                      <Typography variant="body2">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
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
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {t("payment.total")}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="primary.main"
                  >
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(bookingData.total)}
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={
                    createBookingMutation.isPending ||
                    createPaymentMutation.isPending
                  }
                >
                  {createBookingMutation.isPending ||
                  createPaymentMutation.isPending
                    ? t("payment.processing")
                    : t("payment.completePayment")}
                </Button>
                <Button
                  variant="text"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => navigate(-1)}
                >
                  {t("payment.back")}
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
