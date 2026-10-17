import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-16.css?inline'

export default function Screen16() {
  return (
    <>
      <title>KYJ_Screen16_COA_Phytosanitary_Stage4_Badge</title>
      <PageStyles css={css} />

      {/* Header + Stage 4 badge preview */}
      <section className="page-head page-head--center">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/15" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>12 Nov 2026 · 9:15 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 4 · 3 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title doc-title">COA & Phytosanitary (EX-06, EX-07)</h1>
            <div className="medal medal--soon"><span className="medal__icon">🔬</span></div>
            <p className="page-title badge-title">నాణ్యత Badge — Coming!</p>
            <p className="page-sub">Stage 4 — Quality Certified</p>
            <span className="ribbon ribbon--gold">🏅 +1,500 KC · Total: 5,100</span>
          </div>
        </div>
      </section>

      <div className="grid">
        <div className="span-7 col">
          {/* Two document uploads side by side */}
          <div className="block">
            <div className="section-label tone-cyan">Upload 2 documents to complete Stage 4</div>
            <div className="cols-2 docs">
              {/* COA card */}
              <article className="card card--flush tone-green doc">
                <div className="card__strip">
                  <h2 className="card__strip-title">📄 COA (NABL)</h2>
                </div>
                <div className="doc__body">
                  <ul className="doc__checks" role="list">
                    <li><span className="doc__check">✓</span>PHRT PASS confirmed</li>
                    <li><span className="doc__check">✓</span>Eurofins TC-3218</li>
                    <li><span className="doc__check">✓</span>All MRLs within limit</li>
                    <li><span className="doc__check">✓</span>ETO: Non-detect</li>
                  </ul>
                  <div className="dropzone tone-green doc__upload is-done">✅ COA-EF-2026-8821.pdf uploaded</div>
                </div>
              </article>

              {/* Phytosanitary card */}
              <article className="card card--flush tone-cyan doc">
                <div className="card__strip">
                  <h2 className="card__strip-title">🌿 Phytosanitary</h2>
                </div>
                <div className="doc__body">
                  <ul className="doc__checks" role="list">
                    <li><span className="doc__check">✓</span>DPPQS inspection: 15 Nov</li>
                    <li><span className="doc__check">✓</span>SPQO Anantapur</li>
                    <li><span className="doc__check">✓</span>ETO-free declaration</li>
                    <li className="is-pending"><span className="doc__check">○</span>Certificate: pending</li>
                  </ul>
                  <div className="dropzone tone-cyan doc__upload">📤 Upload after DPPQS visit</div>
                </div>
              </article>
            </div>
          </div>

          {/* Phytosanitary SOP note */}
          <div className="callout tone-cyan sop">
            <span className="callout__icon">🌿</span>
            <div className="callout__body">
              <strong>ఫైటోశానిటరీ సర్టిఫికేట్ — SOP (EX-06):</strong> అంచనా stuffing తేదీకి 5 రోజుల ముందు అనంతపురం State Plant Quarantine Officer (SPQO)కి దరఖాస్తు చేయాలి. DPPQS ఇన్‌స్పెక్టర్ packhouse‌ను తనిఖీ చేస్తారు. Chilli కోసం ETO-free treatment declaration తప్పనిసరి. తనిఖీ పూర్తైన తర్వాత సర్టిఫికేట్ జారీ అవుతుంది. దీనిని Shipping Bill ICEGATEకి జత చేయాలి. అంచనా ప్రభుత్వ ఫీజు: రూ.500–1,500.
            </div>
          </div>
        </div>

        <div className="span-5 col col--sticky">
          {/* Stage 4 completion gate */}
          <section className="card card--outline tone-cyan gate">
            <h2 className="gate__title">🔬 Stage 4 — Export Ready Gate</h2>
            <div className="list">
              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">PHRT Result — PASS (Eurofins)</div></div>
                <span className="list__aside">RETAIN ✓</span>
              </div>
              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">COA uploaded (EX-07)</div></div>
                <span className="list__aside">RETAIN ✓</span>
              </div>
              <div className="list__item is-pending">
                <span className="list__icon list__icon--sm list__icon--solid">○</span>
                <div className="list__body"><div className="list__title">Phytosanitary Certificate (EX-06)</div></div>
                <span className="list__aside">PENDING</span>
              </div>
            </div>
          </section>

          {/* Running coins preview */}
          <section className="coins coins--total">
            <div className="coins__head">
              <div className="coins__title">🏅 Coins after Stage 4 badge</div>
              <div className="coins__value">5,100</div>
            </div>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar action-bar--solo">
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/17">Upload Phytosanitary · ఫైటోశానిటరీ అప్‌లోడ్<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
