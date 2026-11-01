// Illustrations for the Financial Calculators cards, drawn as SVG so they stay crisp at any size.
// Each fills a 220 x 170 box: the artwork stands on a soft shadow in front of a pale disc.

import { Leaf, LeafGradient, WheatEar, Backdrop, CoinGradients, CoinStack } from './IllustrationParts.jsx'

export function CropLoanEmiIcon() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <CoinGradients id="emi-coin" />
        <LeafGradient id="emi-leaf" />
        <filter id="emi-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#2f6b47" floodOpacity="0.18" />
        </filter>
      </defs>
      <Backdrop id="emi" from="#e6f5ec" to="#cfe9d9" shadow="#c3e0cd" />

      {/* EMI sheet, its bottom corner curling up */}
      <g filter="url(#emi-shadow)">
        <path d="M136 50h68a8 8 0 0 1 8 8v76c-8 0-14 6-14 18h-60a10 10 0 0 1-10-10V58a8 8 0 0 1 8-8z" fill="#ffffff" />
      </g>
      <path d="M212 134c-8 0-14 6-14 18 8-2 14-8 14-18z" fill="#e3efe8" />
      <text x="170" y="76" textAnchor="middle" fontSize="19" fontWeight="700" fill="#1d6a43" fontFamily="inherit">
        EMI
      </text>
      {[90, 103, 116, 129].map((y, i) => (
        <g key={y}>
          <rect x="141" y={y - 4.5} width="9" height="9" rx="2" fill="none" stroke="#2f9a5a" strokeWidth="1.8" />
          <path d={`M142.5 ${y - 0.5}l2.5 2.6 5-6`} fill="none" stroke="#2f9a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="157" y={y - 1.8} width={i % 2 ? 36 : 42} height="3.6" rx="1.8" fill={i === 0 ? '#9dcdb0' : '#c9e1d2'} />
        </g>
      ))}

      {/* coins with a sprout growing from the back stack */}
      <CoinStack id="emi-coin" cx={74} bottom={140} count={5} rx={30} ry={8.5} h={8.6} />
      <ellipse cx="74" cy="97" rx="20" ry="5.5" fill="#6b4524" />
      <ellipse cx="74" cy="96" rx="14" ry="3.5" fill="#86593a" />
      <path d="M74 97C72 80 72 52 82 14" fill="none" stroke="#3d9a3f" strokeWidth="4.5" strokeLinecap="round" />
      <Leaf from={[73, 70]} to={[24, 26]} width={20} fill="url(#emi-leaf)" />
      <Leaf from={[77, 46]} to={[120, 4]} width={18} fill="url(#emi-leaf)" />
      <Leaf from={[75, 78]} to={[122, 60]} width={14} fill="url(#emi-leaf)" />
      <CoinStack id="emi-coin" cx={50} bottom={160} count={6} rx={27} ry={8} h={8.7} />
      <CoinStack id="emi-coin" cx={103} bottom={161} count={5} rx={26} ry={7.5} h={8.4} />
    </svg>
  )
}

export function KccSubventionIcon() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <CoinGradients id="kcc-coin" />
        <radialGradient id="kcc-bag" cx="0.38" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#ffd978" />
          <stop offset="0.6" stopColor="#f5b53c" />
          <stop offset="1" stopColor="#d98d1c" />
        </radialGradient>
        <linearGradient id="kcc-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc94d" />
          <stop offset="1" stopColor="#e9a128" />
        </linearGradient>
        <linearGradient id="kcc-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4fa6f2" />
          <stop offset="1" stopColor="#1d6cc6" />
        </linearGradient>
      </defs>
      <Backdrop id="kcc" from="#e0effc" to="#cde3f8" shadow="#bfd8f0" />

      {/* rising arrow and bar behind the coins */}
      <rect x="165" y="86" width="13" height="56" rx="3" fill="url(#kcc-blue)" />
      <path d="M134 94l28-26 11 10 22-30" fill="none" stroke="url(#kcc-blue)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M186 40l15-6-3 16z" fill="#2a7fd6" stroke="#2a7fd6" strokeWidth="3" strokeLinejoin="round" />

      {/* money bag */}
      <path d="M68 44C48 56 33 84 33 116c0 30 19 44 47 44s47-14 47-44c0-32-15-60-35-72z" fill="url(#kcc-bag)" />
      <path d="M66 42c-8-12-10-24-2-30 6 6 9-2 16-6 7 4 10 10 16 6 8 7 4 20-4 30z" fill="url(#kcc-top)" />
      <rect x="63" y="37" width="34" height="10" rx="5" fill="#d38716" />
      <text x="84" y="129" textAnchor="middle" fontSize="64" fontWeight="700" fill="#8f4c12" fontFamily="inherit">
        ₹
      </text>

      <CoinStack id="kcc-coin" cx={143} bottom={150} count={7} rx={21} ry={6.5} h={8.4} />
      <CoinStack id="kcc-coin" cx={124} bottom={160} count={5} rx={21} ry={6.5} h={8.2} />

      {/* percentage badge */}
      <circle cx="173" cy="134" r="23" fill="url(#kcc-blue)" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
      <text x="173" y="143" textAnchor="middle" fontSize="26" fontWeight="700" fill="#ffffff" fontFamily="inherit">
        %
      </text>
    </svg>
  )
}

