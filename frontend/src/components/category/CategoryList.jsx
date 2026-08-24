import React from 'react';
import { Edit2, Trash2, Shield, Tag, Lock } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/formatters';
import { getCategoryColor } from '../../utils/categoryColors';

export const CategoryList = ({
  categories = [],
  expenses = [],
  onEdit,
  onDeleteRequest,
}) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="empty-state">
        <Tag size={44} color="var(--color-ink-muted)" style={{ marginBottom: 'var(--space-3)' }} />
        <h3 className="empty-state__title">No Categories Found</h3>
        <p className="empty-state__text">Create user-defined dynamic categories by clicking "Add Category" above.</p>
      </div>
    );
  }

  // Calculate dynamic linked transaction counts and totals per category
  const statsMap = {};
  expenses.forEach((exp) => {
    const catId = exp.categoryId;
    const catName = exp.categoryName;
    const amount = Number(exp.amount) || 0;

    const key = catId || catName;
    if (!statsMap[key]) {
      statsMap[key] = { count: 0, total: 0 };
    }
    statsMap[key].count += 1;
    statsMap[key].total += amount;
  });

  return (
    <>
      {/* Desktop Table View */}
      <div className="table-container desktop-only">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Usage Stats</th>
              <th>Created</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const { className } = getCategoryColor(cat.name);
              const stats = statsMap[cat.id] || statsMap[cat.name] || { count: 0, total: 0 };

              return (
                <tr key={cat.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span className={`badge ${className}`} style={{ fontWeight: '600' }}>
                        {cat.name}
                      </span>
                      {cat.isSystemDefault && (
                        <span className="badge badge--system" title="System Default (Protected)">
                          <Shield size={12} style={{ marginRight: '2px' }} /> System Default
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-ink-soft)', maxWidth: '280px' }}>
                    {cat.description || <span style={{ color: 'var(--color-ink-muted)' }}>No description</span>}
                  </td>
                  <td>
                    {cat.isActive ? (
                      <span className="badge badge--success">Active</span>
                    ) : (
                      <span className="badge badge--muted">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div style={{ fontSize: 'var(--font-size-caption)' }}>
                      <span style={{ fontWeight: '600', color: 'var(--color-ink)' }}>
                        {stats.count} {stats.count === 1 ? 'entry' : 'entries'}
                      </span>
                      {stats.total > 0 && (
                        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ledger)' }}>
                          {formatCurrency(stats.total)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-soft)' }}>
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
                        onClick={() => onDeleteRequest(cat)}
                        disabled={cat.isSystemDefault}
                        title={cat.isSystemDefault ? 'System default categories cannot be deleted' : 'Delete Category'}
                        style={cat.isSystemDefault ? { opacity: 0.35, cursor: 'not-allowed' } : {}}
                      >
                        {cat.isSystemDefault ? <Lock size={14} /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Screens <= 640px) */}
      <div className="mobile-card-list">
        {categories.map((cat) => {
          const { className } = getCategoryColor(cat.name);
          const stats = statsMap[cat.id] || statsMap[cat.name] || { count: 0, total: 0 };

          return (
            <div key={cat.id} className="mobile-card">
              <div className="mobile-card__header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    <span className={`badge ${className}`} style={{ fontWeight: '600' }}>
                      {cat.name}
                    </span>
                    {cat.isSystemDefault && (
                      <span className="badge badge--system">
                        <Shield size={11} style={{ marginRight: '2px' }} /> Default
                      </span>
                    )}
                  </div>
                  {cat.description && (
                    <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-soft)', margin: 'var(--space-2) 0 0 0' }}>
                      {cat.description}
                    </p>
                  )}
                </div>
                <div>
                  {cat.isActive ? (
                    <span className="badge badge--success">Active</span>
                  ) : (
                    <span className="badge badge--muted">Inactive</span>
                  )}
                </div>
              </div>

              <div className="mobile-card__footer">
                <div style={{ fontSize: 'var(--font-size-caption)' }}>
                  <span>{stats.count} transactions</span>
                  {stats.total > 0 && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--color-ledger)', marginLeft: 'var(--space-2)' }}>
                      • {formatCurrency(stats.total)}
                    </span>
                  )}
                </div>
                <div style={{ display: 'inline-flex', gap: 'var(--space-1)' }}>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => onEdit(cat)}
                  >
                    <Edit2 size={14} />
                    <span>Edit</span>
                  </button>
                  {!cat.isSystemDefault && (
                    <button
                      type="button"
                      className="btn btn--danger btn--sm"
                      onClick={() => onDeleteRequest(cat)}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryList;
