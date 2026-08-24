import React, { useState, useMemo } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { CategoryBreakdown } from '../components/dashboard/CategoryBreakdown';
import { RecentExpenses } from '../components/dashboard/RecentExpenses';
import { ExpenseForm } from '../components/expense/ExpenseForm';
import { Modal } from '../components/common/Modal';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { expenseService } from '../services/expenseService';
import { useApp } from '../context/AppContext';
import { Plus } from 'lucide-react';

export const Dashboard = () => {
  const { expenses, summary, loading, error, refreshExpenses } = useExpenses();
  const [timeframe, setTimeframe] = useState('all'); // 'all' | 'month' | '30days'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { showNotification } = useApp();

  // Filter expenses dynamically based on selected timeframe
  const filteredExpenses = useMemo(() => {
    if (!expenses || expenses.length === 0) return [];
    if (timeframe === 'all') return expenses;

    const now = new Date();
    if (timeframe === 'month') {
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      return expenses.filter((exp) => {
        if (!exp.expenseDate) return false;
        const d = new Date(exp.expenseDate);
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
      });
    }

    if (timeframe === '30days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return expenses.filter((exp) => {
        if (!exp.expenseDate) return false;
        const d = new Date(exp.expenseDate);
        return d >= thirtyDaysAgo;
      });
    }

    return expenses;
  }, [expenses, timeframe]);

  // Compute dynamic summary for the filtered period
  const periodSummary = useMemo(() => {
    const totalAmount = filteredExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    return {
      totalAmount,
      totalCount: filteredExpenses.length,
    };
  }, [filteredExpenses]);

  const handleCreateExpense = async (formData) => {
    try {
      setActionLoading(true);
      await expenseService.createExpense(formData);
      showNotification('Expense logged successfully', 'success');
      setIsModalOpen(false);
      refreshExpenses();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to save expense', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Loader text="Loading Ledger Summary..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Track your personal spend and dynamic categories in real-time.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {/* Timeframe Filter Pills */}
          <div className="filter-pills">
            <button
              type="button"
              className={`filter-pill ${timeframe === 'all' ? 'filter-pill--active' : ''}`}
              onClick={() => setTimeframe('all')}
            >
              All Time
            </button>
            <button
              type="button"
              className={`filter-pill ${timeframe === 'month' ? 'filter-pill--active' : ''}`}
              onClick={() => setTimeframe('month')}
            >
              This Month
            </button>
            <button
              type="button"
              className={`filter-pill ${timeframe === '30days' ? 'filter-pill--active' : ''}`}
              onClick={() => setTimeframe('30days')}
            >
              Last 30 Days
            </button>
          </div>

          {/* Quick Add Action Button */}
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            <span>Quick Log</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <SummaryCards
        summary={periodSummary}
        expenses={filteredExpenses}
        timeframe={timeframe}
      />

      {/* Category Spending Distribution */}
      <CategoryBreakdown expenses={filteredExpenses} />

      {/* Recent Transactions List */}
      <RecentExpenses expenses={filteredExpenses} />

      {/* Quick Add Expense Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Quick Log Expense"
      >
        <ExpenseForm
          onSubmit={handleCreateExpense}
          onCancel={() => setIsModalOpen(false)}
          loading={actionLoading}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