export function CropProfitIcon() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <LeafGradient id="cpi-leaf" />
        <linearGradient id="cpi-skin" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fdd9b8" />
          <stop offset="1" stopColor="#efab7f" />
        </linearGradient>
        <linearGradient id="cpi-sleeve" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8cbcf3" />
          <stop offset="1" stopColor="#4f8ad8" />
        </linearGradient>
      </defs>
      <Backdrop id="cpi" from="#ebe6fb" to="#dcd5f6" shadow="#d2caf1" />

      {/* sprout */}
      <path d="M103 96C101 78 102 50 110 14" fill="none" stroke="#3d9a3f" strokeWidth="4.5" strokeLinecap="round" />
      <Leaf from={[103, 66]} to={[64, 26]} width={17} fill="url(#cpi-leaf)" />
      <Leaf from={[106, 44]} to={[146, 4]} width={17} fill="url(#cpi-leaf)" />
      <Leaf from={[104, 76]} to={[154, 54]} width={14} fill="url(#cpi-leaf)" />

      {/* cupped hand, palm up, fingers curling up on the right */}
      <path d="M56 126C76 122 100 126 124 124C140 120 154 106 166 99C175 94 183 100 179 108C175 122 166 136 154 145C136 158 108 164 82 164C70 164 60 160 56 152Z" fill="url(#cpi-skin)" />
      <g fill="#f3b88f">
        <path d="M170 113c4-1 8 2 6 6-3 6-9 11-14 15-3-2-3-6 0-9 3-4 5-9 8-12z" />
        <path d="M160 125c4-1 7 3 5 6-3 5-8 9-13 12-3-2-3-6 0-8 3-3 5-7 8-10z" />
      </g>
      <path d="M150 127c6-5 12-10 17-16M141 136c6-4 11-8 16-13" stroke="#dc9266" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* soil heaped in the palm */}
      <path d="M64 127C62 115 74 106 88 104C94 96 110 94 120 100C134 99 148 108 149 120C150 127 145 129 138 129L72 131C67 131 64 130 64 127Z" fill="#583619" />
      <g fill="#7a4d2a">
        <ellipse cx="76" cy="116" rx="8" ry="5.5" transform="rotate(-12 76 116)" />
        <ellipse cx="91" cy="105" rx="7" ry="5" transform="rotate(10 91 105)" />
        <ellipse cx="108" cy="97" rx="7.5" ry="4.8" />
        <ellipse cx="125" cy="104" rx="8" ry="5.2" transform="rotate(-8 125 104)" />
        <ellipse cx="140" cy="115" rx="6.5" ry="4.5" transform="rotate(14 140 115)" />
        <ellipse cx="100" cy="118" rx="6" ry="4" transform="rotate(-6 100 118)" />
        <ellipse cx="121" cy="120" rx="6.5" ry="4" />
      </g>
      <g fill="#94633a">
        <ellipse cx="88" cy="113" rx="3.5" ry="2.4" />
        <ellipse cx="113" cy="109" rx="4" ry="2.6" />
        <ellipse cx="132" cy="125" rx="3.2" ry="2.2" />
        <ellipse cx="80" cy="125" rx="3" ry="2" />
      </g>

      {/* thumb across the front */}
      <path d="M90 138C100 130 118 124 136 122C145 121 149 128 143 132C129 139 109 144 95 146C87 147 84 141 90 138Z" fill="#f8c9a2" />
      <ellipse cx="139" cy="126.5" rx="4.6" ry="3" transform="rotate(-10 139 126.5)" fill="#fde2cf" />

      {/* sleeve */}
      <path d="M18 131C30 125 46 122 58 123L62 159C48 163 32 164 22 162Z" fill="url(#cpi-sleeve)" />
      <path d="M54 122.5l5 37" stroke="#3d74c2" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function Tree({ x, y, w, h, trunk = 14 }) {
  return (
    <g>
      <rect x={x - 1.6} y={y + h * 0.7} width="3.2" height={trunk} rx="1.4" fill="#7a4a24" />
      <ellipse cx={x} cy={y + h / 2} rx={w / 2} ry={h / 2} fill="url(#farm-tree)" />
      <path d={`M${x} ${y + h * 0.35}V${y + h * 0.9}`} stroke="#2f7a32" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  )
}

