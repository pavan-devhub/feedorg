import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, ArrowRight, ArrowLeft, ExternalLink, X } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CENTRAL_MINISTRIES, STATES } from '../../data/schemesData';
import { schemeTheme } from './schemeThemes';
import './KnowYourSchemes.css';

const countSchemes = (groups) => groups.reduce((n, g) => n + g.schemes.length, 0);

const LEVELS = [
  { value: 'central', label: 'Central Government' },
  { value: 'state', label: 'State Government' },
];

// What step 2 offers for each level: central ministries, or every state's departments.
// `place` heads the results ("Schemes for <place> → <name>").
const GROUPS = {
  central: CENTRAL_MINISTRIES.map((m) => ({ ...m, place: 'Central Government' })),
  state: STATES.flatMap((s) => s.depts.map((d) => ({ ...d, place: `${s.name} Government` }))),
};

const CENTRAL_SCHEME_COUNT = countSchemes(CENTRAL_MINISTRIES);
const AP_SCHEME_COUNT = countSchemes(STATES.find((s) => s.id === 'AP').depts);

// Detail rows of the "View Details" dialog, shown when the scheme has the field.
const SCHEME_FACTS = [
  ['benefit', 'Benefits'],
  ['who', 'Who can apply'],
  ['nodal', 'Nodal agency'],
  ['stacks', 'Combines with'],
];

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

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

// `controlId` makes the step title the label of the dropdown in that card.
const STEPS = [
  {
    key: 'level',
    tone: 'green',
    icon: <BankIcon />,
    title: 'Choose level',
    text: ['Select Central, State or', 'Ministry / Department level'],
    controlId: 'kys-level',
  },
  {
    key: 'group',
    tone: 'blue',
    icon: <DocumentIcon />,
    title: ['Choose ministry', 'or department'],
    text: ['Select the relevant ministry', 'or department'],
    controlId: 'kys-group',
  },
  {
    key: 'count',
    tone: 'orange',
    icon: <ExternalLink strokeWidth={2.6} />,
    title: 'Available schemes',
    text: ['View schemes based on your', 'selection below'],
  },
];

const withBreaks = (lines) =>
  [].concat(lines).map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </React.Fragment>
  ));

const Select = ({ children, ...props }) => (
  <span className="kys-select">
    <select {...props}>{children}</select>
    <ChevronDown strokeWidth={2.2} aria-hidden="true" />
  </span>
);

// The same card as the Loans & Finance "Explore your finance needs" grid: inset photo, title,
// benefit line and an accent tag with the scheme type. The whole card opens the details dialog.
const SchemeCard = ({ scheme, onOpen }) => {
  const { Icon, tone, image } = schemeTheme(scheme);
  return (
    <li className={`kys-scheme kys-tone--${tone}`}>
      <div className="kys-scheme-media">
        <img className="kys-scheme-img" src={image} alt="" loading="lazy" decoding="async" draggable="false" />
      </div>
      <div className="kys-scheme-body">
        <h3 className="kys-scheme-title">{scheme.name}</h3>
        <p className="kys-scheme-desc">{scheme.benefit}</p>
        {scheme.type && (
          <span className="kys-scheme-tag">
            <Icon strokeWidth={2} aria-hidden="true" />
            <span className="kys-scheme-tag-text">{scheme.type}</span>
          </span>
        )}
      </div>
      <button
        type="button"
        className="kys-scheme-open"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`View details: ${scheme.name}`}
      />
    </li>
  );
};

