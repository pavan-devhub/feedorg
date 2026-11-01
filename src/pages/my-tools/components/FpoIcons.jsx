// Illustrations for the FPO Calculators cards, drawn as SVG so they stay crisp at any size.
// Pictures shown left of the text fill a 170 x 160 box and bring their own pale panel; pictures
// shown right of the text fill a 240 x 170 box and stand on the card itself.

import { r1, Leaf, LeafGradient, CoinGradients, CoinStack, Container } from './IllustrationParts.jsx'

// the pale rounded panel behind a left-hand picture; `url(#<id>-clip)` clips a drawing to it
function Panel({ id, from, to }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect width="170" height="160" rx="12" />
        </clipPath>
      </defs>
      <rect width="170" height="160" rx="12" fill={`url(#${id}-panel)`} />
    </>
  )
}

// a person from the waist up; hat is 'cap' or 'turban'
function Person({ x, y, s = 1, shirt, hat, hatColor, apron }) {
  const k = (n) => r1(n * s)
  return (
    <g>
      <path d={`M${x - k(15)} ${y + k(40)}C${x - k(15)} ${y + k(20)} ${x - k(9)} ${y + k(14)} ${x} ${y + k(14)}C${x + k(9)} ${y + k(14)} ${x + k(15)} ${y + k(20)} ${x + k(15)} ${y + k(40)}Z`} fill={shirt} />
      {apron && <path d={`M${x - k(8)} ${y + k(18)}H${x + k(8)}L${x + k(10)} ${y + k(40)}H${x - k(10)}Z`} fill={apron} />}
      <rect x={x - k(3)} y={y + k(7)} width={k(6)} height={k(8)} fill="#b9794f" />
      <circle cx={x} cy={y} r={k(8.5)} fill="#c98b5e" />
      <path d={`M${x - k(3.5)} ${y + k(3.2)}Q${x} ${y + k(5.6)} ${x + k(3.5)} ${y + k(3.2)}`} fill="none" stroke="#6b3a20" strokeWidth={k(1.1)} strokeLinecap="round" />
      {hat === 'cap' && (
        <g fill={hatColor}>
          <path d={`M${x - k(9)} ${y - k(2)}C${x - k(9)} ${y - k(12)} ${x + k(9)} ${y - k(12)} ${x + k(9)} ${y - k(2)}Z`} />
          <rect x={x - k(1)} y={y - k(3.4)} width={k(13)} height={k(3)} rx={k(1.4)} />
        </g>
      )}
      {hat === 'turban' && (
        <g fill={hatColor}>
          <ellipse cx={x} cy={y - k(7)} rx={k(9.6)} ry={k(5.4)} />
          <path d={`M${x - k(9)} ${y - k(5)}Q${x} ${y - k(11)} ${x + k(9)} ${y - k(5)}`} fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth={k(1.4)} />
        </g>
      )}
    </g>
  )
}

// a wooden crate seen from the front
function Crate({ x, y, w, h }) {
  const slats = Math.max(2, Math.round(h / 12))
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill="#dba468" />
      <g stroke="#b47a3c" strokeWidth="1.3">
        {Array.from({ length: slats - 1 }, (_, i) => {
          const ly = r1(y + ((i + 1) * h) / slats)
          return <line key={i} x1={x + 1} y1={ly} x2={x + w - 1} y2={ly} />
        })}
      </g>
      <rect x={x} y={y} width="4" height={h} fill="#c48a4e" />
      <rect x={x + w - 4} y={y} width="4" height={h} fill="#c48a4e" />
    </g>
  )
}

function Tomato({ x, y, r = 6 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#e8392b" />
      <circle cx={r1(x - r * 0.35)} cy={r1(y - r * 0.35)} r={r1(r * 0.3)} fill="#ffffff" opacity="0.35" />
      <path d={`M${x - 2.5} ${r1(y - r + 0.6)}l2.5 1.6 2.5-1.6`} fill="none" stroke="#3a8f3a" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  )
}

