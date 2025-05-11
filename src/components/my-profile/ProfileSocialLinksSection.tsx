import React, { useState } from 'react';
import { Paper, Stack, Typography, Chip, TextField, Button, InputAdornment, Box, Grid } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import type { Profile } from '../../types/index';

interface ProfileSocialLinksSectionProps {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const sectionPaper = {
    p: { xs: 2, md: 3 },
    borderRadius: 3,
    boxShadow: 2,
    bgcolor: 'background.paper',
    mb: 3,
};

const ProfileSocialLinksSection: React.FC<ProfileSocialLinksSectionProps> = ({ profile, setProfile }) => {
    const [socialLinkInput, setSocialLinkInput] = useState({ type: '', url: '' });

    const handleAddSocialLink = () => {
        if (socialLinkInput.type && socialLinkInput.url) {
            setProfile((prev) => ({
                ...prev,
                socialLinks: [...(prev.socialLinks || []), { ...socialLinkInput }]
            }));
            setSocialLinkInput({ type: '', url: '' });
        }
    };

    const handleDeleteSocialLink = (idx: number) => {
        setProfile((prev) => ({
            ...prev,
            socialLinks: (prev.socialLinks || []).filter((_, i) => i !== idx),
        }));
    };

    return (
        <Paper sx={sectionPaper}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <LinkIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} color="primary.main" letterSpacing={0.5}>
                    Social Links
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" mb={2}>
                {(profile.socialLinks || []).map((link, idx) => (
                    <Chip key={idx} label={link.type} onDelete={() => handleDeleteSocialLink(idx)} sx={{ mb: 1 }} />
                ))}
            </Stack>
            <Grid container spacing={1} alignItems="center">
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        size="small"
                        value={socialLinkInput.type}
                        onChange={e => setSocialLinkInput(l => ({ ...l, type: e.target.value }))}
                        placeholder="Type (e.g. linkedin)"
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        size="small"
                        value={socialLinkInput.url}
                        onChange={e => setSocialLinkInput(l => ({ ...l, url: e.target.value }))}
                        placeholder="URL"
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleAddSocialLink} fullWidth>
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProfileSocialLinksSection; 