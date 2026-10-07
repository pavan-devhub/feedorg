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

// --- paging -------------------------------------------------------------------------------

// Every admin list is paged by the server (see hooks/useServerPagedList), this many rows at a time.

/** Rows-per-page choices for the admin lists. */
export const PAGE_SIZES = [5, 10, 20, 50];
export const DEFAULT_PAGE_SIZE = 10;

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

/** 16455069 -> "15.7 MB", 5120 -> "5 KB"; null for no size. */
export const formatSize = (bytes) => {
  if (!bytes) return null;
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

export const todayIso = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};
