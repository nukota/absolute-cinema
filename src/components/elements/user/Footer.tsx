import { Box, Container, Typography } from '@mui/material';
import { MovieFilter } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 4,
            mb: 4,
          }}
        >
          {/* About */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <MovieFilter sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Montserrat Alternates", sans-serif',
                  fontWeight: 700,
                }}
              >
                Absolute Cinema
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Your premier destination for the latest movies and unforgettable cinema experiences.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}
                onClick={() => navigate('/movies')}
              >
                Now Showing
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}
                onClick={() => navigate('/movies')}
              >
                Coming Soon
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}
                onClick={() => navigate('/profile')}
              >
                My Bookings
              </Typography>
            </Box>
          </Box>

          {/* Customer Service */}
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Help Center
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Terms & Conditions
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Privacy Policy
              </Typography>
            </Box>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Email: info@absolutecinema.com
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Phone: 1900-1234
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Hotline: 0123-456-789
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2025 Absolute Cinema. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;