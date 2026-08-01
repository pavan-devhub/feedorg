import React from 'react';

// ==========================================
// PREMIUM ILLUSTRATION SVG COMPONENTS
// ==========================================

export const Cloud = ({ width = 100, x, y, className = '', style = {} }) => (
  <svg className={`svg-object ${className}`} style={{ left: x, top: y, width, ...style }} viewBox="0 0 200 100">
    <defs>
      <linearGradient id={`cloudGrad-${x}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="70%" stopColor="#f8fafc" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.6" />
      </linearGradient>
      <filter id={`cloudShadow-${x}`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.2" />
      </filter>
    </defs>
    <path d="M 50 70 A 30 30 0 0 1 50 10 A 40 40 0 0 1 120 10 A 50 50 0 0 1 180 50 A 30 30 0 0 1 160 90 Z" fill={`url(#cloudGrad-${x})`} filter={`url(#cloudShadow-${x})`} />
    {/* Highlight */}
    <path d="M 50 70 A 30 30 0 0 1 50 10 A 40 40 0 0 1 120 10 A 50 50 0 0 1 180 50 A 30 30 0 0 1 160 90 Z" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
  </svg>
);

export const Bird = ({ width = 40, x, y, className = '', style = {} }) => (
  <svg className={`svg-object ${className}`} style={{ left: x, top: y, width, ...style }} viewBox="0 0 100 50">
    <path d="M 10 25 C 20 10, 40 10, 50 30 C 60 10, 80 10, 90 25 C 75 15, 60 20, 50 30 C 40 20, 25 15, 10 25 Z" fill="#334155" />
    <path d="M 15 25 C 25 15, 40 15, 50 30 C 60 15, 75 15, 85 25" fill="none" stroke="#64748b" strokeWidth="1" />
  </svg>
);

export const Tractor = ({ className = '' }) => (
  <svg className={`svg-object tractor ${className}`} viewBox="0 0 300 180">
    <defs>
      <linearGradient id="tracRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="40%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>
      <linearGradient id="tracDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4b5563" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
      <linearGradient id="tracGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.4" />
        <stop offset="60%" stopColor="#f0f9ff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.5" />
      </linearGradient>
      <radialGradient id="tracTire" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
        <stop offset="0%" stopColor="#4b5563" />
        <stop offset="70%" stopColor="#1f2937" />
        <stop offset="100%" stopColor="#030712" />
      </radialGradient>
      <radialGradient id="tracRim" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fca5a5" />
        <stop offset="50%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </radialGradient>
      <filter id="tracShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="5" dy="15" stdDeviation="8" floodColor="#000000" floodOpacity="0.4" />
      </filter>
      <filter id="glowLight">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#tracShadow)">
      {/* Engine & Hood */}
      <path d="M 170 80 L 260 90 C 275 90 280 100 280 130 L 170 130 Z" fill="url(#tracRed)" />
      <path d="M 170 80 L 260 90 C 275 90 280 100 280 130 L 170 130 Z" fill="none" stroke="#fca5a5" strokeWidth="2" strokeOpacity="0.5" />
      
      {/* Grille & Vents */}
      <rect x="270" y="95" width="10" height="30" fill="url(#tracDark)" rx="3" />
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={`vent-${i}`} x="190" y="100 + i * 6" width="60" height="3" fill="#111827" opacity="0.6" />
      ))}
      
      {/* Headlight */}
      <ellipse cx="275" cy="100" rx="4" ry="8" fill="#fef08a" filter="url(#glowLight)" />
      
      {/* Chassis / Underbelly */}
      <rect x="40" y="125" width="220" height="20" fill="url(#tracDark)" rx="5" />
      <rect x="30" y="135" width="160" height="15" fill="#111827" />

      {/* Cabin Structure */}
      <path d="M 50 15 L 150 15 L 170 80 L 50 80 Z" fill="url(#tracDark)" /> 
      {/* Cabin Glass */}
      <path d="M 60 25 L 140 25 L 155 75 L 60 75 Z" fill="url(#tracGlass)" stroke="#e0f2fe" strokeWidth="2" />
      <path d="M 65 25 L 110 75 L 85 75 L 60 25 Z" fill="#ffffff" opacity="0.4" />
      {/* Driver Hint inside */}
      <circle cx="100" cy="45" r="12" fill="#1e293b" opacity="0.6" />
      <rect x="90" y="55" width="20" height="20" fill="#0f172a" opacity="0.6" />
      
      {/* Roof */}
      <rect x="40" y="5" width="120" height="15" fill="url(#tracRed)" rx="6" />
      
      {/* Exhaust */}
      <rect x="230" y="30" width="10" height="60" fill="url(#tracDark)" rx="3" />
      <path d="M 225 20 L 245 20 L 240 30 L 230 30 Z" fill="#111827" />
      <circle cx="235" cy="15" r="5" fill="#334155" opacity="0.5" filter="url(#glowLight)" />

      {/* Rear Fender */}
      <path d="M 20 100 A 70 70 0 0 1 160 100 L 160 110 A 60 60 0 0 0 30 110 Z" fill="url(#tracRed)" />
      
      {/* Wheels */}
      {/* Rear Wheel */}
      <g className="wheel">
        <circle cx="90" cy="120" r="50" fill="url(#tracTire)" />
        <circle cx="90" cy="120" r="28" fill="url(#tracRim)" />
        <circle cx="90" cy="120" r="10" fill="#111827" />
        <circle cx="90" cy="120" r="28" fill="none" stroke="#fca5a5" strokeWidth="1" opacity="0.5" />
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={`rt-${i}`} d="M 85 70 L 95 70 L 98 80 L 82 80 Z" fill="#030712" transform={`rotate(${i * 22.5} 90 120)`} />
        ))}
      </g>
      
      {/* Front Wheel */}
      <g className="wheel">
        <circle cx="230" cy="135" r="35" fill="url(#tracTire)" />
        <circle cx="230" cy="135" r="18" fill="url(#tracRim)" />
        <circle cx="230" cy="135" r="6" fill="#111827" />
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={`ft-${i}`} d="M 227 100 L 233 100 L 235 108 L 225 108 Z" fill="#030712" transform={`rotate(${i * 30} 230 135)`} />
        ))}
      </g>
    </g>
  </svg>
);

