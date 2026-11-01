// Illustrations for the Insurance & Subsidy Calculators cards, drawn as SVG so they stay crisp at
// any size. Each fills a 220 x 170 box: the artwork stands on a soft shadow in front of a pale disc.

import { r1, Leaf, LeafGradient, WheatEar, Backdrop, CoinGradients, CoinStack } from './IllustrationParts.jsx'

function Cloud({ x, y, size = 1 }) {
  const s = size
  return <path d={`M${x} ${y}c${r1(1 * s)} ${r1(-6 * s)} ${r1(8 * s)} ${r1(-8 * s)} ${r1(12 * s)} ${r1(-4 * s)}c${r1(2 * s)} ${r1(-7 * s)} ${r1(13 * s)} ${r1(-8 * s)} ${r1(16 * s)} ${r1(-1 * s)}c${r1(6 * s)} ${r1(-1 * s)} ${r1(9 * s)} ${r1(3 * s)} ${r1(8 * s)} ${r1(5 * s)}z`} fill="#ffffff" />
}

// a clipboard: coloured board, white sheet, metal clip at the top
function Clipboard({ x, y, w, h, board, clip, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={board} />
      <rect x={x + 6} y={y + 9} width={w - 12} height={h - 15} rx="3" fill="#ffffff" />
      <rect x={r1(x + w / 2 - 15)} y={y - 7} width="30" height="13" rx="4" fill={clip} />
      <circle cx={r1(x + w / 2)} cy={y - 9} r="4.5" fill="none" stroke={clip} strokeWidth="2.6" />
      {children}
    </g>
  )
}

// a ticked row on a form: a check box and a line or two of writing
function TickRow({ x, y, width, ticked = true }) {
  return (
    <g>
      {ticked && <rect x={x} y={y - 5} width="10" height="10" rx="2" fill="#2f9a5a" />}
      {ticked && <path d={`M${x + 2.4} ${y}l2.4 2.6 3.6-5`} fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
      <rect x={x + 15} y={y - 1.8} width={width} height="3.6" rx="1.8" fill="#c9d3dc" />
    </g>
  )
}

// a tuft of grass blades along the ground
function Grass({ x, base, fill, spread = 1 }) {
  const s = spread
  return (
    <g>
      <Leaf from={[x, base]} to={[r1(x - 10 * s), base - 16]} width={3.2} fill={fill} />
      <Leaf from={[x, base]} to={[r1(x + 2 * s), base - 20]} width={3.2} fill={fill} />
      <Leaf from={[x, base]} to={[r1(x + 11 * s), base - 14]} width={3.2} fill={fill} />
    </g>
  )
}

export function CropInsuranceIcon() {
  // the umbrella's rim bows up between the tips of its ribs
  const tips = [16, 57, 98, 139, 180]
  const canopy = 'M16 66Q20 22 98 14Q176 22 180 66Q159.5 58 139 66Q118.5 58 98 66Q77.5 58 57 66Q36.5 58 16 66Z'
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <LeafGradient id="ins-leaf" />
        <linearGradient id="ins-canopy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4cbc5f" />
          <stop offset="1" stopColor="#1f8a3e" />
        </linearGradient>
        <linearGradient id="ins-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4cc068" />
          <stop offset="1" stopColor="#178a3c" />
        </linearGradient>
        <linearGradient id="ins-grain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d7df5c" />
          <stop offset="1" stopColor="#a8b83a" />
        </linearGradient>
      </defs>
      <Backdrop id="ins" from="#e4f6ea" to="#cdebd7" shadow="#c0e1ca" cx={112} cy={112} r={88} />

      {/* umbrella sheltering the crop */}
      <path d="M104 40V128" stroke="#3a4148" strokeWidth="3" strokeLinecap="round" />
      <path d={canopy} fill="url(#ins-canopy)" />
      <g stroke="#17732f" strokeOpacity="0.55" strokeWidth="1.4" fill="none">
        {tips.slice(1, -1).map((t) => (
          <path key={t} d={`M98 15Q${r1(98 + (t - 98) * 0.7)} 36 ${t} 66`} />
        ))}
      </g>
      <path d="M98 15V8" stroke="#2c3238" strokeWidth="3" strokeLinecap="round" />

      {/* rice plants with drooping ears */}
      <g>
        {[
          [[30, 160], [14, 104]],
          [[38, 160], [26, 92]],
          [[48, 160], [58, 96]],
          [[56, 160], [74, 108]],
          [[66, 160], [64, 100]],
          [[74, 160], [90, 112]],
          [[22, 160], [8, 122]],
          [[44, 160], [36, 112]],
          [[62, 160], [84, 126]],
          [[34, 160], [50, 118]],
        ].map(([from, to]) => (
          <Leaf key={`${from}${to}`} from={from} to={to} width={7.5} fill="url(#ins-leaf)" />
        ))}
      </g>
      <g fill="none" stroke="#7aa83a" strokeWidth="1.6" strokeLinecap="round">
        <path d="M40 160C40 120 44 96 52 80" />
        <path d="M60 160C60 126 62 104 70 90" />
        <path d="M28 160C28 128 30 110 34 98" />
      </g>
      <WheatEar from={[52, 80]} to={[34, 74]} fill="url(#ins-grain)" stem="#9fb03a" pairs={5} grain={1.3} />
      <WheatEar from={[52, 80]} to={[62, 62]} fill="url(#ins-grain)" stem="#9fb03a" pairs={4} grain={1.3} />
      <WheatEar from={[70, 90]} to={[86, 82]} fill="url(#ins-grain)" stem="#9fb03a" pairs={4} grain={1.3} />
      <WheatEar from={[34, 98]} to={[20, 88]} fill="url(#ins-grain)" stem="#9fb03a" pairs={4} grain={1.2} />

      {/* the PMFBY form */}
      <Clipboard x={112} y={62} w={84} h={96} board="#1f6a45" clip="#6f7d88">
        <text x="154" y="92" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="#123f2b" fontFamily="inherit">
          PMFBY
        </text>
        <TickRow x={124} y={106} width={44} />
        <TickRow x={124} y={120} width={44} />
        <TickRow x={124} y={132} width={40} ticked={false} />
        <TickRow x={124} y={142} width={36} ticked={false} />
      </Clipboard>

      {/* green shield with a tick, in front */}
      <path d="M100 98L127 107V127C127 146 114 156 100 163C86 156 73 146 73 127V107Z" fill="url(#ins-shield)" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
      <path d="M100 106L120 113V127C120 141 111 149 100 155C89 149 80 141 80 127V113Z" fill="none" stroke="#9fe0b0" strokeOpacity="0.6" strokeWidth="1.5" />
      <path d="M88 129l8 8 16-17" fill="none" stroke="#ffffff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />

      <Grass x={140} base={162} fill="url(#ins-leaf)" />
      <Grass x={184} base={160} fill="url(#ins-leaf)" spread={0.8} />
      <Grass x={12} base={162} fill="url(#ins-leaf)" spread={0.8} />
    </svg>
  )
}

