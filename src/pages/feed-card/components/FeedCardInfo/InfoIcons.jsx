// Colourful 48×48 icons for the info panels, drawn to echo the mockups' emoji-style artwork.

function Svg({ children }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

export function PercentIcon() {
  return (
    <Svg>
      <g fill="none" stroke="#1f63e6" strokeWidth="5" strokeLinecap="round">
        <circle cx="14.5" cy="14.5" r="6" />
        <circle cx="33.5" cy="33.5" r="6" />
        <path d="M35.5 10.5 12.5 37.5" />
      </g>
    </Svg>
  )
}

export function CoinsIcon() {
  return (
    <Svg>
      {[34, 26, 18].map((y) => (
        <g key={y}>
          <path d={`M10 ${y}v5.5a14 5.5 0 0 0 28 0V${y}z`} fill="#de6c08" />
          <ellipse cx="24" cy={y} rx="14" ry="5.5" fill="#f49524" />
        </g>
      ))}
      <ellipse cx="24" cy="18" rx="14" ry="5.5" fill="#fbb446" />
      <ellipse cx="24" cy="18" rx="9.5" ry="3.4" fill="none" stroke="#e98510" strokeWidth="1.4" />
      {/* Font as an inline style, not the fontFamily attribute: the site's global `*` font rule
          (src/index.css) would override a presentation attribute. */}
      <text
        x="24"
        y="20.6"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fill="#c35a04"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        ₹
      </text>
    </Svg>
  )
}

export function GridIcon() {
  return (
    <Svg>
      <g fill="#5a23dc">
        <rect x="6" y="6" width="16" height="16" rx="4.5" />
        <rect x="26" y="6" width="16" height="16" rx="4.5" />
        <rect x="6" y="26" width="16" height="16" rx="4.5" />
        <rect x="26" y="26" width="16" height="16" rx="4.5" />
      </g>
    </Svg>
  )
}

export function PinIcon() {
  return (
    <Svg>
      <path
        d="M24 4C15.7 4 9 10.5 9 18.6 9 29.5 24 44 24 44s15-14.5 15-25.4C39 10.5 32.3 4 24 4z"
        fill="#ec3b54"
      />
      <circle cx="24" cy="18" r="6" fill="#fff" />
    </Svg>
  )
}

export function SproutIcon() {
  return (
    <Svg>
      <path d="M9 41c2-5.5 7.6-8.5 15-8.5S37 35.5 39 41z" fill="#4a3a30" />
      <rect x="22.5" y="18" width="3" height="16" rx="1.5" fill="#2f9e44" />
      <path d="M24 23c-1-6.5-6.4-10.6-14-10.6 0 7.6 5.6 11.8 14 10.6z" fill="#46bf55" />
      <path d="M24 20c1-6.5 6.4-10.6 14-10.6 0 7.6-5.6 11.8-14 10.6z" fill="#2f9e44" />
    </Svg>
  )
}

function gearPath(cx, cy, outer, inner, teeth, hole) {
  const step = (Math.PI * 2) / teeth
  const points = []
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    for (const [r, da] of [
      [inner, -0.5],
      [outer, -0.28],
      [outer, 0.28],
      [inner, 0.5],
    ]) {
      const t = a + da * step
      points.push(`${(cx + r * Math.cos(t)).toFixed(2)} ${(cy + r * Math.sin(t)).toFixed(2)}`)
    }
  }
  return `M${points.join('L')}Z M${cx + hole} ${cy}a${hole} ${hole} 0 1 0 ${-hole * 2} 0a${hole} ${hole} 0 1 0 ${hole * 2} 0Z`
}

const GEAR = gearPath(24, 24, 19, 14.5, 8, 6)

export function GearIcon() {
  return (
    <Svg>
      <path d={GEAR} fill="#6b2fd9" fillRule="evenodd" />
    </Svg>
  )
}

export function TruckIcon() {
  return (
    <Svg>
      <rect x="3" y="11" width="25" height="19" rx="3" fill="#ef4b57" />
      <path d="M28 17h8.4c1 0 1.9.5 2.5 1.3l5 7c.4.6.6 1.2.6 1.9V31H28z" fill="#df3946" />
      <path d="M31 20h5l3.7 5.2H31z" fill="#8fd0ff" />
      <rect x="3" y="29" width="42" height="3.5" rx="1" fill="#b92a35" />
      {[12, 36].map((x) => (
        <g key={x}>
          <circle cx={x} cy="34.5" r="5" fill="#2b2b33" />
          <circle cx={x} cy="34.5" r="2" fill="#d8dbe2" />
        </g>
      ))}
    </Svg>
  )
}

