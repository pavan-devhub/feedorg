import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-27.css?inline'

export default function Screen27() {
  return (
    <>
      <title>KYJ_Screen27_KYJ1_Platinum_Certification</title>
      <PageStyles css={css} />

      {/* Certification ceremony hero */}
      <section className="page-head page-head--center cert-hero">
        <span className="cert-hero__glint" aria-hidden="true" />
        <span className="cert-hero__shimmer" aria-hidden="true" />

        <div className="page-head__top">
          <Link className="back-btn" to="/screens/25" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>15 Mar 2027 · 11:30 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill stage-pill--gold">★ Stage 8</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title ceremony-title"><span className="ceremony-title__crown" aria-hidden="true">👑</span>KYJ-1 Certification · PLATINUM</h1>
            <div className="medal medal--platinum"><span className="medal__icon">👑</span></div>
            <p className="cert-hero__title">KYJ-1 సర్టిఫైడ్!</p>
            <p className="page-sub cert-hero__sub">Stage 8 · Certified · The journey is complete · You are now a PLATINUM member of FEED MSCS LTD</p>
            <span className="ribbon ribbon--gold">★ +2,500 KC awarded · Final stage</span>
          </div>
        </div>
      </section>

      {/* 8-stage journey complete */}
      <section className="card journey-card">
        <div className="card__head">
          <h2 className="card__title">🏁 8-Stage Journey · 100% Complete</h2>
          <span className="tag tag--solid tag--lg tone-green">ALL 8 ✓</span>
        </div>
        <div className="stepper journey">
          <div className="stepper__step">
            <div className="stepper__dot is-done">✓</div>
            <div className="stepper__label">EPM</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">1</div>
            <div className="stepper__label">Farm</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">2</div>
            <div className="stepper__label">Reg</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">3</div>
            <div className="stepper__label">Pack</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">4</div>
            <div className="stepper__label">Quality</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">5</div>
            <div className="stepper__label">Buyer</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">6</div>
            <div className="stepper__label">Sample</div>
          </div>
          <div className="stepper__line" />
          <div className="stepper__step">
            <div className="stepper__dot is-done">7</div>
            <div className="stepper__label">FIRC ★</div>
          </div>
          <div className="stepper__line stepper__line--final" />
          <div className="stepper__step stepper__step--final">
            <div className="stepper__dot is-special is-platinum">👑</div>
            <div className="stepper__label">KYJ-1 ✓</div>
          </div>
        </div>
      </section>

      {/* Credential + PLATINUM card */}
      <div className="grid grid--stretch">
        {/* KYJ-1 Credential */}
        <div className="span-7 block">
          <div className="section-label">Your Official Credential</div>
          <article className="certificate">
            <span className="certificate__corner certificate__corner--tl" aria-hidden="true" />
            <span className="certificate__corner certificate__corner--tr" aria-hidden="true" />
            <span className="certificate__corner certificate__corner--bl" aria-hidden="true" />
            <span className="certificate__corner certificate__corner--br" aria-hidden="true" />

            <div className="certificate__label">FEED MSCS LTD · MSCS/CR/1295/2020</div>
            <h2 className="certificate__title">KYJ-1 CERTIFIED</h2>
            <p className="certificate__subtitle">Krushi Yeva Jayate · Export Cooperative Member</p>
            <div className="certificate__name">Ramu Naidu</div>
            <div className="certificate__id">FEED-ANT-000042 · PLATINUM</div>
            <p className="certificate__quote">"Having completed 3 successful international exports across 14 months with sustained FILR 14.3:1 protection, this farmer is hereby certified as a KYJ Export Cooperative member with full PLATINUM benefits."</p>
            <div className="certificate__issued">
              <span>Issued: 15 Mar 2027</span>
              <div className="certificate__stamp" aria-hidden="true">🌾</div>
              <span>Anantapur · DSMS Zone-4</span>
            </div>
          </article>
        </div>

        {/* PLATINUM CARD */}
        <div className="span-5 block">
          <div className="section-label">FEED CARD → PLATINUM upgrade</div>
          <div className="card-stage">
            <div className="member-card member-card--platinum">
              <span className="member-card__glow" aria-hidden="true" />
              <span className="member-card__shine" aria-hidden="true" />
              <div className="member-card__brand">FEED MSCS LTD · కృషి యేవ జయతే</div>
              <span className="member-card__chip" aria-hidden="true" />
              <div className="member-card__tier">👑 PLATINUM MEMBER</div>
              <div className="member-card__name">Ramu Naidu</div>
              <div className="member-card__number">FEED-ANT-000042</div>
              <div className="member-card__foot">
                <span>🌶 Chilli · 3 exports</span>
                <span>Issued: 15 Mar 2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chairman recognition + track record */}
      <div className="grid grid--stretch">
        <div className="span-6 block">
          <div className="section-label tone-gold">చైర్మన్ నుండి ప్రత్యేక అభినందనలు</div>
          <section className="card chairman">
            <h2 className="card__title">🎖 Presented at District Cooperative Event</h2>
            <div className="chairman__person">
              <div className="chairman__avatar">KR</div>
              <div className="chairman__info">
                <div className="chairman__name">K Raghu Vamsi</div>
                <div className="chairman__role">Chairman & Founder · FEED MSCS LTD</div>
              </div>
            </div>
            <blockquote className="chairman__quote">"రాము గారూ, అనంతపూర్ జిల్లాలో మా తొలి PLATINUM రైతుగా మీరు నిలిచారు. హాంబర్గ్‌కు మీరు విజయవంతంగా చేసిన 3 ఎగుమతులు, కృషి యేవ జయతే అనేది కేవలం మా నినాదం మాత్రమే కాదు — అది ఇప్పుడు మీ విజయంగా మారిందని చూపిస్తున్నాయి. PLATINUM కుటుంబంలోకి మీకు హృదయపూర్వక స్వాగతం."</blockquote>
            <div className="chairman__sig">
              <span>K Raghu Vamsi · 15 Mar 2027</span>
              <span className="chairman__signature">K. Raghu Vamsi</span>
            </div>
          </section>
        </div>

        <div className="span-6 block">
          <div className="section-label">Your 14-month track record</div>
          <section className="card track">
            <h2 className="card__title">📊 Multi-FIRC export performance</h2>
            <div className="stats track__stats">
              <div className="stat stat--center tone-slate">
                <div className="stat__value">3</div>
                <div className="stat__unit">exports</div>
                <div className="stat__label">FIRC count</div>
              </div>
              <div className="stat stat--center tone-slate">
                <div className="stat__value">4.2 MT</div>
                <div className="stat__unit">Grade A</div>
                <div className="stat__label">cumulative shipped</div>
              </div>
              <div className="stat stat--center tone-slate">
                <div className="stat__value">14.3:1</div>
                <div className="stat__unit">FILR</div>
                <div className="stat__label">protection ratio</div>
              </div>
              <div className="stat stat--center tone-slate">
                <div className="stat__value">€32K</div>
                <div className="stat__unit">FOB earned</div>
                <div className="stat__label">Hamburg total</div>
              </div>
              <div className="stat stat--center tone-slate">
                <div className="stat__value">3</div>
                <div className="stat__unit">PHRT PASS</div>
                <div className="stat__label">zero rejection</div>
              </div>
              <div className="stat stat--center tone-slate">
                <div className="stat__value">A</div>
                <div className="stat__unit">CCS Band</div>
                <div className="stat__label">FEED-AAA next</div>
              </div>
            </div>
            <p className="track__summary">Cumulative farmer take-home <strong className="track__amount">Rs.28,87,212</strong> · 5.7× mandi-equivalent · RoDTEP+Drawback Rs.42,278</p>
          </section>
        </div>
      </div>

      {/* Benefits + coins | WhatsApp */}
      <div className="grid grid--stretch">
        <div className="span-6 col">
          {/* PLATINUM benefits unlocked */}
          <div className="block">
            <div className="section-label">PLATINUM BENEFITS NOW ACTIVE</div>
            <section className="card card--flush tone-slate benefits">
              <div className="card__strip">
                <h2 className="card__strip-title">🎁 cooperative member rights</h2>
              </div>
              <div className="list">
                <div className="list__item">
                  <span className="list__icon" style={{ background: '#E1F5FE', color: '#01579B' }}>📜</span>
                  <div className="list__body">
                    <div className="list__title">CERT-2 KACC issued</div>
                    <div className="list__meta">KYJ Awareness Certificate · valid lifetime · framed</div>
                  </div>
                  <span className="list__aside tag tone-green">ACTIVE</span>
                </div>
                <div className="list__item">
                  <span className="list__icon" style={{ background: '#FFF3E0', color: '#BF360C' }}>🎤</span>
                  <div className="list__body">
                    <div className="list__title">Mentor speaker · Next EPM batch</div>
                    <div className="list__meta">Invited to speak at Anantapur EPM-7 (May 2027) · Telugu</div>
                  </div>
                  <span className="list__aside tag tone-green">INVITED</span>
                </div>
                <div className="list__item">
                  <span className="list__icon" style={{ background: '#E8F5E9', color: '#1B5E20' }}>🏛</span>
                  <div className="list__body">
                    <div className="list__title">DSMS board nomination eligible</div>
                    <div className="list__meta">District SAFE Mission Coop · Zone-4 · State Co-op Act</div>
                  </div>
                  <span className="list__aside tag tone-green">ELIGIBLE</span>
                </div>
                <div className="list__item">
                  <span className="list__icon" style={{ background: '#FFEBEE', color: '#B71C1C' }}>🛡</span>
                  <div className="list__body">
                    <div className="list__title">FILR-protected income lock</div>
                    <div className="list__meta">10:1 minimum maintained until farmer exits by own choice</div>
                  </div>
                  <span className="list__aside tag tone-green">LOCKED</span>
                </div>
                <div className="list__item">
                  <span className="list__icon" style={{ background: '#E3F2FD', color: '#0D47A1' }}>🏦</span>
                  <div className="list__body">
                    <div className="list__title">NBFC + Bank credit lines unlocked</div>
                    <div className="list__meta">CCS FEED-A · pre-approved Rs.5L crop loan @ 8.5% (NABARD-backed)</div>
                  </div>
                  <span className="list__aside tag tone-green">OFFERS</span>
                </div>
              </div>
            </section>
          </div>

          {/* KRISHI COINS final */}
          <section className="coins coins--final">
            <div className="coins__title">🏅 KRISHI COINS · final tally</div>
            <div className="coins__value">13,100</div>
            <p className="coins__note">12,500 stage badges (cap reached) + 150 EPM bonus + 450 GAP daily</p>
          </section>
        </div>

        {/* WhatsApp final celebration */}
        <div className="span-6 col">
          <section className="wa wa--final">
            <div className="wa__head"><span className="dot dot--pulse" />WhatsApp · Chairman's message</div>
            <div className="wa__thread">
              <div className="wa__bubble">
                👑 <strong>హృదయపూర్వక అభినందనలు రాము గారూ!</strong>
                <br />
                <br />
                🏆 అనంతపూర్‌లో FEED తొలి PLATINUM రైతుగా మీకు ఘన స్వాగతం!
                <br />
                <br />
                మీ పట్టుదల, నాణ్యత మరియు ఎగుమతి ప్రయాణం ద్వారా
                <br />
                హాంబర్గ్‌కు 3 విజయవంతమైన ఎగుమతులు పూర్తి చేశారు.
                <br />
                <br />
                💰 రైతు మొత్తం ఆదాయం: ₹28.87 లక్షలు
                <br />
                ⚖️ రైతు–FEED విలువ నిష్పత్తి (FILR): 14.3 : 1
                <br />
                <br />
                🎤 మీ విజయమే మరొక రైతుకు మార్గదర్శకం
                <br />
                <br />
                తదుపరి EPM-7 · మే 2027
                <br />
                కొత్త రైతులతో మీ ఎగుమతి అనుభవాన్ని పంచుకుని,
                <br />
                వారిని Farm-to-Foreign ప్రయాణంలో ముందుకు నడిపించండి.
                <br />
                <br />
                — కె. రఘు వంశీ
                <br />
                చైర్మన్, FEED MSCS LTD
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar action-bar--platinum">
        <div className="action-bar__text">👑 మీ ఎగుమతి ప్రయాణం విజయవంతంగా పూర్తైంది · ఇప్పుడు మరో రైతు ప్రయాణానికి మీరు మార్గదర్శకులు కండి</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg cta-platinum" to="/"><span className="cta-platinum__shimmer" aria-hidden="true" />Become Mentor for EPM-7 · Anantapur<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
