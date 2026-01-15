import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import { EmailOutlined, ArrowBack, Refresh } from "@mui/icons-material";
import { Rabbit } from "lucide-react";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message =
    location.state?.message ||
    "Please check your email to verify your account.";
  const email = location.state?.email || "";

  const handleBackToSignIn = () => {
    navigate("/signin");
  };

  const handleTryAgain = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 450,
          width: "100%",
          border: 1,
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo and Title */}
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Rabbit size={48} color="#9c27b0" />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Montserrat Alternates", sans-serif',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Absolute Cinema
            </Typography>
          </Box>

          {/* Email Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "primary.lighter",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmailOutlined sx={{ fontSize: 60, color: "primary.main" }} />
            </Box>
          </Box>

          {/* Message */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ mb: 2, lineHeight: 1.6 }}
            >
              {message}
            </Typography>
            {email && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                We sent a verification code to <strong>{email}</strong>
              </Typography>
            )}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ArrowBack />}
              onClick={handleBackToSignIn}
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Go Back to Sign In
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<Refresh />}
              onClick={handleTryAgain}
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Try Again
            </Button>
          </Box>

          {/* Help Text */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Didn't receive the email? Check your spam folder or try signing up
              again.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Verify;
