import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../components/elements/user/Header';
import Footer from '../../components/elements/user/Footer';

const UserLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default UserLayout;