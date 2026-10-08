import React, { useState } from 'react';
import { ChevronRight, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './KnowYourSchemes.css';

// Solid glyphs matching the reference artwork (lucide only ships outline icons).
const BankIcon = () => (
  <svg viewBox="0 0 48 46" aria-hidden="true">
    <path d="M24 2.5 45.5 13.2v4.3h-43v-4.3Z" />
    <rect x="7.5" y="20.5" width="7.4" height="16" rx="0.8" />
    <rect x="20.3" y="20.5" width="7.4" height="16" rx="0.8" />
    <rect x="33.1" y="20.5" width="7.4" height="16" rx="0.8" />
    <rect x="3.5" y="38.8" width="41" height="5.2" rx="1.2" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 52 40" aria-hidden="true">
    <circle cx="11.5" cy="12.5" r="5.6" />
    <circle cx="40.5" cy="12.5" r="5.6" />
    <path d="M1.5 33c0-6.2 4.4-11 10-11 2.6 0 5 1 6.7 2.7A15.8 15.8 0 0 0 13.2 35H3.5a2 2 0 0 1-2-2Z" />
    <path d="M50.5 33c0-6.2-4.4-11-10-11-2.6 0-5 1-6.7 2.7A15.8 15.8 0 0 1 38.8 35h9.7a2 2 0 0 0 2-2Z" />
    <circle cx="26" cy="10.5" r="7.6" />
    <path d="M13.8 36.2c0-7.8 5.5-13.6 12.2-13.6s12.2 5.8 12.2 13.6a2.3 2.3 0 0 1-2.3 2.3H16.1a2.3 2.3 0 0 1-2.3-2.3Z" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 36 46" aria-hidden="true">
    <path d="M5 0h17.5L36 13.5V41a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5Z" />
    <path className="kys-doc-fold" d="M22.5 0v9.5a4 4 0 0 0 4 4H36Z" />
    <rect className="kys-doc-line" x="8" y="21" width="20" height="3" rx="1.5" />
    <rect className="kys-doc-line" x="8" y="28" width="20" height="3" rx="1.5" />
    <rect className="kys-doc-line" x="8" y="35" width="13" height="3" rx="1.5" />
  </svg>
);

// White clipboard checklist for the eligibility card's corner ribbon.
const ChecklistIcon = () => (
  <svg viewBox="0 0 47 59" aria-hidden="true">
    <rect x="0.5" y="6.5" width="46" height="52" rx="4" />
    <path
      className="kys-checklist-tab"
      d="M16 4H20A3.1 3.1 0 1 1 26 4H30A2 2 0 0 1 32 6V9.5A2 2 0 0 1 30 11.5H16A2 2 0 0 1 14 9.5V6A2 2 0 0 1 16 4Z"
    />
    <circle className="kys-checklist-ink" cx="23" cy="3.3" r="1.1" />
    {[0, 12, 24].map((dy) => (
      <React.Fragment key={dy}>
        <path className="kys-checklist-tick" d={`M8.5 ${21.8 + dy}l2.6 2.5 4.4-5.4`} />
        <rect className="kys-checklist-ink" x="21" y={20 + dy} width="16.5" height="3" rx="1.5" />
      </React.Fragment>
    ))}
  </svg>
);

// Soft two-layer swell along the bottom of each step card.
const StepWave = ({ id }) => (
  <svg className="kys-step-wave" viewBox="0 0 515 133" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-back`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="var(--wave-soft)" stopOpacity="0.95" />
        <stop offset="1" stopColor="var(--wave-soft)" stopOpacity="0.25" />
      </linearGradient>
      <linearGradient id={`${id}-front`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="var(--wave-strong)" stopOpacity="0.35" />
        <stop offset="0.45" stopColor="var(--wave-strong)" stopOpacity="0.9" />
        <stop offset="1" stopColor="var(--wave-strong)" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path d="M0 88C46 95 118 113 205 133H0Z" fill={`url(#${id}-back)`} />
    <path d="M225 133C300 125 382 104 452 98.5 482 96.5 502 99.5 515 103.5V133Z" fill={`url(#${id}-front)`} />
  </svg>
);

const STEPS = [
  {
    level: 'central',
    tone: 'green',
    icon: <BankIcon />,
    title: 'Choose level',
    text: ['Select Central, State or', 'Ministry / Department level'],
  },
  {
    level: 'ministry',
    tone: 'blue',
    icon: <DocumentIcon />,
    title: ['Choose ministry', 'or department'],
    text: ['Select the relevant ministry', 'or department'],
  },
  {
    level: 'details',
    tone: 'orange',
    icon: <ExternalLink strokeWidth={2.6} />,
    title: 'Open the scheme',
    text: ['View detailed information,', 'eligibility, benefits and apply'],
  },
];

const withBreaks = (lines) =>
  [].concat(lines).map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </React.Fragment>
  ));

