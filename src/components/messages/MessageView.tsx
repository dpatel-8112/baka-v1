import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';

import MessageInput from './MessageInput'; 
import MessageBubble from './MessageBubble';
import type { Message, Profile } from '../../types/index';

interface MessageViewProps {
  messages: Message[];
  currentUser: Profile;
  selectedMatch: Profile | null;
  onSendMessage: (content: string) => void;
}

const MessageView: React.FC<MessageViewProps> = ({
  messages,
  currentUser,
  selectedMatch,
  onSendMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!selectedMatch) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          bgcolor: 'background.default',
        }}
      >
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Select a conversation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose a match from the list to start chatting
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  // Get dates in order
  const dates = Object.keys(groupedMessages).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Conversation Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Avatar
          src={selectedMatch.image || selectedMatch.photos[0]}
          alt={selectedMatch.name}
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {selectedMatch.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedMatch.role} at {selectedMatch.company}
          </Typography>
        </Box>
      </Box>

      {/* Message List */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        {dates.map(date => (
          <React.Fragment key={date}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                my: 2, 
                position: 'relative',
              }}
            >
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  px: 2, 
                  py: 0.5, 
                  bgcolor: 'background.default',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {new Date(date).toLocaleDateString([], { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
              <Divider 
                sx={{ 
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  zIndex: 0
                }} 
              />
            </Box>
            
            {groupedMessages[date].map((message) => (
              <MessageBubble
                key={message.id} 
                message={message}
                isOwnMessage={message.senderId === currentUser.id}
              />
            ))}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </Box>
  );
};

export default MessageView; 