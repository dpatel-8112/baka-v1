import React, { useState, useEffect } from 'react';
import { Box, Grid, useMediaQuery, Theme, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ConversationList from './ConversationList';
import MessageView from './MessageView';
import type { Message, Profile, Match } from '../../types/index';

interface MessagesProps {
  currentUser: Profile;
  matches: Match[];
  messages: Record<string, Message[]>; // Keyed by matchId
  onSendMessage: (matchId: string, content: string) => void;
  onMarkAsRead: (messageIds: string[]) => void;
}

const Messages: React.FC<MessagesProps> = ({
  currentUser,
  matches,
  messages,
  onSendMessage,
  onMarkAsRead,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'conversation'>('list');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  // Set the first match as selected on initial load if none is selected
  useEffect(() => {
    if (matches.length > 0 && !selectedMatch) {
      setSelectedMatch(matches[0]);
    }
  }, [matches, selectedMatch]);

  // Mark messages as read when selecting a conversation
  useEffect(() => {
    if (selectedMatch) {
      const matchMessages = messages[selectedMatch.matchedUserId] || [];
      const unreadMessageIds = matchMessages
        .filter(msg => !msg.isRead && msg.senderId !== currentUser.id)
        .map(msg => msg.id);
      
      if (unreadMessageIds.length > 0) {
        onMarkAsRead(unreadMessageIds);
      }
    }
  }, [selectedMatch, messages, currentUser.id, onMarkAsRead]);

  const handleSelectMatch = (match: Match) => {
    setSelectedMatch(match);
    if (isMobile) {
      setMobileView('conversation');
    }
  };

  const handleSendMessage = (content: string) => {
    if (selectedMatch) {
      onSendMessage(selectedMatch.matchedUserId, content);
    }
  };

  const handleBackToList = () => {
    setMobileView('list');
  };

  const visibleMessages = selectedMatch 
    ? messages[selectedMatch.matchedUserId] || [] 
    : [];

  // Determine if conversation list should be visible
  const showConversationList = !isMobile || (isMobile && mobileView === 'list');
  
  // Determine if message view should be visible
  const showMessageView = !isMobile || (isMobile && mobileView === 'conversation');

  return (
    <Box sx={{ height: '100%', bgcolor: 'background.default' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* Conversation List */}
        {showConversationList && (
          <Grid size={{ xs: 12, md: 4, lg: 3 }} sx={{ height: '100%' }}>
            <ConversationList
              matches={matches}
              selectedMatchId={selectedMatch?.matchedUserId || null}
              currentUserId={currentUser.id}
              onSelectMatch={handleSelectMatch}
            />
          </Grid>
        )}

        {/* Message View */}
        {showMessageView && (
          <Grid size={{ xs: 12, md: 8, lg: 9 }} sx={{ height: '100%', position: 'relative' }}>
            {isMobile && mobileView === 'conversation' && (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 8,
                  zIndex: 10,
                }}
                onClick={handleBackToList}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <MessageView
              messages={visibleMessages}
              currentUser={currentUser}
              selectedMatch={selectedMatch?.profile || null}
              onSendMessage={handleSendMessage}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Messages; 