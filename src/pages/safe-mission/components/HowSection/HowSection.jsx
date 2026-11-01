import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './HowSection.css';

// Step photos p1–p10 (frame cropped, resized for web)
import p1 from '../../assets/how/steps/p1.jpg';
import p2 from '../../assets/how/steps/p2.jpg';
import p3 from '../../assets/how/steps/p3.jpg';
import p4 from '../../assets/how/steps/p4.jpg';
import p5 from '../../assets/how/steps/p5.jpg';
import p6 from '../../assets/how/steps/p6.jpg';
import p7 from '../../assets/how/steps/p7.jpg';
import p8 from '../../assets/how/steps/p8.jpg';
import p9 from '../../assets/how/steps/p9.jpg';
import p10 from '../../assets/how/steps/p10.jpg';

/*
  Board geometry, in board units (the board is 1500 units wide and scales as a whole).
  Rows hold 2 - 3 - 3 - 2 cards (two-card rows centred), every card is 400 units wide (see HowSection.css).
  Each card is the photo on top with the heading and text below, and ends right after its
  own text, so card heights are measured. Cards in a row share the same top; each row is as
  tall as its tallest card.
  Each row is centred, with COL_GAP between neighbouring cards (an arrow sits in each gap).
*/
const BOARD_W = 1500;
const CARD_W = 400;
const COL_GAP = 110; // horizontal space between cards in a row
const ROW_GAP = 150; // vertical space between card rows

// Step-wise Execution of SAFE Mission (SAFE_Mission_V4_EN, page 3)
const STEPS = [
  {
    num: '01', title: 'District-Level Export Promotional Meeting',
    desc: 'FEED MSCS conducts an Export Promotional Meeting (EPM) in every district.',
    image: p1, row: 0, accent: '#16a34a', border: '#22c55e', titleColor: '#15803d',
  },
  {
    num: '02', title: 'Establish District SAFE Mission Society (DSMS)',
    desc: 'Interested and eligible stakeholders (participated in EPM) come together to establish a District SAFE Mission Society (DSMS).',
    image: p2, row: 0, accent: '#2563eb', border: '#3b82f6', titleColor: '#1565d8',
  },
  {
    num: '03', title: 'Mobilise Land & Government Support',
    desc: 'Approx. 20 acres of land is mobilised with appropriate government support and developed as a District Model SAFE Agricultural Export Zone.',
    image: p3, row: 1, accent: '#f97316', border: '#fb923c', titleColor: '#e8590c',
  },
  {
    num: '04', title: 'Scientific & Export-Oriented Crop Planning',
    desc: "Based on the district's agro-climatic conditions, soil, water availability, market demand, and export opportunities, the zone is planned for:",
    points: ['Multi-layer farming', 'High-value crops', 'Sustainable crops', 'Export-oriented crop combinations', 'Applicable EU/international quality requirements'],
    image: p4, row: 1, accent: '#16a34a', border: '#22c55e', titleColor: '#15803d',
  },
  {
    num: '05', title: 'Cooperative Farming & Production',
    desc: 'Farmers participate through cooperative farming, enabling:',
    points: ['Collective production', 'Standardised cultivation practices', 'Efficient resource utilisation', 'Better scale', 'Traceability and production discipline'],
    image: p5, row: 1, accent: '#e11d48', border: '#fb7185', titleColor: '#d1213f',
  },
  {
    num: '06', title: 'Quality Control & Export Compliance',
    desc: 'Production follows applicable quality, food-safety, residue, traceability, and export requirements, supported by:',
    points: ['Scientific crop practices', 'Quality monitoring', 'Testing', 'GAP and applicable international standards'],
    image: p6, row: 2, accent: '#7c3aed', border: '#a78bfa', titleColor: '#4f3fd1',
  },
  {
    num: '07', title: 'Build the Common Infrastructure',
    desc: 'An integrated export infrastructure ecosystem created through convergence of Central and State Government schemes, covering:',
    chain: ['Packhouse', 'CFC', 'Cold Chain', 'Testing', 'Grading', 'Processing', 'Value Addition', 'Packaging'],
    image: p9, row: 2, accent: '#f59e0b', border: '#fbbf24', titleColor: '#dd5a0e',
  },
  {
    num: '08', title: 'Value Addition & Branding',
    desc: 'Raw agricultural produce is transformed into high-value market-ready products through:',
    points: ['Processing', 'Value addition', 'Product development', 'Branding', 'Standardised packaging', 'Domestic and export-ready presentation'],
    image: p7, row: 2, accent: '#f43f5e', border: '#fb7185', titleColor: '#dc1f3c',
  },
  {
    num: '09', title: 'Commodity Trade & Market Linkages',
    desc: 'The ecosystem connects production with:',
    points: ['Domestic buyers', 'Institutional buyers', 'Traders', 'International buyers', 'Commodity markets', 'Export markets'],
    image: p8, row: 3, accent: '#2563eb', border: '#60a5fa', titleColor: '#1d40a8',
  },
  {
    num: '10', title: 'Farm-to-Global Export',
    desc: 'Qualified produce and value-added products are channelled into:',
    points: ['Domestic market through My Market Service', 'International markets through Krushi Yeva Jayate (KYJ) service'],
    image: p10, row: 3, accent: '#7c3aed', border: '#a78bfa', titleColor: '#6d28d9',
  },
];

