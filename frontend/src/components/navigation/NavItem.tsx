import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface NavItemProps {
  icon: React.ReactElement;
  label: string;
  path: string;
  isSelected: boolean;
  onClick: (path: string) => void;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  path,
  isSelected,
  onClick,
  badge,
}) => {
  return (
    <ListItem disablePadding sx={{ mb: 1 }}>
      <ListItemButton
        onClick={() => onClick(path)}
        selected={isSelected}
        sx={{
          borderRadius: 2,
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            '& .MuiListItemIcon-root': {
              color: 'primary.contrastText',
            },
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} />
        {badge && badge > 0 && (
          <Box
            sx={{
              bgcolor: 'error.main',
              color: 'error.contrastText',
              borderRadius: '50%',
              minWidth: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              ml: 1,
            }}
          >
            {badge}
          </Box>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem; 