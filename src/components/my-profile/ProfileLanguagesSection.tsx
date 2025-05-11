import React, { useState } from 'react';
import { Paper, Stack, Typography, Chip, TextField, Button, InputAdornment, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import type { Profile } from '../../types/index';

interface ProfileLanguagesSectionProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const sectionPaper = {
    p: { xs: 2, md: 3 },
    borderRadius: 3,
    boxShadow: 2,
    bgcolor: 'background.paper',
    mb: 3,
};

const ProfileLanguagesSection: React.FC<ProfileLanguagesSectionProps> = ({ profile, setProfile }) => {
    const [languageInput, setLanguageInput] = useState('');

    const handleAddLanguage = () => {
        if (languageInput.trim()) {
            setProfile((prev) => ({ ...prev, languages: [...(prev.languages || []), languageInput.trim()] }));
            setLanguageInput('');
        }
    };

    const handleDeleteLanguage = (idx: number) => {
        setProfile((prev) => ({
            ...prev,
            languages: (prev.languages || []).filter((_, i) => i !== idx),
        }));
    };

    return (
        <Paper sx={sectionPaper}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <LanguageIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} color="primary.main" letterSpacing={0.5}>
                    Languages
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" mb={2}>
                {(profile.languages || []).map((lang, idx) => (
                    <Chip key={idx} label={lang} onDelete={() => handleDeleteLanguage(idx)} sx={{ mb: 1 }} />
                ))}
            </Stack>
            <Box display="flex" gap={1}>
                <TextField
                    size="small"
                    value={languageInput}
                    onChange={e => setLanguageInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddLanguage()}
                    placeholder="Add language"
                    sx={{ width: 180 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddLanguage} sx={{ minWidth: 80 }}>
                    Add
                </Button>
            </Box>
        </Paper>
    );
};

export default ProfileLanguagesSection; 