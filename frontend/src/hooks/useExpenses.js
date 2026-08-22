import { useState, useEffect, useCallback } from 'react';
import { expenseService } from '../services/expenseService';

export const useExpenses = (filters = {}) => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ totalAmount: 0, totalCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [expenseData, summaryData] = await Promise.all([
        expenseService.getExpenses(filters),
        expenseService.getExpenseSummary()
      ]);
      setExpenses(expenseData);
      setSummary(summaryData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return { expenses, summary, loading, error, refreshExpenses: fetchExpenses };
};
