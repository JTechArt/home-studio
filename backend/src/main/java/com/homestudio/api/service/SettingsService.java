package com.homestudio.api.service;

import com.homestudio.api.model.SiteSetting;
import com.homestudio.api.repository.SiteSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SettingsService {

    private final SiteSettingRepository settingRepository;

    public Map<String, String> getPublicSettings() {
        List<SiteSetting> settings = settingRepository.findAll();
        // Return public settings (contact info, address, about)
        return settings.stream()
                .collect(Collectors.toMap(SiteSetting::getKey, SiteSetting::getValue));
    }

    @Transactional
    public Map<String, String> updateSettings(Map<String, String> newSettings) {
        Map<String, String> updated = new HashMap<>();
        newSettings.forEach((key, value) -> {
            SiteSetting setting = settingRepository.findById(key)
                    .orElse(SiteSetting.builder().key(key).build());
            setting.setValue(value);
            settingRepository.save(setting);
            updated.put(key, value);
        });
        return updated;
    }
}
