package com.companydating.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "social_links")
public class SocialLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String type; // e.g., "linkedin", "github", "twitter"

    @Column(nullable = false)
    private String url;
} 