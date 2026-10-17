import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-2.css?inline'

export default function Screen2() {
  return (
    <>
      <title>KYJ_Screen2_FEED_CARD_Basic_Issued</title>
      <PageStyles css={css} />

      {/* Welcome hero + issued FEED CARD */}
      <section className="page-head welcome-hero">
        <div className="page-head__top">
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>9:43 AM</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <div className="welcome-emoji">🎉</div>
            <h1 className="page-title welcome-title">Welcome to FEED! · స్వాగతం!</h1>
            <p className="page-sub">You are now a FEED MSCS LTD cooperative member</p>
          </div>

          <div className="page-head__visual">
            <article className="member-card welcome-card" aria-label="FEED membership card">
              <div className="member-card__shine" />
              <div className="welcome-card__top">
                <div className="member-card__brand">FEED MSCS LTD · కృషి యేవ జయతే</div>
                <div className="member-card__tier">BASIC MEMBER</div>
              </div>
              <div className="member-card__chip" />
              <div className="member-card__name">Ramu Naidu</div>
              <div className="member-card__number">FEED-ANT-000042</div>
              <div className="member-card__foot">
                <span>🌶 Chilli · Anantapur</span>
                <span className="welcome-card__valid">Valid: 2026–27</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="grid grid--stretch">
        {/* KRISHI COINS balance */}
        <section className="span-5 coins welcome-coins">
          <div className="coins__head">
            <div className="coins__title">🏅 KRISHI COINS Balance</div>
            <div className="coins__value">150</div>
          </div>
          <div className="coins__rows">
            <div className="coins__row"><span className="coins__val">✅ +150</span><span className="coins__key">— EPM Welcome bonus</span></div>
            <div className="coins__row is-muted"><span>○ +500</span><span>— Stage 1 Farm Ready (upcoming)</span></div>
          </div>
          <p className="coins__note">1 coin = Rs.0.10 toward subscription renewal</p>
        </section>

        {/* WhatsApp confirmation */}
        <section className="span-7 wa welcome-wa">
          <div className="wa__head"><span className="dot dot--pulse" />WhatsApp sent to +91 98765 43210</div>
          <div className="wa__thread">
            <div className="wa__bubble">
              🌾 <strong>స్వాగతం Ramu!</strong> మీరు FEED MSCS LTD సభ్యులు అయ్యారు.
              <br />
              మీ FEED కార్డ్: <strong>FEED-ANT-000042</strong>
              <br />
              KRISHI COINS: <strong>150 🏅</strong>
              <br />
              ప్రతి సోమవారం 9 AM మీకు updates వస్తాయి.
            </div>
          </div>
        </section>

        {/* What next */}
        <section className="span-12 card card--tinted tone-purple next-card">
          <div className="card__head">
            <h2 className="card__title">📋 Your next steps · తర్వాత ఏం చేయాలి?</h2>
          </div>
          <ol className="next-list kyj-cols-3" role="list">
            <li className="next-list__item"><span className="num-badge">1</span><span>Sign KYJ Farmer Consent Agreement (Screen 3)</span></li>
            <li className="next-list__item"><span className="num-badge">2</span><span>Complete Export Readiness Score (Screen 4)</span></li>
            <li className="next-list__item"><span className="num-badge">3</span><span>Start 90-day GAP Activity Log (Stage 1)</span></li>
          </ol>
        </section>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/3">Go to My Dashboard · నా Dashboard తెరవండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
