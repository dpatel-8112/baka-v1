import React from 'react';
import { Grid, TextField, Stack, Typography, Paper, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Profile } from '../../types/index';

interface ProfileBasicInfoFormProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
    calculateAge: (birthday: string) => number;
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


const ProfileBasicInfoForm: React.FC<ProfileBasicInfoFormProps> = ({ profile, setProfile, calculateAge }) => (
    <>
        <Paper sx={sectionPaper}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <PersonIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>Basic Info</Typography>
            </Stack>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Item>
                        <TextField label="Name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} fullWidth />
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Item>
                        <TextField label="Age" value={profile.age} fullWidth disabled />
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Item>
                        <TextField label="Role" value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} fullWidth />
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Item>
                        <TextField label="Company" value={profile.company} onChange={e => setProfile(p => ({ ...p, company: e.target.value }))} fullWidth />
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Item>
                        <TextField label="Department" value={profile.department} onChange={e => setProfile(p => ({ ...p, department: e.target.value }))} fullWidth />
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Item>
                        <TextField label="Email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} fullWidth />
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Item>
                        <TextField label="Phone" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} fullWidth />
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Item>
                        <TextField label="Gender" value={profile.gender} onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))} fullWidth />
                    </Item>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Item>
                        <TextField label="Birthday" type="date" value={profile.birthday} onChange={e => {
                            const birthday = e.target.value;
                            setProfile(p => ({ ...p, birthday, age: calculateAge(birthday) }));
                        }} fullWidth InputLabelProps={{ shrink: true }} />
                    </Item>
                </Grid>
            </Grid>
        </Paper>
    </>
);

export default ProfileBasicInfoForm; 