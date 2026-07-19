package com.homestudio.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "site_settings")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class SiteSetting {

    @Id
    @Column(length = 100)
    private String key;

    @Column(columnDefinition = "TEXT")
    private String value;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    @PreUpdate
    protected void onSave() {
        updatedAt = Instant.now();
    }
}