// a pile of round produce (oranges, tomatoes, greens) in the given colours
function Produce({ items }) {
  return (
    <g>
      {items.map(([x, y, r, fill]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={r} fill={fill} />
          <circle cx={r1(x - r * 0.35)} cy={r1(y - r * 0.35)} r={r1(r * 0.3)} fill="#ffffff" opacity="0.3" />
        </g>
      ))}
    </g>
  )
}

function Pin({ x, y, fill }) {
  return (
    <g>
      <path d={`M${x} ${y}C${x} ${y} ${x - 9} ${y - 11} ${x - 9} ${y - 17}A9 9 0 1 1 ${x + 9} ${y - 17}C${x + 9} ${y - 11} ${x} ${y} ${x} ${y}Z`} fill={fill} />
      <circle cx={x} cy={y - 17} r="3.6" fill="#ffffff" />
    </g>
  )
}

function RupeeCoin({ id, x, y, r, from = '#ffe27a', to = '#df930c', ink = '#8a560a', rim = '#c9870c' }) {
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="0.38" cy="0.35" r="0.75">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} stroke={rim} strokeWidth="1.4" />
      <circle cx={x} cy={y} r={r1(r * 0.78)} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.6" />
      <text x={x} y={r1(y + r * 0.4)} textAnchor="middle" fontSize={r1(r * 1.15)} fontWeight="700" fill={ink} fontFamily="inherit">
        ₹
      </text>
    </g>
  )
}

function Bars({ x, base, heights, width, gap, fill }) {
  return (
    <g>
      {heights.map((h, i) => (
        <rect key={i} x={x + i * (width + gap)} y={base - h} width={width} height={h} rx="1.5" fill={fill} />
      ))}
    </g>
  )
}

/* ---------- Pictures left of the text (170 x 160, with a panel) ---------- */

export function GradingSortingIcon() {
  return (
    <svg viewBox="0 0 170 160" aria-hidden="true">
      <defs>
        <LeafGradient id="gs-leaf" />
      </defs>
      <Panel id="gs" from="#fbfefb" to="#e6f5e8" />
      <Leaf from={[10, 150]} to={[2, 104]} width={9} fill="url(#gs-leaf)" />
      <Leaf from={[14, 150]} to={[28, 112]} width={8} fill="url(#gs-leaf)" />

      {/* sorting machine at the top of the belt */}
      <rect x="104" y="18" width="38" height="40" rx="3" fill="#aab4bd" />
      <rect x="109" y="23" width="28" height="18" rx="2" fill="#56636e" />
      <Produce items={[[115, 37, 4, '#5cb85c'], [123, 36, 4, '#7ccf5a'], [131, 37, 4, '#4caf50']]} />
      <rect x="108" y="58" width="4" height="22" fill="#8a949c" />
      <rect x="134" y="58" width="4" height="18" fill="#8a949c" />

      {/* two workers in green caps and aprons, behind the belt */}
      <Person x={30} y={64} s={1.25} shirt="#ffffff" apron="#2f9a4a" hat="cap" hatColor="#2f9a4a" />
      <Person x={150} y={70} s={1.2} shirt="#ffffff" apron="#2f9a4a" hat="cap" hatColor="#2f9a4a" />

      {/* conveyor belt with oranges, rising to the right */}
      <path d="M8 120L132 70L138 80L14 132Z" fill="#7d8790" />
      <path d="M8 120L132 70L134 74L10 124Z" fill="#a9b2ba" />
      <rect x="18" y="128" width="4" height="22" fill="#6c757d" transform="rotate(-4 20 128)" />
      <rect x="70" y="108" width="4" height="30" fill="#6c757d" />
      <Produce items={[[30, 110, 4.5, '#f59e1b'], [44, 104, 4.5, '#f7b02c'], [58, 99, 4.5, '#f59e1b'], [76, 92, 4.5, '#f7b02c'], [94, 85, 4.5, '#f59e1b'], [110, 78, 4.5, '#ef8f12']]} />

      {/* a crate of sorted produce in front */}
      <Produce items={[[94, 118, 6, '#f59e1b'], [106, 116, 6, '#4caf50'], [118, 118, 6, '#f7b02c'], [130, 116, 6, '#e8392b'], [142, 118, 6, '#f59e1b']]} />
      <Crate x={84} y={118} w={68} h={34} />
    </svg>
  )
}

