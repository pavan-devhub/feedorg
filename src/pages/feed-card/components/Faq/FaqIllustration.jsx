// Two chat bubbles (orange "?" in front, cream message behind) with sparks and a dot grid.
export default function FaqIllustration() {
  return (
    <svg className="faq__art" viewBox="0 0 360 300" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="faq-orange" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#f9ab78" />
          <stop offset="1" stopColor="#e97c43" />
        </linearGradient>
        <linearGradient id="faq-cream" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fffaf5" />
          <stop offset="1" stopColor="#f6dfcd" />
        </linearGradient>
        <filter id="faq-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#c76a35" floodOpacity="0.28" />
        </filter>
      </defs>

      <circle cx="104" cy="110" r="92" fill="#fbd6be" opacity="0.55" />
      <circle cx="248" cy="250" r="78" fill="#fbd9c4" opacity="0.45" />

      <g fill="#f6cdb3">
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cx={14 + (i % 4) * 16} cy={236 + Math.floor(i / 4) * 16} r="2.6" />
        ))}
      </g>

      {/* cream message bubble (behind) */}
      <g filter="url(#faq-shadow)">
        <path
          d="M156 92h138c14.4 0 26 11.6 26 26v88c0 14.4-11.6 26-26 26h-18l10 40-42-40h-88c-14.4 0-26-11.6-26-26v-88c0-14.4 11.6-26 26-26z"
          fill="url(#faq-cream)"
        />
      </g>
      <g fill="#f19a63">
        <rect x="186" y="128" width="104" height="11" rx="5.5" />
        <rect x="186" y="156" width="104" height="11" rx="5.5" />
        <rect x="186" y="184" width="72" height="11" rx="5.5" />
      </g>

      {/* orange question bubble (front) */}
      <g filter="url(#faq-shadow)">
        <path
          d="M60 52h132c16 0 29 13 29 29v96c0 16-13 29-29 29H96l-42 40 8-40c-15-1.5-27-14-27-29V81c0-16 13-29 29-29z"
          fill="url(#faq-orange)"
        />
      </g>
      {/* Font as an inline style, not the fontFamily attribute: the site's global `*` font rule
          (src/index.css) would override a presentation attribute. */}
      <text
        x="128"
        y="171"
        textAnchor="middle"
        fontSize="118"
        fontWeight="800"
        fill="#fff"
        style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif" }}
      >
        ?
      </text>

      {/* sparks */}
      <g stroke="#f08f5c" strokeWidth="8" strokeLinecap="round">
        <path d="M250 14 241 48" />
        <path d="M262 70 290 54" />
      </g>
    </svg>
  )
}
