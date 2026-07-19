package com.homestudio.api.service;

import com.homestudio.api.dto.StatsResponse;
import com.homestudio.api.repository.CategoryRepository;
import com.homestudio.api.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final ProjectRepository projectRepository;
    private final CategoryRepository categoryRepository;

    public StatsResponse getStats() {
        long totalProjects = projectRepository.count();
        long publishedProjects = projectRepository.countPublished();
        long totalCategories = categoryRepository.count();
        Long totalViews = projectRepository.totalViewCount();
        if (totalViews == null) {
            totalViews = 0L;
        }

        return StatsResponse.builder()
                .totalProjects(totalProjects)
                .publishedProjects(publishedProjects)
                .totalCategories(totalCategories)
                .totalViews(totalViews)
                .build();
    }
}
