import React, { useEffect, useRef } from 'react';
import { FinanceIcon } from './FinanceIcon';

// Intro for the bank cards: each card flies in from its own side of the blue panel (the corner or
// edge it sits nearest) and settles into its place in the grid.
const FLY_DISTANCE = 220;
const FLY_DURATION = 900;
const FLY_STAGGER = 90;

const playFlyInIntro = (grid) => {
  const cards = [...grid.querySelectorAll('.finance-card-v2')];
  const gridBox = grid.getBoundingClientRect();
  const centerX = gridBox.left + gridBox.width / 2;
  const centerY = gridBox.top + gridBox.height / 2;
  const singleColumn = new Set(cards.map((card) => card.offsetLeft)).size === 1;

  return cards.map((card, i) => {
    const box = card.getBoundingClientRect();
    const dx = box.left + box.width / 2 - centerX;
    const dy = box.top + box.height / 2 - centerY;
    // In one column every card is centred, so alternate left / right instead
    const sideX = singleColumn ? (i % 2 ? 1 : -1) : Math.abs(dx) < box.width / 4 ? 0 : Math.sign(dx);
    const sideY = singleColumn ? 0 : Math.abs(dy) < box.height / 4 ? 0 : Math.sign(dy);

    return card.animate(
      [
        { transform: `translate(${sideX * FLY_DISTANCE}px, ${sideY * FLY_DISTANCE}px) scale(0.85)`, opacity: 0 },
        { transform: 'translate(0px, 0px) scale(1)', opacity: 1 },
      ],
      { duration: FLY_DURATION, delay: i * FLY_STAGGER, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
    );
  });
};

export const FinanceOptionsTable = () => {
  const gridRef = useRef(null);

  // Cards wait hidden, then play the intro once, when enough of the grid is on screen
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let animations = [];
    grid.classList.add('is-waiting');
    const observer = new IntersectionObserver(
      ([entry]) => {
        const needed = Math.min(entry.boundingClientRect.height, window.innerHeight) * 0.45;
        if (!entry.isIntersecting || entry.intersectionRect.height < needed) return;
        observer.disconnect();
        animations = playFlyInIntro(grid);
        grid.classList.remove('is-waiting');
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
    );
    observer.observe(grid);

    return () => {
      observer.disconnect();
      grid.classList.remove('is-waiting');
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
    },
    {
      id: 2, 
      name: 'HDFC Bank', 
      logo: '/images/banks/hdfc-bank.svg', 
      url: 'https://www.hdfc.bank.in/', 
      tint: '#e5484d',
      desc: 'Agriculture, MSME and Business Loans',
    },
    {
      id: 3, 
      name: 'NABARD', 
      logo: '/images/banks/nabard.png', 
      url: 'https://www.nabard.org/EngDefault.aspx', 
      tint: '#2e9e5b',
      desc: 'Rural Development, Agriculture and Farmers Support',
    },
    {
      id: 4, 
      name: 'EXIM Bank', 
      logo: '/images/banks/exim-bank.png', 
      url: 'https://www.eximbankindia.in/', 
      tint: '#7c6ee6',
      desc: 'Export-Import Finance and International Trade Support',
    },
    {
      id: 5, 
      name: 'NCDC', 
      logo: '/images/banks/ncdc.png', 
      url: 'https://www.ncdc.in/', 
      tint: '#3aa55d',
      desc: 'Cooperative Finance, Rural Development and Agriculture',
    },
    {
      id: 6, 
      name: 'Bank of Baroda', 
      logo: '/images/banks/bank-of-baroda.svg', 
      url: 'https://bankofbaroda.bank.in/', 
      tint: '#f26522',
      desc: 'Agriculture, MSME and Personal Loans',
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
                  <div className="finance-card-v2__media">
                    <img src={opt.logo} alt={`${opt.name} logo`} />
                  </div>
                  <div className="finance-card-v2__content">
                    <h3 className="finance-card-v2__name">{opt.name}</h3>
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
