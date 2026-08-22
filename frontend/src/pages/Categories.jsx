import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { CategoryList } from '../components/category/CategoryList';
import { CategoryForm } from '../components/category/CategoryForm';
import { Modal } from '../components/common/Modal';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { categoryService } from '../services/categoryService';
import { useApp } from '../context/AppContext';
import { Plus } from 'lucide-react';

export const Categories = () => {
  const { categories, loading, error, refreshCategories } = useCategories(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { showNotification } = useApp();

  const handleCreateNew = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete/deactivate this category?')) {
      try {
        await categoryService.deleteCategory(id);
        showNotification('Category updated/deactivated successfully', 'success');
        refreshCategories();
      } catch (err) {
        showNotification(err.response?.data?.message || 'Failed to delete category', 'error');
      }
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
          <p className="page-subtitle">Manage user-defined dynamic categories and status safeguards.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={handleCreateNew}>
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      {loading ? (
        <Loader text="Fetching dynamic categories..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <CategoryList categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
      )}

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
    </div>
  );
};

export default Categories;
