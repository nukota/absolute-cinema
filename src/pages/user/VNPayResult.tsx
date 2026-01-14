import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useCurrentUser } from "../../services/authService";
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

const VNPayResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userProfile } = useCurrentUser();
  const { t } = useTheme();
  const [loading, setLoading] = useState(true);
  const [paymentResult, setPaymentResult] = useState<{
    success: boolean;
    message: string;
    order_id?: string;
    amount?: number;
    transactionNo?: string;
    bankCode?: string;
  } | null>(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      setLoading(true);
      try {
        // Parse URL parameters from VNPay redirect
        const searchParams = new URLSearchParams(location.search);

        const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
        const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
        const vnp_Amount = searchParams.get("vnp_Amount");
        const vnp_TxnRef = searchParams.get("vnp_TxnRef");
        const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
        const vnp_BankCode = searchParams.get("vnp_BankCode");

        // Check if payment was successful
        const isSuccess =
          vnp_ResponseCode === "00" && vnp_TransactionStatus === "00";

        if (isSuccess && vnp_TxnRef) {
          setPaymentResult({
            success: true,
            message: t("vnpayResult.success"),
            order_id: vnp_TxnRef,
            amount: vnp_Amount ? parseInt(vnp_Amount) / 100 : undefined,
            transactionNo: vnp_TransactionNo || undefined,
            bankCode: vnp_BankCode || undefined,
          });
        } else {
          setPaymentResult({
            success: false,
            message:
              vnp_ResponseCode === "24"
                ? "Payment cancelled by user"
                : "Payment failed. Please try again.",
          });
        }
      } catch (error) {
        setPaymentResult({
          success: false,
          message: "Failed to process payment",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [location.search]);

  const getBackButtonConfig = () => {
    const role = userProfile?.role;

    switch (role) {
      case "admin":
        return { label: t("vnpayResult.goBackAdmin"), path: "/admin" };
      case "customer":
        return { label: t("vnpayResult.goBackHome"), path: "/" };
      default:
        return { label: t("vnpayResult.goBackHome"), path: "/" };
    }
  };

  const handleGoBack = () => {
    const { path } = getBackButtonConfig();
    navigate(path);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        background:
          "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)",
        padding: 3,
      }}
    >
      <EnhancedPaper
        sx={{
          maxWidth: 600,
          width: "100%",
          boxShadow: 6,
          borderRadius: 3,
        }}
      >
        <Box sx={{ padding: 4 }}>
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
              style={{ height: 50, objectFit: "contain" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            {paymentResult?.success ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{
                    fontSize: 54,
                    color: "#1976d2",
                    mr: 1,
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "#1976d2",
                  }}
                >
                  {t("vnpayResult.success")}
                </Typography>
              </Box>
            ) : (
              <>
                <ErrorOutlineIcon
                  sx={{
                    fontSize: 80,
                    color: "#f44336",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#f44336",
                    mb: 1,
                  }}
                >
                  {t("vnpayResult.failed")}
                </Typography>
              </>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              {t("vnpayResult.orderDetails")}
            </Typography>

            {paymentResult?.bankCode && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {t("vnpayResult.bank")}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {paymentResult.bankCode}
                </Typography>
              </Box>
            )}

            {paymentResult?.transactionNo && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {t("vnpayResult.transactionCode")}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {paymentResult.transactionNo}
                </Typography>
              </Box>
            )}

            {paymentResult?.amount && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {t("vnpayResult.amount")}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(paymentResult.amount)}
                </Typography>
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleGoBack}
              sx={{
                minWidth: 200,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }}
            >
              {getBackButtonConfig().label}
            </Button>
          </Box>
        </Box>
      </EnhancedPaper>
    </Box>
  );
};

export default VNPayResult;
