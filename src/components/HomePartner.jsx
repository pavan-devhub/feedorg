import React from 'react';
import './HomePartner.css';

const PARTNERS = [
  { name: 'NABARD', logo: '/images/home-partner/nabard.png' },
  { name: 'Bharat Call', logo: '/images/home-partner/bharat-call.png' },
  { name: 'DGFT', logo: '/images/home-partner/dgft.png' },
  { name: 'FIEO', logo: '/images/home-partner/fieo.png' },
  { name: 'APEDA', logo: '/images/home-partner/apeda.png' },
];

// One set of cards falls short of the block's width, so a row holds the set twice to leave no empty gap in the loop
const ROW = [...PARTNERS, ...PARTNERS];

// The row is drawn twice, end to end, so the loop can restart without a visible jump. Only the first set is
// announced to screen readers; every repeat is decorative
const LogoRow = ({ hidden }) =>
  ROW.map(({ name, logo }, i) => {
    const repeat = hidden || i >= PARTNERS.length;
    return (
      <div key={i} className="home-partner-card" aria-hidden={repeat || undefined}>
        <img src={logo} alt={repeat ? '' : name} />
      </div>
    );
  });

// The Our Partners block above the footer. The handshake is cut from the design
const HomePartner = () => (
  <section className="home-partner">
    <div className="home-partner-inner">
      <img src="/images/home-partner/handshake.webp" alt="" className="home-partner-icon" />
      <div className="home-partner-heading">
        <span className="home-partner-rule" aria-hidden="true" />
        <span className="home-partner-dot" aria-hidden="true" />
        <h2 className="home-partner-title">Our <span>Partners</span></h2>
        <span className="home-partner-dot" aria-hidden="true" />
        <span className="home-partner-rule home-partner-rule--end" aria-hidden="true" />
      </div>
      <div className="home-partner-marquee">
        <div className="home-partner-track">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </div>
  </section>
);

export default HomePartner;
