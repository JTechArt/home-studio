package com.homestudio.api.service;

import com.homestudio.api.dto.ProjectDTO;
import com.homestudio.api.model.Category;
import com.homestudio.api.model.Project;
import com.homestudio.api.model.ProjectImage;
import com.homestudio.api.repository.CategoryRepository;
import com.homestudio.api.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final CategoryRepository categoryRepository;

    public Page<ProjectDTO.Response> getPublishedProjects(UUID categoryId, Pageable pageable) {
        Page<Project> projects;
        if (categoryId != null) {
            projects = projectRepository.findPublishedByCategory(categoryId, pageable);
        } else {
            projects = projectRepository.findPublished(pageable);
        }
        return projects.map(this::toResponse);
    }

    public List<ProjectDTO.Response> getFeaturedProjects() {
        return projectRepository.findFeatured().stream().map(this::toResponse).toList();
    }

    public ProjectDTO.Response getByCode(String code) {
        Project project = projectRepository.findByProjectCode(code)
                .orElseThrow(() -> new RuntimeException("Project not found: " + code));
        return toResponse(project);
    }

    @Transactional
    public void incrementView(UUID id) {
        projectRepository.incrementViewCount(id);
    }

    // Admin methods
    public Page<ProjectDTO.Response> getAllProjects(UUID categoryId, Pageable pageable) {
        Page<Project> projects;
        if (categoryId != null) {
            projects = projectRepository.findByCategory(categoryId, pageable);
        } else {
            projects = projectRepository.findAllByOrderBySortOrderAscCreatedAtDesc(pageable);
        }
        return projects.map(this::toResponse);
    }

    public ProjectDTO.Response getById(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return toResponse(project);
    }

    @Transactional
    public ProjectDTO.Response create(ProjectDTO.CreateRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        String projectCode = generateProjectCode(category.getCode());

        Project project = Project.builder()
                .projectCode(projectCode)
                .category(category)
                .titleAm(request.getTitleAm())
                .titleRu(request.getTitleRu())
                .descriptionAm(request.getDescriptionAm())
                .descriptionRu(request.getDescriptionRu())
                .isPublished(request.getIsPublished())
                .isFeatured(request.getIsFeatured())
                .sortOrder(request.getSortOrder())
                .build();

        return toResponse(projectRepository.save(project));
    }

    @Transactional
    public ProjectDTO.Response update(UUID id, ProjectDTO.UpdateRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            project.setCategory(category);
        }
        if (request.getTitleAm() != null) project.setTitleAm(request.getTitleAm());
        if (request.getTitleRu() != null) project.setTitleRu(request.getTitleRu());
        if (request.getDescriptionAm() != null) project.setDescriptionAm(request.getDescriptionAm());
        if (request.getDescriptionRu() != null) project.setDescriptionRu(request.getDescriptionRu());
        if (request.getIsPublished() != null) project.setIsPublished(request.getIsPublished());
        if (request.getIsFeatured() != null) project.setIsFeatured(request.getIsFeatured());
        if (request.getSortOrder() != null) project.setSortOrder(request.getSortOrder());

        return toResponse(projectRepository.save(project));
    }

    @Transactional
    public void delete(UUID id) {
        projectRepository.deleteById(id);
    }

    private String generateProjectCode(String categoryCode) {
        Integer maxSeq = projectRepository.findMaxSequenceByCategory(categoryCode);
        int nextSeq = (maxSeq != null ? maxSeq : 0) + 1;
        return String.format("%s-%03d", categoryCode, nextSeq);
    }

    public ProjectDTO.Response toResponse(Project project) {
        String coverUrl = project.getImages().stream()
                .filter(img -> Boolean.TRUE.equals(img.getIsCover()))
                .findFirst()
                .or(() -> project.getImages().stream().findFirst())
                .map(img -> "/uploads/" + img.getThumbnailPath())
                .orElse(null);

        return ProjectDTO.Response.builder()
                .id(project.getId())
                .projectCode(project.getProjectCode())
                .titleAm(project.getTitleAm())
                .titleRu(project.getTitleRu())
                .descriptionAm(project.getDescriptionAm())
                .descriptionRu(project.getDescriptionRu())
                .category(com.homestudio.api.dto.CategoryDTO.Response.builder()
                        .id(project.getCategory().getId())
                        .code(project.getCategory().getCode())
                        .nameAm(project.getCategory().getNameAm())
                        .nameRu(project.getCategory().getNameRu())
                        .build())
                .isPublished(project.getIsPublished())
                .isFeatured(project.getIsFeatured())
                .viewCount(project.getViewCount())
                .sortOrder(project.getSortOrder())
                .coverImageUrl(coverUrl)
                .images(project.getImages().stream().map(this::toImageResponse).toList())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }

    private ProjectDTO.ImageResponse toImageResponse(ProjectImage img) {
        return ProjectDTO.ImageResponse.builder()
                .id(img.getId())
                .url("/uploads/" + img.getFilePath())
                .thumbnailUrl(img.getThumbnailPath() != null ? "/uploads/" + img.getThumbnailPath() : null)
                .isCover(img.getIsCover())
                .sortOrder(img.getSortOrder())
                .originalFilename(img.getOriginalFilename())
                .width(img.getWidth())
                .height(img.getHeight())
                .build();
    }
}
