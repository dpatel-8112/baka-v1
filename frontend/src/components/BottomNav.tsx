import React from 'react';
import { BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import {
  Home as HomeIcon,
  Message as MessageIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

interface BottomNavProps {
  activePage: string;
  onPageChange: (page: string) => void;
  unreadMessages?: number;
}

const BottomNav: React.FC<BottomNavProps> = ({
  activePage,
  onPageChange,
  unreadMessages = 0,
}) => {
  return (
    <BottomNavigation
      value={activePage}
      onChange={(_, newValue) => onPageChange(newValue)}
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Messages"
        value="messages"
        icon={
          <Badge badgeContent={unreadMessages} color="error">
            <MessageIcon />
          </Badge>
        }
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav; 