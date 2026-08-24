import React, { useState, useMemo } from 'react';
import { useCategories } from '../hooks/useCategories';
import { useExpenses } from '../hooks/useExpenses';
import { CategoryList } from '../components/category/CategoryList';
import { CategoryForm } from '../components/category/CategoryForm';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { categoryService } from '../services/categoryService';
import { useApp } from '../context/AppContext';
import { Plus } from 'lucide-react';

export const Categories = () => {
  const { categories, loading, error, refreshCategories } = useCategories(false);
  const { expenses } = useExpenses();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'inactive'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { showNotification } = useApp();

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    if (statusFilter === 'active') return categories.filter((c) => c.isActive);
    if (statusFilter === 'inactive') return categories.filter((c) => !c.isActive);
    return categories;
  }, [categories, statusFilter]);

  const handleCreateNew = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (category) => {
    if (category.isSystemDefault) {
      showNotification('System default categories are protected and cannot be deleted.', 'error');
      return;
    }
    setDeleteTarget(category);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleteLoading(true);
      await categoryService.deleteCategory(deleteTarget.id);
      showNotification('Category deleted / deactivated successfully', 'success');
      setDeleteTarget(null);
      refreshCategories();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to delete category', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      setActionLoading(true);
      if (selectedCategory) {
        await categoryService.updateCategory(selectedCategory.id, formData);
        showNotification('Category updated successfully', 'success');
      } else {
        await categoryService.createCategory(formData);
        showNotification('Category created successfully', 'success');
      }
      setIsModalOpen(false);
      refreshCategories();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to save category', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Category Management</h1>
          <p className="page-subtitle">Manage dynamic user-defined categories and system safeguards.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {/* Status Filter Pills */}
          <div className="filter-pills">
            <button
              type="button"
              className={`filter-pill ${statusFilter === 'all' ? 'filter-pill--active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All ({categories?.length || 0})
            </button>
            <button
              type="button"
              className={`filter-pill ${statusFilter === 'active' ? 'filter-pill--active' : ''}`}
              onClick={() => setStatusFilter('active')}
            >
              Active ({categories?.filter((c) => c.isActive).length || 0})
            </button>
            <button
              type="button"
              className={`filter-pill ${statusFilter === 'inactive' ? 'filter-pill--active' : ''}`}
              onClick={() => setStatusFilter('inactive')}
            >
              Inactive ({categories?.filter((c) => !c.isActive).length || 0})
            </button>
          </div>

          <button type="button" className="btn btn--primary" onClick={handleCreateNew}>
            <Plus size={18} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {loading ? (
        <Loader text="Fetching dynamic categories..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <CategoryList
          categories={filteredCategories}
          expenses={expenses}
          onEdit={handleEdit}
          onDeleteRequest={handleDeleteRequest}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCategory ? 'Edit Category' : 'Add New Category'}
      >
        <CategoryForm
          initialData={selectedCategory}
          onSubmit={handleSubmitForm}
          onCancel={() => setIsModalOpen(false)}
          loading={actionLoading}
        />
      </Modal>

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Category"
        message={`Are you sure you want to delete or deactivate category "${deleteTarget?.name}"?`}
        confirmText="Delete Category"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
        variant="danger"
      />
    </div>
  );
};

export default Categories;
