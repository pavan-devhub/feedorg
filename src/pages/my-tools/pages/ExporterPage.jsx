import { useEffect } from 'react'
import bgImg from '../assets/exporter/exporter-bg.webp'
import { EXPORTER_TOOLS } from '../data/exporterTools.js'
import { EXPORTER_ILLUSTRATIONS } from '../components/ExporterIcons.jsx'
import BackButton from '../components/BackButton.jsx'
import './ExporterPage.css'

function Arrow() {
  return (
    <svg viewBox="3 5 17 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

function ToolCard({ tool }) {
  const { id, label, title, tools, description, illustration, href } = tool
  const Illustration = EXPORTER_ILLUSTRATIONS[illustration]

  return (
    <li className="ex-card" aria-labelledby={`${id}-title`}>
      <p className="ex-card__label">{label}</p>
      <div className="ex-card__art">{Illustration && <Illustration />}</div>
      <h2 id={`${id}-title`} className="ex-card__title">
        {title}
      </h2>
      {tools && <p className="ex-card__tools">{tools}</p>}
      <p className="ex-card__text">{description}</p>
      <a className="ex-card__btn" href={href} target="_blank" rel="noopener noreferrer" aria-label={`View details: ${title} (opens in a new tab)`}>
        View Details
        <Arrow />
      </a>
    </li>
  )
}

export default function ExporterPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Exporter Calculators · My Tools'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="ex">
      <img className="ex__bg" src={bgImg} alt="" />
      <BackButton to="/" label="Back to Home" />

      <div className="ex__inner">
        <h1 className="ex__title">
          Exporter
          <br />
          <span>Calculators</span>
        </h1>
        <p className="ex__subtitle">Quick and accurate calculators to plan, calculate and grow your export business.</p>

        <ul className="ex-cards" aria-label="Exporter tools">
          {EXPORTER_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </ul>
      </div>
    </main>
  )
}
