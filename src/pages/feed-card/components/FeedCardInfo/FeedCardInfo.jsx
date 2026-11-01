import { SECTIONS } from '../../sections.js'
import BeneficiariesPanel from './BeneficiariesPanel.jsx'
import BenefitsPanel from './BenefitsPanel.jsx'
import OverviewPanel from './OverviewPanel.jsx'
import './FeedCardInfo.css'

const PANELS = {
  'what-is-feed-card': OverviewPanel,
  benefits: BenefitsPanel,
  beneficiaries: BeneficiariesPanel,
}

// The section below the header. Only the panel for the selected header tab is shown;
// the others stay in the DOM but hidden, so each tab's aria-controls points somewhere real.
export default function FeedCardInfo({ activeSection, ref }) {
  return (
    <section className="info" ref={ref} aria-label="About FEED CARD">
      <div className="info__inner">
        {SECTIONS.map(({ id }) => {
          const Panel = PANELS[id]
          return (
            <div
              key={id}
              id={id}
              className={`info__panel info__panel--${id}`}
              role="tabpanel"
              aria-labelledby={`tab-${id}`}
              tabIndex={0}
              hidden={activeSection !== id}
            >
              <Panel />
            </div>
          )
        })}
      </div>
    </section>
  )
}
