import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import VNPayImg from "../../assets/images/vnpay.png";
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

const VNPayPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentUrl = location.state?.paymentUrl;
  const { t } = useTheme();

  useEffect(() => {
    if (paymentUrl) {
      // Open VNPay payment page in a new tab
      window.open(paymentUrl, "_blank");
    } else {
      // If no payment URL, redirect back
      navigate("/movies");
    }
  }, [paymentUrl, navigate]);

  if (!paymentUrl) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background:
          "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)",
        minHeight: "90vh",
        py: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <EnhancedPaper
          sx={{
            maxWidth: 500,
            width: "100%",
            boxShadow: 6,
            borderRadius: 3,
          }}
        >
          <Box sx={{ padding: 4, textAlign: "center" }}>
            {/* VNPay Logo */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <img
                src={VNPayImg}
                alt="VNPay"
                style={{ height: 60, objectFit: "contain" }}
              />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              {t("vnpayPayment.title")}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              {t("vnpayPayment.message")}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/")}
                sx={{
                  minWidth: 200,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                  },
                }}
              >
                {t("vnpayPayment.goBack")}
              </Button>
            </Box>
          </Box>
        </EnhancedPaper>
      </Container>
    </Box>
  );
};

export default VNPayPayment;
