import { Fragment, useEffect } from 'react'
import headerImg from '../assets/shg/shg-header.webp'
import { SHG_CALCULATORS } from '../data/shgCalculators.js'
import { SHG_ICONS } from '../components/ShgIcons.jsx'
import BackButton from '../components/BackButton.jsx'
import './ShgPage.css'

function Arrow() {
  return (
    <svg viewBox="3 5 17 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

function CalculatorCard({ calculator }) {
  const { lines, description, icon, color, soft, band, href } = calculator
  const Icon = SHG_ICONS[icon]
  // a line is text, or { text, small: true } for a long line set smaller to stay on one line
  const lineText = (line) => (typeof line === 'string' ? line : line.text)
  const name = lines.map(lineText).join(' ')
  const link = (
    <>
      View Details
      <Arrow />
    </>
  )

  return (
    <li className="scard" style={{ '--color': color, '--soft': soft, '--band': band }}>
      <div className="scard__art">{Icon && <Icon />}</div>
      <div className="scard__body">
        <h3 className="scard__title">
          {/* one span per line; the spaces between them keep the title reading as words */}
          {lines.map((line, i) => (
            <Fragment key={lineText(line)}>
              {i > 0 && ' '}
              <span className={typeof line === 'object' && line.small ? 'scard__line--small' : undefined}>{lineText(line)}</span>
            </Fragment>
          ))}
        </h3>
        <p className="scard__text">{description}</p>
        {href ? (
          <a className="scard__link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`View details: ${name} (opens in a new tab)`}>
            {link}
          </a>
        ) : (
          <span className="scard__link">{link}</span>
        )}
      </div>
    </li>
  )
}

export default function ShgPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'SHG Calculators · My Tools'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="shg">
      <header className="shg-hero">
        <img className="shg-hero__photo" src={headerImg} alt="Women of a self help group sitting together outdoors, smiling as they work on a laptop and notebooks" />
        {/* the pale panel on the left, with its curved edge over the photo */}
        <div className="shg-hero__fill" />
        <svg className="shg-hero__panel" viewBox="0 0 830 464" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0H738C762 118 832 222 823 322C819 380 805 430 791 464H0Z" fill="#cdeed8" />
          <path d="M0 0H712C736 115 813 228 821 322C824 372 803 425 785 464H0Z" fill="#e9f8ee" />
          <path d="M0 0H685C705 110 790 230 818 320C828 360 800 420 777 464H0Z" fill="#f4fcf7" />
        </svg>
        <BackButton to="/" label="Back to Home" />
        <div className="shg-hero__text">
          <div className="shg-hero__brand">
            <h1 className="shg-hero__title">SHG</h1>
            <span className="shg-hero__rules" aria-hidden="true" />
          </div>
          <p className="shg-hero__subtitle">
            These financial calculators help SHGs plan savings, estimate loans, calculate interest and EMIs, and make informed financial decisions for stronger and more sustainable growth.
          </p>
        </div>
      </header>

      <section className="shg-tools" aria-labelledby="shg-tools-title">
        <h2 id="shg-tools-title" className="shg-tools__title">
          <span className="shg-tools__title-text">
            <span>SHGs</span> Financial Calculators
          </span>
        </h2>
        <p className="shg-tools__sub">Useful information, tools and support for Self Help Groups and rural collectives.</p>
        <ul className="shg-grid">
          {SHG_CALCULATORS.map((calculator) => (
            <CalculatorCard key={calculator.id} calculator={calculator} />
          ))}
        </ul>
      </section>
    </main>
  )
}
