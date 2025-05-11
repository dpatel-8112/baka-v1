package com.companydating.service.impl;

import com.companydating.model.User;
import com.companydating.model.Photo;
import com.companydating.repository.UserRepository;
import com.companydating.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.HashSet;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    @Transactional
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Update fields
        existingUser.setName(user.getName());
        existingUser.setRole(user.getRole());
        existingUser.setDepartment(user.getDepartment());
        existingUser.setCompany(user.getCompany());
        existingUser.setBio(user.getBio());
        existingUser.setAboutMe(user.getAboutMe());
        existingUser.setLocation(user.getLocation());
        existingUser.setEducation(user.getEducation());
        existingUser.setYearsOfExperience(user.getYearsOfExperience());
        existingUser.setBirthday(user.getBirthday());
        existingUser.setGender(user.getGender());
        existingUser.setInterests(user.getInterests());
        existingUser.setSkills(user.getSkills());
        existingUser.setLanguages(user.getLanguages());
        existingUser.setSocialLinks(user.getSocialLinks());
        existingUser.setProjects(user.getProjects());
        // existingUser.setPhotos(user.getPhotos());
        existingUser.setVerified(user.isVerified());
        existingUser.setPhone(user.getPhone());
        existingUser.setAge(user.getAge());
        existingUser.setCompatibilityScore(user.getCompatibilityScore());
        // Do not update id, email, or password here
        return userRepository.save(existingUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Initialize photos for each user if they don't have any
        for (User user : users) {
            if (user.getPhotos() == null) {
                user.setPhotos(new HashSet<>());
            }
        }
        return users;
    }

    @Override
    @Transactional
    public User uploadProfilePicture(Long userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);

            // Save file
            Files.copy(file.getInputStream(), filePath);

            // Update user's profile picture
            user.getPhotos().stream()
                    .filter(photo -> photo.isProfilePicture())
                    .forEach(photo -> photo.setProfilePicture(false));

            // Add new profile picture
            user.getPhotos().add(new Photo(user, filePath.toString(), "Profile Picture", true));

            return userRepository.save(user);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile picture", e);
        }
    }

    @Override
    @Transactional
    public void verifyEmail(String token) {
        User user = userRepository.findByEmailVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));
        user.setVerified(true);
        user.setEmailVerificationToken(null);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        String token = UUID.randomUUID().toString();
        user.setResetPasswordToken(token);
        userRepository.save(user);
        // TODO: Send password reset email
    }

    @Override
    @Transactional
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid reset token"));
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUserStatus(Long userId, boolean isActive) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(isActive);
        userRepository.save(user);
    }

    @Override
    public List<User> findPotentialMatches(Long userId) {
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // TODO: Implement matching algorithm based on:
        // 1. Department compatibility
        // 2. Skills overlap
        // 3. Interests overlap
        // 4. Experience level
        // 5. Location proximity
        
        return userRepository.findAll().stream()
                .filter(user -> !user.getId().equals(userId))
                .filter(user -> user.isActive())
                .toList();
    }

    @Override
    public int calculateCompatibilityScore(User user1, User user2) {
        int score = 0;
        
        // Department compatibility (30 points)
        if (user1.getDepartment().equals(user2.getDepartment())) {
            score += 30;
        }
        
        // Skills overlap (30 points)
        int commonSkills = (int) user1.getSkills().stream()
                .filter(skill -> user2.getSkills().contains(skill))
                .count();
        score += (commonSkills * 10);
        
        // Interests overlap (20 points)
        int commonInterests = (int) user1.getInterests().stream()
                .filter(interest -> user2.getInterests().contains(interest))
                .count();
        score += (commonInterests * 5);
        
        // Experience level compatibility (10 points)
        int experienceDiff = Math.abs(user1.getYearsOfExperience() - user2.getYearsOfExperience());
        score += Math.max(0, 10 - experienceDiff);
        
        // Location proximity (10 points)
        if (user1.getLocation().equals(user2.getLocation())) {
            score += 10;
        }
        
        return Math.min(100, score);
    }
} 