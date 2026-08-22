import React from 'react';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-text-main)' }}>{expense.title}</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{expense.categoryName} • {formatDate(expense.expenseDate)}</p>
        </div>
        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-primary)' }}>
          {formatCurrency(expense.amount)}
        </span>
      </div>
    </Card>
  );
};