export function PostHarvestLossIcon() {
  return (
    <svg viewBox="0 0 170 160" aria-hidden="true">
      <Panel id="ph" from="#fff8f8" to="#fde3e3" />

      {/* crates of tomatoes */}
      <Crate x={16} y={108} w={84} h={34} />
      <Crate x={22} y={74} w={76} h={32} />
      {[30, 42, 54, 66, 78, 90].map((x, i) => (
        <Tomato key={x} x={x} y={i % 2 ? 68 : 70} r={7} />
      ))}
      <Tomato x={48} y={62} r={6.5} />
      <Tomato x={72} y={62} r={6.5} />

      {/* the loss: a percentage badge and a falling arrow */}
      <Tomato x={106} y={44} r={6} />
      <circle cx="128" cy="38" r="17" fill="#ef3d4d" />
      <text x="128" y="45" textAnchor="middle" fontSize="20" fontWeight="700" fill="#ffffff" fontFamily="inherit">
        %
      </text>
      <path d="M108 66L144 112" fill="none" stroke="#e5303f" strokeWidth="7" strokeLinecap="round" />
      <path d="M134 116l14 4-3-15z" fill="#e5303f" stroke="#e5303f" strokeWidth="2.5" strokeLinejoin="round" />

      {/* tomatoes and green chillies spilled in front */}
      <Tomato x={40} y={148} r={7} />
      <Tomato x={58} y={150} r={7} />
      <Tomato x={78} y={149} r={6.5} />
      <g fill="#3aa13e">
        <path d="M100 146c10-6 24-6 34-2-10 0-22 3-34 6z" />
        <path d="M106 152c10-5 24-5 36-1-11 0-24 3-36 5z" />
        <path d="M118 140c9-4 20-3 28 1-9 0-18 2-28 4z" />
      </g>
      <Tomato x={150} y={150} r={6} />
    </svg>
  )
}

export function StorageCostIcon() {
  return (
    <svg viewBox="0 0 170 160" aria-hidden="true">
      <Panel id="sc" from="#f6fbff" to="#dceffc" />
      <g clipPath="url(#sc-clip)">
        <rect x="0" y="140" width="170" height="20" fill="#cfe3c8" />
        <rect x="0" y="148" width="170" height="12" fill="#b9d8ae" />
      </g>

      {/* cold store: green roof, roller shutter */}
      <rect x="16" y="58" width="104" height="84" fill="#eef1f4" />
      <path d="M10 62L68 30L126 62Z" fill="#2f9a4a" />
      <path d="M10 62L68 30L126 62" fill="none" stroke="#1f7a37" strokeWidth="3" strokeLinejoin="round" />
      <rect x="40" y="80" width="56" height="62" fill="#c8cfd6" />
      <g stroke="#a7b0b9" strokeWidth="1.4">
        {[86, 92, 98, 104, 110, 116, 122, 128, 134].map((y) => (
          <line key={y} x1="40" y1={y} x2="96" y2={y} />
        ))}
      </g>
      <rect x="54" y="66" width="28" height="8" rx="1.5" fill="#5b8fc9" />

      {/* snowflake badge */}
      <circle cx="124" cy="40" r="19" fill="#2f8ee6" stroke="#ffffff" strokeWidth="2.5" />
      <g stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round">
        {[0, 60, 120].map((a) => (
          <line key={a} x1="124" y1="29" x2="124" y2="51" transform={`rotate(${a} 124 40)`} />
        ))}
      </g>

      {/* pallets of boxes, and a forklift carrying one */}
      <rect x="18" y="118" width="20" height="18" rx="1.5" fill="#f2a12b" />
      <rect x="20" y="104" width="16" height="14" rx="1.5" fill="#e8962a" />
      <rect x="16" y="136" width="24" height="5" fill="#b88a55" />
      <rect x="104" y="106" width="18" height="18" rx="1.5" fill="#f2a12b" />
      <rect x="100" y="124" width="26" height="3" fill="#6c757d" />
      <rect x="124" y="92" width="4" height="40" fill="#4b5560" />
      <path d="M130 104h16l6 12v18h-22z" fill="#f6c21c" />
      <path d="M134 94h12v10h-12z" fill="none" stroke="#4b5560" strokeWidth="2.5" />
      <circle cx="136" cy="138" r="6" fill="#2b2f33" />
      <circle cx="152" cy="138" r="5" fill="#2b2f33" />
    </svg>
  )
}

