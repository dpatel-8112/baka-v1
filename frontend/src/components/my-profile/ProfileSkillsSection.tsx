import React, { useState } from 'react';
import { Paper, Stack, Typography, Chip, TextField, Button, InputAdornment } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import type { Profile } from '../../types/index';

interface ProfileSkillsSectionProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const sectionPaper = {
    p: { xs: 2, md: 3 },
    borderRadius: 3,
    boxShadow: 1,
    bgcolor: 'white',
    mb: 3,
};

const ALL_SKILLS = [
  'React', 'Node.js', 'Python', 'AWS', 'Docker', 'TypeScript', 'GraphQL', 'MongoDB',
  'Product Management', 'Agile', 'Data Analysis', 'User Research', 'Strategy',
  'Java', 'C++', 'Kubernetes', 'SQL', 'HTML', 'CSS', 'JavaScript'
];

const ProfileSkillsSection: React.FC<ProfileSkillsSectionProps> = ({ profile, setProfile }) => {
    const [skillInput, setSkillInput] = useState('');

    const handleToggleSkill = (skill: string) => {
        setProfile((prev) => {
            const skills = prev.skills || [];
            return skills.includes(skill)
                ? { ...prev, skills: skills.filter(s => s !== skill) }
                : { ...prev, skills: [...skills, skill] };
        });
    };

    return (
        <Paper sx={sectionPaper}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <SchoolIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>Skills</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                {ALL_SKILLS.map((skill) => (
                    <Chip
                        key={skill}
                        label={skill}
                        color={profile.skills?.includes(skill) ? 'primary' : 'default'}
                        onClick={() => handleToggleSkill(skill)}
                        sx={{ mb: 1, cursor: 'pointer' }}
                    />
                ))}
            </Stack>
        </Paper>
    );
};

export default ProfileSkillsSection; 