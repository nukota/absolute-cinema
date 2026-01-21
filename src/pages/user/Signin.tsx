import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";
import { Rabbit } from "lucide-react";
import { useSignIn, storeAuthData } from "../../services/authService";
import { useFeedback } from "../../provider/FeedbackProvider";
import { useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const Signin = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useFeedback();
  const signInMutation = useSignIn();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signInMutation.mutateAsync({
        email,
        password,
      });

      // Store tokens
      storeAuthData(response, queryClient);

      showSnackbar({
        message: "Sign in successful!",
        severity: "success",
      });

      // Navigate to admin dashboard
      navigate("/admin");
    } catch (error: any) {
      showSnackbar({
        message:
          error?.response?.data?.message ||
          "Failed to sign in. Please check your credentials.",
        severity: "error",
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
      <Helmet>
        <title>Sign In - Absolute Cinema</title>
        <meta name="description" content="Sign in to your Absolute Cinema account to book movie tickets, manage bookings, and access exclusive features." />
        <meta property="og:title" content="Sign In - Absolute Cinema" />
        <meta property="og:description" content="Sign in to your Absolute Cinema account to book movie tickets, manage bookings, and access exclusive features." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cinema.nct.pro.vn/signin" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
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
          <Box sx={{ textAlign: "center", mb: 6 }}>
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
            <Typography variant="body1" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={signInMutation.isPending}
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {signInMutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              Don't have an account?{" "}
              <Typography
                component="span"
                onClick={() => navigate("/signup")}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signin;