export function PlusIcon() {
  return (
    <Svg>
      <g fill="#1f63e6">
        <rect x="18.5" y="6" width="11" height="36" rx="3" />
        <rect x="6" y="18.5" width="36" height="11" rx="3" />
      </g>
    </Svg>
  )
}

export function CapIcon({ top = '#5b2bd0', base = '#3d1fa0', tassel = '#e8473f' }) {
  return (
    <Svg>
      <path d="M12 22.5v8.5c0 3.6 5.4 6.5 12 6.5s12-2.9 12-6.5v-8.5l-12 5.2z" fill={base} />
      <path d="M24 9 2.5 18.5 24 28l21.5-9.5z" fill={top} />
      <path d="M40.5 20.5V31" stroke={tassel} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M40.5 30c-1.8 2.3-2.2 4.2-1.4 5.6.7 1.2 2.1 1.2 2.8 0 .8-1.4.4-3.3-1.4-5.6z" fill={tassel} />
    </Svg>
  )
}

export function CartIcon() {
  return (
    <Svg>
      <path d="M12.5 14h29l-4.2 15.5H15.8z" fill="#22b35f" />
      <g stroke="#e9fbf0" strokeWidth="1.6">
        <path d="M22 14.5v14.5M31 14.5v14.5M14 21.7h26" />
      </g>
      <path
        d="M4 8h5.5l5.5 24h23"
        fill="none"
        stroke="#17984d"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="38.5" r="3.4" fill="#17984d" />
      <circle cx="35" cy="38.5" r="3.4" fill="#17984d" />
    </Svg>
  )
}

export function FarmerIcon() {
  return (
    <Svg>
      <path d="M9 45c0-9 6.7-14.5 15-14.5S39 36 39 45z" fill="#2f6fd6" />
      <rect x="17.5" y="35" width="13" height="10" rx="2" fill="#1f55b6" />
      <path d="M19 31.5v5M29 31.5v5" stroke="#1f55b6" strokeWidth="2.4" />
      <circle cx="24" cy="21" r="7.5" fill="#f2b07a" />
      <ellipse cx="24" cy="14.5" rx="13.5" ry="3.6" fill="#a8641f" />
      <path d="M16 14.5c0-6.2 3.6-9.5 8-9.5s8 3.3 8 9.5z" fill="#c9802f" />
    </Svg>
  )
}

export function WheatIcon() {
  const grains = [14, 20.5, 27]
  return (
    <Svg>
      <path d="M24 45V13" stroke="#7fb93c" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24 39c-6.4-.8-10.6-5-11.6-10.8 6.4.8 10.6 4.6 11.6 10.8z" fill="#6cbf4b" />
      <path d="M24 35c6.4-.8 10.6-5 11.6-10.8-6.4.8-10.6 4.6-11.6 10.8z" fill="#58ad3d" />
      {grains.map((y) => (
        <g key={y} fill="#f2b632">
          <ellipse cx="19.5" cy={y} rx="3.2" ry="5.6" transform={`rotate(-32 19.5 ${y})`} />
          <ellipse cx="28.5" cy={y} rx="3.2" ry="5.6" transform={`rotate(32 28.5 ${y})`} />
        </g>
      ))}
      <ellipse cx="24" cy="8.5" rx="3.2" ry="5.6" fill="#f7c64a" />
    </Svg>
  )
}

