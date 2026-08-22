import React from 'react';
import { IndianRupee, Hash } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const SummaryCards = ({ summary }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-ledger-light)', color: 'var(--color-ledger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IndianRupee size={24} />
          </div>
          <div>
            <p className="form-label" style={{ marginBottom: '2px' }}>Total Spend</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-lg)', color: 'var(--color-ink)', margin: 0 }}>
              {formatCurrency(summary.totalAmount)}
            </h2>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(217, 119, 6, 0.15)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Hash size={24} />
          </div>
          <div>
            <p className="form-label" style={{ marginBottom: '2px' }}>Total Transactions</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-display-lg)', color: 'var(--color-ink)', margin: 0 }}>
              {summary.totalCount || 0}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
