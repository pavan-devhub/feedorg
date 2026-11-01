// Illustrations for the Crop & Yield Calculators cards, drawn as SVG so they stay crisp at any size.
// Each fills a 220 x 170 box: the artwork stands on a soft shadow in front of a pale disc.

import { r1, Leaf, LeafGradient, WheatEar, Backdrop } from './IllustrationParts.jsx'

// repeatable "random" numbers, so heaps of granules and seeds look the same on every render
function random(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// `count` points filling a mound centred on cx, standing on `base`
function moundPoints(seed, count, cx, base, halfWidth, height) {
  const next = random(seed)
  return Array.from({ length: count }, () => {
    const u = next() * 2 - 1
    const v = Math.sqrt(next())
    return [r1(cx + u * halfWidth), r1(base - 2 - v * (height - 4) * (1 - u * u)), next()]
  })
}

function Granules({ seed, count, cx, base, halfWidth, height }) {
  return (
    <g>
      <path d={`M${cx - halfWidth} ${base}C${cx - halfWidth * 0.6} ${base - height * 1.3} ${cx + halfWidth * 0.6} ${base - height * 1.3} ${cx + halfWidth} ${base}Z`} fill="#eaf3f9" />
      {moundPoints(seed, count, cx, base, halfWidth, height).map(([x, y, t], i) => (
        <circle key={i} cx={x} cy={y} r={t > 0.5 ? 2.6 : 2.2} fill={t < 0.28 ? '#3b97de' : t < 0.42 ? '#8fcaf3' : '#ffffff'} stroke="#bcd3e4" strokeWidth="0.5" />
      ))}
    </g>
  )
}

function Bean({ x, y, angle }) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx="4.4" ry="3.1" fill="url(#seed-bean)" stroke="#b9792f" strokeWidth="0.5" />
      <ellipse cx={x - 1.2} cy={y - 1} rx="1.5" ry="0.8" fill="#fff3d6" opacity="0.7" />
    </g>
  )
}

// an open jute sack: a soft bulging body, the rolled collar behind and in front of what it holds
function Sack({ id, cx, rim, bottom, halfWidth, children }) {
  const w = halfWidth
  const x = (f) => r1(cx + w * f)
  const body = `M${x(-0.86)} ${rim + 4}C${x(-1.02)} ${rim + 16} ${x(-1.26)} ${bottom - 36} ${x(-1.14)} ${bottom - 10}C${x(-1.06)} ${bottom + 1} ${x(-0.55)} ${bottom + 4} ${x(0.05)} ${bottom + 2}C${x(0.6)} ${bottom + 4} ${x(1.1)} ${bottom + 1} ${x(1.16)} ${bottom - 11}C${x(1.26)} ${bottom - 38} ${x(1.02)} ${rim + 16} ${x(0.86)} ${rim + 4}Z`
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-jute`} cx="0.4" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#efcd98" />
          <stop offset="0.6" stopColor="#d6a565" />
          <stop offset="1" stopColor="#b17b40" />
        </radialGradient>
        <pattern id={`${id}-weave`} width="3" height="3" patternUnits="userSpaceOnUse">
          <path d="M0 1.5h3M1.5 0v3" stroke="#8f6131" strokeOpacity="0.16" strokeWidth="0.7" />
        </pattern>
      </defs>
      <path d={body} fill={`url(#${id}-jute)`} />
      <path d={body} fill={`url(#${id}-weave)`} />
      {/* soft folds in the cloth */}
      <g fill="none" stroke="#9c6a35" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round">
        <path d={`M${x(-0.55)} ${rim + 14}Q${x(-0.7)} ${rim + 40} ${x(-0.5)} ${rim + 62}`} />
        <path d={`M${x(0.6)} ${rim + 14}Q${x(0.74)} ${rim + 42} ${x(0.56)} ${rim + 66}`} />
        <path d={`M${x(-0.2)} ${bottom - 6}Q${cx} ${bottom - 14} ${x(0.25)} ${bottom - 5}`} />
      </g>
      {/* back of the collar, then the contents, then the rolled front lip */}
      <ellipse cx={cx} cy={rim} rx={r1(w * 1.04)} ry="10" fill="#c58f52" />
      <ellipse cx={cx} cy={rim} rx={r1(w * 0.84)} ry="6.5" fill="#7a4c22" />
      {children}
      <path d={`M${x(-1.04)} ${rim}C${x(-1.04)} ${rim + 16} ${x(1.04)} ${rim + 16} ${x(1.04)} ${rim}C${x(0.86)} ${rim + 7} ${x(-0.86)} ${rim + 7} ${x(-1.04)} ${rim}Z`} fill="#deb176" />
      <path d={`M${x(-1.0)} ${rim + 6}C${x(-0.5)} ${rim + 15} ${x(0.5)} ${rim + 15} ${x(1.0)} ${rim + 6}`} fill="none" stroke="#fff0d2" strokeOpacity="0.55" strokeWidth="1.6" />
      <path d={`M${x(-0.96)} ${rim + 10}C${x(-0.45)} ${rim + 18} ${x(0.45)} ${rim + 18} ${x(0.96)} ${rim + 10}`} fill="none" stroke="#a06c35" strokeOpacity="0.55" strokeWidth="1.3" />
    </g>
  )
}

