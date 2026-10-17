import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-14.css?inline'

export default function Screen14() {
  return (
    <>
      <title>KYJ_Screen14_NABL_Lab_Booking</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/13a" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>Day 82 of harvest window</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 4 · 1 of 3</span>
          </div>
        </div>
        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">NABL Lab Booking (T-04)</h1>
          </div>
        </div>
      </section>

      {/* Urgency banner */}
      <div className="urgency">
        <span className="urgency__icon">⏰</span>
        <p className="urgency__text">Book lab NOW — sample must be collected 14 days before harvest. మిస్ చేస్తే shipment 21 రోజులు ఆలస్యం అవుతుంది.</p>
      </div>

      <div className="grid">
        {/* PHRT timeline */}
        <div className="span-5 block">
          <div className="section-label tone-teal">PHRT Timeline · వేళాపట్టిక</div>
          <section className="card card--tinted tone-teal phrt">
            <div className="card__head">
              <h2 className="card__title">📅 Chilli S4 — Anantapur Plot ANP-001</h2>
            </div>
            <div className="timeline phrt-timeline">
              <div className="timeline__item">
                <span className="timeline__dot" style={{ background: '#1b5e20' }} />
                <div className="timeline__body"><div className="timeline__title">Last spray on farm</div></div>
                <div className="timeline__aside">18 Oct 2026</div>
              </div>
              <div className="timeline__item">
                <span className="timeline__dot" style={{ background: '#004d40' }} />
                <div className="timeline__body"><div className="timeline__title">PHI cleared (21 days)</div></div>
                <div className="timeline__aside">08 Nov 2026</div>
              </div>
              <div className="timeline__item is-deadline">
                <span className="timeline__dot" style={{ background: '#e65100' }} />
                <div className="timeline__body"><div className="timeline__title">PHRT sample collect BY</div></div>
                <div className="timeline__aside">03 Nov 2026 ←</div>
              </div>
              <div className="timeline__item">
                <span className="timeline__dot" style={{ background: '#004d40' }} />
                <div className="timeline__body"><div className="timeline__title">Expected harvest</div></div>
                <div className="timeline__aside">17 Nov 2026</div>
              </div>
              <div className="timeline__item">
                <span className="timeline__dot" style={{ background: '#ffd54f' }} />
                <div className="timeline__body"><div className="timeline__title">PHRT result expected</div></div>
                <div className="timeline__aside">10–12 Nov 2026</div>
              </div>
            </div>
          </section>
        </div>

        {/* Select lab */}
        <div className="span-7 block">
          <div className="section-label tone-teal">Select NABL Lab · ల్యాబ్ ఎంచుకోండి</div>
          <div className="labs">
            <article className="card card--outline tone-teal lab is-selected">
              <div className="lab__top">
                <h3 className="lab__name">Eurofins Analytical Services — Hyderabad</h3>
                <span className="tag tag--solid">PRIMARY ✓</span>
              </div>
              <p className="lab__detail">ETO + Aflatoxin + 500-panel MRL · NABL: TC-3218 · APEDA recognised</p>
              <div className="tags lab__meta">
                <span className="tag">Chilli ETO panel ✓</span>
                <span className="tag">Aflatoxin B1/B2 ✓</span>
                <span className="tag">7-day turnaround</span>
                <span className="lab__dist">~200km · FCDA ships sample</span>
              </div>
            </article>

            <article className="card tone-teal lab">
              <div className="lab__top">
                <h3 className="lab__name">ANGRAU Tirupati NABL Lab</h3>
                <span className="tag tag--solid tone-neutral">BACKUP</span>
              </div>
              <p className="lab__detail">Basic MRL panel · Limited ETO scope · 10-day turnaround</p>
              <div className="tags lab__meta">
                <span className="tag">General panel only</span>
                <span className="lab__dist">~280km</span>
              </div>
            </article>
          </div>
        </div>

        {/* Test panel breakdown */}
        <section className="span-7 card panel-card">
          <div className="card__head">
            <h2 className="card__title">🔬 Chilli S4 — EU Test Panel (Eurofins)</h2>
          </div>
          <ul className="panel-list" role="list">
            <li className="panel-list__item">
              <span className="panel-list__dot" />
              <span>500+ pesticide residue panel (GC-MS/MS + LC-MS/MS) vs EU MRL Reg 396/2005</span>
            </li>
            <li className="panel-list__item">
              <span className="panel-list__dot" style={{ background: '#b71c1c' }} />
              <span>ETO (Ethylene Oxide) + 2-CE metabolite — EU zero tolerance (heightened control Reg 2019/1793)</span>
            </li>
            <li className="panel-list__item">
              <span className="panel-list__dot" style={{ background: '#e65100' }} />
              <span>Aflatoxin B1+B2+G1+G2 — EU max 5μg/kg (B1 alone &lt;5ppb)</span>
            </li>
            <li className="panel-list__item">
              <span className="panel-list__dot" />
              <span>Acephate + Profenofos check — NOT registered EU (must be zero)</span>
            </li>
          </ul>
        </section>

        {/* Booking details + fee */}
        <section className="span-5 card booking">
          <div className="fields booking__fields">
            <div className="kyj-field field--full">
              <span className="field__label">Lot ID · Consignment Reference</span>
              <div className="field__control">
                <span>FEED-ANT-26-001 · Chilli S4 · 2.5 acres</span>
              </div>
            </div>
            <div className="kyj-field field--full">
              <span className="field__label">Sample collection date</span>
              <div className="field__control is-active">
                <span>03 Nov 2026</span>
                <span className="field__adorn">📅</span>
              </div>
            </div>
          </div>
          <div className="fee tone-teal">
            <span>PHRT test fee (Eurofins)</span>
          </div>
        </section>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">FCDA will coordinate sample collection at farm → Screen 15</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/15">Confirm Lab Booking · ల్యాబ్ బుకింగ్ నిర్ధారించండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
