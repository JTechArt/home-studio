package com.homestudio.api.repository;

import com.homestudio.api.model.ProjectImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.UUID;

public interface ProjectImageRepository extends JpaRepository<ProjectImage, UUID> {
    List<ProjectImage> findByProjectIdOrderBySortOrderAsc(UUID projectId);

    @Modifying
    @Query("UPDATE ProjectImage pi SET pi.isCover = false WHERE pi.project.id = :projectId")
    void clearCoverForProject(@Param("projectId") UUID projectId);
}
