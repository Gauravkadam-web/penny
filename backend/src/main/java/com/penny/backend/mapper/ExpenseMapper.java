package com.penny.backend.mapper;

import com.penny.backend.dto.request.CreateExpenseRequest;
import com.penny.backend.dto.request.UpdateExpenseRequest;
import com.penny.backend.dto.response.ExpenseResponse;
import com.penny.backend.entity.Category;
import com.penny.backend.entity.Expense;
import org.springframework.stereotype.Component;

@Component
public class ExpenseMapper {

    public Expense toEntity(CreateExpenseRequest request, Category category) {
        if (request == null) return null;
        return Expense.builder()
                .title(request.getTitle() != null ? request.getTitle().trim() : null)
                .amount(request.getAmount())
                .category(category)
                .expenseDate(request.getExpenseDate())
                .description(request.getDescription())
                .build();
    }

    public ExpenseResponse toResponse(Expense expense) {
        if (expense == null) return null;
        return ExpenseResponse.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .amount(expense.getAmount())
                .categoryId(expense.getCategory() != null ? expense.getCategory().getId() : null)
                .categoryName(expense.getCategory() != null ? expense.getCategory().getName() : null)
                .expenseDate(expense.getExpenseDate())
                .description(expense.getDescription())
                .createdAt(expense.getCreatedAt())
                .updatedAt(expense.getUpdatedAt())
                .build();
    }

    public void updateEntityFromRequest(UpdateExpenseRequest request, Expense expense, Category category) {
        if (request == null || expense == null) return;
        if (request.getTitle() != null) {
            expense.setTitle(request.getTitle().trim());
        }
        if (request.getAmount() != null) {
            expense.setAmount(request.getAmount());
        }
        if (category != null) {
            expense.setCategory(category);
        }
        if (request.getExpenseDate() != null) {
            expense.setExpenseDate(request.getExpenseDate());
        }
        if (request.getDescription() != null) {
            expense.setDescription(request.getDescription());
        }
    }
}
