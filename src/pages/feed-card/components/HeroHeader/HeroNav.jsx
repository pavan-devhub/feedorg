import { useRef } from 'react'
import { SECTIONS } from '../../sections.js'

const INK = '#2b2b2b'

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="4" width="21" height="16" rx="2.6" fill="currentColor" />
      <rect x="1.5" y="7.6" width="21" height="2.8" fill={INK} />
      <rect x="4" y="13.4" width="7" height="1.9" rx=".95" fill={INK} />
      <rect x="4" y="16.2" width="4.4" height="1.9" rx=".95" fill={INK} />
      <rect x="15.4" y="16.2" width="4.6" height="1.9" rx=".95" fill={INK} />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        d="M12 7.4C10.9 4.6 8.6 3 7.2 3.9c-1.4.9-.6 3.2 1.6 3.5H12m0 0c1.1-2.8 3.4-4.4 4.8-3.5 1.4.9.6 3.2-1.6 3.5H12"
      />
      <rect x="2.5" y="8" width="19" height="4.6" rx="1.1" fill="currentColor" />
      <rect x="4" y="13.6" width="16" height="7.6" rx="1.1" fill="currentColor" />
      <rect x="10.9" y="8" width="2.2" height="13.2" fill={INK} />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7" r="3.3" fill="currentColor" />
      <circle cx="5.2" cy="8.6" r="2.4" fill="currentColor" />
      <circle cx="18.8" cy="8.6" r="2.4" fill="currentColor" />
      <path fill="currentColor" d="M6.3 19.6c0-3.6 2.6-6.4 5.7-6.4s5.7 2.8 5.7 6.4c0 .7-.5 1.2-1.2 1.2H7.5c-.7 0-1.2-.5-1.2-1.2z" />
      <path fill="currentColor" d="M5.3 18.9H2.4c-.6 0-1-.4-1-1 0-2.8 1.7-5 3.8-5 .9 0 1.7.3 2.3.9-1.3 1.3-2.1 3.1-2.2 5.1z" />
      <path fill="currentColor" d="M18.7 18.9h2.9c.6 0 1-.4 1-1 0-2.8-1.7-5-3.8-5-.9 0-1.7.3-2.3.9 1.3 1.3 2.1 3.1 2.2 5.1z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m9 5.5 6.5 6.5L9 18.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ICONS = {
  'what-is-feed-card': CardIcon,
  benefits: GiftIcon,
  beneficiaries: UsersIcon,
}

// Tabs that switch the info panel below the header; the selected one gets the green glow.
// Click selects and scrolls to the panel; arrow keys move between tabs without scrolling.
export default function HeroNav({ active, onSelect }) {
  const tabRefs = useRef([])

  function onKeyDown(event, index) {
    const last = SECTIONS.length - 1
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    onSelect(SECTIONS[next].id, { scroll: false })
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="hero-nav" role="tablist" aria-label="Explore FEED CARD">
      {SECTIONS.map(({ id, eyebrow, title, text }, i) => {
        const Icon = ICONS[id]
        const selected = active === id
        return (
          <button
            key={id}
            ref={(el) => (tabRefs.current[i] = el)}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-selected={selected}
            aria-controls={id}
            tabIndex={selected ? 0 : -1}
            className={`hero-nav__link${selected ? ' fc-is-active' : ''}`}
            onClick={() => onSelect(id)}
            onKeyDown={(event) => onKeyDown(event, i)}
            style={{ '--i': i }}
          >
            <span className="hero-nav__icon">
              <Icon />
            </span>
            <span className="hero-nav__body">
              <span className="hero-nav__title">
                {eyebrow}
                <br />
                {title}
              </span>
              <span className="hero-nav__text">{text}</span>
            </span>
            <span className="hero-nav__arrow">
              <ChevronIcon />
            </span>
          </button>
        )
      })}
    </div>
  )
}
