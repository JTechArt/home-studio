package com.homestudio.api.service;

import com.homestudio.api.model.ProjectImage;
import com.homestudio.api.repository.ProjectImageRepository;
import com.homestudio.api.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ProjectImageRepository imageRepository;
    private final ProjectRepository projectRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Value("${app.upload.max-width}")
    private int maxWidth;

    @Value("${app.upload.thumbnail-width}")
    private int thumbnailWidth;

    @Transactional
    public List<ProjectImage> uploadImages(UUID projectId, List<MultipartFile> files) throws IOException {
        var project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Path projectDir = Paths.get(uploadDir, projectId.toString());
        Path thumbDir = projectDir.resolve("thumbs");
        Files.createDirectories(projectDir);
        Files.createDirectories(thumbDir);

        int currentMaxOrder = project.getImages().stream()
                .mapToInt(ProjectImage::getSortOrder).max().orElse(-1);

        List<ProjectImage> saved = new ArrayList<>();

        for (MultipartFile file : files) {
            String filename = UUID.randomUUID() + getExtension(file.getOriginalFilename());
            Path filePath = projectDir.resolve(filename);

            // Read and resize original if needed
            BufferedImage original = ImageIO.read(file.getInputStream());
            int origWidth = original.getWidth();
            int origHeight = original.getHeight();

            if (origWidth > maxWidth) {
                Thumbnails.of(original)
                        .width(maxWidth)
                        .keepAspectRatio(true)
                        .toFile(filePath.toFile());
            } else {
                file.transferTo(filePath);
            }

            // Generate thumbnail
            String thumbFilename = "thumb_" + filename;
            Path thumbPath = thumbDir.resolve(thumbFilename);
            Thumbnails.of(filePath.toFile())
                    .width(thumbnailWidth)
                    .keepAspectRatio(true)
                    .toFile(thumbPath.toFile());

            currentMaxOrder++;

            ProjectImage image = ProjectImage.builder()
                    .project(project)
                    .filePath(projectId + "/" + filename)
                    .thumbnailPath(projectId + "/thumbs/" + thumbFilename)
                    .isCover(project.getImages().isEmpty() && saved.isEmpty())
                    .sortOrder(currentMaxOrder)
                    .originalFilename(file.getOriginalFilename())
                    .fileSize(Files.size(filePath))
                    .width(origWidth)
                    .height(origHeight)
                    .build();

            saved.add(imageRepository.save(image));
        }

        return saved;
    }

    @Transactional
    public void deleteImage(UUID imageId) throws IOException {
        ProjectImage image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        // Delete physical files
        Path filePath = Paths.get(uploadDir, image.getFilePath());
        Path thumbPath = image.getThumbnailPath() != null ?
                Paths.get(uploadDir, image.getThumbnailPath()) : null;

        Files.deleteIfExists(filePath);
        if (thumbPath != null) Files.deleteIfExists(thumbPath);

        imageRepository.delete(image);
    }

    @Transactional
    public void setCover(UUID imageId) {
        ProjectImage image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        imageRepository.clearCoverForProject(image.getProject().getId());
        image.setIsCover(true);
        imageRepository.save(image);
    }

    @Transactional
    public void reorderImages(List<UUID> imageIds) {
        for (int i = 0; i < imageIds.size(); i++) {
            ProjectImage image = imageRepository.findById(imageIds.get(i))
                    .orElseThrow(() -> new RuntimeException("Image not found"));
            image.setSortOrder(i);
            imageRepository.save(image);
        }
    }

    private String getExtension(String filename) {
        if (filename == null) return ".jpg";
        int lastDot = filename.lastIndexOf('.');
        return lastDot >= 0 ? filename.substring(lastDot) : ".jpg";
    }
}
