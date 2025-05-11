import React from 'react';
import { Box, IconButton } from '@mui/material';
import {
  Close as CloseIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

interface SwipeButtonsProps {
  onSwipe: (direction: 'left' | 'right') => void;
}

const SwipeButtons: React.FC<SwipeButtonsProps> = ({ onSwipe }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        mt: 4,
      }}
    >
      <IconButton
        onClick={() => onSwipe('left')}
        sx={{
          bgcolor: 'error.main',
          color: 'error.contrastText',
          width: 64,
          height: 64,
          '&:hover': {
            bgcolor: 'error.dark',
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 32 }} />
      </IconButton>
      <IconButton
        onClick={() => onSwipe('right')}
        sx={{
          bgcolor: 'success.main',
          color: 'success.contrastText',
          width: 64,
          height: 64,
          '&:hover': {
            bgcolor: 'success.dark',
          },
        }}
      >
        <FavoriteIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
};

export default SwipeButtons; 