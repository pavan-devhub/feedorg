import americasDotsUrl from '../assets/images/americas-dots.svg'
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from './icons.jsx'
import JourneyWheel from './JourneyWheel.jsx'

// Banner over the screen list: title, search and stage filters on the left, the
// journey wheel at the right edge beside a dotted map of the Americas. Art is in design px (2000 × 754).

// Amber pins (head centre) and dashed routes, all between the copy and the wheel (which
// sits at the right edge); two routes run in behind the wheel
const pins = [
  [920, 125],
  [986, 234],
  [1308, 136],
  [1247, 285],
  [1124, 239],
  [1127, 342],
]
const routes = [
  'M917 160Q1110 98 1305 160',
  'M989 263Q1040 335 1124 368',
  'M1381 190Q1260 150 1124 264',
  'M1356 205Q1270 212 1247 310',
  'M1244 310Q1185 240 1127 266',
  'M1244 312Q1166 290 1129 368',
]

function Pin({ x, y }) {
  return (
    <g className="screens-hero__pin" transform={`translate(${x} ${y + 26}) scale(1.5)`}>
      <path d="M0 0C-4.6-7.8-9-12.1-9-17.3a9 9 0 0 1 18 0C9-12.1 4.6-7.8 0 0z" />
      <circle cy="-17.3" r="3.6" />
    </g>
  )
}

function MedalIcon() {
  return (
    <svg className="filter__medal" viewBox="0 0 27 37" aria-hidden="true">
      <defs>
        <radialGradient id="sh-gold" cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset="0.55" stopColor="#fbbd1c" />
          <stop offset="1" stopColor="#ef9a06" />
        </radialGradient>
      </defs>
      <path d="M1.8 1h7.4l5.6 13.4H7.4z" fill="#e8343c" />
      <path d="M25.2 1h-7.4l-5.6 13.4h7.4z" fill="#2457d6" />
      <path d="M5.4 1h2.2l5.4 12.9h-2.2zM21.6 1h-2.2L14 13.9h2.2z" fill="#fff" opacity="0.55" />
      <circle cx="13.5" cy="25.3" r="10.2" fill="url(#sh-gold)" stroke="#f0a10b" strokeWidth="1.2" />
      <circle cx="13.5" cy="25.3" r="7" fill="none" stroke="#fff4c4" strokeWidth="1" opacity="0.8" />
      <path d="M12.2 22.6l2-1.3v8.4" fill="none" stroke="#c46d00" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ScreensHero({ query, onQueryChange, onSearch, filters, filter, onFilterChange, searchRef }) {
  return (
    <div className="screens-hero">
      <div className="screens-hero__inner">
        {/* Dotted trade map: the world grid's Americas, at the same place and scale as the
            whole world would be (its Old World would sit behind the wheel) */}
        <svg className="screens-hero__map" viewBox="0 0 2000 754" aria-hidden="true">
          <image href={americasDotsUrl} x="730" y="35" width="1250" height="560" preserveAspectRatio="none" />
          {routes.map((d) => (
            <path key={d} className="screens-hero__route" d={d} />
          ))}
          {pins.map(([x, y]) => (
            <Pin key={`${x}-${y}`} x={x} y={y} />
          ))}
        </svg>

        <div className="screens-hero__content">
          <h2 className="screens-hero__title">
            <span className="screens-hero__title-all">All</span>{' '}
            <span className="screens-hero__title-stages">Stages</span>
          </h2>
          <p className="screens-hero__lead">
            Click a file to open it. Use
            <span className="screens-hero__keys">
              <kbd><ArrowLeftIcon /><span className="sr-only">Left arrow</span></kbd>
              <kbd><ArrowRightIcon /><span className="sr-only">Right arrow</span></kbd>
            </span>
            inside a step <br />
            to move through the journey.
          </p>

          <label className="search">
            <SearchIcon />
            <span className="sr-only">Search stages and screens</span>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search a stage or step…   e.g. Stage 1, Farm Ready, 8a"
              autoComplete="off"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  onQueryChange('')
                  e.currentTarget.blur()
                } else if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  e.preventDefault()
                  onSearch()
                  // on touch screens, put the keyboard away so the results are in view
                  if (window.matchMedia('(pointer: coarse)').matches) e.currentTarget.blur()
                }
              }}
            />
          </label>

          <div className="filters" role="toolbar" aria-label="Filter by stage">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                className={['filter', f.className, filter === f.value && 'is-active'].filter(Boolean).join(' ')}
                aria-pressed={filter === f.value}
                onClick={() => onFilterChange(f.value)}
              >
                {f.medal && <MedalIcon />}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <JourneyWheel className="screens-hero__wheel" />
      </div>
    </div>
  )
}
