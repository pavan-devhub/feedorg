// Illustrations for the farmer page tool cards, drawn as SVG so they stay crisp at any size.
// Each fills a 165 x 130 box.

export function FinancialIcon() {
  return (
    <svg viewBox="0 0 165 130" aria-hidden="true">
      <defs>
        <linearGradient id="fin-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4cc96b" />
          <stop offset="1" stopColor="#1d8a3f" />
        </linearGradient>
        <linearGradient id="fin-coin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a6e35c" />
          <stop offset="1" stopColor="#279c45" />
        </linearGradient>
      </defs>
      <path d="M20 112 C12 92 18 70 40 60 C44 82 36 100 20 112 Z" fill="#3fae4f" />
      <path d="M28 120 C30 100 44 88 62 88 C58 106 46 118 28 120 Z" fill="#5cc35f" />
      <path d="M134 60 C150 64 158 80 152 98 C138 90 132 76 134 60 Z" fill="#46b552" />
      <rect x="40" y="12" width="78" height="104" rx="13" fill="url(#fin-body)" />
      <rect x="40" y="12" width="78" height="104" rx="13" fill="none" stroke="#167a35" strokeWidth="2" />
      <rect x="50" y="22" width="58" height="20" rx="4" fill="#e8fbe9" />
      <rect x="54" y="28" width="30" height="8" rx="2" fill="#9fdcaa" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} x={50 + c * 20} y={50 + r * 20} width="15" height="13" rx="3" fill={c === 2 && r === 0 ? '#c8f2cf' : '#ffffff'} opacity="0.95" />
        )),
      )}
      <circle cx="116" cy="96" r="27" fill="url(#fin-coin)" />
      <circle cx="116" cy="96" r="27" fill="none" stroke="#1d8a3f" strokeWidth="2" />
      <circle cx="116" cy="96" r="20" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
      <text x="116" y="106" textAnchor="middle" fontSize="28" fontWeight="700" fill="#ffffff" fontFamily="inherit">
        ₹
      </text>
    </svg>
  )
}

export function CropYieldIcon() {
  return (
    <svg viewBox="0 0 165 130" aria-hidden="true">
      <defs>
        <radialGradient id="crop-sun" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffe36e" />
          <stop offset="1" stopColor="#f9a50f" />
        </radialGradient>
        <linearGradient id="crop-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7ad35b" />
          <stop offset="1" stopColor="#2f9b3c" />
        </linearGradient>
      </defs>
      <g stroke="#f9b414" strokeWidth="4" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 8
          return <line key={i} x1={122 + Math.cos(a) * 22} y1={32 + Math.sin(a) * 22} x2={122 + Math.cos(a) * 29} y2={32 + Math.sin(a) * 29} />
        })}
      </g>
      <circle cx="122" cy="32" r="16" fill="url(#crop-sun)" />
      <path d="M30 116 C34 100 46 94 58 100 C52 112 42 118 30 116 Z" fill="#3d9e45" />
      <path d="M118 116 C114 100 102 94 90 100 C96 112 106 118 118 116 Z" fill="#3d9e45" />
      <ellipse cx="74" cy="114" rx="30" ry="11" fill="#7b4a2a" />
      <ellipse cx="74" cy="110" rx="24" ry="7" fill="#9a6036" />
      <path d="M74 112 C73 92 75 72 82 50" stroke="#3a9a46" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M75 88 C60 92 40 84 32 66 C52 60 70 68 75 88 Z" fill="url(#crop-leaf)" />
      <path d="M78 72 C92 74 108 64 114 46 C96 42 80 52 78 72 Z" fill="url(#crop-leaf)" />
      <path d="M82 52 C76 42 78 30 88 22 C94 32 92 44 82 52 Z" fill="#5cc35f" />
    </svg>
  )
}

