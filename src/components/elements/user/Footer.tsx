import { Box, Container, Typography } from '@mui/material';
import { MovieFilter } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #4a148c 0%, #8d6e63 100%)',
        color: 'white',
        py: 8,
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
    >
      {/* Decorative Cinema Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          opacity: 0.1,
          zIndex: 1,
        }}
      >
        <MovieFilter sx={{ fontSize: 200 }} />
      </Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 6,
            mb: 6,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* About */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <MovieFilter sx={{ fontSize: 40, color: 'white' }} />
              <Typography
                variant="h5"
                sx={{
                  width: 240,
                  fontFamily: '"Montserrat Alternates", sans-serif',
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                Absolute Cinema
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, color: 'white', lineHeight: 1.6 }}>
              Your premier destination for the latest movies and unforgettable cinema experiences.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom color="white">
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, color: 'white', cursor: 'pointer', '&:hover': { opacity: 1 } }}
                onClick={() => navigate('/movies')}
              >
                Now Showing
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, color: 'white', cursor: 'pointer', '&:hover': { opacity: 1 } }}
                onClick={() => navigate('/movies')}
              >
                Coming Soon
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, color: 'white', cursor: 'pointer', '&:hover': { opacity: 1 } }}
                onClick={() => navigate('/profile')}
              >
                My Bookings
              </Typography>
            </Box>
          </Box>

          {/* Customer Service */}
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom color="white">
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, color: 'white', cursor: 'pointer', '&:hover': { opacity: 1 } }}
                onClick={() => navigate('/help-center')}
              >
                Help Center
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, color: 'white', cursor: 'pointer', '&:hover': { opacity: 1 } }}
                onClick={() => navigate('/terms-conditions')}
              >
                Terms & Conditions
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, color: 'white', cursor: 'pointer', '&:hover': { opacity: 1 } }}
                onClick={() => navigate('/privacy-policy')}
              >
                Privacy Policy
              </Typography>
            </Box>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom color="white">
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body1" sx={{ opacity: 0.9, color: 'white' }}>
                Email: info@absolutecinema.com
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, color: 'white' }}>
                Phone: 1900-1234
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, color: 'white' }}>
                Hotline: 0123-456-789
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            pt: 4,
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography variant="body1" sx={{ opacity: 0.9, color: 'white' }}>
            © 2025 Absolute Cinema. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;