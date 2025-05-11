import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { Profile } from '../../types/index';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: 3,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: 260, cursor: 'pointer' }}>
        <CardMedia
          component="img"
          image={profile.photos[0]}
          alt={profile.name}
          sx={{ width: '100%', height: 260, objectFit: 'cover', cursor: 'pointer' }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            p: 2,
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            cursor: 'pointer',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, cursor: 'pointer' }}>
            {profile.name}, {profile.age}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, cursor: 'pointer' }}>
            {profile.role} at {profile.company}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {profile.aboutMe}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {profile.location} • {profile.education}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Interests
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {profile.interests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                size="small"
                sx={{ mb: 1, cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {profile.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                variant="outlined"
                sx={{ mb: 1, cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mt: 'auto', pt: 2, cursor: 'pointer' }}>
          <Typography variant="body2" color="text.secondary">
            Compatibility Score: {profile.compatibilityScore}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard; 