package com.homestudio.api.controller;

import com.homestudio.api.dto.ProjectDTO;
import com.homestudio.api.model.ProjectImage;
import com.homestudio.api.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminImageController {

    private final ImageService imageService;

    @PostMapping("/projects/{projectId}/images")
    public ResponseEntity<List<ProjectImage>> uploadImages(
            @PathVariable UUID projectId,
            @RequestParam("files") List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(imageService.uploadImages(projectId, files));
    }

    @DeleteMapping("/images/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable UUID id) throws IOException {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/images/{id}/cover")
    public ResponseEntity<Void> setCover(@PathVariable UUID id) {
        imageService.setCover(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/images/reorder")
    public ResponseEntity<Void> reorderImages(@RequestBody ProjectDTO.ReorderImagesRequest request) {
        imageService.reorderImages(request.getImageIds());
        return ResponseEntity.noContent().build();
    }
}