export function HandshakeIcon() {
  return (
    <Svg>
      <path d="M1.5 17.5 10 12l6.5 9.5L8 28z" fill="#e3870f" />
      <path d="M46.5 17.5 38 12l-6.5 9.5L40 28z" fill="#e3870f" />
      <path
        d="M12.5 15.5c3.2-2.3 6.6-3 9.8-2l3.6 1.2c2.4-1.3 5.4-1.6 8.5.2l4.8 3.6-3.4 10.6c-.8 2.2-3 3.2-5 2.4l-1 1.1c-1.2 1.9-3.4 2.4-5.3 1.4l-1 .7c-1.6 1.4-3.8 1.5-5.4.4l-1.2.1c-2 .9-4.2.3-5.3-1.4L8.2 27.5z"
        fill="#f8c03e"
      />
      <path
        d="M25.9 14.7 19 20.8c-1.4 1.3-.6 3.4 1.3 3.5 1.5.1 3-.5 4.2-1.5l3.4-2.8"
        fill="none"
        stroke="#d99412"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28.5 27.5l2.6 2.6M25 30.2l2.5 2.4M21.3 32.4l2 1.8" stroke="#d99412" strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  )
}

export function GlobeIcon() {
  return (
    <Svg>
      <circle cx="24" cy="24" r="19" fill="#2f86e8" />
      <g fill="#3fbf6b">
        <path d="M12.5 13.5c4-2.6 8.6-2 9.8 1.2 1.1 3-1.6 5.2-4.8 6.2-3.3 1-3 5.2-6.3 4.6-2.8-.5-3.8-4.6-2.6-7.8.6-1.7 2.1-3 3.9-4.2z" />
        <path d="M30.5 26c3.4-1.3 6.6 0 7.6 2.9 1.1 3.3-1 7.4-4.4 8.6-3.1 1.1-6.2-.3-6.4-3.9-.2-3.3.4-6.4 3.2-7.6z" />
        <path d="M27 8.6c2.4-.2 4.6.9 4.6 2.8 0 1.8-2.2 2.4-4.2 1.6-2-.8-2.7-4.2-.4-4.4z" />
      </g>
      <circle cx="24" cy="24" r="19" fill="none" stroke="#1f6fd0" strokeWidth="1.5" />
    </Svg>
  )
}

export function TractorIcon() {
  return (
    <Svg>
      <rect x="20" y="9" width="3" height="9" rx="1" fill="#2b2b33" />
      <path d="M7 26h18V15.5h10.5l4.5 10.5v8.5H7z" fill="#34a853" />
      <path d="M28.5 18h5.6l3.2 7.2h-8.8z" fill="#bfe8ff" />
      <rect x="7" y="24" width="18" height="3" fill="#2a8c45" />
      <circle cx="16" cy="34.5" r="8.5" fill="#2b2b33" />
      <circle cx="16" cy="34.5" r="3.6" fill="#a7adb4" />
      <circle cx="38" cy="37" r="5.5" fill="#2b2b33" />
      <circle cx="38" cy="37" r="2.2" fill="#a7adb4" />
    </Svg>
  )
}

export function PeopleIcon() {
  return (
    <Svg>
      <circle cx="31" cy="15" r="6.5" fill="#4f25b8" />
      <path d="M19 41c0-7.5 5.4-13 12-13s12 5.5 12 13v1.5H19z" fill="#4f25b8" />
      <circle cx="17" cy="15" r="6.5" fill="#6a3fd9" />
      <path d="M5 41c0-7.5 5.4-13 12-13s12 5.5 12 13v1.5H5z" fill="#6a3fd9" />
    </Svg>
  )
}

export function ShopIcon() {
  const stripes = [0, 1, 2, 3, 4, 5]
  return (
    <Svg>
      <rect x="9" y="21" width="30" height="19" fill="#fbd2d6" />
      <rect x="12" y="25" width="6.5" height="6" rx="1" fill="#8fc7ff" />
      <rect x="29.5" y="25" width="6.5" height="6" rx="1" fill="#8fc7ff" />
      <rect x="20.5" y="27" width="7" height="13" rx="1" fill="#3c7be8" />
      <rect x="6" y="8" width="36" height="5" rx="2" fill="#d73b45" />
      {stripes.map((i) => (
        <g key={i} fill={i % 2 ? '#ffffff' : '#ef4b57'}>
          <rect x={6 + i * 6} y="13" width="6" height="6" />
          <circle cx={9 + i * 6} cy="19" r="3" />
        </g>
      ))}
      <rect x="6" y="40" width="36" height="3" rx="1" fill="#c93c44" />
    </Svg>
  )
}

export function CheckIcon() {
  return (
    <Svg>
      <path
        d="M11 25.5l8.5 8.5L37.5 14"
        fill="none"
        stroke="#1f4d3a"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function StakeholderCapIcon() {
  return <CapIcon top="#1f2433" base="#2d3446" tassel="#f3b51c" />
}