export const Farmer = ({ className = '' }) => (
  <svg className={`svg-object farmer ${className}`} viewBox="0 0 120 200">
    <defs>
      <linearGradient id="farmSkin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="50%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#92400e" />
      </linearGradient>
      <linearGradient id="farmShirt" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="50%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="farmPants" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="farmTank" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <filter id="farmShadow">
        <feDropShadow dx="3" dy="10" stdDeviation="5" floodColor="#000000" floodOpacity="0.5" />
      </filter>
    </defs>
    
    <g filter="url(#farmShadow)">
      {/* Back Arm (hidden mostly, swinging) */}
      <path d="M 55 70 Q 80 90 90 120" stroke="url(#farmShirt)" strokeWidth="16" strokeLinecap="round" fill="none" />
      <circle cx="90" cy="120" r="8" fill="url(#farmSkin)" />
      
      {/* Tank on back */}
      <rect x="15" y="60" width="35" height="60" fill="url(#farmTank)" rx="10" />
      <rect x="20" y="55" width="25" height="5" fill="#1e293b" />
      {/* Tank Strap */}
      <path d="M 40 60 Q 55 70 55 90" stroke="#1e293b" strokeWidth="4" fill="none" />
      
      {/* Legs */}
      <g className="leg left-leg">
        <path d="M 45 125 Q 40 160 35 185" stroke="url(#farmPants)" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M 25 185 L 45 185 L 50 195 L 20 195 Z" fill="#451a03" /> {/* Boot */}
      </g>
      <g className="leg right-leg">
        <path d="M 65 125 Q 75 160 80 185" stroke="url(#farmPants)" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M 70 185 L 90 185 L 95 195 L 65 195 Z" fill="#451a03" />
      </g>
      
      {/* Torso */}
      <path d="M 40 60 C 70 60 75 90 70 130 C 40 130 35 90 40 60 Z" fill="url(#farmShirt)" />
      
      {/* Head */}
      <circle cx="55" cy="50" r="16" fill="url(#farmSkin)" />
      {/* Hat */}
      <path d="M 25 40 Q 55 20 85 40 L 75 48 Q 55 35 35 48 Z" fill="#92400e" />
      <path d="M 38 28 C 38 10 72 10 72 28 Z" fill="#d97706" />
      
      {/* Front Arm & Spray Wand */}
      <path d="M 45 75 Q 15 100 -5 130" stroke="url(#farmShirt)" strokeWidth="16" strokeLinecap="round" fill="none" />
      <circle cx="-5" cy="130" r="8" fill="url(#farmSkin)" />
      <path d="M -5 130 L -30 160" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      <path d="M -35 160 L -25 160" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
      {/* Hose connecting tank to wand */}
      <path d="M 30 115 Q 10 140 -5 130" stroke="#334155" strokeWidth="4" fill="none" />
    </g>
  </svg>
);

