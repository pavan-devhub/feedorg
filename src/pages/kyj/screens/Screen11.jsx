import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-11.css?inline'

export default function Screen11() {
  return (
    <>
      <title>KYJ_Screen11_FSSAI_Stage2_Gate</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/10" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>11:30 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 2 · 3 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">FSSAI Licence · Stage 2 Gate</h1>
          </div>
        </div>

        <div className="page-head__foot">
          <div className="progress progress--on-dark"><div className="progress__fill" style={{ width: '90%' }} /></div>
        </div>
      </section>

      {/* FSSAI context */}
      <section className="card card--tinted tone-accent intro">
        <div className="intro__main">
          <h2 className="card__title">FSSAI ఫుడ్ బిజినెస్ ఆపరేటర్ లైసెన్స్</h2>
          <p className="intro__text">ఆహార ప్రాసెసింగ్ మరియు ఎగుమతులకు FSSAI లైసెన్స్ తప్పనిసరి. రెండు రకాల లైసెన్స్‌లు ఉన్నాయి — సెంట్రల్ లైసెన్స్ (ఎగుమతి / పెద్ద స్థాయి వ్యాపారం) మరియు స్టేట్ లైసెన్స్ (ప్రాంతీయ వ్యాపారం). FEED MSCS LTD ద్వారా ఎగుమతి చేసే రైతులకు వ్యక్తిగత సెంట్రల్ లైసెన్స్ అవసరం లేదు.</p>
        </div>

        <div className="kv-grid licences">
          <div className="kv-cell licence is-active">
            <div className="kv-cell__k">FEED MSCS LTD</div>
            <div className="kv-cell__v">సెంట్రల్ లైసెన్స్ ✓</div>
          </div>
          <div className="kv-cell licence">
            <div className="kv-cell__k">వ్యక్తిగత FPO</div>
            <div className="kv-cell__v">స్టేట్ లైసెన్స్</div>
          </div>
        </div>
      </section>

      <div className="grid">
        <div className="span-7 col">
          {/* Upload zone */}
          <div className="block">
            <div className="section-label section-label--te">FSSAI లైసెన్స్ సర్టిఫికేట్ అప్‌లోడ్ చేయండి</div>
            <section className="dropzone tone-accent fssai-drop">
              <span className="fssai-drop__icon">📋</span>
              <h2 className="fssai-drop__title">FSSAI సర్టిఫికేట్ PDF అప్‌లోడ్ చేయడానికి ట్యాప్ చేయండి</h2>
              <p className="fssai-drop__sub">Portal: foscos.fssai.gov.in · AP contact: fsap@fssai.gov.in</p>
            </section>
          </div>

          {/* Uploaded confirmation */}
          <section className="card card--tinted tone-green file-card">
            <span className="file-card__icon">📄</span>
            <div className="file-card__info">
              <div className="file-card__name">FSSAI_FEEDMSCS_Central_2026.pdf</div>
              <div className="file-card__meta">Licence No: 10024999009876 · Valid until: Mar 2028</div>
            </div>
            <span className="tag tag--solid tag--lg tone-green">✓ Verified</span>
          </section>
        </div>

        <div className="span-5 col col--sticky">
          {/* The hard gate */}
          <div className="block">
            <div className="section-label section-label--te">స్టేజ్ 2 హార్డ్ గేట్ — ఎగుమతి చేయడానికి ఈ మూడు తప్పనిసరి.</div>
            <section className="card card--flush card--outline tone-accent gate">
              <div className="card__strip gate__strip">
                <h2 className="card__strip-title">🔒 సిస్టమ్ చెక్ — దాటవేయడం లేదా మార్చడం సాధ్యం కాదు</h2>
              </div>

              <ul className="list gate__list" role="list">
                <li className="list__item tone-green">
                  <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                  <div className="list__body"><div className="list__title">IEC — DGFT ద్వారా జారీ చేయబడింది</div></div>
                  <span className="tag tone-green gate__val">GREEN ✓</span>
                </li>
                <li className="list__item tone-green">
                  <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                  <div className="list__body"><div className="list__title">APEDA RCMC — యాక్టివ్</div></div>
                  <span className="tag tone-green gate__val">GREEN ✓</span>
                </li>
                <li className="list__item tone-green">
                  <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                  <div className="list__body"><div className="list__title">FSSAI లైసెన్స్ — ధృవీకరించబడింది</div></div>
                  <span className="tag tone-green gate__val">GREEN ✓</span>
                </li>
              </ul>

              <div className="callout callout--center tone-green gate__result">
                <span className="callout__body">నమోదు Badge · +1,000 KRISHI COINS · Stage 3 packhouse unlocks</span>
              </div>
            </section>
          </div>

          {/* Pending note (hidden in the original too) */}
          <div className="callout tone-gold pending-note" hidden>
            <span className="callout__icon">⚠️</span>
            {" "}
            <span className="callout__body">స్టేజ్ 2 గేట్ కోసం మూడు డాక్యుమెంట్లు ఒకేసారి GREENలో ఉండాలి. కొంతవరకు మాత్రమే క్లియరెన్స్ ఇవ్వడం సాధ్యం కాదు — అడ్మిన్ ద్వారా మార్చడం సాధ్యం కాదు. ప్లాట్‌ఫారమ్ ప్రతి 6 గంటలకు ఆటో-చెక్ చేస్తుంది.</span>
          </div>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">+1,000 KC · Packhouse verification starts next → Screen 12</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/11a">Claim Stage 2 Badge · నమోదు Badge తీసుకోండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
