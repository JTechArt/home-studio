package com.homestudio.api.controller;

import com.homestudio.api.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/settings")
@RequiredArgsConstructor
public class PublicSettingsController {

    private final SettingsService settingsService;

    @GetMapping("/public")
    public ResponseEntity<Map<String, String>> getPublicSettings() {
        return ResponseEntity.ok(settingsService.getPublicSettings());
    }
}
