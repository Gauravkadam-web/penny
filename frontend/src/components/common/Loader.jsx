import React from 'react';

export const Loader = ({ message = 'Loading...' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', color: 'var(--color-text-muted)' }}>
      <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid var(--color-card-border)', borderTop: '2px solid var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <span>{message}</span>
    </div>
  );
};
