import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
interface UserProfileProps {
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'pointer' }} onClick={() => navigate('/my-profile')}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            mr: 2,
            bgcolor: 'primary.main',
          }}
        >
          <PersonIcon />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            John Doe
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Software Engineer
          </Typography>
        </Box>
        <Button
          color="error"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            p: 0.5,
            minWidth: 'auto',
            '& .MuiButton-startIcon': {
              margin: 0,
              padding: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default UserProfile; 