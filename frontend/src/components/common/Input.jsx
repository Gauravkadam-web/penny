import React from 'react';

export const Input = ({ label, name, type = 'text', value, onChange, placeholder, required = false, error }) => {
  return (
    <div style={styles.group}>
      {label && (
        <label style={styles.label}>
          {label} {required && <span style={styles.req}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          ...styles.input,
          borderColor: error ? 'var(--color-danger)' : 'var(--color-card-border)',
        }}
      />
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
};

const styles = {
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--color-text-muted)',
  },
  req: {
    color: 'var(--color-danger)',
  },
  input: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text-main)',
    border: '1px solid var(--color-card-border)',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.95rem',
    outline: 'none',
  },
  errorText: {
    fontSize: '0.75rem',
    color: 'var(--color-danger)',
  },
};
