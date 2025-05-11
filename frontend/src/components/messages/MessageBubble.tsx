import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import type { Message } from '../../types/index';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        mb: 1.5,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          px: 2,
          maxWidth: '75%',
          bgcolor: isOwnMessage ? 'primary.main' : 'grey.100',
          color: isOwnMessage ? 'primary.contrastText' : 'text.primary',
          borderRadius: 2,
          borderTopRightRadius: isOwnMessage ? 0 : 2,
          borderTopLeftRadius: isOwnMessage ? 2 : 0,
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        <Box 
          sx={{ 
            mt: 0.5, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end',
            gap: 0.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: isOwnMessage ? 'primary.contrastText' : 'text.secondary',
              opacity: 0.8,
            }}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
          
          {isOwnMessage && (
            <DoneAllIcon 
              sx={{ 
                fontSize: 14, 
                color: message.isRead ? 'success.main' : 'primary.contrastText',
                opacity: message.isRead ? 1 : 0.6,
              }} 
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MessageBubble; 