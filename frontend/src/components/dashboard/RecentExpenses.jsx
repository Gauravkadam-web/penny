import React from 'react';
import { ArrowRight, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { formatDate } from '../../utils/dateUtils';
import { getCategoryColor } from '../../utils/categoryColors';

export const RecentExpenses = ({ expenses = [] }) => {
  const recentItems = expenses.slice(0, 6);

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-h3)', margin: 0, color: 'var(--color-ink)' }}>
            Recent Transactions
          </h3>
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-soft)', margin: '2px 0 0 0' }}>
            Latest records logged in your ledger
          </p>
        </div>
        <Link to="/expenses" className="btn btn--ghost btn--sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <span>View All</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {!recentItems || recentItems.length === 0 ? (
        <div className="empty-state" style={{ padding: 'var(--space-5)' }}>
          <Receipt size={32} color="var(--color-ink-muted)" style={{ marginBottom: 'var(--space-2)' }} />
          <p className="empty-state__text" style={{ margin: 0 }}>No expenses logged yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="table-container desktop-only">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th className="table__cell--numeric">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentItems.map((item) => {
                  const { className } = getCategoryColor(item.categoryName);
                  return (
                    <tr key={item.id}>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--color-ink)' }}>{item.title}</div>
                        {item.description && (
                          <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-muted)' }}>
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${className}`}>{item.categoryName}</span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-soft)' }}>
                        {formatDate(item.expenseDate)}
                      </td>
                      <td className="table__cell--numeric" style={{ fontWeight: '700', color: 'var(--color-ink)' }}>
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="mobile-card-list">
            {recentItems.map((item) => {
              const { className } = getCategoryColor(item.categoryName);
              return (
                <div key={item.id} className="mobile-card">
                  <div className="mobile-card__header">
                    <div>
                      <div className="mobile-card__title">{item.title}</div>
                      <span className={`badge ${className}`} style={{ marginTop: '4px' }}>
                        {item.categoryName}
                      </span>
                    </div>
                    <div className="mobile-card__amount">
                      {formatCurrency(item.amount)}
                    </div>
                  </div>
                  <div className="mobile-card__footer">
                    <span>{formatDate(item.expenseDate)}</span>
                    {item.description && <span>{item.description}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentExpenses;