const KnowYourSchemes = ({ onNavigate, isLoggedIn, user, onLogout }) => {
  const [selectedLevel, setSelectedLevel] = useState('central');

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleEligibilityCheck = () => {
    window.open('https://www.myscheme.gov.in/', '_blank', 'noopener,noreferrer');
  };

  return (
    // Navbar and Footer stay outside .kys-container: a size container can become the containing
    // block for position: fixed descendants, which would stop the navbar from staying fixed.
    <div className="kys-shell">
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="schemes" />
      <div className="kys-container">
        <div className="kys-page">
          {/* HERO */}
          <section className="kys-hero">
            <img
              className="kys-hero-art"
              src="/images/know-your-schemes/hero-art.jpg"
              alt="Farmer checking government schemes on a phone in front of a government building"
            />
            <div className="kys-hero-copy">
              <button type="button" className="kys-back-btn" onClick={() => onNavigate('home')}>
                <ArrowLeft strokeWidth={2.4} /> Back to Home
              </button>
              <h1 className="kys-hero-title">
                Know Your <span className="kys-hero-highlight">Schemes</span>
              </h1>
              <div className="kys-tricolor" aria-hidden="true">
                <span /><span /><span /><span />
              </div>
              <p className="kys-hero-subtitle">
                Explore Central and State Government Schemes{' '}
                <br />
                to empower farmers and strengthen agriculture exports.
              </p>
            </div>
            <svg className="kys-hero-wave" viewBox="0 318 1821 112" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="kys-hero-wave-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e9f3fc" />
                  <stop offset="1" stopColor="#eef6fd" />
                </linearGradient>
              </defs>
              <path
                fill="url(#kys-hero-wave-fill)"
                d="M0 329C110 346 200 384 330 391 480 399 650 348 880 341 1040 338 1160 372 1300 392 1400 404 1470 391 1520 383 1640 363 1740 334 1821 324V430H0Z"
              />
              <path fill="#f3f9fe" d="M0 389C120 389 205 399 300 428L1500 430 1530 421C1620 419 1720 419 1821 419V430H0Z" />
            </svg>
          </section>

          <div className="kys-body">
            {/* STATS */}
            <section className="kys-stats" aria-label="Scheme statistics">
              <div className="kys-stat kys-stat--green">
                <div className="kys-stat-icon"><BankIcon /></div>
                <div className="kys-stat-text">
                  <span className="kys-stat-num">152</span>
                  <span className="kys-stat-label">Central Schemes</span>
                </div>
              </div>
              <div className="kys-stat kys-stat--blue">
                <div className="kys-stat-icon"><PeopleIcon /></div>
                <div className="kys-stat-text">
                  <span className="kys-stat-num">31</span>
                  <span className="kys-stat-label">Ministries &amp; Bodies</span>
                </div>
              </div>
              <div className="kys-stat kys-stat--orange">
                <div className="kys-stat-icon">
                  <img src="/images/know-your-schemes/india-map.png" alt="" />
                </div>
                <div className="kys-stat-text">
                  <span className="kys-stat-num">26</span>
                  <span className="kys-stat-label">Andhra Pradesh Schemes</span>
                </div>
              </div>
            </section>

            {/* SECTION HEADER */}
            <header className="kys-section-head">
              <img className="kys-leaf kys-leaf--left" src="/images/know-your-schemes/leaf-sprig-left.png" alt="" />
              <img className="kys-leaf kys-leaf--right" src="/images/know-your-schemes/leaf-sprig-right.png" alt="" />
              <span className="kys-eyebrow">Get Started</span>
              <h2 className="kys-section-title">Select Scheme Level</h2>
              <p className="kys-section-desc">
                Choose the appropriate government level to explore relevant schemes, departments and detailed information.
              </p>
            </header>

            {/* THREE-STEP FLOW */}
            <ol className="kys-steps">
              {STEPS.map((step, i) => (
                <li key={step.level} className={`kys-step kys-step--${step.tone}`}>
                  <button
                    type="button"
                    className="kys-step-card"
                    aria-current={selectedLevel === step.level ? 'step' : undefined}
                    onClick={() => handleLevelSelect(step.level)}
                  >
                    <StepWave id={`kys-wave-${step.tone}`} />
                    <span className="kys-step-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="kys-step-icon">{step.icon}</span>
                    <span className="kys-step-text">
                      <span className="kys-step-title">{withBreaks(step.title)}</span>
                      <span className="kys-step-desc">{withBreaks(step.text)}</span>
                    </span>
                    <span className="kys-step-arrow"><ChevronRight strokeWidth={2.6} /></span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span className="kys-step-connector" aria-hidden="true"><ChevronRight strokeWidth={2.8} /></span>
                  )}
                </li>
              ))}
            </ol>

            {/* ELIGIBILITY CHECKER */}
            <section className="kys-eligibility" aria-labelledby="kys-eligibility-title">
              <span className="kys-eligibility-dots" aria-hidden="true" />
              <img className="kys-eligibility-leaves" src="/images/know-your-schemes/eligibility-leaves.svg" alt="" />
              <div className="kys-eligibility-intro">
                <img className="kys-eligibility-art" src="/images/know-your-schemes/eligibility-scene.svg" alt="" />
                <h2 id="kys-eligibility-title" className="kys-eligibility-title">Eligibility Checker</h2>
                <p className="kys-eligibility-subtitle">Check your eligibility for various government schemes</p>
              </div>
              <div className="kys-eligibility-card">
                <h3 className="kys-eligibility-heading">Quick Check</h3>
                <p className="kys-eligibility-desc">
                  Check your eligibility for various government schemes and find the best financial support options
                  available for you.
                </p>
                <button type="button" className="kys-eligibility-btn" onClick={handleEligibilityCheck}>
                  Check Eligibility <ArrowRight strokeWidth={2.2} />
                </button>
                <span className="kys-eligibility-ribbon" aria-hidden="true"><ChecklistIcon /></span>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KnowYourSchemes;
