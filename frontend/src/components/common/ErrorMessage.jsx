import React from 'react';

export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--color-danger)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-danger)', marginBottom: '16px', fontSize: '0.9rem' }}>
      {message}
    </div>
  );
};
