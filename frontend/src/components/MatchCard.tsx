import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { Message as MessageIcon } from '@mui/icons-material';
import { Profile } from '../types';

interface MatchCardProps {
  match: Profile;
  onMessage: (matchId: string) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onMessage }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={match.photos[0]?.url}
        alt={match.name}
        sx={{
          objectFit: 'cover',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {match.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {match.role} at {match.company}
        </Typography>
        
        <Box sx={{ my: 2 }}>
          {match.interests.slice(0, 3).map((interest, index) => (
            <Chip
              key={index}
              label={interest}
              size="small"
              sx={{
                mr: 1,
                mb: 1,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
              }}
            />
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          startIcon={<MessageIcon />}
          onClick={() => onMessage(match.id)}
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
};

export default MatchCard; 