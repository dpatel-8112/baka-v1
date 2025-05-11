import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import MessagesComponent from './messages/Messages';
import type { Message, Profile, Match } from '../types';

interface MessagesProps {
  currentUser: Profile;
  matches?: Match[];
  messages?: Message[];
  onSendMessage?: (content: string, matchId?: string) => void;
}

const Messages: React.FC<MessagesProps> = ({
  currentUser,
  matches = [],
  messages = [],
  onSendMessage = () => {},
}) => {
  // Transform flat messages list into a map by match ID
  const [messagesByMatchId, setMessagesByMatchId] = useState<Record<string, Message[]>>({});
  
  // Prepare messages data when props change
  useEffect(() => {
    const messageMap: Record<string, Message[]> = {};
    
    messages.forEach(message => {
      const matchId = message.senderId === currentUser.id 
        ? message.receiverId 
        : message.senderId;
      
      if (!messageMap[matchId]) {
        messageMap[matchId] = [];
      }
      
      messageMap[matchId].push(message);
    });
    
    // Sort messages by timestamp
    Object.keys(messageMap).forEach(matchId => {
      messageMap[matchId].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });
    
    setMessagesByMatchId(messageMap);
  }, [messages, currentUser.id]);
  
  // Handler for marking messages as read
  const handleMarkAsRead = (messageIds: string[]) => {
    // In a real app, this would call an API to mark messages as read
    console.log('Marking messages as read:', messageIds);
  };
  
  // Handler for sending messages
  const handleSendMessage = (matchId: string, content: string) => {
    // Call the parent component's onSendMessage callback with the matchId
    onSendMessage(content, matchId);
    
    // In a real app with a backend, we'd wait for the message to be saved
    // and returned with an ID. For now, we'll simulate optimistic updates
    const newMessage: Message = {
      id: `temp-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: matchId,
      content,
      timestamp: new Date(),
      isRead: false,
    };
    
    // Update local state optimistically
    setMessagesByMatchId(prev => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), newMessage],
    }));
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)' }}>
      <MessagesComponent
        currentUser={currentUser}
        matches={matches}
        messages={messagesByMatchId}
        onSendMessage={handleSendMessage}
        onMarkAsRead={handleMarkAsRead}
      />
    </Box>
  );
};

export default Messages; 