package com.penny.backend.service.impl;

import com.penny.backend.dto.request.CreateExpenseRequest;
import com.penny.backend.dto.request.UpdateExpenseRequest;
import com.penny.backend.dto.response.ExpenseResponse;
import com.penny.backend.dto.response.ExpenseSummaryResponse;
import com.penny.backend.entity.Category;
import com.penny.backend.entity.Expense;
import com.penny.backend.exception.ResourceNotFoundException;
import com.penny.backend.mapper.ExpenseMapper;
import com.penny.backend.repository.CategoryRepository;
import com.penny.backend.repository.ExpenseRepository;
import com.penny.backend.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final ExpenseMapper expenseMapper;

    @Override
    public ExpenseResponse createExpense(CreateExpenseRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        if (!Boolean.TRUE.equals(category.getIsActive())) {
            throw new IllegalArgumentException("Cannot assign inactive category (id: " + category.getId() + ") to an expense");
        }

        Expense expense = expenseMapper.toEntity(request, category);
        Expense savedExpense = expenseRepository.save(expense);
        return expenseMapper.toResponse(savedExpense);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExpenseResponse> getExpenses(Long categoryId, LocalDate startDate, LocalDate endDate) {
        List<Expense> expenses = expenseRepository.filterExpenses(categoryId, startDate, endDate);
        return expenses.stream()
                .map(expenseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ExpenseResponse getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        return expenseMapper.toResponse(expense);
    }

    @Override
    public ExpenseResponse updateExpense(Long id, UpdateExpenseRequest request) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));

        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

            if (!Boolean.TRUE.equals(category.getIsActive())) {
                throw new IllegalArgumentException("Cannot assign inactive category (id: " + category.getId() + ") to an expense");
            }
        }

        expenseMapper.updateEntityFromRequest(request, expense, category);
        Expense updatedExpense = expenseRepository.save(expense);
        return expenseMapper.toResponse(updatedExpense);
    }

    @Override
    public void deleteExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        expenseRepository.delete(expense);
    }

    @Override
    @Transactional(readOnly = true)
    public ExpenseSummaryResponse getExpenseSummary() {
        BigDecimal totalAmount = expenseRepository.getTotalExpenseAmount();
        long count = expenseRepository.count();

        return ExpenseSummaryResponse.builder()
                .totalAmount(totalAmount != null ? totalAmount : BigDecimal.ZERO)
                .totalCount(count)
                .build();
    }
}
