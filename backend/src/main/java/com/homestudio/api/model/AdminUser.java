package com.homestudio.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "admin_users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class AdminUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "display_name", length = 100)
    private String displayName;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "last_login")
    private Instant lastLogin;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }
}
