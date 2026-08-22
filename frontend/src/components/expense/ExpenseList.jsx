import React from 'react';
import { Edit2, Trash2, Receipt } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { formatDate } from '../../utils/dateUtils';

export const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="empty-state">
        <Receipt size={40} color="var(--color-ink-muted)" style={{ marginBottom: 'var(--space-2)' }} />
        <h3 className="empty-state__title">No Expense Records Found</h3>
        <p className="empty-state__text">Start logging your expenses by clicking "Add Expense" above.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th className="table__cell--numeric">Amount</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
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
                <span className="badge badge--success">{expense.categoryName}</span>
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
                    onClick={() => onDelete(expense.id)}
                    title="Delete Expense"
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

export default ExpenseList;
