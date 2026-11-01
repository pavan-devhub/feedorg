import React, { useState, useEffect, useRef } from 'react';
import './TestimonialsSection.css';

const TESTIMONIALS = [
  {
    id: 1,
    initials: 'SE',
    title: 'Software Engineer',
    subtitle: 'Remote farm monitoring',
    quote:
      '“FEED’s SAFE Mission technology enables me to monitor farm activities and track crop progress while continuing my full-time software engineering job. I can stay connected to agriculture without having to quit my career.”',
    tag: 'S.A.F.E. Mission focus',
  },
  {
    id: 2,
    initials: 'FM',
    title: 'Farmer',
    subtitle: 'Multi-layer farming',
    quote:
      '“SAFE Mission’s multi-layer farming approach helps me diversify crops and plan harvests across different seasons. It creates opportunities for more regular income and reduces dependence on a single crop.”',
    tag: 'S.A.F.E. Mission focus',
  },
  {
    id: 3,
    initials: 'DS',
    title: 'District SAFE Mission Society (DSMS)',
    subtitle: 'Cooperative export ecosystem',
    quote:
      '“With FEED’s export consultancy, our 20-acre SAFE Mission model aims to connect district-grown agricultural produce, in raw and value-added forms, with EU markets while building a sustainable cooperative export ecosystem.”',
    tag: 'S.A.F.E. Mission focus',
  },
  {
    id: 4,
    initials: 'SH',
    title: 'Self-Help Group (SHG)',
    subtitle: 'Common Facility Centre',
    quote:
      '“SAFE Mission’s Common Facility Centre gives our SHG access to shared infrastructure for producing ginger-garlic paste. We aim to build our own brand and reach customers through e-commerce and quick-commerce platforms.”',
    tag: 'S.A.F.E. Mission focus',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const touchStartX = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      let cards = 3;
      if (window.innerWidth <= 640) {
        cards = 1;
      } else if (window.innerWidth <= 960) {
        cards = 2;
      }
      setVisibleCards(cards);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCards);
  const safeIndex = Math.min(currentIndex, maxIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const renderCard = (card) => (
    <article key={card.id} className="sm-testimonial-card">
      <div className="card-top-bar">
        {/* Amber Double Quote Icon */}
        <svg
          className="card-quote-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>

        {/* White Badge Avatar with Forest Green Initials */}
        <div className="card-avatar-badge" aria-hidden="true">
          {card.initials}
        </div>
      </div>

      <h3 className="card-title-text">{card.title}</h3>
      {card.subtitle && <span className="card-subtitle-text">{card.subtitle}</span>}

      <p className="card-quote-body">{card.quote}</p>

      <div className="card-tag-container">
        <span className="card-focus-pill">{card.tag}</span>
      </div>
    </article>
  );

  return (
    <section className="testimonials-section" id="sm-testimonials" aria-label="Testimonials">
      <div className="testimonials-container">
        {/* Main White Canvas Board */}
        <div className="testimonials-board">
          <h2 className="testimonials-main-heading">Testimonials</h2>

          {/* Testimonials Carousel with Left and Right Sliding Arrows */}
          <div className="testimonials-carousel-wrapper">
            {/* Left Sliding Arrow at left corner */}
            <button
              type="button"
              className="testimonials-nav-arrow testimonials-arrow-left"
              onClick={handlePrev}
              aria-label="Previous testimonials"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Testimonials Slider Viewport */}
            <div
              className="testimonials-slider-viewport"
              style={{ '--visible-cards': visibleCards }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="testimonials-slider-track"
                style={{
                  transform: `translateX(calc(-${safeIndex} * ((100% - ${(visibleCards - 1)} * 20px) / ${visibleCards} + 20px)))`,
                }}
              >
                {TESTIMONIALS.map(renderCard)}
              </div>
            </div>

            {/* Right Sliding Arrow at right corner */}
            <button
              type="button"
              className="testimonials-nav-arrow testimonials-arrow-right"
              onClick={handleNext}
              aria-label="Next testimonials"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
