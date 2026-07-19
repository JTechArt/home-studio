package com.homestudio.api.controller;

import com.homestudio.api.dto.ProjectDTO;
import com.homestudio.api.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class PublicProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<Page<ProjectDTO.Response>> getPublishedProjects(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectService.getPublishedProjects(categoryId, pageable));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<ProjectDTO.Response>> getFeaturedProjects() {
        return ResponseEntity.ok(projectService.getFeaturedProjects());
    }

    @GetMapping("/{code}")
    public ResponseEntity<ProjectDTO.Response> getByCode(@PathVariable String code) {
        return ResponseEntity.ok(projectService.getByCode(code));
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<Void> incrementView(@PathVariable UUID id) {
        projectService.incrementView(id);
        return ResponseEntity.noContent().build();
    }
}
