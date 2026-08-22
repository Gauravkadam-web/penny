import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-state error-state--inline" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <AlertCircle size={18} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
