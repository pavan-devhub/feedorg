import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Trash2, X } from 'lucide-react';

// Small building blocks shared by every admin section. They reuse the admin-pub-* styles from
// AdminDashboard.css (the Feed World publications screen), so EPM and Feed World admin look alike.

export function Modal({ title, icon: Icon, onClose, busy = false, size, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !busy) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [busy, onClose]);

  const sizeClass = size === 'wide' ? ' admin-pub-modal-wide' : size === 'narrow' ? ' admin-pub-modal-narrow' : size === 'medium' ? ' adm-modal-medium' : '';
  return (
    <div className="admin-pub-modal-backdrop" onClick={() => !busy && onClose()}>
      <div className={`admin-pub-modal${sizeClass}`} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="admin-pub-modal-header">
          <h3>{Icon && <Icon size={18} />} {title}</h3>
          <button type="button" onClick={onClose} disabled={busy} aria-label="Close"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return <div className="admin-pub-form-error"><AlertCircle size={14} /> {message}</div>;
}

export function FormActions({ onCancel, busy, submitLabel, busyLabel, danger = false, onSubmit }) {
  return (
    <div className="admin-pub-form-actions">
      <button type="button" onClick={onCancel} disabled={busy}>Cancel</button>
      <button
        type={onSubmit ? 'button' : 'submit'}
        className={danger ? 'danger' : 'primary'}
        disabled={busy}
        onClick={onSubmit}
      >
        {busy ? (<><Loader2 size={14} className="admin-pub-spin" /> {busyLabel}</>) : submitLabel}
      </button>
    </div>
  );
}

/** "Are you sure?" dialog for deletes. `onConfirm` may be async; errors are shown inline. */
export function ConfirmDialog({ title, children, confirmLabel = 'Delete', onConfirm, onCancel }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const confirm = async () => {
    setBusy(true);
    setError('');
    try {
      await onConfirm();
    } catch (e) {
      setError(e.message || 'Something went wrong.');
      setBusy(false);
    }
  };
  return (
    <Modal title={title} icon={Trash2} onClose={onCancel} busy={busy} size="narrow">
      <div className="admin-pub-form">
        <FormError message={error} />
        {children}
        <FormActions onCancel={onCancel} busy={busy} danger submitLabel={<><Trash2 size={14} /> {confirmLabel}</>}
          busyLabel="Deleting…" onSubmit={confirm} />
      </div>
    </Modal>
  );
}

export function Banner({ banner }) {
  if (!banner) return null;
  return (
    <div className={`admin-pub-banner ${banner.type}`} role="status">
      {banner.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {banner.message}
    </div>
  );
}

export function SectionHeader({ eyebrow, icon: Icon, title, description, children }) {
  return (
    <div className="admin-pub-header">
      <div>
        <div className="admin-pub-eyebrow">{Icon && <Icon size={14} />} {eyebrow}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children && <div className="adm-header-actions">{children}</div>}
    </div>
  );
}

export function Loading({ label = 'Loading…' }) {
  return <div className="admin-pub-empty"><Loader2 size={18} className="admin-pub-spin" /> {label}</div>;
}

export function Empty({ children }) {
  return <div className="admin-pub-empty">{children}</div>;
}
