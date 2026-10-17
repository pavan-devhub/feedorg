import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-8.css?inline'

export default function Screen8() {
  return (
    <>
      <title>KYJ_Screen8_Soil_Health_Card_Upload</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/7" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>Day 87 · 10:22 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 1 · Final step</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">Soil Health Card · నేల ఆరోగ్య కార్డు</h1>
          </div>
        </div>
      </section>

      {/* Stage 1 checklist status */}
      <section className="card card--tinted tone-orange stage-check">
        <h2 className="card__title">📋 Stage 1 Completion — 3 of 4 done</h2>
        <ul className="stage-check__list kyj-cols-4" role="list">
          <li className="stage-check__item">
            <span className="stage-check__box">✓</span>
            <span>Farm Plot GPS registered (ANP-001)</span>
          </li>
          <li className="stage-check__item">
            <span className="stage-check__box">✓</span>
            <span>GAP Log — Day 87/90 (3 more days!)</span>
          </li>
          <li className="stage-check__item">
            <span className="stage-check__box">✓</span>
            <span>Crop registered (Chilli S4 · 2.5 acres)</span>
          </li>
          <li className="stage-check__item is-pending">
            <span className="stage-check__box" />
            <strong>Soil Health Card upload — pending</strong>
          </li>
        </ul>
      </section>

      <div className="grid grid--stretch">
        {/* Upload zone */}
        <div className="span-5 block">
          <div className="section-label">Upload your Soil Health Card</div>
          <section className="dropzone tone-brown shc-drop">
            <span className="shc-drop__icon">📄</span>
            <h2 className="shc-drop__title">Tap to upload SHC PDF or Photo</h2>
            <p className="shc-drop__sub">From ICAR Soil Health Portal · soilhealth.dac.gov.in</p>
            <div className="chips shc-drop__sources">
              <span className="chip">📷 Camera</span>
              <span className="chip">📁 Files</span>
              <span className="chip">🔗 ICAR Portal</span>
            </div>
          </section>
        </div>

        {/* SHC data */}
        <div className="span-7 block">
          <div className="section-label">Soil report — ANP-001 · Plot data</div>
          <section className="card shc-card">
            <div className="card__head">
              <h2 className="card__title">Soil Health Card Data</h2>
              <span className="shc-id">SHC-ANP-2024-8821</span>
            </div>

            <div className="stats nutrients">
              <div className="stat nutrient tone-orange">
                <div className="nutrient__reading"><span className="stat__value">142</span><span className="stat__unit">kg/ha</span></div>
                <div className="stat__label">Nitrogen (N)</div>
                <span className="tag tone-orange">⚠ Low</span>
              </div>

              <div className="stat nutrient tone-green">
                <div className="nutrient__reading"><span className="stat__value">38</span><span className="stat__unit">kg/ha</span></div>
                <div className="stat__label">Phosphorus (P)</div>
                <span className="tag tone-green">✓ Medium</span>
              </div>

              <div className="stat nutrient tone-green">
                <div className="nutrient__reading"><span className="stat__value">312</span><span className="stat__unit">kg/ha</span></div>
                <div className="stat__label">Potassium (K)</div>
                <span className="tag tone-green">✓ High</span>
              </div>

              <div className="stat nutrient tone-green">
                <div className="nutrient__reading"><span className="stat__value">6.8</span><span className="stat__unit">pH</span></div>
                <div className="stat__label">Soil pH</div>
                <span className="tag tone-green">✓ Optimal</span>
              </div>

              <div className="stat nutrient tone-orange">
                <div className="nutrient__reading"><span className="stat__value">0.48</span><span className="stat__unit">%</span></div>
                <div className="stat__label">Organic C</div>
                <span className="tag tone-orange">⚠ Low</span>
              </div>

              <div className="stat nutrient tone-green">
                <div className="nutrient__reading"><span className="stat__value">0.32</span><span className="stat__unit">dS/m</span></div>
                <div className="stat__label">EC</div>
                <span className="tag tone-green">✓ Normal</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Recommendations */}
      <section className="card card--tinted tone-green recs">
        <div className="card__head">
          <h2 className="card__title">🌱 ఫీడ్ యొక్క మిర్చి S4 నేల సిఫార్సు</h2>
        </div>
        <ul className="recs__list kyj-cols-3" role="list">
          <li className="rec rec--alert">
            <span className="rec__icon">🔴</span>
            <span>నాట్లు వేయడానికి ముందు ఎకరానికి 80 కిలోల యూరియా వేయండి (నైట్రోజన్ లోపం)</span>
          </li>
          <li className="rec">
            <span className="rec__icon">🟢</span>
            <span>నేలలో సేంద్రియ కార్బన్ పెంచడానికి ఎకరానికి 4 టన్నుల FYM (పశువుల ఎరువు) వేయండి</span>
          </li>
          <li className="rec rec--ok">
            <span className="rec__icon">✓</span>
            <span>అదనంగా ఫాస్ఫరస్ (P) లేదా పొటాషియం (K) వేయాల్సిన అవసరం లేదు — మోతాదు సరిపోతుంది</span>
          </li>
        </ul>
        <p className="card__foot recs__source">మూలం: ICAR-IIHR బెంగళూరు + KVK అనంతపురం</p>
      </section>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">This completes your Stage 1 prerequisites → Badge in 3 days!</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/8a">Confirm & Upload Card · కార్డు నమోదు చేయండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
