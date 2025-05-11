package com.companydating.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
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

    private String caption;
    private boolean isProfilePicture = false;
} 