import React from 'react';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { Edit2, Trash2, Shield } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

export const CategoryList = ({ categories, onEdit, onDelete }) => {
  const columns = [
    {
      header: 'Category Name',
      accessor: 'name',
      render: (cat) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: '600' }}>{cat.name}</span>
          {cat.isSystemDefault && (
            <span title="System Default (Protected)" style={{ color: 'var(--color-primary)' }}>
              <Shield size={14} />
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Description',
      accessor: 'description',
      render: (cat) => cat.description || '-',
    },
    {
      header: 'Status',
      accessor: 'isActive',
      render: (cat) => (
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: cat.isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            color: cat.isActive ? 'var(--color-success)' : 'var(--color-danger)',
          }}
        >
          {cat.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Created Date',
      accessor: 'createdAt',
      render: (cat) => formatDate(cat.createdAt),
    },
    {
      header: 'Actions',
      render: (cat) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" onClick={() => onEdit(cat)}>
            <Edit2 size={14} />
          </Button>
          <Button variant="danger" onClick={() => onDelete(cat.id)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={categories} emptyMessage="No categories found." />;
};
