package de.asimmobilien.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;
    @Column(name = "email_verified", nullable = false)
    private boolean emailVerified = false;
    @Column(name = "verification_token", unique = true)
    private String verificationToken;
    @Column(name = "verification_token_expires_at")
    private LocalDateTime verificationTokenExpiresAt;
    @Column(name = "reset_password_token", unique = true)
    private String resetPasswordToken;
    @Column(name = "reset_password_token_expires_at")
    private LocalDateTime resetPasswordTokenExpiresAt;
    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private LocalDateTime createdAt;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public boolean isEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }
    public String getVerificationToken() { return verificationToken; }
    public void setVerificationToken(String verificationToken) { this.verificationToken = verificationToken; }
    public LocalDateTime getVerificationTokenExpiresAt() { return verificationTokenExpiresAt; }
    public void setVerificationTokenExpiresAt(LocalDateTime verificationTokenExpiresAt) { this.verificationTokenExpiresAt = verificationTokenExpiresAt; }
    public String getResetPasswordToken() { return resetPasswordToken; }
    public void setResetPasswordToken(String resetPasswordToken) { this.resetPasswordToken = resetPasswordToken; }
    public LocalDateTime getResetPasswordTokenExpiresAt() { return resetPasswordTokenExpiresAt; }
    public void setResetPasswordTokenExpiresAt(LocalDateTime resetPasswordTokenExpiresAt) { this.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
