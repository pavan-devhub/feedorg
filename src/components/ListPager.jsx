import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ListPager.css';

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
 * Page controls under a public list (the EPM directory, the register / volunteer pages), driven
 * by usePagedList. Changing page brings the top of the list - the element before this one, or
 * `scrollTarget` - back into view.
 */
export default function ListPager({ pager, noun = 'items', scrollTarget }) {
  const ref = useRef(null);
  const { page, pageCount, pageSize, start, total, setPage } = pager;
  if (total === 0) return null;

  const go = (next) => {
    setPage(next);
    const target = scrollTarget?.current || ref.current?.previousElementSibling;
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 140; // clear the fixed navbar
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="lp-pager" ref={ref} aria-label="Pages">
      <span className="lp-info">
        Showing <strong>{start + 1}–{Math.min(start + pageSize, total)}</strong> of <strong>{total}</strong> {noun}
      </span>
      <div className="lp-pages">
        <button type="button" className="lp-step" onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous page">
          <ChevronLeft size={16} /> <span>Prev</span>
        </button>
        {pageNumbers(page, pageCount).map((p, i) => (p === '…' ? (
          <span key={`gap-${i}`} className="lp-gap">…</span>
        ) : (
          <button key={p} type="button" className={`lp-num ${p === page ? 'active' : ''}`} aria-current={p === page ? 'page' : undefined}
            onClick={() => go(p)}>
            {p}
          </button>
        )))}
        <button type="button" className="lp-step" onClick={() => go(page + 1)} disabled={page === pageCount} aria-label="Next page">
          <span>Next</span> <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
