import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { CategoryList } from '../components/category/CategoryList';
import { CategoryForm } from '../components/category/CategoryForm';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { categoryService } from '../services/categoryService';
import { Plus } from 'lucide-react';

export const Categories = () => {
  const { categories, loading, error, refreshCategories } = useCategories(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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
        refreshCategories();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete category');
      }
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      setActionLoading(true);
      if (selectedCategory) {
        await categoryService.updateCategory(selectedCategory.id, formData);
      } else {
        await categoryService.createCategory(formData);
      }
      setIsModalOpen(false);
      refreshCategories();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save category');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Category Management</h1>
        <Button onClick={handleCreateNew}>
          <Plus size={18} /> Add Category
        </Button>
      </div>

      {loading ? (
        <div style={{ color: 'var(--color-text-muted)' }}>Loading categories...</div>
      ) : error ? (
        <div style={{ color: 'var(--color-danger)' }}>{error}</div>
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
