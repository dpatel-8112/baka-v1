import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip, CircularProgress, Typography } from '@mui/material';
import {
  ViewModule as GridViewIcon,
  ViewStream as CardViewIcon,
} from '@mui/icons-material';
import ProfileCard from './home/ProfileCard';
import SwipeButtons from './home/SwipeButtons';
import NoMoreProfiles from './home/NoMoreProfiles';
import ProfileGrid from './home/ProfileGrid';
import type { Profile } from '../types/index';
import { fetchAllUsers } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';

interface HomeProps {
  onSwipe: (direction: 'left' | 'right', profile: Profile) => void;
}

const Home: React.FC<HomeProps> = ({ onSwipe }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching profiles...');
        const res = await fetchAllUsers();
        console.log('API Response:', res);
        
        if (Array.isArray(res.data)) {
          // Filter out incomplete profiles and ensure photos array exists
          const validProfiles = res.data.filter(profile => {
            const isValid = profile && 
              profile.id && 
              profile.name && 
              Array.isArray(profile.photos);
            
            if (!isValid) {
              console.warn('Invalid profile found:', profile);
            }
            return isValid;
          }) as Profile[];
          
          console.log('Valid profiles:', validProfiles);
          setProfiles(validProfiles);
        } else {
          console.error('Expected array of profiles but got:', res.data);
          setError('Invalid response format from server');
          setProfiles([]);
        }
      } catch (err: any) {
        console.error('Error fetching profiles:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load profiles';
        setError(`Error: ${errorMessage}. Please try logging out and logging back in.`);
        setProfiles([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, []);

  // Filter out the logged-in user
  const filteredProfiles = profiles.filter(profile => {
    const isNotCurrentUser = profile.id !== user?.id;
    if (!isNotCurrentUser) {
      console.log('Filtered out current user:', profile);
    }
    return isNotCurrentUser;
  });

  useEffect(() => {
    setCurrentProfileIndex(0);
  }, [filteredProfiles.length]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const swipedProfile = filteredProfiles[currentProfileIndex];
    if (swipedProfile) {
      onSwipe(direction, swipedProfile);
    }
    setCurrentProfileIndex((prev) => prev + 1);
  };

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 2 }}>
        <Typography color="error">{error}</Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 48px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* View Toggle Button */}
      <Tooltip title={isGridView ? 'Switch to Card View' : 'Switch to Grid View'}>
        <IconButton
          onClick={toggleView}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          {isGridView ? <CardViewIcon /> : <GridViewIcon />}
        </IconButton>
      </Tooltip>

      {currentProfileIndex < filteredProfiles.length && filteredProfiles[currentProfileIndex] ? (
        <>
          {isGridView ? (
            <ProfileGrid profile={filteredProfiles[currentProfileIndex]} />
          ) : (
            <ProfileCard profile={filteredProfiles[currentProfileIndex]} />
          )}
          <SwipeButtons onSwipe={handleSwipe} />
        </>
      ) : (
        <>
          <NoMoreProfiles />
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            sx={{ mt: 2 }}
            onClick={() => setCurrentProfileIndex(0)}
          >
            Restart Matching
          </Button>
        </>
      )}
    </Box>
  );
};

export default Home; 