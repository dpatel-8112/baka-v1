import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Favorite as FavoriteIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Notification } from '../types';

interface NotificationCenterProps {
  notifications: Notification[];
  onClose: (notificationId: string) => void;
  onNotificationClick: (notification: Notification) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onClose,
  onNotificationClick,
}) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageIcon color="primary" />;
      case 'match':
        return <FavoriteIcon color="error" />;
      default:
        return <NotificationsIcon color="action" />;
    }
  };

  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {notifications.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1" color="text.secondary" align="center">
                  No new notifications
                </Typography>
              }
            />
          </ListItem>
        ) : (
          notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="close"
                    onClick={() => onClose(notification.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                }
                onClick={() => onNotificationClick(notification)}
              >
                <ListItemIcon>{getNotificationIcon(notification.type)}</ListItemIcon>
                <ListItemText
                  primary={notification.content}
                  secondary={formatTimestamp(notification.timestamp)}
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))
        )}
      </List>
    </Box>
  );
};

export default NotificationCenter; 