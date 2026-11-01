// Illustrations for the Weather-based Tools cards, drawn as SVG so they stay crisp at any size.
// Each fills a 220 x 170 box.

import { r1, Leaf, LeafGradient } from './IllustrationParts.jsx'

function Drop({ x, y, size, fill }) {
  const s = size
  return <path d={`M${x} ${r1(y - s)}C${r1(x + s * 0.55)} ${r1(y - s * 0.2)} ${r1(x + s * 0.7)} ${r1(y + s * 0.45)} ${x} ${r1(y + s * 0.75)}C${r1(x - s * 0.7)} ${r1(y + s * 0.45)} ${r1(x - s * 0.55)} ${r1(y - s * 0.2)} ${x} ${r1(y - s)}Z`} fill={fill} />
}

function Cloud({ x, y, size = 1 }) {
  const s = size
  return <path d={`M${x} ${y}c${r1(1 * s)} ${r1(-6 * s)} ${r1(8 * s)} ${r1(-8 * s)} ${r1(12 * s)} ${r1(-4 * s)}c${r1(2 * s)} ${r1(-7 * s)} ${r1(13 * s)} ${r1(-8 * s)} ${r1(16 * s)} ${r1(-1 * s)}c${r1(6 * s)} ${r1(-1 * s)} ${r1(9 * s)} ${r1(3 * s)} ${r1(8 * s)} ${r1(5 * s)}z`} fill="#ffffff" />
}

// a seedling with two leaves, `s` times its full size
function Sprout({ x, y, s, fill }) {
  return (
    <g>
      <Leaf from={[x, y]} to={[r1(x - 7 * s), r1(y - 6 * s)]} width={r1(4 * s)} fill={fill} />
      <Leaf from={[x, y]} to={[r1(x + 7 * s), r1(y - 7 * s)]} width={r1(4 * s)} fill={fill} />
      <Leaf from={[x, y]} to={[r1(x + 1 * s), r1(y - 10 * s)]} width={r1(3 * s)} fill={fill} />
    </g>
  )
}

