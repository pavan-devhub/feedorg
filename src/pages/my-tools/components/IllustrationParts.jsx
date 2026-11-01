// Shared pieces for the card illustrations (leaves, ears of wheat, the pale disc behind each one).
// All drawn in the illustrations' 220 x 170 box.

export const r1 = (n) => Math.round(n * 10) / 10

// a leaf from its base (x0, y0) to its tip (x1, y1); w sets how wide it is
export function leafPath(x0, y0, x1, y1, w) {
  const dx = x1 - x0
  const dy = y1 - y0
  const len = Math.hypot(dx, dy)
  const nx = (-dy / len) * w
  const ny = (dx / len) * w
  const at = (t, s) => `${r1(x0 + dx * t + nx * s)} ${r1(y0 + dy * t + ny * s)}`
  return `M${x0} ${y0}C${at(0.2, 1)} ${at(0.7, 0.8)} ${x1} ${y1}C${at(0.7, -0.8)} ${at(0.2, -1)} ${x0} ${y0}Z`
}

export function Leaf({ from, to, width, fill }) {
  const [x0, y0] = from
  const [x1, y1] = to
  return (
    <g>
      <path d={leafPath(x0, y0, x1, y1, width)} fill={fill} />
      <path d={`M${x0} ${y0}L${r1(x0 + (x1 - x0) * 0.82)} ${r1(y0 + (y1 - y0) * 0.82)}`} stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  )
}

export function LeafGradient({ id }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#7fd157" />
      <stop offset="1" stopColor="#2c8c3b" />
    </linearGradient>
  )
}

// an ear of wheat: grains in pairs along the stem from (x0, y0) up to the tip (x1, y1);
// `grain` makes the grains plumper
export function WheatEar({ from, to, fill, stem, pairs = 5, grain = 1 }) {
  const [x0, y0] = from
  const [x1, y1] = to
  const dx = x1 - x0
  const dy = y1 - y0
  const len = Math.hypot(dx, dy)
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI
  const size = len * 0.12 * grain
  const grains = []
  for (let k = 0; k < pairs; k++) {
    const t = 0.4 + (0.52 * k) / (pairs - 1)
    for (const side of [-1, 1]) {
      const cx = r1(x0 + dx * t + (-dy / len) * side * size * 0.45)
      const cy = r1(y0 + dy * t + (dx / len) * side * size * 0.45)
      grains.push(<ellipse key={`${k}${side}`} cx={cx} cy={cy} rx={r1(size * 0.55)} ry={r1(size * 0.27)} transform={`rotate(${r1(angle + side * 32)} ${cx} ${cy})`} />)
    }
  }
  return (
    <g>
      <path d={`M${x0} ${y0}L${r1(x0 + dx * 0.95)} ${r1(y0 + dy * 0.95)}`} stroke={stem} strokeWidth="2" strokeLinecap="round" />
      <g fill={fill}>
        {grains}
        <ellipse cx={x1} cy={y1} rx={r1(size * 0.55)} ry={r1(size * 0.27)} transform={`rotate(${r1(angle)} ${x1} ${y1})`} />
      </g>
    </g>
  )
}

// the pale disc behind each illustration, cut flat where the artwork stands
export function Backdrop({ id, from, to, shadow, cx = 110, cy = 122, r = 97, ground = 160 }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-disc`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <clipPath id={`${id}-cut`}>
          <rect x="0" y="0" width="220" height={ground} />
        </clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-disc)`} clipPath={`url(#${id}-cut)`} />
      <ellipse cx={cx} cy={ground} rx={r * 0.92} ry="6" fill={shadow} />
    </>
  )
}

// gold coins: the side shading and the top face of the top coin
export function CoinGradients({ id }) {
  return (
    <>
      <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#d4920f" />
        <stop offset="0.35" stopColor="#ffd45c" />
        <stop offset="0.7" stopColor="#f1b431" />
        <stop offset="1" stopColor="#c7840c" />
      </linearGradient>
      <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffe9a3" />
        <stop offset="1" stopColor="#f5bb35" />
      </linearGradient>
    </>
  )
}

// a stack of `count` coins standing on `bottom`
export function CoinStack({ id, cx, bottom, count, rx = 26, ry = 7.5, h = 8.5 }) {
  const coins = []
  for (let i = 0; i < count; i++) {
    const yb = r1(bottom - i * h)
    const yt = r1(yb - h)
    coins.push(
      <path key={`c${i}`} d={`M${cx - rx} ${yt}A${rx} ${ry} 0 0 1 ${cx + rx} ${yt}L${cx + rx} ${yb}A${rx} ${ry} 0 0 1 ${cx - rx} ${yb}Z`} fill={`url(#${id}-side)`} />,
      <path key={`l${i}`} d={`M${cx - rx} ${yb}A${rx} ${ry} 0 0 0 ${cx + rx} ${yb}`} fill="none" stroke="#b37708" strokeOpacity="0.55" strokeWidth="1.1" />,
    )
  }
  const top = r1(bottom - count * h)
  return (
    <g>
      {coins}
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill={`url(#${id}-top)`} />
      <ellipse cx={cx} cy={top} rx={r1(rx * 0.66)} ry={r1(ry * 0.6)} fill="none" stroke="#e2a223" strokeWidth="1.3" />
    </g>
  )
}

// a shipping container seen from the side
export function Container({ x, y, w, h, fill, rib }) {
  const ribs = Math.max(3, Math.round(w / 6))
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="1.5" fill={fill} />
      <g stroke={rib} strokeWidth="1.2" strokeOpacity="0.55">
        {Array.from({ length: ribs - 1 }, (_, i) => {
          const rx = r1(x + ((i + 1) * w) / ribs)
          return <line key={i} x1={rx} y1={y + 2} x2={rx} y2={y + h - 2} />
        })}
      </g>
      <rect x={x} y={y} width={w} height="2.5" fill="#ffffff" opacity="0.25" />
    </g>
  )
}
