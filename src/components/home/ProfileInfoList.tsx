import React from 'react';
import { Box, Typography } from '@mui/material';
import Work from '@mui/icons-material/Work';
import LocationOn from '@mui/icons-material/LocationOn';
import School from '@mui/icons-material/School';
import Star from '@mui/icons-material/Star';
import type { Profile } from '../../types/index';

interface ProfileInfoListProps {
  profile: Profile;
}

const ProfileInfoList: React.FC<ProfileInfoListProps> = ({ profile }) => (
  <Box sx={{ mb: 2.5 }}>
    {[{
      icon: <Work sx={{ color: 'primary.main', fontSize: '1.2rem' }} />, text: `${profile.role} at ${profile.company}`
    }, {
      icon: <LocationOn sx={{ color: 'primary.main', fontSize: '1.2rem' }} />, text: profile.location
    }, {
      icon: <School sx={{ color: 'primary.main', fontSize: '1.2rem' }} />, text: profile.education
    }, {
      icon: <Star sx={{ color: 'primary.main', fontSize: '1.2rem' }} />, text: `${profile.yearsOfExperience} years of experience`
    }].map((item, idx) => (
      <Box key={idx} sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1.1,
        backgroundColor: '#f7fafd',
        p: 1.2,
        borderRadius: 1.5,
        boxShadow: 0
      }}>
        <Box sx={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f1f3',
          borderRadius: '50%',
          mr: 1.2,
        }}>{item.icon}</Box>
        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1rem', color: 'text.primary' }}>
          {item.text}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default ProfileInfoList; 