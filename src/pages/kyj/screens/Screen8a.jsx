import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-8a.css?inline'

export default function Screen8a() {
  return (
    <>
      <title>KYJ_Screen8a_Stage1_Badge_Polam_Siddham</title>
      <PageStyles css={css} />

      {/* Hero celebration */}
      <section className="page-head page-head--center">
        <div className="confetti" aria-hidden="true">🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾🌾</div>

        <div className="page-head__top">
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>Day 90 · 6:00 AM</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <div className="medal"><span className="medal__icon">🌾</span></div>
            <h1 className="page-title badge-title">పొలం సిద్ధం!</h1>
            <p className="page-sub">Stage 1 — Farm Ready · Badge Earned!</p>
            <span className="ribbon ribbon--gold">🏅 +500 KRISHI COINS credited instantly</span>
          </div>
        </div>
      </section>

      {/* KYJ Journey progress */}
      <section className="card">
        <div className="card__head">
          <h2 className="card__title">Your KYJ Journey · మీ ప్రయాణం</h2>
        </div>
        <div className="stepper journey">
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">Stage 0 EPM</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-active">1</div>
            <div className="stepper__label">Farm Ready ✓</div>
          </div>
          <div className="stepper__line is-future" />
          <div className="stepper__step">
            <div className="stepper__dot is-future">2</div>
            <div className="stepper__label">Registered</div>
          </div>
          <div className="stepper__line is-future" />
          <div className="stepper__step">
            <div className="stepper__dot is-future">3</div>
            <div className="stepper__label">Packhouse</div>
          </div>
          <div className="stepper__line is-future" />
          <div className="stepper__step">
            <div className="stepper__dot is-future">★</div>
            <div className="stepper__label">FIRC 💰</div>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* WhatsApp notification preview */}
        <div className="span-7 col">
          <section className="wa">
            <div className="wa__head"><span className="dot dot--pulse" />WhatsApp sent to you just now</div>
            <div className="wa__thread">
              <div className="wa__bubble">
                🎉 <strong>అభినందనలు Ramu!</strong>
                <br />
                మీరు KYJ Stage 1 చేరారు! 🌾
                <br />
                <strong>పొలం సిద్ధం Badge</strong> మీది!
                <br />
                🏅 +500 KRISHI COINS | Total: 1,100
                <br />
                తర్వాత: IEC + APEDA RCMC + FSSAI తీసుకోండి
                <br />
                మీ FCDA రావి మీకు సహాయం చేస్తారు.
              </div>
            </div>
          </section>

          {/* What's next */}
          <section className="card card--tinted tone-blue next-stage">
            <h2 className="card__title">🚀 Stage 2 — నమోదు (Registered) · +1,000 KC</h2>
            <ol className="next-steps" role="list">
              <li>① Get IEC from DGFT Vizag · FCDA facilitates</li>
              <li>② Apply APEDA RCMC (Shri RP Naidu 0891-2536940)</li>
              <li>③ Upload FSSAI Central licence</li>
            </ol>
          </section>
        </div>

        {/* KRISHI COINS summary so far */}
        <div className="span-5 col col--sticky">
          <section className="coins">
            <div className="coins__head">
              <div className="coins__title">🏅 Your KRISHI COINS so far</div>
            </div>
            <div className="coins__rows">
              <div className="coins__row"><span className="coins__key">EPM Welcome</span><span className="coins__val">+150</span></div>
              <div className="coins__row"><span className="coins__key">GAP Log — 90 days × 5</span><span className="coins__val">+450</span></div>
              <div className="coins__row"><span className="coins__key">Stage 1 Badge — Today</span><span className="coins__val">+500</span></div>
            </div>
            <div className="coins__total">
              <span>Total Balance</span>
              <span className="coins__value">1,100 🏅</span>
            </div>
            <p className="coins__note">1,100 coins = Rs.110 toward your Gold plan renewal · 11,400 more to Stage 8</p>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">IEC Registration → Screen 9</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/9">Start Stage 2 · స్టేజ్ 2 మొదలుపెట్టండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
