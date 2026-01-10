import { useState, useEffect } from "react";
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
  MovieFilterOutlined,
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
  PhoneOutlined,
  BadgeOutlined,
  CakeOutlined,
} from "@mui/icons-material";
import { useSignUp, storeAuthData } from "../../services/authService";
import { useFeedback } from "../../provider/FeedbackProvider";
import { useQueryClient } from "@tanstack/react-query";
import { UserRole } from "../../utils/enum";

const Signup = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useFeedback();
  const signUpMutation = useSignUp();
  const queryClient = useQueryClient();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cccd, setCccd] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Listen for Ctrl+Shift+A to toggle admin mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsAdminMode((prev) => !prev);
        showSnackbar({
          message: `Switched to ${!isAdminMode ? 'Admin' : 'Customer'} sign up mode`,
          severity: 'info',
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminMode, showSnackbar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      showSnackbar({
        message: "Passwords do not match",
        severity: "error",
      });
      return;
    }

    try {
      const signUpData: any = {
        email,
        password,
        full_name: fullName,
        role: isAdminMode ? UserRole.Admin : UserRole.Customer,
      };

      // Add customer-specific fields if in customer mode
      if (!isAdminMode) {
        if (!phoneNumber || !cccd || !dob) {
          showSnackbar({
            message: "Please fill in all required customer fields",
            severity: "error",
          });
          return;
        }
        signUpData.phone_number = phoneNumber;
        signUpData.cccd = cccd;
        signUpData.dob = dob;
      }

      const response = await signUpMutation.mutateAsync(signUpData);

      // Check if email verification is required
      if (!response.access_token || !response.refresh_token) {
        // User needs to verify email
        showSnackbar({
          message: "Account created! Please verify your email.",
          severity: "success",
        });

        // Navigate to verification page
        navigate("/verify", {
          state: {
            message:
              response.message ||
              "Please check your email to verify your account.",
            email: email,
          },
        });
        return;
      }

      // Store tokens (only if verification not required)
      storeAuthData(response, queryClient);

      showSnackbar({
        message: "Account created successfully!",
        severity: "success",
      });

      // Navigate to admin dashboard
      navigate("/admin");
    } catch (error: any) {
      showSnackbar({
        message:
          error?.response?.data?.message ||
          "Failed to create account. Please try again.",
        severity: "error",
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          <Box sx={{ textAlign: "center", mb: 6 }}>
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
              {isAdminMode && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "secondary.main",
                    fontWeight: 500,
                    fontStyle: "italic",
                  }}
                >
                  Administrative access mode
                </Typography>
              )}
          </Box>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlined color="action" />
                  </InputAdornment>
                ),
              }}
            />

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

            {/* Customer-specific fields */}
            {!isAdminMode && (
              <>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlined color="action" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="0123456789"
                />

                <TextField
                  fullWidth
                  label="CCCD/ID Number"
                  type="text"
                  value={cccd}
                  onChange={(e) => setCccd(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlined color="action" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="123456789012"
                />

                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CakeOutlined color="action" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            )}

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
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

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              disabled={signUpMutation.isPending}
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {signUpMutation.isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          {/* Footer */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              Already have an account?{" "}
              <Typography
                component="span"
                onClick={() => navigate("/signin")}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign In
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
