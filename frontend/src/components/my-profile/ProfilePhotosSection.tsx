// ProfilePhotosSection.tsx

import React from 'react';
import { Box, Typography, Stack, Paper, Avatar, styled, Button, IconButton } from '@mui/material';
import { Profile, Photo } from '../../types';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api';

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
    selectedImage: string | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProfilePhotosSection: React.FC<ProfilePhotosSectionProps> = ({ profile, setProfile, selectedImage, setSelectedImage }) => {

    // Handle image upload
    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            for (const file of files) {
                try {
                    const formData = new FormData();
                    formData.append('file', file);
                    const response = await api.post('/images/upload', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    const photo = response.data as Photo;
                    setProfile((prev) => ({ ...prev, photos: [...prev.photos, photo] }));
                    if (!profile.image) {
                        setProfile((prev) => ({ ...prev, image: photo.url }));
                    }
                } catch (err) {
                    alert('Image upload failed');
                }
            }
        }
    };

    // Remove photo
    const handleRemovePhoto = async (photoId: number) => {
        try {
            await api.delete(`/images/${photoId}`);
            setProfile((prev) => {
                const newPhotos = prev.photos.filter((photo) => photo.id !== photoId);
                return {
                    ...prev,
                    photos: newPhotos,
                    image: newPhotos[0]?.url || '',
                };
            });
        } catch (err) {
            alert('Failed to delete photo');
        }
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
                        <Avatar src={photo.url} alt={`Photo ${idx + 1}`} sx={{ width: 56, height: 56, mr: 1, cursor: 'pointer' }} onClick={() => setSelectedImage(photo.url)} />
                        <IconButton size="small" sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'white' }} onClick={() => handleRemovePhoto(photo.id)}>
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