package com.penny.backend.service;

import com.penny.backend.dto.request.CreateExpenseRequest;
import com.penny.backend.dto.request.UpdateExpenseRequest;
import com.penny.backend.dto.response.ExpenseResponse;
import com.penny.backend.dto.response.ExpenseSummaryResponse;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseService {

    ExpenseResponse createExpense(CreateExpenseRequest request);

    List<ExpenseResponse> getExpenses(Long categoryId, LocalDate startDate, LocalDate endDate);

    ExpenseResponse getExpenseById(Long id);

    ExpenseResponse updateExpense(Long id, UpdateExpenseRequest request);

    void deleteExpense(Long id);

    ExpenseSummaryResponse getExpenseSummary();
}
