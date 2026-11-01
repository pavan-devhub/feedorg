// Illustrations for the SHG Calculators cards, drawn as SVG so they stay crisp at any size.
// Each fills a 230 x 140 box: the artwork stands in front of a pale coloured oval.

import { r1, Leaf, LeafGradient, CoinGradients, CoinStack } from './IllustrationParts.jsx'

function Backdrop({ fill }) {
  return <ellipse cx="115" cy="68" rx="106" ry="64" fill={fill} />
}

// a woman from the waist up in a sari; s scales her
function Woman({ x, y, s = 1, sari, pallu, blouse }) {
  const k = (n) => r1(n * s)
  return (
    <g>
      {/* hair behind the head, and a bun */}
      <circle cx={x + k(8)} cy={y - k(5)} r={k(5.5)} fill="#24150f" />
      <path d={`M${x - k(10.5)} ${y + k(2)}C${x - k(12)} ${y - k(12)} ${x + k(12)} ${y - k(12)} ${x + k(10.5)} ${y + k(2)}L${x + k(11)} ${y + k(14)}H${x - k(11)}Z`} fill="#24150f" />
      {/* body: blouse at the top, sari below */}
      <path d={`M${x - k(17)} ${y + k(46)}C${x - k(18)} ${y + k(26)} ${x - k(11)} ${y + k(14)} ${x} ${y + k(14)}C${x + k(11)} ${y + k(14)} ${x + k(18)} ${y + k(26)} ${x + k(17)} ${y + k(46)}Z`} fill={blouse} />
      <path d={`M${x - k(17)} ${y + k(46)}C${x - k(17)} ${y + k(34)} ${x - k(13)} ${y + k(28)} ${x - k(8)} ${y + k(27)}H${x + k(10)}C${x + k(15)} ${y + k(29)} ${x + k(17)} ${y + k(36)} ${x + k(17)} ${y + k(46)}Z`} fill={sari} />
      {/* pallu over the left shoulder */}
      <path d={`M${x - k(12)} ${y + k(16)}C${x - k(4)} ${y + k(16)} ${x + k(10)} ${y + k(30)} ${x + k(15)} ${y + k(46)}H${x + k(6)}C${x + k(2)} ${y + k(34)} ${x - k(8)} ${y + k(24)} ${x - k(14)} ${y + k(22)}Z`} fill={pallu} />
      <rect x={x - k(3)} y={y + k(7)} width={k(6)} height={k(8)} fill="#a8683f" />
      <ellipse cx={x} cy={y + k(1)} rx={k(8)} ry={k(9)} fill="#b9774c" />
      <path d={`M${x - k(8.5)} ${y - k(1)}C${x - k(9)} ${y - k(10)} ${x + k(9)} ${y - k(10)} ${x + k(8.5)} ${y - k(1)}C${x + k(5)} ${y - k(6)} ${x + k(1)} ${y - k(7)} ${x} ${y - k(6.5)}C${x - k(1)} ${y - k(7)} ${x - k(5)} ${y - k(6)} ${x - k(8.5)} ${y - k(1)}Z`} fill="#24150f" />
      <circle cx={x} cy={y - k(3)} r={k(1)} fill="#d62828" />
      <path d={`M${x - k(3)} ${y + k(3.5)}Q${x} ${y + k(5.6)} ${x + k(3)} ${y + k(3.5)}`} fill="none" stroke="#5a2c18" strokeWidth={k(1)} strokeLinecap="round" />
    </g>
  )
}

function Clipboard({ x, y, w, h, board, clip }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={board} />
      <rect x={x + 5} y={y + 8} width={w - 10} height={h - 13} rx="2.5" fill="#ffffff" />
      <rect x={r1(x + w / 2 - 12)} y={y - 5} width="24" height="10" rx="3.5" fill={clip} />
      <circle cx={r1(x + w / 2)} cy={y - 7} r="3.8" fill="none" stroke={clip} strokeWidth="2.2" />
    </g>
  )
}

