export interface SocialLink {
  type: string;
  url: string;
}

export interface Project {
  name: string;
  description: string;
  link?: string;
}

export interface Photo {
  id: number;
  url: string;
  description: string;
  profilePicture: boolean;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  role: string;
  department: string;
  company: string;
  image: string;
  photos: Photo[];
  bio: string;
  aboutMe: string;
  location: string;
  education: string;
  yearsOfExperience: number;
  compatibilityScore: number;
  interests: string[];
  skills: string[];
  email?: string;
  phone?: string;
  gender?: string;
  birthday?: string;
  languages?: string[];
  socialLinks?: SocialLink[];
  projects?: Project[];
  isVerified?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  profile: Profile;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'rejected';
  lastMessage?: Message;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'like';
  content: string;
  timestamp: Date;
  isRead: boolean;
  relatedId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile: Profile;
  matches: Match[];
  notifications: Notification[];
} 