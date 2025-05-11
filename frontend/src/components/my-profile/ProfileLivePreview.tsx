import React from 'react';
import { Paper, Typography, Divider } from '@mui/material';
import ProfileCard from '../home/ProfileCard';
import type { Profile } from '../../types/index';

interface ProfileLivePreviewProps {
    profile: Profile;
}

const ProfileLivePreview: React.FC<ProfileLivePreviewProps> = ({ profile }) => (
    <>
    <Typography variant="h3" sx={{fontWeight: 700, color: 'primary.main', textAlign: 'center', letterSpacing: 1 }}>
                        Live Preview
                    </Typography>
                    {/* <Divider sx={{ mb: 2, width: '100%' }} /> */}

                    <Paper
                        elevation={4}
                        sx={{
                            p: { xs: 2, md: 4 },
                            borderRadius: 3,
                            bgcolor: 'transparent',
                            minHeight: 400,
                            boxShadow: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <ProfileCard profile={profile} />
                    </Paper>
    </>
);

export default ProfileLivePreview; 