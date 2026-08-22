import React from 'react';
import { useCategories } from '../../hooks/useCategories';

export const ExpenseFilter = ({ filters, onFilterChange, onReset }) => {
  const { categories } = useCategories(false); // Can include inactive categories for viewing historical expenses

  return (
    <div style={styles.container}>
      <div style={styles.field}>
        <label style={styles.label}>Category</label>
        <select
          value={filters.categoryId || ''}
          onChange={(e) => onFilterChange('categoryId', e.target.value)}
          style={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>From Date</label>
        <input
          type="date"
          value={filters.startDate || ''}
          onChange={(e) => onFilterChange('startDate', e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>To Date</label>
        <input
          type="date"
          value={filters.endDate || ''}
          onChange={(e) => onFilterChange('endDate', e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={onReset} style={styles.resetBtn}>
        Reset Filters
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'flex-end',
    backgroundColor: 'var(--color-card)',
    padding: '16px',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--color-card-border)',
    marginBottom: '24px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: 'var(--color-text-muted)',
  },
  select: {
    padding: '8px 12px',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text-main)',
    border: '1px solid var(--color-card-border)',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.9rem',
  },
  input: {
    padding: '8px 12px',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text-main)',
    border: '1px solid var(--color-card-border)',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.9rem',
  },
  resetBtn: {
    padding: '8px 14px',
    backgroundColor: 'transparent',
    color: 'var(--color-text-muted)',
    border: '1px solid var(--color-card-border)',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
};
