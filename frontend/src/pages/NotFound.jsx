import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '64px 16px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '16px' }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>Page Not Found</p>
      <Link to="/" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>← Back to Dashboard</Link>
    </div>
  );
};
