import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import Messages from './components/Messages';
import Settings from './components/Settings';
import NotificationCenter from './components/NotificationCenter';
import LeftNav from './components/LeftNav';
import { Box, Button, MenuItem } from '@mui/material';
import { Profile, Match, Notification, Message } from './types/index';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MyProfile from './components/MyProfile';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

function AppContent() {
  const [currentView, setCurrentView] = useState<string>('/');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { login, register, logout, user } = useAuth();

  // Define profiles first
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 28,
      role: 'Software Engineer',
      department: 'Engineering',
      company: 'Tech Corp',
      image: 'https://picsum.photos/id/7/600/600',
      photos: [
        'https://picsum.photos/id/1/800/800',
        'https://picsum.photos/id/2/800/800',
        'https://picsum.photos/id/3/800/800',
        'https://picsum.photos/id/4/800/800',
        'https://picsum.photos/id/5/800/800',
        'https://picsum.photos/id/6/800/800'
      ],
      bio: 'Passionate about building scalable applications and solving complex problems. Love hiking and photography in my free time.',
      aboutMe: 'I am a full-stack developer with a passion for creating user-friendly applications. When I\'m not coding, you can find me exploring hiking trails or capturing beautiful landscapes with my camera.',
      location: 'San Francisco, CA',
      education: 'MS Computer Science, Stanford',
      yearsOfExperience: 5,
      compatibilityScore: 95,
      interests: ['Machine Learning', 'Cloud Computing', 'UI/UX Design', 'Photography', 'Hiking', 'Travel'],
      skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'TypeScript', 'GraphQL', 'MongoDB'],
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      gender: 'Female',
      birthday: '1995-06-15',
      languages: ['English', 'Spanish', 'French'],
      socialLinks: [
        { type: 'linkedin', url: 'https://linkedin.com/in/sarahjohnson' },
        { type: 'github', url: 'https://github.com/sarahjohnson' },
        { type: 'twitter', url: 'https://twitter.com/sarahjohnson' },
        { type: 'website', url: 'https://sarahjohnson.dev' }
      ],
      projects: [
        {
          name: 'AI-Powered Task Manager',
          description: 'A smart task management application that uses AI to prioritize and organize tasks.',
          link: 'https://github.com/sarahjohnson/ai-task-manager'
        },
        {
          name: 'Cloud Infrastructure Dashboard',
          description: 'Real-time monitoring and management dashboard for cloud resources.',
          link: 'https://github.com/sarahjohnson/cloud-dashboard'
        }
      ],
      isVerified: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 32,
      role: 'Product Manager',
      department: 'Product',
      company: 'Innovate Inc',
      image: 'https://picsum.photos/id/1/400/400',
      photos: [
        'https://picsum.photos/id/1/400/400',
        'https://picsum.photos/id/1/400/400',
        'https://picsum.photos/id/1/400/400',
        'https://picsum.photos/id/1/400/400',
        'https://picsum.photos/id/1/400/400'
      ],
      bio: 'Product leader with a strong technical background. Passionate about creating products that make a difference.',
      aboutMe: 'I combine technical expertise with product vision to build solutions that users love. My background in engineering helps me bridge the gap between technical and business requirements.',
      location: 'New York, NY',
      education: 'MBA, Harvard Business School',
      yearsOfExperience: 8,
      compatibilityScore: 88,
      interests: ['Product Strategy', 'User Research', 'Data Analytics', 'Skiing', 'Chess'],
      skills: ['Product Management', 'Agile', 'Data Analysis', 'User Research', 'Strategy'],
      email: 'michael.chen@innovateinc.com',
      phone: '+1 (555) 987-6543',
      gender: 'Male',
      birthday: '1991-03-22',
      languages: ['English', 'Mandarin', 'Japanese'],
      socialLinks: [
        { type: 'linkedin', url: 'https://linkedin.com/in/michaelchen' },
        { type: 'twitter', url: 'https://twitter.com/michaelchen' }
      ],
      projects: [
        {
          name: 'Product Analytics Platform',
          description: 'A comprehensive platform for tracking and analyzing product metrics.',
          link: 'https://github.com/michaelchen/product-analytics'
        }
      ],
      isVerified: true
    }
  ]);

  // Then use profiles in the matches state
  const [matches, setMatches] = useState<Match[]>([]);

  // Sample messages for testing
  const [mockMessages, setMockMessages] = useState<Message[]>([
    // Messages with Sarah Johnson
    {
      id: '1',
      senderId: '1', // Sarah Johnson
      receiverId: 'current-user-id',
      content: "Hi there! I saw you're also into cloud computing. What projects are you working on?",
      timestamp: new Date(Date.now() - 3600000 * 24), // 1 day ago
      isRead: true
    },
    {
      id: '2',
      senderId: 'current-user-id',
      receiverId: '1', // Sarah Johnson
      content: "Hey Sarah! Yes, I'm currently building a serverless architecture for a new app. How about you?",
      timestamp: new Date(Date.now() - 3600000 * 23), // 23 hours ago
      isRead: true
    },
    {
      id: '3',
      senderId: '1', // Sarah Johnson
      receiverId: 'current-user-id',
      content: "That sounds interesting! I'm working on a multi-cloud solution for data processing. Maybe we could collaborate sometime.",
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      isRead: false
    },
    // Messages with Michael Chen
    {
      id: '4',
      senderId: '2', // Michael Chen
      receiverId: 'current-user-id',
      content: "Hello! I noticed we have some common interests in product strategy. Would love to chat about your experience!",
      timestamp: new Date(Date.now() - 3600000 * 10), // 10 hours ago
      isRead: true
    },
    {
      id: '5',
      senderId: 'current-user-id',
      receiverId: '2', // Michael Chen
      content: "Hi Michael! Yes, I've been working on some interesting product strategy frameworks recently. Happy to discuss!",
      timestamp: new Date(Date.now() - 3600000 * 8), // 8 hours ago
      isRead: true
    },
    {
      id: '6',
      senderId: '2', // Michael Chen
      receiverId: 'current-user-id',
      content: "Great! I've been exploring ways to integrate data analytics more deeply into product decisions. Have you done anything in that area?",
      timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
      isRead: true
    }
  ]);

  const [currentProfileIndex, setCurrentProfileIndex] = useState<number>(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Create a proper match with necessary data for the messages list
      const newMatch: Match = {
        id: `match-${Date.now()}`,
        userId: user?.id || 'current-user-id',
        matchedUserId: profiles[currentProfileIndex].id,
        profile: profiles[currentProfileIndex],
        timestamp: new Date(),
        status: 'accepted', // Set as accepted for immediate visibility
        lastMessage: {
          id: `msg-${Date.now()}`,
          senderId: 'system',
          receiverId: user?.id || 'current-user-id',
          content: `You matched with ${profiles[currentProfileIndex].name}! Say hello!`,
          timestamp: new Date(),
          isRead: false
        }
      };

      setMatches((prev) => [...prev, newMatch]);

      // Create a notification for the new match
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId: user?.id || 'current-user-id',
        type: 'match',
        content: `You matched with ${profiles[currentProfileIndex].name}!`,
        timestamp: new Date(),
        isRead: false,
        relatedId: profiles[currentProfileIndex].id
      };

      setNotifications((prev) => [...prev, newNotification]);
    }

    // Move to next profile
    setCurrentProfileIndex((prev) => prev + 1);
  };

  const handleNotificationClick = (): void => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const handleSettingsSave = (settings: any): void => {
    console.log('Settings saved:', settings);
  };

  // Handler for sending a message (mock implementation)
  const handleSendMessage = (content: string, matchId?: string): void => {
    // Default to Sarah Johnson if no matchId is provided
    const receiverId = matchId || '1';

    // Create a new message
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user-id',
      receiverId: receiverId,
      content: content,
      timestamp: new Date(),
      isRead: false,
    };

    // Add the message to the list
    setMockMessages(prev => [...prev, newMessage]);

    // Update the last message in the match
    setMatches(prev => prev.map(match =>
      match.matchedUserId === receiverId
        ? { ...match, lastMessage: newMessage }
        : match
    ));
  };

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      bgcolor: 'background.default',
      overflow: 'hidden'
    }}>
      {user && (
        <LeftNav
          activePage={currentView}
          onPageChange={setCurrentView}
          unreadNotifications={notifications.filter((n) => !n.isRead).length}
          onLogout={logout}
        />
      )}
      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        width: user ? { sm: `calc(100% - 280px)` } : '100%',
        ml: user ? { sm: '280px' } : 0,
        height: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Routes>
          <Route path="/auth" element={
            <Auth
              onLogin={login}
              onRegister={register}
            />
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Home
                profiles={profiles}
                onSwipe={handleSwipe}
              />
            </ProtectedRoute>
          } />
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages
                messages={mockMessages}
                matches={matches}
                currentUser={{ ...profiles[0], id: 'current-user-id' }} // Use a consistent user ID
                onSendMessage={handleSendMessage}
              />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings
                onSave={handleSettingsSave}
              />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <NotificationCenter
                notifications={notifications}
                onClose={() => { }}
                onNotificationClick={handleNotificationClick}
              />
            </ProtectedRoute>
          } />
          <Route path='/my-profile' element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;