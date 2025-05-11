import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  Divider,
  Avatar,
  Grid,
  Modal,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Close as CloseIcon,
  Work as WorkIcon,
  LocationOn as LocationOnIcon,
  School as SchoolIcon,
  Star as StarIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from '@mui/icons-material';
import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right') => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSwipe }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Sample additional photos (in a real app, these would come from the profile data)
  const additionalPhotos: string[] = [
    'https://picsum.photos/id/1/400/400',
    'https://picsum.photos/id/1/400/400',
    'https://picsum.photos/id/1/400/400',
    'https://picsum.photos/id/1/400/400',
    'https://picsum.photos/id/1/400/400',
    'https://picsum.photos/id/1/400/400'
  ];

  const allPhotos: string[] = [profile.image, ...additionalPhotos];

  const handleImageClick = (image: string, index: number): void => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleCloseModal = (): void => {
    setSelectedImage(null);
  };

  const handleNextImage = (): void => {
    setCurrentImageIndex((prev) => (prev + 1) % allPhotos.length);
    setSelectedImage(allPhotos[(currentImageIndex + 1) % allPhotos.length]);
  };

  const handlePrevImage = (): void => {
    setCurrentImageIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
    setSelectedImage(allPhotos[(currentImageIndex - 1 + allPhotos.length) % allPhotos.length]);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: '100%',
          height: 'calc(100vh - 48px)', // Subtract padding from viewport height
          mx: 'auto',
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden',
        }}
      >
        {/* Left side - Photos */}
        <Box sx={{ 
          width: { xs: '100%', md: '55%' }, 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
          {/* Main photo */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '60%',
              borderRadius: 2,
              overflow: 'hidden',
              mb: 1,
              boxShadow: 2,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.95,
              },
            }}
            onClick={() => handleImageClick(additionalPhotos[0], 0)}
          >
            <Box
              component="img"
              src={additionalPhotos[0]}
              alt={profile.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(31, 41, 55, 0.9))',
                p: 2,
              }}
            >
              <Typography variant="h4" color="white" sx={{ fontWeight: 600, mb: 0.5 }}>
                {profile.name}, {profile.age}
              </Typography>
              <Typography variant="h6" color="white" sx={{ opacity: 0.9, mb: 0.5 }}>
                {profile.role} at {profile.department}
              </Typography>
              {profile.compatibilityScore && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ color: '#F4C95D', mr: 1, fontSize: 24 }} />
                  <Typography variant="h6" color="white" sx={{ fontWeight: 500 }}>
                    {profile.compatibilityScore}% Match
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Photo grid */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            width: '100%',
            height: '40%',
          }}>
            {additionalPhotos.map((photo: string, index: number) => (
              <Box
                key={index}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 1,
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
                onClick={() => handleImageClick(photo, index + 1)}
              >
                <Box
                  component="img"
                  src={photo}
                  alt={`Additional photo ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right side - Profile information */}
        <Box sx={{ 
          width: { xs: '100%', md: '45%' }, 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
        }}>
          <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Action buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <IconButton 
                sx={{ 
                  color: '#9CA3AF',
                  '&:hover': { color: '#D72638' },
                  mr: 2,
                }}
                size="large"
                onClick={() => onSwipe('left')}
              >
                <CloseIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#F46060',
                  '&:hover': { color: '#D72638' }
                }}
                size="large"
                onClick={() => onSwipe('right')}
              >
                <FavoriteIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>

            {/* Work experience */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <WorkIcon sx={{ color: '#4C5B9B', fontSize: 24 }} />
              <Typography variant="h6" color="text.secondary">
                {profile.yearsOfExperience} years at company
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* About section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                About
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ fontSize: '1rem', lineHeight: 1.5 }}>
                {profile.bio}
              </Typography>
            </Box>

            {/* Professional Interests */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                Professional Interests
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {profile.interests?.map((interest: string, index: number) => (
                  <Chip
                    key={index}
                    label={interest}
                    size="small"
                    sx={{ 
                      m: 0.5,
                      backgroundColor: '#F46060',
                      color: '#FFFFFF',
                      fontSize: '0.875rem',
                      height: 28,
                      '&:hover': {
                        backgroundColor: '#D72638',
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Skills & Expertise */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                Skills & Expertise
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {profile.skills?.map((skill: string, index: number) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      m: 0.5,
                      borderColor: '#4C5B9B',
                      color: '#4C5B9B',
                      fontSize: '0.875rem',
                      height: 28,
                      '&:hover': {
                        backgroundColor: '#4C5B9B',
                        color: '#FFFFFF',
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Location and Education */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationOnIcon sx={{ color: '#4C5B9B', fontSize: 24 }} />
                <Typography variant="h6" color="text.secondary">
                  {profile.location}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SchoolIcon sx={{ color: '#4C5B9B', fontSize: 24 }} />
                <Typography variant="h6" color="text.secondary">
                  {profile.education}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>

      {/* Image Preview Modal with Carousel */}
      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            outline: 'none',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>

          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
              zIndex: 1,
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>

          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
              zIndex: 1,
            }}
          >
            <NavigateNextIcon />
          </IconButton>

          <Box
            component="img"
            src={selectedImage || ''}
            alt="Preview"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />

          {/* Image Counter */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.875rem',
            }}
          >
            {currentImageIndex + 1} / {allPhotos.length}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileCard; 