// Rows of cards: each row is as tall as its tallest card, with ROW_GAP between rows
const ROWS = Math.max(...STEPS.map((s) => s.row)) + 1;

// Left edge of each card: rows centred on the board
const STEP_X = STEPS.map((step, i) => {
  const inRow = STEPS.filter((s) => s.row === step.row);
  const rowW = inRow.length * CARD_W + (inRow.length - 1) * COL_GAP;
  const k = STEPS.slice(0, i).filter((s) => s.row === step.row).length;
  return (BOARD_W - rowW) / 2 + k * (CARD_W + COL_GAP);
});

function buildBoard(cardHeights) {
  const rowTop = [];
  const rowBottom = [];
  let y = 34;
  for (let r = 0; r < ROWS; r++) {
    const tallest = Math.max(0, ...STEPS.map((s, i) => (s.row === r ? cardHeights[i] : 0)));
    rowTop.push(y);
    rowBottom.push(y + tallest);
    y += tallest + ROW_GAP;
  }
  return { rowTop, rowBottom, height: rowBottom[ROWS - 1] + 34 };
}

const ARROW_Y = 13.5 + ((CARD_W - 27) * 430) / 760 / 2; // level with the middle of the photos (padding + border + half the 760x430 photo)
const ELBOW_R = 26; // corner radius of the connectors between rows
const HEAD = 10; // arrowhead size

/*
  Connectors from each step to the next, all in one style (line, start dot, arrowhead):
  straight across the gap between neighbours in a row, and an elbow from the last card of a
  row down to the first card of the next row.
  arrowY = height of the straight connectors below the row top; heights = current card heights.
*/
function buildArrows({ rowTop, rowBottom }, heights, arrowY) {
  const links = [];
  for (let i = 0; i < STEPS.length - 1; i++) {
    const a = STEPS[i];
    const b = STEPS[i + 1];
    if (a.row === b.row) {
      const y = rowTop[a.row] + arrowY;
      const sx = STEP_X[i] + CARD_W + 10;
      const ex = STEP_X[i + 1] - 10;
      links.push({
        key: a.num,
        d: `M ${sx} ${y} H ${ex}`,
        start: { x: sx, y },
        head: `M ${ex - HEAD} ${y - HEAD} L ${ex} ${y} L ${ex - HEAD} ${y + HEAD}`,
      });
      continue;
    }
    const sx = STEP_X[i] + CARD_W / 2;
    const sy = rowTop[a.row] + heights[i] + 10;
    const ex = STEP_X[i + 1] + CARD_W / 2;
    const ey = rowTop[b.row] - 10;
    const gy = rowBottom[a.row] + ROW_GAP / 2;
    const dir = ex < sx ? -1 : 1;
    const d = [
      `M ${sx} ${sy}`,
      `V ${gy - ELBOW_R}`,
      `Q ${sx} ${gy} ${sx + dir * ELBOW_R} ${gy}`,
      `H ${ex - dir * ELBOW_R}`,
      `Q ${ex} ${gy} ${ex} ${gy + ELBOW_R}`,
      `V ${ey}`,
    ].join(' ');
    links.push({
      key: a.num,
      d,
      start: { x: sx, y: sy },
      head: `M ${ex - HEAD} ${ey - HEAD} L ${ex} ${ey} L ${ex + HEAD} ${ey - HEAD}`,
    });
  }
  return links;
}