export const Harvester = ({ className = '' }) => (
  <svg className={`svg-object harvester ${className}`} viewBox="0 0 350 200">
    <defs>
      <linearGradient id="harvGreen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="50%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>
      <filter id="harvShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="8" dy="15" stdDeviation="10" floodColor="#000000" floodOpacity="0.5" />
      </filter>
    </defs>
    <g filter="url(#harvShadow)">
      
      {/* Main Body */}
      <path d="M 50 80 L 250 80 C 270 80 280 100 280 160 L 50 160 C 30 160 30 140 30 100 Z" fill="url(#harvGreen)" />
      <path d="M 50 80 L 250 80 C 270 80 280 100 280 160 L 50 160 C 30 160 30 140 30 100 Z" fill="none" stroke="#4ade80" strokeWidth="2" strokeOpacity="0.4" />
      
      {/* Cabin */}
      <path d="M 140 10 L 230 10 L 260 80 L 140 80 Z" fill="url(#tracDark)" />
      <path d="M 145 18 L 220 18 L 245 72 L 145 72 Z" fill="url(#tracGlass)" />
      <path d="M 150 18 L 190 72 L 165 72 L 150 18 Z" fill="#ffffff" opacity="0.3" />
      {/* Roof AC */}
      <rect x="160" y="2" width="50" height="8" fill="#e2e8f0" rx="2" />
      
      {/* Grain Tank */}
      <path d="M 60 20 L 135 20 L 135 80 L 50 80 Z" fill="url(#harvGreen)" />
      <rect x="65" y="35" width="65" height="35" fill="#facc15" /> {/* Golden Grain visible */}
      
      {/* Exhaust & Pipes */}
      <rect x="125" y="10" width="8" height="50" fill="url(#tracDark)" />
      
      {/* Header (Cutter) */}
      <path d="M 260 110 L 340 130 L 340 170 L 260 170 Z" fill="url(#tracRed)" />
      <g className="blade">
        <circle cx="310" cy="150" r="35" fill="none" stroke="url(#tracDark)" strokeWidth="4" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`b-${i}`} x1="310" y1="150" x2="345" y2="150" stroke="#9ca3af" strokeWidth="6" transform={`rotate(${i * 45} 310 150)`} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={`bc-${i}`} cx="345" cy="150" r="4" fill="#ef4444" transform={`rotate(${i * 45} 310 150)`} />
        ))}
      </g>
      
      {/* Auger (Unloading Pipe) */}
      <path d="M 90 80 L 10 20 L 5 28 L 85 88 Z" fill="url(#tracDark)" />
      <path d="M 5 20 L 15 15 L 20 25 L 10 30 Z" fill="#9ca3af" />
      
      {/* Wheels */}
      {/* Back Wheel (Small) */}
      <g className="wheel">
        <circle cx="90" cy="160" r="35" fill="url(#tracTire)" />
        <circle cx="90" cy="160" r="18" fill="url(#tracRim)" />
        <circle cx="90" cy="160" r="8" fill="#111827" />
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={`ht1-${i}`} d="M 87 125 L 93 125 L 95 133 L 85 133 Z" fill="#030712" transform={`rotate(${i * 36} 90 160)`} />
        ))}
      </g>
      {/* Front Wheel (Large) */}
      <g className="wheel">
        <circle cx="210" cy="150" r="45" fill="url(#tracTire)" />
        <circle cx="210" cy="150" r="25" fill="url(#tracRim)" />
        <circle cx="210" cy="150" r="10" fill="#111827" />
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={`ht2-${i}`} d="M 205 105 L 215 105 L 218 115 L 202 115 Z" fill="#030712" transform={`rotate(${i * (360/14)} 210 150)`} />
        ))}
      </g>
    </g>
  </svg>
);

