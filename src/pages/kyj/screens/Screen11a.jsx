import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-11a.css?inline'

export default function Screen11a() {
  return (
    <>
      <title>KYJ_Screen11a_Stage2_Badge_Namodu</title>
      <PageStyles css={css} />

      {/* Hero celebration */}
      <section className="page-head page-head--center">
        <div className="badge-bg" aria-hidden="true" />

        <div className="page-head__top">
          <div className="page-head__meta">
            <span className="meta-chip meta-chip--cleared">Stage 2 Cleared!</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <div className="medal"><span className="medal__icon">📋</span></div>
            <h1 className="page-title badge-title">నమోదు!</h1>
            <p className="page-sub">Stage 2 — Registered</p>
            <span className="ribbon ribbon--gold">🏅 +1,000 KRISHI COINS credited</span>
          </div>
        </div>
      </section>

      {/* Journey tracker */}
      <section className="card">
        <div className="card__head">
          <h2 className="card__title">KYJ Journey Progress · మీ ప్రయాణం</h2>
        </div>
        <div className="stepper journey">
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">Stage 0</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">1</div>
            <div className="stepper__label">Farm Ready ✓</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-active">2</div>
            <div className="stepper__label">Registered ✓</div>
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
        <div className="span-7 col">
          {/* What's now open */}
          <section className="card card--tinted tone-green unlocks">
            <h2 className="card__title">🔓 What Stage 2 unlocks</h2>
            <ul className="next-steps" role="list">
              <li>✅ Packhouse Locator (TC-6 check) — Screen 12</li>
              <li>✅ Packing & Labelling spec (BULLKART label) — Screen 13</li>
              <li>✅ NABL lab PHRT booking — Stage 4 start</li>
            </ul>
          </section>

          {/* WhatsApp */}
          <section className="wa">
            <div className="wa__head"><span className="dot dot--pulse" />WhatsApp sent now</div>
            <div className="wa__thread">
              <div className="wa__bubble">
                📋 <strong>అభినందనలు Ramu!</strong>
                <br />
                Stage 2 — <strong>నమోదు</strong> పూర్తయింది! ✅
                <br />
                IEC ✓ + RCMC ✓ + FSSAI ✓
                <br />
                🏅 +1,000 KC | Total: 2,100
                <br />
                తర్వాత: Packhouse చూడండి → మీ FCDA రవి మీకు సహాయం చేస్తారు.
              </div>
            </div>
          </section>
        </div>

        {/* Coins so far */}
        <div className="span-5 col col--sticky">
          <section className="coins">
            <div className="coins__head">
              <div className="coins__title">🏅 Running KRISHI COINS Total</div>
            </div>
            <div className="coins__rows">
              <div className="coins__row"><span className="coins__key">EPM + Stage 1 (GAP + badge)</span><span className="coins__val">1,100</span></div>
              <div className="coins__row"><span className="coins__key">Stage 2 badge — today</span><span className="coins__val">+1,000</span></div>
            </div>
            <div className="coins__total">
              <span>Total Balance</span>
              <span className="coins__value">2,100 🏅</span>
            </div>
            <p className="coins__note">10,400 more coins across Stages 3–8 → Total target: 12,500</p>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">Locate APEDA packhouse within 50km → Screen 12</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/12">Go to Stage 3 — Packhouse · ప్యాక్ హౌస్<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
