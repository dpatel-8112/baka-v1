import React, { useState } from 'react';
import { Paper, Stack, Typography, Chip, TextField, Button, InputAdornment } from '@mui/material';
import InterestsIcon from '@mui/icons-material/Interests';
import type { Profile } from '../../types/index';

interface ProfileInterestsSectionProps {
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

const ALL_INTERESTS = [
    'Machine Learning', 'Cloud Computing', 'UI/UX Design', 'Photography', 'Hiking', 'Travel',
    'Product Strategy', 'User Research', 'Data Analytics', 'Skiing', 'Chess',
    'React', 'Node.js', 'Python', 'AWS', 'Docker', 'TypeScript', 'GraphQL', 'MongoDB'
];

const ProfileInterestsSection: React.FC<ProfileInterestsSectionProps> = ({ profile, setProfile }) => {
    const [interestInput, setInterestInput] = useState('');

    const handleToggleInterest = (interest: string) => {
        setProfile((prev) => {
            const interests = prev.interests || [];
            return interests.includes(interest)
                ? { ...prev, interests: interests.filter(i => i !== interest) }
                : { ...prev, interests: [...interests, interest] };
        });
    };

    return (
        <Paper sx={sectionPaper}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <InterestsIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>Interests</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                {ALL_INTERESTS.map((interest) => (
                    <Chip
                        key={interest}
                        label={interest}
                        color={profile.interests?.includes(interest) ? 'primary' : 'default'}
                        onClick={() => handleToggleInterest(interest)}
                        sx={{ mb: 1, cursor: 'pointer' }}
                    />
                ))}
            </Stack>
        </Paper>
    );
};

export default ProfileInterestsSection; 