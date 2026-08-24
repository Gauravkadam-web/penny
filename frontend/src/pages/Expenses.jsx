import React, { useState, useMemo } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseList } from '../components/expense/ExpenseList';
import { ExpenseFilter } from '../components/expense/ExpenseFilter';
import { ExpenseForm } from '../components/expense/ExpenseForm';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { expenseService } from '../services/expenseService';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { Plus } from 'lucide-react';

export const Expenses = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [sortConfig, setSortConfig] = useState({ key: 'expenseDate', direction: 'desc' });

  const { expenses, loading, error, refreshExpenses } = useExpenses(filters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { showNotification } = useApp();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearchTerm('');
    setSortBy('date-desc');
    setSortConfig({ key: 'expenseDate', direction: 'desc' });
  };

  const handleSortFromDropdown = (val) => {
    setSortBy(val);
    switch (val) {
      case 'date-desc':
        setSortConfig({ key: 'expenseDate', direction: 'desc' });
        break;
      case 'date-asc':
        setSortConfig({ key: 'expenseDate', direction: 'asc' });
        break;
      case 'amount-desc':
        setSortConfig({ key: 'amount', direction: 'desc' });
        break;
      case 'amount-asc':
        setSortConfig({ key: 'amount', direction: 'asc' });
        break;
      case 'title-asc':
        setSortConfig({ key: 'title', direction: 'asc' });
        break;
      default:
        break;
    }
  };

  const handleTableSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
  };

  // Filter & Sort dynamically
  const processedExpenses = useMemo(() => {
    if (!expenses) return [];
    let list = [...expenses];

    // 1. Search term filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (exp) =>
          (exp.title && exp.title.toLowerCase().includes(q)) ||
          (exp.description && exp.description.toLowerCase().includes(q)) ||
          (exp.categoryName && exp.categoryName.toLowerCase().includes(q))
      );
    }

    // 2. Sorting
    list.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'amount') {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (sortConfig.key === 'expenseDate') {
        aVal = new Date(aVal || 0).getTime();
        bVal = new Date(bVal || 0).getTime();
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      aVal = (aVal || '').toString().toLowerCase();
      bVal = (bVal || '').toString().toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [expenses, searchTerm, sortConfig]);

  // Compute total sum of processed entries
  const totalFilteredAmount = useMemo(() => {
    return processedExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [processedExpenses]);

  const handleCreateNew = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (expense) => {
    setDeleteTarget(expense);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleteLoading(true);
      await expenseService.deleteExpense(deleteTarget.id);
      showNotification('Expense deleted successfully', 'success');
      setDeleteTarget(null);
      refreshExpenses();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to delete expense', 'error');
    } finally {
      setDeleteLoading(false);
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
        showNotification('Expense logged successfully', 'success');
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
          <p className="page-subtitle">View, search, filter, and log transactions across dynamic categories.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={handleCreateNew}>
          <Plus size={18} />
          <span>Add Expense</span>
        </button>
      </div>

      <ExpenseFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortFromDropdown}
        onReset={handleResetFilters}
      />

      {loading ? (
        <Loader text="Fetching ledger transactions..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ExpenseList
            expenses={processedExpenses}
            onEdit={handleEdit}
            onDeleteRequest={handleDeleteRequest}
            sortConfig={sortConfig}
            onSort={handleTableSort}
          />

          {processedExpenses.length > 0 && (
            <div className="summary-bar">
              <span>
                Showing <strong>{processedExpenses.length}</strong> of <strong>{expenses.length}</strong> entries
              </span>
              <span style={{ fontWeight: '600', color: 'var(--color-ink)' }}>
                Filtered Total:{' '}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-h3)', color: 'var(--color-ledger)' }}>
                  {formatCurrency(totalFilteredAmount)}
                </span>
              </span>
            </div>
          )}
        </>
      )}

      {/* Add / Edit Expense Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExpense ? 'Edit Transaction' : 'Add New Expense'}
      >
        <ExpenseForm
          initialData={selectedExpense}
          onSubmit={handleSubmitForm}
          onCancel={() => setIsModalOpen(false)}
          loading={actionLoading}
        />
      </Modal>

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Transaction"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}" (${formatCurrency(deleteTarget?.amount || 0)})?`}
        confirmText="Delete Transaction"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
        variant="danger"
      />
    </div>
  );
};

export default Expenses;
