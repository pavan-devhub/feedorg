import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-17.css?inline'

export default function Screen17() {
  return (
    <>
      <title>KYJ_Screen17_VISWARUPAM_Buyer_Match</title>
      <PageStyles css={css} />

      {/* Page header + buyer filter */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/16" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>18 Nov 2026 · 10:30 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 5 · 1 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">VISWARUPAM · Buyer Match</h1>
            <div className="filter-bar">
              <span className="filter-bar__label">Filtered for:</span>
              <span className="tag tag--glass filter-bar__pill">🌶 Chilli S4</span>
              <span className="tag tag--glass filter-bar__pill">1.4 MT lot</span>
              <span className="tag tag--glass filter-bar__pill">🇪🇺 EU preferred</span>
              <span className="tag tag--glass filter-bar__pill">PHRT: PASS ✓</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* Best match */}
        <div className="span-7 col">
          <div className="block">
            <div className="section-label tone-navy">Best Match · సరిపోయిన కొనుగోలుదారు</div>
            <article className="card card--flush card--outline tone-navy buyer-card">
              <header className="card__strip buyer-card__strip">
                <div className="buyer-card__id">
                  <h2 className="buyer-card__name">Hamburg Spice Imports GmbH</h2>
                  <div className="buyer-card__country">🇩🇪 Hamburg, Germany · EU</div>
                </div>
                <span className="trust-badge">Trust 8.7/10</span>
              </header>

              <div className="facts">
                <div className="fact">
                  <span className="fact__icon">📦</span>
                  <div className="fact__body">
                    <div className="fact__key">Annual import</div>
                    <div className="fact__val">200 MT Indian Chilli/yr</div>
                  </div>
                </div>

                <div className="fact">
                  <span className="fact__icon">💰</span>
                  <div className="fact__body">
                    <div className="fact__key">Price range</div>
                    <div className="fact__val is-good">€8.50–9.20/kg FOB (Rs.760–820/kg)</div>
                  </div>
                </div>

                <div className="fact">
                  <span className="fact__icon">💳</span>
                  <div className="fact__body">
                    <div className="fact__key">Payment</div>
                    <div className="fact__val">LC at sight (UCP 600) ✓</div>
                  </div>
                </div>

                <div className="fact">
                  <span className="fact__icon">📋</span>
                  <div className="fact__body">
                    <div className="fact__key">Requirements</div>
                    <div className="fact__val">ETO-free ✓ · Aflatoxin B1&lt;5ppb ✓ · PHRT COA</div>
                  </div>
                </div>

                <div className="fact">
                  <span className="fact__icon">📅</span>
                  <div className="fact__body">
                    <div className="fact__key">Next buying window</div>
                    <div className="fact__val is-good">Dec 2026 – Jan 2027 ✓</div>
                  </div>
                </div>

                <div className="fact">
                  <span className="fact__icon">🏦</span>
                  <div className="fact__body">
                    <div className="fact__key">ECGC status</div>
                    <div className="fact__val is-good">Green · Low risk country</div>
                  </div>
                </div>
              </div>

              <div className="trust">
                <div className="trust__head">
                  <span className="trust__label">Trust Score — 10 parameters</span>
                  <span className="trust__value">8.7 / 10</span>
                </div>
                <div className="progress progress--lg"><div className="progress__fill" style={{ width: '87%' }} /></div>
                <p className="trust__note">Payment history ✓ · Import volume verified ✓ · ECGC Green ✓ · Bank reference ✓ · RASFF clean record ✓</p>
              </div>
            </article>
          </div>

          {/* Dossier note */}
          <div className="callout tone-indigo dossier">
            <span className="callout__icon">📤</span>
            <p className="callout__body">
              <strong>కొనుగోలుదారు కోసం సిద్ధం చేసిన ఎగుమతి పత్రం:</strong> Farm GPS (ANP-001) · TraceX QR · PHRT COA (Eurofins) · BharatGAP cert · ASTA color grade · Capsaicin % · Lot 1.4 MT · Price request Rs.700/kg FOB. Sent to buyer email before meeting.
            </p>
          </div>
        </div>

        {/* Other matches + booking condition */}
        <div className="span-5 col col--sticky">
          <div className="block">
            <div className="section-label tone-navy">Other matches · ఇతర కొనుగోలుదారులు</div>
            <div className="matches">
              <article className="card match">
                <div className="match__top">
                  <div>
                    <h3 className="match__name">Al Fares Spice Trading LLC</h3>
                    <div className="match__country">🇦🇪 Dubai, UAE · Gulf</div>
                  </div>
                  <div className="match__score">
                    <span className="match__dot" style={{ background: '#f9a825' }} />
                    <span>6.2/10 ✓ Gulf gate</span>
                  </div>
                </div>
                <p className="match__detail">150 MT/yr · LC 30 days · SFDA halal cert preferred</p>
              </article>

              <article className="card match is-blocked">
                <div className="match__top">
                  <div>
                    <h3 className="match__name">Euro Spice BV</h3>
                    <div className="match__country">🇳🇱 Rotterdam, Netherlands</div>
                  </div>
                  <div className="match__score">
                    <span className="match__dot" style={{ background: '#e0e0e0' }} />
                    <span>5.8/10 ✗</span>
                  </div>
                </div>
                <p className="match__detail">Below EU Trust Score threshold (≥8.0 required) · BSM blocked</p>
              </article>
            </div>
          </div>

          {/* BSM booking condition */}
          <div className="callout tone-gold gate-note">
            <div className="callout__body">
              <div className="callout__title">BSM బుకింగ్‌కు షరతు:</div>
              <p>కొనుగోలుదారు Trust Score ≥ 8.0 (EU) లేదా ≥ 6.0 (Gulf) ఉన్నప్పుడే BSM బుక్ చేసుకోవచ్చు.</p>
              <p>తక్కువ Trust Score ఉన్న కొనుగోలుదారులు కనిపిస్తారు, కానీ BSM బుకింగ్ నిలిపివేయబడుతుంది.</p>
              <p>🎯 ఉద్దేశ్యం: చెల్లింపుల డిఫాల్ట్ ప్రమాదం నుంచి రైతులను రక్షించడం.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">Buyer-Seller Meet scheduled → price confirmed → MoA signing</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/s18">Book BSM with Hamburg Spice Imports · Screen 18<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
