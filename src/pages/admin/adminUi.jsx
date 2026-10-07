import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Loader2, Trash2, X } from 'lucide-react';
import { epmStatusTags } from '../../utils/epmStatus';
import { PAGE_SIZES } from './adminUtils';

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

export function FormActions({ onCancel, busy, submitLabel, busyLabel, danger = false, onSubmit, cancelLabel = 'Cancel' }) {
  return (
    <div className="admin-pub-form-actions">
      <button type="button" onClick={onCancel} disabled={busy}>{cancelLabel}</button>
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

/** "Are you sure?" dialog for deletes and the like. `onConfirm` may be async; errors are shown inline. */
export function ConfirmDialog({
  title, children, confirmLabel = 'Delete', busyLabel = 'Deleting…', icon: Icon = Trash2, danger = true, cancelLabel,
  onConfirm, onCancel,
}) {
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
    <Modal title={title} icon={Icon} onClose={onCancel} busy={busy} size="narrow">
      <div className="admin-pub-form">
        <FormError message={error} />
        {children}
        <FormActions onCancel={onCancel} busy={busy} danger={danger} submitLabel={<><Icon size={14} /> {confirmLabel}</>}
          busyLabel={busyLabel} onSubmit={confirm} cancelLabel={cancelLabel} />
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

/** An EPM's status: "On schedule", "Venue changed", "Cancelled"... (see utils/epmStatus). */
export function EpmStatusTags({ event }) {
  return (
    <div className="adm-cell-tags">
      {epmStatusTags(event).map((t) => <span key={t.label} className={`adm-tag adm-tag-${t.tone}`}>{t.label}</span>)}
    </div>
  );
}

// 1 … 4 5 6 … 12 - the first and last page, and the current one with its neighbours.
function pageNumbers(page, pageCount) {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);
  const pages = [1];
  const from = Math.max(2, Math.min(page - 1, pageCount - 4));
  const to = Math.min(pageCount - 1, Math.max(page + 1, 5));
  if (from > 2) pages.push('…');
  for (let p = from; p <= to; p += 1) pages.push(p);
  if (to < pageCount - 1) pages.push('…');
  pages.push(pageCount);
  return pages;
}

/**
 * Page controls under an admin list, driven by a server-paged list (see hooks/useServerPagedList). Shown whenever the list has rows, so the rows-per-page choice is always at
 * hand. Changing page brings the top of the list back into view. `sizes` overrides the
 * rows-per-page choices.
 */
export function Pagination({ pager, noun = 'records', sizes = PAGE_SIZES }) {
  const ref = useRef(null);
  const { page, pageCount, pageSize, start, total, setPage, setPageSize } = pager;
  if (total === 0) return null;

  const go = (next) => {
    setPage(next);
    ref.current?.parentElement?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <div className="adm-pager" ref={ref}>
      <span className="adm-pager-info">
        Showing <strong>{start + 1}–{Math.min(start + pageSize, total)}</strong> of <strong>{total}</strong> {noun}
      </span>
      <div className="adm-pager-controls">
        <label className="adm-pager-size">
          Rows per page
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            {sizes.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <nav className="adm-pager-pages" aria-label="Pages">
          <button type="button" onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous page"><ChevronLeft size={16} /></button>
          {pageNumbers(page, pageCount).map((p, i) => (p === '…' ? (
            <span key={`gap-${i}`} className="adm-pager-gap">…</span>
          ) : (
            <button key={p} type="button" className={p === page ? 'active' : undefined} aria-current={p === page ? 'page' : undefined} onClick={() => go(p)}>
              {p}
            </button>
          )))}
          <button type="button" onClick={() => go(page + 1)} disabled={page === pageCount} aria-label="Next page"><ChevronRight size={16} /></button>
        </nav>
      </div>
    </div>
  );
}

export function Empty({ children }) {
  return <div className="admin-pub-empty">{children}</div>;
}
