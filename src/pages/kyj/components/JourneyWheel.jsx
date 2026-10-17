import { useEffect, useRef, useState } from 'react'
import { stages } from '../data/screens.js'

// The "KYJ Journey" pinwheel beside the screen launcher's search: one petal per stage,
// numbered and named from data/screens.js so it always matches the stage list below it.
// Decorative only — every position below is in wheel px (hub at 0, 0).

const R_IN = 96 // petals start under the white ring round the hub
const GAP = 12 // white stroke between petals
const TRIM = 9 // how much of each tip that stroke eats
// radii at which each petal's leading-edge swirl is given (`lead` below)
const LEAD_R = [R_IN, 140, 180, 220, 260, 300]

const rad = (deg) => (deg * Math.PI) / 180
// angles run clockwise from 12 o'clock
const polar = (r, deg) => [r * Math.sin(rad(deg)), -r * Math.cos(rad(deg))]
const fmt = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`

// Leading edge: degrees off the tip direction at radius r (0 at the tip itself)
function leadAt({ lead, tip }, r) {
  const rs = [...LEAD_R, tip + TRIM]
  const offsets = [...lead, 0]
  if (r <= rs[0]) return offsets[0]
  const i = rs.findIndex((x) => x >= r)
  if (i < 0) return 0
  return offsets[i - 1] + ((r - rs[i - 1]) / (rs[i] - rs[i - 1])) * (offsets[i] - offsets[i - 1])
}

// Catmull-Rom through the points, as cubic Béziers from the current point
function spline(points) {
  let d = ''
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${fmt(c1)} ${fmt(c2)} ${fmt(p2)}`
  }
  return d
}

// A petal with its tip straight up, `span` degrees clockwise of the previous petal's tip.
// The trailing edge runs along that petal's leading edge, then curls out to this tip:
// `curl` is [how far in from the tip the curl starts, how rounded it is].
function petalPath(petal, prev, span) {
  const { tip, curl: [reach, power] = [92, 2] } = petal
  const rTip = tip + TRIM
  const trail = (r) => {
    const d = rTip - r
    return (leadAt(prev, r) - span) * (d >= reach ? 1 : 1 - (1 - d / reach) ** power)
  }
  const leading = [...LEAD_R, rTip].map((r) => polar(r, leadAt(petal, r)))
  const trailing = [
    ...[0, 2, 5, 9, 14, 20, 28, 38, 50, 64, 78].filter((d) => d < reach).map((d) => rTip - d),
    rTip - reach,
    ...[220, 180, 140].filter((r) => r < rTip - reach - 10),
    R_IN,
  ].map((r) => polar(r, trail(r)))
  return `M${fmt(leading[0])}${spline(leading)}${spline(trailing)}A${R_IN} ${R_IN} 0 0 1 ${fmt(leading[0])}Z`
}

/* ---- Petal content --------------------------------------------------------- */
// While the wheel turns, each petal's content turns back the other way so it stays
// upright and readable. To do that without poking out of its petal, the content is a
// compact block centred on `at` — the point in the petal with the most room around it.

const NUM_W = 36 // the two-digit numbers (34px)
const NUM_CAP = 24.5
const LABEL_CAP = 10.8 // the labels (15px), with LINE between baselines
const LINE = 18.5
const ROW_GAP = 7
const ITEM_GAP = 10

