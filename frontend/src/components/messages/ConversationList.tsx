import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Badge,
  Divider,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import type { Profile, Message, Match } from '../../types/index';

interface ConversationListProps {
  matches: Match[];
  selectedMatchId: string | null;
  currentUserId: string;
  onSelectMatch: (match: Match) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  matches,
  selectedMatchId,
  currentUserId,
  onSelectMatch,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredMatches = matches.filter(match => 
    match.profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort matches by most recent message timestamp
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const timestampA = a.lastMessage?.timestamp || a.timestamp;
    const timestampB = b.lastMessage?.timestamp || b.timestamp;
    return new Date(timestampB).getTime() - new Date(timestampA).getTime();
  });

  const formatTime = (date: Date): string => {
    const now = new Date();
    const messageDate = new Date(date);
    
    // If message is from today, show time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If message is from this week, show day name
    const diffDays = Math.round((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return messageDate.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise show date
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <Paper elevation={0} sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRight: 1,
      borderColor: 'divider',
    }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Messages
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search conversations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <List sx={{ overflow: 'auto', flex: 1 }}>
        {sortedMatches.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">No conversations found</Typography>
          </Box>
        ) : (
          sortedMatches.map((match) => {
            const isSelected = selectedMatchId === match.matchedUserId;
            const hasUnread = match.lastMessage && !match.lastMessage.isRead && match.lastMessage.senderId !== currentUserId;
            
            return (
              <React.Fragment key={match.id}>
                <ListItem 
                  onClick={() => onSelectMatch(match)}
                  sx={{ 
                    py: 1.5,
                    bgcolor: isSelected ? 'action.selected' : 'inherit',
                    '&:hover': {
                      bgcolor: isSelected ? 'action.selected' : 'action.hover',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge 
                      variant="dot" 
                      color="primary"
                      invisible={!hasUnread}
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    >
                      <Avatar src={match.profile.image || match.profile.photos[0]} alt={match.profile.name} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Typography 
                        variant="subtitle2" 
                        fontWeight={hasUnread ? 700 : 400}
                        noWrap
                      >
                        {match.profile.name}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        fontWeight={hasUnread ? 600 : 400}
                        noWrap
                      >
                        {match.lastMessage?.content || 'Start a conversation'}
                      </Typography>
                    }
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  />
                  {match.lastMessage && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ minWidth: '45px', textAlign: 'right' }}
                    >
                      {formatTime(match.lastMessage.timestamp)}
                    </Typography>
                  )}
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            );
          })
        )}
      </List>
    </Paper>
  );
};

export default ConversationList; 