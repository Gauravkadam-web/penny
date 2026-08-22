import React from 'react';

export const Button = ({ children, variant = 'primary', onClick, type = 'button', disabled = false }) => {
  const getStyle = () => {
    switch (variant) {
      case 'danger':
        return { backgroundColor: 'var(--color-danger)', color: '#fff' };
      case 'secondary':
        return { backgroundColor: 'var(--color-card-border)', color: 'var(--color-text-main)' };
      default:
        return { backgroundColor: 'var(--color-primary)', color: '#fff' };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 18px',
        borderRadius: 'var(--border-radius-sm)',
        fontWeight: '600',
        fontSize: '0.9rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        opacity: disabled ? 0.6 : 1,
        transition: 'all var(--transition-speed)',
        ...getStyle(),
      }}
    >
      {children}
    </button>
  );
};