// Native modal <dialog>: it traps focus, closes on Esc and hands focus back by itself.
// A click on the backdrop lands on the <dialog> element itself, so that closes it too.
const SchemeDetails = ({ scheme, group, onClosed }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (scheme) dialogRef.current.showModal();
  }, [scheme]);

  const close = () => dialogRef.current.close();
  const theme = scheme && schemeTheme(scheme);

  return (
    <dialog
      ref={dialogRef}
      className="kys-dialog"
      aria-labelledby="kys-dialog-title"
      onClose={onClosed}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      {scheme && (
        <div className={`kys-dialog-inner kys-tone--${theme.tone}`}>
          <img className="kys-dialog-img" src={theme.image} alt="" />
          <button type="button" className="kys-dialog-close" onClick={close} aria-label="Close">
            <X strokeWidth={2.4} />
          </button>
          <div className="kys-dialog-body">
            <div className="kys-dialog-head">
              <span className="kys-scheme-icon" aria-hidden="true"><theme.Icon strokeWidth={2} /></span>
              <p className="kys-dialog-place">{group.place} · {group.name}</p>
            </div>
            <h2 id="kys-dialog-title" className="kys-dialog-title">{scheme.name}</h2>
            {scheme.type && scheme.type !== 'State scheme' && <span className="kys-dialog-type">{scheme.type}</span>}
            <dl className="kys-dialog-facts">
              {SCHEME_FACTS.filter(([field]) => scheme[field]).map(([field, label]) => (
                <div key={field}>
                  <dt>{label}</dt>
                  <dd>{scheme[field]}</dd>
                </div>
              ))}
            </dl>
            <div className="kys-dialog-foot">
              <a className="kys-dialog-apply" href={scheme.url} target="_blank" rel="noopener noreferrer">
                Visit official website <ExternalLink strokeWidth={2.4} />
              </a>
              <span className="kys-dialog-host">{hostOf(scheme.url)}</span>
            </div>
            <p className="kys-dialog-note">
              Rates, limits and deadlines change, so confirm on the official website before applying.
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
};

const KnowYourSchemes = ({ onNavigate, isLoggedIn, user, onLogout }) => {
  const [level, setLevel] = useState('central');
  const [groupId, setGroupId] = useState(GROUPS.central[0].id);
  const [openScheme, setOpenScheme] = useState(null);

  const group = GROUPS[level].find((g) => g.id === groupId);
  const schemeCount = group.schemes.length;

  // A new level starts on its first ministry / department, so there is always a list to show.
  const handleLevelChange = (e) => {
    const nextLevel = e.target.value;
    setLevel(nextLevel);
    setGroupId(GROUPS[nextLevel][0].id);
  };

  const stepControls = {
    level: (
      <Select id="kys-level" value={level} onChange={handleLevelChange}>
        {LEVELS.map((l) => (
          <option key={l.value} value={l.value}>{l.label}</option>
        ))}
      </Select>
    ),
    group: (
      <Select id="kys-group" value={groupId} onChange={(e) => setGroupId(e.target.value)}>
        {level === 'central'
          ? CENTRAL_MINISTRIES.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)
          : STATES.map((s) => (
            <optgroup key={s.id} label={s.name}>
              {s.depts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </optgroup>
          ))}
      </Select>
    ),
    count: (
      <p className="kys-step-count" aria-live="polite">
        <span className="kys-step-count-num">{schemeCount}</span>
        {schemeCount === 1 ? 'Scheme found' : 'Schemes found'}
      </p>
    ),
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
            <button type="button" className="kys-back-btn" onClick={() => onNavigate('home')}>
              <ArrowLeft strokeWidth={2.4} /> Back to Home
            </button>
            <div className="kys-hero-copy">
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
                  <span className="kys-stat-num">{CENTRAL_SCHEME_COUNT}</span>
                  <span className="kys-stat-label">Central Schemes</span>
                </div>
              </div>
              <div className="kys-stat kys-stat--blue">
                <div className="kys-stat-icon"><PeopleIcon /></div>
                <div className="kys-stat-text">
                  <span className="kys-stat-num">{CENTRAL_MINISTRIES.length}</span>
                  <span className="kys-stat-label">Ministries &amp; Bodies</span>
                </div>
              </div>
              <div className="kys-stat kys-stat--orange">
                <div className="kys-stat-icon">
                  <img src="/images/know-your-schemes/india-map.png" alt="" />
                </div>
                <div className="kys-stat-text">
                  <span className="kys-stat-num">{AP_SCHEME_COUNT}</span>
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
              {STEPS.map((step, i) => {
                const Title = step.controlId ? 'label' : 'span';
                return (
                  <li key={step.key} className={`kys-step kys-step--${step.tone}`}>
                    <div className="kys-step-card">
                      <StepWave id={`kys-wave-${step.tone}`} />
                      <span className="kys-step-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="kys-step-icon">{step.icon}</span>
                      <span className="kys-step-text">
                        <Title className="kys-step-title" htmlFor={step.controlId}>{withBreaks(step.title)}</Title>
                        <span className="kys-step-desc">{withBreaks(step.text)}</span>
                      </span>
                      {stepControls[step.key]}
                    </div>
                    {i < STEPS.length - 1 && (
                      <span className="kys-step-connector" aria-hidden="true"><ChevronRight strokeWidth={2.8} /></span>
                    )}
                  </li>
                );
              })}
            </ol>

            {/* SCHEMES OF THE SELECTED MINISTRY / DEPARTMENT */}
            <section className="kys-schemes" aria-labelledby="kys-schemes-title">
              <header className="kys-schemes-head">
                <h2 id="kys-schemes-title" className="kys-schemes-title">
                  <span>Schemes for</span>{' '}
                  <span className="kys-schemes-place">{group.place}</span>{' '}
                  <ArrowRight className="kys-schemes-sep" strokeWidth={2.4} aria-hidden="true" />{' '}
                  <span className="kys-schemes-place">{group.name}</span>
                </h2>
                <p className="kys-schemes-desc">Explore the available schemes, view details, eligibility criteria and apply.</p>
              </header>
              <ul className="kys-scheme-grid">
                {group.schemes.map((scheme) => (
                  <SchemeCard key={scheme.name} scheme={scheme} onOpen={() => setOpenScheme(scheme)} />
                ))}
              </ul>
            </section>
            <SchemeDetails scheme={openScheme} group={group} onClosed={() => setOpenScheme(null)} />

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
