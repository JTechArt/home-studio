package com.homestudio.api.dto;

import lombok.*;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class StatsResponse {
    private long totalProjects;
    private long publishedProjects;
    private long totalCategories;
    private long totalViews;
}
