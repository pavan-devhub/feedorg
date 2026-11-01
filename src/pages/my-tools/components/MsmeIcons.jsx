// Illustrations for the MSME Calculators cards, drawn as SVG so they stay crisp at any size.
// Each fills a 120 x 104 box.

import { r1, Leaf, LeafGradient, CoinGradients, CoinStack } from './IllustrationParts.jsx'

// a small plant: a stem with two or three leaves
function Sprout({ id, x, base, size = 1 }) {
  const s = size
  return (
    <g>
      <path d={`M${x} ${base}C${x - 1} ${r1(base - 14 * s)} ${x + 1} ${r1(base - 24 * s)} ${x} ${r1(base - 32 * s)}`} fill="none" stroke="#2f8a3a" strokeWidth={r1(3 * s)} strokeLinecap="round" />
      <Leaf from={[x, r1(base - 12 * s)]} to={[r1(x - 18 * s), r1(base - 26 * s)]} width={r1(8 * s)} fill={`url(#${id})`} />
      <Leaf from={[x, r1(base - 18 * s)]} to={[r1(x + 19 * s), r1(base - 34 * s)]} width={r1(8.5 * s)} fill={`url(#${id})`} />
      <Leaf from={[x, r1(base - 28 * s)]} to={[r1(x + 2 * s), r1(base - 44 * s)]} width={r1(6 * s)} fill={`url(#${id})`} />
    </g>
  )
}

export function SchemeEligibilityIcon() {
  return (
    <svg viewBox="0 0 120 104" aria-hidden="true">
      <defs>
        <LeafGradient id="el-leaf" />
      </defs>
      {/* clipboard with ticked items */}
      <rect x="8" y="10" width="64" height="86" rx="8" fill="#e9f6ec" stroke="#2f8f4e" strokeWidth="3.5" />
      <rect x="26" y="4" width="28" height="12" rx="4" fill="#2f8f4e" />
      <circle cx="40" cy="4" r="4" fill="none" stroke="#2f8f4e" strokeWidth="2.6" />
      {[32, 50, 68].map((y, i) => (
        <g key={y}>
          <path d={`M18 ${y}l4 4 7-8`} fill="none" stroke="#f07d1a" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="34" y={y - 2} width={i === 2 ? 14 : 26} height="4" rx="2" fill="#3a9a5a" />
        </g>
      ))}
      {/* plant growing in front */}
      <ellipse cx="84" cy="98" rx="24" ry="5" fill="#6b4426" />
      <Sprout id="el-leaf" x={84} base={96} size={1.35} />
    </svg>
  )
}

export function PmegpLoanIcon() {
  return (
    <svg viewBox="0 0 120 104" aria-hidden="true">
      <defs>
        <LeafGradient id="pm-leaf" />
        <CoinGradients id="pm-coin" />
        <radialGradient id="pm-bag" cx="0.38" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#f7deb4" />
          <stop offset="0.65" stopColor="#e3b273" />
          <stop offset="1" stopColor="#c68b48" />
        </radialGradient>
      </defs>
      {/* money bag with a rupee sign */}
      <path d="M48 28C30 36 20 54 20 70c0 18 14 26 36 26s36-8 36-26c0-16-10-34-28-42z" fill="url(#pm-bag)" />
      <path d="M46 26c-6-10-2-18 10-18s16 8 10 18z" fill="#d79a52" />
      <path d="M46 27c7 4 14 4 21 0" fill="none" stroke="#8a5a26" strokeWidth="3.4" strokeLinecap="round" />
      <text x="56" y="80" textAnchor="middle" fontSize="36" fontWeight="700" fill="#6b4520" fontFamily="inherit">
        ₹
      </text>
      <CoinStack id="pm-coin" cx={20} bottom={100} count={4} rx={17} ry={5} h={6.5} />
      <Sprout id="pm-leaf" x={100} base={100} size={1.25} />
    </svg>
  )
}

