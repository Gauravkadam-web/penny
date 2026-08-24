import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  variant = 'danger',
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <AlertTriangle size={20} color={variant === 'danger' ? 'var(--color-rose)' : 'var(--color-gold)'} />
            <h3 className="modal__title" style={{ fontSize: 'var(--font-size-h3)' }}>{title}</h3>
          </div>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onCancel} disabled={loading}>
            <X size={18} />
          </button>
        </div>

        <div className="modal__body">
          <p style={{ color: 'var(--color-ink-soft)', lineHeight: '1.6', margin: 0 }}>
            {message}
          </p>
        </div>

        <div className="modal__footer">
          <button type="button" className="btn btn--secondary" onClick={onCancel} disabled={loading}>
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${variant === 'danger' ? 'btn--danger' : 'btn--primary'}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
