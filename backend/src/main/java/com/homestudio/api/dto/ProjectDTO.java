package com.homestudio.api.dto;

import lombok.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public class ProjectDTO {

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class Response {
        private UUID id;
        private String projectCode;
        private String titleAm;
        private String titleRu;
        private String descriptionAm;
        private String descriptionRu;
        private CategoryDTO.Response category;
        private Boolean isPublished;
        private Boolean isFeatured;
        private Integer viewCount;
        private Integer sortOrder;
        private List<ImageResponse> images;
        private String coverImageUrl;
        private Instant createdAt;
        private Instant updatedAt;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class ImageResponse {
        private UUID id;
        private String url;
        private String thumbnailUrl;
        private Boolean isCover;
        private Integer sortOrder;
        private String originalFilename;
        private Integer width;
        private Integer height;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class CreateRequest {
        private UUID categoryId;
        private String titleAm;
        private String titleRu;
        private String descriptionAm;
        private String descriptionRu;
        private Boolean isPublished = false;
        private Boolean isFeatured = false;
        private Integer sortOrder = 0;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class UpdateRequest {
        private UUID categoryId;
        private String titleAm;
        private String titleRu;
        private String descriptionAm;
        private String descriptionRu;
        private Boolean isPublished;
        private Boolean isFeatured;
        private Integer sortOrder;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ReorderImagesRequest {
        private List<UUID> imageIds;
    }
}