export function LandAreaIcon() {
  return (
    <svg viewBox="0 0 165 130" aria-hidden="true">
      <defs>
        <linearGradient id="land-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6fd36b" />
          <stop offset="1" stopColor="#2fa64f" />
        </linearGradient>
        <linearGradient id="land-pin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6b5b" />
          <stop offset="1" stopColor="#d7261e" />
        </linearGradient>
      </defs>
      <g fill="#dcecfb">
        <path d="M14 62 C12 54 20 48 28 52 C30 44 42 42 46 50 C54 48 58 56 54 62 Z" />
        <path d="M112 58 C110 50 118 44 126 48 C128 40 140 38 144 46 C152 44 156 52 152 58 Z" />
      </g>
      <polygon points="82,62 152,92 82,124 12,92" fill="#2b8fd8" />
      <polygon points="82,56 150,86 82,116 14,86" fill="url(#land-top)" stroke="#3aa0e8" strokeWidth="3" strokeLinejoin="round" />
      <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.9">
        <line x1="48" y1="71" x2="116" y2="101" />
        <line x1="116" y1="71" x2="48" y2="101" />
        <line x1="65" y1="63.5" x2="133" y2="93.5" opacity="0.55" />
        <line x1="99" y1="63.5" x2="31" y2="93.5" opacity="0.55" />
      </g>
      <path d="M82 76 C82 76 60 50 60 36 A22 22 0 1 1 104 36 C104 50 82 76 82 76 Z" fill="url(#land-pin)" />
      <circle cx="82" cy="36" r="8" fill="#ffffff" />
    </svg>
  )
}

export function InsuranceIcon() {
  return (
    <svg viewBox="0 0 165 130" aria-hidden="true">
      <defs>
        <linearGradient id="ins-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b866f5" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <g stroke="#c58cf7" strokeWidth="4" strokeLinecap="round">
        <line x1="22" y1="50" x2="31" y2="55" />
        <line x1="18" y1="70" x2="28" y2="70" />
        <line x1="22" y1="90" x2="31" y2="85" />
        <line x1="143" y1="50" x2="134" y2="55" />
        <line x1="147" y1="70" x2="137" y2="70" />
        <line x1="143" y1="90" x2="134" y2="85" />
      </g>
      <path d="M82 10 L124 25 V60 C124 89 106 108 82 120 C58 108 40 89 40 60 V25 Z" fill="url(#ins-shield)" />
      <path d="M82 20 L115 32 V60 C115 83 101 99 82 109 C63 99 49 83 49 60 V32 Z" fill="none" stroke="#e7d4ff" strokeOpacity="0.75" strokeWidth="3" />
      <path d="M82 94 V66" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      <path d="M81 80 C70 82 60 76 58 64 C70 62 79 68 81 80 Z" fill="#ffffff" />
      <path d="M83 80 C94 82 104 76 106 64 C94 62 85 68 83 80 Z" fill="#ffffff" />
      <path d="M82 66 C76 60 76 50 82 42 C88 50 88 60 82 66 Z" fill="#ffffff" />
    </svg>
  )
}

export function WeatherIcon() {
  return (
    <svg viewBox="0 0 165 130" aria-hidden="true">
      <defs>
        <radialGradient id="wx-sun" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffe066" />
          <stop offset="1" stopColor="#ffa90a" />
        </radialGradient>
        <linearGradient id="wx-cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc8ff" />
          <stop offset="1" stopColor="#1f86e0" />
        </linearGradient>
      </defs>
      <g stroke="#ffb31a" strokeWidth="4" strokeLinecap="round">
        <line x1="60" y1="8" x2="60" y2="16" />
        <line x1="30" y1="20" x2="36" y2="26" />
        <line x1="18" y1="48" x2="26" y2="48" />
        <line x1="90" y1="20" x2="84" y2="26" />
        <line x1="30" y1="76" x2="36" y2="70" />
      </g>
      <circle cx="60" cy="48" r="25" fill="url(#wx-sun)" />
      <path d="M58 100 C44 100 40 82 54 78 C54 62 74 56 84 66 C90 50 116 48 124 66 C142 64 150 84 138 96 C136 99 133 100 130 100 Z" fill="url(#wx-cloud)" />
      <path d="M62 82 C64 72 76 68 84 74" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g fill="#1f86e0">
        <path d="M80 108 C80 108 74 116 74 120 A6 6 0 0 0 86 120 C86 116 80 108 80 108 Z" />
        <path d="M100 110 C100 110 94 118 94 122 A6 6 0 0 0 106 122 C106 118 100 110 100 110 Z" />
        <path d="M120 108 C120 108 114 116 114 120 A6 6 0 0 0 126 120 C126 116 120 108 120 108 Z" />
      </g>
    </svg>
  )
}

export const FARMER_TOOL_ICONS = {
  financial: FinancialIcon,
  'crop-yield': CropYieldIcon,
  'land-area': LandAreaIcon,
  insurance: InsuranceIcon,
  weather: WeatherIcon,
}