export const Truck = ({ className = '' }) => (
  <svg className={`svg-object truck ${className}`} viewBox="0 0 350 160">
    <defs>
      <linearGradient id="truckCab" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="50%" stopColor="#0369a1" />
        <stop offset="100%" stopColor="#082f49" />
      </linearGradient>
      <linearGradient id="truckTrailer" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <filter id="truckShadow">
        <feDropShadow dx="8" dy="12" stdDeviation="8" floodColor="#000000" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#truckShadow)">
      {/* Trailer */}
      <rect x="10" y="30" width="220" height="90" fill="url(#truckTrailer)" rx="8" />
      <rect x="10" y="30" width="220" height="90" fill="none" stroke="#e2e8f0" strokeWidth="2" rx="8" />
      {/* Trailer Panels */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`tp-${i}`} x1={40 + i * 35} y1="30" x2={40 + i * 35} y2="120" stroke="#94a3b8" strokeWidth="2" opacity="0.5" />
      ))}
      <rect x="20" y="60" width="200" height="30" fill="#0284c7" opacity="0.1" rx="4" />
      
      {/* Cab Chassis */}
      <rect x="10" y="120" width="320" height="15" fill="#1e293b" rx="4" />
      
      {/* Cab Base & Aerodynamic Dome */}
      <path d="M 240 50 C 260 10 300 20 310 50 L 330 50 C 345 50 350 70 350 120 L 240 120 Z" fill="url(#truckCab)" />
      {/* Grill & Headlights */}
      <path d="M 330 70 L 350 70 L 350 110 L 330 110 Z" fill="#1e293b" />
      {Array.from({ length: 4 }).map((_, i) => (
        <line key={`tg-${i}`} x1="335" y1={75 + i*10} x2="345" y2={75 + i*10} stroke="#94a3b8" strokeWidth="3" />
      ))}
      <circle cx="345" cy="115" r="5" fill="#fef08a" filter="url(#glowLight)" />
      
      {/* Window */}
      <path d="M 260 55 C 280 45 300 50 310 65 L 315 80 L 260 80 Z" fill="url(#tracGlass)" />
      
      {/* Wheels */}
      {[50, 90, 260, 310].map((cx, i) => (
        <g key={`tw-${i}`} className="wheel">
          <circle cx={cx} cy="135" r="22" fill="url(#tracTire)" />
          <circle cx={cx} cy="135" r="12" fill="url(#tracRim)" />
          <circle cx={cx} cy="135" r="5" fill="#111827" />
          {Array.from({ length: 8 }).map((_, j) => (
            <path key={`twc-${j}`} d={`M ${cx-3} 113 L ${cx+3} 113 L ${cx+4} 123 L ${cx-4} 123 Z`} fill="#030712" transform={`rotate(${j * 45} ${cx} 135)`} />
          ))}
        </g>
      ))}
    </g>
  </svg>
);

export const Factory = ({ className = '' }) => (
  <svg className={`svg-object factory ${className}`} viewBox="0 0 400 250">
    <defs>
      <linearGradient id="facWall" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <linearGradient id="facGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bae6fd" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="facSilo" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="30%" stopColor="#cbd5e1" />
        <stop offset="70%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <filter id="facShadow">
        <feDropShadow dx="15" dy="15" stdDeviation="10" floodColor="#000000" floodOpacity="0.4" />
      </filter>
    </defs>
    
    <g filter="url(#facShadow)">
      {/* Background Silos */}
      {[40, 100].map((cx, i) => (
        <g key={`silo-${i}`}>
          <rect x={cx} y="40" width="50" height="200" fill="url(#facSilo)" rx="5" />
          <path d={`M ${cx} 40 Q ${cx+25} 0 ${cx+50} 40 Z`} fill="#cbd5e1" />
          {/* Silo rings */}
          {Array.from({ length: 4 }).map((_, j) => (
            <line key={`sr-${j}`} x1={cx} y1={80 + j * 40} x2={cx+50} y2={80 + j * 40} stroke="#64748b" strokeWidth="2" opacity="0.5" />
          ))}
        </g>
      ))}
      
      {/* Main Building Base */}
      <rect x="170" y="80" width="220" height="160" fill="url(#facWall)" />
      {/* Roof */}
      <path d="M 160 80 L 220 30 L 400 30 L 400 80 Z" fill="#64748b" />
      {/* Roof Details (AC units, vents) */}
      <rect x="240" y="20" width="30" height="25" fill="#475569" />
      <rect x="300" y="10" width="20" height="35" fill="#475569" />
      <rect x="340" y="15" width="25" height="30" fill="#475569" />
      
      {/* Large Glass Facade */}
      <rect x="190" y="100" width="180" height="90" fill="url(#facGlass)" stroke="#334155" strokeWidth="4" />
      {/* Window Grid */}
      {Array.from({ length: 5 }).map((_, c) => (
        <line key={`wgv-${c}`} x1={190 + c * 36} y1="100" x2={190 + c * 36} y2="190" stroke="#334155" strokeWidth="3" />
      ))}
      {Array.from({ length: 2 }).map((_, r) => (
        <line key={`wgh-${r}`} x1="190" y1={130 + r * 30} x2="370" y2={130 + r * 30} stroke="#334155" strokeWidth="3" />
      ))}
      {/* Glass Reflections */}
      <path d="M 190 190 L 250 100 L 280 100 L 220 190 Z" fill="#ffffff" opacity="0.2" />
      <path d="M 310 190 L 370 100 L 370 130 L 340 190 Z" fill="#ffffff" opacity="0.2" />
      
      {/* Loading Dock & Conveyor */}
      <rect x="170" y="210" width="220" height="30" fill="#334155" />
      <rect x="180" y="190" width="60" height="50" fill="#0f172a" />
      {/* Conveyor belt exiting building */}
      <path d="M 10 200 L 180 200 L 180 215 L 10 215 Z" fill="#475569" />
      {Array.from({ length: 15 }).map((_, i) => (
        <circle key={`cb-${i}`} cx={15 + i*12} cy="215" r="4" fill="#94a3b8" />
      ))}
    </g>
  </svg>
);

