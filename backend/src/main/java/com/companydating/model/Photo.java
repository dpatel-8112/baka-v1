package com.companydating.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "photos")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String url;

    private String description;
    private boolean profilePicture;

    public Photo(User user, String url, String description, boolean profilePicture) {
        this.user = user;
        this.url = url;
        this.description = description;
        this.profilePicture = profilePicture;
    }

    public boolean isProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(boolean profilePicture) {
        this.profilePicture = profilePicture;
    }
} 