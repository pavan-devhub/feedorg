import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { SOURCES } from './tradeFairsData';
import useVisitedLinks from './useVisitedLinks';

// Letter colour for each card's round badge, in listing order
const BADGE_COLORS = ['#ea6a12', '#2563eb', '#16a34a', '#7c3aed', '#dc2626', '#0d9488', '#db2777'];

// Entrance: the cards wait in a loose stack, then deal out one by one (in listing order)
// to their places once the list is in view
const DEAL_DELAY_MS = 250;
const DEAL_STEP_MS = 170;
const DEAL_DURATION_MS = 750;
const STACK_TILT = [-2, 3, -4, 2, -3, 4, -1];

const ENTRIES = Object.values(SOURCES).map((source, i) => ({ ...source, color: BADGE_COLORS[i % BADGE_COLORS.length], index: i }));

// Cards run down three columns in listing order, as in the mockup: the middle column
// starts higher; the cards split evenly, with a leftover going to the middle column
// first and then the left one (7 cards: 2-3-2, 8 cards: 3-3-2, 9 cards: 3-3-3)
const PER_COLUMN = Math.floor(ENTRIES.length / 3);
const LEFTOVER = ENTRIES.length % 3;
const COLUMN_SIZES = [PER_COLUMN + (LEFTOVER === 2 ? 1 : 0), PER_COLUMN + (LEFTOVER > 0 ? 1 : 0), PER_COLUMN];
const COLUMNS = COLUMN_SIZES.map((size, col) => {
  const start = COLUMN_SIZES.slice(0, col).reduce((sum, n) => sum + n, 0);
  return ENTRIES.slice(start, start + size);
});

const SourceCard = ({ name, description, url, color, visited, onVisit }) => (
  // On hover the card lifts, turns light pink and glows with a soft dark pink shade all
  // round its edge, on top of its usual drop shadow
  <div className="tf-source-card">
    <div className="tf-source-card__head">
      <span aria-hidden="true" className="tf-source-card__badge" style={{ color }}>
        {name[0]}
      </span>
      <strong className="tf-source-card__name">{name}</strong>
    </div>

    <div className="tf-source-card__desc">
      <p className="tf-source-card__row">
        <FileText size={16} strokeWidth={1.8} className="tf-source-card__icon" />
        {description}
      </p>
    </div>

    <div className="tf-source-card__actions">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View details on ${name} (opens in a new tab${visited ? ', visited' : ''})`}
        // Left click, Enter, or middle click to open in a new tab
        onClick={onVisit}
        onAuxClick={(event) => event.button === 1 && onVisit()}
        className={`tf-source-card__link${visited ? ' is-visited' : ''}`}
      >
        View details
      </a>
    </div>
  </div>
);

const SourcesSection = () => {
  const listRef = useRef(null);
  const cardRefs = useRef([]);
  // idle: plain layout (reduced motion or no IntersectionObserver); stacked: waiting; dealing: animating
  const [phase, setPhase] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined' ? 'idle' : 'stacked',
  );
  const [stack, setStack] = useState([]);
  const [landed, setLanded] = useState(0);
  const [visited, markVisited] = useVisitedLinks('visited-sources');

  // Offset from each card's own place to the stack point. offsetLeft/Top ignore transforms,
  // so this can re-run while the cards are stacked
  const measure = useCallback(() => {
    const list = listRef.current;
    const cards = cardRefs.current;
    if (!list || cards.length !== ENTRIES.length || cards.some((card) => !card)) return;
    // Middle of the grid on wide screens; in the single column, where the first card sits
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const x = list.clientWidth / 2;
    const y = wide ? list.clientHeight / 2 : cards[0].offsetTop + cards[0].offsetHeight / 2;
    setStack(
      cards.map((card, i) => ({
        x: x - (card.offsetLeft + card.offsetWidth / 2),
        y: y - (card.offsetTop + card.offsetHeight / 2) + i * 4,
        tilt: STACK_TILT[i % STACK_TILT.length],
      })),
    );
  }, []);

  // Stack before the first paint so the cards never flash in their final places
  useLayoutEffect(() => {
    if (phase !== 'stacked') return;
    measure();
    document.fonts?.ready.then(measure);
  }, [phase, measure]);

  // Deal once most of the list (or most of the screen, for the tall single column) is in view
  useEffect(() => {
    if (phase !== 'stacked') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const needed = Math.min(entry.boundingClientRect.height, window.innerHeight) * 0.6;
        if (entry.isIntersecting && entry.intersectionRect.height >= needed) setPhase('dealing');
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    observer.observe(listRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [phase, measure]);

  const dealStyle = (i) => {
    const offset = stack[i];
    if (phase === 'idle' || !offset || i < landed) return undefined;
    // Cards still in the stack, or in flight, ride above the ones already placed; the top card goes first
    const zIndex = 10 + ENTRIES.length - i;
    if (phase === 'stacked') {
      return { transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.tilt}deg)`, zIndex };
    }
    return {
      transform: 'none',
      transition: `transform ${DEAL_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${DEAL_DELAY_MS + i * DEAL_STEP_MS}ms`,
      zIndex,
    };
  };

  return (
    <section aria-labelledby="sources-title" className="tf-shell tf-section">
      <div className="tf-sources">
        {/* Faint ring in the top-left corner */}
        <div aria-hidden="true" className="tf-sources__ring" />

        <h2 id="sources-title" className="tf-sources__title">
          Official sources for fair listings
        </h2>

        {/* One column on small screens; three staggered columns from 1024px up */}
        <div ref={listRef} role="list" className="tf-sources__list">
          {COLUMNS.map((cards, col) => (
            <div key={col} className={`tf-sources__column${col === 1 ? '' : ' tf-sources__column--side'}`}>
              {cards.map((source) => (
                <div
                  key={source.url}
                  ref={(el) => {
                    cardRefs.current[source.index] = el;
                  }}
                  role="listitem"
                  className="tf-sources__item"
                  style={dealStyle(source.index)}
                  onTransitionEnd={(e) => {
                    if (e.target === e.currentTarget && e.propertyName === 'transform') {
                      setLanded((n) => Math.max(n, source.index + 1));
                    }
                  }}
                >
                  <SourceCard {...source} visited={visited.has(source.url)} onVisit={() => markVisited(source.url)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SourcesSection;
