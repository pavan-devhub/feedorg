import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-10.css?inline'

export default function Screen10() {
  return (
    <>
      <title>KYJ_Screen10_APEDA_RCMC</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/9" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>10:18 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 2 · 2 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">APEDA RCMC · నమోదు ధృవీకరణ</h1>
          </div>
        </div>

        <div className="page-head__foot">
          <div className="progress progress--on-dark"><div className="progress__fill" style={{ width: '66%' }} /></div>
        </div>
      </section>

      {/* Context card */}
      <section className="card card--tinted tone-accent intro">
        <p className="intro__text">APEDA షెడ్యూల్‌లో ఉన్న వ్యవసాయ మరియు ప్రాసెస్డ్ ఫుడ్ ఉత్పత్తులను ఎగుమతి చేసే వారికి అవసరమైన ముఖ్యమైన నమోదు. APEDA సేవలు, వర్తించే ఎగుమతి ప్రోత్సాహక పథకాలు మరియు ట్రేడ్ ఫెయిర్ కార్యక్రమాల్లో పాల్గొనే అవకాశాలను పొందేందుకు ఇది ఉపయోగపడుతుంది. అలాగే, గుర్తింపు పొందిన Packhouse దరఖాస్తులు మరియు వర్తించే సందర్భాల్లో TraceNet ఆధారిత ఆర్గానిక్ ఎగుమతి ట్రేసబిలిటీ ప్రక్రియలకు ఇది సంబంధితంగా ఉంటుంది.</p>

        <div className="kv-grid intro__facts">
          <div className="kv-cell intro__fact--wide">
            <div className="kv-cell__k">దరఖాస్తు విధానం:</div>
            <div className="kv-cell__v">IEC పొందిన తరువాత 17 జూలై 2023 నుండి DGFT e-RCMC పోర్టల్ ద్వారా ఆన్‌లైన్‌లో దరఖాస్తు చేయవచ్చు.</div>
          </div>
          <div className="kv-cell">
            <div className="kv-cell__k">ఫీజు:</div>
            <div className="kv-cell__v">₹5,000 + 18% GST = ₹5,900</div>
          </div>
          <div className="kv-cell">
            <div className="kv-cell__k">చెల్లుబాటు:</div>
            <div className="kv-cell__v">5 సంవత్సరాలు</div>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* Status tracker */}
        <div className="span-7 block">
          <div className="section-label">Application Status · దరఖాస్తు స్థితి</div>
          <section className="card card--flush tone-accent tracker">
            <div className="card__strip">
              <h2 className="card__strip-title">RCMC — FEED MSCS LTD · Agri Commodities</h2>
              <span className="tag tag--lg tone-orange">APPLIED</span>
            </div>

            <ol className="timeline tracker__steps" role="list">
              <li className="timeline__item is-done">
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">DGFT portal application submitted</div>
                  <div className="timeline__text">dgft.gov.in → APEDA RCMC form · IEC linked · HS codes: 0904 Chilli, 0803 Banana</div>
                </div>
              </li>

              <li className="timeline__item is-done">
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">Documents uploaded</div>
                  <div className="timeline__text">IEC copy · FSSAI licence · Audited accounts FY2025–26 · Bank certificate · Export performance statement</div>
                </div>
              </li>

              <li className="timeline__item is-done">
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">Rs.5,900 fee paid</div>
                  <div className="timeline__text">DGFT portal payment · Reference: RCMC2026APEDA0087</div>
                </div>
              </li>

              <li className="timeline__item is-active">
                <span className="timeline__dot">→</span>
                <div className="timeline__body">
                  <div className="timeline__title">APEDA Vizag verification in progress</div>
                  <div className="timeline__text">ETA: 12–18 working days · Contact Shri RP Naidu if delayed beyond Day 20</div>
                </div>
              </li>

              <li className="timeline__item is-pending">
                <span className="timeline__dot">5</span>
                <div className="timeline__body">
                  <div className="timeline__title">RCMC certificate issued · Upload here</div>
                  <div className="timeline__text">Download from DGFT → Upload</div>
                </div>
              </li>
            </ol>
          </section>
        </div>

        <div className="span-5 col col--sticky">
          {/* What RCMC unlocks */}
          <div className="block">
            <div className="section-label">What RCMC unlocks for you</div>
            <div className="benefits cols-2">
              <article className="benefit">
                <span className="benefit__icon">📋</span>
                <h3 className="benefit__title">APEDA పథకాలు & సేవలు</h3>
                <p className="benefit__val">వర్తించే ఎగుమతి ప్రోత్సాహక ప్రయోజనాలు</p>
              </article>

              <article className="benefit">
                <span className="benefit__icon">🔗</span>
                <h3 className="benefit__title">ట్రేస్‌నెట్</h3>
                <p className="benefit__val">అర్హత ఉన్న ఆర్గానిక్ ఎగుమతులకు</p>
              </article>

              <article className="benefit">
                <span className="benefit__icon">🏭</span>
                <h3 className="benefit__title">ప్యాక్‌హౌస్ గుర్తింపు</h3>
                <p className="benefit__val">APEDA గుర్తింపు కోసం దరఖాస్తు చేసుకోవచ్చు</p>
              </article>

              <article className="benefit">
                <span className="benefit__icon">✈️</span>
                <h3 className="benefit__title">వాణిజ్య ప్రదర్శనలు</h3>
                <p className="benefit__val">వర్తించే APEDA కార్యక్రమాల్లో పాల్గొనే అవకాశం</p>
              </article>
            </div>
          </div>

          {/* DGFT note */}
          <div className="callout tone-accent dgft-note">
            <span className="callout__icon">⚡</span>
            <span className="callout__body">APEDA RCMC now issued via DGFT portal only (since July 17, 2023)</span>
          </div>
        </div>
      </div>

      {/* Primary action (fee status + CTA) */}
      <div className="action-bar">
        <div className="action-bar__text fee-summary">
          <span>APEDA RCMC fee</span>
          <strong className="fee-summary__val">Rs.5,900 paid · DGFT portal</strong>
        </div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/11">Upload RCMC Certificate · RCMC అప్‌లోడ్<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
