import { Link } from '../router.jsx'
import PageStyles from '../components/PageStyles.jsx'
import css from '../styles/pages/screen-15.css?inline'

export default function Screen15() {
  return (
    <>
      <title>KYJ_Screen15_PHRT_Sample_Result</title>
      <PageStyles css={css} />

      {/* Page header + PASS result */}
      <section className="page-head">
        <div className="page-head__top">
          <Link className="back-btn" to="/screens/14" aria-label="Back">←</Link>
          <div className="page-head__meta">
            <span className="meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>10 Nov 2026 · 11:42 AM</span>
          </div>
          <div className="page-head__top-end">
            <span className="stage-pill">Stage 4 · 2 of 3</span>
          </div>
        </div>

        <div className="page-head__body">
          <div className="page-head__titles">
            <h1 className="page-title">PHRT Result · Stage 4 Gate</h1>
            <p className="pass-title">PHRT PASS — మీ పంట export సిద్ధం!</p>
            <p className="page-sub">All residues within EU MRL limits · ETO: Zero · Aflatoxin B1: 1.8 μg/kg (&lt;5 limit)</p>
            <span className="ref-chip mono">Eurofins Report: EF-HYD-2026-8821 · NABL: TC-3218</span>
          </div>

          <div className="page-head__visual">
            <div className="pass-seal"><span className="pass-seal__icon">✅</span></div>
          </div>
        </div>
      </section>

      <div className="grid">
        {/* Residue table */}
        <div className="span-7 block">
          <div className="section-label tone-green">Residue Analysis Results — Chilli S4 · EU MRL</div>
          <section className="card card--flush residue">
            <div className="table-wrap">
              <table className="table residue__table">
                <thead>
                  <tr>
                    <th scope="col">Compound</th>
                    <th scope="col">Detected</th>
                    <th scope="col">EU Limit</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="residue__compound">Chlorpyrifos</td>
                    <td className="residue__num">&lt;LOD</td>
                    <td className="residue__limit">0.01 mg/kg</td>
                    <td className="residue__status"><span className="tag tone-green">PASS ✓</span></td>
                  </tr>
                  <tr>
                    <td className="residue__compound">Acephate</td>
                    <td className="residue__num">ND</td>
                    <td className="residue__limit">Not registered</td>
                    <td className="residue__status"><span className="tag tone-blue">ZERO ✓</span></td>
                  </tr>
                  <tr>
                    <td className="residue__compound">ETO + 2-CE metabolite</td>
                    <td className="residue__num">ND</td>
                    <td className="residue__limit">~zero (EU)</td>
                    <td className="residue__status"><span className="tag tone-blue">ZERO ✓</span></td>
                  </tr>
                  <tr>
                    <td className="residue__compound">Aflatoxin B1</td>
                    <td className="residue__num">1.8 μg/kg</td>
                    <td className="residue__limit">&lt;5 μg/kg EU</td>
                    <td className="residue__status"><span className="tag tone-green">PASS ✓</span></td>
                  </tr>
                  <tr>
                    <td className="residue__compound">Cypermethrin</td>
                    <td className="residue__num">0.04 mg/kg</td>
                    <td className="residue__limit">0.07 mg/kg</td>
                    <td className="residue__status"><span className="tag tone-green">PASS ✓</span></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="residue__summary">
                    <td className="residue__compound">All 500+ residues</td>
                    <td className="residue__num">Within MRL</td>
                    <td className="residue__limit">—</td>
                    <td className="residue__status"><span className="tag tag--solid tone-green">PASS ✓</span></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </div>

        <div className="span-5 col col--sticky">
          {/* Stage 4 status */}
          <section className="card card--outline tone-green gate">
            <h2 className="gate__title">మీరు Stage 4కి వెళ్లారు</h2>
            <div className="gate__code mono">
              phrt_result.status = 'PASS'
              <br />
              → +1,500 KC credited
              <br />
              → COA document generated
              <br />
              → Stage 5 buyer match UNLOCKED
            </div>
          </section>

          {/* What's next */}
          <section className="card card--tinted tone-teal next">
            <div className="card__head">
              <h2 className="card__title">📋 Completing Stage 4 — Next step</h2>
            </div>
            <div className="list">
              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">NABL lab booked (Screen 14)</div></div>
              </div>
              <div className="list__item tone-green">
                <span className="list__icon list__icon--sm list__icon--solid">✓</span>
                <div className="list__body"><div className="list__title">PHRT result PASS (this screen)</div></div>
              </div>
              <div className="list__item tone-teal is-next">
                <span className="list__icon list__icon--sm list__icon--solid">→</span>
                <div className="list__body"><div className="list__title">COA + Phytosanitary certificate (Screen 16)</div></div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Primary action */}
      <div className="action-bar">
        <div className="action-bar__text">Stage 4 badge + +1,500 KC after COA uploaded</div>
        <div className="action-bar__actions">
          <Link className="btn btn--primary btn--lg" to="/screens/16">Proceed to COA + Phytosanitary · Screen 16<svg className="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
        </div>
      </div>
    </>
  )
}
