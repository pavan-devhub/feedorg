import React from 'react';
import './WhySection.css';
import whyFarmImg from '../../assets/why/whysafemission.png';

const TRADITIONAL_POINTS = [
  'Single crop, single season and single market dependence.',
  'Limited post-harvest infrastructure, storage and cold-chain access.',
  'Gaps in quality testing and export-standard awareness.',
  'Limited international buyer links and lower bargaining power.',
  'Raw commodity sales with little value addition.',
  'Individual burden of purchasing farm machinery.',
];

const SAFE_POINTS = [
  'Cooperative farming with diverse, district-suitable crop combinations.',
  'Shared packhouse, grading, testing, storage and processing facilities.',
  'GAP, traceability and applicable quality compliance.',
  'Domestic, institutional and export buyer linkages.',
  'Value addition, branding and standardised packaging.',
  'Shared equipment through asset leasing and Custom Hiring Centres.',
];

export default function WhySection() {
  return (
    <section className="why-section" id="sm-why">
      {/* Shared gradients for the decorative SVGs */}
      <svg className="why-svg-defs" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="why-swoosh-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fdba74" />
            <stop offset="0.5" stopColor="#f97316" />
            <stop offset="1" stopColor="#ea580c" />
          </linearGradient>
        </defs>
      </svg>


      {/* ========================================================
          TOP-RIGHT FULL-BLEED FARM PHOTO WITH ORANGE SWOOSH
         ======================================================== */}
      <div className="why-media">
        <svg
          className="why-media-swoosh"
          viewBox="0 0 634 330"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0H90L160 230C120 160 50 70 0 0Z" fill="url(#why-swoosh-grad)" />
        </svg>

        <div className="why-media-photo">
          <img
            src={whyFarmImg}
            alt="S.A.F.E. Mission lush green agricultural crop field at sunrise"
            className="why-farm-image"
            loading="lazy"
          />
        </div>
      </div>

      <div className="why-container">
        {/* ========================================================
            TOP HERO ROW: TITLE & DESCRIPTION
           ======================================================== */}
        <div className="why-hero-row">
          <div className="why-text-col">
            {/* Orange Top Accent Bar */}
            <div className="why-accent-bar" aria-hidden="true"></div>

            {/* Main Three-Line Heading */}
            <h2 className="why-main-title">
              <span className="why-title-dark">Why</span>
              <span className="why-title-highlight">S.A.F.E. Mission</span>
              <span className="why-title-dark">Is Needed</span>
            </h2>

            <div className="why-desc-row">
              {/* Descriptive Body Paragraph */}
              <p className="why-description">
                Traditional agriculture often depends on one crop, one season and one market.
                S.A.F.E. Mission brings production, quality, shared infrastructure, value addition
                and market linkage together in one coordinated system.
              </p>

              {/* Dotted Matrix Grid (4 rows x 3 columns) */}
              <div className="why-dots-grid" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <span key={idx} className="why-dot"></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            BOTTOM ROW: TWO COMPARISON CARDS
           ======================================================== */}
        <div className="why-cards-row">
          {/* ----------------------------------------------------
              CARD 1: TRADITIONAL FARMING (PEACH THEME)
             ---------------------------------------------------- */}
          <article className="why-card why-card-traditional">
            {/* Header: Seedling Icon + Title */}
            <div className="why-card-header">
              <div className="why-icon-bubble bubble-peach" aria-hidden="true">
                {/* Traditional Farming Soil & Sprout Line-Art Icon */}
                <svg
                  viewBox="0 0 48 48"
                  className="why-card-icon-svg icon-peach"
                  fill="none"
                >
                  {/* Soil mound base */}
                  <path
                    d="M10 38C12 34 18 33 24 33C30 33 36 34 38 38C39 41 33 42 24 42C15 42 9 41 10 38Z"
                    stroke="#c2410c"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 39.5C19 38.5 29 38.5 33 39.5"
                    stroke="#c2410c"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Vertical stem */}
                  <path
                    d="M24 33V17"
                    stroke="#c2410c"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  {/* Left leaf */}
                  <path
                    d="M24 25C19 21 13 21 12 26C12 30 18 31 24 27"
                    stroke="#c2410c"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 24C18 24 21 25 24 26"
                    stroke="#c2410c"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Right leaf */}
                  <path
                    d="M24 20C29 16 35 17 36 22C36 26 30 27 24 23"
                    stroke="#c2410c"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25 22C28 21 32 20 34 20"
                    stroke="#c2410c"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="why-title-group">
                <h3 className="why-card-heading">
                  Traditional<br />Farming
                </h3>
                <div className="why-card-line line-orange" aria-hidden="true"></div>
              </div>
            </div>

            {/* Inner White Box with 6 Points */}
            <div className="why-card-inner">
              <ul className="why-points-list">
                {TRADITIONAL_POINTS.map((text, idx) => (
                  <li key={idx} className="why-point-item">
                    {/* Soft Red Cross Badge */}
                    <div className="why-badge-pill badge-cross" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        className="why-symbol-svg stroke-cross"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                    <span className="why-point-text">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* ----------------------------------------------------
              CARD 2: S.A.F.E. MISSION FARMING (MINT GREEN THEME)
             ---------------------------------------------------- */}
          <article className="why-card why-card-safe">
            {/* Header: Green Sprout Icon + Title */}
            <div className="why-card-header">
              <div className="why-icon-bubble bubble-mint" aria-hidden="true">
                {/* S.A.F.E. Mission Green Sprout Icon */}
                <svg
                  viewBox="0 0 48 48"
                  className="why-card-icon-svg icon-mint"
                  fill="none"
                >
                  {/* Main stem */}
                  <path
                    d="M24 40V16"
                    stroke="#047857"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  {/* Left leaf */}
                  <path
                    d="M24 28C16 28 10 21 12 13C21 11 24 19 24 28Z"
                    fill="#047857"
                  />
                  {/* Right leaf */}
                  <path
                    d="M24 22C32 22 38 15 36 7C27 5 24 13 24 22Z"
                    fill="#059669"
                  />
                  {/* Center sprout tip */}
                  <path
                    d="M24 16C23 11 25.5 8 28 7"
                    stroke="#047857"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="why-title-group">
                <h3 className="why-card-heading">
                  S.A.F.E. Mission<br />Farming
                </h3>
                <div className="why-card-line line-green" aria-hidden="true"></div>
              </div>
            </div>

            {/* Inner White Box with 6 Points */}
            <div className="why-card-inner">
              <ul className="why-points-list">
                {SAFE_POINTS.map((text, idx) => (
                  <li key={idx} className="why-point-item">
                    {/* Soft Green Checkmark Badge */}
                    <div className="why-badge-pill badge-check" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        className="why-symbol-svg stroke-check"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="why-point-text">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
