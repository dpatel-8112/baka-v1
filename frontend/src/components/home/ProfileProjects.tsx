import React from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';
import type { Project } from '../../types/index';

interface ProfileProjectsProps {
  projects?: Project[];
}

const ProfileProjects: React.FC<ProfileProjectsProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1.05rem', mb: 1 }}>
        Projects
      </Typography>
      {projects.map((project, index) => (
        <Box key={index} sx={{ mb: 1.5, p: 1.2, backgroundColor: '#f7fafd', borderRadius: 1.5, boxShadow: 0 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.7, fontSize: '0.98rem', color: 'text.primary' }}>
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 1, lineHeight: 1.7, fontSize: '0.95rem' }}>
            {project.description}
          </Typography>
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <Chip
                label="View Project"
                color="primary"
                size="small"
                clickable
                variant="outlined"
                sx={{ borderRadius: '10px', fontSize: '0.93rem', bgcolor: '#fff', color: 'primary.main', fontWeight: 500, borderColor: 'primary.light', boxShadow: 0, '&:hover': { bgcolor: 'primary.light', color: 'primary.dark', borderColor: 'primary.main' } }}
              />
            </Link>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ProfileProjects; 