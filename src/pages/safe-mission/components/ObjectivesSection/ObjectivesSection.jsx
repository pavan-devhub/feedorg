import React, { useState, useRef } from 'react';
import './ObjectivesSection.css';

// 5 Core Objectives Images from Downloads (obj1.png to obj5.png)
import obj1Img from '../../assets/objectives/obj1.png';
import obj2Img from '../../assets/objectives/obj2.png';
import obj3Img from '../../assets/objectives/obj3.png';
import obj4Img from '../../assets/objectives/obj4.png';
import obj5Img from '../../assets/objectives/obj5.png';

const OBJECTIVES = [
  {
    id: 1,
    num: '01',
    theme: 'green',
    image: obj1Img,
    alt: 'Multi-Layer Agricultural Production crop rows',
    title: 'Multi-Layer Agricultural Production',
    desc: 'Plan 5–7+ crop layers using canopy, ground and root-zone spaces for diversified farm income.',
    tagline: '',
    bulletsList: [
      'Core production engine of SAFE Mission',
      '5–7+ crop layers on the same acre using vertical, canopy, ground and root-zone spaces.',
      'Scientific crop selection based on soil, water, climate, sunlight, duration, market & export potential.',
      'Creates diversified, staggered income and a risk buffer against crop failure.',
      'Goal: More value from the same land with higher, more stable farmer income',
    ],
    featureCards: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="obj-icon-svg">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 2.2.7 4.2 2 5.8L3 21l3.5-.9C8.1 21.3 10 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm1 14.8c-.3.1-.7.2-1 .2-3.3 0-6-2.7-6-6 0-.3.1-.7.2-1 1.7.3 3.5 1.2 4.8 2.5 1.3 1.3 2.2 3.1 2 4.3z" opacity="0.15" />
        <path d="M20.5 3.5c-4.5.3-9 2.5-11.8 6.2C6.4 12.6 6 15.6 6.5 18.5c.3 1.4 1 2.5 2.1 3.2.7.4 1.5.5 2.4.3 2.8-.5 5.2-2.1 6.8-4.5 3.3-4.8 3.5-10 2.7-14zM10.2 18c-.8-1.5-.7-3.4.2-4.9 1.4-2.3 3.8-3.8 6.4-4.2-1.2 3.4-3.3 6.3-6.6 9.1z" />
        <path d="M7 17.5c-2.2-.5-3.8-2.2-4.2-4.5-.4-2.5.4-4.8 2-6.5 2.5-2.7 6.2-4 9.7-3.8-1.5 2-2.3 4.4-2.1 7 .1 1.8.8 3.5 2 4.8-2.4 1.5-5 2.4-7.4 3z" opacity="0.85" />
      </svg>
    ),
  },
  {
    id: 2,
    num: '02',
    theme: 'orange',
    image: obj2Img,
    alt: 'CFC, Packhouse, Cold Chain and Value Addition facility',
    title: 'CFC, Packhouse, Cold Chain & Value Addition',
    desc: 'Transform raw produce through sorting, grading, testing, storage, processing and packaging.',
    tagline: '',
    bulletsList: [
      'Raw produce → Market-ready product through sorting, grading, testing, pre-cooling, cold storage, processing, packaging & value addition.',
      'Quality assurance & processing can significantly increase the value of farm produce.',
      'Infrastructure is owned and managed as a cooperative asset by farmers.',
      'Goal: Reduce post-harvest losses → add value → improve marketability → increase farmer realisation.',
    ],
    featureCards: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="obj-icon-svg">
        <path d="M4 19V9l6 3.5V9l6 3.5V5h4v14H4zm1-1h14V6h-2v8.5l-6-3.5v3.5L5 11v7zm8-3h2v2h-2v-2zm-4 0h2v2H9v-2zm-4 0h2v2H5v-2z" />
      </svg>
    ),
  },
  {
    id: 3,
    num: '03',
    theme: 'blue',
    image: obj3Img,
    alt: 'Export and KYJ Interface cargo ship and airplane',
    title: 'Export & KYJ Interface',
    desc: 'Connect farm production to buyers through GAP, traceability, testing and export documentation.',
    tagline: '',
    bulletsList: [
      'KYJ (Krushi Yeva Jayate) connects SAFE Mission production to international markets.',
      'Export readiness starts at the farm, not after harvest.',
      'Production follows buyer requirements, quality standards, GAP, testing & traceability.',
      'Farm records, spray diaries, lot coding and testing begin from the first stage.',
      'Covers the complete export chain: Compliance → Documentation → Logistics → Shipment.',
      'Goal: Farm-compliant production → Export-ready produce → Global market access.',
    ],
    featureCards: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="obj-icon-svg">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 4,
    num: '04',
    theme: 'purple',
    image: obj4Img,
    alt: 'Bulk Agri-Commodity Trade warehouse grain sacks',
    title: 'Bulk Agri-Commodity Trade',
    desc: 'Aggregate, procure, store and trade commodities for wider institutional market access.',
    tagline: '',
    bulletsList: [
      'Aggregate, procure, store and trade agricultural commodities at scale.',
      'Leverage platforms/systems such as eNAM, GeM, BULLKART, eNWR, NCDEX/ICEX, APMC and CFC value addition.',
      'Enable institutional sales and bulk market access',
      'Goal: Scale commodity trade → capture trading value → strengthen cooperative revenue.',
    ],
    featureCards: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="obj-icon-svg">
        <path d="M7 6c0-1.66 2.24-3 5-3s5 1.34 5 3-2.24 3-5 3-5-1.34-5-3zm0 4.5c0 1.66 2.24 3 5 3s5-1.34 5-3v-1.8c-1.35.8-3.07 1.3-5 1.3s-3.65-.5-5-1.3v1.8zm0 4.5c0 1.66 2.24 3 5 3s5-1.34 5-3v-1.8c-1.35.8-3.07 1.3-5 1.3s-3.65-.5-5-1.3v1.8z" />
        <path d="M14 19c0 .7-.37 1.35-1 1.83v2.1c2.89-.34 5-1.74 5-3.43v-1.8c-1.12.67-2.48 1.13-4 1.3z" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 5,
    num: '05',
    theme: 'teal',
    image: obj5Img,
    alt: 'Asset Leasing and Custom Hiring Centre green tractor',
    title: 'Asset Leasing & Custom Hiring Centre',
    desc: 'Access cooperative-owned machinery and infrastructure without buying every asset individually.',
    tagline: '',
    bulletsList: [
      'CHC (Custom Hiring Centre): Farmers access machinery and infrastructure without individually purchasing them.',
      'Cooperative-owned assets are made available through a hiring/leasing model.',
      'Includes farm machinery, drones, cold storage, grading/processing equipment and solar assets.',
      'Goal: Lower investment → reduce costs → better asset utilisation.',
    ],
    featureCards: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="obj-icon-svg">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

function renderFeatureIcon(type) {
  if (type === 'gear') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }
  if (type === 'target') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
        <circle cx="12" cy="12" r="9.5" />
        <circle cx="12" cy="12" r="5.5" />
        <circle cx="12" cy="12" r="1.8" />
        <path d="M19 5l-5 5" />
        <path d="M15 4h5v5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export default function ObjectivesSection() {
  const [activeDetailId, setActiveDetailId] = useState(null);
  const detailRef = useRef(null);

  const handleToggleDetail = (id) => {
    if (activeDetailId === id) {
      // If clicking the currently open card, hide it
      setActiveDetailId(null);
    } else {
      // Show only that clicked card's designated section, hiding all others
      setActiveDetailId(id);
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 60);
    }
  };

  const selectedObj = OBJECTIVES.find((o) => o.id === activeDetailId);

  return (
    <section
      className={`objectives-section ${activeDetailId !== null ? 'has-active-detail' : ''}`}
      id="sm-objectives"
    >
      <div className="objectives-container">
        {/* Section Header */}
        <div className="objectives-header">
          <h2 className="objectives-title">
            Five Core <span className="title-orange">Business Objectives</span>
          </h2>

          {/* Dual Pill Indicator */}
          <div className="objectives-pill-indicator" aria-hidden="true">
            <span className="pill-bar-green"></span>
            <span className="pill-bar-orange"></span>
          </div>

          <p className="objectives-subtitle">
            Building a stronger, more connected and prosperous agricultural ecosystem
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="objectives-grid">
          {OBJECTIVES.map((item) => {
            const isCardActive = activeDetailId === item.id;
            return (
              <article
                key={item.id}
                className={`obj-card theme-${item.theme} ${isCardActive ? 'card-selected' : ''}`}
              >
                {/* Card Image Wrapper */}
                <div className="obj-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="obj-image"
                    loading="lazy"
                  />

                  {/* Overlapping Badges: Number on Left, Circular Icon on Right */}
                  <div className="badge-row">
                    <span className={`num-pill num-${item.theme}`}>{item.num}</span>
                    <div className={`icon-badge-circle top-icon-${item.theme}`}>
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="obj-content-box">
                  <h3 className="obj-card-title">{item.title}</h3>
                  <div className={`obj-card-line line-${item.theme}`} aria-hidden="true"></div>
                  <p className="obj-card-desc">{item.desc}</p>
                </div>

                {/* Bottom Action Footer */}
                <div className="obj-card-footer">
                  <button
                    type="button"
                    className={`btn-read-more sm-btn-${item.theme} ${isCardActive ? 'active-read' : ''}`}
                    onClick={() => handleToggleDetail(item.id)}
                    aria-expanded={isCardActive}
                    aria-label={`Read more about ${item.title}`}
                  >
                    Read More <span className="arrow-sym">→</span>
                  </button>
                  <div className={`icon-badge-circle bottom-icon-${item.theme}`}>
                    {item.icon}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          DESIGNATED EXPANDED SECTION (Displayed ONLY when a card is clicked)
          Matches the designated layout and UI exactly for the clicked card
         ======================================================== */}
      {activeDetailId !== null && selectedObj && (
        <div
          className="obj-expanded-detail-wrapper"
          ref={detailRef}
          aria-live="polite"
        >
          <div className="obj-expanded-detail-container">
            <div className="obj-expanded-detail-card">
              {/* Subtle Corner Background Watermarks matching mockup */}
              <div className="detail-top-left-rings" aria-hidden="true">
                <svg viewBox="0 0 160 160" fill="none">
                  <circle cx="20" cy="20" r="70" stroke="#10b981" strokeWidth="22" opacity="0.15" />
                </svg>
              </div>

              <div className="detail-bottom-left-leaf" aria-hidden="true">
                <svg viewBox="0 0 160 160" fill="none">
                  <path d="M20 130C10 100 20 55 60 30C95 10 130 5 140 5C140 15 125 50 105 85C75 125 45 140 20 130Z" fill="#10b981" opacity="0.22" />
                  <path d="M65 145C55 120 65 90 95 68C120 50 150 46 155 46C155 52 145 80 128 102C105 132 82 145 65 145Z" fill="#34d399" opacity="0.28" />
                </svg>
              </div>

              {/* Close Button at top-right */}
              <button
                type="button"
                className="obj-detail-close-btn"
                onClick={() => setActiveDetailId(null)}
                aria-label="Close detailed view"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="obj-detail-grid">
                {/* 1. Left Column: Stepper & Title & Description */}
                <div className="detail-left-col">
                  {/* Left Stepper Indicator (01, 02, 03, 04, 05) */}
                  <div className="detail-stepper" aria-label="Objective selector">
                    {OBJECTIVES.map((o) => {
                      const isCurrentStep = activeDetailId === o.id;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          className={`stepper-step ${isCurrentStep ? 'step-active' : ''}`}
                          onClick={() => setActiveDetailId(o.id)}
                          aria-pressed={isCurrentStep}
                        >
                          <span className="step-num">{o.num}</span>
                          {isCurrentStep && <span className="step-indicator-bar" aria-hidden="true"></span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Title and Tagline Content */}
                  <div className="detail-left-content">
                    <h3 className="detail-heading">
                      {selectedObj.id === 2 ? (
                        <>
                          CFC, Packhouse, Cold<br />
                          Chain & Value Addition
                        </>
                      ) : selectedObj.id === 1 ? (
                        <>
                          Multi-Layer<br />
                          Agricultural<br />
                          Production
                        </>
                      ) : (
                        selectedObj.title
                      )}
                    </h3>
                    <div className="detail-accent-bar" aria-hidden="true"></div>
                    {selectedObj.tagline ? (
                      <p className="detail-tagline-text">{selectedObj.tagline}</p>
                    ) : null}
                  </div>
                </div>

                {/* 2. Middle Column: 3D Perspective Card with Relevant Objective Image */}
                <div className="detail-middle-col">
                  {/* Decorative Background Elements matching mockup */}
                  <div className="detail-bg-ring" aria-hidden="true"></div>
                  <div className="detail-offset-card" aria-hidden="true"></div>

                  {/* 3D Tilted Perspective Photo Frame */}
                  <div className="detail-perspective-frame">
                    <img
                      src={selectedObj.image}
                      alt={selectedObj.title}
                      className="detail-middle-photo"
                    />
                  </div>

                  {/* Floating Soft Leaf Accent on Left */}
                  <div className="detail-floating-leaf" aria-hidden="true">
                    <svg viewBox="0 0 40 40" fill="none">
                      <path
                        d="M10 32C8 24 12 12 28 8C35 6 38 6 38 8C38 12 34 22 24 28C16 32 12 32 10 32Z"
                        fill="#10b981"
                        opacity="0.32"
                      />
                    </svg>
                  </div>
                </div>

                {/* 3. Right Column: Dynamic Feature Cards for the Selected Objective */}
                <div className="detail-right-col">
                  {selectedObj.bulletsList && selectedObj.bulletsList.length > 0 ? (
                    <div className="detail-bullets-card card-mint">
                      <ul className="detail-custom-bullets">
                        {selectedObj.bulletsList.map((bullet, idx) => (
                          <li key={idx} className="detail-custom-bullet-item">
                            <span className="bullet-dot-badge" aria-hidden="true">•</span>
                            <span className="bullet-text">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    selectedObj.featureCards.map((feat) => {
                      const isMint = feat.theme === 'mint';
                      return (
                        <div
                          key={feat.id}
                          className={`feature-item-card ${isMint ? 'card-mint' : 'card-amber'}`}
                        >
                          <div
                            className={`feature-icon-circle ${isMint ? 'sm-icon-green' : 'sm-icon-orange'}`}
                            aria-hidden="true"
                          >
                            {renderFeatureIcon(feat.iconType)}
                          </div>

                          <div className="feature-text-block">
                            <h4 className="feature-title">{feat.title}</h4>
                            <p className="feature-desc">{feat.desc}</p>

                            {/* Bullet List if present (e.g. for Card 2 Detailed Explanation) */}
                            {feat.bullets && feat.bullets.length > 0 && (
                              <ul className="feature-bullets-list">
                                {feat.bullets.map((b, bIdx) => (
                                  <li key={bIdx} className="feature-bullet-item">
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div
                            className={`feature-arrow-btn ${isMint ? 'arrow-green' : 'arrow-orange'}`}
                            aria-hidden="true"
                          >
                            →
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
