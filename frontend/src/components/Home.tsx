import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  ViewModule as GridViewIcon,
  ViewStream as CardViewIcon,
} from '@mui/icons-material';
import ProfileCard from './home/ProfileCard';
import SwipeButtons from './home/SwipeButtons';
import NoMoreProfiles from './home/NoMoreProfiles';
import ProfileGrid from './home/ProfileGrid';
import type { Profile } from '../types/index';

interface HomeProps {
  profiles: Profile[];
  onSwipe: (direction: 'left' | 'right') => void;
}

const Home: React.FC<HomeProps> = ({ profiles, onSwipe }) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);

  const handleSwipe = (direction: 'left' | 'right') => {
    onSwipe(direction);
    setCurrentProfileIndex((prev) => prev + 1);
  };

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

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

      {currentProfileIndex < profiles.length ? (
        <>
          {isGridView ? (
            <ProfileGrid profile={profiles[currentProfileIndex]} />
          ) : (
            <ProfileCard profile={profiles[currentProfileIndex]} />
          )}
          <SwipeButtons onSwipe={handleSwipe} />
        </>
      ) : (
        <NoMoreProfiles />
      )}
    </Box>
  );
};

export default Home; 