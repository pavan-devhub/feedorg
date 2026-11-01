// The illustration on the Exporter Calculators card, drawn as SVG so it stays crisp at any size:
// a globe behind an export checklist, a calculator, a rupee coin, containers, a rising chart and a
// cargo ship, on a pale blue panel. Fills a 300 x 205 box.

import { Container } from './IllustrationParts.jsx'

export function ExportCalculatorsIllustration() {
  const keys = []
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const last = row === 2 && col === 3
      keys.push(<rect key={`${row}${col}`} x={142 + col * 11} y={135 + row * 11} width="8.5" height="8" rx="1.6" fill={last ? '#f6a01a' : '#b9d6ee'} />)
    }
  }
  return (
    <svg viewBox="0 0 300 205" aria-hidden="true">
      <defs>
        <clipPath id="exp-panel">
          <rect width="300" height="205" rx="14" />
        </clipPath>
        <linearGradient id="exp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f9fe" />
          <stop offset="1" stopColor="#e3f1fc" />
        </linearGradient>
        <radialGradient id="exp-globe" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#d6ecfb" />
          <stop offset="1" stopColor="#8fc5ee" />
        </radialGradient>
        <linearGradient id="exp-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2fbf73" />
          <stop offset="1" stopColor="#139455" />
        </linearGradient>
        <radialGradient id="exp-coin" cx="0.38" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset="0.65" stopColor="#f8bd2a" />
          <stop offset="1" stopColor="#df930c" />
        </radialGradient>
        <filter id="exp-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" floodColor="#1d4f7a" floodOpacity="0.2" />
        </filter>
      </defs>

      <g clipPath="url(#exp-panel)">
        <rect width="300" height="205" fill="url(#exp-bg)" />

        {/* globe with pale continents */}
        <circle cx="150" cy="96" r="84" fill="url(#exp-globe)" />
        <g fill="#e9f5fd" opacity="0.85">
          <path d="M96 52c10-10 28-12 38-4 6 6 2 14-6 16-8 2-10 10-18 10-10 0-20-12-14-22z" />
          <path d="M140 40c14-4 30 2 36 10 4 8-6 12-14 10-6 6-18 6-22-2-4-6-6-14 0-18z" />
          <path d="M178 70c12-2 26 6 28 16 2 10-8 14-16 10-10 4-18-4-18-12 0-6 0-12 6-14z" />
          <path d="M104 96c10-4 20 4 20 14s-8 22-16 22-12-10-12-18 2-16 8-18z" />
          <path d="M168 116c8-2 16 4 14 12-2 6-10 8-14 4-4-4-6-14 0-16z" />
        </g>

        {/* rising bar chart and arrow */}
        <rect x="210" y="96" width="12" height="62" rx="1.5" fill="url(#exp-bar)" />
        <rect x="228" y="82" width="12" height="76" rx="1.5" fill="url(#exp-bar)" />
        <rect x="246" y="66" width="12" height="92" rx="1.5" fill="url(#exp-bar)" />
        <rect x="264" y="50" width="12" height="108" rx="1.5" fill="url(#exp-bar)" />
        <path d="M196 98C222 88 246 70 266 38" fill="none" stroke="#14a05c" strokeWidth="5" strokeLinecap="round" />
        <path d="M257 38l14-8 0 16z" fill="#14a05c" stroke="#14a05c" strokeWidth="2.5" strokeLinejoin="round" />

        {/* cargo ship on the right */}
        <Container x={226} y={136} w={18} h={11} fill="#d6493b" rib="#8f2a20" />
        <Container x={244} y={136} w={18} h={11} fill="#2f75c4" rib="#1b4b85" />
        <Container x={235} y={125} w={18} h={11} fill="#f2a12b" rib="#a8660c" />
        <rect x="266" y="118" width="12" height="29" rx="1" fill="#f4f7fa" />
        <rect x="268" y="121" width="8" height="4" fill="#7fb6e3" />
        <path d="M214 147H300V160C292 168 270 172 236 172H220Z" fill="#1f4f8f" />
        <path d="M218 164H300V168C290 172 262 174 236 173H222Z" fill="#c9392d" />

        {/* sea */}
        <path d="M0 174C40 168 80 172 120 170C170 166 230 170 300 168V205H0Z" fill="#c6e3f7" />
        <path d="M0 184C50 178 100 182 150 180C200 178 250 182 300 178" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />

        {/* containers on the quay, left */}
        <Container x={12} y={128} w={44} h={22} fill="#c6413a" rib="#7f231e" />
        <Container x={6} y={150} w={40} h={24} fill="#e8963a" rib="#9c5810" />
        <Container x={46} y={150} w={40} h={24} fill="#2f75c4" rib="#1b4b85" />
      </g>

      {/* export checklist on a clipboard */}
      <g filter="url(#exp-shadow)">
        <rect x="76" y="46" width="78" height="120" rx="7" fill="#2f6fc0" />
      </g>
      <rect x="82" y="56" width="66" height="104" rx="3" fill="#ffffff" />
      <rect x="102" y="40" width="26" height="12" rx="4" fill="#1f3f6b" />
      <circle cx="115" cy="38" r="4.5" fill="none" stroke="#1f3f6b" strokeWidth="2.6" />
      <text x="115" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1f5aa0" fontFamily="inherit">
        EXPORT
      </text>
      {[96, 110, 124].map((y) => (
        <g key={y}>
          <rect x="89" y={y - 5} width="10" height="10" rx="1.5" fill="none" stroke="#1f9a5a" strokeWidth="1.8" />
          <path d={`M91 ${y}l2.5 2.6 4.5-5.4`} fill="none" stroke="#1f9a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="104" y={y - 1.6} width="36" height="3.2" rx="1.6" fill="#cdd9e5" />
        </g>
      ))}

      {/* calculator */}
      <g filter="url(#exp-shadow)">
        <rect x="136" y="106" width="56" height="74" rx="7" fill="#1d3557" />
      </g>
      <rect x="142" y="113" width="44" height="15" rx="2.5" fill="#cfe8f7" />
      {keys}
      <rect x="142" y="168" width="44" height="7" rx="1.6" fill="#b9d6ee" />

      {/* rupee coin */}
      <circle cx="210" cy="154" r="24" fill="url(#exp-coin)" stroke="#c9870c" strokeWidth="1.5" />
      <circle cx="210" cy="154" r="18.5" fill="none" stroke="#fff1b8" strokeOpacity="0.7" strokeWidth="2" />
      <text x="210" y="164" textAnchor="middle" fontSize="27" fontWeight="700" fill="#8a560a" fontFamily="inherit">
        ₹
      </text>
    </svg>
  )
}

export const EXPORTER_ILLUSTRATIONS = {
  'export-calculators': ExportCalculatorsIllustration,
}
