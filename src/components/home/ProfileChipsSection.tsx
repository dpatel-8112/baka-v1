import React from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';
import type { SocialLink } from '../../types/index';

interface ProfileChipsSectionProps {
  interests: string[];
  skills: string[];
  languages?: string[];
  socialLinks?: SocialLink[];
}

const ProfileChipsSection: React.FC<ProfileChipsSectionProps> = ({ interests, skills, languages, socialLinks }) => (
  <>
    <Box sx={{ mb: 2.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.05rem', mb: 1 }}>
        Interests
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mb: 1.5 }}>
        {interests.map((interest, index) => (
          <Chip
            key={index}
            label={interest}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ borderRadius: '10px', fontSize: '0.93rem', bgcolor: '#fff', color: 'primary.main', fontWeight: 500, borderColor: 'primary.light', boxShadow: 0, '&:hover': { bgcolor: 'primary.light', color: 'primary.dark', borderColor: 'primary.main' } }}
          />
        ))}
      </Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.05rem', mb: 1 }}>
        Skills
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mb: 1.5 }}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            color="secondary"
            variant="outlined"
            size="small"
            sx={{ borderRadius: '10px', fontSize: '0.93rem', bgcolor: '#fff', color: 'secondary.main', fontWeight: 500, borderColor: 'secondary.light', boxShadow: 0, '&:hover': { bgcolor: 'secondary.light', color: 'secondary.dark', borderColor: 'secondary.main' } }}
          />
        ))}
      </Box>
      {languages && languages.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.05rem', mb: 1 }}>
            Languages
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mb: 1.5 }}>
            {languages.map((language, index) => (
              <Chip
                key={index}
                label={language}
                variant="outlined"
                size="small"
                sx={{ borderRadius: '10px', fontSize: '0.93rem', bgcolor: '#fff', color: 'text.primary', fontWeight: 500, borderColor: '#e0e0e0', boxShadow: 0 }}
              />
            ))}
          </Box>
        </>
      )}
      {socialLinks && socialLinks.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.05rem', mb: 1 }}>
            Social Links
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Chip
                  label={link.type}
                  color="success"
                  variant="outlined"
                  size="small"
                  clickable
                  sx={{ borderRadius: '10px', fontSize: '0.93rem', bgcolor: '#fff', color: 'success.main', fontWeight: 500, borderColor: 'success.light', boxShadow: 0, '&:hover': { bgcolor: 'success.light', color: 'success.dark', borderColor: 'success.main' } }}
                />
              </Link>
            ))}
          </Box>
        </>
      )}
    </Box>
  </>
);

export default ProfileChipsSection; 