function SoilMound({ from, to, base, height }) {
  const mid = (from + to) / 2
  return (
    <g>
      <path d={`M${from} ${base}C${from + (mid - from) * 0.4} ${base - height} ${to - (to - mid) * 0.4} ${base - height} ${to} ${base}Z`} fill="#5f3b20" />
      <g fill="#7f5230">
        <ellipse cx={r1(mid - (to - from) * 0.2)} cy={base - height * 0.45} rx="5" ry="3" />
        <ellipse cx={r1(mid + (to - from) * 0.18)} cy={base - height * 0.4} rx="5.5" ry="3" />
        <ellipse cx={mid} cy={base - height * 0.7} rx="4.5" ry="2.6" />
      </g>
    </g>
  )
}

// a young plant: a stem from (x, base) up `height`, with broad leaves in pairs along it
function Seedling({ x, base, height, size = 1, fill }) {
  const top = base - height
  const at = (t) => [r1(x + Math.sin(t * 2) * 1.5), r1(base - height * t)]
  const pairs = [0.45, 0.76]
  return (
    <g>
      <path d={`M${x} ${base}C${x - 2} ${r1(base - height * 0.4)} ${x + 2} ${r1(base - height * 0.7)} ${x} ${top}`} fill="none" stroke="#3c9440" strokeWidth={r1(3.2 * size)} strokeLinecap="round" />
      {pairs.map((t, i) => {
        const [px, py] = at(t)
        const reach = (i === 0 ? 28 : 23) * size
        return (
          <g key={t}>
            <Leaf from={[px, py]} to={[r1(px - reach), r1(py - reach * 0.5)]} width={r1(reach * 0.58)} fill={fill} />
            <Leaf from={[px, py]} to={[r1(px + reach), r1(py - reach * 0.62)]} width={r1(reach * 0.6)} fill={fill} />
          </g>
        )
      })}
      <Leaf from={[x, r1(top + 6)]} to={[r1(x + 3), r1(top - 20 * size)]} width={r1(11 * size)} fill={fill} />
    </g>
  )
}

export function FertilizerDosageIcon() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <LeafGradient id="fert-leaf" />
      </defs>
      <Backdrop id="fert" from="#ddf5e4" to="#c7ebd2" shadow="#bfe2c8" ground={156} />

      {/* young plants in soil on the right */}
      <SoilMound from={126} to={214} base={156} height={20} />
      <Seedling x={156} base={146} height={78} size={1.2} fill="url(#fert-leaf)" />
      <Seedling x={192} base={148} height={60} size={0.98} fill="url(#fert-leaf)" />

      {/* sack of fertiliser granules with a leaf printed on it */}
      <Sack id="fert" cx={64} rim={62} bottom={154} halfWidth={42}>
        <Granules seed={7} count={95} cx={64} base={62} halfWidth={36} height={32} />
      </Sack>
      <Leaf from={[62, 134]} to={[44, 106]} width={11} fill="url(#fert-leaf)" />
      <Leaf from={[64, 134]} to={[86, 102]} width={12} fill="url(#fert-leaf)" />

      {/* a heap of granules poured out in front */}
      <Granules seed={23} count={110} cx={108} base={155} halfWidth={36} height={32} />
    </svg>
  )
}

