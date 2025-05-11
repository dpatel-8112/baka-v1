import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import InterestsIcon from '@mui/icons-material/Interests';
import type { Profile } from '../../types/index';

interface ProfileInterestsSectionProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const ALL_INTERESTS = [
    'Reading', 'Travel', 'Music', 'Movies', 'Cooking', 'Photography', 'Sports', 'Art', 'Dancing', 'Hiking',
    'Gaming', 'Yoga', 'Fitness', 'Fashion', 'Technology', 'Writing', 'Painting', 'Gardening', 'Swimming', 'Chess'
];

const ProfileInterestsSection: React.FC<ProfileInterestsSectionProps> = ({ profile, setProfile }) => {
    const handleToggleInterest = (interest: string) => {
        setProfile((prev) => {
            const interests = prev.interests || [];
            return interests.includes(interest)
                ? { ...prev, interests: interests.filter(i => i !== interest) }
                : { ...prev, interests: [...interests, interest] };
        });
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InterestsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Interests
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {ALL_INTERESTS.map((interest) => (
                    <Chip
                        key={interest}
                        label={interest}
                        onClick={() => handleToggleInterest(interest)}
                        variant={profile.interests?.includes(interest) ? 'filled' : 'outlined'}
                        sx={{
                            backgroundColor: profile.interests?.includes(interest) ? 'primary.main' : 'none',
                            border: profile.interests?.includes(interest) ? 'none' : '1px solid primary.main',
                            color: profile.interests?.includes(interest) ? 'white' : 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.main',
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

export default ProfileInterestsSection; 