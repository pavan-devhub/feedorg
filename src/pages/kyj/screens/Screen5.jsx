import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-5.css?inline'

export default function Screen5() {
  return (
    <>
      <title>KYJ_Screen5_Farm_Plot_GPS_Registration</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/4" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>9:52 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 1 · +500 KC</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">Farm Plot Registration</h1>
          </div>
        </div>
      </section>

      <div className="grid grid--stretch">
        {/* Satellite map + GPS capture */}
        <section className="span-7 card card--flush map-card">
          <div className="map">
            <div className="map__grid" />
            <div className="map__plot" />
            <div className="map__pin">📍</div>
            <div className="map__label">Plot ANP-001 · 2.5 ac</div>
            <div className="map__controls">
              <button type="button" className="map__btn" aria-label="Zoom in">+</button>
              <button type="button" className="map__btn" aria-label="Zoom out">−</button>
            </div>
            <div className="map__source">Bhuvan ISRO · Satellite</div>
          </div>

          <div className="gps">
            <span className="gps__icon">📍</span>
            <div className="gps__info">
              <div className="gps__coords">14.6789° N, 77.6012° E</div>
              <div className="gps__sub">± 3m accuracy · GPS locked</div>
            </div>
            <button type="button" className="btn btn--tone tone-green gps__btn">📍 Retap</button>
          </div>
        </section>

        {/* Plot details */}
        <section className="span-5 card kyj-form-card">
          <div className="fields">
            <div className="kyj-field field--full">
              <span className="field__label">Plot Name · పొలం పేరు</span>
              <div className="field__control is-filled">
                <span>Home Field — Kalyandurgam</span>
                <span className="field__adorn">✓</span>
              </div>
            </div>

            <div className="kyj-field field--full">
              <span className="field__label">Crop · పంట</span>
              <div className="field__control is-active">
                <span>🌶 Chilli (Red)</span>
              </div>
              <div className="chips variety-chips">
                <span className="chip is-selected">Sannam S4</span>
                <span className="chip">Teja</span>
                <span className="chip">334</span>
                <span className="chip">LCA 334</span>
                <span className="chip">+ Other</span>
              </div>
            </div>

            <div className="kyj-field field--full">
              <span className="field__label">Area · విస్తీర్ణం (acres)</span>
              <div className="field__control">
                <span>2.5 acres</span>
              </div>
              <span className="field__hint">≈ 20 MT yield estimate</span>
            </div>

            <div className="kyj-field field--full">
              <span className="field__label">Sowing Date · విత్తిన తేది</span>
              <div className="field__control">
                <span>14 Aug 2026</span>
                <span className="field__adorn">📅</span>
              </div>
            </div>
          </div>

          <div className="callout tone-orange offline-tag">
            <span className="callout__icon">⚡</span>
            <span className="callout__body">Offline-first — syncs to Bhuvan ISRO on reconnect</span>
          </div>
        </section>

        {/* TraceX chain note */}
        <div className="span-12 callout callout--lg tone-blue trace-note">
          <span className="callout__icon">🔗</span>
          <p className="callout__body">
            <strong>TraceX QR చైన్ ఇక్కడ ప్రారంభమవుతుంది:</strong> మీ GPS coordinates, పంట రకం మరియు విత్తిన తేదీ ఆధారంగా పంటకు సంబంధించిన మొదటి రికార్డు తయారవుతుంది. ఇది మీ export consignment యొక్క QR traceability chain లో <strong>"Farm GPS"</strong> node గా ఉంటుంది — గమ్యస్థానంలో international buyers దీనిని scan చేయగలరు.
          </p>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text"><strong className="plot-id">Plot ID: ANP-001</strong></div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/6">Register Plot · పొలం నమోదు చేయండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