export function SeedRateIcon() {
  const beansInSack = moundPoints(11, 60, 78, 64, 37, 28)
  const spilled = moundPoints(5, 34, 66, 161, 40, 15)
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <LeafGradient id="seed-leaf" />
        <linearGradient id="seed-bean" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5cd88" />
          <stop offset="1" stopColor="#d4974a" />
        </linearGradient>
      </defs>
      <Backdrop id="seed" from="#ddeefd" to="#c8e1f8" shadow="#bcd5ec" ground={158} />

      {/* seedlings coming up on the right */}
      <SoilMound from={130} to={214} base={158} height={22} />
      <Seedling x={148} base={148} height={56} size={0.8} fill="url(#seed-leaf)" />
      <Seedling x={175} base={146} height={84} size={1} fill="url(#seed-leaf)" />
      <Seedling x={201} base={150} height={58} size={0.78} fill="url(#seed-leaf)" />

      {/* sack full of seeds, and a few spilled in front */}
      <Sack id="seed" cx={78} rim={65} bottom={156} halfWidth={43}>
        <path d="M41 64C48 34 108 34 115 64Z" fill="#c78d45" />
        {beansInSack.map(([x, y, t], i) => (
          <Bean key={i} x={x} y={y} angle={r1(t * 160 - 80)} />
        ))}
      </Sack>
      {spilled.map(([x, y, t], i) => (
        <Bean key={i} x={x} y={y} angle={r1(t * 160 - 80)} />
      ))}
    </svg>
  )
}

