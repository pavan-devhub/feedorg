import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-4.css?inline'

export default function Screen4() {
  return (
    <>
      <title>KYJ_Screen4_Export_Readiness_Score</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/3" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>9:48 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Step 3 of 4</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">Export Readiness Score (ERS)</h1>
            <p className="page-sub">మీ ERS స్కోర్ · Your Readiness Score</p>
            <span className="eligible-pill">✓ Stage 1 Eligible — Chilli minimum: 60</span>
          </div>

          <div className="page-head__visual">
            <div className="score-ring" style={{ '--value': '72' }} role="img" aria-label="72 out of 100">
              <div className="score-ring__inner">
                <span className="score-ring__value">72</span>
                <span className="score-ring__denom">/ 100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-head__foot">
          <div className="progress progress--on-dark"><div className="progress__fill" style={{ width: '50%' }} /></div>
        </div>
      </section>

      {/* Category breakdown */}
      <section className="cat-grid">
        <article className="card kyj-cat-card">
          <div className="cat-card__top">
            <h3 className="cat-card__name">① Legal & Compliance</h3>
            <span className="cat-card__pts" style={{ color: '#1b5e20' }}>18 / 20</span>
          </div>
          <div className="progress"><div className="progress__fill" style={{ width: '90%', background: '#2e7d32' }} /></div>
          <p className="cat-card__detail">✓ Aadhaar verified · ✓ PACS member · ✓ Consent signed · ◐ Land record pending</p>
        </article>

        <article className="card kyj-cat-card">
          <div className="cat-card__top">
            <h3 className="cat-card__name">② Product Certifications</h3>
            <span className="cat-card__pts" style={{ color: '#f57f17' }}>12 / 20</span>
          </div>
          <div className="progress"><div className="progress__fill" style={{ width: '60%', background: '#f9a825' }} /></div>
          <p className="cat-card__detail">◐ BharatGAP registration pending · ✗ GAP log not started yet · ✗ No PHRT history</p>
        </article>

        <article className="card kyj-cat-card">
          <div className="cat-card__top">
            <h3 className="cat-card__name">③ Packaging & Labelling</h3>
            <span className="cat-card__pts" style={{ color: '#f57f17' }}>9 / 15</span>
          </div>
          <div className="progress"><div className="progress__fill" style={{ width: '60%', background: '#f9a825' }} /></div>
          <p className="cat-card__detail">✓ Packhouse within 50km (38km) · ◐ EU carton spec awareness</p>
        </article>

        <article className="card kyj-cat-card">
          <div className="cat-card__top">
            <h3 className="cat-card__name">④ Financial Capacity</h3>
            <span className="cat-card__pts" style={{ color: '#1b5e20' }}>17 / 20</span>
          </div>
          <div className="progress"><div className="progress__fill" style={{ width: '85%', background: '#2e7d32' }} /></div>
          <p className="cat-card__detail">✓ PACS account linked · ✓ KCC Rs.1.5L available · ✓ Zero advance acknowledged</p>
        </article>

        <article className="card kyj-cat-card">
          <div className="cat-card__top">
            <h3 className="cat-card__name">⑤ Production Capacity</h3>
            <span className="cat-card__pts" style={{ color: '#1b5e20' }}>10 / 15</span>
          </div>
          <div className="progress"><div className="progress__fill" style={{ width: '67%', background: '#2e7d32' }} /></div>
          <p className="cat-card__detail">✓ 2.5 acres Chilli S4 · ◐ Soil Health Card upload pending</p>
        </article>

        <article className="card kyj-cat-card">
          <div className="cat-card__top">
            <h3 className="cat-card__name">⑥ Market Knowledge</h3>
            <span className="cat-card__pts" style={{ color: '#1b5e20' }}>4 / 5</span>
          </div>
          <div className="progress"><div className="progress__fill" style={{ width: '80%', background: '#2e7d32' }} /></div>
          <p className="cat-card__detail">✓ EPM attended · ✓ FOB vs mandi gap quiz: 4/5</p>
        </article>

        <article className="card kyj-cat-card">
          <div className="cat-card__top">
            <h3 className="cat-card__name">⑦ Logistics Knowledge</h3>
            <span className="cat-card__pts" style={{ color: '#1b5e20' }}>2 / 5</span>
          </div>
          <div className="progress"><div className="progress__fill" style={{ width: '40%', background: '#f9a825' }} /></div>
          <p className="cat-card__detail">✓ Vizag port awareness · ✗ CHA contact not confirmed yet</p>
        </article>

        {/* Gate result */}
        <div className="callout callout--lg tone-green gate-tile">
          <div className="callout__body">
            <div className="callout__title">✅ ERS 72 / 100 — Chilli minimum 60 cleared!</div>
          </div>
        </div>
      </section>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">Register your farm plot next → Screen 5</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/5">Proceed to Stage 1 · స్టేజ్ 1 కి వెళ్ళండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
