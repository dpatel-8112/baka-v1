-- Create photos table if it doesn't exist
CREATE TABLE IF NOT EXISTS photos (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    url VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    profile_picture BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add some default photos for existing users
INSERT INTO photos (user_id, url, description, profile_picture)
SELECT 
    id,
    'https://picsum.photos/id/' || (id * 10) || '/800/800',
    'Profile picture',
    true
FROM users;

-- Add additional photos for each user
INSERT INTO photos (user_id, url, description, profile_picture)
SELECT 
    id,
    'https://picsum.photos/id/' || (id * 10 + 1) || '/800/800',
    'Additional photo 1',
    false
FROM users;

INSERT INTO photos (user_id, url, description, profile_picture)
SELECT 
    id,
    'https://picsum.photos/id/' || (id * 10 + 2) || '/800/800',
    'Additional photo 2',
    false
FROM users;

-- Update users table to add missing fields
ALTER TABLE users
ADD COLUMN IF NOT EXISTS role VARCHAR(255),
ADD COLUMN IF NOT EXISTS about_me TEXT,
ADD COLUMN IF NOT EXISTS interests TEXT[],
ADD COLUMN IF NOT EXISTS skills TEXT[],
ADD COLUMN IF NOT EXISTS languages TEXT[],
ADD COLUMN IF NOT EXISTS social_links JSONB,
ADD COLUMN IF NOT EXISTS projects JSONB;

-- Update existing users with default values
UPDATE users
SET 
    role = 'Software Engineer',
    about_me = 'Passionate about technology and innovation.',
    interests = ARRAY['Technology', 'Innovation', 'Problem Solving'],
    skills = ARRAY['Java', 'Spring Boot', 'PostgreSQL'],
    languages = ARRAY['English'],
    social_links = '{"linkedin": "https://linkedin.com/in/user", "github": "https://github.com/user"}'::jsonb,
    projects = '[{"name": "Sample Project", "description": "A sample project description", "link": "https://github.com/user/project"}]'::jsonb
WHERE role IS NULL; 