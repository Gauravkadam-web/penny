import React from 'react';
import { Wallet } from 'lucide-react';

export const Navbar = () => {
  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <Wallet size={28} color="#6366f1" />
        <span style={styles.title}>Penny</span>
        <span style={styles.badge}>V1</span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: '64px',
    backgroundColor: 'var(--color-card)',
    borderBottom: '1px solid var(--color-card-border)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
  },
  badge: {
    backgroundColor: 'var(--color-primary-light)',
    color: 'var(--color-primary-hover)',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '2px 8px',
    borderRadius: '12px',
  },
};
