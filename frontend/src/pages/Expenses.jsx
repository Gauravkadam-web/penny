import React, { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseList } from '../components/expense/ExpenseList';
import { ExpenseFilter } from '../components/expense/ExpenseFilter';
import { ExpenseForm } from '../components/expense/ExpenseForm';
import { Modal } from '../components/common/Modal';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { expenseService } from '../services/expenseService';
import { useApp } from '../context/AppContext';
import { Plus } from 'lucide-react';

export const Expenses = () => {
  const [filters, setFilters] = useState({});
  const { expenses, loading, error, refreshExpenses } = useExpenses(filters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showNotification } = useApp();

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
        showNotification('Expense deleted successfully', 'success');
        refreshExpenses();
      } catch (err) {
        showNotification(err.response?.data?.message || 'Failed to delete expense', 'error');
      }
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      setActionLoading(true);
      if (selectedExpense) {
        await expenseService.updateExpense(selectedExpense.id, formData);
        showNotification('Expense updated successfully', 'success');
      } else {
        await expenseService.createExpense(formData);
        showNotification('Expense created successfully', 'success');
      }
      setIsModalOpen(false);
      refreshExpenses();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to save expense', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Expenses Ledger</h1>
          <p className="page-subtitle">View, filter, and log transactions across dynamic categories.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={handleCreateNew}>
          <Plus size={18} />
          <span>Add Expense</span>
        </button>
      </div>

      <ExpenseFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {loading ? (
        <Loader text="Fetching transactions..." />
      ) : error ? (
        <ErrorMessage message={error} />
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

export default Expenses;
