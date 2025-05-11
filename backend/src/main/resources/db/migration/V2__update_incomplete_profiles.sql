-- Update profiles with missing names
UPDATE users 
SET name = 'Anonymous User' 
WHERE name IS NULL OR name = '';

-- Update profiles with missing bio
UPDATE users 
SET bio = 'No bio available' 
WHERE bio IS NULL OR bio = '';

-- Update profiles with missing about_me
UPDATE users 
SET about_me = 'No information available' 
WHERE about_me IS NULL OR about_me = '';

-- Update profiles with missing age
UPDATE users 
SET age = 18 
WHERE age IS NULL OR age < 18;

-- Update profiles with missing gender
UPDATE users 
SET gender = 'Not specified' 
WHERE gender IS NULL OR gender = '';

-- Update profiles with missing location
UPDATE users 
SET location = 'Location not specified' 
WHERE location IS NULL OR location = '';

-- Update profiles with missing company
UPDATE users 
SET company = 'Not specified' 
WHERE company IS NULL OR company = '';

-- Update profiles with missing department
UPDATE users 
SET department = 'Not specified' 
WHERE department IS NULL OR department = '';

-- Update profiles with missing education
UPDATE users 
SET education = 'Not specified' 
WHERE education IS NULL OR education = '';

-- Update profiles with missing years_of_experience
UPDATE users 
SET years_of_experience = 0 
WHERE years_of_experience IS NULL OR years_of_experience < 0;

-- Update profiles with missing compatibility_score
UPDATE users 
SET compatibility_score = 0 
WHERE compatibility_score IS NULL OR compatibility_score < 0;

-- Update profiles with missing phone
UPDATE users 
SET phone = 'Not provided' 
WHERE phone IS NULL OR phone = '';

-- Update profiles with missing created_at
UPDATE users 
SET created_at = CURRENT_TIMESTAMP 
WHERE created_at IS NULL;

-- Update profiles with missing updated_at
UPDATE users 
SET updated_at = CURRENT_TIMESTAMP 
WHERE updated_at IS NULL;

-- Update is_active and is_verified flags
UPDATE users 
SET is_active = true, 
    is_verified = false 
WHERE is_active IS NULL OR is_verified IS NULL; 