import { Box, Menu, MenuItem, Divider, ListItemIcon, Typography } from '@mui/material';
import { AccountCircleRounded, LogoutRounded, AdminPanelSettingsRounded } from '@mui/icons-material';

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onProfile: () => void;
  onAdminPage: () => void;
  onLogout: () => void;
  userRole: string;
}

const ProfileMenu = ({
  anchorEl,
  open,
  onClose,
  onProfile,
  onAdminPage,
  onLogout,
  userRole,
}: ProfileMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      slotProps={{
        paper: {
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 220,
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          John Doe
        </Typography>
        <Typography variant="body2" color="text.secondary">
          john.doe@email.com
        </Typography>
      </Box>
      <Divider />
      <MenuItem onClick={onProfile}>
        <ListItemIcon>
          <AccountCircleRounded fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      {userRole === 'admin' && (
        <MenuItem onClick={onAdminPage}>
          <ListItemIcon>
            <AdminPanelSettingsRounded fontSize="small" />
          </ListItemIcon>
          Admin Dashboard
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <LogoutRounded fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;