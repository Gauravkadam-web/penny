import React from 'react';

export const Card = ({ title, children, extra }) => {
  return (
    <div style={styles.card}>
      {(title || extra) && (
        <div style={styles.header}>
          {title && <h3 style={styles.title}>{title}</h3>}
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div style={styles.body}>{children}</div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--color-card)',
    border: '1px solid var(--color-card-border)',
    borderRadius: 'var(--border-radius)',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'var(--color-text-main)',
  },
  body: {},
};
