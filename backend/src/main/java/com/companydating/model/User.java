package com.companydating.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Email
    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    private String role;
    private String department;
    private String company;
    private String bio;
    private String aboutMe;
    private String location;
    private String education;
    private Integer yearsOfExperience;
    private LocalDate birthday;
    private String gender;

    @ElementCollection
    private Set<String> interests = new HashSet<>();

    @ElementCollection
    private Set<String> skills = new HashSet<>();

    @ElementCollection
    private Set<String> languages = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<SocialLink> socialLinks = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Project> projects = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Photo> photos = new HashSet<>();

    private boolean isVerified = false;
    private boolean isActive = true;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private String emailVerificationToken;
    private String resetPasswordToken;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }

    public boolean isActive() {
        return isActive;
    }
    public void setActive(boolean active) {
        this.isActive = active;
    }
    public boolean isVerified() {
        return isVerified;
    }
    public void setVerified(boolean verified) {
        this.isVerified = verified;
    }
    public Set<Photo> getPhotos() {
        return photos;
    }
    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public String getAboutMe() {
        return aboutMe;
    }
    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getEducation() {
        return education;
    }
    public void setEducation(String education) {
        this.education = education;
    }
    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }
    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }
    public Set<String> getInterests() {
        return interests;
    }
    public void setInterests(Set<String> interests) {
        this.interests = interests;
    }
    public Set<String> getSkills() {
        return skills;
    }
    public void setSkills(Set<String> skills) {
        this.skills = skills;
    }
    public Set<String> getLanguages() {
        return languages;
    }
    public void setLanguages(Set<String> languages) {
        this.languages = languages;
    }
    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
    }
    public LocalDate getBirthday() {
        return birthday;
    }
    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public Set<SocialLink> getSocialLinks() {
        return socialLinks;
    }
    public void setSocialLinks(Set<SocialLink> socialLinks) {
        this.socialLinks = socialLinks;
    }
    public Set<Project> getProjects() {
        return projects;
    }
    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }
    public String getEmailVerificationToken() {
        return emailVerificationToken;
    }
    public void setEmailVerificationToken(String emailVerificationToken) {
        this.emailVerificationToken = emailVerificationToken;
    }
    public String getResetPasswordToken() {
        return resetPasswordToken;
    }
    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }
} 