/*
  Collapsed: photo, heading, the first line of text and "Read more".
  Open: the full text plus the bullets / chain slide open inside the card.
*/
function StepCard({ step, open, onToggle, idPrefix, className = '' }) {
  const moreId = `${idPrefix}-more-${step.num}`;
  const hasMore = Boolean(step.points || step.chain);
  return (
    <article className={`how-card ${className}`} data-open={open || undefined}>
      <img src={step.image} alt={step.title} className="how-card-img" loading="lazy" />
      <div className="how-card-info">
        {/* Step number below the photo, at the start of the heading */}
        <div className="how-card-head">
          <span className="how-badge">{step.num}</span>
          <h3 className="how-card-title">{step.title}</h3>
        </div>
        <p className={`how-card-desc${open ? '' : ' is-clamped'}`}>{step.desc}</p>
        {hasMore && (
          <div className="how-card-more" id={moreId}>
            <div className="how-card-more-inner">
              {step.points && (
                <ul className="how-card-points">
                  {step.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              {step.chain && (
                <p className="how-card-chain">
                  {step.chain.map((item, i) => (
                    <React.Fragment key={item}>
                      {i > 0 && (
                        <>
                          {' '}
                          <span className="how-chain-arrow" aria-hidden="true">→</span>{' '}
                        </>
                      )}
                      <span className="how-chain-item">{item}</span>
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        className="how-card-toggle"
        aria-expanded={open}
        aria-controls={hasMore ? moreId : undefined}
        onClick={onToggle}
      >
        <span className="how-toggle-label">{open ? 'Read less' : 'Read more'}</span>
        <svg className="how-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </article>
  );
}

/*
  Heights of a card in px, ignoring its min-height:
  `current` - as it is right now (mid-animation included),
  `target` - once its open / close animation has finished,
  `collapsed` - with only one line of text (null while the card is open).
  Read more is pinned to the bottom, so its height is added on.
*/
function cardHeights(card) {
  const top = card.getBoundingClientRect().top;
  const cs = getComputedStyle(card);
  const tail =
    card.querySelector('.how-card-toggle').getBoundingClientRect().height +
    parseFloat(cs.paddingBottom) +
    parseFloat(cs.borderBottomWidth);
  const open = card.hasAttribute('data-open');
  const descBottom = card.querySelector('.how-card-desc').getBoundingClientRect().bottom - top;
  const more = card.querySelector('.how-card-more-inner');
  return {
    current: card.querySelector('.how-card-info').getBoundingClientRect().bottom - top + tail,
    target: descBottom + (open && more ? more.scrollHeight : 0) + tail,
    collapsed: open ? null : descBottom + tail,
  };
}

const maxOf = (values) => Math.ceil(Math.max(0, ...values.filter(Number.isFinite)));

// One-time intro: the cards lift one after another (01 → 10), as if hovered
const CARD_PULSE = 800; // ms a card stays lifted
const PULSE_STEP = 650; // ms between one card and the next

// Lift a card for a moment (same look as hovering it)
const pulseCard = (el) => {
  if (!el) return;
  el.classList.add('is-pulse');
  setTimeout(() => el.classList.remove('is-pulse'), CARD_PULSE);
};

const stepVars = (step) => ({
  '--accent': step.accent,
  '--border': step.border,
  '--title': step.titleColor,
});

export default function HowSection() {
  const boardRef = useRef(null);
  const mobileRef = useRef(null);
  const collapsedBoard = useRef([]); // collapsed height per card, board units
  const collapsedMobile = useRef([]); // collapsed height per card, px
  const measureRef = useRef(null);
  const [openSteps, setOpenSteps] = useState(() => new Set());
  const [layout, setLayout] = useState(() => ({ heights: STEPS.map(() => 360), collapsed: 360 }));
  const [mobileMin, setMobileMin] = useState(0);
  const board = buildBoard(layout.heights);
  const arrows = buildArrows(board, layout.heights, ARROW_Y);

  const toggleStep = (num) =>
    setOpenSteps((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });

  /*
    Collapsed cards all share the tallest collapsed height; an open card is as tall as its
    content. Re-measured on resize, font load and while a card opens / closes, so the rows
    below move with it.
  */
  useLayoutEffect(() => {
    const boardEl = boardRef.current;
    const mobileEl = mobileRef.current;
    if (!boardEl || !mobileEl) return undefined;

    const measureBoard = () => {
      const width = boardEl.getBoundingClientRect().width;
      if (!width) return; // board hidden (mobile layout)
      const u = width / BOARD_W;
      // An opening card reserves its full height at once (rows below move first, then it
      // grows into the space); a closing card keeps its space until it has shrunk.
      const needed = [...boardEl.querySelectorAll('.how-card')].map((card, i) => {
        const h = cardHeights(card);
        if (h.collapsed !== null) collapsedBoard.current[i] = h.collapsed / u;
        return Math.max(h.current, h.target) / u;
      });
      const collapsed = maxOf(collapsedBoard.current);
      const heights = needed.map((h) => Math.ceil(Math.max(h, collapsed)));
      setLayout((prev) =>
        prev.collapsed === collapsed && prev.heights.every((h, i) => Math.abs(h - heights[i]) <= 1)
          ? prev
          : { heights, collapsed }
      );
    };

    const measureMobile = () => {
      if (!mobileEl.getBoundingClientRect().width) return; // mobile list hidden (desktop)
      [...mobileEl.querySelectorAll('.how-card')].forEach((card, i) => {
        const h = cardHeights(card);
        if (h.collapsed !== null) collapsedMobile.current[i] = h.collapsed;
      });
      const min = maxOf(collapsedMobile.current);
      setMobileMin((prev) => (Math.abs(prev - min) <= 1 ? prev : min));
    };

    const measure = () => {
      measureBoard();
      measureMobile();
    };
    measureRef.current = measure;
    measure();
    document.fonts?.ready.then(measure);
    // Re-layout in the same frame a card or its text changes size (the text is watched too, so
    // text that gets shorter, e.g. after the web font loads, also shrinks the cards)
    const ro = new ResizeObserver(() => flushSync(measure));
    [boardEl, mobileEl].forEach((root) =>
      root.querySelectorAll('.how-card, .how-card-info').forEach((el) => ro.observe(el))
    );
    return () => ro.disconnect();
  }, []);

  // Read more / Read less: make room before the browser paints the opening card
  useLayoutEffect(() => {
    measureRef.current?.();
  }, [openSteps]);

  // Lift the cards one by one, once, the first time the steps scroll into view
  useEffect(() => {
    const boardEl = boardRef.current;
    const mobileEl = mobileRef.current;
    if (!boardEl || !mobileEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timers = [];

    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.find((e) => e.isIntersecting && e.target.getBoundingClientRect().width);
        if (!seen) return;
        io.disconnect();
        const steps = seen.target.querySelectorAll(seen.target === boardEl ? '.how-step' : '.how-mobile-step');
        steps.forEach((el, i) => timers.push(setTimeout(() => pulseCard(el), 300 + i * PULSE_STEP)));
      },
      { threshold: 0.15 }
    );
    io.observe(boardEl);
    io.observe(mobileEl);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="how-section" id="sm-how">
      <div className="how-container">
        {/* Section Header */}
        <div className="how-title-column">
          <h2 className="how-main-heading">
            How <span className="how-heading-safe">S.A.F.E. Mission</span> Works
          </h2>
          <div className="how-subtitle-wrap">
            <span className="how-sub-line how-line-left" aria-hidden="true" />
            <p className="how-subtitle">Step-by-step implementation journey</p>
            <span className="how-sub-line how-line-right" aria-hidden="true" />
          </div>
        </div>

        {/* Desktop serpentine journey board (scales as one piece) */}
        <div
          ref={boardRef}
          className="how-board"
          style={{
            aspectRatio: `${BOARD_W} / ${board.height}`,
            '--collapsed-min': `calc(${layout.collapsed} * var(--u))`,
          }}
        >
          {/* Arrows from each step to the next */}
          <svg
            className="how-arrows-svg"
            viewBox={`0 0 ${BOARD_W} ${board.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {arrows.map((a) => (
              <g key={a.key} className="how-arrow-link">
                <circle cx={a.start.x} cy={a.start.y} r="5" />
                <path d={a.d} />
                <path className="how-arrow-head" d={a.head} />
              </g>
            ))}
          </svg>

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="how-step"
              style={{
                ...stepVars(step),
                '--x': STEP_X[i],
                '--y': board.rowTop[step.row],
              }}
            >
              <StepCard
                step={step}
                idPrefix="how-board"
                open={openSteps.has(step.num)}
                onToggle={() => toggleStep(step.num)}
              />
            </div>
          ))}
        </div>

        {/* Mobile / tablet timeline (< 1024px) */}
        <div ref={mobileRef} className="how-mobile-flow" style={{ '--collapsed-min': `${mobileMin}px` }}>
          {STEPS.map((step, i) => (
            <React.Fragment key={step.num}>
              {i > 0 && (
                <svg className="how-mobile-arrow" viewBox="0 0 24 44" fill="none" aria-hidden="true">
                  <circle cx="12" cy="5" r="3.5" />
                  <path d="M12 5 V 39" />
                  <path className="how-arrow-head" d="M5 32 L12 39 L19 32" />
                </svg>
              )}
              <div className="how-mobile-step" style={stepVars(step)}>
                <StepCard
                  step={step}
                  idPrefix="how-mobile"
                  className="how-mobile-card"
                  open={openSteps.has(step.num)}
                  onToggle={() => toggleStep(step.num)}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
