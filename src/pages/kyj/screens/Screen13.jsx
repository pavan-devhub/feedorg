import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-13.css?inline'

export default function Screen13() {
  return (
    <>
      <title>KYJ_Screen13_Packing_Labelling</title>
      <PageStyles css={css} />

      {/* Page header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/12" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>10:05 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 3 · 2 of 2</span>
          </div>
        </div>
        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">Packing & Labelling (EX-08)</h1>
          </div>
        </div>
      </section>

      {/* Destination selector */}
      <section className="card dest-bar">
        <div className="section-label tone-accent">Destination Market · గమ్యస్థానం</div>
        <div className="chips">
          <span className="chip is-selected">🇪🇺 EU / Germany</span>
          <span className="chip">🇦🇪 Gulf / UAE</span>
          <span className="chip">🇯🇵 Japan</span>
          <span className="chip">🇺🇸 USA</span>
        </div>
      </section>

      <div className="grid pack-grid">
        {/* Carton specifications */}
        <div className="span-7 block">
          <div className="section-label tone-accent">EU Carton Specifications — Chilli S4</div>
          <section className="card tone-neutral spec-card">
            <div className="card__head">
              <h2 className="card__title">📦 EU Standard Export Carton · EU నిబంధనలు</h2>
            </div>
            <div className="kv-grid spec-grid">
              <div className="kv-cell">
                <div className="kv-cell__k">Carton type</div>
                <div className="kv-cell__v">5-ply corrugated</div>
              </div>
              <div className="kv-cell">
                <div className="kv-cell__k">Net weight</div>
                <div className="kv-cell__v">25 kg/carton</div>
              </div>
              <div className="kv-cell is-warn">
                <div className="kv-cell__k">Moisture level</div>
                <div className="kv-cell__v">≤10% (EU gate)</div>
              </div>
              <div className="kv-cell">
                <div className="kv-cell__k">Inner bag</div>
                <div className="kv-cell__v">PP woven, ETO-free</div>
              </div>
              <div className="kv-cell is-warn">
                <div className="kv-cell__k">Aflatoxin</div>
                <div className="kv-cell__v">B1 &lt;5 μg/kg EU</div>
              </div>
              <div className="kv-cell">
                <div className="kv-cell__k">Lot / Batch</div>
                <div className="kv-cell__v mono">FEED-ANT-26-001</div>
              </div>
            </div>
          </section>
        </div>

        {/* BULLKART label preview */}
        <div className="span-5 block">
          <div className="section-label tone-green">BULLKART Export Label · లేబుల్ ప్రివ్యూ</div>
          <article className="bk-label">
            <div className="bk-label__pattern" aria-hidden="true" />
            <div className="bk-label__brand">BULLKART · THE FARMER'S BRAND</div>
            <h2 className="bk-label__name">Guntur Chilli (Sannam S4)</h2>
            <div className="bk-label__sub">Product of India · Andhra Pradesh</div>
            <div className="bk-label__fields">
              <div className="bk-label__field">
                <div className="bk-label__key">HS Code</div>
                <div className="bk-label__val mono">0904 21 10</div>
              </div>
              <div className="bk-label__field">
                <div className="bk-label__key">Net Weight</div>
                <div className="bk-label__val">25 kg</div>
              </div>
              <div className="bk-label__field">
                <div className="bk-label__key">APEDA Reg.</div>
                <div className="bk-label__val">FEED MSCS LTD</div>
              </div>
              <div className="bk-label__field">
                <div className="bk-label__key">Lot No.</div>
                <div className="bk-label__val mono">ANT-26-001</div>
              </div>
              <div className="bk-label__field">
                <div className="bk-label__key">ETO Status</div>
                <div className="bk-label__val">ETO-Free ✓</div>
              </div>
              <div className="bk-label__field">
                <div className="bk-label__key">Origin Farm</div>
                <div className="bk-label__val mono">ANP-001</div>
              </div>
            </div>
            <div className="bk-label__qr">📱</div>
          </article>
        </div>

        {/* Compliance checklist */}
        <section className="span-7 card">
          <div className="card__head">
            <h2 className="card__title">📋 EU Labelling Compliance — Reg 1169/2011</h2>
          </div>
          <div className="list">
            <div className="list__item tone-green">
              <span className="list__icon list__icon--sm list__icon--solid">✓</span>
              <div className="list__body">
                <div className="list__title">Country of origin — "Product of India, Andhra Pradesh"</div>
              </div>
            </div>
            <div className="list__item tone-green">
              <span className="list__icon list__icon--sm list__icon--solid">✓</span>
              <div className="list__body">
                <div className="list__title">APEDA Registration on label</div>
              </div>
            </div>
            <div className="list__item tone-green">
              <span className="list__icon list__icon--sm list__icon--solid">✓</span>
              <div className="list__body">
                <div className="list__title">TraceX QR code — farm-to-buyer scannable</div>
              </div>
            </div>
            <div className="list__item tone-green">
              <span className="list__icon list__icon--sm list__icon--solid">✓</span>
              <div className="list__body">
                <div className="list__title">ETO-Free declaration on carton</div>
              </div>
            </div>
            <div className="list__item tone-orange is-attention">
              <span className="list__icon list__icon--sm list__icon--solid">!</span>
              <div className="list__body">
                <div className="list__title">Moisture declaration — verify at packhouse</div>
                <div className="list__meta">Check moisture ≤10% before sealing · Use moisture meter</div>
              </div>
            </div>
          </div>
        </section>

        <div className="span-5 col">
          {/* ISPM alert */}
          <div className="callout tone-gold">
            <span className="callout__icon">⚠️</span>
            <div className="callout__body">
              <strong>ISPM-15 Pallet Compliance:</strong> All wooden pallets must carry ISPM-15 Heat Treatment mark (IN + producer code + HT). CHA confirms at Krishnapatnam Port.
            </div>
          </div>

          {/* Stage 3 gate */}
          <div className="callout callout--lg callout--center tone-green gate-tile">
            <div className="callout__body">
              <div className="callout__title">✅ Stage 3 Gate — Packhouse + Label Specs confirmed</div>
              <div className="gate-tile__sub">Badge: ప్యాక్ హౌస్ · +1,500 KC · Stage 4 PHRT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">+1,500 KC → NABL Lab booking opens → Stage 4</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/13a">Confirm Packing Specs · నిర్ధారించండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
