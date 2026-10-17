import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-9.css?inline'

export default function Screen9() {
  return (
    <>
      <title>KYJ_Screen9_IEC_Registration</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/8a" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>10:05 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 2 · 1 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">IEC Registration · IEC నమోదు</h1>
          </div>
        </div>

        <div className="page-head__foot">
          <div className="progress progress--on-dark"><div className="progress__fill" style={{ width: '33%' }} /></div>
        </div>
      </section>

      {/* Context banner */}
      <section className="card card--tinted tone-accent intro">
        <div className="intro__main">
          <h2 className="card__title">IEC — దిగుమతి మరియు ఎగుమతి కోడ్</h2>
          <p className="intro__text">DGFT ద్వారా ఇచ్చే 10 అంకెల జీవితకాల కోడ్. ప్రతి ఎగుమతి సరుకుకు IEC తప్పనిసరి. IEC లేకుండా ఎగుమతి చేయడం సాధ్యం కాదు. ప్రభుత్వ రుసుము: రూ.500 మాత్రమే. 1–3 పని రోజుల్లో జారీ అవుతుంది.</p>
        </div>
        <div className="contact">
          <span className="contact__icon">📞</span>
          <span className="contact__text">DGFT విశాఖ · అశ్విని జీ · 0891-2746641 · dgftvizag@nic.in</span>
        </div>
      </section>

      <div className="grid">
        {/* Application status tracker */}
        <div className="span-7 block">
          <div className="section-label">Application Status · స్థితి</div>
          <section className="card card--flush tone-accent tracker">
            <div className="card__strip">
              <h2 className="card__strip-title">IEC Application — Ramu Naidu / FEED MSCS LTD</h2>
              <span className="tag tag--lg tone-orange">IN PROGRESS</span>
            </div>

            <ol className="timeline tracker__steps" role="list">
              <li className="timeline__item is-done">
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">DGFT పోర్టల్ నమోదు</div>
                  <div className="timeline__text">dgft.gov.in · PAN + మొబైల్ OTP ధృవీకరణ పూర్తయింది · ఖాతా సృష్టించబడింది</div>
                </div>
              </li>

              <li className="timeline__item is-done">
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">Form ANF-2A సమర్పించబడింది</div>
                  <div className="timeline__text">సంస్థ రకం: Cooperative (MSCS) · బ్యాంక్ ఖాతా: APGVB లింక్ చేయబడింది · ఎగుమతి రంగాలు: Agri, Spices</div>
                </div>
              </li>

              <li className="timeline__item is-done">
                <span className="timeline__dot">✓</span>
                <div className="timeline__body">
                  <div className="timeline__title">రుసుము చెల్లింపు — రూ.500</div>
                  <div className="timeline__text">Bharatkosh UPI · Reference: BK2026XXXXXX · చెల్లింపు ధృవీకరించబడింది</div>
                </div>
              </li>

              <li className="timeline__item is-active">
                <span className="timeline__dot">→</span>
                <div className="timeline__body">
                  <div className="timeline__title">DGFT వద్ద IEC ధృవీకరణలో ఉంది</div>
                  <div className="timeline__text">Acknowledgment: DGFT/ANT/2026/IEC/0042 · అంచనా సమయం: 1–2 పని రోజులు</div>
                </div>
              </li>

              <li className="timeline__item is-pending">
                <span className="timeline__dot">5</span>
                <div className="timeline__body">
                  <div className="timeline__title">IEC సర్టిఫికేట్ జారీ · ఇక్కడ అప్‌లోడ్ చేయండి</div>
                  <div className="timeline__text">DGFT నుండి డౌన్‌లోడ్ చేయండి → PDF అప్‌లోడ్ చేయండి</div>
                </div>
              </li>
            </ol>
          </section>
        </div>

        <div className="span-5 col col--sticky">
          {/* Documents checklist */}
          <section className="card doc-card">
            <div className="card__head">
              <h2 className="card__title">📋 అవసరమైన పత్రాలు</h2>
            </div>
            <ul className="list doc-list" role="list">
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">PAN card (సంస్థ — FEED MSCS LTD)</div></div>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">Bank certificate / cancelled cheque (APGVB)</div></div>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">Address proof (నమోదిత కార్యాలయం — Gundugolanu)</div></div>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">Aadhaar OTP signature (సంతకం చేసే వ్యక్తి K Raghu Vamsi)</div></div>
              </li>
              <li className="list__item tone-neutral is-pending">
                <span className="list__icon list__icon--sm">○</span>
                <div className="list__body"><div className="list__title">IEC certificate PDF (అందిన తర్వాత అప్‌లోడ్ చేయండి)</div></div>
              </li>
            </ul>
          </section>

          {/* Annual alert */}
          <div className="callout tone-gold annual-alert">
            <span className="callout__icon">⚠️</span>
            <p className="callout__body"><strong>ముఖ్యమైనది:</strong> IEC ను ప్రతి సంవత్సరం ఏప్రిల్ 1 – జూన్ 30 మధ్య అప్‌డేట్ చేయాలి. అప్‌డేట్ చేయకపోతే IEC ఆటోమేటిక్‌గా డీయాక్టివేట్ అవుతుంది మరియు అన్ని ఎగుమతులు ఆగిపోతాయి. FEED ప్లాట్‌ఫారమ్ 60 రోజుల ముందుగానే అలర్ట్ పంపుతుంది.</p>
          </div>
        </div>
      </div>

      {/* Primary action (fee status + CTA) */}
      <div className="action-bar">
        <div className="action-bar__text fee-summary">
          <span>ప్రభుత్వ రుసుము చెల్లించబడింది</span>
          <strong className="fee-summary__val">✓ రూ.500 · Bharatkosh UPI</strong>
        </div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/10">IEC సర్టిఫికేట్ అప్‌లోడ్ చేయండి · IEC అప్‌లోడ్ చేయండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
