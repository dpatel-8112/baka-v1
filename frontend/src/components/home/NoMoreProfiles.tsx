import React from 'react';
import { Box, Typography } from '@mui/material';
import { SentimentDissatisfied as SadIcon } from '@mui/icons-material';

const NoMoreProfiles: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: 2,
      }}
    >
      <SadIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
      <Typography variant="h6" color="text.secondary">
        No more profiles to show
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Check back later for new matches
      </Typography>
    </Box>
  );
};

export default NoMoreProfiles; 