export function RainfallDeficitIcon() {
  // crop rows run from the horizon (vanishing point) down to the front edge of the field
  const vp = [108, 92]
  const rows = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
  const depths = [0.2, 0.31, 0.44, 0.59, 0.77, 0.97]
  const drops = [
    [62, 74], [76, 70], [90, 76], [104, 70], [118, 74], [132, 70],
    [68, 90], [84, 86], [98, 92], [112, 86], [126, 92],
  ]
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <LeafGradient id="wx-leaf" />
        <clipPath id="wx-view">
          {/* a circle round (110, 100), cut flat along the front edge of the field */}
          <path d="M36.7 162A96 96 0 1 1 183.3 162Z" />
        </clipPath>
        <linearGradient id="wx-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9e5f8" />
          <stop offset="0.6" stopColor="#eef7fc" />
        </linearGradient>
        <linearGradient id="wx-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9a46a" />
          <stop offset="1" stopColor="#a87740" />
        </linearGradient>
        <linearGradient id="wx-cloud" x1="0" y1="10" x2="0" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#eaf2fa" />
          <stop offset="0.55" stopColor="#b1c7dd" />
          <stop offset="1" stopColor="#7d9bb9" />
        </linearGradient>
        <linearGradient id="wx-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5fb2f2" />
          <stop offset="1" stopColor="#1f6fca" />
        </linearGradient>
        <linearGradient id="wx-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a9be6" />
          <stop offset="1" stopColor="#a9d2f6" />
        </linearGradient>
        <filter id="wx-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#1d4f7a" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* the view: sky, hills, and a field of crop rows */}
      <g clipPath="url(#wx-view)">
        <rect width="220" height="170" fill="url(#wx-sky)" />
        <Cloud x={158} y={40} size={0.9} />
        <Cloud x={24} y={74} size={0.75} />
        <path d="M10 92C30 76 50 72 72 84C94 68 118 70 142 82C162 74 186 76 210 90V112H10Z" fill="#9fcbb9" />
        <path d="M10 100C40 90 74 90 100 96C134 88 172 90 210 98V114H10Z" fill="#86bfa0" />
        <g>
          <rect x="26" y="88" width="3" height="10" fill="#7a4a24" />
          <circle cx="27.5" cy="86" r="8" fill="#4f9e3e" />
          <rect x="44" y="92" width="2.6" height="8" fill="#7a4a24" />
          <circle cx="45" cy="90" r="6" fill="#5aa847" />
        </g>
        <rect x="0" y="96" width="220" height="74" fill="url(#wx-soil)" />
        <g fill="#b98852" opacity="0.7">
          {rows.map((k) => (
            <path key={k} d={`M${vp[0]} ${vp[1]}L${vp[0] + k * 34 - 9} 170H${vp[0] + k * 34 + 9}Z`} />
          ))}
        </g>
        <path d="M0 96H220V101C150 99 70 99 0 101Z" fill="#7fbf4f" />
        {depths.map((t) =>
          rows.map((k) => {
            const x = r1(vp[0] + k * 34 * t)
            const y = r1(vp[1] + 78 * t)
            return <Sprout key={`${t}${k}`} x={x} y={y} s={r1(0.5 + t * 1.5)} fill="url(#wx-leaf)" />
          }),
        )}
      </g>

      {/* rain cloud with falling drops */}
      {drops.map(([x, y]) => (
        <Drop key={`${x}-${y}`} x={x} y={y} size={3.6} fill="url(#wx-blue)" />
      ))}
      <g fill="url(#wx-cloud)">
        <circle cx="62" cy="48" r="17" />
        <circle cx="84" cy="34" r="22" />
        <circle cx="110" cy="32" r="19" />
        <circle cx="130" cy="46" r="16" />
        <circle cx="100" cy="52" r="16" />
        <rect x="56" y="46" width="78" height="18" rx="9" />
      </g>
      <path d="M70 30C76 20 92 16 102 22" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />

      {/* rainfall chart: bars and a rising line */}
      <g filter="url(#wx-shadow)">
        <rect x="138" y="60" width="74" height="84" rx="7" fill="#ffffff" />
      </g>
      <g fill="#3d8fe0">
        <circle cx="149" cy="75" r="5" />
        <circle cx="155" cy="72" r="6" />
        <circle cx="160" cy="76" r="4.5" />
        <rect x="145" y="75" width="18" height="5" rx="2.5" />
      </g>
      <g fill="#3d8fe0">
        <Drop x={149} y={86} size={2} fill="#3d8fe0" />
        <Drop x={155} y={88} size={2} fill="#3d8fe0" />
        <Drop x={161} y={86} size={2} fill="#3d8fe0" />
      </g>
      <rect x="168" y="70" width="34" height="3" rx="1.5" fill="#d0dbe6" />
      <rect x="168" y="77" width="24" height="3" rx="1.5" fill="#d0dbe6" />
      {[
        [148, 10],
        [158, 14],
        [168, 19],
        [178, 25],
        [188, 32],
        [198, 42],
      ].map(([x, h]) => (
        <rect key={x} x={x} y={136 - h} width="7" height={h} rx="1.5" fill="url(#wx-bar)" />
      ))}
      <polyline points="150,118 160,110 170,113 180,100 190,96 202,82" fill="none" stroke="#2f7fd6" strokeWidth="1.8" strokeLinejoin="round" />
      {[
        [150, 118],
        [160, 110],
        [170, 113],
        [180, 100],
        [190, 96],
        [202, 82],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.4" fill="#2f7fd6" />
      ))}

      {/* water badge */}
      <circle cx="134" cy="122" r="15" fill="url(#wx-blue)" stroke="#ffffff" strokeWidth="3.5" />
      <Drop x={134} y={122} size={7.5} fill="#ffffff" />

      {/* leaves in the front corner */}
      <Leaf from={[192, 166]} to={[176, 138]} width={10} fill="url(#wx-leaf)" />
      <Leaf from={[196, 166]} to={[216, 134]} width={11} fill="url(#wx-leaf)" />
      <Leaf from={[202, 167]} to={[220, 156]} width={7} fill="url(#wx-leaf)" />
    </svg>
  )
}

export const WEATHER_ICONS = {
  'rainfall-deficit': RainfallDeficitIcon,
}
