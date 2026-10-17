// Stroke icons shared by the app shell and the home launcher.

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  'aria-hidden': 'true',
}

export function GridIcon() {
  return (
    <svg {...stroke} strokeWidth="2" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

export function ChevronLeftIcon() {
  return (
    <svg {...stroke} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export function ChevronRightIcon({ className }) {
  return (
    <svg className={className} {...stroke} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export function MenuIcon() {
  return (
    <svg {...stroke} strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  )
}

export function ArrowLeftIcon() {
  return (
    <svg {...stroke} strokeWidth="2" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

export function ArrowRightIcon({ className }) {
  return (
    <svg className={className} {...stroke} strokeWidth="2" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// Filled icons used by the home hero

export function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="7.4" r="3.4" />
      <circle cx="5.2" cy="9.2" r="2.5" />
      <circle cx="18.8" cy="9.2" r="2.5" />
      <path d="M5.8 19.6c0-3.5 2.8-6.2 6.2-6.2s6.2 2.7 6.2 6.2c0 .5-.4.9-.9.9H6.7c-.5 0-.9-.4-.9-.9z" />
      <path d="M4.3 13c.6 0 1.2.1 1.7.4a7.7 7.7 0 0 0-1.7 5H1.8c-.5 0-.8-.4-.8-.8C1 15.3 2.5 13 4.3 13zM19.7 13c1.8 0 3.3 2.3 3.3 4.6 0 .4-.3.8-.8.8h-2.5a7.7 7.7 0 0 0-1.7-5c.5-.3 1.1-.4 1.7-.4z" />
    </svg>
  )
}

export function BarsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3.5" y="13" width="4.4" height="8" rx="1.2" />
      <rect x="9.8" y="8.5" width="4.4" height="12.5" rx="1.2" />
      <rect x="16.1" y="3.5" width="4.4" height="17.5" rx="1.2" />
    </svg>
  )
}

export function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 1.8 3.8 5v6.1c0 5.1 3.5 9.8 8.2 11.1 4.7-1.3 8.2-6 8.2-11.1V5L12 1.8z" />
      <path fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" d="m8.2 12.1 2.7 2.7 5-5.2" />
    </svg>
  )
}

export function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.6 7.6 7.5 11 12 4.2l4.5 6.8 4.9-3.4-2 10.4H4.6L2.6 7.6z" />
      <rect x="4.6" y="18.9" width="14.8" height="2.3" rx="1" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg {...stroke} strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

// One line icon per screen, picked by the `icon` key in data/screens.js

const clipboardBase = (
  <>
    <path d="M9 4.5H7a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="3" rx="1" />
  </>
)

const fileBase = <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5" />

const screenIcons = {
  qr: (
    <>
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.2" />
      <path d="M14 14h2.8v2.8H14zM20.5 14v.01M20.5 17.3v3.2h-3.2M14 20.5v.01" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18M7 13h7M7 16.5h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5C8 19.3 5 15.5 5 11V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  chart: <path d="M5 20v-3M9 20v-6M13 20v-4M17 20v-8M4 11l5-4 4 3 7-6M16 4h4v4" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clipboard: (
    <>
      {clipboardBase}
      <path d="M9 11h6M9 15h4" />
    </>
  ),
  'clipboard-check': (
    <>
      {clipboardBase}
      <path d="M9 13.5l2 2 4-4" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 4.3 2.8 17.5a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
      <path d="M12 9.5v4M12 17h.01" />
    </>
  ),
  upload: <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3M12 15V4M7.5 8.5 12 4l4.5 4.5" />,
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.3 7 21l5-2.6 5 2.6-1.5-7.7" />
    </>
  ),
  file: (
    <>
      {fileBase}
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  'file-check': (
    <>
      {fileBase}
      <path d="M9 15l2 2 4-4" />
    </>
  ),
  stamp: <path d="M9.5 12.5 9 9.2a3 3 0 1 1 6 0l-.5 3.3M5 17v-2.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V17zM5 21h14" />,
  warehouse: <path d="M3 21V9l9-5 9 5v12M7 21v-8h10v8M7 17h10" />,
  package: <path d="M21 8 12 3 3 8v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8M7.5 5.5l9 5" />,
  flask: <path d="M9 3h6M10 3v6L4.8 18.2A1.8 1.8 0 0 0 6.4 21h11.2a1.8 1.8 0 0 0 1.6-2.8L14 9V3M7 15h10" />,
  tube: <path d="M8.5 3h7M9.5 3v14a2.5 2.5 0 0 0 5 0V3M9.5 12h5" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
    </>
  ),
  pen: <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5zM14 21h7" />,
  scale: <path d="M12 4v17M7 21h10M4 7h16M2.5 15 5 8l2.5 7a2.6 2.6 0 0 1-5 0zM16.5 15 19 8l2.5 7a2.6 2.6 0 0 1-5 0z" />,
  scan: <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M8 9h3v3H8zM13 12h3v3h-3zM8 15h.01M16 9h.01" />,
  truck: (
    <>
      <path d="M14 17V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11h2M14 9h4l3 4v4h-2M9 17h6" />
      <circle cx="7" cy="17.5" r="2" />
      <circle cx="17" cy="17.5" r="2" />
    </>
  ),
  list: <path d="m3 7 2 2 4-4M3 17l2 2 4-4M13 6h8M13 12h8M13 18h8" />,
  ship: (
    <path d="M4 15.5 3 12l9-3.5 9 3.5-1 3.5M6 10.8V6.5A1.5 1.5 0 0 1 7.5 5h9A1.5 1.5 0 0 1 18 6.5v4.3M12 2.5V5M12 8.5V14M2 19.5c1.7 1.3 3.3 1.3 5 0s3.3-1.3 5 0 3.3 1.3 5 0 3.3-1.3 5 0" />
  ),
  banknote: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 9.5v.01M18 14.5v.01" />
    </>
  ),
  trophy: (
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4.5v1.5a3 3 0 0 0 2.8 3M17 6h2.5v1.5a3 3 0 0 1-2.8 3M12 14v4M8 21h8M9.5 21v-1.5A1.5 1.5 0 0 1 11 18h2a1.5 1.5 0 0 1 1.5 1.5V21" />
  ),
}

export function ScreenIcon({ name, className }) {
  return (
    <svg className={className} {...stroke} strokeWidth="1.8" strokeLinejoin="round">
      {screenIcons[name] ?? screenIcons.file}
    </svg>
  )
}
