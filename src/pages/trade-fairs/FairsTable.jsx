import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { SOURCES } from './tradeFairsData';
import useVisitedLinks from './useVisitedLinks';

export const PAGE_SIZE = 8;

// Sl. No. is the navy number strip; the rest follow the mockup's column widths and text insets
const COLUMNS = [
  { width: '53px' },
  { width: '22%', pad: 16 },
  { width: '21.1%', pad: 20 },
  { width: '14.6%', pad: 17 },
  { width: '21.2%', pad: 23 },
  { width: '17.3%', pad: 15 },
];

// Pastel chip per ministry; ministries not listed use the Commerce blue
const CHIP_COLORS = {
  'Ministry of Commerce': { background: '#dbe7fd', color: '#1f47bf' },
  'Ministry of Animal Husbandry': { background: '#cbfbe4', color: '#145c3c' },
  'Ministry of MSME': { background: '#ecddfd', color: '#5b2bc4' },
  'Ministry of Agriculture': { background: '#fde3bc', color: '#c47417' },
  'Ministry of Food Processing': { background: '#fce0ec', color: '#b3245f' },
  'Ministry of Textiles': { background: '#d2f1f5', color: '#127580' },
  'Ministry of Health & Family Welfare': { background: '#fde0dc', color: '#c2352b' },
  'Ministry of Chemicals & Fertilizers': { background: '#fbf1c4', color: '#8a6a00' },
};

// Entrance: once the table is in view, its text rains in from the right edge, row by row
// from the top, each row's cells a beat apart from left to right. Only the text moves;
// cell colours stay put. Plays once per visit, so later page or filter changes
// show their rows in place
const RAIN_START_PX = 200; // banner, gold rule and header row
const RAIN_DELAY_MS = 150;
const RAIN_ROW_STEP_MS = 110;
const RAIN_COL_STEP_MS = 35;
const RAIN_DURATION_MS = 900;
const RAIN_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

