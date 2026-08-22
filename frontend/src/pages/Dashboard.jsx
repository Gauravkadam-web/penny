import React from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { RecentExpenses } from '../components/dashboard/RecentExpenses';

export const Dashboard = () => {
  const { expenses, summary, loading, error } = useExpenses();

  if (loading) return <div style={{ color: 'var(--color-text-muted)' }}>Loading Dashboard...</div>;
  if (error) return <div style={{ color: 'var(--color-danger)' }}>{error}</div>;

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '24px' }}>Dashboard</h1>
      <SummaryCards summary={summary} />
      <RecentExpenses expenses={expenses} />
    </div>
  );
};
