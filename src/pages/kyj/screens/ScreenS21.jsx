import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-s21.css?inline'

export default function ScreenS21() {
  return (
    <>
      <title>KYJ_Screen21_TraceX_QR_Creation</title>
      <PageStyles css={css} />

      {/* Page header + generated lot QR */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/s20" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>18 Nov 2026 · 11:20 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 6 · 2 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">TraceX QR Creation</h1>
            <div className="qr-info">
              <p className="qr-info__title">TraceX Lot QR Generated</p>
              <p className="qr-info__sub">Blockchain chain locked · 6 hops · immutable</p>
            </div>
            <span className="qr-link">tracex.in/lot/FEED-ANT-26-001</span>
          </div>

          <div className="page-head__visual">
            <div className="qr-plate" role="img" aria-label="TraceX lot QR">
              <div className="qr">
                {/* Pattern QR (decorative) · 8 × 8, row by row */}
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell is-off" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell is-off" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell is-off" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell" />
                <span className="qr__cell" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* Provenance chain */}
        <div className="span-7 block">
          <div className="section-label">Farm-to-Port Provenance Chain</div>
          <section className="card chain-card">
            <div className="card__head">
              <h2 className="card__title">🔗 6-hop chain encoded in this QR</h2>
            </div>

            <ol className="timeline chain" role="list">
              <li className="timeline__item">
                <span className="timeline__dot" style={{ background: '#1b5e20' }}>1</span>
                <div className="timeline__body">
                  <div className="timeline__label">ORIGIN · Stage 1</div>
                  <p className="timeline__text">Farm GPS 14.6789°N, 77.6012°E · Plot ANP-001 · Sown 14 Aug 2026 · Sannam S4</p>
                  <div className="timeline__meta">hash: 7a3f...8b2c</div>
                </div>
              </li>
              <li className="timeline__item">
                <span className="timeline__dot" style={{ background: '#2e7d32' }}>2</span>
                <div className="timeline__body">
                  <div className="timeline__label">GAP COMPLIANCE · Stage 1</div>
                  <p className="timeline__text">90/90 GAP days logged · Last spray 18 Oct · No RED ZONE chemicals · Soil Health Card uploaded</p>
                  <div className="timeline__meta">hash: c14e...92ad</div>
                </div>
              </li>
              <li className="timeline__item">
                <span className="timeline__dot" style={{ background: '#004D40' }}>3</span>
                <div className="timeline__body">
                  <div className="timeline__label">QUALITY · Stage 4</div>
                  <p className="timeline__text">PHRT PASS · Eurofins NABL TC-3218 · EF-HYD-2026-8821 · ETO ND · Aflatoxin B1 1.8 μg/kg · Phyto SPQO ✓</p>
                  <div className="timeline__meta">hash: f9b2...4e51</div>
                </div>
              </li>
              <li className="timeline__item">
                <span className="timeline__dot" style={{ background: '#5d4037' }}>4</span>
                <div className="timeline__body">
                  <div className="timeline__label">PACKHOUSE · Stage 6</div>
                  <p className="timeline__text">Gorantla intake 17 Nov 07:42 AM · Net 1,425 kg · Grade A 980 kg → 39 cartons · 25 kg/carton</p>
                  <div className="timeline__meta">hash: 3d8a...7c19</div>
                </div>
              </li>
              <li className="timeline__item">
                <span className="timeline__dot" style={{ background: '#0d47a1' }}>5</span>
                <div className="timeline__body">
                  <div className="timeline__label">COLD CHAIN · Stage 6</div>
                  <p className="timeline__text">IoT log started 07:48 · Target 0–5°C · Currently 3.2°C · Sensor GP-CH-001 · 5-min interval</p>
                  <div className="timeline__meta">hash: 6e29...d4f8</div>
                </div>
              </li>
              <li className="timeline__item">
                <span className="timeline__dot" style={{ background: '#bf360c' }}>6</span>
                <div className="timeline__body">
                  <div className="timeline__label">TREATMENT · Stage 6</div>
                  <p className="timeline__text">ETO-Free steam 18 Nov 09:00 AM · 45 min · NO ETO chemicals · EU heightened control compliant</p>
                  <div className="timeline__meta">hash: b7a1...e35c</div>
                </div>
              </li>
            </ol>
          </section>
        </div>

        <div className="span-5 col">
          {/* TraceNet upload */}
          <section className="card card--tinted tone-green">
            <div className="card__head">
              <h2 className="card__title">🔗 APEDA TraceNet · Govt Upload Status (D03-16)</h2>
            </div>
            <div className="kv">
              <div className="kv__row"><span className="kv__key">Lot uploaded to TraceNet</span><span className="kv__val is-ok">✓ 18 Nov 11:18 AM</span></div>
              <div className="kv__row"><span className="kv__key">TraceNet ref</span><span className="kv__val is-ok mono">TN-AP-2026-FEED-0087</span></div>
              <div className="kv__row"><span className="kv__key">EU authorities visible</span><span className="kv__val is-ok">✓ Reg 2019/1793 compliant</span></div>
            </div>
          </section>

          {/* Carton-level QR stickers */}
          <div className="block">
            <div className="section-label">Carton-Level QR Stickers</div>
            <section className="card carton-card">
              <div className="card__head">
                <h2 className="card__title">📦 39 EU-export cartons (Grade A · 980 kg)</h2>
              </div>
              <div className="carton-stats">
                <div className="stat stat--center tone-purple">
                  <div className="stat__value">39</div>
                  <div className="stat__label">cartons (25 kg each)</div>
                </div>
                <div className="stat stat--center tone-purple">
                  <div className="stat__value">39</div>
                  <div className="stat__label">unique QR stickers</div>
                </div>
              </div>

              <div className="sticker">
                <div className="mini-qr" aria-hidden="true">
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell is-off" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell is-off" />
                  <span className="mini-qr__cell is-off" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell is-off" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell is-off" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell is-off" />
                  <span className="mini-qr__cell is-off" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell is-off" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell is-off" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell" />
                  <span className="mini-qr__cell" />
                </div>
                <div className="sticker__info">
                  <div className="sticker__id">Sample: CRT-001 of 039</div>
                  <div className="sticker__url">tracex.in/c/FEED-ANT-26-001/001</div>
                  <div className="sticker__note">Buyer scans → full chain</div>
                </div>
              </div>
            </section>
          </div>

          {/* EU buyer preview */}
          <section className="callout tone-indigo eu-preview">
            <div className="callout__body">
              <h2 className="callout__title">🇩🇪 హాంబర్గ్ కొనుగోలుదారు స్కాన్ చేసినప్పుడు చూసేది</h2>
              <p>"ఈ మిర్చిని ఆంధ్రప్రదేశ్, భారతదేశంలోని కళ్యాణదుర్గం ప్రాంతం, ANP-001 పొలంలో రైతు రాము నాయుడు పండించారు. విత్తిన తేదీ: 14 ఆగస్టు 2026. 90 రోజుల GAP నిబంధనలు పాటించారు. Eurofins TC-3218 ద్వారా PHRT పరీక్ష నవంబర్ 10న క్లియర్ అయింది. ETO-Free. నవంబర్ 17 నుంచి కోల్డ్-చైన్ నిర్వహించబడింది. Gorantla APEDA ప్యాక్‌హౌస్‌లో ప్యాక్ చేయబడింది." — పూర్తి పంట వివరాలు మరియు ప్రయాణ వివరాలు హాంబర్గ్ పోర్ట్‌లో ఏ ఫోన్‌లోనైనా స్కాన్ చేసి చూడవచ్చు.</p>
            </div>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">Stickers ready in 4 min · Stage 6 advance → Screen 22 Sample Dispatch</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/22">Print 39 Carton QR Stickers & Seal Cartons<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
