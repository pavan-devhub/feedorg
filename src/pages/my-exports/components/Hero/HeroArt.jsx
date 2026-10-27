/* Inline illustrations for the hero: pill mark and phase icons.
   Colours come from the --art-* tokens in Hero.css so both themes work. */

const svgProps = { 'aria-hidden': true, focusable: 'false' }

export function SproutMark() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <path d="M12 21.5V11" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M12 13.5C12 9 14.6 6.3 19.6 5.8c0 5-2.8 7.7-7.6 7.7z" fill="currentColor" />
      <path d="M12 16.5c0-4-2.4-6.6-7-7 0 4.5 2.5 7 7 7z" fill="currentColor" />
      <path d="M12 10.5c-1.3-2.2-1-4.9.9-7 1.4 2.3 1.1 4.9-.9 7z" fill="var(--art-light)" />
    </svg>
  )
}

function GlobeLeaf() {
  return (
    <svg viewBox="0 0 48 48" {...svgProps}>
      <g fill="none" stroke="var(--art-ink)" strokeWidth="2.6" strokeLinecap="round">
        <circle cx="21" cy="23" r="14" />
        <path d="M21 9c-4.5 4-6.5 9-6.5 14s2 10 6.5 14M21 9c4.5 4 6.5 9 6.5 14s-2 10-6.5 14M7 23h28M9.5 15.5h23M9.5 30.5h23" />
      </g>
      <path d="M26 41c-1-9 4-17 17-21 1 11-6 19-17 21z" fill="var(--art-leaf)" stroke="var(--hero-tile)" strokeWidth="2" />
      <path d="M35 33c0-6 3-10 9-12-.3 6-3.6 10.6-9 12z" fill="var(--art-sun)" opacity="0.85" />
      <path d="M28 39c3-6 7-10 12-14" fill="none" stroke="var(--art-ink)" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}

function GrowthChart() {
  return (
    <svg viewBox="0 0 48 48" {...svgProps}>
      <rect x="8" y="27" width="8" height="13" rx="1.5" fill="var(--art-ink)" />
      <rect x="20" y="21" width="8" height="19" rx="1.5" fill="var(--art-mid)" />
      <rect x="32" y="15" width="8" height="25" rx="1.5" fill="var(--art-light)" />
      <g fill="none" stroke="var(--art-sun)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21l10-8 7 5 16-11" />
        <path d="M33 6.5h7.5V14" />
      </g>
    </svg>
  )
}

function DocCheck() {
  return (
    <svg viewBox="0 0 48 48" {...svgProps}>
      <g stroke="var(--art-ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5.5h15.5l9 9V37a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V8.5a3 3 0 0 1 3-3z" fill="var(--hero-tile-hi)" />
        <path d="M27.5 5.5v9h9M15 19h12M15 25h15M15 31h8" fill="none" />
      </g>
      <circle cx="35" cy="35" r="9.5" fill="var(--art-ink)" stroke="var(--hero-tile)" strokeWidth="2.5" />
      <path d="M30.8 35.2l3 3 5.4-6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShieldTick() {
  return (
    <svg viewBox="0 0 48 48" {...svgProps}>
      <path d="M24 4.5l15.5 5.6V22c0 10-6.6 18-15.5 21.5C15.1 40 8.5 32 8.5 22V10.1z" fill="var(--art-ink)" />
      <path d="M24 4.5L8.5 10.1V22c0 10 6.6 18 15.5 21.5z" fill="var(--art-mid)" />
      <path d="M16.5 23.5l5.5 5.5 10-11" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const PHASE_ART = { 1: GlobeLeaf, 2: GrowthChart, 3: DocCheck, 4: ShieldTick }

export function PhaseArt({ id }) {
  const Art = PHASE_ART[id]
  return <Art />
}
