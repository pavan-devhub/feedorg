import { Fragment, useEffect } from 'react'
import { Link } from '../router.jsx'
import headerImg from '../assets/farmer/farmer-header.webp'
import { FARMER_TOOLS } from '../data/farmerTools.js'
import { FARMER_TOOL_ICONS } from '../components/FarmerToolIcons.jsx'
import { LeafMark } from '../components/UserTypeIcons.jsx'
import BackButton from '../components/BackButton.jsx'
import './FarmerPage.css'

function Arrow() {
  return (
    <svg viewBox="3 5 17 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

function ToolCard({ tool, index }) {
  const { lines, description, icon, image, imageAlt, accent, tint, to } = tool
  const Icon = FARMER_TOOL_ICONS[icon]
  // one span per line; the spaces between them keep the title reading as words for screen readers
  const title = lines.map((line, i) => (
    <Fragment key={line}>
      {i > 0 && ' '}
      <span>{line}</span>
    </Fragment>
  ))

  return (
    <li className="tcard" style={{ '--accent': accent, '--tint': tint }}>
      <LeafMark className="tcard__leaf" />
      <span className="tcard__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="tcard__art">{image ? <img src={image} alt={imageAlt} /> : Icon && <Icon />}</div>
      <div className="tcard__body">
        <h3 className="tcard__title">
          {/* with a page to open, the title link covers the whole card */}
          {to ? (
            <Link to={to} state={{ from: '/farmer' }} className="tcard__link">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="tcard__text">{description}</p>
      </div>
      <span className="tcard__arrow" aria-hidden="true">
        <Arrow />
      </span>
    </li>
  )
}

export default function FarmerPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Farmer · My Tools'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="fp">
      <div className="fp__inner">
        <header className="fp-hero">
          <img className="fp-hero__photo" src={headerImg} alt="Smiling farmer holding a bundle of rice in a green field" />
          <div className="fp-hero__text">
            <h1 className="fp-hero__title">Farmer</h1>
            <p className="fp-hero__subtitle">
              Tools &amp; services for farmers to improve productivity, access better markets and get
              the right support at every step.
            </p>
          </div>
          <BackButton to="/" label="Back to Home" />
        </header>

        <section className="fp-tools" aria-labelledby="fp-tools-title">
          <h2 id="fp-tools-title" className="fp-tools__label">
            Explore by tool type
          </h2>
          <ul className="fp-tools__grid">
            {FARMER_TOOLS.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
