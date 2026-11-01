// Illustrations for the Land & Area Calculators cards, drawn as SVG so they stay crisp at any size.
// Each is drawn on a 220 x 190 grid (shown from y 9): a round patch of sky over a raised island of
// farmland with a marked plot on it.

import { r1, Leaf, LeafGradient, CoinGradients, CoinStack } from './IllustrationParts.jsx'

function Cloud({ x, y, size = 1 }) {
  const s = size
  return <path d={`M${x} ${y}c${r1(1 * s)} ${r1(-6 * s)} ${r1(8 * s)} ${r1(-8 * s)} ${r1(12 * s)} ${r1(-4 * s)}c${r1(2 * s)} ${r1(-7 * s)} ${r1(13 * s)} ${r1(-8 * s)} ${r1(16 * s)} ${r1(-1 * s)}c${r1(6 * s)} ${r1(-1 * s)} ${r1(9 * s)} ${r1(3 * s)} ${r1(8 * s)} ${r1(5 * s)}z`} fill="#ffffff" />
}

function Tree({ x, y, size = 1, fill }) {
  const s = size
  return (
    <g>
      <rect x={r1(x - 1.6 * s)} y={r1(y + 6 * s)} width={r1(3.2 * s)} height={r1(12 * s)} rx="1" fill="#7a4a24" />
      <ellipse cx={x} cy={y} rx={r1(9 * s)} ry={r1(11 * s)} fill={fill} />
      <ellipse cx={r1(x - 3 * s)} cy={r1(y - 3 * s)} rx={r1(4 * s)} ry={r1(5 * s)} fill="#8fd668" opacity="0.6" />
    </g>
  )
}

// a map pin standing on (x, y)
function Pin({ id, x, y, from, to }) {
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <ellipse cx={x} cy={y} rx="7" ry="2.4" fill="#2f6b2a" opacity="0.35" />
      <path d={`M${x} ${y}C${x} ${y} ${x - 17} ${y - 20} ${x - 17} ${y - 32}A17 17 0 1 1 ${x + 17} ${y - 32}C${x + 17} ${y - 20} ${x} ${y} ${x} ${y}Z`} fill={`url(#${id})`} />
      <circle cx={x} cy={y - 32} r="7.5" fill="#ffffff" />
    </g>
  )
}

