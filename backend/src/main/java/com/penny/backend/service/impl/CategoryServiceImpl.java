package com.penny.backend.service.impl;

import com.penny.backend.dto.request.CreateCategoryRequest;
import com.penny.backend.dto.request.UpdateCategoryRequest;
import com.penny.backend.dto.response.CategoryResponse;
import com.penny.backend.entity.Category;
import com.penny.backend.exception.DuplicateCategoryException;
import com.penny.backend.exception.ResourceNotFoundException;
import com.penny.backend.mapper.CategoryMapper;
import com.penny.backend.repository.CategoryRepository;
import com.penny.backend.repository.ExpenseRepository;
import com.penny.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponse createCategory(CreateCategoryRequest request) {
        if (categoryRepository.existsByNameIgnoreCase(request.getName())) {
            throw new DuplicateCategoryException("Category with name '" + request.getName() + "' already exists");
        }
        Category category = categoryMapper.toEntity(request);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toResponse(savedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories(Boolean activeOnly) {
        List<Category> categories;
        if (Boolean.TRUE.equals(activeOnly)) {
            categories = categoryRepository.findByIsActiveTrue();
        } else {
            categories = categoryRepository.findAll();
        }
        return categories.stream()
                .map(categoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return categoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse updateCategory(Long id, UpdateCategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        if (request.getName() != null && categoryRepository.existsByNameIgnoreCaseAndIdNot(request.getName(), id)) {
            throw new DuplicateCategoryException("Category with name '" + request.getName() + "' already exists");
        }

        categoryMapper.updateEntityFromRequest(request, category);
        Category updatedCategory = categoryRepository.save(category);
        return categoryMapper.toResponse(updatedCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        boolean inUse = expenseRepository.existsByCategoryId(id);

        if (inUse) {
            category.setIsActive(false);
            categoryRepository.save(category);
        } else {
            if (Boolean.TRUE.equals(category.getIsSystemDefault())) {
                category.setIsActive(false);
                categoryRepository.save(category);
            } else {
                categoryRepository.delete(category);
            }
        }
    }
}
