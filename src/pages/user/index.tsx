import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Header from '../../components/elements/user/Header';
import Footer from '../../components/elements/user/Footer';
import userTheme from '../../theme/userTheme';

const UserLayout = () => {
  return (
    <ThemeProvider theme={userTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default UserLayout;