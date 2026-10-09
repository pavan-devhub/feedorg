import React, { useEffect, useRef } from 'react';
import { FinanceIcon } from './FinanceIcon';

// Intro for the bank cards: each card spins down into its small round logo, the logos circle the
// blue panel together, then spin back out into the rectangular cards in their own places.
const ORBIT_START = 0.24;
const ORBIT_END = 0.74;
const ORBIT_STEPS = 24;
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

const playOrbitIntro = (grid) => {
  const cards = [...grid.querySelectorAll('.finance-card-v2')];
  const gridBox = grid.getBoundingClientRect();
  // Circle around the middle of the on-screen part of the grid (on phones the grid is taller than the screen)
  const top = Math.max(gridBox.top, 0);
  const bottom = Math.min(gridBox.bottom, window.innerHeight);
  const centerX = gridBox.left + gridBox.width / 2;
  const centerY = (top + bottom) / 2;
  const radius = Math.max(Math.min(gridBox.width, bottom - top) / 2 - 56, 60);

  return cards.map((card, i) => {
    const box = card.getBoundingClientRect();
    const logo = card.querySelector('.finance-card-v2__logo').getBoundingClientRect();
    const logoX = logo.left - box.left + logo.width / 2;
    const logoY = logo.top - box.top + logo.height / 2;
    const r = logo.width / 2;
    const full = 'inset(0px 0px 0px 0px round 12px)';
    const bubble = `inset(${logoY - r}px ${box.width - logoX - r}px ${box.height - logoY - r}px ${logoX - r}px round ${r}px)`;
    const transformOrigin = `${logoX}px ${logoY}px`;
    const startAngle = -90 + (360 / cards.length) * i;

    const orbit = Array.from({ length: ORBIT_STEPS + 1 }, (_, k) => {
      const p = k / ORBIT_STEPS;
      const angle = ((startAngle + 360 * p) * Math.PI) / 180;
      const x = centerX + radius * Math.cos(angle) - (box.left + logoX);
      const y = centerY + radius * Math.sin(angle) - (box.top + logoY);
      return {
        offset: ORBIT_START + (ORBIT_END - ORBIT_START) * easeInOut(p),
        transform: `translate(${x}px, ${y}px) rotate(${180 + 360 * p}deg) scale(1.15)`,
        clipPath: bubble,
        transformOrigin,
      };
    });
    orbit[orbit.length - 1].easing = 'cubic-bezier(.45, 0, .2, 1)';

    return card.animate(
      [
        { offset: 0, transform: 'translate(0px, 0px) rotate(0deg) scale(1)', clipPath: full, transformOrigin, easing: 'cubic-bezier(.55, 0, .35, 1)' },
        ...orbit,
        { offset: 1, transform: 'translate(0px, 0px) rotate(720deg) scale(1)', clipPath: full, transformOrigin },
      ],
      { duration: 3600 },
    );
  });
};

export const FinanceOptionsTable = () => {
  const gridRef = useRef(null);

  // Play the intro once, when most of the cards are on screen
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let animations = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        const needed = Math.min(entry.boundingClientRect.height, window.innerHeight) * 0.6;
        if (!entry.isIntersecting || entry.intersectionRect.height < needed) return;
        observer.disconnect();
        animations = playOrbitIntro(grid);
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
    );
    observer.observe(grid);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  const options = [
    {
      id: 1, 
      name: 'SBI', 
      logo: '/images/banks/sbi.svg', 
      url: 'https://sbi.bank.in/', 
      tint: '#2f80ed',
      desc: 'Agriculture, Business and Allied Activities Loans',
      cover: '/images/banks/sbi-building.png',
    },
    {
      id: 2, 
      name: 'HDFC Bank', 
      logo: '/images/banks/hdfc-bank.svg', 
      url: 'https://www.hdfc.bank.in/', 
      tint: '#e5484d',
      desc: 'Agriculture, MSME and Business Loans',
      cover: '/images/banks/hdfc-building.png',
    },
    {
      id: 3, 
      name: 'NABARD', 
      logo: '/images/banks/nabard.png', 
      url: 'https://www.nabard.org/EngDefault.aspx', 
      tint: '#2e9e5b',
      desc: 'Rural Development, Agriculture and Farmers Support',
      cover: '/images/banks/nabard-building.png',
    },
    {
      id: 4, 
      name: 'EXIM Bank', 
      logo: '/images/banks/exim-bank.png', 
      url: 'https://www.eximbankindia.in/', 
      tint: '#7c6ee6',
      desc: 'Export-Import Finance and International Trade Support',
      cover: '/images/banks/exim-building.png',
    },
    {
      id: 5, 
      name: 'NCDC', 
      logo: '/images/banks/ncdc.png', 
      url: 'https://www.ncdc.in/', 
      tint: '#3aa55d',
      desc: 'Cooperative Finance, Rural Development and Agriculture',
      cover: '/images/banks/ncdc-building.png',
    },
    {
      id: 6, 
      name: 'Bank of Baroda', 
      logo: '/images/banks/bank-of-baroda.svg', 
      url: 'https://bankofbaroda.bank.in/', 
      tint: '#f26522',
      desc: 'Agriculture, MSME and Personal Loans',
      cover: '/images/banks/bob-building.png',
    },
  ];

  return (
    <section id="finance-providers" className="finance-options-v2">
      <div className="finance-options-v2__inner">
        
        {/* Header */}
        <div className="finance-options-v2__header-wrapper">
          <div className="finance-options-v2__header">
            <div className="finance-options-v2__header-icon">
              <FinanceIcon name="Landmark" size={32} />
            </div>
            <h2 className="finance-options-v2__title">
              <span className="lf-text-navy">3. Available </span>
              <span className="lf-text-green">Finance Options</span>
            </h2>
          </div>
          <p className="finance-options-v2__subtitle">
            Explore financial institutions that provide loans, credit and support for agriculture, business and exports.
          </p>
        </div>

        {/* Split Layout */}
        <div className="finance-options-v2__layout">
          
          {/* Left Column - Main Image */}
          <div className="finance-options-v2__left">
            <img 
              src="/images/banks/farmer-meeting.png" 
              alt="Farmer and Bank Employee Meeting" 
              className="finance-options-v2__main-img" 
            />
          </div>

          {/* Right Column - Cards Grid */}
          <div className="finance-options-v2__right">
            <div className="finance-options-v2__grid" ref={gridRef}>
              {options.map((opt) => (
                <article key={opt.id} className="finance-card-v2" style={{ '--tint': opt.tint }}>
                  <img src={opt.cover} alt={`${opt.name} building`} className="finance-card-v2__cover" />
                  <div className="finance-card-v2__content">
                    
                    <div className="finance-card-v2__logo-wrapper">
                      <div className="finance-card-v2__logo">
                        <img src={opt.logo} alt={`${opt.name} logo`} />
                      </div>
                      <h3 className="finance-card-v2__name">{opt.name}</h3>
                    </div>
                    
                    <p className="finance-card-v2__desc">{opt.desc}</p>
                    
                    <a
                      href={opt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="finance-card-v2__link"
                      aria-label={`View Details - ${opt.name}`}
                    >
                      View Details 
                      <span className="finance-card-v2__link-icon">
                        <FinanceIcon name="ArrowRight" size={14} />
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
