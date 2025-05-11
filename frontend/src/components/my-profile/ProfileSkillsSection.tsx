import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import type { Profile } from '../../types/index';

interface ProfileSkillsSectionProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const ALL_SKILLS = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby',
    'HTML', 'CSS', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Agile', 'UI/UX Design',
    'Project Management', 'Data Analysis', 'Machine Learning', 'DevOps', 'Mobile Development'
];

const ProfileSkillsSection: React.FC<ProfileSkillsSectionProps> = ({ profile, setProfile }) => {
    const handleToggleSkill = (skill: string) => {
        setProfile((prev) => {
            const skills = prev.skills || [];
            return skills.includes(skill)
                ? { ...prev, skills: skills.filter(s => s !== skill) }
                : { ...prev, skills: [...skills, skill] };
        });
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Skills
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {ALL_SKILLS.map((skill) => (
                    <Chip
                        key={skill}
                        label={skill}
                        onClick={() => handleToggleSkill(skill)}
                        variant={profile.skills?.includes(skill) ? 'filled' : 'outlined'}
                        sx={{
                            backgroundColor: profile.skills?.includes(skill) ? 'secondary.main' : 'none',
                            border: profile.skills?.includes(skill) ? 'none' : '1px solid secondary.main',
                            color: profile.skills?.includes(skill) ? 'white' : 'secondary.main',
                            '&:hover': {
                                backgroundColor: 'secondary.main',
                            },
                            transition: 'all 0.2s ease-in-out',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ProfileSkillsSection; 