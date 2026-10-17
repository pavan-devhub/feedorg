import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-23.css?inline'

export default function Screen23() {
  return (
    <>
      <title>KYJ_Screen23_CHA_Assignment_12Doc_Checklist</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/22a" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>30 Nov 2026 · 10:15 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill stage-pill--star">★ 1 of 4</span>
          </div>
        </div>
        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">CHA Assignment & Documents</h1>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* 12-Doc Checklist */}
        <div className="span-7 block">
          <div className="section-label">12-Doc Export Checklist</div>
          <section className="card card--flush tone-navy">
            <div className="card__strip">
              <div className="card__strip-title">📋 Documents required for Hamburg shipment</div>
              <span className="doc-counter">6 / 12 ✓</span>
            </div>

            <div className="list">
              <div className="list__group">Already complete · From earlier stages</div>

              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body">
                  <div className="list__title">① Certificate of Analysis (COA)</div>
                  <div className="list__meta">Eurofins NABL TC-3218 · EF-HYD-2026-8821</div>
                </div>
                <span className="list__aside">Stage 4</span>
              </div>

              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body">
                  <div className="list__title">② Phytosanitary Certificate</div>
                  <div className="list__meta">DPPQS SPQO Anantapur · PSC-AP-2026-1142</div>
                </div>
                <span className="list__aside">Stage 4</span>
              </div>

              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body">
                  <div className="list__title">③ APEDA TraceNet Record</div>
                  <div className="list__meta">TN-AP-2026-FEED-0087 · Govt visible</div>
                </div>
                <span className="list__aside">Stage 6</span>
              </div>

              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body">
                  <div className="list__title">④ Sales Contract (MoA)</div>
                  <div className="list__meta">FEED/ANT/MOA/2026/042 · UNCITRAL · LC at sight</div>
                </div>
                <span className="list__aside">Stage 5</span>
              </div>

              <div className="list__group">FEED to file · 48 hours</div>

              <div className="list__item tone-blue">
                <span className="list__icon list__icon--sm list__icon--solid">→</span>
                <div className="list__body">
                  <div className="list__title">⑤ Commercial Invoice</div>
                  <div className="list__meta">FEED-CI-2026-042 · Rs.9,59,000 · drafting</div>
                </div>
                <span className="list__aside">In progress</span>
              </div>

              <div className="list__item tone-blue">
                <span className="list__icon list__icon--sm list__icon--solid">→</span>
                <div className="list__body">
                  <div className="list__title">⑥ Packing List</div>
                  <div className="list__meta">39 cartons · 980 kg net · 1,066 kg gross w/ pallets</div>
                </div>
                <span className="list__aside">In progress</span>
              </div>

              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body">
                  <div className="list__title">⑦ APEDA Certificate of Origin</div>
                  <div className="list__meta">CoO-APEDA-2026-08715</div>
                </div>
                <span className="list__aside">Today</span>
              </div>

              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body">
                  <div className="list__title">⑧ LUT (Letter of Undertaking)</div>
                  <div className="list__meta">FEED MSCS LTD · FY 2026-27 active</div>
                </div>
                <span className="list__aside">Active</span>
              </div>

              <div className="list__group">CHA to file · ICEGATE</div>

              <div className="list__item tone-orange">
                <span className="list__icon list__icon--sm list__icon--solid">○</span>
                <div className="list__body">
                  <div className="list__title">⑨ Shipping Bill (free format)</div>
                  <div className="list__meta">CHA files on ICEGATE → next screen</div>
                </div>
                <span className="list__aside">Authorize</span>
              </div>

              <div className="list__item tone-orange">
                <span className="list__icon list__icon--sm list__icon--solid">○</span>
                <div className="list__body">
                  <div className="list__title">⑩ GR Form / EDPMS Declaration</div>
                  <div className="list__meta">RBI export proceeds tracking</div>
                </div>
                <span className="list__aside">With Shipping Bill</span>
              </div>

              <div className="list__item tone-orange">
                <span className="list__icon list__icon--sm list__icon--solid">○</span>
                <div className="list__body">
                  <div className="list__title">⑪ ECGC Per-Consignment Declaration</div>
                  <div className="list__meta">Anand Singh GM · 48 hrs before loading</div>
                </div>
                <span className="list__aside">Today by 6 PM</span>
              </div>

              <div className="list__group">Post-shipment · Auto-collected</div>

              <div className="list__item tone-neutral">
                <span className="list__icon list__icon--sm list__icon--solid is-later">·</span>
                <div className="list__body">
                  <div className="list__title">⑫ Bill of Lading (BL)</div>
                  <div className="list__meta">Shipping line issues after vessel departs</div>
                </div>
                <span className="list__aside">Post-departure</span>
              </div>
            </div>
          </section>
        </div>

        <div className="span-5 col col--sticky">
          {/* CHA Partner */}
          <div className="block">
            <div className="section-label tone-navy">Customs House Agent assigned</div>
            <section className="card card--outline tone-navy cha-card">
              <div className="cha-card__top">
                <div className="cha-card__icon">⚓</div>
                <div>
                  <div className="cha-card__name">Vizag Maritime Logistics Pvt Ltd</div>
                  <div className="cha-card__status">✓ FEED empanelled · CHA Licence: TVPSU-XYZ-2018</div>
                </div>
              </div>
              <p className="cha-card__detail">📍 Office: Beach Road, Visakhapatnam · 📞 Sreedhar +91-99XX XX XX42 · 📧 docs@vizmaritime.in</p>
              <div className="tags mt-12">
                <span className="tag tone-indigo">Vizag Port specialist</span>
                <span className="tag tone-indigo">Chilli exports 8+ yrs</span>
                <span className="tag tone-indigo">ICEGATE auto-filer</span>
              </div>
            </section>
          </div>

          {/* Vessel booking */}
          <section className="card card--tinted tone-blue">
            <div className="card__head">
              <h2 className="card__title">🚢 Vessel booking confirmed</h2>
            </div>
            <div className="kv-grid vessel-grid">
              <div className="kv-cell"><div className="kv-cell__k">Vessel</div><div className="kv-cell__v">MV Maersk Hamburg</div></div>
              <div className="kv-cell"><div className="kv-cell__k">Voyage</div><div className="kv-cell__v">VOY-2643W</div></div>
              <div className="kv-cell"><div className="kv-cell__k">Route</div><div className="kv-cell__v">Vizag → Colombo → Hamburg</div></div>
              <div className="kv-cell"><div className="kv-cell__k">ETD Vizag</div><div className="kv-cell__v">07 Dec 2026</div></div>
              <div className="kv-cell"><div className="kv-cell__k">ETA Hamburg</div><div className="kv-cell__v">26 Dec 2026</div></div>
              <div className="kv-cell"><div className="kv-cell__k">Container</div><div className="kv-cell__v">20' Reefer · 1×TEU</div></div>
            </div>
            <div className="callout tone-orange mt-12">
              <span className="callout__icon">⏰</span>
              <span className="callout__body">CFS cut-off: <strong>04 Dec · 5 PM</strong> · Container stuffing at packhouse 02 Dec</span>
            </div>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text"><strong className="star-note">★ Stage 7 step 2 of 4 · LEO + ECGC activation</strong></div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/24">Authorize CHA → File Shipping Bill on ICEGATE<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