export function YieldEstimationIcon() {
  // ears of the sheaf fan out from the tie; the ones at the sides droop under their weight
  const tie = [64, 110]
  const ring = (count, from, to, reachX, reachY, length) =>
    Array.from({ length: count }, (_, i) => {
      const a = ((from + ((to - from) * i) / (count - 1)) * Math.PI) / 180
      const droop = (a + Math.PI / 2) * 0.4
      const base = [r1(tie[0] + Math.cos(a) * reachX), r1(tie[1] - 6 + Math.sin(a) * reachY)]
      const tip = [r1(base[0] + Math.cos(a + droop) * length), r1(base[1] + Math.sin(a + droop) * length)]
      const bend = [r1(tie[0] + Math.cos(a) * reachX * 0.45), r1(tie[1] - 6 + Math.sin(a) * reachY * 0.45)]
      return { base, tip, bend }
    })
  const ears = [...ring(12, -172, -8, 26, 30, 34), ...ring(8, -150, -30, 16, 22, 30)]
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <clipPath id="yld-window">
          <path d="M56 158A98 80 0 1 1 180 158Z" />
        </clipPath>
        <linearGradient id="yld-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4dc" />
          <stop offset="1" stopColor="#f8ecc9" />
        </linearGradient>
        <linearGradient id="yld-grain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd45e" />
          <stop offset="1" stopColor="#e09a1f" />
        </linearGradient>
        <linearGradient id="yld-straw" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c98a1d" />
          <stop offset="0.45" stopColor="#f2c056" />
          <stop offset="1" stopColor="#c28219" />
        </linearGradient>
        <linearGradient id="yld-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4cb35a" />
          <stop offset="1" stopColor="#1f8a3b" />
        </linearGradient>
      </defs>

      {/* green fields under a pale sky, seen through an oval window */}
      <g clipPath="url(#yld-window)">
        <rect width="220" height="170" fill="url(#yld-sky)" />
        <path d="M20 78C48 58 78 56 104 70C128 52 152 54 176 66C192 60 206 62 220 70V100H20Z" fill="#b8d7a6" />
        <g fill="#5aa147">
          {[100, 112, 124, 137, 150, 163, 176, 189, 202].map((x, i) => (
            <circle key={x} cx={x} cy={84 - (i % 3)} r={4 + (i % 2)} />
          ))}
        </g>
        <path d="M0 90C80 84 160 84 220 90V170H0Z" fill="#8bcd52" />
        <path d="M70 170C100 132 160 104 220 99V106C166 112 116 138 92 170Z" fill="#b6df7a" />
        <path d="M118 170C146 138 186 120 220 116V124C192 130 160 148 140 170Z" fill="#6db540" />
        <path d="M158 170C178 152 200 140 220 136V144C206 150 190 160 178 170Z" fill="#b6df7a" />
      </g>
      <ellipse cx="116" cy="158" rx="92" ry="6" fill="#ecd9ae" />

      {/* bar chart with a rising arrow */}
      <g stroke="#ffffff" strokeWidth="2">
        <rect x="138" y="124" width="14" height="32" fill="#f2a12e" />
        <rect x="155" y="110" width="14" height="46" fill="#4cb251" />
        <rect x="172" y="94" width="14" height="62" fill="#37a046" />
        <rect x="189" y="74" width="14" height="82" fill="#2b8a3a" />
      </g>
      <path d="M128 116C152 108 176 92 198 60" fill="none" stroke="url(#yld-arrow)" strokeWidth="6" strokeLinecap="round" />
      <path d="M188 60l14-9 1 17z" fill="#1f8a3b" stroke="#1f8a3b" strokeWidth="3" strokeLinejoin="round" />

      {/* sheaf of grain: stalks gathered by a band, ears fanning out above */}
      <path d="M50 110L38 160H90L78 110Z" fill="url(#yld-straw)" />
      <g stroke="#b37616" strokeOpacity="0.7" strokeWidth="1.1">
        {[42, 47, 52, 57, 62, 67, 72, 77, 82, 87].map((x) => (
          <path key={x} d={`M${x} 160L${r1(64 + (x - 64) * 0.55)} 112`} />
        ))}
      </g>
      <g fill="none" stroke="#d39a2a" strokeWidth="2.2" strokeLinecap="round">
        {ears.map(({ base, bend }) => (
          <path key={`s${base}`} d={`M${tie[0]} ${tie[1]}Q${bend[0]} ${bend[1]} ${base[0]} ${base[1]}`} />
        ))}
      </g>
      {ears.map(({ base, tip }) => (
        <WheatEar key={`e${base}`} from={base} to={tip} fill="url(#yld-grain)" stem="#c98a1d" pairs={5} grain={1.55} />
      ))}
      <rect x="46" y="104" width="36" height="11" rx="4.5" fill="#b8771a" />
      <rect x="48" y="106" width="32" height="3" rx="1.5" fill="#e3ab48" />
    </svg>
  )
}

function Drop({ x, y, size, fill }) {
  const s = size
  return <path d={`M${x} ${r1(y - s)}C${r1(x + s * 0.55)} ${r1(y - s * 0.2)} ${r1(x + s * 0.7)} ${r1(y + s * 0.45)} ${x} ${r1(y + s * 0.75)}C${r1(x - s * 0.7)} ${r1(y + s * 0.45)} ${r1(x - s * 0.55)} ${r1(y - s * 0.2)} ${x} ${r1(y - s)}Z`} fill={fill} />
}

// a low leafy plant standing at (x, base)
function LeafyPlant({ x, base, size = 1, fill }) {
  const s = size
  return (
    <g>
      <path d={`M${x} ${base}V${r1(base - 22 * s)}`} stroke="#3c9440" strokeWidth={r1(2.6 * s)} strokeLinecap="round" />
      <Leaf from={[x, r1(base - 5 * s)]} to={[r1(x - 19 * s), r1(base - 20 * s)]} width={r1(13 * s)} fill={fill} />
      <Leaf from={[x, r1(base - 5 * s)]} to={[r1(x + 19 * s), r1(base - 22 * s)]} width={r1(13 * s)} fill={fill} />
      <Leaf from={[x, r1(base - 13 * s)]} to={[r1(x - 12 * s), r1(base - 36 * s)]} width={r1(13 * s)} fill={fill} />
      <Leaf from={[x, r1(base - 13 * s)]} to={[r1(x + 13 * s), r1(base - 37 * s)]} width={r1(13 * s)} fill={fill} />
      <Leaf from={[x, r1(base - 19 * s)]} to={[r1(x + 1), r1(base - 42 * s)]} width={r1(10 * s)} fill={fill} />
    </g>
  )
}

