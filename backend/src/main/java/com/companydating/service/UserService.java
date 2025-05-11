package com.companydating.service;

import com.companydating.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    List<User> getAllUsers();
    User uploadProfilePicture(Long userId, MultipartFile file);
    void verifyEmail(String token);
    void requestPasswordReset(String email);
    void resetPassword(String token, String newPassword);
    void updateUserStatus(Long userId, boolean isActive);
    List<User> findPotentialMatches(Long userId);
    int calculateCompatibilityScore(User user1, User user2);
} 