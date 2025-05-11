package com.companydating.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "social_links")
public class SocialLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String url;

    @Column
    private String platform;

    public SocialLink(User user, String type, String url, String platform) {
        this.user = user;
        this.type = type;
        this.url = url;
        this.platform = platform;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "SocialLink{" +
                "id=" + id +
                ", platform='" + platform + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
} 