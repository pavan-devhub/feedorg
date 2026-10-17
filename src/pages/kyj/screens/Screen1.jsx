import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-1.css?inline'

export default function Screen1() {
  return (
    <>
      <title>KYJ_Screen1_EPM_QR_Landing</title>
      <PageStyles css={css} />

      {/* Header + welcome band */}
      <section className="page-head">
        <div className="page-head__top">
          <span className="brand-pill">FEED</span>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>9:42 AM</span>
          </div>
        </div>
        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">Export Promotional Meeting</h1>
            <div className="welcome">
              <p className="welcome__top">Welcome to FEED MSCS LTD · స్వాగతం!</p>
              <p className="welcome__sub">Anantapur District EPM · Register to start your export journey</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* DPDP consent */}
        <div className="span-5 col col--sticky">
          <div className="block">
            <div className="section-label tone-orange">Step 0 — Consent (DPDP Act 2023)</div>
            <section className="card card--tinted tone-blue consent">
              <h2 className="card__title">Your data is protected · మీ డేటా సురక్షితం</h2>
              <div className="checks mt-16">
                <div className="check"><span className="check__dot" /><span>Aadhaar number is NEVER stored — only a secure hash</span></div>
                <div className="check"><span className="check__dot" /><span>WhatsApp notifications (opt-in)</span></div>
                <div className="check"><span className="check__dot" /><span>FEED WORLD newsletter (opt-in)</span></div>
              </div>
              <div className="consent-check">
                <span className="consent-check__box">✓</span>
                <span>I agree · నేను అంగీకరిస్తున్నాను</span>
              </div>
            </section>
          </div>

          {/* KRISHI COINS preview */}
          <div className="coins coins--inline">
            <span className="coins__emoji">🏅</span>
            <span>You will receive <strong>+150 KRISHI COINS</strong> on registration</span>
          </div>
        </div>

        {/* Registration form */}
        <section className="span-7 card kyj-form-card">
          <div className="divider-label">─── Registration Details ───</div>

          <div className="fields mt-24">
            <div className="kyj-field">
              <span className="field__label">Full Name · పూర్తి పేరు</span>
              <div className="field__control is-active">
                <span>Ramu Naidu</span>
                <span className="field__adorn">✓</span>
              </div>
            </div>

            <div className="kyj-field">
              <span className="field__label">Mobile Number · మొబైల్ నంబర్</span>
              <div className="field__control is-filled">
                <span>+91 98765 43210</span>
                <span className="field__adorn">OTP sent →</span>
              </div>
            </div>

            <div className="kyj-field field--full">
              <span className="field__label">Village · గ్రామం</span>
              <div className="field__control is-active">
                <span>Kalyandurgam</span>
              </div>
            </div>

            <div className="kyj-field field--full">
              <span className="field__label">Primary Crop · మీ పంట ఏమిటి?</span>
              <div className="chips">
                <span className="chip is-selected">🌶 Chilli</span>
                <span className="chip">🍌 Banana</span>
                <span className="chip">🥜 Groundnut</span>
                <span className="chip">+ Other</span>
              </div>
            </div>
          </div>

          <Link className="btn btn--primary btn--lg btn--block mt-24" to="/screens/2">Register · నమోదు చేయండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>

          <p className="note note--center mt-16">⚡ Works offline — data syncs when connected</p>
        </section>
      </div>
    </>
  )
}
