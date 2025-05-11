import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import type { Profile } from '../../types/index';
import ProfileHeader from './ProfileHeader';
import ProfileImageGallery from './ProfileImageGallery';
import ProfileInfoList from './ProfileInfoList';
import ProfileAbout from './ProfileAbout';
import ProfileChipsSection from './ProfileChipsSection';
import ProfileProjects from './ProfileProjects';

interface ProfileGridProps {
  profile: Profile;
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ profile }) => (
  <Box sx={{ display: 'flex', height: 'calc(100vh - 48px)', width: '100%', gap: 1.5, p: 1.5, overflow: 'hidden' }}>
    <ProfileImageGallery photos={profile.photos} name={profile.name} />
    <Box sx={{ width: '50%', height: '100%', overflow: 'hidden', flexShrink: 0 }}>
      <Card sx={{ height: '100%', boxShadow: 2, display: 'flex', flexDirection: 'column', borderRadius: 2, background: '#fff', border: '1px solid #f0f1f3' }}>
        <CardContent sx={{ p: 3, flex: 1, overflow: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#e0e0e0', borderRadius: '3px' } }}>
          <ProfileHeader profile={profile} />
          <ProfileInfoList profile={profile} />
          <ProfileAbout aboutMe={profile.aboutMe} />
          <ProfileChipsSection interests={profile.interests} skills={profile.skills} languages={profile.languages} socialLinks={profile.socialLinks} />
          <ProfileProjects projects={profile.projects} />
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default ProfileGrid; 