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

const ProfileInterestsSection: React.FC<ProfileInterestsSectionProps> = ({ profile, setProfile }) => {
    const [interestInput, setInterestInput] = useState('');

    const handleAddInterest = () => {
        if (interestInput.trim()) {
            setProfile((prev) => ({ ...prev, interests: [...(prev.interests || []), interestInput.trim()] }));
            setInterestInput('');
        }
    };

    const handleDeleteInterest = (idx: number) => {
        setProfile((prev) => ({
            ...prev,
            interests: (prev.interests || []).filter((_, i) => i !== idx),
        }));
    };

    return (
        <Paper sx={sectionPaper}>
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <InterestsIcon color="primary" />
                                <Typography variant="h6" fontWeight={700}>Interests</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                {(profile.interests || []).map((interest, idx) => (
                                    <Chip key={idx} label={interest} onDelete={() => setProfile(p => ({ ...p, interests: (p.interests || []).filter((_, i) => i !== idx) }))} />
                                ))}
                                <TextField
                                    size="small"
                                    value={interestInput}
                                    onChange={e => setInterestInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleAddInterest()}
                                    placeholder="Add interest"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button onClick={handleAddInterest}>Add</Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ width: 160 }}
                                />
                            </Stack>
                        </Paper>
    );
};

export default ProfileInterestsSection; 