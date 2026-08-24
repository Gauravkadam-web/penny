import React from 'react';
import { useCategories } from '../../hooks/useCategories';
import { RotateCcw, Search, ArrowUpDown } from 'lucide-react';

export const ExpenseFilter = ({
  searchTerm = '',
  onSearchChange,
  filters = {},
  onFilterChange,
  sortBy = 'date-desc',
  onSortChange,
  onReset,
}) => {
  const { categories } = useCategories(false);

  return (
    <div className="card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'flex-end' }}>
        {/* Search Input */}
        <div style={{ flex: '2 1 220px' }}>
          <label className="form-label">Search Ledger</label>
          <div className="search-wrapper">
            <Search size={16} className="search-wrapper__icon" />
            <input
              type="text"
              className="input"
              placeholder="Search title or note..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ flex: '1 1 180px' }}>
          <label className="form-label">Category</label>
          <select
            className="select"
            value={filters.categoryId || ''}
            onChange={(e) => onFilterChange('categoryId', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} {!cat.isActive ? '(Inactive)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order Selector */}
        <div style={{ flex: '1 1 170px' }}>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpDown size={12} />
            <span>Sort By</span>
          </label>
          <select
            className="select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="amount-desc">Amount (High to Low)</option>
            <option value="amount-asc">Amount (Low to High)</option>
            <option value="title-asc">Title (A to Z)</option>
          </select>
        </div>

        {/* From Date */}
        <div style={{ flex: '1 1 140px' }}>
          <label className="form-label">From</label>
          <input
            type="date"
            className="input"
            value={filters.startDate || ''}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
          />
        </div>

        {/* To Date */}
        <div style={{ flex: '1 1 140px' }}>
          <label className="form-label">To</label>
          <input
            type="date"
            className="input"
            value={filters.endDate || ''}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
          />
        </div>

        {/* Reset Button */}
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={onReset}
          style={{ height: '42px', alignSelf: 'flex-end' }}
          title="Reset all filters"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default ExpenseFilter;
