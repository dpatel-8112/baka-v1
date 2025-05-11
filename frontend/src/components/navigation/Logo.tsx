import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const Logo: React.FC = () => {
  return (
    <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar
        sx={{
          width: 40,
          height: 40,
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'transparent',
        }}
      >
        🧃
      </Avatar>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          letterSpacing: '0.5px',
          fontSize: '2rem',
        }}
      >
        Baka
      </Typography>
    </Box>
  );
};

export default Logo; 