// White line icons in 24-unit boxes; w × h is what's visible when drawn at `size`
const icons = {
  target: {
    w: 34,
    h: 34,
    body: (
      <>
        <circle cx="11" cy="13" r="8.5" />
        <circle cx="11" cy="13" r="5" />
        <circle cx="11" cy="13" r="1.4" />
        <path d="M11 13 20 4M20 4l-.2-2.8M20 4l2.8.2M18 6l-.2-2.6M18 6l2.6.2" />
      </>
    ),
  },
  sprout: {
    w: 26,
    h: 33,
    body: (
      <>
        <path d="M12 22V10.5" />
        <path d="M12 12.5c-3-2.2-3.4-6.4 0-10 3.4 3.6 3 7.8 0 10zM12 12.5V6.5" />
        <path d="M12 18.5c-1.1-2.9-3.7-4.4-7.6-4.3.3 3.6 3.3 5.2 7.6 4.3zM12 18.5c1.1-2.9 3.7-4.4 7.6-4.3-.3 3.6-3.3 5.2-7.6 4.3z" />
      </>
    ),
  },
  box: {
    w: 30,
    h: 32,
    body: (
      <>
        <path d="M12 2.5 3 6.8v10.4l9 4.3 9-4.3V6.8z" />
        <path d="m3 6.8 9 4.3 9-4.3M12 11.1v10.4M7.5 4.6l9 4.4v3.4" />
        <path d="m14.6 16.8 1.6-.8M14.6 19l3-1.4" />
      </>
    ),
  },
  compliance: {
    w: 30,
    h: 34,
    body: (
      <>
        <path d="M13.5 2H6.2a1.7 1.7 0 0 0-1.7 1.7v16.6A1.7 1.7 0 0 0 6.2 22H11M13.5 2v4.5H18V10M13.5 2 18 6.5" />
        <path d="M7.5 9h4M7.5 12.5h5M7.5 16h3" />
        <path d="m17.5 12.2 4 1.6v3.1c0 2.6-1.7 4.3-4 5.1-2.3-.8-4-2.5-4-5.1v-3.1z" />
        <path d="m15.8 17.1 1.2 1.2 2.3-2.4" />
      </>
    ),
  },
  ship: {
    size: 60,
    stroke: 0.85,
    w: 53,
    h: 36,
    body: (
      <>
        <path d="M1.5 14.5h21l-2.4 4.9a1 1 0 0 1-.9.6H4.8a1 1 0 0 1-.9-.6z" />
        <path d="M5 14.5V11.2h14v3.3M8 11.2V8.4h8v2.8M10.4 8.4V6h3.2v2.4" />
        <path d="M7.5 12.9h1.2M11.4 12.9h1.2M15.3 12.9h1.2M4.5 17.2h15" />
      </>
    ),
  },
  flask: {
    w: 26,
    h: 32,
    body: (
      <>
        <path d="M9 2.5h6M10 2.5v6.2L4.6 18.4a2 2 0 0 0 1.8 3.1h11.2a2 2 0 0 0 1.8-3.1L14 8.7V2.5" />
        <path d="M6.8 15h10.4M10 18.2h.01M13.6 17.8h.01" />
      </>
    ),
  },
  truck: {
    size: 46,
    w: 39,
    h: 23,
    body: (
      <>
        <path d="M13.5 16.5v-10h-11v10h2M8.5 16.5h6M13.5 9.5h4l3 3.5v3.5h-2" />
        <circle cx="6.5" cy="16.5" r="2" />
        <circle cx="16.5" cy="16.5" r="2" />
      </>
    ),
  },
  globe: {
    w: 32,
    h: 32,
    body: (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M12 2.5c-2.8 2.6-4.2 5.8-4.2 9.5s1.4 6.9 4.2 9.5c2.8-2.6 4.2-5.8 4.2-9.5S14.8 5.1 12 2.5zM12 2.5v19" />
        <path d="M2.5 12h19M3.8 7.2c4.9 1.2 11.5 1.2 16.4 0M3.8 16.8c4.9-1.2 11.5-1.2 16.4 0" />
      </>
    ),
  },
  // drawn by PetalMedal; it keeps its colours
  medal: { w: 25, h: 38 },
}

