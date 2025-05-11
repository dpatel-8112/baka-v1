import React from 'react';
import { Box, Typography } from '@mui/material';
import Verified from '@mui/icons-material/Verified';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Person from '@mui/icons-material/Person';
import Cake from '@mui/icons-material/Cake';
import type { Profile } from '../../types/index';

interface ProfileHeaderProps {
  profile: Profile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => (
  <Box sx={{ mb: 2.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider', position: 'relative' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, minWidth: 0 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary', letterSpacing: '-0.5px', minWidth: 0, flexShrink: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: { xs: '100%', sm: 300 } }}>
        {profile.name}
        {profile.isVerified && (
          <Verified color="primary" sx={{ fontSize: '1.3rem', ml: 0.5 }} />
        )}
      </Typography>
      <Box sx={{ border: '1px solid', borderColor: 'primary.light', color: 'primary.main', px: 2, py: 0.5, borderRadius: 1.5, fontWeight: 600, fontSize: '1rem', background: '#f7fafd', whiteSpace: 'nowrap', alignSelf: 'center', flexShrink: 0 }}>{profile.age} years</Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 1, ml: 0.2 }}>
      {profile.email && (
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <Email sx={{ mr: 0.5, color: 'primary.main', fontSize: '1.1rem' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.93rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{profile.email}</Typography>
        </Box>
      )}
      {profile.phone && (
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <Phone sx={{ mr: 0.5, color: 'primary.main', fontSize: '1.1rem' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.93rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{profile.phone}</Typography>
        </Box>
      )}
      {profile.gender && (
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <Person sx={{ mr: 0.5, color: 'primary.main', fontSize: '1.1rem' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.93rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{profile.gender}</Typography>
        </Box>
      )}
      {profile.birthday && (
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <Cake sx={{ mr: 0.5, color: 'primary.main', fontSize: '1.1rem' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.93rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{profile.birthday}</Typography>
        </Box>
      )}
    </Box>
  </Box>
);

export default ProfileHeader; 