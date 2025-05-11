import React, { useState } from 'react';
import { Paper, Stack, Typography, Chip, TextField, Button, InputAdornment } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import type { Profile } from '../../types/index';

interface ProfileSkillsSectionProps {
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

const ProfileSkillsSection: React.FC<ProfileSkillsSectionProps> = ({ profile, setProfile }) => {
    const [skillInput, setSkillInput] = useState('');

    const handleAddSkill = () => {
        if (skillInput.trim()) {
            setProfile((prev) => ({ ...prev, skills: [...(prev.skills || []), skillInput.trim()] }));
            setSkillInput('');
        }
    };

    const handleDeleteSkill = (idx: number) => {
        setProfile((prev) => ({
            ...prev,
            skills: (prev.skills || []).filter((_, i) => i !== idx),
        }));
    };

    return (
        <Paper sx={sectionPaper}>
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <SchoolIcon color="primary" />
                                <Typography variant="h6" fontWeight={700}>Skills</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                {(profile.skills || []).map((skill, idx) => (
                                    <Chip key={idx} label={skill} onDelete={() => setProfile(p => ({ ...p, skills: (p.skills || []).filter((_, i) => i !== idx) }))} />
                                ))}
                                <TextField
                                    size="small"
                                    value={skillInput}
                                    onChange={e => setSkillInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
                                    placeholder="Add skill"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button onClick={handleAddSkill}>Add</Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ width: 160 }}
                                />
                            </Stack>
                        </Paper>
    );
};

export default ProfileSkillsSection; 