// a round patch of sky with clouds and hills, and a raised island of green farmland below it
function Countryside({ id }) {
  return (
    <>
      <defs>
        <clipPath id={`${id}-sky-clip`}>
          <circle cx="110" cy="94" r="86" />
        </clipPath>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b6e0f6" />
          <stop offset="0.75" stopColor="#e8f6fb" />
        </linearGradient>
        <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a6dc6c" />
          <stop offset="1" stopColor="#6fbd46" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id}-sky-clip)`}>
        <rect width="220" height="190" fill={`url(#${id}-sky)`} />
        <Cloud x={52} y={40} />
        <Cloud x={138} y={28} size={0.85} />
        <Cloud x={160} y={50} size={0.7} />
        <path d="M20 96C40 80 60 76 82 88C102 72 126 70 148 82C168 72 190 76 206 90V116H20Z" fill="#a8d5c3" />
        <path d="M20 104C44 94 72 94 98 99C132 90 168 92 206 102V118H20Z" fill="#8fc8a8" />
      </g>
      {/* the island: its earthy edge, then the grassy top */}
      <path d="M4 118C30 104 190 104 216 118C222 150 176 180 110 180C44 180 -2 150 4 118Z" fill="#4f9a37" />
      <path d="M4 114C30 98 190 98 216 114C220 142 176 170 110 170C44 170 0 142 4 114Z" fill={`url(#${id}-ground)`} />
      <path d="M14 132C60 120 160 120 206 134" fill="none" stroke="#c4e88c" strokeOpacity="0.6" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

// a plot of land in perspective with a little thickness: corners a, b, c, d (back-left, back-right,
// front-right, front-left); `fields` fills the top
function Plot({ a, b, c, d, fields, edge }) {
  const pt = (p) => p.join(' ')
  const down = (p) => [p[0], p[1] + 5]
  const centre = [(a[0] + b[0] + c[0] + d[0]) / 4, (a[1] + b[1] + c[1] + d[1]) / 4]
  const grow = (p) => [r1(centre[0] + (p[0] - centre[0]) * 1.08), r1(centre[1] + (p[1] - centre[1]) * 1.1)]
  const fence = [a, b, c, d].map(grow)
  return (
    <g>
      <polygon points={[a, d, c, down(c), down(d), down(a)].map(pt).join(' ')} fill={edge} />
      {fields}
      <polygon points={fence.map(pt).join(' ')} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeDasharray="6 4" strokeLinejoin="round" />
      {fence.map((p) => (
        <g key={pt(p)}>
          <rect x={r1(p[0] - 1.8)} y={r1(p[1] - 10)} width="3.6" height="11" rx="1" fill="#ffffff" />
          <rect x={r1(p[0] - 1.8)} y={r1(p[1] - 10)} width="1.4" height="11" fill="#d8e3dd" />
        </g>
      ))}
    </g>
  )
}

const poly = (points) => points.map((p) => p.join(' ')).join(' ')

export function LandAreaConverterIcon() {
  // plot corners, and the line splitting the ploughed half from the green half
  const a = [34, 126]
  const b = [110, 106]
  const c = [182, 128]
  const d = [104, 154]
  const m1 = [72, 116]
  const m2 = [143, 141]
  return (
    <svg viewBox="0 9 220 180" aria-hidden="true">
      <defs>
        <LeafGradient id="lac-leaf" />
        <linearGradient id="lac-tree" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7acb54" />
          <stop offset="1" stopColor="#2f8a3a" />
        </linearGradient>
        <linearGradient id="lac-tape" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd84a" />
          <stop offset="1" stopColor="#f2b705" />
        </linearGradient>
      </defs>
      <Countryside id="lac" />
      <Tree x={24} y={100} size={1.15} fill="url(#lac-tree)" />
      <Tree x={44} y={94} fill="url(#lac-tree)" />
      <Tree x={156} y={92} size={0.85} fill="url(#lac-tree)" />
      <Tree x={176} y={96} size={1.1} fill="url(#lac-tree)" />
      <Tree x={196} y={106} size={0.9} fill="url(#lac-tree)" />
      <Plot
        a={a}
        b={b}
        c={c}
        d={d}
        edge="#8a5a34"
        fields={
          <>
            <polygon points={poly([a, m1, m2, d])} fill="#b77d4f" />
            <g stroke="#94623b" strokeWidth="1.3">
              {[0.2, 0.4, 0.6, 0.8].map((t) => (
                <line key={t} x1={r1(a[0] + (d[0] - a[0]) * t)} y1={r1(a[1] + (d[1] - a[1]) * t)} x2={r1(m1[0] + (m2[0] - m1[0]) * t)} y2={r1(m1[1] + (m2[1] - m1[1]) * t)} />
              ))}
            </g>
            <polygon points={poly([m1, b, c, m2])} fill="#4da336" />
            <polygon points={poly([[r1((m1[0] + b[0]) / 2), r1((m1[1] + b[1]) / 2)], b, c, [r1((m2[0] + c[0]) / 2), r1((m2[1] + c[1]) / 2)]])} fill="#6cbf4e" />
            <g stroke="#3f8f2b" strokeOpacity="0.7" strokeWidth="1.2">
              {[0.25, 0.5, 0.75].map((t) => (
                <line key={t} x1={r1(m1[0] + (b[0] - m1[0]) * t)} y1={r1(m1[1] + (b[1] - m1[1]) * t)} x2={r1(m2[0] + (c[0] - m2[0]) * t)} y2={r1(m2[1] + (c[1] - m2[1]) * t)} />
              ))}
            </g>
          </>
        }
      />
      <Pin id="lac-pin" x={110} y={112} from="#ffc35c" to="#f08a17" />

      {/* leafy bushes at the front corners */}
      <Leaf from={[14, 160]} to={[2, 138]} width={9} fill="url(#lac-leaf)" />
      <Leaf from={[18, 162]} to={[34, 142]} width={9} fill="url(#lac-leaf)" />
      <Leaf from={[204, 172]} to={[218, 154]} width={8} fill="url(#lac-leaf)" />

      {/* tape measure in front, its tape pulled out to the left */}
      <path d="M58 178L168 158L169 166L59 187Z" fill="url(#lac-tape)" stroke="#d69c00" strokeWidth="0.8" />
      <g stroke="#7a5a00" strokeWidth="0.9">
        {Array.from({ length: 14 }, (_, i) => {
          const t = i / 13
          const x = r1(62 + 104 * t)
          const y = r1(178.6 - 19 * t)
          return <line key={i} x1={x} y1={y} x2={x} y2={r1(y + (i % 2 ? 2.6 : 4.2))} />
        })}
      </g>
      <rect x="52" y="176" width="7" height="13" rx="1.5" fill="#b8c2c8" transform="rotate(-10 55 182)" />
      <g transform="rotate(-8 186 150)">
        <rect x="160" y="128" width="48" height="44" rx="12" fill="url(#lac-tape)" stroke="#d29a00" strokeWidth="1" />
        <rect x="179" y="128" width="29" height="44" rx="11" fill="#2b2d30" />
        <rect x="185" y="136" width="17" height="28" rx="5" fill="#3f4246" />
        <rect x="160" y="153" width="10" height="9" rx="2" fill="#2b2d30" />
      </g>
    </svg>
  )
}

export function LandValueEstimatorIcon() {
  const a = [30, 128]
  const b = [100, 110]
  const c = [166, 130]
  const d = [94, 154]
  return (
    <svg viewBox="0 9 220 180" aria-hidden="true">
      <defs>
        <LeafGradient id="lve-leaf" />
        <CoinGradients id="lve-coin" />
        <linearGradient id="lve-tree" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7acb54" />
          <stop offset="1" stopColor="#2f8a3a" />
        </linearGradient>
        <filter id="lve-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#1d4f7a" floodOpacity="0.2" />
        </filter>
      </defs>
      <Countryside id="lve" />
      {/* fields of different crops, and a dirt track */}
      <polygon points="124,104 170,102 200,112 152,116" fill="#c7e57f" />
      <polygon points="152,116 200,112 212,122 170,128" fill="#e5d78f" />
      <path d="M118 170C128 152 150 138 192 128L200 133C164 144 146 156 138 170Z" fill="#dcb67e" />
      <Tree x={24} y={102} size={1.1} fill="url(#lve-tree)" />
      <Tree x={42} y={96} fill="url(#lve-tree)" />
      <Tree x={142} y={92} size={0.8} fill="url(#lve-tree)" />
      <Tree x={194} y={96} size={1.05} fill="url(#lve-tree)" />
      {/* farmhouse at the back */}
      <rect x="160" y="90" width="26" height="15" fill="#fbf3e4" />
      <polygon points="156,92 173,78 190,92" fill="#e2552f" />
      <rect x="170" y="96" width="6" height="9" fill="#9b5a33" />
      <rect x="163" y="95" width="5" height="5" fill="#7fb4d8" />
      <rect x="179" y="95" width="5" height="5" fill="#7fb4d8" />
      <Plot
        a={a}
        b={b}
        c={c}
        d={d}
        edge="#3f8a2c"
        fields={
          <>
            <polygon points={poly([a, b, c, d])} fill="#5fb840" />
            <polygon points={poly([[65, 119], b, [133, 120], [97, 132]])} fill="#7fcd5c" />
            <polygon points={poly([a, [65, 119], [97, 132], [62, 141]])} fill="#4ea535" />
          </>
        }
      />
      <Pin id="lve-pin" x={98} y={116} from="#ff6b5f" to="#d92b25" />
      <Leaf from={[14, 162]} to={[2, 140]} width={9} fill="url(#lve-leaf)" />
      <Leaf from={[18, 164]} to={[34, 144]} width={9} fill="url(#lve-leaf)" />

      {/* survey sheet with the rupee sign, and coins in front of it */}
      <g filter="url(#lve-shadow)" transform="rotate(7 188 146)">
        <path d="M164 106h42a6 6 0 0 1 6 6v62a6 6 0 0 1-6 6h-42a6 6 0 0 1-6-6v-62a6 6 0 0 1 6-6z" fill="#ffffff" />
      </g>
      <g transform="rotate(7 188 146)">
        <text x="185" y="132" textAnchor="middle" fontSize="22" fontWeight="700" fill="#5a3a1f" fontFamily="inherit">
          ₹
        </text>
        {[142, 150, 158, 166].map((y, i) => (
          <rect key={y} x="168" y={y} width={i === 3 ? 22 : 34} height="3" rx="1.5" fill="#d3dbe2" />
        ))}
      </g>
      <CoinStack id="lve-coin" cx={160} bottom={182} count={4} rx={17} ry={5} h={6.2} />
      <CoinStack id="lve-coin" cx={180} bottom={183} count={2} rx={16} ry={4.8} h={6} />
    </svg>
  )
}

export const LAND_AREA_ICONS = {
  'land-area-converter': LandAreaConverterIcon,
  'land-value-estimator': LandValueEstimatorIcon,
}
