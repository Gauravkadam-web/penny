import React from 'react';
import { Edit2, Trash2, Shield, Tag } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

export const CategoryList = ({ categories, onEdit, onDelete }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="empty-state">
        <Tag size={40} color="var(--color-ink-muted)" style={{ marginBottom: 'var(--space-2)' }} />
        <h3 className="empty-state__title">No Categories Found</h3>
        <p className="empty-state__text">Create user-defined dynamic categories by clicking "Add Category" above.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created Date</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontWeight: '600', color: 'var(--color-ink)' }}>{cat.name}</span>
                  {cat.isSystemDefault && (
                    <span className="badge badge--system" title="System Default (Protected)">
                      <Shield size={12} style={{ marginRight: '2px' }} /> Default
                    </span>
                  )}
                </div>
              </td>
              <td style={{ color: 'var(--color-ink-soft)' }}>
                {cat.description || '-'}
              </td>
              <td>
                {cat.isActive ? (
                  <span className="badge badge--success">Active</span>
                ) : (
                  <span className="badge badge--muted">Inactive</span>
                )}
              </td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-caption)' }}>
                {formatDate(cat.createdAt)}
              </td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: 'var(--space-2)' }}>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => onEdit(cat)}
                    title="Edit Category"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger btn--sm"
                    onClick={() => onDelete(cat.id)}
                    title="Delete Category"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
