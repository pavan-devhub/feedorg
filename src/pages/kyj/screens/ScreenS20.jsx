import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-s20.css?inline'

export default function ScreenS20() {
  return (
    <>
      <title>KYJ_Screen20_CFC_Intake_Grading</title>
      <PageStyles css={css} />

      {/* Page header + truck arrival */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/s19" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>17 Nov 2026 · 7:42 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 6 · 1 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">CFC Intake & Grading (VA-01)</h1>
          </div>

          <div className="page-head__visual">
            <div className="arrival">
              <span className="arrival__icon">🚛</span>
              <div className="arrival__body">
                <div className="arrival__title">Truck arrived · Gorantla Packhouse</div>
                <div className="arrival__meta">Vehicle: AP02 BX 4521 · Gate 2 · 07:42 AM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid--stretch">
        {/* Step 1: FEED CARD QR scanned */}
        <div className="span-5 block">
          <div className="section-label">Step 1 — FEED CARD QR Scanned</div>
          <section className="card card--outline tone-brown scan-card">
            <div className="scan-card__icon">📱</div>
            <div className="scan-card__info">
              <span className="tag tag--solid tone-green">✓ VERIFIED</span>
              <h2 className="scan-card__name">Ramu Naidu · BASIC MEMBER</h2>
              <div className="scan-card__id">FEED-ANT-000042</div>
              <div className="scan-card__plot">🌾 Plot ANP-001 · 🌶 Chilli S4 · 2.5 acres</div>
            </div>
          </section>
        </div>

        {/* Step 2: Lot identification */}
        <div className="span-7 block">
          <div className="section-label">Step 2 — Lot Identification</div>
          <section className="card">
            <div className="card__head">
              <h2 className="card__title">📋 Consignment Reference</h2>
            </div>
            <div className="kv">
              <div className="kv__row"><span className="kv__key">Lot ID</span><span className="kv__val mono">FEED-ANT-26-001</span></div>
              <div className="kv__row"><span className="kv__key">Commodity</span><span className="kv__val">🌶 Chilli S4 (Red Dried)</span></div>
              <div className="kv__row"><span className="kv__key">Buyer</span><span className="kv__val">🇩🇪 Hamburg Spice Imports</span></div>
              <div className="kv__row"><span className="kv__key">PHRT status</span><span className="kv__val is-ok">✓ PASS · Eurofins TC-3218</span></div>
              <div className="kv__row"><span className="kv__key">Phytosanitary</span><span className="kv__val is-ok">✓ Uploaded · SPQO Anantapur</span></div>
            </div>
          </section>
        </div>

        {/* Step 3: Weight verification */}
        <div className="span-5 block">
          <div className="section-label">Step 3 — Weight Verification</div>
          <section className="card weight-card">
            <div className="card__head">
              <h2 className="card__title">⚖️ Bridge weight · Gorantla</h2>
            </div>
            <div className="weights">
              <div className="stat stat--center tone-brown">
                <div className="stat__value">1,612</div>
                <div className="stat__unit">kg</div>
                <div className="stat__label">Gross</div>
              </div>
              <div className="stat stat--center tone-brown">
                <div className="stat__value">187</div>
                <div className="stat__unit">kg</div>
                <div className="stat__label">Tare (sacks)</div>
              </div>
              <div className="stat stat--center tone-green weight-net">
                <div className="stat__value">1,425</div>
                <div className="stat__unit">kg</div>
                <div className="stat__label">Net</div>
              </div>
            </div>
            <p className="weight-ok">✓ Within ±2% of expected 1,400 kg</p>
          </section>
        </div>

        {/* Step 4: APEDA grading */}
        <div className="span-7 block">
          <div className="section-label">Step 4 — APEDA Grading</div>
          <section className="card grade-card">
            <div className="card__head">
              <h2 className="card__title">🔬 Grade sort — Visual + ASTA color + Capsaicin</h2>
            </div>

            <div className="list grades">
              <div className="list__item">
                <span className="list__icon grade-letter" style={{ background: '#1b5e20' }}>A</span>
                <div className="list__body">
                  <div className="list__title">Premium · EU Export Quality</div>
                  <div className="list__meta">Uniform red · ASTA 160+ · Capsaicin &gt;0.5%</div>
                </div>
                <div className="list__aside grade-stats">
                  <div className="grade-stats__weight">980 kg</div>
                  <div className="grade-stats__pct">68.8%</div>
                </div>
              </div>

              <div className="list__item">
                <span className="list__icon grade-letter" style={{ background: '#f57f17' }}>B</span>
                <div className="list__body">
                  <div className="list__title">Standard · Gulf / Domestic Premium</div>
                  <div className="list__meta">Slight variation · ASTA 120-160</div>
                </div>
                <div className="list__aside grade-stats">
                  <div className="grade-stats__weight">320 kg</div>
                  <div className="grade-stats__pct">22.5%</div>
                </div>
              </div>

              <div className="list__item">
                <span className="list__icon grade-letter" style={{ background: '#bf360c' }}>C</span>
                <div className="list__body">
                  <div className="list__title">Domestic · BULLKART (LINE B)</div>
                  <div className="list__meta">Below export grade · eNAM channel</div>
                </div>
                <div className="list__aside grade-stats">
                  <div className="grade-stats__weight">125 kg</div>
                  <div className="grade-stats__pct">8.8%</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Cold chain */}
        <section className="span-6 card card--tinted tone-blue">
          <div className="card__head">
            <h2 className="card__title">❄️ Cold Chain Started · Temperature Log</h2>
          </div>
          <div className="kv">
            <div className="kv__row"><span className="kv__key">Chilli target temp</span><span className="kv__val is-info">0–5°C</span></div>
            <div className="kv__row"><span className="kv__key">Current chamber temp</span><span className="kv__val is-info">3.2°C ✓</span></div>
            <div className="kv__row"><span className="kv__key">Log started</span><span className="kv__val is-info">07:48 AM · 17 Nov</span></div>
            <div className="kv__row"><span className="kv__key">IoT sensor</span><span className="kv__val is-info">GP-CH-001 · 5-min interval</span></div>
          </div>
        </section>

        {/* ETO-free treatment */}
        <section className="span-6 card card--tinted tone-orange eto-card">
          <div className="card__head">
            <h2 className="card__title">⚗️ ETO-రహిత చికిత్స షెడ్యూల్ చేయబడింది</h2>
          </div>
          <p className="eto-card__detail">
            ఆవిరి చికిత్స సమయం: <strong>18 Nov · 09:00 AM</strong> · వ్యవధి 45 నిమిషాలు · ETO రసాయనాలు ఉపయోగించరు (EU heightened control నిబంధనలకు అనుగుణంగా) · ఈ ప్రకటన Phytosanitary సర్టిఫికేట్‌కు ఆటోమేటిక్‌గా జత చేయబడుతుంది
          </p>
        </section>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">980 kg Grade A → 39 cartons EU · Stage 6 advance → Screen 21 TraceX QR</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/s21">Confirm Intake & Start Packing · 56 cartons<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
