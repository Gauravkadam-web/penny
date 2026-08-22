import React from 'react';
import { Card } from '../common/Card';
import { IndianRupee, Hash } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const SummaryCards = ({ summary }) => {
  return (
    <div style={styles.grid}>
      <Card>
        <div style={styles.cardContent}>
          <div style={{ ...styles.iconWrapper, backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--color-primary)' }}>
            <IndianRupee size={24} />
          </div>
          <div>
            <p style={styles.label}>Total Spending</p>
            <h2 style={styles.value}>{formatCurrency(summary.totalAmount)}</h2>
          </div>
        </div>
      </Card>

      <Card>
        <div style={styles.cardContent}>
          <div style={{ ...styles.iconWrapper, backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-success)' }}>
            <Hash size={24} />
          </div>
          <div>
            <p style={styles.label}>Total Expense Records</p>
            <h2 style={styles.value}>{summary.totalCount || 0}</h2>
          </div>
        </div>
      </Card>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    fontWeight: '500',
  },
  value: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--color-text-main)',
  },
};
