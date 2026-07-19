package com.homestudio.api.config;

import com.homestudio.api.model.AdminUser;
import com.homestudio.api.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AdminUserInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final AdminUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.password:}")
    private String envAdminPassword;

    @Override
    public void run(String... args) {
        if (envAdminPassword != null && !envAdminPassword.trim().isEmpty()) {
            Optional<AdminUser> adminOpt = userRepository.findByUsername("admin");
            if (adminOpt.isPresent()) {
                AdminUser admin = adminOpt.get();
                if (!passwordEncoder.matches(envAdminPassword, admin.getPasswordHash())) {
                    log.info("Updating admin password in database to match environment configuration.");
                    admin.setPasswordHash(passwordEncoder.encode(envAdminPassword));
                    userRepository.save(admin);
                }
            } else {
                log.info("Admin user not found. Creating a new admin user from environment configuration.");
                AdminUser admin = AdminUser.builder()
                        .username("admin")
                        .passwordHash(passwordEncoder.encode(envAdminPassword))
                        .displayName("Administrator")
                        .build();
                userRepository.save(admin);
            }
        }
    }
}