export const Crane = ({ className = '' }) => (
  <svg className={`svg-object crane ${className}`} viewBox="0 0 200 300">
    <defs>
      <linearGradient id="craneGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="craneDark" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <filter id="craneShadow">
        <feDropShadow dx="10" dy="10" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
      </filter>
    </defs>
    
    <g filter="url(#craneShadow)">
      {/* Tower Base */}
      <path d="M 40 280 L 100 280 L 90 260 L 50 260 Z" fill="url(#craneDark)" />
      
      {/* Main Tower (Truss structure) */}
      <rect x="55" y="100" width="30" height="160" fill="url(#craneGold)" />
      {Array.from({ length: 11 }).map((_, i) => (
        <g key={`truss-${i}`}>
          <line x1="55" y1={100 + i * 15} x2="85" y2={115 + i * 15} stroke="#b45309" strokeWidth="3" />
          <line x1="85" y1={100 + i * 15} x2="55" y2={115 + i * 15} stroke="#b45309" strokeWidth="3" />
          <line x1="55" y1={100 + i * 15} x2="85" y2={100 + i * 15} stroke="#78350f" strokeWidth="2" />
        </g>
      ))}
      
      {/* Boom Base */}
      <polygon points="40,100 100,100 80,60 60,60" fill="url(#craneDark)" />
      
      {/* Boom Arm */}
      <rect x="10" y="80" width="180" height="20" fill="url(#craneGold)" />
      <polygon points="10,80 190,80 160,50 40,50" fill="#d97706" />
      {/* Boom Support Cables */}
      <line x1="70" y1="20" x2="150" y2="50" stroke="#64748b" strokeWidth="3" />
      <line x1="70" y1="20" x2="30" y2="50" stroke="#64748b" strokeWidth="3" />
      <polygon points="65,20 75,20 70,0" fill="#ef4444" /> {/* Aircraft warning light */}
      <circle cx="70" cy="0" r="3" fill="#fca5a5" filter="url(#glowLight)" />
      
      {/* Operator Cabin */}
      <rect x="45" y="100" width="25" height="30" fill="url(#craneDark)" />
      <rect x="50" y="105" width="15" height="15" fill="#38bdf8" opacity="0.8" />
      
      {/* Hoist & Hook (Animated via CSS classes) */}
      <line x1="130" y1="100" x2="130" y2="220" stroke="#475569" strokeWidth="4" className="hook-line" />
      <g className="hook-block" style={{ transformOrigin: 'top center' }}>
        <rect x="110" y="220" width="40" height="25" fill="#facc15" rx="4" />
        <rect x="115" y="225" width="30" height="15" fill="#1e293b" />
        {/* Hook claw */}
        <path d="M 125 245 C 125 260 140 270 135 280 C 130 290 115 280 120 270" fill="none" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);

