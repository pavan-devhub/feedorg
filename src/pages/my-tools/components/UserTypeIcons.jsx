// Illustrations for the home page "Explore all tools" cards, drawn as SVG so they stay
// crisp at any size. Each fills a 96 x 80 box.

// gear outline: alternating outer/inner points around a circle
function gearPath(cx, cy, outer, inner, teeth) {
  const pts = []
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a0 = (Math.PI * 2 * i) / (teeth * 2) - Math.PI / (teeth * 4)
    const a1 = a0 + Math.PI / (teeth * 2)
    pts.push(`${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)}`, `${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)}`)
  }
  return `M${pts.join('L')}Z`
}

export function FarmerIcon() {
  return (
    <svg viewBox="0 0 96 80" aria-hidden="true">
      {/* wheat */}
      <g stroke="#8d9b3a" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M23 78 C22 64 23 50 27 34" />
        {[38, 45, 52, 59].map((y, i) => (
          <g key={y}>
            <ellipse cx={27 - i * 0.6 - 4} cy={y} rx="2.6" ry="4.6" transform={`rotate(-28 ${23 - i * 0.6} ${y})`} />
            <ellipse cx={27 - i * 0.6 + 3.5} cy={y - 2} rx="2.6" ry="4.6" transform={`rotate(28 ${30 - i * 0.6} ${y - 2})`} />
          </g>
        ))}
        <ellipse cx="28" cy="30" rx="2.4" ry="4.4" />
      </g>
      {/* turban */}
      <path d="M38 27 C36 14 45 5 56 5 C67 5 76 14 74 27 Z" fill="#45a35a" />
      <path d="M40 18 C48 13 63 12 72 17 M38.5 23 C48 18 64 18 73.5 22" stroke="#2f7d43" strokeWidth="1.6" fill="none" />
      {/* face and body */}
      <g stroke="#2f8a4f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M41 27 C41 40 47 48 56 48 C65 48 71 40 71 27" />
        <path d="M49 38 C52 36 54 36 56 37.5 C58 36 60 36 63 38" />
        <path d="M50 47 L50 54 M62 47 L62 54" />
        <path d="M34 78 C34 63 42 56 56 56 C70 56 78 63 78 78" />
        <path d="M50 56 L56 64 L62 56" />
      </g>
    </svg>
  )
}

