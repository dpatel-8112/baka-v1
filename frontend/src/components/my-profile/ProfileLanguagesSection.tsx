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

const ALL_LANGUAGES = [
    'English', 'Spanish', 'French', 'Mandarin', 'Japanese', 'German', 'Hindi', 'Russian', 'Portuguese', 'Arabic', 'Italian', 'Korean', 'Bengali', 'Turkish', 'Vietnamese'
];

const ProfileLanguagesSection: React.FC<ProfileLanguagesSectionProps> = ({ profile, setProfile }) => {
    const [languageInput, setLanguageInput] = useState('');

    const handleToggleLanguage = (lang: string) => {
        setProfile((prev) => {
            const languages = prev.languages || [];
            return languages.includes(lang)
                ? { ...prev, languages: languages.filter(l => l !== lang) }
                : { ...prev, languages: [...languages, lang] };
        });
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
                {ALL_LANGUAGES.map((lang) => (
                    <Chip
                        key={lang}
                        label={lang}
                        color={profile.languages?.includes(lang) ? 'primary' : 'default'}
                        onClick={() => handleToggleLanguage(lang)}
                        sx={{ mb: 1, cursor: 'pointer' }}
                    />
                ))}
            </Stack>
        </Paper>
    );
};

export default ProfileLanguagesSection; 