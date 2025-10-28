import {
  Box,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  NotificationsOutlined,
  AccountCircleOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import { useState } from 'react';

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        mb: 3,
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          minHeight: { xs: 64, sm: 70 },
          px: 3,
        }}
      >
        {/* Notifications */}
        <IconButton color="default" size="large">
          <NotificationsOutlined />
        </IconButton>

        {/* Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
              Admin User
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.75rem' } }}>
              admin@absolutecinema.com
            </Typography>
          </Box>
          <IconButton onClick={handleClick} size="small">
            <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
              A
            </Avatar>
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          slotProps={{
            paper: {
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
              },
            },
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <AccountCircleOutlined fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <SettingsOutlined fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <LogoutOutlined fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
