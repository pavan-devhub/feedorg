import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-13a.css?inline'

export default function Screen13a() {
  return (
    <>
      <title>KYJ_Screen13a_Stage3_Badge_PackHouse</title>
      <PageStyles css={css} />

      {/* Hero celebration */}
      <section className="page-head page-head--center">
        <div className="hero-stripes" aria-hidden="true" />

        <div className="page-head__top">
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></svg>Stage 3 Complete!</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <div className="medal"><span className="medal__icon">🏭</span></div>
            <h1 className="page-title badge-title">ప్యాక్ హౌస్!</h1>
            <p className="page-sub">Stage 3 — Pack House · Gorantla 38km</p>
            <span className="ribbon ribbon--gold">🏅 +1,500 KRISHI COINS</span>
          </div>
        </div>
      </section>

      {/* KYJ Journey progress */}
      <section className="card">
        <div className="card__head">
          <h2 className="card__title">KYJ Journey · మీ ప్రయాణం</h2>
        </div>
        <div className="stepper journey">
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">Stage 0</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">1</div>
            <div className="stepper__label">Farm ✓</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">2</div>
            <div className="stepper__label">Registered ✓</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-active">3</div>
            <div className="stepper__label">Packhouse ✓</div>
          </div>
          <div className="stepper__line is-future" />
          <div className="stepper__step">
            <div className="stepper__dot is-future">4</div>
            <div className="stepper__label">Quality</div>
          </div>
          <div className="stepper__line is-future" />
          <div className="stepper__step">
            <div className="stepper__dot is-future">★</div>
            <div className="stepper__label">FIRC 💰</div>
          </div>
        </div>
      </section>

      <div className="grid">
        <div className="span-7 col">
          {/* Next stage */}
          <section className="card card--tinted tone-blue next-stage">
            <h2 className="card__title">🔬 Stage 4 — నాణ్యత (Quality Certified) · +1,500 KC</h2>
            <ol className="next-steps" role="list">
              <li>① Book NABL lab for PHRT (pre-harvest residue test)</li>
              <li>② Book 14 days before expected harvest date</li>
              <li>③ PHRT PASS → COA + Phytosanitary issued</li>
            </ol>
          </section>

          {/* WhatsApp notification preview */}
          <section className="wa">
            <div className="wa__head"><span className="dot dot--pulse" />WhatsApp sent</div>
            <div className="wa__thread">
              <div className="wa__bubble">
                🏭 <strong>అభినందనలు Ramu!</strong>
                <br />
                Stage 3 — <strong>ప్యాక్ హౌస్</strong> పూర్తయింది!
                <br />
                Gorantla Packhouse (38km) confirmed ✅
                <br />
                🏅 +1,500 KC | Total: 3,600
                <br />
                తర్వాత: NABL Lab లో PHRT బుక్ చేయండి.
              </div>
            </div>
          </section>
        </div>

        {/* KRISHI COINS running total */}
        <div className="span-5 col col--sticky">
          <section className="coins">
            <div className="coins__head">
              <div className="coins__title">🏅 KRISHI COINS Running Total</div>
            </div>
            <div className="coins__rows">
              <div className="coins__row"><span className="coins__key">Stages 0–2 (EPM + Farm + Registered)</span><span className="coins__val">2,100</span></div>
              <div className="coins__row"><span className="coins__key">Stage 3 — Pack House · Today</span><span className="coins__val">+1,500</span></div>
            </div>
            <div className="coins__total">
              <span>Total Balance</span>
              <span className="coins__value">3,600 🏅</span>
            </div>
            <p className="coins__note">8,900 more coins across Stages 4–8 → Total: 12,500</p>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">Screen 14 → NABL lab selection → PHRT sample submission</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/14">Book NABL Lab — Stage 4 · PHRT బుకింగ్<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
