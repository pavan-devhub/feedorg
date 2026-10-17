import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-25.css?inline'

export default function Screen25() {
  return (
    <>
      <title>KYJ_Screen25_FIRC_Upload_TwoTrack</title>
      <PageStyles css={css} />

      {/* Page header + payment received */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/24" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>28 Dec 2026 · 11:14 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill stage-pill--star">★ 3 of 4</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">FIRC Upload</h1>
          </div>

          <div className="page-head__visual">
            <div className="payment">
              <div className="payment__icon">💰</div>
              <div className="payment__body">
                <div className="payment__title">LC Payment Received from Hamburg!</div>
                <div className="payment__amount">€10,550 · Rs.9,59,000</div>
                <div className="payment__sub">Vessel arrived Hamburg 26 Dec · LC released 27 Dec · Funds landed 28 Dec</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment route */}
      <div className="block">
        <div className="section-label">Payment route · 5-bank flow</div>
        <section className="card route-card">
          <div className="card__head">
            <h2 className="card__title">🌐 SWIFT · UCP 600 · International LC at sight</h2>
          </div>
          <div className="route">
            <div className="route__node is-origin">
              <div className="route__flag">🇩🇪</div>
              <div className="route__name">Hamburg Spice</div>
              <div className="route__role">Buyer</div>
            </div>
            <div className="route__arrow">→</div>
            <div className="route__node">
              <div className="route__flag">🏦</div>
              <div className="route__name">Deutsche Bank</div>
              <div className="route__role">Issuing</div>
            </div>
            <div className="route__arrow">→</div>
            <div className="route__node">
              <div className="route__flag">🏦</div>
              <div className="route__name">HDFC Bank</div>
              <div className="route__role">AD Bank</div>
            </div>
            <div className="route__arrow">→</div>
            <div className="route__node is-dest">
              <div className="route__flag">🏦</div>
              <div className="route__name">APGVB Anantapur</div>
              <div className="route__role">Farmer's bank</div>
            </div>
          </div>
        </section>
      </div>

      {/* Two-track FIRC */}
      <div className="block">
        <div className="section-label">🔄 Two-track FIRC architecture</div>
        <section className="card twotrack">
          <div className="card__head">
            <h2 className="card__title">Track A is Primary · Track B is Mandatory Copy</h2>
          </div>

          <div className="tracks">
            <article className="track tone-green">
              <div className="track__grid">
                <h3 className="track__header">★ Track A · PRIMARY</h3>
                <div className="track__bank">Ramu Naidu</div>
                <div className="track__acc">APGVB · A/C ****4521</div>
                <div className="track__amt">Rs.8,91,870</div>
                <div className="track__eta">93% of FOB · Net to farmer</div>
                <div className="track__status">✓ CREDITED 28 Dec</div>
                <div className="track__eta track__ref">FIRC No: HDFC-FIRC-2026-78421</div>
              </div>
            </article>

            <article className="track tone-blue">
              <div className="track__grid">
                <h3 className="track__header">Track B · PACS COPY</h3>
                <div className="track__bank">PACS Anantapur</div>
                <div className="track__acc">PACS-ANT-2024-0387</div>
                <div className="track__amt">copy register</div>
                <div className="track__eta">7-day mandatory copy</div>
                <div className="track__status">📋 PENDING — by 04 Jan</div>
                <div className="track__eta track__ref">FCDA to file at PACS office</div>
              </div>
            </article>
          </div>
        </section>
      </div>

      <div className="grid">
        {/* FIRC document */}
        <section className="span-7 card card--flush tone-accent firc-doc">
          <div className="card__strip">
            <h2 className="card__strip-title">📄 FIRC from AD Bank · HDFC</h2>
            <span className="verified-tag">VERIFIED</span>
          </div>
          <div className="card__body">
            <div className="kv">
              <div className="kv__row"><span className="kv__key">FIRC No.</span><span className="kv__val mono">HDFC-FIRC-2026-78421</span></div>
              <div className="kv__row"><span className="kv__key">Date</span><span className="kv__val">28 Dec 2026</span></div>
              <div className="kv__row"><span className="kv__key">Beneficiary</span><span className="kv__val">Ramu Naidu · FEED Member 042</span></div>
              <div className="kv__row"><span className="kv__key">Remitter</span><span className="kv__val">Hamburg Spice Imports GmbH</span></div>
              <div className="kv__row"><span className="kv__key">Foreign currency</span><span className="kv__val">EUR 10,550.00</span></div>
              <div className="kv__row"><span className="kv__key">INR equivalent</span><span className="kv__val is-ok">Rs.9,59,000 @ €1 = Rs.90.90</span></div>
              <div className="kv__row"><span className="kv__key">Purpose code</span><span className="kv__val">P0103 · Export of goods</span></div>
              <div className="kv__row"><span className="kv__key">EDPMS reference</span><span className="kv__val mono">EDPMS-26-VIZ-8842156</span></div>
              <div className="kv__row"><span className="kv__key">AD Bank confirmation</span><span className="kv__val is-ok mono">firc_register.status='CONFIRMED' ✓</span></div>
            </div>
          </div>
        </section>

        {/* Upload checklist */}
        <div className="span-5 block">
          <div className="section-label">Required uploads before CASCADE 1</div>
          <section className="card uploads">
            <div className="card__head">
              <h2 className="card__title">📤 4-document upload bundle</h2>
            </div>
            <ul className="list" role="list">
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body">
                  <div className="list__title">① Bill of Lading PDF</div>
                  <div className="list__meta mono">MAEU-2026-VIZHAM-2643</div>
                </div>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body">
                  <div className="list__title">② FIRC PDF from HDFC</div>
                  <div className="list__meta mono">HDFC-FIRC-2026-78421</div>
                </div>
              </li>
              <li className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body">
                  <div className="list__title">③ EDPMS reference auto-pulled</div>
                  <div className="list__meta">RBI portal API</div>
                </div>
              </li>
              <li className="list__item tone-orange is-pending">
                <span className="list__icon list__icon--sm list__icon--solid">○</span>
                <div className="list__body">
                  <div className="list__title">④ PACS 7-day register copy</div>
                  <div className="list__meta">FCDA files by 04 Jan</div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text"><strong className="gold-note">Stage 7 complete → upgrade to GOLD card</strong></div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/27">Submit FIRC<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
