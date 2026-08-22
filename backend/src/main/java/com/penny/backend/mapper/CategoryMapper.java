package com.penny.backend.mapper;

import com.penny.backend.dto.request.CreateCategoryRequest;
import com.penny.backend.dto.request.UpdateCategoryRequest;
import com.penny.backend.dto.response.CategoryResponse;
import com.penny.backend.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public Category toEntity(CreateCategoryRequest request) {
        if (request == null) return null;
        return Category.builder()
                .name(request.getName() != null ? request.getName().trim() : null)
                .description(request.getDescription())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .isSystemDefault(false)
                .build();
    }

    public CategoryResponse toResponse(Category category) {
        if (category == null) return null;
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .isActive(category.getIsActive())
                .isSystemDefault(category.getIsSystemDefault())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }

    public void updateEntityFromRequest(UpdateCategoryRequest request, Category category) {
        if (request == null || category == null) return;
        if (request.getName() != null) {
            category.setName(request.getName().trim());
        }
        if (request.getDescription() != null) {
            category.setDescription(request.getDescription());
        }
        if (request.getIsActive() != null) {
            category.setIsActive(request.getIsActive());
        }
    }
}
