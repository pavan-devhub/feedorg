import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-12.css?inline'

export default function Screen12() {
  return (
    <>
      <title>KYJ_Screen12_Packhouse_Locator</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/11a" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>9:40 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 3 · 1 of 2</span>
          </div>
        </div>
        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">Packhouse Locator · ప్యాక్ హౌస్</h1>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* Map + GPS details */}
        <div className="span-7 col">
          <section className="card card--flush map-card">
            <div className="map">
              <div className="map__canvas">
                <div className="map__grid" aria-hidden="true" />
                <div className="map__radius" aria-hidden="true" />
                <div className="map__pin map__pin--farm">🌾</div>
                <div className="map__pin map__pin--ph">🏭</div>
                <div className="map__line" aria-hidden="true" />
                <div className="map__dist">38 km</div>
              </div>
              <div className="map__legend">🌾 Farm ANP-001 · 🏭 Gorantla Packhouse · ○ 50km radius</div>
            </div>
            {" "}
            {/* GPS details */}
            {" "}
            <div className="gps tone-green">
              <div className="kv-grid gps__grid">
                <div className="kv-cell">
                  <div className="kv-cell__k">Farm GPS (ANP-001)</div>
                  <div className="kv-cell__v mono">14.6789°N, 77.6012°E</div>
                </div>
                <div className="kv-cell">
                  <div className="kv-cell__k">Packhouse GPS</div>
                  <div className="kv-cell__v mono">14.1234°N, 77.4567°E</div>
                </div>
                <div className="kv-cell gps__measured">
                  <div className="kv-cell__k">Measured distance</div>
                  <div className="kv-cell__v">38.4 km ✓</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="span-5 col">
          {/* Selected packhouse */}
          <div className="block">
            <div className="section-label tone-accent">Selected Packhouse — APEDA Registered</div>
            <section className="card card--flush tone-accent ph-card">
              <div className="card__strip">
                <h2 className="card__strip-title">Gorantla APEDA Packhouse</h2>
                <span className="tag tag--glass tag--lg">PRIMARY ✓</span>
              </div>
              <div className="card__body">
                <div className="kv ph-kv">
                  <div className="kv__row">
                    <span className="kv__key"><span className="kv__icon">📍</span>Distance from farm</span>
                    <span className="kv__val is-ok">38 km ✓ (limit: 50km)</span>
                  </div>
                  <div className="kv__row">
                    <span className="kv__key"><span className="kv__icon">🏛️</span>APEDA Registration</span>
                    <span className="kv__val is-ok mono">APEDA/PH/AP/2024/0187 ✓</span>
                  </div>
                  <div className="kv__row">
                    <span className="kv__key"><span className="kv__icon">🌡️</span>Pre-cooling (Banana)</span>
                    <span className="kv__val is-ok">13–14°C Forced Air ✓</span>
                  </div>
                  <div className="kv__row">
                    <span className="kv__key"><span className="kv__icon">❄️</span>Cold storage (Chilli)</span>
                    <span className="kv__val is-ok">0–5°C ✓</span>
                  </div>
                  <div className="kv__row">
                    <span className="kv__key"><span className="kv__icon">⚗️</span>ETO exposure risk</span>
                    <span className="kv__val is-ok">ETO-Free certified ✓</span>
                  </div>
                  <div className="kv__row">
                    <span className="kv__key"><span className="kv__icon">📞</span>Contact</span>
                    <span className="kv__val is-info mono">08554-XXXXXX</span>
                  </div>
                  <div className="kv__row">
                    <span className="kv__key"><span className="kv__icon">📅</span>Availability</span>
                    <span className="kv__val is-ok">Slot open: Nov–Dec 2026</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Other packhouses */}
          <section className="card alt-card">
            <div className="card__head">
              <h2 className="card__title">Other packhouses in district</h2>
            </div>
            <div className="kv">
              <div className="kv__row">
                <span className="kv__key alt-name">Kurnool APEDA Cold House</span>
                <span className="tag tone-orange">67 km ✗</span>
              </div>
              <div className="kv__row">
                <span className="kv__key alt-name">Anantapur APMC Storage</span>
                <span className="tag tone-orange">12 km · Not APEDA ✗</span>
              </div>
              <div className="kv__row">
                <span className="kv__key alt-name">Dhone Horticulture PH</span>
                <span className="tag tone-orange">54 km ✗</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar action-bar--solo">
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/13">Confirm Gorantla Packhouse · నిర్ధారించండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
