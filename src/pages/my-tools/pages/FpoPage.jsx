import { Fragment, useEffect } from 'react'
import headerImg from '../assets/fpo/fpo-header.webp'
import { FPO_CALCULATORS } from '../data/fpoCalculators.js'
import { FPO_ICONS } from '../components/FpoIcons.jsx'
import BackButton from '../components/BackButton.jsx'
import './FpoPage.css'

function Arrow() {
  return (
    <svg viewBox="3 5 17 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

function LeafGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 30 46" aria-hidden="true">
      <defs>
        <linearGradient id="fpo-title-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6ccf5a" />
          <stop offset="1" stopColor="#1f8a3e" />
        </linearGradient>
      </defs>
      <path d="M27 2C12 6 2 18 3 32c0 6 2 10 5 12 13-4 21-16 19-42z" fill="url(#fpo-title-leaf)" />
      <path d="M8 43C12 32 18 20 25 7" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CalculatorCard({ calculator, number }) {
  const { lines, description, icon, artSide, accent, tint, soft, href } = calculator
  const Icon = FPO_ICONS[icon]
  // a line is text, or { text, small: true } for a long line set smaller to stay on one line
  const lineText = (line) => (typeof line === 'string' ? line : line.text)
  const name = lines.map(lineText).join(' ')
  const button = (
    <>
      View Details
      <Arrow />
    </>
  )

  return (
    <li className={`fpcard${artSide === 'right' ? ' fpcard--art-right' : ''}`} style={{ '--accent': accent, '--tint': tint, '--soft': soft }}>
      <div className="fpcard__art">{Icon && <Icon />}</div>
      <div className="fpcard__body">
        <h2 className="fpcard__title">
          <span className="fpcard__num">{number}.</span>
          <span className="fpcard__name">
            {/* one span per line; the spaces between them keep the title reading as words */}
            {lines.map((line, i) => (
              <Fragment key={lineText(line)}>
                {i > 0 && ' '}
                <span className={typeof line === 'object' && line.small ? 'fpcard__line--small' : undefined}>{lineText(line)}</span>
              </Fragment>
            ))}
          </span>
        </h2>
        <p className="fpcard__text">{description}</p>
        {href ? (
          <a className="fpcard__btn" href={href} target="_blank" rel="noopener noreferrer" aria-label={`View details: ${name} (opens in a new tab)`}>
            {button}
          </a>
        ) : (
          <span className="fpcard__btn">{button}</span>
        )}
      </div>
    </li>
  )
}

export default function FpoPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'FPO Calculators · My Tools'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="fpo">
      <header className="fpo-hero">
        <img className="fpo-hero__photo" src={headerImg} alt="Smiling farmers of a producer organisation standing together in a green field below the hills" />
        <BackButton to="/" label="Back to Home" />
        <div className="fpo-hero__text">
          <h1 className="fpo-hero__title">
            FPO
            <LeafGlyph className="fpo-hero__leaf" />
            <br />
            <span>Calculators</span>
          </h1>
          <p className="fpo-hero__subtitle">Useful calculators for Farmer Producer Organizations to plan better, reduce costs and increase incomes.</p>
        </div>
      </header>

      <ul className="fpo-grid" aria-label="FPO calculators">
        {FPO_CALCULATORS.map((calculator, index) => (
          <CalculatorCard key={calculator.id} calculator={calculator} number={index + 1} />
        ))}
      </ul>
    </main>
  )
}
