import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-s18.css?inline'

export default function ScreenS18() {
  return (
    <>
      <title>KYJ_Screen18_BSM_Scheduler</title>
      <PageStyles css={css} />

      {/* Page header + buyer summary */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/17" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>18 Nov 2026 · 11:00 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 5 · 2 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">BSM Scheduler (EX-05)</h1>
          </div>

          <div className="page-head__visual">
            <div className="buyer-glass">
              <span className="buyer-glass__flag">🇩🇪</span>
              <div className="buyer-glass__info">
                <div className="buyer-glass__name">Hamburg Spice Imports GmbH</div>
                <div className="buyer-glass__meta">Hamburg, Germany · Trust Score 8.7/10</div>
              </div>
              <span className="buyer-glass__status">✓ Cleared</span>
            </div>
          </div>
        </div>
      </section>

      {/* Slots + confirmation */}
      <div className="grid grid--stretch">
        <div className="span-7 block">
          <div className="section-label">Available Meeting Slots · సమావేశ సమయం (IST)</div>
          <section className="card slots-card">
            <div className="slots">
              <div className="slot is-open">
                <div className="slot__date">20 Nov, Thu</div>
                <div className="slot__time">2:30 PM IST · 10:00 AM CET</div>
                <div className="slot__status">Available ✓</div>
              </div>

              <div className="slot is-selected">
                <div className="slot__date">21 Nov, Fri</div>
                <div className="slot__time">3:00 PM IST · 10:30 AM CET</div>
                <div className="slot__status">✓ Selected</div>
              </div>

              <div className="slot is-taken">
                <div className="slot__date">22 Nov, Sat</div>
                <div className="slot__time">11:00 AM IST</div>
                <div className="slot__status">Buyer busy</div>
              </div>

              <div className="slot is-open">
                <div className="slot__date">24 Nov, Mon</div>
                <div className="slot__time">2:00 PM IST · 9:30 AM CET</div>
                <div className="slot__status">Available ✓</div>
              </div>
            </div>
          </section>
        </div>

        <div className="span-5 block confirm-col">
          <section className="card card--tinted tone-green confirm-card">
            <h2 className="card__title confirm-card__title">✅ BSM Confirmed — 21 Nov 2026, 3:00 PM IST</h2>
            <ul className="confirm-rows" role="list">
              <li className="confirm-row"><span className="confirm-row__icon">📹</span><span className="confirm-row__text">Video link: Google Meet · meet.google.com/feed-bsm-anttrap-0042</span></li>
              <li className="confirm-row"><span className="confirm-row__icon">📋</span><span className="confirm-row__text">పంపించిన వివరాలు: PHRT COA · TraceX QR · Price spec sheet</span></li>
              <li className="confirm-row"><span className="confirm-row__icon">🌐</span><span className="confirm-row__text">FCDA సహాయం చేస్తారు: తెలుగు ↔ ఇంగ్లీష్</span></li>
            </ul>
          </section>
        </div>
      </div>

      {/* Proforma invoice + coins + negotiation */}
      <div className="grid">
        <div className="span-7 block">
          <div className="section-label">Proforma Invoice — Auto-generated (EX-05)</div>
          <section className="card card--flush invoice">
            <div className="invoice__head">
              <div className="invoice__no">PI No: FEED/ANT/PI/2026/042</div>
              <span className="invoice__badge">Proforma</span>
            </div>

            <div className="kv invoice__rows">
              <div className="kv__row"><span className="kv__key">Commodity</span><span className="kv__val">Guntur Chilli S4 (Red Dried)</span></div>
              <div className="kv__row"><span className="kv__key">HS Code</span><span className="kv__val mono">0904 21 10</span></div>
              <div className="kv__row"><span className="kv__key">Quantity</span><span className="kv__val">1,400 kg (1.4 MT)</span></div>
              <div className="kv__row"><span className="kv__key">Unit price (indicative)</span><span className="kv__val">Rs.700/kg FOB Vizag</span></div>
              <div className="kv__row"><span className="kv__key">Incoterms</span><span className="kv__val">FOB Visakhapatnam Port</span></div>
              <div className="kv__row"><span className="kv__key">Payment terms</span><span className="kv__val">LC at sight (UCP 600)</span></div>
              <div className="kv__row"><span className="kv__key">Validity</span><span className="kv__val">10 days from BSM date</span></div>
            </div>

            <div className="invoice__total">
              <span className="invoice__total-label">Indicative FOB Value</span>
              <span className="invoice__total-value">Rs.9,80,000 (~€10,780)</span>
            </div>
          </section>
        </div>

        <div className="span-5 col col--sticky">
          {/* Coins note */}
          <div className="coins coins--inline coins-earned">
            <span className="coins__emoji">🏅</span>
            <span className="coins-earned__text">+2,000 KC awarded on BSM confirmation</span>
            <span className="coins-earned__total">Total: 7,100</span>
          </div>

          {/* Negotiation note */}
          <div className="callout tone-blue negotiation">
            <span className="callout__icon">💬</span>
            <p className="callout__body">
              <strong>చర్చల సూచన:</strong> కొనుగోలుదారు డిస్కౌంట్ అడిగితే, విలువను చూపించడానికి TraceX QR పారదర్శకతను వివరించండి — ETO-free ధృవీకరణ పొందిన Guntur Chilli ధర Rs.700/kg FOBగా ప్రీమియం ధరలో ఉంది. కనిష్ట ధర: Rs.620/kg FOB (FEED consultation fee + రైతుకు mandi 3× కనిష్ట ధరలో 93% లక్ష్యాన్ని కవర్ చేస్తుంది).
            </p>
          </div>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">BSM done → MoA signing → Stage 5 badge → +2,000 KC</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/s19">Confirm BSM & Proceed to MoA · Screen 19<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
