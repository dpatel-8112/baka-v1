// ProfilePhotosSection.tsx

import React from 'react';
import { Box, Typography, Stack, Paper, Avatar, styled, Button, IconButton } from '@mui/material';
import { Profile } from '../../types';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

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

interface ProfilePhotosSectionProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}




const ProfilePhotosSection: React.FC<ProfilePhotosSectionProps> = ({ profile, setProfile }) => {

    // Handle image upload
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const urls = files.map((file) => URL.createObjectURL(file));
            setProfile((prev) => ({ ...prev, photos: [...prev.photos, ...urls] }));
            if (urls.length > 0 && !profile.image) {
                setProfile((prev) => ({ ...prev, image: urls[0] }));
            }
        }
    };

    // Remove photo
    const handleRemovePhoto = (index: number) => {
        setProfile((prev) => {
            const newPhotos = prev.photos.filter((_, i) => i !== index);
            return {
                ...prev,
                photos: newPhotos,
                image: newPhotos[0] || '',
            };
        });
    };

    return (
        <Paper sx={sectionPaper}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <AddPhotoAlternateIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>Photos</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                {profile.photos.map((photo, idx) => (
                    <Box key={idx} sx={{ position: 'relative', display: 'inline-block' }}>
                        <Avatar src={photo} alt={`Photo ${idx + 1}`} sx={{ width: 56, height: 56, mr: 1 }} />
                        <IconButton size="small" sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'white' }} onClick={() => handleRemovePhoto(idx)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
                <Button component="label" variant="outlined" startIcon={<AddPhotoAlternateIcon />}>
                    Add Photo
                    <input type="file" accept="image/*" multiple hidden onChange={handlePhotoUpload} />
                </Button>
            </Stack>
        </Paper>
    );
};

export default ProfilePhotosSection; 