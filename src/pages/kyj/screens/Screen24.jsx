import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-24.css?inline'

export default function Screen24() {
  return (
    <>
      <title>KYJ_Screen24_Shipping_Bill_ICEGATE</title>
      <PageStyles css={css} />

      {/* Page header + ICEGATE filing */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/23" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>07 Dec 2026 · 4:42 PM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill stage-pill--star">★ 2 of 4</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">Shipping Bill + ICEGATE</h1>
          </div>

          <div className="page-head__visual">
            <div className="icegate">
              <div className="icegate__logo">ICEGATE</div>
              <div className="icegate__info">
                <div className="icegate__name">Shipping Bill filed by Vizag Maritime</div>
                <div className="icegate__sb">SB No: 2026/VIZ/8842156 · CHA: TVPSU-XYZ-2018</div>
              </div>
              <span className="icegate__status">✓ LEO</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* 4-stage Shipping Bill journey */}
        <div className="span-7 block">
          <div className="section-label">Shipping Bill journey · ICEGATE flow</div>
          <section className="card customs">
            <div className="card__head">
              <h2 className="card__title">🚢 4-stage customs flow</h2>
            </div>

            <ol className="timeline flow" role="list">
              <li className="timeline__item is-done">
                <span className="flow__line is-done" aria-hidden="true" />
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">① Shipping Bill filed on ICEGATE</div>
                  <div className="timeline__text">CHA submitted SB 2026/VIZ/8842156 · 12-doc bundle attached · GR + EDPMS auto-filed</div>
                  <div className="timeline__meta">03 Dec 2026 · 02:18 PM IST</div>
                </div>
              </li>

              <li className="timeline__item is-done">
                <span className="flow__line is-done" aria-hidden="true" />
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">② Customs assessment · RMS facilitated</div>
                  <div className="timeline__text">Risk Management System — GREEN channel (PHRT PASS + APEDA TraceNet + Phyto = low risk) · No physical exam</div>
                  <div className="timeline__meta">04 Dec 2026 · 10:42 AM IST</div>
                </div>
              </li>

              <li className="timeline__item is-done">
                <span className="flow__line is-done" aria-hidden="true" />
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">③ LEO (Let Export Order) issued</div>
                  <div className="timeline__text">Customs OK to load · Container can move to vessel · No retention</div>
                  <div className="timeline__meta">04 Dec 2026 · 04:55 PM IST</div>
                </div>
              </li>

              <li className="timeline__item is-now">
                <span className="timeline__dot">⚓</span>
                <div className="timeline__body">
                  <div className="timeline__title">④ Vessel departed Vizag · LIVE</div>
                  <div className="timeline__text">MV Maersk Hamburg · VOY-2643W · Container TLLU-456789-2 stuffed and loaded</div>
                  <div className="timeline__meta">07 Dec 2026 · 03:20 PM IST · just now</div>
                </div>
              </li>
            </ol>
          </section>
        </div>

        <div className="span-5 col">
          {/* LEO confirmation */}
          <section className="card card--outline tone-green leo">
            <div className="card__head">
              <h2 className="card__title">🟢 LEO Issued by Customs · Critical Milestone</h2>
            </div>
            <div className="leo__code">LEO No: VIZ-LEO-2026-8842156<br />Date: 04-Dec-2026 · 16:55 IST<br />Status: CLEARED FOR EXPORT<br />Channel: GREEN (RMS facilitated)</div>
            <p className="leo__detail">✓ ఈ LEO వల్ల ECGC యాక్టివేషన్, నౌకలో సరుకు ఎక్కించేందుకు అనుమతి, చివరికి FIRC అందుకోవడం సాధ్యమవుతుంది.</p>
          </section>

          {/* ECGC activation */}
          <section className="card tone-blue ecgc">
            <div className="ecgc__icon">🛡️</div>
            <div className="ecgc__body">
              <h2 className="ecgc__title">ECGC ప్రతి సరుకు కోసం డిక్లరేషన్ · యాక్టివ్</h2>
              <p className="ecgc__detail">లోడింగ్‌కు 48 గంటల ముందు Anand Singh GM (+91-8373912942)కు సమర్పించబడింది. Whole Turnover Policy జత చేయబడింది. కొనుగోలుదారు చెల్లింపులో డిఫాల్ట్ చేస్తే Rs.9,59,000 FOB విలువపై 85% వరకు కవరేజ్ ఉంటుంది.</p>
              <span className="ecgc__ref">రిఫరెన్స్: ECGC-WTP-FEED-2026-Q4-042</span>
            </div>
          </section>
        </div>
      </div>

      <div className="grid grid--stretch">
        {/* Container stuffing */}
        <section className="span-6 card card--tinted tone-orange stuffing">
          <div className="card__head">
            <h2 className="card__title">📦 Container stuffing · Packhouse supervision</h2>
          </div>
          <div className="kv">
            <div className="kv__row"><span className="kv__key">Container No.</span><span className="kv__val">TLLU-456789-2 (20' Reefer)</span></div>
            <div className="kv__row"><span className="kv__key">Stuffed at</span><span className="kv__val">Gorantla Packhouse · 02 Dec</span></div>
            <div className="kv__row"><span className="kv__key">Cartons loaded</span><span className="kv__val">39 cartons · 980 kg net</span></div>
            <div className="kv__row"><span className="kv__key">Pallets</span><span className="kv__val">Plastic Y2 (no ISPM-15 needed)</span></div>
            <div className="kv__row"><span className="kv__key">Reefer set point</span><span className="kv__val">2°C · humidity 65%</span></div>
            <div className="kv__row"><span className="kv__key">Seal No.</span><span className="kv__val mono">FEED-SEAL-2026-0087</span></div>
          </div>
          <div className="stuffing__photo">📷 Container stuffing photo · Time-stamped · GPS-tagged</div>
        </section>

        {/* Bill of Lading */}
        <section className="span-6 card card--flush tone-accent bl">
          <div className="card__strip">
            <h2 className="card__strip-title">📄 Bill of Lading · Just issued by Maersk</h2>
          </div>
          <div className="card__body">
            <div className="kv-grid bl__grid">
              <div className="kv-cell"><div className="kv-cell__k">BL Number</div><div className="kv-cell__v mono">MAEU-2026-VIZHAM-2643</div></div>
              <div className="kv-cell"><div className="kv-cell__k">Type</div><div className="kv-cell__v">Original BL · Negotiable</div></div>
              <div className="kv-cell"><div className="kv-cell__k">Shipper</div><div className="kv-cell__v">FEED MSCS LTD</div></div>
              <div className="kv-cell"><div className="kv-cell__k">Consignee</div><div className="kv-cell__v">Hamburg Spice Imports GmbH</div></div>
              <div className="kv-cell"><div className="kv-cell__k">Notify Party</div><div className="kv-cell__v">Buyer's clearing agent</div></div>
              <div className="kv-cell"><div className="kv-cell__k">ETA Hamburg</div><div className="kv-cell__v">26 Dec 2026 (19 days transit)</div></div>
            </div>
          </div>
        </section>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text"><strong className="star-note">★ Stage 7 step 3 of 4 · FIRC upload after buyer payment</strong></div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/25">Vessel Sailing · Track to Hamburg<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
