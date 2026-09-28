import { useCallback, useEffect, useRef, useState } from 'react';

// Non-component helpers shared by the admin sections (kept apart from adminUi.jsx so that file
// only exports components, which React Fast Refresh needs).

/** A dismissing success/error strip, e.g. "Category added." */
export function useBanner() {
  const [banner, setBanner] = useState(null);
  const timer = useRef(null);
  const show = useCallback((type, message) => {
    clearTimeout(timer.current);
    setBanner({ type, message });
    timer.current = setTimeout(() => setBanner(null), 4500);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return [banner, show];
}

// --- formatting ---------------------------------------------------------------------------

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "2026-10-15" -> "15 Oct 2026" without any timezone shifting. */
export function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
}

/** "2026-09-26T17:42:00.77" -> "26 Sep 2026, 17:42". */
export function formatDateTime(iso) {
  if (!iso) return '—';
  const time = String(iso).slice(11, 16);
  return time ? `${formatDate(iso)}, ${time}` : formatDate(iso);
}

export const todayIso = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

/** Saves `rows` as a CSV file. `columns` is [{ label, value: (row) => any }]. */
export function downloadCsv(filename, columns, rows) {
  const escape = (v) => {
    const s = v === null || v === undefined ? '' : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [columns.map((c) => escape(c.label)).join(',')]
    .concat(rows.map((r) => columns.map((c) => escape(c.value(r))).join(',')));
  // BOM so Excel opens non-ASCII names (e.g. Telugu) correctly.
  const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