export function FarmLoanIcon() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <radialGradient id="farm-sky" cx="0.65" cy="0.25" r="0.85">
          <stop offset="0" stopColor="#fff4dc" />
          <stop offset="1" stopColor="#fbe3b8" />
        </radialGradient>
        <radialGradient id="farm-sun" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffd75a" />
          <stop offset="1" stopColor="#f6a524" />
        </radialGradient>
        <linearGradient id="farm-tree" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7acb54" />
          <stop offset="1" stopColor="#36893a" />
        </linearGradient>
        <clipPath id="farm-oval">
          <ellipse cx="110" cy="88" rx="106" ry="80" />
        </clipPath>
      </defs>
      <g clipPath="url(#farm-oval)">
        <rect width="220" height="170" fill="url(#farm-sky)" />
        <circle cx="160" cy="36" r="20" fill="url(#farm-sun)" />

        {/* trees behind the house */}
        <Tree x={68} y={22} w={26} h={62} trunk={30} />
        <Tree x={36} y={48} w={22} h={54} trunk={22} />
        <Tree x={16} y={82} w={16} h={34} trunk={14} />
        <Tree x={162} y={74} w={22} h={40} trunk={16} />
        <Tree x={184} y={82} w={18} h={34} trunk={14} />

        {/* house */}
        <rect x="108" y="44" width="8" height="18" fill="#7d4b2e" />
        <rect x="106" y="42" width="12" height="4" rx="1" fill="#5f3720" />
        <polygon points="88,54 128,54 156,92 114,92" fill="#d9472f" />
        <polygon points="116,88 152,88 152,122 116,122" fill="#efece4" />
        <polygon points="60,90 88,60 116,90 116,122 60,122" fill="#fbfbf7" />
        <polyline points="55,94 88,57 121,94" fill="none" stroke="#c13a25" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="82" y="70" width="12" height="10" rx="1" fill="#7d4b2e" />
        <rect x="84" y="72" width="8" height="6" fill="#3f8f50" />
        <rect x="82" y="100" width="13" height="22" rx="1" fill="#8a5530" />
        <rect x="66" y="100" width="9" height="10" fill="#3f8f50" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="122" y="100" width="9" height="10" fill="#3f8f50" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="137" y="100" width="9" height="10" fill="#3f8f50" stroke="#ffffff" strokeWidth="1.5" />
        <g fill="#5aa845">
          <ellipse cx="62" cy="122" rx="8" ry="4" />
          <ellipse cx="104" cy="123" rx="7" ry="3.5" />
          <ellipse cx="150" cy="122" rx="9" ry="4" />
        </g>

        {/* tractor */}
        <rect x="38" y="108" width="20" height="9" rx="2" fill="#2f6b3a" />
        <rect x="48" y="101" width="9" height="8" rx="1.5" fill="#3d8a4b" />
        <rect x="50" y="103" width="5" height="4" fill="#d9f0dd" />
        <circle cx="54" cy="119" r="5" fill="#2b2b2b" />
        <circle cx="54" cy="119" r="2" fill="#f2a227" />
        <circle cx="41" cy="120" r="3.5" fill="#2b2b2b" />
        <circle cx="41" cy="120" r="1.4" fill="#f2a227" />

        {/* rows of crops curving across the fields */}
        <path d="M-6 122C50 114 150 112 230 122V172H-6z" fill="#7cc04e" />
        <path d="M-6 146C50 128 140 120 230 124V131C140 128 60 136-6 156z" fill="#c4e27a" />
        <path d="M-6 168C60 146 150 134 230 138V146C150 143 70 154 6 172H-6z" fill="#c4e27a" />
        <path d="M30 172C90 156 160 150 230 153V161C170 160 110 164 74 172z" fill="#5aa53d" />
        <path d="M-6 132C50 120 140 116 230 118V121C140 120 60 126-6 138z" fill="#5aa53d" opacity="0.7" />
      </g>
    </svg>
  )
}

