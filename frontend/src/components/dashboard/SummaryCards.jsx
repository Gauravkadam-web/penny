import React from 'react';
import { IndianRupee, Hash, TrendingUp, Award } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const SummaryCards = ({ summary = {}, expenses = [] }) => {
  // Dynamically compute This Month's spending
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let thisMonthSpend = 0;
  let thisMonthCount = 0;
  const categoryTotals = {};

  expenses.forEach((exp) => {
    const amount = Number(exp.amount) || 0;
    const catName = exp.categoryName || 'General';
    categoryTotals[catName] = (categoryTotals[catName] || 0) + amount;

    if (exp.expenseDate) {
      const expDate = new Date(exp.expenseDate);
      if (expDate.getFullYear() === currentYear && expDate.getMonth() === currentMonth) {
        thisMonthSpend += amount;
        thisMonthCount += 1;
      }
    }
  });

  // Dynamically identify Top Category
  let topCategoryName = 'None';
  let topCategoryAmount = 0;
  Object.entries(categoryTotals).forEach(([name, amt]) => {
    if (amt > topCategoryAmount) {
      topCategoryAmount = amt;
      topCategoryName = name;
    }
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="stats-grid">
      {/* 1. Total Spend */}
      <div className="stat-card">
        <div className="stat-card__icon" style={{ backgroundColor: 'var(--color-ledger-light)', color: 'var(--color-ledger)' }}>
          <IndianRupee size={22} />
        </div>
        <div className="stat-card__content">
          <p className="stat-card__label">Total Spend</p>
          <h2 className="stat-card__value">
            {formatCurrency(summary.totalAmount || 0)}
          </h2>
          <p className="stat-card__subtext">Across all records</p>
        </div>
      </div>

      {/* 2. Total Transactions */}
      <div className="stat-card">
        <div className="stat-card__icon" style={{ backgroundColor: 'rgba(217, 119, 6, 0.15)', color: 'var(--color-gold)' }}>
          <Hash size={22} />
        </div>
        <div className="stat-card__content">
          <p className="stat-card__label">Total Entries</p>
          <h2 className="stat-card__value">
            {summary.totalCount || 0}
          </h2>
          <p className="stat-card__subtext">Logged transactions</p>
        </div>
      </div>

      {/* 3. This Month's Spend */}
      <div className="stat-card">
        <div className="stat-card__icon" style={{ backgroundColor: 'rgba(37, 99, 235, 0.12)', color: '#2563EB' }}>
          <TrendingUp size={22} />
        </div>
        <div className="stat-card__content">
          <p className="stat-card__label">{monthNames[currentMonth]}</p>
          <h2 className="stat-card__value">
            {formatCurrency(thisMonthSpend)}
          </h2>
          <p className="stat-card__subtext">{thisMonthCount} entries this month</p>
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
            {topCategoryAmount > 0 ? formatCurrency(topCategoryAmount) : 'No spend yet'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
