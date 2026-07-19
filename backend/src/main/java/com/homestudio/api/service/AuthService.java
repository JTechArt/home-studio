package com.homestudio.api.service;

import com.homestudio.api.dto.AuthDTO;
import com.homestudio.api.model.AdminUser;
import com.homestudio.api.repository.AdminUserRepository;
import com.homestudio.api.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthDTO.LoginResponse login(AuthDTO.LoginRequest request) {
        AdminUser user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        user.setLastLogin(Instant.now());
        userRepository.save(user);

        String token = tokenProvider.generateToken(user.getUsername());

        return AuthDTO.LoginResponse.builder()
                .token(token)
                .username(user.getUsername())
                .displayName(user.getDisplayName())
                .build();
    }
}