export function TransportationCostIcon() {
  return (
    <svg viewBox="0 0 170 160" aria-hidden="true">
      <Panel id="tr" from="#fffaf1" to="#fdeed8" />
      <g clipPath="url(#tr-clip)">
        <path d="M0 96C30 70 60 66 92 80C116 66 146 64 170 76V160H0Z" fill="#cfe6b4" />
        <path d="M0 108C40 94 90 96 170 102V160H0Z" fill="#b7da92" />
        <path d="M0 140C50 132 120 132 170 138V160H0Z" fill="#8d959c" />
      </g>

      {/* the route between two pins */}
      <path d="M30 48C50 22 80 18 104 34S140 54 146 34" fill="none" stroke="#3a7a3a" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round" />
      <Pin x={30} y={58} fill="#ef3d3d" />
      <Pin x={146} y={40} fill="#2fa14a" />

      {/* road markings */}
      <path d="M10 150H40M60 148H90M110 148H140" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

      {/* truck loaded with crates */}
      <rect x="54" y="92" width="100" height="38" rx="2" fill="#2f9a4a" />
      <rect x="54" y="92" width="100" height="5" fill="#25813c" />
      {[60, 80, 100, 120].map((x) => (
        <rect key={x} x={x} y="76" width="18" height="16" rx="1.5" fill="#f2a12b" stroke="#c97d14" strokeWidth="1" />
      ))}
      <rect x="70" y="62" width="18" height="14" rx="1.5" fill="#e8962a" stroke="#c97d14" strokeWidth="1" />
      <rect x="100" y="62" width="18" height="14" rx="1.5" fill="#f2a12b" stroke="#c97d14" strokeWidth="1" />
      <path d="M16 108L24 92H52V132H16Z" fill="#f4f6f8" />
      <path d="M26 96H48V110H20Z" fill="#7fb6e3" />
      <rect x="16" y="120" width="36" height="12" fill="#d6dce1" />
      <rect x="18" y="122" width="10" height="5" rx="1" fill="#f7c948" />
      {[32, 104, 134].map((x) => (
        <g key={x}>
          <circle cx={x} cy="134" r="9" fill="#2b2f33" />
          <circle cx={x} cy="134" r="3.5" fill="#aab4bd" />
        </g>
      ))}
    </svg>
  )
}

export function AggregationIcon() {
  return (
    <svg viewBox="0 0 170 160" aria-hidden="true">
      <defs>
        <linearGradient id="ag-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3cc06a" />
          <stop offset="1" stopColor="#1d9a4c" />
        </linearGradient>
      </defs>
      <Panel id="ag" from="#fbfefc" to="#e2f4e5" />

      {/* market price going up */}
      <Bars x={106} base={112} heights={[24, 38, 54]} width={13} gap={5} fill="url(#ag-bar)" />
      <path d="M96 86C112 80 126 70 136 56" fill="none" stroke="#1d9a4c" strokeWidth="4" strokeLinecap="round" />
      <path d="M130 56l10-6 0 12z" fill="#1d9a4c" stroke="#1d9a4c" strokeWidth="2" strokeLinejoin="round" />
      <RupeeCoin id="ag-coin" x={140} y={30} r={16} from="#5fd38a" to="#1d9a4c" ink="#ffffff" rim="#178a43" />

      {/* three farmers bringing their produce together */}
      <Person x={30} y={64} s={1.05} shirt="#3f7fd0" hat="turban" hatColor="#ffffff" />
      <Person x={58} y={60} s={1.1} shirt="#2b5f9e" hat="turban" hatColor="#ef7d2a" />
      <Person x={86} y={64} s={1.05} shirt="#f4f4f4" hat="turban" hatColor="#ffffff" />

      {/* baskets of vegetables */}
      {[
        [10, ['#e8392b', '#4caf50', '#7ccf5a']],
        [62, ['#f7c22c', '#f59e1b', '#4caf50']],
        [114, ['#4caf50', '#e8392b', '#7ccf5a']],
      ].map(([x, colours]) => (
        <g key={x}>
          <Produce items={colours.map((c, i) => [x + 9 + i * 12, 118 - (i % 2) * 2, 7, c])} />
          <path d={`M${x} 118H${x + 46}L${x + 42} 150H${x + 4}Z`} fill="#c98b4e" />
          <g stroke="#a4682f" strokeWidth="1.2">
            <line x1={x + 2} y1="128" x2={x + 44} y2="128" />
            <line x1={x + 3} y1="139" x2={x + 43} y2="139" />
          </g>
        </g>
      ))}
    </svg>
  )
}

