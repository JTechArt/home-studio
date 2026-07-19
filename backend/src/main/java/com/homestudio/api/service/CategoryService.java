package com.homestudio.api.service;

import com.homestudio.api.dto.CategoryDTO;
import com.homestudio.api.model.Category;
import com.homestudio.api.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDTO.Response> getAllCategories() {
        return categoryRepository.findAllByOrderBySortOrderAsc().stream()
                .map(this::toResponse)
                .toList();
    }

    public CategoryDTO.Response getById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return toResponse(category);
    }

    @Transactional
    public CategoryDTO.Response create(CategoryDTO.CreateRequest request) {
        Category category = Category.builder()
                .code(request.getCode().toUpperCase())
                .nameAm(request.getNameAm())
                .nameRu(request.getNameRu())
                .sortOrder(request.getSortOrder() != null ? request.getSortOrder() : 0)
                .build();
        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public CategoryDTO.Response update(UUID id, CategoryDTO.UpdateRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (request.getNameAm() != null) category.setNameAm(request.getNameAm());
        if (request.getNameRu() != null) category.setNameRu(request.getNameRu());
        if (request.getSortOrder() != null) category.setSortOrder(request.getSortOrder());

        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public void delete(UUID id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO.Response toResponse(Category category) {
        return CategoryDTO.Response.builder()
                .id(category.getId())
                .code(category.getCode())
                .nameAm(category.getNameAm())
                .nameRu(category.getNameRu())
                .sortOrder(category.getSortOrder())
                .build();
    }
}
