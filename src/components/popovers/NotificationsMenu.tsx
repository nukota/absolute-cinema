import { Box, Menu, List, ListItem, ListItemText, ListItemIcon, Typography, Divider, IconButton } from '@mui/material';
import { NotificationsRounded, DeleteRounded, DoneAllRounded, EventSeat, LocalOffer, Settings, Schedule } from '@mui/icons-material';
import { type NotificationDTO } from '../../utils/mockdata';

interface NotificationsMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  notifications: NotificationDTO[];
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  unreadCount: number;
}

const NotificationsMenu = ({
  anchorEl,
  open,
  onClose,
  notifications,
  onMarkAllAsRead,
  onDeleteNotification,
  unreadCount,
}: NotificationsMenuProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <EventSeat fontSize="small" color="primary" />;
      case 'promotion':
        return <LocalOffer fontSize="small" color="secondary" />;
      case 'system':
        return <Settings fontSize="small" color="info" />;
      case 'reminder':
        return <Schedule fontSize="small" color="warning" />;
      default:
        return <NotificationsRounded fontSize="small" color="primary" />;
    }
  };

  const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

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
            width: 420,
            maxHeight: 600,
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationsRounded color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Notifications
          </Typography>
        </Box>
        <IconButton
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0}
          size="small"
        >
          <DoneAllRounded />
        </IconButton>
      </Box>
      <Divider />
      {notifications.length > 0 ? (
        <List sx={{ py: 0, maxHeight: 400, overflow: 'auto' }}>
          {notifications.map((notification, index) => (
            <Box key={notification.id}>
              <ListItem
                sx={{
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                  py: 1,
                  px: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" fontWeight={notification.isRead ? 400 : 600} sx={{ opacity: notification.isRead ? 0.6 : 1 }}>
                        {notification.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ opacity: notification.isRead ? 0.6 : 1 }}>
                        {formatNotificationTime(notification.createdAt)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" sx={{ opacity: notification.isRead ? 0.6 : 1 }}>
                      {notification.message}
                    </Typography>
                  }
                />
                <IconButton
                  size="small"
                  onClick={() => onDeleteNotification(notification.id)}
                  sx={{ ml: 1 }}
                >
                  <DeleteRounded fontSize="small" />
                </IconButton>
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <NotificationsRounded sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            No notifications
          </Typography>
        </Box>
      )}
    </Menu>
  );
};

export default NotificationsMenu;