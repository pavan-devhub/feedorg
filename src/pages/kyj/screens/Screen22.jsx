import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-22.css?inline'

export default function Screen22() {
  return (
    <>
      <title>KYJ_Screen22_Sample_Dispatch</title>
      <PageStyles css={css} />

      {/* Page header + DHL waybill */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/s21" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>20 Nov 2026 · 2:15 PM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 6 · 3 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">Sample Dispatch Tracker</h1>
          </div>

          <div className="page-head__visual">
            <div className="dhl-card">
              <div className="dhl-card__logo">DHL</div>
              <div className="dhl-card__info">
                <div className="dhl-card__awb">AWB: 1234 5678 9012</div>
                <div className="dhl-card__detail">Express Worldwide · Temperature-controlled (D07-13) · 5–7 working days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* Live DHL tracker */}
        <div className="span-7 block">
          <div className="section-label">Live DHL Tracking · ట్రాకింగ్</div>
          <section className="card card--flush tone-accent">
            <div className="card__strip">
              <h2 className="card__strip-title">📍 Tracking AWB 1234 5678 9012</h2>
            </div>

            <ol className="timeline track" role="list">
              <li className="timeline__item is-done">
                <span className="track__line is-done" aria-hidden="true" />
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">Picked up · Gorantla Packhouse</div>
                  <div className="timeline__text">📍 Gorantla, Anantapur AP</div>
                  <div className="timeline__meta">19 Nov 2026 · 04:30 PM IST</div>
                </div>
              </li>

              <li className="timeline__item is-done">
                <span className="track__line is-done" aria-hidden="true" />
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">DHL Hyderabad Hub</div>
                  <div className="timeline__text">📍 Shamshabad RGIA</div>
                  <div className="timeline__meta">19 Nov 2026 · 10:45 PM IST</div>
                </div>
              </li>

              <li className="timeline__item is-done">
                <span className="track__line is-done" aria-hidden="true" />
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">Departed India · DHL Express flight</div>
                  <div className="timeline__text">✈️ HYD → DXB → FRA</div>
                  <div className="timeline__meta">20 Nov 2026 · 06:12 AM IST</div>
                </div>
              </li>

              <li className="timeline__item is-active">
                <span className="track__line" aria-hidden="true" />
                <span className="timeline__dot">→</span>
                <div className="timeline__body">
                  <div className="timeline__title">In transit · Frankfurt customs</div>
                  <div className="timeline__text">📍 Frankfurt · EU customs clearance</div>
                  <div className="timeline__meta">20 Nov 2026 · 02:00 PM IST · Live now</div>
                </div>
              </li>

              <li className="timeline__item is-future">
                <span className="track__line" aria-hidden="true" />
                <span className="timeline__dot">5</span>
                <div className="timeline__body">
                  <div className="timeline__title">Out for delivery · Hamburg</div>
                  <div className="timeline__text">📍 Hamburg buyer warehouse</div>
                  <div className="timeline__meta">ETA: 22 Nov 2026 · 11:00 AM CET</div>
                </div>
              </li>

              <li className="timeline__item is-future is-last">
                <span className="timeline__dot">6</span>
                <div className="timeline__body">
                  <div className="timeline__title">Buyer acknowledgment</div>
                  <div className="timeline__text">Expected 5–7 working days from delivery</div>
                </div>
              </li>
            </ol>
          </section>
        </div>

        {/* Sample contents */}
        <div className="span-5 block">
          <div className="section-label">Commercial Sample Pack · 2 kg</div>
          <section className="card sample-pack">
            <div className="card__head">
              <h2 className="card__title">📦 What's in the buyer sample</h2>
            </div>

            <ul className="list" role="list">
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">2 kg sealed sample — Grade A Chilli S4</div></div>
                <span className="list__aside">980 kg lot</span>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">COA — Eurofins NABL TC-3218</div></div>
                <span className="list__aside mono">EF-HYD-2026-8821</span>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">PHRT certificate (full residue report)</div></div>
                <span className="list__aside">500+ panel</span>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">Phytosanitary cert · SPQO Anantapur</div></div>
                <span className="list__aside">Govt issued</span>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">TraceX QR card (scan → full chain)</div></div>
                <span className="list__aside">Provenance</span>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">Lot card — ANP-001 · 1,425 kg · Ramu Naidu</div></div>
                <span className="list__aside">Farmer story</span>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">Proforma Invoice copy — FEED/ANT/PI/2026/042</div></div>
                <span className="list__aside">Rs.685/kg FOB</span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div className="grid grid--stretch">
        {/* Buyer notification */}
        <section className="span-4 card card--tinted tone-indigo buyer">
          <div className="card__head">
            <h2 className="card__title">📧 Hamburg Spice Imports notified</h2>
          </div>
          <div className="kv">
            <div className="kv__row"><span className="kv__key">Email sent</span><span className="kv__val is-tone">19 Nov 06:15 PM IST</span></div>
            <div className="kv__row"><span className="kv__key">Buyer contact</span><span className="kv__val is-tone">procurement@hamburgspice.de</span></div>
            <div className="kv__row"><span className="kv__key">Includes</span><span className="kv__val is-tone">DHL link + dossier + lot card</span></div>
            <div className="kv__row"><span className="kv__key">Response expected</span><span className="kv__val is-tone">By 28 Nov 2026</span></div>
          </div>
        </section>

        {/* Stage 6 gate */}
        <section className="span-4 callout callout--lg tone-gold gate">
          <div className="callout__body">
            <h2 className="callout__title">Stage 6 Retain rest</h2>
            <p className="gate__text">
              Hamburg కొనుగోలుదారు నమూనా ఆమోదాన్ని డిజిటల్‌గా లేదా FCDA ద్వారా నమోదు చేసిన తర్వాత, Stage 6 ముందుకు వెళ్తుంది → <strong>నమూనా</strong> Badge + <strong>+2,000 KC</strong> జమ అవుతాయి → Stage 7 ★ CHA + Shipping Bill ప్రారంభమవుతుంది. ఇది ఎగుమతి ప్రక్రియలో అత్యంత ముఖ్యమైన దశ.
            </p>
          </div>
        </section>

        {/* Badge preview + running coins */}
        <div className="span-4 col reward-col">
          <section className="badge-preview">
            <div className="badge-preview__icon">📦</div>
            <div className="badge-preview__info">
              <h2 className="badge-preview__name">నమూనా Badge — Coming!</h2>
              <p className="badge-preview__sub">Stage 6 — Sample Sent · Hamburg Spice approval</p>
              <span className="badge-preview__coins">🏅 +2,000 KC · Total: 9,100</span>
            </div>
          </section>

          <div className="coins coins--inline coins-strip">
            <span className="coins-strip__label">🏅 Current KRISHI COINS</span>
            <span className="coins-strip__value">7,100 / 12,500</span>
          </div>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">Auto-notification when buyer approves → Stage 7</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/22a">Track Live · DHL.com Track AWB<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
