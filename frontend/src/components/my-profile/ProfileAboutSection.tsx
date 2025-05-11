// ProfileAboutSection.tsx

import React from 'react';
import { Box, Typography, Stack, Paper, Grid, TextField, styled } from '@mui/material';
import { Profile } from '../../types';
import InfoIcon from '@mui/icons-material/Info';

interface ProfileAboutSectionProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const sectionPaper = {
    p: { xs: 2, md: 3 },
    borderRadius: 3,
    boxShadow: 1,
    bgcolor: 'white',
    mb: 3,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
}));

const ProfileAboutSection: React.FC<ProfileAboutSectionProps> = ({ profile, setProfile }) => (
    <Paper sx={sectionPaper}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <InfoIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>About</Typography>
        </Stack>
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
                <Item>
                    <TextField label="About Me" value={profile.aboutMe} onChange={e => setProfile(p => (    { ...p, aboutMe: e.target.value }))} fullWidth multiline minRows={2} />
                </Item>
            </Grid>
        </Grid>
    </Paper>
);

export default ProfileAboutSection; 