export function FpoProfitIcon() {
  return (
    <svg viewBox="0 0 170 160" aria-hidden="true">
      <defs>
        <LeafGradient id="pr-leaf" />
        <CoinGradients id="pr-coin" />
        <linearGradient id="pr-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3cc06a" />
          <stop offset="1" stopColor="#1d9a4c" />
        </linearGradient>
        <radialGradient id="pr-bag" cx="0.38" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#f3d6a6" />
          <stop offset="0.65" stopColor="#d9ab6c" />
          <stop offset="1" stopColor="#b88349" />
        </radialGradient>
      </defs>
      <Panel id="pr" from="#fbfaff" to="#ebe5fd" />

      {/* rising bars and arrow */}
      <Bars x={96} base={104} heights={[30, 46, 64]} width={12} gap={6} fill="url(#pr-bar)" />
      <path d="M34 84C64 74 104 50 132 22" fill="none" stroke="#2fae55" strokeWidth="6" strokeLinecap="round" />
      <path d="M122 22l15-8-2 17z" fill="#2fae55" stroke="#2fae55" strokeWidth="2.5" strokeLinejoin="round" />
      <Leaf from={[60, 92]} to={[48, 70]} width={7} fill="url(#pr-leaf)" />
      <Leaf from={[62, 92]} to={[76, 72]} width={7} fill="url(#pr-leaf)" />
      <Leaf from={[140, 104]} to={[156, 86]} width={7} fill="url(#pr-leaf)" />

      {/* coins either side of a money bag */}
      <CoinStack id="pr-coin" cx={34} bottom={150} count={8} rx={16} ry={5} h={6.6} />
      <CoinStack id="pr-coin" cx={136} bottom={150} count={6} rx={16} ry={5} h={6.6} />
      <path d="M78 94C62 102 54 118 54 132c0 14 12 20 32 20s32-6 32-20c0-14-8-30-24-38z" fill="url(#pr-bag)" />
      <path d="M76 92c-4-8 0-14 10-14s14 6 10 14z" fill="#c99456" />
      <path d="M76 94c7 3 14 3 21 0" fill="none" stroke="#8a5a26" strokeWidth="3" strokeLinecap="round" />
      <text x="86" y="138" textAnchor="middle" fontSize="28" fontWeight="700" fill="#6b4520" fontFamily="inherit">
        ₹
      </text>
    </svg>
  )
}

/* ---------- Pictures right of the text (240 x 170, no panel) ---------- */

