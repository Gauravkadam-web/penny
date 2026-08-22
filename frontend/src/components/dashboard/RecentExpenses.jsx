import React from 'react';
import { Card } from '../common/Card';
import { Table } from '../common/Table';
import { formatCurrency } from '../../utils/formatters';
import { formatDate } from '../../utils/dateUtils';
import { Link } from 'react-router-dom';

export const RecentExpenses = ({ expenses }) => {
  const recentList = expenses.slice(0, 5);

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Category', accessor: 'categoryName' },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (item) => formatCurrency(item.amount),
    },
    {
      header: 'Date',
      accessor: 'expenseDate',
      render: (item) => formatDate(item.expenseDate),
    },
  ];

  return (
    <Card
      title="Recent Expenses"
      extra={
        <Link to="/expenses" style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: '500' }}>
          View All →
        </Link>
      }
    >
      <Table columns={columns} data={recentList} emptyMessage="No recent expenses." />
    </Card>
  );
};