function RupeeCoin({ id, x, y, r }) {
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="0.38" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset="0.65" stopColor="#f8bd2a" />
          <stop offset="1" stopColor="#df930c" />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} stroke="#c9870c" strokeWidth="1.3" />
      <circle cx={x} cy={y} r={r1(r * 0.76)} fill="none" stroke="#fff1b8" strokeOpacity="0.7" strokeWidth="1.5" />
      <text x={x} y={r1(y + r * 0.4)} textAnchor="middle" fontSize={r1(r * 1.15)} fontWeight="700" fill="#8a560a" fontFamily="inherit">
        ₹
      </text>
    </g>
  )
}

export function ShgLoanIcon() {
  return (
    <svg viewBox="0 0 230 140" aria-hidden="true">
      <defs>
        <CoinGradients id="sl-coin" />
      </defs>
      <Backdrop fill="#dcf3f6" />

      {/* loan form */}
      <Clipboard x={142} y={22} w={58} h={78} board="#3b82d6" clip="#5b6b7a" />
      <text x="171" y="44" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#1f4f8f" fontFamily="inherit">
        LOAN
      </text>
      {[54, 64, 74, 84].map((y, i) => (
        <g key={y}>
          <rect x="152" y={y - 3} width="6" height="6" rx="1" fill={i < 2 ? '#f08a3c' : '#c9d5e1'} />
          <rect x="161" y={y - 1.5} width="28" height="3" rx="1.5" fill="#d3dce6" />
        </g>
      ))}

      {/* the group of women */}
      <Woman x={40} y={52} s={1.05} blouse="#e2a531" sari="#2b8ac9" pallu="#f0c22e" />
      <Woman x={82} y={44} s={1.1} blouse="#c8336b" sari="#2f9a5a" pallu="#e64c7a" />
      <Woman x={120} y={52} s={1.05} blouse="#3b6fd0" sari="#f08a3c" pallu="#f6b13c" />
      <Woman x={58} y={78} s={1} blouse="#6b3fb8" sari="#e8456b" pallu="#9b5de5" />
      <Woman x={100} y={80} s={1} blouse="#2a9d8f" sari="#e9c46a" pallu="#f4a261" />

      {/* coins */}
      <CoinStack id="sl-coin" cx={186} bottom={132} count={5} rx={16} ry={5} h={6.2} />
      <RupeeCoin id="sl-rupee" x={158} y={118} r={14} />
    </svg>
  )
}

export function CompoundInterestIcon() {
  return (
    <svg viewBox="0 0 230 140" aria-hidden="true">
      <defs>
        <CoinGradients id="ci-coin" />
        <linearGradient id="ci-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#3cc06a" />
          <stop offset="1" stopColor="#14945a" />
        </linearGradient>
        <radialGradient id="ci-badge" cx="0.38" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#3fc074" />
          <stop offset="1" stopColor="#13804a" />
        </radialGradient>
      </defs>
      <Backdrop fill="#fde7da" />

      {/* percentage badge */}
      <circle cx="58" cy="44" r="25" fill="url(#ci-badge)" />
      <text x="58" y="54" textAnchor="middle" fontSize="29" fontWeight="700" fill="#ffffff" fontFamily="inherit">
        %
      </text>

      {/* rising arrow over growing stacks of coins */}
      <path d="M60 108C100 96 140 70 182 26" fill="none" stroke="url(#ci-arrow)" strokeWidth="6" strokeLinecap="round" />
      <path d="M171 26l17-9-2 19z" fill="#14945a" stroke="#14945a" strokeWidth="2.5" strokeLinejoin="round" />
      <CoinStack id="ci-coin" cx={58} bottom={134} count={2} rx={19} ry={5.6} h={7} />
      <CoinStack id="ci-coin" cx={100} bottom={134} count={5} rx={19} ry={5.6} h={7} />
      <CoinStack id="ci-coin" cx={142} bottom={134} count={8} rx={19} ry={5.6} h={7} />
      <CoinStack id="ci-coin" cx={184} bottom={134} count={11} rx={19} ry={5.6} h={7} />
    </svg>
  )
}