export const CargoShip = ({ className = '' }) => (
  <svg className={`svg-object cargo-ship ${className}`} viewBox="0 0 450 200">
    <defs>
      <linearGradient id="shipHull" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="60%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#450a0a" />
      </linearGradient>
      <linearGradient id="shipDeck" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <filter id="shipShadow">
        <feDropShadow dx="15" dy="20" stdDeviation="15" floodColor="#000000" floodOpacity="0.6" />
      </filter>
    </defs>
    
    <g filter="url(#shipShadow)">
      {/* Hull */}
      <path d="M 20 140 C 60 190 120 200 400 200 L 440 140 Z" fill="#450a0a" /> {/* Lower Hull */}
      <path d="M 10 140 L 70 190 L 410 190 L 450 140 Z" fill="url(#shipHull)" /> {/* Upper Hull */}
      <path d="M 5 130 L 445 130 L 450 140 L 10 140 Z" fill="#ef4444" /> {/* Red Stripe */}
      <rect x="10" y="115" width="435" height="15" fill="url(#shipDeck)" /> {/* Deck Line */}
      <text x="30" y="160" fill="#fca5a5" fontSize="12" fontWeight="bold" opacity="0.6">GLOBAL EXPORT</text>
      
      {/* Bridge (Command Center) */}
      <path d="M 330 115 L 330 30 C 330 20 340 15 350 15 L 400 15 C 410 15 420 20 420 30 L 420 115 Z" fill="#f8fafc" />
      {/* Bridge Windows */}
      <path d="M 325 40 L 425 40 L 420 60 L 330 60 Z" fill="#0284c7" opacity="0.9" />
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`bw-${i}`} x1={340 + i * 15} y1="40" x2={340 + i * 15} y2="60" stroke="#f8fafc" strokeWidth="2" />
      ))}
      <rect x="350" y="70" width="50" height="15" fill="#e2e8f0" rx="4" />
      
      {/* Radar / Antennas */}
      <line x1="375" y1="15" x2="375" y2="-10" stroke="#64748b" strokeWidth="3" />
      <line x1="360" y1="-5" x2="390" y2="-5" stroke="#64748b" strokeWidth="2" />
      <circle cx="375" cy="-10" r="4" fill="#ef4444" filter="url(#glowLight)" />
      
      {/* Stacked Containers */}
      {Array.from({ length: 6 }).map((_, col) => (
        Array.from({ length: 4 }).map((_, row) => {
          const colors = ["#0ea5e9", "#f59e0b", "#10b981", "#8b5cf6", "#f43f5e", "#64748b"];
          const color = colors[(col * 3 + row * 7) % colors.length];
          return (
            <g key={`cnt-${col}-${row}`} transform={`translate(${40 + col * 45}, ${95 - row * 22})`}>
              <rect x="0" y="0" width="43" height="20" fill={color} rx="1" />
              {/* Container Ribs */}
              {Array.from({ length: 5 }).map((_, r) => (
                <line key={`cr-${r}`} x1={5 + r*8} y1="0" x2={5 + r*8} y2="20" stroke="#000000" strokeWidth="1" opacity="0.2" />
              ))}
              <rect x="0" y="0" width="43" height="20" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" rx="1" />
            </g>
          )
        })
      ))}
    </g>
  </svg>
);

