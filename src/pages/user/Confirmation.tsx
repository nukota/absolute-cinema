import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { CheckCircle, Print } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import type { InvoiceDTO } from "../../utils/dtos/invoiceDTO";
import type { CinemaDTO } from "../../utils/dtos/cinemaDTO";
import type { RoomDTO } from "../../utils/dtos/roomDTO";
import { generateTicketHtml } from "../../utils/helper/helper";
import { useTheme } from "../../provider/ThemeProvider";

interface ConfirmationState {
  bookingData: InvoiceDTO;
  cinema?: CinemaDTO;
  room?: RoomDTO;
}

// Enhanced Paper component with animated gradient background and border
const EnhancedPaper = styled(Paper)(() => ({
  background:
    "linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(236, 72, 153, 0.1) 100%)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(156, 39, 176, 0.2)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: "linear-gradient(45deg, #9c27b0, #6366f1, #ec4899, #9c27b0)",
    backgroundSize: "300% 300%",
    animation: "borderGlow 4.5s ease infinite",
    borderRadius: "inherit",
    zIndex: -1,
    opacity: 0.4,
  },
  "@keyframes borderGlow": {
    "0%, 100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
}));

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTheme();

  // Get completed booking data from navigation state
  const { bookingData, cinema, room } = location.state as ConfirmationState;

  useEffect(() => {
    if (!bookingData) {
      navigate("/movies");
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const handlePrint = () => {
    const ticketHtml = generateTicketHtml(bookingData, cinema, room);
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(ticketHtml);
      newWindow.document.close();
      // Wait for content to load, then print
      newWindow.onload = () => {
        newWindow.print();
      };
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
      <Container maxWidth="md">
        <EnhancedPaper sx={{ p: 2, pb: 6, color: "white" }}>
          {/* Success Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              fontWeight={600}
              gutterBottom
              sx={{
                textShadow:
                  "0 2px 10px rgba(0,0,0,0.3), 0 0 20px rgba(156, 39, 176, 0.5)",
                mr: 4,
                mt: 2,
              }}
            >
              {t("confirmation.confirmed")}
            </Typography>
            <CheckCircle
              sx={{
                fontSize: 48,
                color: "success.main",
                filter: "drop-shadow(0 0 20px rgba(76, 175, 80, 0.5))",
                animation: "pulse 1s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                },
              }}
            />
          </Box>

          {/* Customer Details */}
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              background: "#ffffff0d",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              sx={{
                color: "secondary.light",
              }}
            >
              {t("confirmation.customerDetails")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {t("confirmation.name")}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                  {bookingData.customer.full_name}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {t("confirmation.email")}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                  {bookingData.customer.email}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Movie Details */}
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              background: "#ffffff0d",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              sx={{
                color: "secondary.light",
              }}
            >
              {t("confirmation.movieDetails")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {t("confirmation.movie")}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ fontSize: "1.1rem" }}
                >
                  {bookingData.tickets.title}
                </Typography>
              </Box>
              {cinema && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {t("confirmation.cinema")}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                    {cinema.name}
                  </Typography>
                </Box>
              )}
              {room && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    {t("confirmation.room")}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                    {room.name}
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {t("confirmation.dateTime")}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                  {new Date(bookingData.tickets.showtime).toLocaleDateString()}{" "}
                  {t("confirmation.at")}{" "}
                  {new Date(bookingData.tickets.showtime).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                >
                  {t("confirmation.seats")}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ fontSize: "1.1rem" }}
                >
                  {bookingData.tickets.seats.join(", ")}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Payment Summary */}
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              background: "#ffffff0d",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              sx={{
                color: "secondary.light",
              }}
            >
              {t("confirmation.paymentSummary")}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body1">
                {t("confirmation.tickets")} ({bookingData.tickets.seats.length})
              </Typography>
              <Typography variant="body1">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  bookingData.total_amount -
                    bookingData.products.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                )}
              </Typography>
            </Box>
            {bookingData.products.length > 0 && (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">
                  {t("confirmation.products")}
                </Typography>
                <Typography variant="body1">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    bookingData.products.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                  )}
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 2, borderColor: "rgba(156, 39, 176, 0.2)" }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" fontWeight={600}>
                {t("confirmation.totalPaid")}
              </Typography>
              <Typography variant="h6" fontWeight={600} color="secondary.light">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(bookingData.total_amount)}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem" }}
            >
              {t("confirmation.paidBy")}{" "}
              {bookingData.payment_method.charAt(0).toUpperCase() +
                bookingData.payment_method.slice(1)}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem" }}
            >
              {" "}
              at {new Date(bookingData.created_at).toLocaleString()}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Print />}
              onClick={handlePrint}
              sx={{
                borderColor: "rgba(156, 39, 176, 0.5)",
                color: "white",
                borderRadius: 2,
                "&:hover": {
                  borderColor: "#9c27b0",
                  background: "rgba(156, 39, 176, 0.1)",
                },
              }}
            >
              {t("confirmation.getTicket")}
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/movies")}
              sx={{
                background: "linear-gradient(135deg, #9c27b0 0%, #6366f1 100%)",
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: "0 4px 20px rgba(156, 39, 176, 0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #9c27b0 100%)",
                  boxShadow: "0 6px 24px rgba(156, 39, 176, 0.5)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {t("confirmation.bookMore")}
            </Button>
          </Box>
        </EnhancedPaper>
      </Container>
    </Box>
  );
};

export default Confirmation;