export function RecurringDepositIcon() {
  return (
    <svg viewBox="0 0 230 140" aria-hidden="true">
      <defs>
        <linearGradient id="rd-jar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#bfe3f7" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#e6f5fd" stopOpacity="0.85" />
          <stop offset="1" stopColor="#a9d6f2" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="rd-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd45c" />
          <stop offset="1" stopColor="#e9a224" />
        </linearGradient>
      </defs>
      <Backdrop fill="#e3f5e6" />

      {/* glass jar of coins marked RD */}
      <rect x="52" y="36" width="56" height="12" rx="4" fill="#4c88d6" />
      <path d="M50 52C44 58 42 66 42 76V122C42 130 48 134 56 134H104C112 134 118 130 118 122V76C118 66 116 58 110 52Z" fill="url(#rd-jar)" stroke="#8cc4ea" strokeWidth="1.5" />
      <path d="M46 96C60 90 100 90 114 96V122C114 128 110 131 104 131H56C50 131 46 128 46 122Z" fill="url(#rd-gold)" />
      <g fill="#f8c24a" stroke="#d1931a" strokeWidth="0.8">
        {[54, 66, 78, 90, 102].map((x, i) => (
          <ellipse key={x} cx={x} cy={i % 2 ? 94 : 92} rx="6.5" ry="3" />
        ))}
      </g>
      <rect x="62" y="102" width="36" height="20" rx="4" fill="#ffffff" />
      <text x="80" y="117" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d2a3a" fontFamily="inherit">
        RD
      </text>
      <path d="M52 62V86" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />

      {/* a hand reaching down from the right, dropping a coin into the jar */}
      <path d="M232 -6L172 6L176 30L232 22Z" fill="#c98b5e" />
      <rect x="168" y="4" width="11" height="27" rx="2.5" fill="#2b3a4a" transform="rotate(-12 173 17)" />
      <path d="M170 8C152 6 134 12 124 20C118 25 116 31 120 35C124 38 131 35 137 31L152 30C162 30 170 28 173 26Z" fill="#c98b5e" />
      <path d="M122 34C118 38 116 42 120 44C124 46 128 41 131 37" fill="#c98b5e" stroke="#a96d43" strokeWidth="1" />
      <path d="M136 31C140 33 148 32 154 30" fill="none" stroke="#a96d43" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="112" cy="40" r="8.5" fill="url(#rd-gold)" stroke="#c9870c" strokeWidth="1" />
      <text x="112" y="44" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#8a560a" fontFamily="inherit">
        ₹
      </text>

      {/* calendar */}
      <rect x="132" y="66" width="62" height="58" rx="5" fill="#ffffff" stroke="#e5e9ee" />
      <path d="M132 71a5 5 0 0 1 5-5h52a5 5 0 0 1 5 5v9h-62z" fill="#e5484d" />
      <rect x="142" y="60" width="4" height="12" rx="2" fill="#5b6b7a" />
      <rect x="180" y="60" width="4" height="12" rx="2" fill="#5b6b7a" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => <rect key={`${row}${col}`} x={139 + col * 13} y={86 + row * 11} width="9" height="7" rx="1.5" fill={row === 1 && col === 2 ? '#e5484d' : '#f5c6c8'} />),
      )}
    </svg>
  )
}

