// Small solid icons for the benefit pills (24×24, drawn in currentColor).
// `hub` is the colour used to punch holes (wheel hubs, windows) so they read on the dark badge.

const HUB = '#123d2c'

export function SproutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11.2 20.5v-6.1C7.4 14.3 4.6 12 4.2 7.6c4.3.1 7 2.4 7.6 5.7.6-4.4 3.6-7.6 8.2-8-.1 5.5-3.2 8.8-7.2 9.1v6.1z"
      />
    </svg>
  )
}

export function TractorIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M4.5 5.5h6.3l1.4 5.2h6.1c1 0 1.7.8 1.7 1.7v3.1H2.8V7.2c0-1 .7-1.7 1.7-1.7z" />
      <rect x="15.4" y="6.4" width="1.6" height="4.6" rx=".6" fill="currentColor" />
      <path fill={HUB} d="M5.2 7.3h4.2l.9 3.4H5.2z" />
      <circle cx="7.2" cy="16.4" r="3.9" fill="currentColor" />
      <circle cx="7.2" cy="16.4" r="1.5" fill={HUB} />
      <circle cx="17.6" cy="17.6" r="2.7" fill="currentColor" />
      <circle cx="17.6" cy="17.6" r="1" fill={HUB} />
    </svg>
  )
}

export function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="5" width="12.5" height="11" rx="1.4" fill="currentColor" />
      <path fill="currentColor" d="M15 8.4h3.3c.4 0 .8.2 1 .5l2.7 3.6c.2.3.3.6.3.9V16h-7.3z" />
      <path fill={HUB} d="M16.3 9.8h1.8l1.9 2.6h-3.7z" />
      <circle cx="6.4" cy="17.4" r="2.5" fill="currentColor" stroke={HUB} strokeWidth="1.2" />
      <circle cx="17.8" cy="17.4" r="2.5" fill="currentColor" stroke={HUB} strokeWidth="1.2" />
    </svg>
  )
}

export function HealthIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.6 3h4.8c.7 0 1.2.5 1.2 1.2v4.2h4.2c.7 0 1.2.5 1.2 1.2v4.8c0 .7-.5 1.2-1.2 1.2h-4.2v4.2c0 .7-.5 1.2-1.2 1.2H9.6c-.7 0-1.2-.5-1.2-1.2v-4.2H4.2c-.7 0-1.2-.5-1.2-1.2V9.6c0-.7.5-1.2 1.2-1.2h4.2V4.2c0-.7.5-1.2 1.2-1.2z"
      />
    </svg>
  )
}

export function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 3.8 1.2 9 12 14.2l8.4-4v5.6h1.6V9z" />
      <path fill="currentColor" d="M5.6 12.4v4c0 1.9 2.9 3.4 6.4 3.4s6.4-1.5 6.4-3.4v-4L12 15.5z" />
    </svg>
  )
}

export function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 2.6 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9z"
      />
    </svg>
  )
}
