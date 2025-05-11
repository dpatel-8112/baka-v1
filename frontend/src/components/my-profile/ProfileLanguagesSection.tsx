import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import type { Profile } from '../../types/index';

interface ProfileLanguagesSectionProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const ALL_LANGUAGES = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Japanese', 'Chinese', 'Korean',
    'Arabic', 'Hindi', 'Bengali', 'Turkish', 'Dutch', 'Swedish', 'Polish', 'Greek', 'Vietnamese', 'Thai'
];

const ProfileLanguagesSection: React.FC<ProfileLanguagesSectionProps> = ({ profile, setProfile }) => {
    const handleToggleLanguage = (language: string) => {
        setProfile((prev) => {
            const languages = prev.languages || [];
            return languages.includes(language)
                ? { ...prev, languages: languages.filter(l => l !== language) }
                : { ...prev, languages: [...languages, language] };
        });
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LanguageIcon sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Languages
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {ALL_LANGUAGES.map((language) => (
                    <Chip
                        key={language}
                        label={language}
                        onClick={() => handleToggleLanguage(language)}
                        variant={profile.languages?.includes(language) ? 'filled' : 'outlined'}
                        sx={{
                            backgroundColor: profile.languages?.includes(language) ? 'success.main' : 'none',
                            border: profile.languages?.includes(language) ? 'none' : '1px solid success.main',
                            color: profile.languages?.includes(language) ? 'white' : 'success.main',
                            '&:hover': {
                                backgroundColor: 'success.main',
                            },
                            transition: 'all 0.2s ease-in-out',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ProfileLanguagesSection; 