import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';

interface ProfileImageGalleryProps {
  photos: string[];
  name: string;
}

const ProfileImageGallery: React.FC<ProfileImageGalleryProps> = ({ photos, name }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate main image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <Box sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', gap: 1.5, flexShrink: 0 }}>
      <Paper elevation={3} sx={{ height: '70%', overflow: 'hidden', borderRadius: 1.5, position: 'relative' }}>
        <img
          src={photos[currentImageIndex]}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Paper>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, height: '30%' }}>
        {photos.map((photo, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              cursor: 'pointer',
              overflow: 'hidden',
              borderRadius: 1,
              border: currentImageIndex === index ? '2px solid #1976d2' : 'none',
            }}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              src={photo}
              alt={`${name} ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileImageGallery; 