// e.g. "14 Oct 2026"
const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const FairsTable = ({ scope, fairs, page, onPageChange, onClearFilters }) => {
  const cardRef = useRef(null);
  const pages = Math.max(1, Math.ceil(fairs.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const first = (current - 1) * PAGE_SIZE;
  const rows = fairs.slice(first, first + PAGE_SIZE);
  const placeLabel = scope === 'international' ? 'Country' : 'State';
  const scopeLabel = scope === 'international' ? 'International' : 'National';
  const [visited, markVisited] = useVisitedLinks('visited-fairs');

  // idle: plain layout (reduced motion, no IntersectionObserver, or already played);
  // waiting: text held off to the right; raining: animating
  const [rain, setRain] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined' ? 'idle' : 'waiting',
  );

  const goTo = (next) => {
    onPageChange(next);
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Rain as soon as the banner and the header row are on screen; the rows below land
  // in turn, top first
  useEffect(() => {
    if (rain !== 'waiting') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const needed = Math.min(entry.boundingClientRect.height, RAIN_START_PX);
        if (entry.isIntersecting && entry.intersectionRect.height >= needed) setRain('raining');
      },
      { threshold: Array.from({ length: 41 }, (_, i) => i / 40) },
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [rain]);

  // Back to the plain layout once the last row has landed
  useEffect(() => {
    if (rain !== 'raining') return undefined;
    const lastStart = RAIN_DELAY_MS + rows.length * RAIN_ROW_STEP_MS + (COLUMNS.length - 1) * RAIN_COL_STEP_MS;
    const timer = setTimeout(() => setRain('idle'), lastStart + RAIN_DURATION_MS);
    return () => clearTimeout(timer);
  }, [rain, rows.length]);

  // Row 0 is the header. The text starts a full screen width to the right, past the
  // table's clipped edge, so it enters from the right side
  const rainStyle = (row, col) => {
    if (rain === 'idle') return undefined;
    if (rain === 'waiting') return { transform: 'translateX(100vw)', opacity: 0 };
    const delay = RAIN_DELAY_MS + row * RAIN_ROW_STEP_MS + col * RAIN_COL_STEP_MS;
    return {
      transform: 'none',
      opacity: 1,
      transition: `transform ${RAIN_DURATION_MS}ms ${RAIN_EASE} ${delay}ms, opacity ${RAIN_DURATION_MS}ms ease-out ${delay}ms`,
    };
  };

  return (
    <section className="tf-shell tf-section">
      <div ref={cardRef} className="tf-fairs">
        {/* Banner: title on the left, illustration and scope tab on the right */}
        <div className="tf-fairs__banner">
          <div aria-hidden="true" className="tf-fairs__art">
            <img src="/images/trade-fairs/fairs-banner-art.png" alt="" />
          </div>

          <h2 id="fairs-title" className="tf-fairs__title">
            <span className="tf-fairs__scope">{scopeLabel}</span>
            <span className="tf-fairs__label">TRADE FAIRS</span>
          </h2>

          <div className="tf-fairs__tab">{scopeLabel} Trade Fairs</div>
        </div>
        <div className="tf-fairs__rule" />

        <div className="tf-fairs__body">
          {fairs.length === 0 ? (
            <div className="tf-fairs__empty">
              <h3>No fairs match these filters</h3>
              <p>Choose "All" for sector, {placeLabel.toLowerCase()} or month, or clear the filters.</p>
              <button type="button" onClick={onClearFilters} className="tf-page-btn is-current">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Clip the incoming text instead of showing a scrollbar for it while it rains in */}
              <div className={`tf-fairs__scroller${rain === 'idle' ? '' : ' is-raining'}`}>
                <table aria-labelledby="fairs-title" className="tf-table">
                  <colgroup>
                    {COLUMNS.map(({ width }, i) => (
                      <col key={i} style={{ width }} />
                    ))}
                  </colgroup>
                  <thead>
                    <tr>
                      {['Sl. No.', 'Fair', 'Sector', placeLabel, 'Dates', 'Details'].map((label, col) => (
                        <th
                          key={label}
                          scope="col"
                          className={COLUMNS[col].pad ? undefined : 'is-centered'}
                          style={{ paddingLeft: COLUMNS[col].pad }}
                        >
                          <div style={rainStyle(0, col)}>{label}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((fair, i) => {
                      const source = SOURCES[fair.source];
                      const cellProps = (col, extra = '') => ({
                        className: `tf-table__cell${extra ? ` ${extra}` : ''}`,
                        style: { paddingLeft: COLUMNS[col].pad },
                      });
                      const rainIn = (col) => rainStyle(i + 1, col);
                      const id = `${fair.name}-${fair.start}`;
                      const seen = visited.has(id);
                      return (
                        <tr key={id} className={i % 2 ? 'is-odd' : undefined}>
                          {/* One continuous navy strip, rounded at its first and last row */}
                          <td className={`tf-table__num${i === 0 ? ' is-first' : ''}${i === rows.length - 1 ? ' is-last' : ''}`}>
                            <div style={rainIn(0)}>{first + i + 1}</div>
                          </td>
                          <td {...cellProps(1)}>
                            <div style={rainIn(1)}>
                              <span className="tf-table__fair-name">{fair.name}</span>
                              <span className="tf-table__fair-city">{fair.city}</span>
                            </div>
                          </td>
                          <td {...cellProps(2)}>
                            <span className="tf-chip" style={{ ...(CHIP_COLORS[fair.sector] ?? CHIP_COLORS['Ministry of Commerce']), ...rainIn(2) }}>
                              {fair.sector}
                            </span>
                          </td>
                          <td {...cellProps(3, 'tf-table__text')}>
                            <div style={rainIn(3)}>{fair.place}</div>
                          </td>
                          <td {...cellProps(4, 'tf-table__text tf-table__dates')}>
                            <div style={rainIn(4)}>
                              {formatDate(fair.start)} to {formatDate(fair.end)}
                            </div>
                          </td>
                          <td {...cellProps(5)}>
                            <div style={rainIn(5)}>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View details of ${fair.name} on ${source.name} (opens in a new tab${seen ? ', visited' : ''})`}
                                // Left click, Enter, or middle click to open in a new tab
                                onClick={() => markVisited(id)}
                                onAuxClick={(event) => event.button === 1 && markVisited(id)}
                                className={`tf-details-link${seen ? ' is-visited' : ''}`}
                              >
                                View details
                                <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
                              </a>
                              <span className="tf-table__source">{source.name}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {pages > 1 && (
                <nav aria-label="Pagination" className="tf-pager">
                  <button type="button" disabled={current === 1} onClick={() => goTo(current - 1)} className="tf-page-btn">
                    Previous
                  </button>
                  <div className="tf-pager__pages">
                    {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        type="button"
                        aria-label={`Page ${n}`}
                        aria-current={n === current ? 'page' : undefined}
                        onClick={() => goTo(n)}
                        className={`tf-page-btn${n === current ? ' is-current' : ''}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <button type="button" disabled={current === pages} onClick={() => goTo(current + 1)} className="tf-page-btn">
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FairsTable;