export function SubsidyAmountIcon() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <LeafGradient id="sub-leaf" />
        <CoinGradients id="sub-coin" />
        <radialGradient id="sub-rupee" cx="0.38" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset="0.65" stopColor="#f6bd2e" />
          <stop offset="1" stopColor="#d9940f" />
        </radialGradient>
        <linearGradient id="sub-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4ea4ef" />
          <stop offset="1" stopColor="#1c6fc9" />
        </linearGradient>
      </defs>
      <Backdrop id="sub" from="#e2effc" to="#cbe2f8" shadow="#bed6ee" cx={112} cy={112} r={88} />
      <Cloud x={64} y={40} size={1.1} />
      <Cloud x={150} y={34} size={0.9} />

      {/* rising arrow behind the form */}
      <path d="M140 132C164 120 182 98 196 66" fill="none" stroke="url(#sub-arrow)" strokeWidth="8" strokeLinecap="round" />
      <path d="M185 66l15-11 2 19z" fill="#1c6fc9" stroke="#1c6fc9" strokeWidth="3" strokeLinejoin="round" />

      {/* plants on both sides */}
      {[
        [[34, 160], [16, 110]],
        [[40, 160], [36, 96]],
        [[48, 160], [66, 112]],
        [[30, 160], [10, 132]],
        [[42, 160], [58, 128]],
        [[184, 160], [172, 112]],
        [[188, 160], [176, 134]],
        [[192, 160], [204, 104]],
        [[198, 160], [214, 130]],
      ].map(([from, to]) => (
        <Leaf key={`${from}${to}`} from={from} to={to} width={9.5} fill="url(#sub-leaf)" />
      ))}

      {/* the scheme form, with an official seal */}
      <Clipboard x={68} y={30} w={90} h={120} board="#2d7fd0" clip="#5f86ad">
        <circle cx="113" cy="56" r="8" fill="#e9eef3" stroke="#6b7785" strokeWidth="1.6" />
        <path d="M113 50.5l1.6 3.4 3.7.4-2.8 2.5.8 3.7-3.3-1.9-3.3 1.9.8-3.7-2.8-2.5 3.7-.4z" fill="#6b7785" />
        <text x="113" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d2a3a" fontFamily="inherit" letterSpacing="0.3">
          SCHEME
        </text>
        <TickRow x={80} y={96} width={52} />
        <TickRow x={80} y={112} width={52} />
        <TickRow x={80} y={124} width={40} ticked={false} />
      </Clipboard>

      {/* coins: a big rupee coin and stacks */}
      <CoinStack id="sub-coin" cx={130} bottom={162} count={4} rx={18} ry={5.5} h={7} />
      <CoinStack id="sub-coin" cx={158} bottom={160} count={6} rx={17} ry={5.2} h={7} />
      <circle cx="84" cy="134" r="25" fill="url(#sub-rupee)" stroke="#c9870c" strokeWidth="1.5" />
      <circle cx="84" cy="134" r="19" fill="none" stroke="#fff1b8" strokeOpacity="0.7" strokeWidth="2" />
      <text x="84" y="144" textAnchor="middle" fontSize="28" fontWeight="700" fill="#8a560a" fontFamily="inherit">
        ₹
      </text>
    </svg>
  )
}

export const INSURANCE_SUBSIDY_ICONS = {
  'crop-insurance': CropInsuranceIcon,
  'subsidy-amount': SubsidyAmountIcon,
}
