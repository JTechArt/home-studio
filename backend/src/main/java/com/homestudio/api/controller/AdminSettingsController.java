package com.homestudio.api.controller;

import com.homestudio.api.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/settings")
@RequiredArgsConstructor
public class AdminSettingsController {

    private final SettingsService settingsService;

    @PutMapping
    public ResponseEntity<Map<String, String>> updateSettings(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(settingsService.updateSettings(request));
    }
}
