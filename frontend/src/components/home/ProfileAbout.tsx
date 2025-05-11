import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProfileAboutProps {
  aboutMe: string;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({ aboutMe }) => (
  <Box sx={{ mb: 2.5 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.08rem' }}>
        About Me
      </Typography>
    </Box>
    <Typography variant="body2" paragraph sx={{ lineHeight: 1.7, color: 'text.secondary', mb: 2, fontSize: '0.98rem' }}>
      {aboutMe}
    </Typography>
  </Box>
);

export default ProfileAbout; 