import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-22a.css?inline'

export default function Screen22a() {
  return (
    <>
      <title>KYJ_Screen22a_Stage6_Badge_Namuna</title>
      <PageStyles css={css} />

      {/* Hero celebration */}
      <section className="page-head page-head--center">
        <div className="kyj-hero-glow" aria-hidden="true" />

        <div className="page-head__top">
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>Stage 6 Cleared! · 28 Nov 2026</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <div className="medal"><span className="medal__icon">📦</span></div>
            <h1 className="page-title badge-title">నమూనా!</h1>
            <p className="page-sub">Stage 6 — Sample Sent · Hamburg approved!</p>
            <span className="ribbon ribbon--gold">🏅 +2,000 KRISHI COINS credited</span>
          </div>
        </div>
      </section>

      {/* KYJ Journey progress */}
      <section className="card">
        <div className="card__head">
          <h2 className="card__title">KYJ Journey · 6 of 8 stages complete</h2>
        </div>
        <div className="stepper journey">
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">EPM</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">Farm</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">Reg</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">Pack</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">Quality</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">Buyer</div>
          </div>
          <div className="stepper__line is-current" />
          <div className="stepper__step">
            <div className="stepper__dot is-active">6</div>
            <div className="stepper__label">Sample ✓</div>
          </div>
          <div className="stepper__line is-future" />
          <div className="stepper__step">
            <div className="stepper__dot is-future">★</div>
            <div className="stepper__label">FIRC 💰</div>
          </div>
        </div>
      </section>

      {/* What you achieved */}
      <section className="card card--tinted tone-accent milestones">
        <div className="card__head">
          <h2 className="card__title">📦 Stage 6 Milestones · మీరు సాధించినవి</h2>
        </div>
        <ul className="milestones__grid kyj-cols-3" role="list">
          <li className="milestone"><span className="milestone__icon">✅</span>Harvest delivered to Gorantla — Net 1,425 kg</li>
          <li className="milestone"><span className="milestone__icon">✅</span>Grading complete — Grade A: 980 kg (69%)</li>
          <li className="milestone"><span className="milestone__icon">✅</span>Cold chain log started — 5-min IoT readings</li>
          <li className="milestone"><span className="milestone__icon">✅</span>ETO-free steam treatment complete (EU compliant)</li>
          <li className="milestone"><span className="milestone__icon">✅</span>TraceX QR locked — 6-hop blockchain chain</li>
          <li className="milestone"><span className="milestone__icon">✅</span>39 carton QR stickers printed and sealed</li>
          <li className="milestone"><span className="milestone__icon">✅</span>APEDA TraceNet uploaded (Govt visible)</li>
          <li className="milestone"><span className="milestone__icon">✅</span>2 kg sample delivered Hamburg via DHL</li>
          <li className="milestone is-final"><span className="milestone__icon">✅</span>Hamburg Spice Imports — SAMPLE APPROVED!</li>
        </ul>
      </section>

      <div className="grid">
        <div className="span-7 col">
          {/* What's next — Stage 7 is the big one */}
          <section className="card card--tinted tone-orange next-stage">
            <h2 className="card__title"><span className="star-chip">★</span>Stage 7 — మొదటి ఎగుమతి (First Export) · +1,500 KC</h2>
            <ol className="next-steps" role="list">
              <li>① CHA assigned at Vizag port · 12-doc checklist</li>
              <li>② Shipping Bill filed on ICEGATE · LEO status</li>
              <li>③ Vessel departure · BL issued</li>
              <li>④ Buyer LC payment · FIRC received from AD Bank</li>
            </ol>
          </section>

          {/* WhatsApp celebration */}
          <section className="wa">
            <div className="wa__head"><span className="dot dot--pulse" />WhatsApp Notification Sent</div>
            <div className="wa__thread">
              <div className="wa__bubble">
                📦 <strong>అభినందనలు Ramu!</strong>
                <br />
                Hamburg Spice Imports మీ sample approve చేశారు! ✅
                <br />
                Stage 6 — <strong>నమూనా</strong> పూర్తయింది!
                <br />
                🏅 +2,000 KRISHI COINS · Total: <strong>9,100</strong>
                <br />
                <br />
                Next ★ Stage 7: Shipping Bill → FIRC → 💰
              </div>
            </div>
          </section>
        </div>

        {/* Running coins */}
        <div className="span-5 col col--sticky">
          <section className="coins">
            <div className="coins__head">
              <div className="coins__title">🏅 KRISHI COINS Running Total</div>
            </div>
            <div className="coins__rows">
              <div className="coins__row"><span className="coins__key">Stages 0–5</span><span className="coins__val">7,100</span></div>
              <div className="coins__row"><span className="coins__key">Stage 6 — Today</span><span className="coins__val">+2,000</span></div>
            </div>
            <div className="coins__total">
              <span>Total Balance</span>
              <span className="coins__value">9,100 🏅</span>
            </div>
            <p className="coins__note">3,400 more to reach 12,500 cap at Stage 8</p>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">Screen 23 → Vizag port · CHA assignment · 12-doc checklist</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/23">Start Stage 7 ★ — CHA + Shipping Bill<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