export function FpoIcon() {
  return (
    <svg viewBox="0 0 96 80" aria-hidden="true">
      <defs>
        <linearGradient id="fpo-people" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbab4f" />
          <stop offset="1" stopColor="#ec6d1d" />
        </linearGradient>
      </defs>
      <path d="M20 50 A28 28 0 0 1 76 50" stroke="#f39a3a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g fill="url(#fpo-people)">
        <circle cx="34" cy="34" r="5.5" />
        <path d="M24 60 C24 48 28 42 34 42 C40 42 44 48 44 60 Z" />
        <circle cx="62" cy="34" r="5.5" />
        <path d="M52 60 C52 48 56 42 62 42 C68 42 72 48 72 60 Z" />
        <circle cx="48" cy="29" r="6.5" stroke="#fff" strokeWidth="1.5" />
        <path d="M36 62 C36 46 41 38 48 38 C55 38 60 46 60 62 Z" stroke="#fff" strokeWidth="1.5" />
      </g>
      <path d="M14 64 C18 54 28 52 34 58 C28 66 20 68 14 64 Z" fill="#6cb34a" />
      <path d="M50 70 C56 54 72 48 84 54 C78 70 62 76 50 70 Z" fill="#3c9b3f" />
      <path d="M53 68 C62 62 72 57 81 55" stroke="#2c7a31" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function MsmeIcon() {
  return (
    <svg viewBox="0 0 96 80" aria-hidden="true">
      <g stroke="#2563eb" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" fill="none">
        <path d="M26 12 H66 L72 22 H20 Z" />
        <path d="M20 22 V27 C20 31 27 31 27 27 C27 31 34 31 34 27 C34 31 41 31 41 27 C41 31 48 31 48 27 C48 31 55 31 55 27 C55 31 62 31 62 27 C62 31 69 31 69 27 C69 31 72 30 72 27 V22" />
        <path d="M33 12 L30 22 M46 12 V22 M59 12 L62 22" />
        <path d="M24 32 V68 H56" />
        <path d="M68 32 V46" />
        <rect x="31" y="44" width="11" height="24" />
        <rect x="48" y="40" width="13" height="10" />
        <path d="M18 68 H58" />
      </g>
      <path d={gearPath(70, 60, 12, 9, 8)} fill="#2563eb" />
      <circle cx="70" cy="60" r="4.2" fill="#fff" />
    </svg>
  )
}

export function ShgIcon() {
  return (
    <svg viewBox="0 0 96 80" aria-hidden="true">
      <defs>
        <linearGradient id="shg-people" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b56cf4" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="shg-people-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c48ff6" />
          <stop offset="1" stopColor="#9a5cf0" />
        </linearGradient>
      </defs>
      <g fill="url(#shg-people-back)">
        <circle cx="29" cy="27" r="6.5" />
        <path d="M17 62 C17 46 22 38 29 38 C36 38 41 46 41 62 Z" />
        <circle cx="67" cy="27" r="6.5" />
        <path d="M55 62 C55 46 60 38 67 38 C74 38 79 46 79 62 Z" />
      </g>
      <g fill="url(#shg-people)" stroke="#fff" strokeWidth="1.5">
        <circle cx="48" cy="20" r="8" />
        <path d="M33 64 C33 42 39 32 48 32 C57 32 63 42 63 64 Z" />
      </g>
      <path d="M48 76 V62" stroke="#2f8f3e" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M48 66 C38 66 33 58 34 50 C43 50 49 56 48 66 Z" fill="#5cb85c" />
      <path d="M48 66 C58 66 63 58 62 50 C53 50 47 56 48 66 Z" fill="#33a047" />
    </svg>
  )
}

export function ExporterIcon() {
  return (
    <svg viewBox="0 0 96 80" aria-hidden="true">
      {/* containers */}
      <rect x="44" y="30" width="13" height="12" rx="1" fill="#f59e0b" />
      <rect x="58" y="30" width="13" height="12" rx="1" fill="#fbbf24" />
      <rect x="51" y="18" width="13" height="11" rx="1" fill="#f97316" />
      <rect x="65" y="20" width="12" height="9" rx="1" fill="#fbbf24" />
      <rect x="72" y="32" width="11" height="10" rx="1" fill="#f97316" />
      {/* bridge */}
      <rect x="25" y="26" width="13" height="16" rx="1.5" fill="#1d4ed8" />
      <rect x="29" y="16" width="5" height="10" fill="#1d4ed8" />
      <rect x="28" y="30" width="3" height="3" fill="#fff" />
      <rect x="33" y="30" width="3" height="3" fill="#fff" />
      {/* hull */}
      <path d="M12 43 H88 L80 60 H20 Z" fill="#1e63d6" />
      <path d="M17 50 H83" stroke="#fff" strokeWidth="2" />
      {/* waves */}
      <g stroke="#2b7de9" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M10 66 Q16 62 22 66 T34 66 T46 66 T58 66 T70 66 T82 66 T90 66" />
        <path d="M16 73 Q22 69 28 73 T40 73 T52 73 T64 73 T76 73 T84 73" opacity="0.6" />
      </g>
    </svg>
  )
}

// faint leaf drawn in each card's top-right corner (uses currentColor)
export function LeafMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 60 60" aria-hidden="true">
      <path d="M56 4 C34 4 12 14 8 38 C6 48 10 54 14 56 C38 54 54 36 56 4 Z" fill="currentColor" />
      <path d="M14 54 C24 40 38 24 54 8" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export const USER_TYPE_ICONS = {
  farmer: FarmerIcon,
  fpo: FpoIcon,
  msme: MsmeIcon,
  shg: ShgIcon,
  exporter: ExporterIcon,
}
