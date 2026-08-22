import React from 'react';

export const Loader = ({ text = 'Loading...' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', padding: 'var(--space-6)', color: 'var(--color-ink-soft)' }}>
      <div className="spinner" />
      <span>{text}</span>
    </div>
  );
};

export default Loader;
