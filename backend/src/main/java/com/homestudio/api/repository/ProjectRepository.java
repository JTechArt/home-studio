package com.homestudio.api.repository;

import com.homestudio.api.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {

    Optional<Project> findByProjectCode(String projectCode);

    @Query("SELECT p FROM Project p WHERE p.isPublished = true ORDER BY p.sortOrder ASC, p.createdAt DESC")
    Page<Project> findPublished(Pageable pageable);

    @Query("SELECT p FROM Project p WHERE p.isPublished = true AND p.category.id = :categoryId ORDER BY p.sortOrder ASC, p.createdAt DESC")
    Page<Project> findPublishedByCategory(@Param("categoryId") UUID categoryId, Pageable pageable);

    @Query("SELECT p FROM Project p WHERE p.isPublished = true AND p.isFeatured = true ORDER BY p.updatedAt DESC")
    List<Project> findFeatured();

    @Query("SELECT COUNT(p) FROM Project p WHERE p.isPublished = true")
    long countPublished();

    @Query("SELECT MAX(CAST(SUBSTRING(p.projectCode, LENGTH(p.category.code) + 2) AS integer)) FROM Project p WHERE p.category.code = :categoryCode")
    Integer findMaxSequenceByCategory(@Param("categoryCode") String categoryCode);

    @Modifying
    @Query("UPDATE Project p SET p.viewCount = p.viewCount + 1 WHERE p.id = :id")
    void incrementViewCount(@Param("id") UUID id);

    Page<Project> findAllByOrderBySortOrderAscCreatedAtDesc(Pageable pageable);

    @Query("SELECT p FROM Project p WHERE p.category.id = :categoryId ORDER BY p.sortOrder ASC, p.createdAt DESC")
    Page<Project> findByCategory(@Param("categoryId") UUID categoryId, Pageable pageable);

    @Query("SELECT SUM(p.viewCount) FROM Project p")
    Long totalViewCount();
}
