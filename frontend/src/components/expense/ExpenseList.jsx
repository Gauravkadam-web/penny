import React from 'react';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { formatDate } from '../../utils/dateUtils';

export const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      render: (item) => <span style={{ fontWeight: '600' }}>{item.title}</span>,
    },
    {
      header: 'Category',
      accessor: 'categoryName',
      render: (item) => (
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary-hover)',
          }}
        >
          {item.categoryName}
        </span>
      ),
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (item) => (
        <span style={{ fontWeight: '700', color: 'var(--color-text-main)' }}>
          {formatCurrency(item.amount)}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: 'expenseDate',
      render: (item) => formatDate(item.expenseDate),
    },
    {
      header: 'Actions',
      render: (item) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" onClick={() => onEdit(item)}>
            <Edit2 size={14} />
          </Button>
          <Button variant="danger" onClick={() => onDelete(item.id)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={expenses} emptyMessage="No expenses recorded yet." />;
};
