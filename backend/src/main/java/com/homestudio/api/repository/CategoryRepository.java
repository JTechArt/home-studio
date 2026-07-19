package com.homestudio.api.repository;

import com.homestudio.api.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Optional<Category> findByCode(String code);
    List<Category> findAllByOrderBySortOrderAsc();
}