export function CashFlowIcon() {
  return (
    <svg viewBox="0 0 240 170" aria-hidden="true">
      <defs>
        <LeafGradient id="cf-leaf" />
        <CoinGradients id="cf-coin" />
        <filter id="cf-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#1d4f7a" floodOpacity="0.18" />
        </filter>
      </defs>
      <Leaf from={[30, 140]} to={[6, 96]} width={11} fill="url(#cf-leaf)" />
      <Leaf from={[34, 140]} to={[44, 92]} width={10} fill="url(#cf-leaf)" />
      <Leaf from={[214, 132]} to={[236, 96]} width={11} fill="url(#cf-leaf)" />

      {/* clipboard with a cash chart: money in, money out */}
      <g filter="url(#cf-shadow)" transform="rotate(-6 100 84)">
        <rect x="52" y="22" width="96" height="120" rx="8" fill="#2f7fd6" />
        <rect x="59" y="32" width="82" height="104" rx="3" fill="#ffffff" />
        <rect x="86" y="16" width="28" height="12" rx="4" fill="#1f4f8f" />
        <Bars x={68} base={122} heights={[30, 46]} width={12} gap={6} fill="#2fae55" />
        <rect x="104" y="96" width="12" height="26" rx="1.5" fill="#f2a12b" />
        <path d="M128 56V96" stroke="#e5303f" strokeWidth="5" strokeLinecap="round" />
        <path d="M120 92l8 12 8-12z" fill="#e5303f" stroke="#e5303f" strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* calendar */}
      <g filter="url(#cf-shadow)">
        <rect x="150" y="12" width="58" height="52" rx="6" fill="#ffffff" />
      </g>
      <path d="M150 18a6 6 0 0 1 6-6h46a6 6 0 0 1 6 6v8h-58z" fill="#2f7fd6" />
      <rect x="160" y="6" width="4" height="12" rx="2" fill="#5b6b7a" />
      <rect x="194" y="6" width="4" height="12" rx="2" fill="#5b6b7a" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => <rect key={`${row}${col}`} x={157 + col * 12} y={32 + row * 9} width="8" height="6" rx="1" fill="#c7d6e5" />),
      )}

      {/* coins and a green rupee coin */}
      <CoinStack id="cf-coin" cx={56} bottom={160} count={5} rx={17} ry={5.2} h={7} />
      <CoinStack id="cf-coin" cx={80} bottom={164} count={3} rx={15} ry={4.8} h={7} />
      <CoinStack id="cf-coin" cx={196} bottom={160} count={6} rx={16} ry={5} h={7} />
      <RupeeCoin id="cf-rupee" x={152} y={140} r={24} from="#5fd38a" to="#178a43" ink="#ffffff" rim="#127a3a" />
    </svg>
  )
}

export function ExportCostIcon() {
  return (
    <svg viewBox="0 0 240 170" aria-hidden="true">
      <defs>
        <radialGradient id="ec-globe" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#e3f2fd" />
          <stop offset="1" stopColor="#a9d3f3" />
        </radialGradient>
      </defs>
      {/* globe, crane and plane */}
      <circle cx="150" cy="64" r="52" fill="url(#ec-globe)" />
      <g fill="#ffffff" opacity="0.7">
        <path d="M118 46c10-8 26-8 32 0 4 6-4 10-12 10-8 4-22 0-20-10z" />
        <path d="M160 70c10-2 20 4 20 12s-10 10-16 6c-8-2-10-14-4-18z" />
      </g>
      <g stroke="#2f75c4" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M206 160V22M222 160V22M206 22H232M180 22H206M186 22V44" />
        <path d="M206 40L222 56M222 40L206 56M206 72L222 88M222 72L206 88M206 104L222 120M222 104L206 120" strokeWidth="1.8" />
      </g>
      <rect x="182" y="44" width="10" height="7" fill="#e8962a" />
      <g transform="rotate(-12 80 36)">
        <path d="M40 38C40 34 46 32 54 32H108C116 32 120 35 120 38C120 41 116 44 108 44H54C46 44 40 42 40 38Z" fill="#ffffff" stroke="#c9d6e2" strokeWidth="1" />
        <path d="M74 38L58 60H68L92 38Z" fill="#2f75c4" />
        <path d="M74 38L62 18H70L90 38Z" fill="#3d8be0" />
        <path d="M46 36L38 24H44L54 36Z" fill="#2f75c4" />
        {[64, 72, 80, 88, 96, 104].map((x) => (
          <circle key={x} cx={x} cy="37" r="1.5" fill="#2f75c4" />
        ))}
      </g>

      {/* sea, ship with containers, and cartons on the quay */}
      <path d="M0 150C40 144 90 148 140 146C180 144 210 148 240 146V170H0Z" fill="#bfe0f6" />
      <Container x={42} y={104} w={22} h={13} fill="#d6493b" rib="#8f2a20" />
      <Container x={64} y={104} w={22} h={13} fill="#2f75c4" rib="#1b4b85" />
      <Container x={86} y={104} w={22} h={13} fill="#3fae5a" rib="#1f7a37" />
      <Container x={52} y={91} w={22} h={13} fill="#f2a12b" rib="#a8660c" />
      <Container x={74} y={91} w={22} h={13} fill="#d6493b" rib="#8f2a20" />
      <Container x={96} y={91} w={22} h={13} fill="#2f75c4" rib="#1b4b85" />
      <rect x="112" y="80" width="18" height="37" rx="1" fill="#f4f7fa" />
      <rect x="115" y="84" width="12" height="5" fill="#7fb6e3" />
      <path d="M16 117H150V132C138 146 104 150 60 150H30Z" fill="#1f4f8f" />
      <path d="M22 140H146V144C130 152 94 154 58 152H34Z" fill="#c9392d" />
      {[
        [158, 130],
        [180, 130],
        [202, 130],
        [168, 110],
        [190, 110],
        [178, 90],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="22" height="20" rx="1.5" fill="#e3b06a" stroke="#b9853f" strokeWidth="1" />
          <path d={`M${x + 11} ${y}V${y + 8}`} stroke="#c99550" strokeWidth="2" />
        </g>
      ))}
    </svg>
  )
}

