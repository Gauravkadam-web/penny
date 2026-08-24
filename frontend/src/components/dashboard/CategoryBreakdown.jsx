import React from 'react';
import { PieChart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { getCategoryColor } from '../../utils/categoryColors';

export const CategoryBreakdown = ({ expenses = [] }) => {
  if (!expenses || expenses.length === 0) {
    return null;
  }

  // Calculate dynamic spend & counts per category
  const categoryMap = {};
  let totalSpend = 0;

  expenses.forEach((exp) => {
    const amount = Number(exp.amount) || 0;
    const catName = exp.categoryName || 'Uncategorized';
    totalSpend += amount;

    if (!categoryMap[catName]) {
      categoryMap[catName] = { name: catName, total: 0, count: 0 };
    }
    categoryMap[catName].total += amount;
    categoryMap[catName].count += 1;
  });

  // Sort categories by total spend descending
  const sortedCategories = Object.values(categoryMap).sort((a, b) => b.total - a.total);

  return (
    <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <PieChart size={20} color="var(--color-ledger)" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h3)', margin: 0, color: 'var(--color-ink)' }}>
            Category Spending Distribution
          </h3>
        </div>
        <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-muted)' }}>
          {sortedCategories.length} {sortedCategories.length === 1 ? 'Category' : 'Categories'}
        </span>
      </div>

      <div>
        {sortedCategories.map((cat) => {
          const percentage = totalSpend > 0 ? Math.round((cat.total / totalSpend) * 100) : 0;
          const { className, barColor } = getCategoryColor(cat.name);

          return (
            <div key={cat.name} className="breakdown-item">
              <div className="breakdown-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span className={`badge ${className}`}>{cat.name}</span>
                  <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-muted)' }}>
                    ({cat.count} {cat.count === 1 ? 'transaction' : 'transactions'})
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--color-ink)' }}>
                    {formatCurrency(cat.total)}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-soft)', width: '38px', textAlign: 'right' }}>
                    {percentage}%
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{ width: `${percentage}%`, backgroundColor: barColor }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
