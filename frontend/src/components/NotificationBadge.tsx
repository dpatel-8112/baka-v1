import React from 'react';
import { IconButton, Badge, Tooltip } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

interface NotificationBadgeProps {
  count: number;
  onClick: () => void;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, onClick }) => {
  return (
    <Tooltip title={count > 0 ? `${count} unread notifications` : 'No new notifications'}>
      <IconButton
        color="inherit"
        onClick={onClick}
        sx={{
          position: 'fixed',
          top: 24,
          right: 24,
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <Badge
          badgeContent={count}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#D72638',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 20,
              minWidth: 20,
              borderRadius: 10,
              padding: '0 6px',
            },
          }}
        >
          <NotificationsIcon sx={{ fontSize: 28, color: '#4C5B9B' }} />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default NotificationBadge; 