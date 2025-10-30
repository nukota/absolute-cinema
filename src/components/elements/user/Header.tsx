import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { MovieFilter, Person, Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <MovieFilter sx={{ fontSize: 32 }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Montserrat Alternates", sans-serif',
                fontWeight: 700,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Absolute Cinema
            </Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              Home
            </Button>
            <Button
              onClick={() => navigate('/movies')}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              Movies
            </Button>
            <IconButton
              onClick={() => navigate('/profile')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              <Person />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;