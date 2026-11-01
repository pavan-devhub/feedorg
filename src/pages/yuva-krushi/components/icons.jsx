// Inline SVG icons so the page has no icon-library dependency.

export function LeafSprig({ className }) {
  return (
    <svg className={className} viewBox="0 0 60 52" aria-hidden="true">
      <defs>
        <linearGradient id="yk-sprig-a" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#a8e05c" />
          <stop offset="0.55" stopColor="#5eab04" />
          <stop offset="1" stopColor="#1f8f00" />
        </linearGradient>
        <linearGradient id="yk-sprig-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9db87" />
          <stop offset="0.5" stopColor="#6cb81e" />
          <stop offset="1" stopColor="#1f8f00" />
        </linearGradient>
      </defs>
      <path d="M21 51C4 42 0 20 9 2c15 11 20 32 12 49z" fill="url(#yk-sprig-a)" />
      <path d="M21 51c5-18 19-27 37-25-6 15-21 26-37 25z" fill="url(#yk-sprig-b)" />
      <path d="M21 50Q15 27 9.5 5M21 50q16-14 34-23" stroke="#d6f5b8" strokeWidth="1.2" fill="none" opacity="0.85" />
    </svg>
  )
}

export function SmallLeaf({ className }) {
  return (
    <svg className={className} viewBox="0 0 26 16" aria-hidden="true">
      <path d="M2 15C5 6 13 1 25 1.5 21 10 13 15.5 2 15z" fill="#4fb22c" />
      <path d="M3 14.5C9 10 15 6 23 2.5" stroke="#bdeb9a" strokeWidth="1" fill="none" />
    </svg>
  )
}

export function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 20.6C2.4 14.6 5.4 4.8 19 1.8c1.8 10.4-2.2 17.6-11 18.8z" fill="currentColor" />
      <path d="M8 20.6l-1.6 2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.3 19.2C10.2 13.6 13 9 16.6 5.4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.4" />
      <path d="M12 2.3v2.4M12 19.3v2.4M2.3 12h2.4M19.3 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M5.1 18.9l1.7-1.7M17.2 6.8l1.7-1.7" />
    </svg>
  )
}

export function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8.3" cy="8.2" r="3.1" />
      <circle cx="16" cy="8.2" r="3.1" />
      <path d="M2.6 19.4c0-3.3 2.6-5.6 5.7-5.6s5.7 2.3 5.7 5.6" />
      <path d="M14 14.1c.6-.2 1.3-.3 2-.3 3.1 0 5.4 2.3 5.4 5.6" />
    </svg>
  )
}

export function ArrowRightIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.2 6.5h13.3M9.2 1.3l5.3 5.2-5.3 5.2" />
    </svg>
  )
}

export function TargetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.6 10.6a8.8 8.8 0 1 1-7.2-7.2" />
      <path d="M16.4 11.4a4.5 4.5 0 1 1-3.8-3.8" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
      <path d="M12 12l7.4-7.4M19.4 4.6l.3-2.5M19.4 4.6l2.5-.3" />
    </svg>
  )
}

export function BulbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.6 16.2c-.2-1.9-2.6-3-2.6-5.7a5 5 0 0 1 10 0c0 2.7-2.4 3.8-2.6 5.7z" />
      <path d="M9.8 18.7h4.4M10.6 21h2.8" />
      <path d="M12 1.6v1.6M4.8 4.3l1.1 1.1M19.2 4.3l-1.1 1.1M2 10.5h1.6M20.4 10.5H22M4.8 16.7l1.1-1.1M19.2 16.7l-1.1-1.1" />
    </svg>
  )
}

// More topic detail icons. The star, puzzle and signpost paths are adapted
// from Lucide (ISC licence).

export function TrendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  )
}

export function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  )
}

export function PuzzleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  )
}

export function SignpostIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v3M12 13v8" />
      <path d="M18.5 13h-13L2 9.5 5.5 6h13L22 9.5z" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5.5 12.5l4.2 4.2L18.5 7.8" />
    </svg>
  )
}

// Solid farm icons for the "Your idea belongs here" banner. They spread extra
// props onto the <svg> so they can be placed inside the banner's own SVG.

export function TractorIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M4.5 4h8.5l1.5 5.5H21V12H3V9.5h1.5zm1.9 1.8v3.7h6.2l-1-3.7z" />
      <rect x="15.5" y="5" width="1.5" height="4.5" rx="0.6" />
      <circle cx="7" cy="16.6" r="3.9" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="7" cy="16.6" r="1.3" />
      <circle cx="17.6" cy="16.9" r="3.4" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="17.6" cy="16.9" r="1.1" />
    </svg>
  )
}

export function SeedlingIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 21.5c1.4-3.3 4.9-5.2 9-5.2s7.6 1.9 9 5.2z" />
      <path d="M11.2 17v-7h1.6v7z" />
      <path d="M11.4 11.4C8 12 4.6 10.3 3.8 6.1c3.9-.8 7.4 1.1 7.6 5.3z" />
      <path d="M12.6 9.4c.2-4.3 3.6-6.9 7.9-6.3-.4 4.4-3.8 6.8-7.9 6.3z" />
    </svg>
  )
}

export function WheatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.5 21L17.6 4.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <ellipse cx="9.5" cy="12.6" rx="1.5" ry="2.85" transform="rotate(8.7 9.5 12.6)" />
      <ellipse cx="11.6" cy="9.9" rx="1.5" ry="2.85" transform="rotate(8.7 11.6 9.9)" />
      <ellipse cx="13.6" cy="7.1" rx="1.5" ry="2.85" transform="rotate(8.7 13.6 7.1)" />
      <ellipse cx="12.4" cy="14.8" rx="1.5" ry="2.85" transform="rotate(64.7 12.4 14.8)" />
      <ellipse cx="14.4" cy="12" rx="1.5" ry="2.85" transform="rotate(64.7 14.4 12)" />
      <ellipse cx="16.5" cy="9.3" rx="1.5" ry="2.85" transform="rotate(64.7 16.5 9.3)" />
      <ellipse cx="17.5" cy="4.6" rx="1.3" ry="2.6" transform="rotate(36.7 17.5 4.6)" />
      <path d="M7.4 18.6C4.6 18.8 2.6 17.4 1.9 15c2.7-.5 4.8.8 5.5 3.6z" />
    </svg>
  )
}

export function IrrigationIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2c2.9 3.6 4.4 6.1 4.4 8.1a4.4 4.4 0 0 1-8.8 0C7.6 8.1 9.1 5.6 12 2z" />
      <path
        d="M12 15.2V22M12 17.4c-3 .2-5.6 1.7-7.5 4.3M12 17.4c3 .2 5.6 1.7 7.5 4.3M12 19.2c-1.6.4-3 1.3-3.9 2.8M12 19.2c1.6.4 3 1.3 3.9 2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}
