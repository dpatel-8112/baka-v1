import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, Divider } from '@mui/material';
import {
  Home as HomeIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import Logo from './navigation/Logo';
import NavItem from './navigation/NavItem';
import UserProfile from './navigation/UserProfile';

interface LeftNavProps {
  activePage: string;
  onPageChange: (page: string) => void;
  unreadNotifications: number;
  onLogout: () => void;
}

const LeftNav: React.FC<LeftNavProps> = ({
  activePage,
  onPageChange,
  unreadNotifications,
  onLogout,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onPageChange(path);
  };

  const navItems = [
    { icon: <HomeIcon />, label: 'Home', path: '/' },
    { icon: <MessageIcon />, label: 'Messages', path: '/messages' },
    { icon: <NotificationsIcon />, label: 'Notifications', path: '/notifications', badge: unreadNotifications },
    { icon: <SettingsIcon />, label: 'Settings', path: '/settings' },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      <Logo />

      <Divider sx={{ 
        opacity: 0.6,
        borderColor: 'divider',
        mx: 2,
      }} />

      <List sx={{ flex: 1, px: 2, py: 1 }}>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isSelected={activePage === item.path}
            onClick={handleNavigation}
            badge={item.badge}
          />
        ))}
      </List>

      <UserProfile onLogout={onLogout} />
    </Box>
  );
};

export default LeftNav; 