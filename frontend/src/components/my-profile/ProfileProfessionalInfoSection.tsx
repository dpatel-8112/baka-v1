import React from 'react';
import { Grid, TextField, Stack, Typography, Paper, styled } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import type { Profile } from '../../types/index';

interface ProfileProfessionalInfoFormProps {
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

const ProfileProfessionalInfoForm: React.FC<ProfileProfessionalInfoFormProps> = ({ profile, setProfile }) => (
    <Paper sx={sectionPaper}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <WorkIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>Professional Info</Typography>
        </Stack>
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Item>
                    <TextField label="Location" value={profile.location} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} fullWidth />
                </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Item>
                    <TextField label="Education" value={profile.education} onChange={e => setProfile(p => ({ ...p, education: e.target.value }))} fullWidth />
                </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Item>
                    <TextField label="Years of Experience" type="number" value={profile.yearsOfExperience} onChange={e => setProfile(p => ({ ...p, yearsOfExperience: Number(e.target.value) }))} fullWidth />
                </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Item>
                    <TextField label="Compatibility Score" type="number" value={profile.compatibilityScore} onChange={e => setProfile(p => ({ ...p, compatibilityScore: Number(e.target.value) }))} fullWidth />
                </Item>
            </Grid>
        </Grid>
    </Paper>
);

export default ProfileProfessionalInfoForm;
