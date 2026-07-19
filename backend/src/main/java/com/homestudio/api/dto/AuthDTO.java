package com.homestudio.api.dto;

import lombok.*;

public class AuthDTO {

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class LoginResponse {
        private String token;
        private String username;
        private String displayName;
    }
}
