import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import {
  MovieFilterOutlined,
  CheckCircleOutline,
  ErrorOutline,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { useFeedback } from "../../provider/FeedbackProvider";
import { useVerifyEmail } from "../../services/authService";

const VerifyCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useFeedback();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your email...");
  const hasVerified = useRef(false);

  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    // Prevent multiple verification attempts
    if (hasVerified.current) return;
    hasVerified.current = true;

    const handleVerification = async () => {
      try {
        // Get hash from location (React Router provides this)
        const hash = location.hash || window.location.hash;

        console.log("Full URL:", window.location.href);
        console.log("Hash:", hash);

        if (!hash) {
          throw new Error("No hash fragment found in URL");
        }

        // Parse hash fragment from URL (Supabase sends tokens after #)
        const hashParams = new URLSearchParams(hash.substring(1));

        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        console.log("Access Token:", accessToken ? "Found" : "Not found");
        console.log("Refresh Token:", refreshToken ? "Found" : "Not found");

        if (!accessToken || !refreshToken) {
          throw new Error("No authentication tokens found in URL");
        }

        // Send tokens to backend for verification and session establishment
        const result = await verifyEmailMutation.mutateAsync({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        // Store tokens in localStorage for subsequent API calls
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }

        // Refresh user data from backend
        await queryClient.invalidateQueries({ queryKey: ["auth", "current"] });

        setStatus("success");
        setMessage("Email verified successfully! Redirecting...");

        showSnackbar({
          message: "Email verified successfully! Redirecting...",
          severity: "success",
        });

        // Clear the hash from URL
        window.history.replaceState(null, "", window.location.pathname);

        // Redirect based on user role (need to get user data)
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error: any) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to verify email. The link may be expired or invalid."
        );

        showSnackbar({
          message: "Email verification failed",
          severity: "error",
        });

        setTimeout(() => navigate("/signin"), 3000);
      }
    };

    handleVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <MovieFilterOutlined
                sx={{ fontSize: 48, color: "primary.main" }}
              />
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

          {/* Status Display */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            {status === "loading" && (
              <>
                <CircularProgress size={60} />
                <Typography variant="h6" color="text.primary">
                  {message}
                </Typography>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircleOutline
                  sx={{ fontSize: 80, color: "success.main" }}
                />
                <Typography variant="h6" color="success.main">
                  {message}
                </Typography>
              </>
            )}

            {status === "error" && (
              <>
                <ErrorOutline sx={{ fontSize: 80, color: "error.main" }} />
                <Typography variant="h6" color="error.main" textAlign="center">
                  {message}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("verifyCallback.redirecting")}
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyCallback;
