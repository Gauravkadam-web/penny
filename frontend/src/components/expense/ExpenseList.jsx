import React from 'react';
import { Edit2, Trash2, Receipt, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { formatDate } from '../../utils/dateUtils';
import { getCategoryColor } from '../../utils/categoryColors';

export const ExpenseList = ({
  expenses = [],
  onEdit,
  onDeleteRequest,
  sortConfig = { key: 'expenseDate', direction: 'desc' },
  onSort,
}) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="empty-state">
        <Receipt size={44} color="var(--color-ink-muted)" style={{ marginBottom: 'var(--space-3)' }} />
        <h3 className="empty-state__title">No Transactions Matching Criteria</h3>
        <p className="empty-state__text">Try adjusting your search terms or filter dates.</p>
      </div>
    );
  }

  const renderSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={12} color="var(--color-ink-muted)" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={12} color="var(--color-ledger)" />
    ) : (
      <ArrowDown size={12} color="var(--color-ledger)" />
    );
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="table-container desktop-only">
        <table className="table">
          <thead>
            <tr>
              <th className="table__th--sortable" onClick={() => onSort('title')}>
                <span className="table__th-content">
                  Title {renderSortIcon('title')}
                </span>
              </th>
              <th className="table__th--sortable" onClick={() => onSort('categoryName')}>
                <span className="table__th-content">
                  Category {renderSortIcon('categoryName')}
                </span>
              </th>
              <th className="table__th--sortable" onClick={() => onSort('expenseDate')}>
                <span className="table__th-content">
                  Date {renderSortIcon('expenseDate')}
                </span>
              </th>
              <th className="table__cell--numeric table__th--sortable" onClick={() => onSort('amount')}>
                <span className="table__th-content" style={{ justifyContent: 'flex-end' }}>
                  Amount {renderSortIcon('amount')}
                </span>
              </th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const { className } = getCategoryColor(expense.categoryName);
              return (
                <tr key={expense.id}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--color-ink)' }}>{expense.title}</div>
                    {expense.description && (
                      <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-muted)' }}>
                        {expense.description}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${className}`}>{expense.categoryName}</span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-caption)' }}>
                    {formatDate(expense.expenseDate)}
                  </td>
                  <td className="table__cell--numeric" style={{ fontWeight: '700', color: 'var(--color-ink)' }}>
                    {formatCurrency(expense.amount)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 'var(--space-2)' }}>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() => onEdit(expense)}
                        title="Edit Expense"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn btn--danger btn--sm"
                        onClick={() => onDeleteRequest(expense)}
                        title="Delete Expense"
                      >
                        <Trash2 size={15} />
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
        {expenses.map((expense) => {
          const { className } = getCategoryColor(expense.categoryName);
          return (
            <div key={expense.id} className="mobile-card">
              <div className="mobile-card__header">
                <div>
                  <div className="mobile-card__title">{expense.title}</div>
                  <span className={`badge ${className}`} style={{ marginTop: '4px' }}>
                    {expense.categoryName}
                  </span>
                </div>
                <div className="mobile-card__amount">
                  {formatCurrency(expense.amount)}
                </div>
              </div>

              {expense.description && (
                <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-ink-muted)', margin: 'var(--space-2) 0' }}>
                  {expense.description}
                </p>
              )}

              <div className="mobile-card__footer">
                <span style={{ fontFamily: 'var(--font-mono)' }}>{formatDate(expense.expenseDate)}</span>
                <div style={{ display: 'inline-flex', gap: 'var(--space-1)' }}>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => onEdit(expense)}
                  >
                    <Edit2 size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn--danger btn--sm"
                    onClick={() => onDeleteRequest(expense)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExpenseList;