export function BreakEvenYieldIcon() {
  return (
    <svg viewBox="0 0 220 170" aria-hidden="true">
      <defs>
        <radialGradient id="bey-sack" cx="0.38" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#e7bf86" />
          <stop offset="0.65" stopColor="#c99355" />
          <stop offset="1" stopColor="#a8723a" />
        </radialGradient>
        <linearGradient id="bey-grain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd25a" />
          <stop offset="1" stopColor="#e8a224" />
        </linearGradient>
        <linearGradient id="bey-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#47b26a" />
          <stop offset="1" stopColor="#1f8a46" />
        </linearGradient>
      </defs>
      <Backdrop id="bey" from="#dcf0f0" to="#c8e6e6" shadow="#b9dcdc" cy={112} r={92} ground={150} />

      {/* rising arrow */}
      <path d="M128 96C152 86 172 66 186 38" fill="none" stroke="url(#bey-arrow)" strokeWidth="8" strokeLinecap="round" />
      <path d="M176 38l14-12 4 18z" fill="#1f8a46" stroke="#1f8a46" strokeWidth="3" strokeLinejoin="round" />

      {/* bar chart on its stand */}
      <rect x="132" y="104" width="18" height="40" rx="2" fill="#3fae6a" />
      <rect x="156" y="84" width="18" height="60" rx="2" fill="#f2c14e" />
      <rect x="180" y="62" width="20" height="82" rx="2" fill="#1f9e8f" />
      <rect x="126" y="143" width="82" height="8" rx="4" fill="#cdd9db" />

      {/* sack of grain, tied at the neck and open at the top */}
      <path d="M62 46C44 58 30 82 30 110c0 30 16 40 46 40s46-10 46-40c0-28-14-52-32-64z" fill="url(#bey-sack)" />
      <path d="M60 46C50 40 46 28 52 20C60 14 92 14 100 20C106 28 102 40 92 46Z" fill="#c68f52" />
      <path d="M58 30c4-6 10-4 12 0M84 30c4-5 10-5 13 0" stroke="#a87239" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <ellipse cx="76" cy="21" rx="23" ry="6.5" fill="#8a5a2b" />
      <path d="M56 21C58 12 68 9 76 9s18 3 20 12C90 24 62 24 56 21Z" fill="url(#bey-grain)" />
      <g fill="#ffe08a">
        <ellipse cx="66" cy="16" rx="2.6" ry="1.8" />
        <ellipse cx="74" cy="12.5" rx="2.6" ry="1.8" />
        <ellipse cx="82" cy="15" rx="2.6" ry="1.8" />
        <ellipse cx="89" cy="18" rx="2.4" ry="1.7" />
        <ellipse cx="72" cy="19" rx="2.4" ry="1.7" />
      </g>
      <path d="M58 45c12 5 24 5 36 0" fill="none" stroke="#7d4c1f" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M80 48c-2 6-5 9-8 11M80 48c2 6 4 9 8 10" stroke="#7d4c1f" strokeWidth="2.4" strokeLinecap="round" fill="none" />

      {/* wheat ear printed on the sack, and two lying in front */}
      <WheatEar from={[58, 130]} to={[98, 72]} fill="#f6e6c2" stem="#f6e6c2" />
      <WheatEar from={[92, 156]} to={[146, 126]} fill="url(#bey-grain)" stem="#d4962a" />
      <WheatEar from={[104, 160]} to={[152, 142]} fill="url(#bey-grain)" stem="#d4962a" />
      <g fill="#f0b43a">
        <ellipse cx="128" cy="157" rx="3" ry="1.8" />
        <ellipse cx="138" cy="155" rx="3" ry="1.8" />
        <ellipse cx="146" cy="157" rx="3" ry="1.8" />
      </g>
    </svg>
  )
}

export const FINANCIAL_CALCULATOR_ICONS = {
  'crop-loan-emi': CropLoanEmiIcon,
  'kcc-subvention': KccSubventionIcon,
  'crop-profit': CropProfitIcon,
  'farm-loan': FarmLoanIcon,
  'break-even-yield': BreakEvenYieldIcon,
}
