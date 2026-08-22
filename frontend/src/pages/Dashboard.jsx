import React from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { RecentExpenses } from '../components/dashboard/RecentExpenses';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

export const Dashboard = () => {
  const { expenses, summary, loading, error } = useExpenses();

  if (loading) return <Loader text="Loading Ledger Summary..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Track your personal spend and dynamic categories in real-time.</p>
        </div>
      </div>

      <SummaryCards summary={summary} />
      <RecentExpenses expenses={expenses} />
    </div>
  );
};

export default Dashboard;
