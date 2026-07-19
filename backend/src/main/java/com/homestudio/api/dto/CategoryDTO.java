package com.homestudio.api.dto;

import lombok.*;
import java.util.UUID;

public class CategoryDTO {

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class Response {
        private UUID id;
        private String code;
        private String nameAm;
        private String nameRu;
        private Integer sortOrder;
        private long projectCount;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class CreateRequest {
        private String code;
        private String nameAm;
        private String nameRu;
        private Integer sortOrder;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class UpdateRequest {
        private String nameAm;
        private String nameRu;
        private Integer sortOrder;
    }
}
