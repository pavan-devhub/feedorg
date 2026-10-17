import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-3.css?inline'

export default function Screen3() {
  return (
    <>
      <title>KYJ_Screen3_Farmer_Consent_Agreement</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/2" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>9:45 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Step 2 of 4</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">KYJ Consent Agreement</h1>
          </div>
        </div>

        <div className="page-head__foot">
          <div className="progress progress--on-dark"><div className="progress__fill" style={{ width: '25%' }} /></div>
        </div>
      </section>

      <div className="grid">
        {/* Agreement terms */}
        <div className="span-7 col">
          {/* Fee structure */}
          <div className="block">
            <div className="section-label tone-blue">Consultation Fee Structure</div>
            <section className="card card--tinted tone-green fee-card">
              <h2 className="card__title fee-card__title">మీకు ఎంత వస్తుంది?</h2>
              <div className="kv fee-kv">
                <div className="kv__row">
                  <span className="kv__key">ఎగుమతి ద్వారా మీకు వచ్చే మొత్తం</span>
                  <span className="kv__val is-ok">100%</span>
                </div>
                <div className="kv__row">
                  <span className="kv__key">🌶 మిరపకాయలు — FEED సేవా రుసుము</span>
                  <span className="kv__val is-ok">7%</span>
                </div>
                <div className="kv__row">
                  <span className="kv__key">🍌 అరటి — FEED సేవా రుసుము</span>
                  <span className="kv__val is-ok">5%</span>
                </div>
                <div className="kv__row fee-kv__keep">
                  <span className="kv__key">మిరపకాయలలో మీకు మిగిలేది</span>
                  <span className="kv__val is-ok">93%</span>
                </div>
              </div>
              <p className="fee-note">మీరు డబ్బు పొందిన తర్వాత మాత్రమే సేవా రుసుము తీసుకుంటారు. ముందుగా ఎలాంటి రుసుము ఉండదు.</p>
            </section>
          </div>

          {/* Farmer rights */}
          <div className="block">
            <div className="section-label tone-blue">మీ హక్కులు</div>
            <section className="card card--tinted tone-orange rights">
              <ul className="list" role="list">
                <li className="list__item">
                  <span className="list__icon">✋</span>
                  <p className="list__body rights__text">మీరు పండించిన పంట మీద హక్కు ఎప్పుడూ మీదే. FEED మీ పంటను కొనదు.</p>
                </li>
                <li className="list__item">
                  <span className="list__icon">🏦</span>
                  <p className="list__body rights__text">మీకు రావాల్సిన డబ్బు నేరుగా మీ PACS లేదా బ్యాంక్ ఖాతాలోకి వస్తుంది. మీకు 93% అందుతుంది.</p>
                </li>
                <li className="list__item">
                  <span className="list__icon">❌</span>
                  <p className="list__body rights__text">ఫీడ్  మీ దగ్గర నుంచి ముందుగానే ఎలాంటి డబ్బు తీసుకోరు.</p>
                </li>
                <li className="list__item">
                  <span className="list__icon">📄</span>
                  <p className="list__body rights__text">మీరు ఎప్పుడైనా KYJ నుంచి బయటకు రావచ్చు. ఎలాంటి బలవంతం లేదా జరిమానా ఉండదు.</p>
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Account details + signature */}
        <div className="span-5 col col--sticky">
          <section className="card kyj-form-card">
            <div className="fields">
              <div className="kyj-field field--full">
                <span className="field__label">PACS ఖాతా నంబర్ · మీ PACS అకౌంట్ <span className="req">*</span></span>
                <div className="field__control is-filled">
                  <span className="mono">PACS-ANT-2024-0387</span>
                  <span className="field__adorn">✓ ధృవీకరించబడింది</span>
                </div>
                <span className="field__hint">మీకు రావాల్సిన 93% ఎగుమతి ఆదాయం ఈ ఖాతాలో జమ అవుతుంది.</span>
              </div>

              <div className="kyj-field field--full">
                <span className="field__label">సాగు చేస్తున్న భూమి · ఎకరాలు</span>
                <div className="field__control is-active">
                  <span>2.5 ఎకరాలు · మిరపకాయలు (Sannam S4)</span>
                </div>
              </div>
            </div>

            <div className="section-label tone-blue mt-24">కొనసాగించడానికి సంతకం చేయండి</div>
            <button type="button" className="dropzone tone-blue sign-pad">
              <span className="sign-pad__icon">✍️</span>
              <span className="sign-pad__text">ఆధార్ OTP ద్వారా సంతకం చేయడానికి నొక్కండి</span>
              <span className="sign-pad__sub">మీ ఆధార్ నంబర్ ఎక్కడా భద్రపరచబడదు</span>
            </button>

            <Link className="btn btn--primary btn--lg btn--block mt-24 agree-btn" to="/screens/4"><span className="btn__stack"><span>నేను అంగీకరిస్తున్నాను & సంతకం చేస్తున్నాను</span><span className="btn__sub">ఒప్పందం భద్రపరచబడుతుంది · కాపీ WhatsAppకు పంపబడుతుంది</span></span><svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
          </section>
        </div>
      </div>
    </>
  )
}