export function ExportProfitIcon() {
  return (
    <svg viewBox="0 0 240 170" aria-hidden="true">
      <defs>
        <CoinGradients id="ep-coin" />
        <radialGradient id="ep-globe" cx="0.38" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#7cc4f4" />
          <stop offset="1" stopColor="#2f7fd6" />
        </radialGradient>
        <filter id="ep-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#1d4f7a" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* globe */}
      <circle cx="74" cy="84" r="38" fill="url(#ep-globe)" />
      <g fill="#5cc069">
        <path d="M50 66c8-8 22-8 26 0 2 6-4 10-10 10-6 4-18 0-16-10z" />
        <path d="M80 92c8-2 16 4 16 12s-8 10-12 6c-6-2-8-14-4-18z" />
        <path d="M54 96c6-2 10 4 8 10-2 4-8 4-10 0s-2-8 2-10z" />
      </g>

      {/* export report with a rising chart */}
      <g filter="url(#ep-shadow)">
        <rect x="120" y="20" width="80" height="104" rx="7" fill="#2f7fd6" />
      </g>
      <rect x="126" y="28" width="68" height="90" rx="3" fill="#ffffff" />
      <rect x="148" y="14" width="24" height="11" rx="4" fill="#1f4f8f" />
      <text x="160" y="46" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1f5aa0" fontFamily="inherit">
        EXPORT
      </text>
      <Bars x={136} base={100} heights={[12, 20, 28]} width={9} gap={5} fill="#3d8be0" />
      <path d="M134 84L148 74L160 78L178 58" fill="none" stroke="#2f7fd6" strokeWidth="2" strokeLinejoin="round" />
      <path d="M184 120C200 108 214 90 222 66" fill="none" stroke="#2fae55" strokeWidth="6" strokeLinecap="round" />
      <path d="M213 68l12-9 2 15z" fill="#2fae55" stroke="#2fae55" strokeWidth="2.5" strokeLinejoin="round" />

      {/* containers, coins and a rupee coin in front */}
      <Container x={30} y={122} w={36} h={32} fill="#2f75c4" rib="#1b4b85" />
      <Container x={66} y={116} w={50} h={38} fill="#d6493b" rib="#8f2a20" />
      <rect x="100" y="132" width="20" height="16" rx="1.5" fill="#e3b06a" stroke="#b9853f" strokeWidth="1" />
      <CoinStack id="ep-coin" cx={150} bottom={162} count={5} rx={17} ry={5.2} h={7} />
      <CoinStack id="ep-coin" cx={178} bottom={164} count={3} rx={15} ry={4.8} h={7} />
      <RupeeCoin id="ep-rupee" x={208} y={142} r={20} />
    </svg>
  )
}

export const FPO_ICONS = {
  'grading-sorting': GradingSortingIcon,
  'post-harvest-loss': PostHarvestLossIcon,
  'storage-cost': StorageCostIcon,
  'transportation-cost': TransportationCostIcon,
  aggregation: AggregationIcon,
  'fpo-profit': FpoProfitIcon,
  'cash-flow': CashFlowIcon,
  'export-cost': ExportCostIcon,
  'export-profit': ExportProfitIcon,
}
