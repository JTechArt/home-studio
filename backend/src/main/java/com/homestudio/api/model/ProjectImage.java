package com.homestudio.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "project_images")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ProjectImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "file_path", nullable = false, length = 500)
    private String filePath;

    @Column(name = "thumbnail_path", length = 500)
    private String thumbnailPath;

    @Column(name = "is_cover")
    private Boolean isCover = false;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    @Column(name = "original_filename", length = 255)
    private String originalFilename;

    @Column(name = "file_size")
    private Long fileSize;

    @Column
    private Integer width;

    @Column
    private Integer height;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }
}
