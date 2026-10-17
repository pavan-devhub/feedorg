import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-7.css?inline'

export default function Screen7() {
  return (
    <>
      <title>KYJ_Screen7_EU_MRL_Alert</title>
      <PageStyles css={css} />

      {/* Page header + alert band */}
      <section className="page-head alert-hero">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/6" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>8:14 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="alert-flag">⚠️</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">EU MRL Alert (D-0088)</h1>
            <p className="alert-headline">Pesticide Not Safe for EU Export!</p>
            <p className="page-sub">మీరు ఎంచుకున్న పురుగుమందు EU లో నిషేధించబడింది</p>
          </div>

          <div className="page-head__visual">
            <div className="alert-seal"><span className="alert-seal__icon">🚫</span></div>
          </div>
        </div>
      </section>

      <div className="grid grid--stretch">
        {/* Detected chemical */}
        <section className="span-7 card card--flush tone-red detect-card">
          <div className="card__strip">
            <h2 className="card__strip-title">🔴 RED ZONE chemical detected · అప్రమత్తత</h2>
          </div>
          <div className="card__body">
            <div className="kv detect-kv">
              <div className="kv__row"><span className="kv__key">Chemical entered</span><span className="kv__val is-bad">Chlorpyrifos (Dursban)</span></div>
              <div className="kv__row"><span className="kv__key">Status in EU</span><span className="kv__val is-bad">BANNED (since 2020)</span></div>
              <div className="kv__row"><span className="kv__key">EU MRL (Chilli)</span><span className="kv__val is-bad">0.01 mg/kg (effectively zero)</span></div>
              <div className="kv__row"><span className="kv__key">Your crop</span><span className="kv__val is-bad">Chilli S4 · Plot ANP-001</span></div>
              <div className="kv__row detect-kv__risk"><span className="kv__key">RASFF risk</span><span className="kv__val is-bad">⛔ CONSIGNMENT REJECTION</span></div>
            </div>
            <p className="detect-chain">స్ప్రే చేస్తే → PHRT విఫలమవుతుంది → Stage 4 నిలిచిపోతుంది → FIRC పొందడం సాధ్యం కాదు. శుభ్రమైన ఉత్పత్తితోనే మీ ఆదాయం రక్షించబడుతుంది.</p>
          </div>
        </section>

        {/* Traffic light system */}
        <div className="span-5 block">
          <div className="section-label tone-neutral">FEED Pesticide Traffic Light · వర్గీకరణ</div>
          <div className="lights">
            <article className="light tone-red">
              <span className="light__dot" style={{ background: '#c62828' }} />
              <div className="light__body">
                <h3 className="light__name">🔴 RED — Never use for EU export</h3>
                <p className="light__desc">Chlorpyrifos · Acephate · Profenofos · ETO · Carbofuran · Monocrotophos</p>
              </div>
            </article>
            <article className="light tone-gold">
              <span className="light__dot" style={{ background: '#f9a825' }} />
              <div className="light__body">
                <h3 className="light__name">🟡 YELLOW — Use with strict PHI</h3>
                <p className="light__desc">Cypermethrin (PHI 10+ days) · Lambda-cyhalothrin · Imidacloprid (indoor only)</p>
              </div>
            </article>
            <article className="light tone-green">
              <span className="light__dot" style={{ background: '#2e7d32' }} />
              <div className="light__body">
                <h3 className="light__name">🟢 GREEN — EU + BharatGAP approved</h3>
                <p className="light__desc">Neem Oil · Bacillus thuringiensis · Spinosad · Trichoderma · Beauveria</p>
              </div>
            </article>
          </div>
        </div>

        {/* Substitutes */}
        <section className="span-12 card card--tinted tone-green subs-card">
          <div className="card__head">
            <h2 className="card__title">✅ Recommended substitutes for Chilli pests</h2>
          </div>
          <ul className="kyj-cols-3 subs" role="list">
            <li className="sub-option">
              <span className="sub-option__name">Spinosad (Tracer / Closer)</span>
              <span className="tag tag--solid tone-green">EU APPROVED</span>
            </li>
            <li className="sub-option">
              <span className="sub-option__name">Neem Azadirachtin (Econeem)</span>
              <span className="tag tag--solid tone-green">ORGANIC</span>
            </li>
            <li className="sub-option">
              <span className="sub-option__name">Beauveria bassiana (BioJodi)</span>
              <span className="tag tag--solid tone-green">BIOLOGICAL</span>
            </li>
          </ul>
        </section>
      </div>

      {/* Two actions */}
      <div className="action-bar alert-actions">
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/8">Switch Chemical · మార్చండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          <button type="button" className="btn btn--secondary btn--lg"><svg className="btn__icon btn__icon--lead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>Call FCDA · సహాయం</button>
        </div>
      </div>
    </>
  )
}