export const Airplane = ({ className = '' }) => (
  <svg className={`svg-object airplane ${className}`} viewBox="0 0 350 150">
    <defs>
      <linearGradient id="planeBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <linearGradient id="planeWing" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
      <filter id="planeShadow">
        <feDropShadow dx="0" dy="20" stdDeviation="15" floodColor="#000000" floodOpacity="0.3" />
      </filter>
    </defs>
    
    <g filter="url(#planeShadow)">
      {/* Back Wing */}
      <path d="M 160 80 L 80 130 L 60 130 L 140 80 Z" fill="#94a3b8" />
      <path d="M 80 130 C 80 135 75 135 60 130 Z" fill="#64748b" />
      
      {/* Fuselage / Body */}
      <path d="M 310 60 C 340 60 345 80 310 90 L 50 90 C 10 90 10 60 50 60 Z" fill="url(#planeBody)" />
      {/* Blue decorative stripe */}
      <path d="M 50 75 C 100 70 200 70 310 75 L 310 80 C 200 75 100 75 50 80 Z" fill="#0ea5e9" />
      
      {/* Tail */}
      <path d="M 60 60 L 20 10 L 0 10 L 40 60 Z" fill="#0369a1" />
      <path d="M 20 10 L 40 45 L 10 45 Z" fill="#38bdf8" opacity="0.3" />
      
      {/* Front Wing */}
      <path d="M 180 75 L 100 145 L 75 145 L 155 75 Z" fill="url(#planeWing)" />
      <path d="M 100 145 C 100 150 95 150 75 145 Z" fill="#64748b" />
      
      {/* Engines */}
      <g transform="translate(130, 95)">
        <rect x="0" y="0" width="40" height="20" fill="#475569" rx="10" />
        <ellipse cx="40" cy="10" r="5" fill="#1e293b" />
        <path d="M -10 5 L 0 5 L 0 15 L -10 15 Z" fill="#38bdf8" opacity="0.6" filter="url(#glowLight)" /> {/* Engine glow */}
      </g>
      
      {/* Cockpit */}
      <path d="M 295 68 C 315 62 330 68 330 73 L 295 73 Z" fill="#0284c7" opacity="0.9" />
      {/* Windows */}
      {Array.from({ length: 15 }).map((_, i) => (
        <circle key={`pw-${i}`} cx={90 + i*12} cy="70" r="2.5" fill="#0284c7" opacity="0.6" />
      ))}
    </g>
  </svg>
);

export const Globe = ({ className = '' }) => (
  <svg className={`svg-object globe ${className}`} viewBox="0 0 300 300">
    <defs>
      <radialGradient id="globeSphere" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="70%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#082f49" />
      </radialGradient>
      <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>
      <filter id="globeDropShadow">
        <feDropShadow dx="0" dy="20" stdDeviation="20" floodColor="#000000" floodOpacity="0.5" />
      </filter>
    </defs>
    
    <g filter="url(#globeDropShadow)">
      {/* Atmosphere Glow */}
      <circle cx="150" cy="150" r="145" fill="url(#globeGlow)" />
      
      {/* Ocean Sphere */}
      <circle cx="150" cy="150" r="125" fill="url(#globeSphere)" />
      
      {/* Latitude / Longitude Grid */}
      <path d="M 150 25 A 125 125 0 0 0 150 275 A 50 125 0 0 0 150 25 M 150 25 A 50 125 0 0 1 150 275" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.3" />
      <path d="M 150 25 A 125 125 0 0 0 150 275 A 100 125 0 0 0 150 25 M 150 25 A 100 125 0 0 1 150 275" fill="none" stroke="#bae6fd" strokeWidth="1" opacity="0.2" />
      <path d="M 25 150 L 275 150 M 42 85 L 258 85 M 42 215 L 258 215 M 70 45 L 230 45 M 70 255 L 230 255" fill="none" stroke="#bae6fd" strokeWidth="2" opacity="0.3" />
      
      {/* Highly Stylized Landmasses (Abstract vector shapes for modern tech feel) */}
      <path d="M 80 60 C 120 50 150 70 140 100 C 130 130 180 150 200 140 C 220 130 240 160 210 190 C 180 220 120 200 100 160 C 80 120 40 100 80 60 Z" fill="#34d399" opacity="0.9" />
      <path d="M 80 60 C 120 50 150 70 140 100 C 130 130 180 150 200 140 C 220 130 240 160 210 190 C 180 220 120 200 100 160 C 80 120 40 100 80 60 Z" fill="none" stroke="#10b981" strokeWidth="3" />
      <path d="M 200 60 C 230 70 220 100 240 110 C 260 120 250 80 200 60 Z" fill="#34d399" opacity="0.7" />
      
      {/* Flight Paths / Connections (Animated via GSAP) */}
      <path className="globe-line" d="M 90 90 Q 150 20 210 120" fill="none" stroke="#fcd34d" strokeWidth="4" strokeDasharray="300" strokeDashoffset="300" strokeLinecap="round" filter="url(#glowLight)" />
      
      {/* Destination Markers */}
      <g className="globe-dot">
        <circle cx="90" cy="90" r="6" fill="#fbbf24" />
        <circle cx="90" cy="90" r="15" fill="none" stroke="#fef08a" strokeWidth="2" className="ping" />
      </g>
      <g className="globe-dot" style={{ opacity: 0 }}>
        <circle cx="210" cy="120" r="6" fill="#fbbf24" />
        <circle cx="210" cy="120" r="15" fill="none" stroke="#fef08a" strokeWidth="2" className="ping" />
      </g>
    </g>
  </svg>
);
