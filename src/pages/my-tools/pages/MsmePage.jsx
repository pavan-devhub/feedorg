import { useEffect } from 'react'
import headerImg from '../assets/msme/msme-header.webp'
import { MSME_CALCULATORS } from '../data/msmeCalculators.js'
import { MSME_ICONS } from '../components/MsmeIcons.jsx'
import BackButton from '../components/BackButton.jsx'
import './MsmePage.css'

function Arrow() {
  return (
    <svg viewBox="3 5 17 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

function TitleLeaf({ className }) {
  return (
    <svg className={className} viewBox="0 0 70 68" aria-hidden="true">
      <defs>
        <linearGradient id="msme-title-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7dd35a" />
          <stop offset="1" stopColor="#1f8a3e" />
        </linearGradient>
      </defs>
      <path d="M6 66C10 52 14 42 22 34" fill="none" stroke="#2f8a3a" strokeWidth="3" strokeLinecap="round" />
      <path d="M21 36C8 32 2 20 6 4c14 4 20 16 15 32z" fill="url(#msme-title-leaf)" />
      <path d="M22 34C30 18 48 12 68 16 62 34 44 42 22 34z" fill="url(#msme-title-leaf)" />
      <path d="M24 33C36 26 48 22 62 19" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// picture at the top on a band of the card's colour, then the title, text and link
function CalculatorCard({ calculator }) {
  const { lines, description, icon, accent, soft, strong, href } = calculator
  const Icon = MSME_ICONS[icon]
  const name = lines.join(' ')
  const link = (
    <>
      View Details
      <Arrow />
    </>
  )

  return (
    <li className="mcard" style={{ '--accent': accent, '--soft': soft, '--strong': strong }}>
      <div className="mcard__art">{Icon && <Icon />}</div>
      <div className="mcard__body">
        <h2 className="mcard__title">{name}</h2>
        <p className="mcard__text">{description}</p>
        {href ? (
          <a className="mcard__link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`View details: ${name} (opens in a new tab)`}>
            {link}
          </a>
        ) : (
          <span className="mcard__link">{link}</span>
        )}
      </div>
    </li>
  )
}

export default function MsmePage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'MSME Calculators · My Tools'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="msme">
      <header className="msme-hero">
        <img className="msme-hero__photo" src={headerImg} alt="Workers sorting fresh vegetables into crates at an agri-processing unit with grain silos, beside green fields at sunrise" />
        <BackButton to="/" label="Back to Home" />
        <div className="msme-hero__text">
          <h1 className="msme-hero__title">MSME</h1>
          <TitleLeaf className="msme-hero__leaf" />
          <p className="msme-hero__subtitle">
            Support for agri-based{' '}
            <br />
            micro, small and medium enterprises
          </p>
          <span className="msme-hero__stripe" aria-hidden="true" />
          <p className="msme-hero__note">
            Empowering agri-entrepreneurs for a stronger,{' '}
            <br />
            more sustainable rural economy.
          </p>
        </div>
      </header>

      <ul className="msme-grid" aria-label="MSME calculators">
        {MSME_CALCULATORS.map((calculator) => (
          <CalculatorCard key={calculator.id} calculator={calculator} />
        ))}
      </ul>
    </main>
  )
}