export function WaterRequirementIcon() {
  const drops = [
    [124, 62, 4.5],
    [138, 58, 5],
    [152, 64, 4.5],
    [130, 80, 5],
    [146, 77, 5.5],
    [160, 84, 4.5],
    [122, 97, 4],
    [138, 98, 5],
    [154, 101, 4.5],
  ]
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <LeafGradient id="wat-leaf" />
        <linearGradient id="wat-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a434c" />
          <stop offset="0.45" stopColor="#6c7883" />
          <stop offset="1" stopColor="#2f363d" />
        </linearGradient>
        <linearGradient id="wat-pipe-h" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6c7883" />
          <stop offset="0.5" stopColor="#47515a" />
          <stop offset="1" stopColor="#2f363d" />
        </linearGradient>
        <linearGradient id="wat-drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6cc4f7" />
          <stop offset="1" stopColor="#1f80d8" />
        </linearGradient>
        <linearGradient id="wat-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3ea7f2" />
          <stop offset="1" stopColor="#1565c6" />
        </linearGradient>
      </defs>
      <Backdrop id="wat" from="#dcf4f7" to="#c4e9ee" shadow="#b6dde3" ground={156} />
      <path d="M150 76c0-6 6-10 12-8 2-6 12-8 16-2 6 0 9 6 6 10z" fill="#ffffff" opacity="0.85" />

      {/* pipe up the left and across, with a sprinkler head */}
      <path d="M48 140V50Q48 35 63 35H136" fill="none" stroke="url(#wat-pipe)" strokeWidth="11" />
      <path d="M60 35H136" stroke="url(#wat-pipe-h)" strokeWidth="11" />
      <rect x="41" y="58" width="14" height="7" rx="2" fill="#2c333a" />
      <rect x="98" y="28" width="7" height="14" rx="2" fill="#2c333a" />
      <rect x="132" y="27" width="16" height="16" rx="3" fill="#3a434b" />
      <path d="M135 43h10l-2 8h-6z" fill="#2c333a" />
      <Drop x={152} y={36} size={4} fill="url(#wat-drop)" />
      {drops.map(([x, y, s]) => (
        <Drop key={`${x}-${y}`} x={x} y={y} size={s} fill="url(#wat-drop)" />
      ))}

      {/* water badge */}
      <circle cx="188" cy="60" r="19" fill="url(#wat-badge)" />
      <Drop x={188} y={60} size={10} fill="#ffffff" />

      {/* rows of plants in wet soil */}
      <path d="M12 152C26 138 52 140 74 146C94 136 124 138 146 146C166 136 194 138 210 152V158H12Z" fill="#6b4426" />
      <g fill="#8a5a33">
        <ellipse cx="40" cy="148" rx="6" ry="2.6" />
        <ellipse cx="96" cy="146" rx="6" ry="2.6" />
        <ellipse cx="150" cy="148" rx="6" ry="2.6" />
        <ellipse cx="190" cy="148" rx="5" ry="2.4" />
      </g>
      {[
        [28, 148, 1.05],
        [62, 145, 1.18],
        [96, 143, 1.1],
        [130, 145, 1.2],
        [164, 144, 1.12],
        [196, 148, 1],
      ].map(([x, base, size]) => (
        <LeafyPlant key={x} x={x} base={base} size={size} fill="url(#wat-leaf)" />
      ))}
    </svg>
  )
}

export const CROP_YIELD_ICONS = {
  'fertilizer-dosage': FertilizerDosageIcon,
  'seed-rate': SeedRateIcon,
  'yield-estimation': YieldEstimationIcon,
  'water-requirement': WaterRequirementIcon,
}
