package com.homestudio.api.controller;

import com.homestudio.api.dto.ProjectDTO;
import com.homestudio.api.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/projects")
@RequiredArgsConstructor
public class AdminProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<Page<ProjectDTO.Response>> getAllProjects(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(projectService.getAllProjects(categoryId, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO.Response> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(projectService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ProjectDTO.Response> create(@RequestBody ProjectDTO.CreateRequest request) {
        return ResponseEntity.ok(projectService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO.Response> update(@PathVariable UUID id, @RequestBody ProjectDTO.UpdateRequest request) {
        return ResponseEntity.ok(projectService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
