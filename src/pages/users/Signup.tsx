import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  MovieFilterOutlined,
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
} from '@mui/icons-material';

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to admin dashboard without credential checking
    navigate('/admin');
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        p: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 450,
          width: '100%',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo and Title */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <MovieFilterOutlined
                sx={{ fontSize: 48, color: 'primary.main' }}
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
            <Typography variant="body1" color="text.secondary">
              Create your account
            </Typography>
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

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
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
              type={showConfirmPassword ? 'text' : 'password'}
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
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              Sign Up
            </Button>
          </form>

          {/* Footer */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Already have an account?{' '}
              <Typography
                component="span"
                onClick={() => navigate('/signin')}
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
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
