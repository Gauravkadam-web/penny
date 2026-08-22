package com.penny.backend.service;

import com.penny.backend.dto.request.CreateCategoryRequest;
import com.penny.backend.dto.request.UpdateCategoryRequest;
import com.penny.backend.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse createCategory(CreateCategoryRequest request);

    List<CategoryResponse> getAllCategories(Boolean activeOnly);

    CategoryResponse getCategoryById(Long id);

    CategoryResponse updateCategory(Long id, UpdateCategoryRequest request);

    void deleteCategory(Long id);
}
