package com.companydating.controller;

import com.companydating.service.ImageService;
import com.companydating.service.UserService;
import com.companydating.model.User;
import com.companydating.security.UserPrincipal;
import com.companydating.model.Photo;
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

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            String imageUrl = imageService.uploadImage(file);

            // Append the image as a Photo object to the current user's photos
            User user = userService.getUserById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
            Set<Photo> photos = user.getPhotos();
            if (photos == null) photos = new HashSet<>();
            photos.add(new Photo(user, imageUrl, "Profile Photo", false));
            user.setPhotos(photos);
            userService.updateUser(user.getId(), user);

            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }
} 