function PetalMedal({ x, y }) {
  return (
    <g transform={`translate(${x - 12 * 1.85} ${y - 11.85 * 1.85}) scale(1.85)`}>
      <path d="M6.4 1.5h4.4l3 7.6H9.4z" fill="#e5484d" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M17.6 1.5h-4.4l-3 7.6h4.4z" fill="#2f9e5b" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx="12" cy="15.6" r="6.6" fill="url(#jw-silver)" stroke="#fff" strokeWidth="1.5" />
      <path d="M12 12.4a1 1 0 1 0 0 .1M10.6 19.2l1.4-2.6 1.4 2.6M12 16.6v-2.8l-1.7 1.4M12 13.8l1.6 1.2" fill="none" stroke="#7a6b5d" strokeWidth=".95" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

function PetalIcon({ name, x, y }) {
  if (name === 'medal') return <PetalMedal x={x} y={y} />
  const { size = 40, stroke = 1.3, body } = icons[name]
  return (
    <g
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}
      fill="none"
      stroke="#fff"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {body}
    </g>
  )
}

// Stacks the block's rows round `at`; items in the same row sit side by side.
// Returns the centre of the icon, the number and the label.
function layoutContent({ at: [cx, cy], icon, label, rows }) {
  const size = {
    icon: [icons[icon].w, icons[icon].h],
    num: [NUM_W, NUM_CAP],
    label: [0, LABEL_CAP + LINE * (label.length - 1)],
  }
  const lines = rows.map((row) => [row].flat())
  const heights = lines.map((row) => Math.max(...row.map((item) => size[item][1])))
  let y = cy - (heights.reduce((a, b) => a + b) + ROW_GAP * (rows.length - 1)) / 2
  const centres = {}
  lines.forEach((row, r) => {
    let x = cx - (row.reduce((w, item) => w + size[item][0], 0) + ITEM_GAP * (row.length - 1)) / 2
    for (const item of row) {
      centres[item] = [x + size[item][0] / 2, y + heights[r] / 2]
      x += size[item][0] + ITEM_GAP
    }
    y += heights[r] + ROW_GAP
  })
  return { ...centres, labelTop: centres.label[1] - size.label[1] / 2 }
}

/* ---- Petals ---------------------------------------------------------------- */

// Each stage's petal look, in stage order. colors: hub → tip, matching the stage's
// colour in stage-journey.css ([data-stage]).
const looks = [
  { colors: ['#c92146', '#f23552', '#ff5a6f'], icon: 'target' }, // 00 EPM & Onboarding
  { colors: ['#6a2fe2', '#8737f8', '#a24efd'], icon: 'sprout' }, // 01 Farm Ready
  { colors: ['#0a3be4', '#0a52f8', '#0973ff'], icon: 'compliance' }, // 02 Registered
  { colors: ['#029df6', '#10adfb', '#2bbdfd'], icon: 'box' }, // 03 Packhouse
  { colors: ['#009c7e', '#04b18a', '#18c99b'], icon: 'flask' }, // 04 Quality
  { colors: ['#2cb20b', '#62c40a', '#b9dc2c'], icon: 'globe' }, // 05 Buyer
  { colors: ['#f47c02', '#fd9d06', '#fec52a'], icon: 'truck' }, // 06 Sample
  { colors: ['#f4661a', '#fb8318', '#fea021'], icon: 'ship' }, // 07 FIRC
  { colors: ['#3d4c6b', '#5a6b8c', '#8a9ab8'], icon: 'medal' }, // 08 KYJ-1 Certified (platinum)
]

// Same-shaped petals, evenly spaced with stage 00 at the top and the rest clockwise.
// angle / tip: where each tip points (clockwise from 12 o'clock) and how far out; lead: the
// leading edge's swirl in degrees at LEAD_R; at: centre of the content (see above).
const SPAN = 360 / stages.length
const FIRST_ANGLE = -3
const TIP = 322
const LEAD = [12, 9.5, 6, 3, 1, 0.3]
const CONTENT_R = 216 // content centre: this far out…
const CONTENT_TURN = -15 // …and this many degrees back from the tip, mid-petal

const twoDigits = (value) => String(value).padStart(2, '0')

// "EPM & Onboarding" → ["EPM &", "Onboarding"]: longer names split before the last word
function labelLines(name) {
  const cut = name.lastIndexOf(' ')
  return name.length > 10 && cut > 0 ? [name.slice(0, cut), name.slice(cut + 1)] : [name]
}

const petals = stages.map((stage, i) => {
  const angle = FIRST_ANGLE + i * SPAN
  return {
    ...looks[i % looks.length],
    angle,
    tip: TIP,
    lead: LEAD,
    at: polar(CONTENT_R, angle + CONTENT_TURN),
    num: twoDigits(stage.id),
    label: labelLines(stage.name),
    // number and icon side by side keeps the block short enough to stay inside the
    // narrower petals at every turn of the wheel
    rows: [['num', 'icon'], 'label'],
  }
})

const shapes = petals.map((petal, i) => {
  const prev = petals.at(i - 1)
  return petalPath(petal, prev, (petal.angle - prev.angle + 360) % 360)
})

// First view: each petal flies in from out along its own direction, turned a little
// (alternately either way), and lands in place — see .journey-wheel__petal
const entrances = petals.map(({ angle }, i) => {
  const [x, y] = polar(380, angle - 20)
  return { '--i': i, '--from-x': `${Math.round(x)}px`, '--from-y': `${Math.round(y)}px`, '--from-r': `${i % 2 ? 50 : -50}deg` }
})

function PetalContent(petal) {
  const { num, icon, label } = petal
  const at = layoutContent(petal)
  return (
    <g className="journey-wheel__upright">
      <PetalIcon name={icon} x={at.icon[0]} y={at.icon[1]} />
      <text className="journey-wheel__num" x={at.num[0]} y={at.num[1] + NUM_CAP / 2} textAnchor="middle">{num}</text>
      {label.map((text, i) => (
        <text key={text} className="journey-wheel__label" x={at.label[0]} y={at.labelTop + LABEL_CAP + i * LINE} textAnchor="middle">
          {text}
        </text>
      ))}
    </g>
  )
}

export default function JourneyWheel({ className }) {
  const ref = useRef(null)
  // The petals' entrance (and the turning after it) waits until the wheel is first seen;
  // without IntersectionObserver it just plays straight away
  const [inView, setInView] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      className={['journey-wheel', className, inView && 'is-in-view'].filter(Boolean).join(' ')}
      viewBox="-370 -370 740 740"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {petals.map(({ colors: [from, via, to] }, i) => (
          <linearGradient key={i} id={`jw-petal-${i}`} gradientUnits="userSpaceOnUse" x1="-20" y1={-R_IN} x2="-90" y2="-330">
            <stop offset="0" stopColor={from} />
            <stop offset="0.5" stopColor={via} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        ))}
        <radialGradient id="jw-silver" cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#f1efec" />
          <stop offset="0.55" stopColor="#bdb8b1" />
          <stop offset="1" stopColor="#8f8a84" />
        </radialGradient>
        <linearGradient id="jw-leaf" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0b8fbf" />
          <stop offset="1" stopColor="#17b29a" />
        </linearGradient>
        <filter id="jw-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1d3f86" floodOpacity="0.2" />
        </filter>
        <filter id="jw-hub-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#16336e" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Petals and their content turn round the hub together (see .journey-wheel__spin), the
          content turning back as it goes so it stays upright; the shadow is applied outside
          the turning group so it stays put below them. Each petal is drawn whole (shape,
          white gap round it, content) so it can fly in on its own; a petal's gap stroke
          covers its neighbours' edges, so the gaps come out the same in any order. */}
      <g filter="url(#jw-shadow)">
        <g className="journey-wheel__spin">
          {petals.map((petal, i) => (
            <g key={petal.num} className="journey-wheel__petal" style={entrances[i]}>
              <path d={shapes[i]} transform={`rotate(${petal.angle})`} fill={`url(#jw-petal-${i})`} />
              <path d={shapes[i]} transform={`rotate(${petal.angle})`} fill="none" stroke="#fff" strokeWidth={GAP} strokeLinejoin="round" />
              <PetalContent {...petal} />
            </g>
          ))}
        </g>
      </g>

      {/* Hub */}
      <circle r="95" fill="#fff" stroke="#e4ebf6" strokeWidth="2" filter="url(#jw-hub-shadow)" />
      <g transform="translate(-19.5 -74) scale(0.98)">
        <path d="M18.5 38c-.4-7.6.6-13.7 3-19" fill="none" stroke="#0c83c8" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M21.2 19.4C20 10.6 25 3.4 37 1.2c1.1 10.6-4.5 17.4-15.8 18.2z" fill="url(#jw-leaf)" />
        <path d="M23.4 16.6c3-4.6 6.5-8.4 10.6-11.4" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M18.6 28.2C12.4 29.6 5 26.8 1.4 18c8.4-2.4 14.8 1.6 17.2 10.2z" fill="#1d84d6" />
        <path d="M16.4 26.2c-3.2-2.8-6.6-4.8-10.8-6" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M20.4 30c3.4-4.4 8.6-5.6 13.8-3.6-3.2 4.6-8.4 5.8-13.8 3.6z" fill="#1d84d6" />
      </g>
      <text className="journey-wheel__kyj" y="9" textAnchor="middle">KYJ</text>
      <text className="journey-wheel__journey" y="38" textAnchor="middle">Journey</text>
      <text className="journey-wheel__stages" y="62" textAnchor="middle">{`${stages.length} Stages`}</text>
    </svg>
  )
}
