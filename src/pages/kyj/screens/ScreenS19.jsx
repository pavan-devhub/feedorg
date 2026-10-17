import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-s19.css?inline'

export default function ScreenS19() {
  return (
    <>
      <title>KYJ_Screen19_MoA_Signing_Stage5_Badge</title>
      <PageStyles css={css} />

      {/* Page header + MoA document header */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/s18" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>21 Nov 2026 · 4:45 PM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 5 · 3 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">MoA Signing (EX-03)</h1>
            <div className="moa-doc">
              <p className="moa-doc__title">Memorandum of Agreement — Export Sales Contract</p>
              <p className="moa-doc__ref">MoA Ref: FEED/ANT/MOA/2026/042 · Post-BSM agreement</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* Contract: agreed terms + legal clauses */}
        <div className="span-7 col">
          <div className="block">
            <div className="section-label">Agreed Commercial Terms — Post BSM</div>
            <section className="card terms-card">
              <div className="card__head">
                <h2 className="card__title">📋 Terms agreed on BSM call (21 Nov 2026)</h2>
              </div>
              <dl className="terms">
                <div className="terms__row"><dt className="terms__key">Seller</dt><dd className="terms__val">FEED MSCS LTD (as Third-party Explorer) on behalf of Ramu Naidu · IEC + RCMC active</dd></div>
                <div className="terms__row"><dt className="terms__key">Buyer</dt><dd className="terms__val">Hamburg Spice Imports GmbH, Germany · Trust Score 8.7/10</dd></div>
                <div className="terms__row"><dt className="terms__key">Commodity</dt><dd className="terms__val is-locked">Guntur Chilli S4 · 1,400 kg · Grade A · ETO-free</dd></div>
                <div className="terms__row"><dt className="terms__key">FOB Price</dt><dd className="terms__val is-locked">Rs.685/kg FOB Vizag (negotiated from Rs.700)</dd></div>
                <div className="terms__row"><dt className="terms__key">FOB Total</dt><dd className="terms__val is-locked">Rs.9,59,000 (~€10,550)</dd></div>
                <div className="terms__row"><dt className="terms__key">Payment</dt><dd className="terms__val">Irrevocable LC at sight · UCP 600 · HDFC Bank</dd></div>
                <div className="terms__row"><dt className="terms__key">Shipment</dt><dd className="terms__val">Vizag → Hamburg · Dec 2026</dd></div>
                <div className="terms__row"><dt className="terms__key">Certification</dt><dd className="terms__val">PHRT COA · Phytosanitary · ETO-Free · BharatGAP</dd></div>
                <div className="terms__row"><dt className="terms__key">FEED fee</dt><dd className="terms__val">7% of FOB = Rs.67,130 · Deducted post-FIRC</dd></div>
                <div className="terms__row terms__row--total"><dt className="terms__key">Farmer receives</dt><dd className="terms__val is-locked">Rs.8,91,870 (93%) → PACS account</dd></div>
              </dl>
            </section>
          </div>

          <div className="legal">
            {/* UNCITRAL arbitration */}
            <section className="callout tone-gold">
              <span className="callout__icon">⚖️</span>
              <div className="callout__body">
                <h3 className="callout__title">వివాద పరిష్కారం — UNCITRAL మధ్యవర్తిత్వ నిబంధన</h3>
                <p>ఈ ఒప్పందం నుంచి ఏదైనా వివాదం ఏర్పడితే, UNCITRAL మధ్యవర్తిత్వ నియమాల ప్రకారం మధ్యవర్తిత్వం ద్వారా పరిష్కరించబడుతుంది. మధ్యవర్తిత్వ స్థలం: Singapore International Arbitration Centre (SIAC). వర్తించే చట్టం: భారతీయ చట్టం. భాష: ఇంగ్లీష్. ఈ నిబంధన ఇరు పక్షాలను రక్షిస్తుంది — ఏ ఒక్క దేశ న్యాయస్థానానికీ ఏకపక్షంగా పూర్తి అధికార పరిధి ఉండదు.</p>
              </div>
            </section>

            {/* ECGC note */}
            <section className="callout tone-green">
              <span className="callout__icon">🛡️</span>
              <p className="callout__body"><strong>ECGC Whole Turnover Policy యాక్టివేట్ అయింది:</strong> ఈ సరుకు FEED MSCS LTD యొక్క ECGC WTP కింద కవర్ చేయబడింది. LC అంగీకరించిన తర్వాత కొనుగోలుదారు చెల్లింపులో డిఫాల్ట్ చేస్తే, FOB విలువలో 85% వరకు ECGC కవర్ చేస్తుంది. సంప్రదించండి: Anand Singh GM, ECGC Hyderabad +91-8373912942</p>
            </section>
          </div>
        </div>

        {/* Signing panel + Stage 5 badge */}
        <div className="span-5 col">
          <section className="card sign-card">
            <div className="card__head">
              <h2 className="card__title">Digital Signatures</h2>
            </div>
            <ul className="signers" role="list">
              <li className="signer">
                <span className="signer__party">FEED MSCS LTD (EC Agent) — K Raghu Vamsi</span>
                <span className="signer__status">✓ Signed (DSC)</span>
              </li>
              <li className="signer">
                <span className="signer__party">Hamburg Spice Imports GmbH — Procurement Mgr</span>
                <span className="signer__status">✓ Signed (Email OTP)</span>
              </li>
            </ul>
            <div className="sign-pad">
              <div className="sign-pad__icon">✍️</div>
              <div className="sign-pad__text">FPO CEO Signature — Ramu Naidu</div>
              <div className="sign-pad__sub">Tap to sign with Aadhaar OTP · Consent: contract terms accepted</div>
            </div>
          </section>

          {/* Stage 5 badge preview */}
          <section className="badge-card">
            <div className="medal"><span className="medal__icon">🤝</span></div>
            <h2 className="badge-card__title">కొనుగోలుదారు Badge — Stage 5!</h2>
            <p className="badge-card__sub">Buyer Connected · Hamburg Spice Imports GmbH · MoA signed</p>
            <span className="ribbon ribbon--gold">🏅 +2,000 KC on sign</span>
          </section>

          {/* Running total */}
          <div className="coins coins--inline coins-total">
            <span className="coins__emoji">🏅</span>
            <span className="coins-total__label">KRISHI COINS after Stage 5</span>
            <span className="coins-total__value">7,100</span>
          </div>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">+2,000 KC · Stage 5 badge → CFC Intake (Screen 20) → Stage 6</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/s20">Sign MoA · MoA సంతకం చేయండి<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