export function LoanEmiIcon() {
  return (
    <svg viewBox="0 0 230 140" aria-hidden="true">
      <defs>
        <CoinGradients id="emi2-coin" />
        <linearGradient id="emi2-calc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6d4bd8" />
          <stop offset="1" stopColor="#3f24a8" />
        </linearGradient>
        <filter id="emi2-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#2a1a6b" floodOpacity="0.2" />
        </filter>
      </defs>
      <Backdrop fill="#e8e4fc" />

      {/* loan document */}
      <g filter="url(#emi2-shadow)" transform="rotate(4 156 60)">
        <rect x="116" y="10" width="78" height="100" rx="5" fill="#ffffff" />
      </g>
      <g transform="rotate(4 156 60)">
        <text x="155" y="32" textAnchor="middle" fontSize="14" fontWeight="700" fill="#3f24a8" fontFamily="inherit">
          LOAN
        </text>
        {[44, 54, 64, 74, 84].map((y, i) => (
          <rect key={y} x="126" y={y} width={i % 2 ? 46 : 58} height="3.5" rx="1.75" fill="#d9d3f5" />
        ))}
      </g>

      {/* EMI calculator */}
      <g filter="url(#emi2-shadow)">
        <rect x="40" y="38" width="76" height="94" rx="9" fill="url(#emi2-calc)" />
      </g>
      <rect x="49" y="47" width="58" height="22" rx="3" fill="#dff1ff" />
      <text x="78" y="64" textAnchor="middle" fontSize="15" fontWeight="700" fill="#2a1a6b" fontFamily="inherit">
        EMI
      </text>
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect key={`${row}${col}`} x={49 + col * 15} y={77 + row * 16} width="11" height="11" rx="2.5" fill={col === 3 ? '#f6a01a' : '#ffffff'} opacity={col === 3 ? 1 : 0.9} />
        )),
      )}

      {/* coins */}
      <CoinStack id="emi2-coin" cx={178} bottom={132} count={3} rx={18} ry={5.4} h={6.6} />
      <RupeeCoin id="emi2-r1" x={146} y={116} r={17} />
      <RupeeCoin id="emi2-r2" x={170} y={92} r={14} />
    </svg>
  )
}

export function BankGroupLoanIcon() {
  return (
    <svg viewBox="0 0 230 140" aria-hidden="true">
      <defs>
        <LeafGradient id="bk-leaf" />
        <linearGradient id="bk-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7f8fa" />
          <stop offset="1" stopColor="#dde2e8" />
        </linearGradient>
      </defs>
      <Backdrop fill="#fef1d6" />

      {/* bank building */}
      <path d="M60 46L115 18L170 46Z" fill="url(#bk-stone)" stroke="#c4ccd6" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="84" y="34" width="62" height="10" rx="2" fill="#2f7d4f" />
      <text x="115" y="42" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#ffffff" fontFamily="inherit" letterSpacing="0.5">
        BANK
      </text>
      <circle cx="115" cy="28" r="5" fill="#2f9a5a" />
      <text x="115" y="31" textAnchor="middle" fontSize="7" fontWeight="700" fill="#ffffff" fontFamily="inherit">
        ₹
      </text>
      <rect x="62" y="46" width="106" height="6" fill="#e6eaef" />
      {[70, 88, 106, 124, 142, 160].map((x) => (
        <rect key={x} x={x - 3} y="52" width="7" height="50" fill="url(#bk-stone)" stroke="#cdd4dc" strokeWidth="0.8" />
      ))}
      <rect x="58" y="100" width="114" height="6" fill="#d7dde4" />

      {/* women of the group in front */}
      <Woman x={58} y={96} s={0.95} blouse="#e2a531" sari="#2f9a5a" pallu="#f0c22e" />
      <Woman x={96} y={94} s={0.95} blouse="#c8336b" sari="#e8456b" pallu="#f08a3c" />
      <Woman x={134} y={94} s={0.95} blouse="#3b6fd0" sari="#f6b13c" pallu="#e64c7a" />
      <Woman x={172} y={96} s={0.95} blouse="#2a9d8f" sari="#e9c46a" pallu="#2f9a5a" />
      <Leaf from={[30, 136]} to={[16, 112]} width={7} fill="url(#bk-leaf)" />
      <Leaf from={[200, 136]} to={[216, 114]} width={7} fill="url(#bk-leaf)" />
    </svg>
  )
}

export const SHG_ICONS = {
  'shg-loan': ShgLoanIcon,
  'compound-interest': CompoundInterestIcon,
  'recurring-deposit': RecurringDepositIcon,
  'loan-emi': LoanEmiIcon,
  'bank-group-loan': BankGroupLoanIcon,
}
