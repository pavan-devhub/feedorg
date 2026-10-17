import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-6.css?inline'

export default function Screen6() {
  return (
    <>
      <title>KYJ_Screen6_GAP_Activity_Log</title>
      <PageStyles css={css} />

      {/* Page header + streak */}
      <section className="page-head streak-hero">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/5" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>7:30 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Day 23</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">GAP Activity Log · రోజువారీ లాగ్</h1>
          </div>

          <div className="page-head__visual streak">
            <div className="hero-metric streak__done">
              <span className="hero-metric__value">23</span>
              <span className="hero-metric__label">Days completed · రోజులు పూర్తయ్యాయి</span>
            </div>
            <div className="hero-metric streak__left">
              <span className="hero-metric__value">67 days left</span>
              <span className="hero-metric__label">Target: 90 days → Stage 1 badge</span>
            </div>
          </div>
        </div>

        <div className="page-head__foot">
          <div className="streak-track" style={{ '--fill': '25.6%' }} aria-hidden="true" />
          <div className="streak-dots" aria-hidden="true">
            {/* 22 done */}
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            <span className="streak-dot is-done" />
            {/* today */}
            <span className="streak-dot is-today" />
            {/* remaining */}
            <span className="streak-dot" />
            <span className="streak-dot" />
            <span className="streak-dot" />
            <span className="streak-dot" />
            <span className="streak-dot" />
            <span className="streak-dot" />
            <span className="streak-dot" />
            <span className="streak-dot" />
            <span className="streak-dot" />
            <span className="streak-dot" />
          </div>
        </div>
      </section>

      {/* Today's activity */}
      <section className="block">
        <div className="section-label tone-green today-label">📅 Today — 05 Sep 2026 · మీ పొలంలో ఈరోజు ఏమి చేశారు?</div>
        <div className="tiles activity-tiles">
          <button type="button" className="tile is-selected" aria-pressed="true">
            <span className="tile__icon">💧</span>
            <span className="tile__title">Irrigation</span>
            <span className="tile__sub">నీటి పారుదల</span>
          </button>
          <button type="button" className="tile" aria-pressed="false">
            <span className="tile__icon">🧪</span>
            <span className="tile__title">Pesticide Spray</span>
            <span className="tile__sub">పురుగు మందు</span>
          </button>
          <button type="button" className="tile" aria-pressed="false">
            <span className="tile__icon">🌱</span>
            <span className="tile__title">Fertiliser</span>
            <span className="tile__sub">ఎరువు</span>
          </button>
          <button type="button" className="tile" aria-pressed="false">
            <span className="tile__icon">✂️</span>
            <span className="tile__title">Pruning / Weeding</span>
            <span className="tile__sub">కలుపు తీత</span>
          </button>
        </div>
      </section>

      <div className="grid grid--stretch">
        {/* Log details */}
        <section className="span-7 card log-form">
          <div className="fields">
            <div className="kyj-field">
              <span className="field__label">Plot · పొలం</span>
              <div className="field__control">
                <span>ANP-001 · Home Field (2.5 ac)</span>
                <span className="field__adorn log-form__adorn">▼</span>
              </div>
            </div>

            <div className="kyj-field">
              <span className="field__label">Duration · సమయం</span>
              <div className="field__control is-active">
                <span>2 hours (6 AM – 8 AM)</span>
                <span className="field__adorn log-form__adorn">⏱</span>
              </div>
            </div>

            <div className="kyj-field field--full">
              <span className="field__label">Notes (optional) · గమనికలు</span>
              <div className="field__control is-placeholder notes-control">
                <span>Any observation about crop...</span>
              </div>
            </div>
          </div>
        </section>

        {/* MRL check + reward */}
        <div className="span-5 col">
          <div className="callout callout--lg tone-green mrl-safe">
            <span className="callout__icon">✅</span>
            <p className="callout__body">
              <strong>Irrigation</strong> — No EU MRL concern. Safe to log. Continue as planned.
            </p>
          </div>

          <div className="coins coins--inline log-coins">
            <span className="coins__emoji">🏅</span>
            <div className="log-coins__body">
              <strong className="log-coins__title">+5 KRISHI COINS for today's log</strong>
              <span className="log-coins__sub">Running total: 115 KC earned from GAP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">Day 23 / 90 · 67 more days to Stage 1 పొలం సిద్ధం badge</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/7">Submit Today's Log · లాగ్ సమర్పించండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
