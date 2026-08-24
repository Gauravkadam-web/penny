import React from 'react';
import { IndianRupee, Hash, TrendingUp, Award } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const SummaryCards = ({ summary = {}, expenses = [], timeframe = 'all' }) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Dynamic calculations on the passed expenses array
  const totalAmount = summary.totalAmount || 0;
  const totalCount = summary.totalCount || 0;

  // Calculate top category dynamically for the chosen timeframe
  const categoryTotals = {};
  expenses.forEach((exp) => {
    const amount = Number(exp.amount) || 0;
    const catName = exp.categoryName || 'General';
    categoryTotals[catName] = (categoryTotals[catName] || 0) + amount;
  });

  let topCategoryName = 'None';
  let topCategoryAmount = 0;
  Object.entries(categoryTotals).forEach(([name, amt]) => {
    if (amt > topCategoryAmount) {
      topCategoryAmount = amt;
      topCategoryName = name;
    }
  });

  // Calculate average per transaction dynamically
  const avgPerTxn = totalCount > 0 ? totalAmount / totalCount : 0;

  // Subtext labels based on timeframe
  const periodLabels = {
    all: 'All-time records',
    month: 'This month only',
    '30days': 'Past 30 days',
  };

  return (
    <div className="stats-grid">
      {/* 1. Period Spend */}
      <div className="stat-card">
        <div className="stat-card__icon" style={{ backgroundColor: 'var(--color-ledger-light)', color: 'var(--color-ledger)' }}>
          <IndianRupee size={22} />
        </div>
        <div className="stat-card__content">
          <p className="stat-card__label">
            {timeframe === 'all' ? 'Total Spend' : timeframe === 'month' ? 'This Month Spend' : '30-Day Spend'}
          </p>
          <h2 className="stat-card__value">
            {formatCurrency(totalAmount)}
          </h2>
          <p className="stat-card__subtext">{periodLabels[timeframe] || 'Filtered period'}</p>
        </div>
      </div>

      {/* 2. Total Transactions */}
      <div className="stat-card">
        <div className="stat-card__icon" style={{ backgroundColor: 'rgba(217, 119, 6, 0.15)', color: 'var(--color-gold)' }}>
          <Hash size={22} />
        </div>
        <div className="stat-card__content">
          <p className="stat-card__label">Transactions</p>
          <h2 className="stat-card__value">
            {totalCount}
          </h2>
          <p className="stat-card__subtext">{totalCount === 1 ? '1 entry' : `${totalCount} entries logged`}</p>
        </div>
      </div>

      {/* 3. Average Per Transaction */}
      <div className="stat-card">
        <div className="stat-card__icon" style={{ backgroundColor: 'rgba(37, 99, 235, 0.12)', color: '#2563EB' }}>
          <TrendingUp size={22} />
        </div>
        <div className="stat-card__content">
          <p className="stat-card__label">Avg / Transaction</p>
          <h2 className="stat-card__value">
            {formatCurrency(avgPerTxn)}
          </h2>
          <p className="stat-card__subtext">Average ticket size</p>
        </div>
      </div>

      {/* 4. Top Category */}
      <div className="stat-card">
        <div className="stat-card__icon" style={{ backgroundColor: 'rgba(124, 58, 237, 0.12)', color: '#7C3AED' }}>
          <Award size={22} />
        </div>
        <div className="stat-card__content">
          <p className="stat-card__label">Top Category</p>
          <h2 className="stat-card__value" style={{ fontSize: 'var(--font-size-h3)' }}>
            {topCategoryName}
          </h2>
          <p className="stat-card__subtext">
            {topCategoryAmount > 0 ? `${formatCurrency(topCategoryAmount)} spend` : 'No transactions'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
