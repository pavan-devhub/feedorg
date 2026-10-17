import { Link } from '../router.jsx'
import '../styles/components/stage-journey.css'

// The stages sit on a full-width pale blue band. Each is the same centred white
// panel: pill label, two-tone title, summary, a row of numbered screen cards
// and one button.
// Stage colours live in stage-journey.css ([data-stage]); titles and summaries
// in data/screens.js.

const twoDigits = (value) => String(value).padStart(2, '0')

// "EPM & Onboarding" → ["EPM &", "Onboarding"]: the last word takes the stage colour
function splitTitle(name) {
  const words = name.split(' ')
  return [words.slice(0, -1).join(' '), words.at(-1)]
}

function ScreenCard({ screen }) {
  return (
    <li className="journey-card">
      <Link to={screen.path} className="journey-card__link">
        <span className="journey-card__num">{twoDigits(screen.label)}</span>
        <span className="journey-card__title">{screen.title}</span>
      </Link>
    </li>
  )
}

function StageSection({ stage, items, nextStageId }) {
  const number = twoDigits(stage.id)
  const [lead, accent] = splitTitle(stage.name)
  const titleId = `stage-${stage.id}-title`

  return (
    <section className="journey-stage" data-stage={stage.id} id={`stage-${stage.id}`} aria-labelledby={titleId}>
      <p className="journey-stage__pill">
        <span className="journey-stage__dot" aria-hidden="true" />
        Stage {number}
      </p>
      <h3 className="journey-stage__title" id={titleId}>
        {lead && `${lead} `}
        <span className="journey-stage__accent">{accent}</span>
      </h3>
      {stage.summary && <p className="journey-stage__summary">{stage.summary}</p>}

      {/* data-count lets the CSS keep rows balanced (five cards → 3 + 2, not 4 + 1) */}
      <ul className="journey-stage__cards" role="list" data-count={items.length}>
        {items.map((screen) => (
          <ScreenCard key={screen.id} screen={screen} />
        ))}
      </ul>

      <div className="journey-stage__actions">
        {nextStageId === undefined ? (
          <a className="journey-btn" href="#screens">Back to Top</a>
        ) : (
          <a className="journey-btn" href={`#stage-${nextStageId}`}>Next Stage</a>
        )}
      </div>
    </section>
  )
}

export default function StageJourney({ groups }) {
  return (
    <ol className="journey" role="list" aria-label="Export journey stages">
      {groups.map(({ stage, items }, i) => (
        <li key={stage.id} className="journey__item">
          <StageSection stage={stage} items={items} nextStageId={groups[i + 1]?.stage.id} />
        </li>
      ))}
    </ol>
  )
}
