import React, { useEffect, useRef, useState } from 'react';
import './HomeStats.css';

// The statistics strip under Events & Updates. Each icon is cut from the design itself; `w` and `h` are
// its size there, in the design's pixels. `squeeze` narrows a label too long for its card
const STATS = [
  { value: 50, suffix: 'k+', label: ['Registered', 'Users'], icon: '/images/home-stats/registered-users.png', w: 135, h: 107 },
  { value: 90, suffix: 'k+', label: ['Consignments', 'Sent'], squeeze: 0.865, icon: '/images/home-stats/consignments-sent.png', w: 123, h: 115 },
  { value: 150, suffix: 'k+', label: ['Countries', 'Imported'], icon: '/images/home-stats/countries-imported.png', w: 127, h: 123 },
  { value: 30, suffix: 'k+', label: ['Products', 'Dealt.'], icon: '/images/home-stats/products-dealt.png', w: 140, h: 137 },
];
const COUNT_MS = 2000;

// A card's figure counts up from zero to its total, slowing as it arrives, once most of the card is on
// screen; it drops back to zero after the card leaves, so it counts again on the next visit
const StatCard = ({ stat }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let counted = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        cancelAnimationFrame(frame);
        counted = false;
        setShown(0);
        return;
      }
      if (counted || entry.intersectionRatio < 0.6) return;
      counted = true;
      if (reducedMotion.matches) {
        setShown(stat.value);
        return;
      }
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / COUNT_MS, 1);
        setShown(Math.round(stat.value * (1 - (1 - t) ** 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: [0, 0.6] });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stat.value]);

  return (
    <div ref={ref} className="home-stat">
      <div className="home-stat-card">
        <span className="home-stat-iconSlot">
          <img src={stat.icon} alt="" className="home-stat-icon" style={{ '--w': stat.w, '--h': stat.h }} decoding="async" />
        </span>
        <span className="home-stat-rule" />
        <span className="home-stat-text">
          {/* The final figure holds the width (and is what screen readers read) while the count runs over it */}
          <span className="home-stat-num">
            <span className="home-stat-final">{stat.value}{stat.suffix}</span>
            <span className="home-stat-count" aria-hidden="true">{shown}{stat.suffix}</span>
          </span>
          <span className="home-stat-label" style={stat.squeeze ? { '--squeeze': stat.squeeze } : undefined}>
            {stat.label.map((line) => <span key={line}>{line} </span>)}
          </span>
        </span>
      </div>
    </div>
  );
};

const HomeStats = () => (
  <section className="home-stats" aria-label="FEED in numbers">
    <div className="home-stats-grid">
      {STATS.map((stat) => <StatCard key={stat.icon} stat={stat} />)}
    </div>
  </section>
);

export default HomeStats;
