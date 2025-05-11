import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField, Button, Typography, Chip, Stack, Avatar, IconButton, InputAdornment, Paper, Divider, styled } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import InfoIcon from '@mui/icons-material/Info';
import InterestsIcon from '@mui/icons-material/Interests';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import LinkIcon from '@mui/icons-material/Link';
import ProfileCard from './home/ProfileCard';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Profile } from '../types/index';
import ProfileBasicInfoSection from './my-profile/ProfileBasicInfoSection';
import ProfileProfessionalInfoSection from './my-profile/ProfileProfessionalInfoSection';
import ProfileAboutSection from './my-profile/ProfileAboutSection';
import ProfilePhotosSection from './my-profile/ProfilePhotosSection';
import ProfileInterestsSection from './my-profile/ProfileInterestsSection';
import ProfileSkillsSection from './my-profile/ProfileSkillsSection';

const emptyProfile: Profile = {
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
  };

const sectionPaper = {
    p: { xs: 2, md: 3 },
    borderRadius: 3,
    boxShadow: 1,
    bgcolor: 'white',
    mb: 3,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
}));

const MyProfile: React.FC = () => {
    const [profile, setProfile] = useState<Profile>({ ...emptyProfile });
    const [interestInput, setInterestInput] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [languageInput, setLanguageInput] = useState('');
    const [socialLinkInput, setSocialLinkInput] = useState({ type: '', url: '' });
    const [projectInput, setProjectInput] = useState({ name: '', description: '', link: '' });

    // Handle image upload
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const urls = files.map((file) => URL.createObjectURL(file));
            setProfile((prev) => ({ ...prev, photos: [...prev.photos, ...urls] }));
            if (urls.length > 0 && !profile.image) {
                setProfile((prev) => ({ ...prev, image: urls[0] }));
            }
        }
    };

    // Remove photo
    const handleRemovePhoto = (index: number) => {
        setProfile((prev) => {
            const newPhotos = prev.photos.filter((_, i) => i !== index);
            return {
                ...prev,
                photos: newPhotos,
                image: newPhotos[0] || '',
            };
        });
    };

    // Add interest
    const handleAddInterest = () => {
        if (interestInput.trim()) {
            setProfile((prev) => ({ ...prev, interests: [...(prev.interests || []), interestInput.trim()] }));
            setInterestInput('');
        }
    };

    // Add skill
    const handleAddSkill = () => {
        if (skillInput.trim()) {
            setProfile((prev) => ({ ...prev, skills: [...(prev.skills || []), skillInput.trim()] }));
            setSkillInput('');
        }
    };

    // Add language
    const handleAddLanguage = () => {
        if (languageInput.trim()) {
            setProfile((prev) => ({ ...prev, languages: [...(prev.languages || []), languageInput.trim()] }));
            setLanguageInput('');
        }
    };

    // Add social link
    const handleAddSocialLink = () => {
        if (socialLinkInput.type && socialLinkInput.url) {
            setProfile((prev) => ({ ...prev, socialLinks: [...(prev.socialLinks || []), { ...socialLinkInput }] }));
            setSocialLinkInput({ type: '', url: '' });
        }
    };

    // Add project
    const handleAddProject = () => {
        if (projectInput.name && projectInput.description) {
            setProfile((prev) => ({ ...prev, projects: [...(prev.projects || []), { ...projectInput }] }));
            setProjectInput({ name: '', description: '', link: '' });
        }
    };

    // Add a function to calculate age from birthday
    const calculateAge = (birthday: string) => {
        if (!birthday) return 0;
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <Box sx={{ p: { xs: 1, md: 4 }, minHeight: '100vh', bgcolor: '#f6f8fb' }}>
            <Grid container spacing={4} alignItems="flex-start" sx={{ maxHeight: { md: 'calc(100vh - 64px)' }, overflowY: { md: 'auto' } }}>
                {/* Left: Form Sections */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Item>
                        {/* Basic Info */}
                        <ProfileBasicInfoSection profile={profile} setProfile={setProfile} calculateAge={calculateAge} />
                        {/* Professional Info */}
                        <ProfileProfessionalInfoSection profile={profile} setProfile={setProfile} />
                        {/* About */}
                        <ProfileAboutSection profile={profile} setProfile={setProfile} />
                        {/* Photos */}
                        <ProfilePhotosSection profile={profile} setProfile={setProfile} />
                        {/* Interests */}
                        <ProfileInterestsSection profile={profile} setProfile={setProfile} />
                        {/* Skills */}
                        <ProfileSkillsSection profile={profile} setProfile={setProfile} />
                        {/* Languages */}
                        <Paper sx={sectionPaper}>
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <LanguageIcon color="primary" />
                                <Typography variant="h6" fontWeight={700}>Languages</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                {(profile.languages || []).map((lang, idx) => (
                                    <Chip key={idx} label={lang} onDelete={() => setProfile(p => ({ ...p, languages: (p.languages || []).filter((_, i) => i !== idx) }))} />
                                ))}
                                <TextField
                                    size="small"
                                    value={languageInput}
                                    onChange={e => setLanguageInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleAddLanguage()}
                                    placeholder="Add language"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button onClick={handleAddLanguage}>Add</Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ width: 160 }}
                                />
                            </Stack>
                        </Paper>
                        {/* Social Links */}
                        <Paper sx={sectionPaper}>
                            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                                <LinkIcon color="primary" />
                                <Typography variant="h6" fontWeight={700}>Social Links</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                {(profile.socialLinks || []).map((link, idx) => (
                                    <Chip key={idx} label={link.type} onDelete={() => setProfile(p => ({ ...p, socialLinks: (p.socialLinks || []).filter((_, i) => i !== idx) }))} />
                                ))}
                                <TextField
                                    size="small"
                                    value={socialLinkInput.type}
                                    onChange={e => setSocialLinkInput(l => ({ ...l, type: e.target.value }))}
                                    placeholder="Type (e.g. linkedin)"
                                    sx={{ width: 120 }}
                                />
                                <TextField
                                    size="small"
                                    value={socialLinkInput.url}
                                    onChange={e => setSocialLinkInput(l => ({ ...l, url: e.target.value }))}
                                    placeholder="URL"
                                    sx={{ width: 180 }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button onClick={handleAddSocialLink}>Add</Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                        </Paper>
                    </Item>
                </Grid>
                {/* Right: Live Preview */}
                <Grid size={{ xs: 12, md: 5 }} sx={{
                    position: { md: 'sticky' },
                    top: { md: 0 },
                    alignSelf: { md: 'flex-start' },
                }}>
                    <Typography variant="h3" sx={{fontWeight: 700, color: 'primary.main', textAlign: 'center', letterSpacing: 1 }}>
                        Live Preview
                    </Typography>
                    {/* <Divider sx={{ mb: 2, width: '100%' }} /> */}

                    <Paper
                        elevation={4}
                        sx={{
                            p: { xs: 2, md: 4 },
                            borderRadius: 3,
                            bgcolor: 'transparent',
                            minHeight: 400,
                            boxShadow: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <ProfileCard profile={profile} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MyProfile; 