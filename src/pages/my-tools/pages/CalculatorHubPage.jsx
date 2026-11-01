import { Fragment, useEffect } from 'react'
import { Link } from '../router.jsx'
import BackButton from '../components/BackButton.jsx'
import './CalculatorHubPage.css'

function Arrow() {
  return (
    <svg viewBox="3 5 17 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

function CalculatorCard({ calculator, icons, path }) {
  const { lines, description, icon, image, imageAlt, accent, tint, to, href } = calculator
  const Icon = icons[icon]
  const button = (
    <>
      View Details
      <Arrow />
    </>
  )

  // a website opens in a new tab; a page of this site opens in place
  let action = <span className="hcard__btn">{button}</span>
  if (href) {
    action = (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hcard__btn" aria-label={`View details: ${lines.join(' ')} (opens in a new tab)`}>
        {button}
      </a>
    )
  } else if (to) {
    action = (
      <Link to={to} state={{ from: path }} className="hcard__btn">
        {button}
      </Link>
    )
  }

  return (
    <li className="hcard" style={{ '--accent': accent, '--tint': tint }}>
      <div className="hcard__art">{image ? <img src={image} alt={imageAlt} /> : Icon && <Icon />}</div>
      <h2 className="hcard__title">
        {/* one span per line; the spaces between them keep the title reading as words */}
        {lines.map((line, i) => (
          <Fragment key={line}>
            {i > 0 && ' '}
            <span>{line}</span>
          </Fragment>
        ))}
      </h2>
      <p className="hcard__text">{description}</p>
      {action}
    </li>
  )
}

// The green waves in the bottom-left corner of the picture panel
function Wave() {
  return (
    <svg className="hub-hero__wave" viewBox="0 0 650 160" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 2C60 4 110 26 180 68C250 110 310 144 395 160H0Z" fill="#abc7b9" />
      <path d="M0 27C50 39 100 66 160 104C215 134 265 150 340 160H0Z" fill="url(#hub-wave)" />
      <defs>
        <linearGradient id="hub-wave" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f7766" />
          <stop offset="1" stopColor="#2f6a57" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/*
 * A page of calculator cards with a picture panel on the left.
 *   path, documentTitle  - where the page lives and the browser tab title
 *   back                 - { to, label } for the "Back to ..." button
 *   tagIcon, tagWords    - the little pill above the title, e.g. ['Plan', 'Calculate', 'Grow']
 *   title, subtitle      - title lines and the text under them; subtitleWidth (design px) sets
 *                          where the subtitle wraps
 *   image, imageAlt      - the panel's photo (covers the panel), haze 'strong' or 'soft', wave
 *   cards, icons         - the cards (see data/financialCalculators.js) and their illustrations
 *   centerLastRow        - centre a shorter last row (otherwise it starts at the left)
 *   artHeight            - picture row height in design px (the card's top padding and the gap
 *                          under the picture included); cards keep this size at the top instead
 *                          of sharing the panel's height between the rows
 */
export default function CalculatorHubPage({ path, documentTitle, back, tagIcon, tagWords, title, subtitle, subtitleWidth, image, imageAlt, haze = 'strong', wave = false, cards, icons, centerLastRow = true, artHeight, listLabel }) {
  const gridClass = ['hub-grid', centerLastRow && 'hub-grid--centered', artHeight && 'hub-grid--fixed-art'].filter(Boolean).join(' ')
  const gridStyle = artHeight ? { '--art-height': artHeight } : undefined

  useEffect(() => {
    const previous = document.title
    document.title = documentTitle
    return () => {
      document.title = previous
    }
  }, [documentTitle])

  return (
    <main className="hub">
      <div className="hub__inner">
        <header className={`hub-hero hub-hero--haze-${haze}`} style={subtitleWidth ? { '--subtitle-width': subtitleWidth } : undefined}>
          <img className="hub-hero__photo" src={image} alt={imageAlt} />
          {wave && <Wave />}
          <BackButton to={back.to} label={back.label} />
          <div className="hub-hero__text">
            <p className="hub-hero__tag">
              <span className="hub-hero__tag-icon">{tagIcon}</span>
              <span className="hub-hero__tag-words">
                {tagWords.map((word, i) => (
                  <Fragment key={word}>
                    {i > 0 && (
                      <>
                        {' '}
                        <i aria-hidden="true">•</i>{' '}
                      </>
                    )}
                    {word}
                  </Fragment>
                ))}
              </span>
            </p>
            <div className="hub-hero__heading">
              <h1 className="hub-hero__title">
                {title.map((line, i) => (
                  <Fragment key={line}>
                    {i > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </h1>
              <p className="hub-hero__subtitle">{subtitle}</p>
            </div>
          </div>
        </header>

        <ul className={gridClass} style={gridStyle} aria-label={listLabel}>
          {cards.map((calculator) => (
            <CalculatorCard key={calculator.id} calculator={calculator} icons={icons} path={path} />
          ))}
        </ul>
      </div>
    </main>
  )
}
