package com.companydating.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "user")
@ToString(exclude = "user")
@Entity
@Table(name = "photos")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @Column(nullable = false)
    private String url;

    @Column
    private String description;

    @Column
    private boolean profilePicture = false;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Photo{" +
                "id=" + id +
                ", url='" + url + '\'' +
                ", description='" + description + '\'' +
                ", profilePicture=" + profilePicture +
                '}';
    }
} 