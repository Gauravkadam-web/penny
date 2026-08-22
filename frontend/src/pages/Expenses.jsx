import React, { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseList } from '../components/expense/ExpenseList';
import { ExpenseFilter } from '../components/expense/ExpenseFilter';
import { ExpenseForm } from '../components/expense/ExpenseForm';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { expenseService } from '../services/expenseService';
import { Plus } from 'lucide-react';

export const Expenses = () => {
  const [filters, setFilters] = useState({});
  const { expenses, loading, error, refreshExpenses } = useExpenses(filters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const handleCreateNew = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(id);
        refreshExpenses();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete expense');
      }
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      setActionLoading(true);
      if (selectedExpense) {
        await expenseService.updateExpense(selectedExpense.id, formData);
      } else {
        await expenseService.createExpense(formData);
      }
      setIsModalOpen(false);
      refreshExpenses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save expense');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Expenses</h1>
        <Button onClick={handleCreateNew}>
          <Plus size={18} /> Add Expense
        </Button>
      </div>

      <ExpenseFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {loading ? (
        <div style={{ color: 'var(--color-text-muted)' }}>Loading expenses...</div>
      ) : error ? (
        <div style={{ color: 'var(--color-danger)' }}>{error}</div>
      ) : (
        <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExpense ? 'Edit Expense' : 'Add New Expense'}
      >
        <ExpenseForm
          initialData={selectedExpense}
          onSubmit={handleSubmitForm}
          onCancel={() => setIsModalOpen(false)}
          loading={actionLoading}
        />
      </Modal>
    </div>
  );
};
