import React from 'react';
import { useCategories } from '../../hooks/useCategories';
import { RotateCcw } from 'lucide-react';

export const ExpenseFilter = ({ filters, onFilterChange, onReset }) => {
  const { categories } = useCategories(false); // Dynamic category list for historical filtering

  return (
    <div className="card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label className="form-label">Filter Category</label>
          <select
            className="select"
            value={filters.categoryId || ''}
            onChange={(e) => onFilterChange('categoryId', e.target.value)}
          >
            <option value="">All Dynamic Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <label className="form-label">From Date</label>
          <input
            type="date"
            className="input"
            value={filters.startDate || ''}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
          />
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <label className="form-label">To Date</label>
          <input
            type="date"
            className="input"
            value={filters.endDate || ''}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
          />
        </div>

        <button type="button" className="btn btn--ghost btn--sm" onClick={onReset}>
          <RotateCcw size={14} />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
};

export default ExpenseFilter;