export function MudraLoanIcon() {
  return (
    <svg viewBox="0 0 120 104" aria-hidden="true">
      <defs>
        <CoinGradients id="mu-coin" />
      </defs>
      {/* a small shop with a striped awning */}
      <rect x="12" y="34" width="70" height="60" rx="3" fill="#fff6e3" stroke="#d9a441" strokeWidth="2.5" />
      <path d="M6 34L14 14H80L88 34Z" fill="#f2b233" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${r1(22 + i * 17)} 14L${r1(18 + i * 17.5)} 34H${r1(27 + i * 17.5)}L${r1(30 + i * 17)} 14Z`} fill="#ffffff" opacity="0.85" />
      ))}
      <path d="M6 34C10 40 18 40 22 34C26 40 34 40 38 34C42 40 50 40 54 34C58 40 66 40 70 34C74 40 82 40 88 34" fill="#f2b233" />
      <rect x="22" y="56" width="20" height="38" rx="2" fill="#b7791f" />
      <rect x="50" y="52" width="24" height="18" rx="2" fill="#cfe8f7" stroke="#b7791f" strokeWidth="2" />
      {/* loans growing in three stages */}
      <CoinStack id="mu-coin" cx={80} bottom={100} count={2} rx={11} ry={3.6} h={5.5} />
      <CoinStack id="mu-coin" cx={96} bottom={100} count={4} rx={11} ry={3.6} h={5.5} />
      <CoinStack id="mu-coin" cx={110} bottom={100} count={7} rx={9} ry={3.2} h={5.5} />
    </svg>
  )
}

export function BusinessLoanEmiIcon() {
  return (
    <svg viewBox="0 0 120 104" aria-hidden="true">
      <defs>
        <CoinGradients id="bl-coin" />
        <linearGradient id="bl-calc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f86e8" />
          <stop offset="1" stopColor="#1f58b8" />
        </linearGradient>
      </defs>
      {/* calculator */}
      <rect x="6" y="6" width="62" height="88" rx="8" fill="url(#bl-calc)" />
      <rect x="13" y="13" width="48" height="16" rx="3" fill="#dff1ff" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <g key={`${row}${col}`}>
            <rect x={13 + col * 17} y={35 + row * 14} width="13" height="10" rx="2.5" fill="#ffffff" opacity="0.92" />
            {row === 0 && col < 2 && (
              <text x={19.5 + col * 17} y={43.5} textAnchor="middle" fontSize="8" fontWeight="700" fill="#1f58b8" fontFamily="inherit">
                ₹
              </text>
            )}
          </g>
        )),
      )}
      {/* bars and a rising arrow */}
      <rect x="84" y="62" width="9" height="32" rx="1.5" fill="#2f75d6" />
      <rect x="98" y="48" width="9" height="46" rx="1.5" fill="#1f58b8" />
      <path d="M74 64C88 56 100 44 108 28" fill="none" stroke="#1f9a5a" strokeWidth="4" strokeLinecap="round" />
      <path d="M102 28l9-6 1 11z" fill="#1f9a5a" stroke="#1f9a5a" strokeWidth="2" strokeLinejoin="round" />
      <CoinStack id="bl-coin" cx={62} bottom={100} count={4} rx={16} ry={5} h={6.5} />
    </svg>
  )
}

export function GstIcon() {
  return (
    <svg viewBox="0 0 120 104" aria-hidden="true">
      <defs>
        <CoinGradients id="gst-coin" />
        <linearGradient id="gst-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8d5cf6" />
          <stop offset="1" stopColor="#5b2fc9" />
        </linearGradient>
      </defs>
      {/* GST document with a folded corner */}
      <path d="M10 4H54L74 24V96a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" fill="#f4efff" stroke="#6b3fd4" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M54 4V24H74" fill="#e3d8fd" stroke="#6b3fd4" strokeWidth="3" strokeLinejoin="round" />
      <text x="34" y="40" textAnchor="middle" fontSize="19" fontWeight="700" fill="#4b23b0" fontFamily="inherit">
        GST
      </text>
      {[54, 64, 74].map((y, i) => (
        <rect key={y} x="18" y={y} width={i === 2 ? 16 : 26} height="4" rx="2" fill="#7b55dd" />
      ))}
      {/* percentage badge and coins */}
      <circle cx="74" cy="72" r="22" fill="url(#gst-badge)" stroke="#ffffff" strokeWidth="3" />
      <text x="74" y="81" textAnchor="middle" fontSize="25" fontWeight="700" fill="#ffffff" fontFamily="inherit">
        %
      </text>
      <CoinStack id="gst-coin" cx={100} bottom={102} count={3} rx={13} ry={4.2} h={6} />
    </svg>
  )
}

export function UdyamIcon() {
  return (
    <svg viewBox="0 0 120 104" aria-hidden="true">
      <defs>
        <linearGradient id="ud-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f8fd" />
          <stop offset="1" stopColor="#dcebf8" />
        </linearGradient>
      </defs>
      {/* laptop showing the registration page */}
      <rect x="14" y="14" width="86" height="58" rx="5" fill="#1d5fa8" />
      <rect x="19" y="19" width="76" height="48" rx="2" fill="url(#ud-screen)" />
      <rect x="30" y="28" width="54" height="16" rx="2" fill="#ffffff" stroke="#bfd6ec" strokeWidth="1" />
      <text x="57" y="40.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4f8f" fontFamily="inherit" letterSpacing="0.6">
        UDYAM
      </text>
      <rect x="30" y="50" width="40" height="3.5" rx="1.75" fill="#b9d2ea" />
      <rect x="30" y="57" width="28" height="3.5" rx="1.75" fill="#b9d2ea" />
      <path d="M4 74H110L104 82H10Z" fill="#2b6cb8" />
      {/* check badge */}
      <circle cx="94" cy="76" r="16" fill="#1f9a4c" stroke="#ffffff" strokeWidth="3" />
      <path d="M86 76l6 6 10-11" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const MSME_ICONS = {
  'scheme-eligibility': SchemeEligibilityIcon,
  'pmegp-loan': PmegpLoanIcon,
  'mudra-loan': MudraLoanIcon,
  'business-loan-emi': BusinessLoanEmiIcon,
  gst: GstIcon,
  udyam: UdyamIcon,
}
