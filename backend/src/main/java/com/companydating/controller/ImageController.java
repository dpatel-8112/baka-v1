package com.companydating.controller;

import com.companydating.service.ImageService;
import com.companydating.service.UserService;
import com.companydating.model.User;
import com.companydating.security.UserPrincipal;
import com.companydating.model.Photo;
import com.companydating.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @Autowired
    private UserService userService;

    @Autowired
    private PhotoRepository photoRepository;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        System.out.println("=== Upload endpoint hit ===");
        try {
            String imageUrl = imageService.uploadImage(file);

            // Append the image as a Photo object to the current user's photos
            User user = userService.getUserById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
            System.out.println("User ID: " + user.getId());
            Photo photo = new Photo(user, imageUrl, "Profile Photo", false);
            System.out.println("Photo user: " + photo.getUser());
            System.out.println("Photo user ID: " + (photo.getUser() != null ? photo.getUser().getId() : "null"));
            photoRepository.save(photo);
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }

    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long photoId) {
        photoRepository.deleteById(photoId);
        return ResponseEntity.ok().build();
    }
} 