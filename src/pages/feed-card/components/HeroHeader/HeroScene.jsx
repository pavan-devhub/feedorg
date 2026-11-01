import cardImg from '../../assets/feedcard-card.png'
import leafImg from '../../assets/feedcard-leaf.png'

// Everything here is drawn in the 1672×941 coordinates of the design mockup.
// The viewBox crops it to the right-hand scene (x 600–1672, y 130–810).
const SCENE = { x: 600, y: 130, width: 1072, height: 680 }

// Leaf photo is 90×164 with its stem at the bottom centre.
const LEAF_W = 90
const LEAF_H = 164

// [stem x, stem y, length, rotation°, brightness, mirrored]
const LEAVES = [
  // behind the left edge of the card
  [760, 420, 112, 8, 0.78, false],
  [748, 455, 152, -22, 1, false],
  [738, 530, 94, -40, 0.74, true],
  [742, 505, 130, -58, 0.88, false],
  [740, 560, 120, -78, 1, true],
  [745, 600, 102, -112, 0.9, false],
  // behind the coin, right of the card
  [1190, 560, 96, 18, 0.8, true],
  [1200, 600, 122, 38, 0.92, false],
  [1215, 640, 126, 62, 1, true],
  [1225, 668, 112, 88, 0.86, false],
  [1230, 690, 96, 112, 0.92, true],
]

// Outline leaves sitting on top of the backdrop: [stem x, stem y, tip x, tip y, half-width]
const OUTLINE_LEAVES = [
  [1328, 266, 1236, 172, 40],
  [1332, 266, 1438, 150, 44],
  [1342, 268, 1442, 230, 22],
]

// Wooden slab the card stands on: top face and thin front (bark) face.
// The back edge stays above the card's bottom edge so the card reads as resting on it.
const SLAB_TOP =
  'M650 604C900 620 1150 636 1250 655 1310 668 1350 685 1368 698Q1380 702 1379 714L1378 728 626 676Q610 672 611 650 614 606 650 604Z'
const SLAB_SIDE = 'M626 676 1378 728 1376 748 636 692Q612 688 611 664V650Q610 672 626 676Z'
const SLAB_TILT = 'rotate(3.9 1000 670)'

// Pill centres in mockup coordinates (used for the connector branches).
const PILL_LEFT = 1418
const PILL_Y = [323, 386, 449, 512, 575, 638]

function leafOutline([bx, by, tx, ty, w]) {
  const dx = tx - bx
  const dy = ty - by
  const len = Math.hypot(dx, dy)
  const nx = (-dy / len) * w
  const ny = (dx / len) * w
  const mx = (bx + tx) / 2
  const my = (by + ty) / 2
  const shape = `M${bx} ${by}Q${mx + nx * 1.25} ${my + ny * 1.25} ${tx} ${ty}Q${mx - nx * 1.25} ${my - ny * 1.25} ${bx} ${by}Z`
  const rib = `M${bx} ${by}L${bx + dx * 0.92} ${by + dy * 0.92}`
  const veins = [0.3, 0.5, 0.7]
    .map((t) => {
      const px = bx + dx * t
      const py = by + dy * t
      const ex = dx * 0.16
      const ey = dy * 0.16
      const s = 0.6 * (1 - Math.abs(t - 0.45))
      return `M${px} ${py}L${px + ex + nx * s} ${py + ey + ny * s}M${px} ${py}L${px + ex - nx * s} ${py + ey - ny * s}`
    })
    .join('')
  return { shape, detail: rib + veins }
}

// Where the curved spine meets each pill row (quadratic from 1352,330 via 1418,480 to 1352,650).
function spineX(y) {
  const t = (-300 + Math.sqrt(300 * 300 + 80 * (y - 330))) / 40
  return 1352 + 132 * t * (1 - t)
}

export default function HeroScene() {
  return (
    <svg
      className="fc-hero__scene"
      viewBox={`${SCENE.x} ${SCENE.y} ${SCENE.width} ${SCENE.height}`}
      preserveAspectRatio="xMinYMin meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="blob-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde0cd" />
          <stop offset="1" stopColor="#fcdcc8" />
        </linearGradient>
        <linearGradient id="blob-front" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0" stopColor="#fdd2bb" />
          <stop offset="0.55" stopColor="#fdd6c0" />
          <stop offset="1" stopColor="#fddac4" />
        </linearGradient>

        {/* Procedural wood: warm base + long grain streaks + fine cracks + soft sheen. */}
        <linearGradient id="wood-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bb7744" />
          <stop offset="0.45" stopColor="#cd8a55" />
          <stop offset="1" stopColor="#a35e33" />
        </linearGradient>
        <linearGradient id="wood-light" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0" stopColor="#fff1de" stopOpacity="0.22" />
          <stop offset="0.5" stopColor="#fff1de" stopOpacity="0" />
          <stop offset="1" stopColor="#3b1d0c" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="bark-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a4f35" />
          <stop offset="1" stopColor="#3a2215" />
        </linearGradient>
        <filter id="wood-grain" filterUnits="userSpaceOnUse" x="560" y="560" width="880" height="230">
          <feTurbulence type="fractalNoise" baseFrequency="0.005 0.085" numOctaves="4" seed="11" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0 0.06  2.8 0 0 0 -1.15"
          />
        </filter>
        <filter id="wood-crack" filterUnits="userSpaceOnUse" x="560" y="560" width="880" height="230">
          <feTurbulence type="turbulence" baseFrequency="0.016 0.11" numOctaves="2" seed="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.17  0 0 0 0 0.08  0 0 0 0 0.03  -5 0 0 0 1.05"
          />
        </filter>
        <filter id="wood-sheen" filterUnits="userSpaceOnUse" x="560" y="560" width="880" height="230">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.05" numOctaves="3" seed="23" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 0.86  0 0 0 0 0.66  0 2.6 0 0 -1.25"
          />
        </filter>
        <filter id="bark-rough" filterUnits="userSpaceOnUse" x="560" y="620" width="880" height="160">
          <feTurbulence type="turbulence" baseFrequency="0.05 0.3" numOctaves="3" seed="8" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.82  0 0 0 0 0.68  0 0 0 0 0.56  2.4 0 0 0 -0.95"
          />
        </filter>
        <clipPath id="slab-top-clip">
          <path d={SLAB_TOP} />
        </clipPath>
        <clipPath id="slab-side-clip">
          <path d={SLAB_SIDE} />
        </clipPath>
        <filter id="soft-blur" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* Peach backdrop shapes */}
      <rect x="655" y="220" width="745" height="482" rx="112" fill="url(#blob-back)" />
      <g fill="none" stroke="#efc1a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {OUTLINE_LEAVES.map((leaf, i) => {
          const { shape, detail } = leafOutline(leaf)
          return (
            <g key={i}>
              <path d={shape} fill="#fbe6da" fillOpacity="0.35" />
              <path d={detail} strokeWidth="1.4" />
            </g>
          )
        })}
      </g>
      <rect className="fc-hero__blob--wide" x="985" y="262" width="583" height="494" rx="122" fill="url(#blob-front)" />
      {/* Narrower variant for the cropped phone layout, so the shape isn't cut off */}
      <rect className="fc-hero__blob--narrow" x="985" y="262" width="455" height="494" rx="122" fill="url(#blob-front)" />

      {/* Foliage behind the card */}
      {LEAVES.map(([x, y, len, rot, shade, mirrored], i) => (
        <image
          key={i}
          href={leafImg}
          x={-LEAF_W / 2}
          y={-LEAF_H}
          width={LEAF_W}
          height={LEAF_H}
          transform={`translate(${x} ${y}) rotate(${rot}) scale(${(mirrored ? -1 : 1) * (len / LEAF_H)} ${len / LEAF_H})`}
          style={{ filter: `brightness(${shade}) saturate(1.05)` }}
        />
      ))}

      {/* Wooden slab */}
      <ellipse cx="1000" cy="748" rx="400" ry="16" fill="#b36a43" opacity="0.32" filter="url(#soft-blur)" />
      <g clipPath="url(#slab-side-clip)">
        <rect x="600" y="640" width="790" height="115" fill="url(#bark-base)" />
        <rect x="600" y="640" width="790" height="115" filter="url(#bark-rough)" opacity="0.45" transform={SLAB_TILT} />
      </g>
      <g clipPath="url(#slab-top-clip)">
        <rect x="600" y="595" width="790" height="140" fill="url(#wood-base)" />
        <g transform={SLAB_TILT}>
          <rect x="580" y="570" width="830" height="190" filter="url(#wood-grain)" opacity="0.8" />
          <rect x="580" y="570" width="830" height="190" filter="url(#wood-crack)" opacity="0.65" />
          <rect x="580" y="570" width="830" height="190" filter="url(#wood-sheen)" opacity="0.3" />
        </g>
        <rect x="600" y="595" width="790" height="140" fill="url(#wood-light)" />
      </g>
      <path d="M626 676 1378 728" stroke="#e9b98c" strokeOpacity="0.7" strokeWidth="1.4" fill="none" />

      {/* Card + coin cut out of the original artwork */}
      <image
        href={cardImg}
        x="718"
        y="312"
        width="585"
        height="352"
        style={{ filter: 'drop-shadow(0 14px 14px rgba(86, 42, 18, 0.28))' }}
      />

      {/* Dashed connectors from the Krishi Coins badge to the benefit pills */}
      <g className="fc-hero__connectors" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeDasharray="4 5" strokeLinecap="round">
        <path d="M1300 404C1312 352 1350 326 1404 323" />
        <path d="M1352 330Q1418 480 1352 650" />
        {PILL_Y.slice(1).map((y) => (
          <path key={y} d={`M${spineX(y).toFixed(1)} ${y}H${PILL_LEFT - 12}`} />
        ))}
      </g>
      <g className="fc-hero__connectors" fill="#ffffff" stroke="#f2c3a9" strokeWidth="1">
        {PILL_Y.map((y) => (
          <circle key={y} cx={PILL_LEFT - 12} cy={y} r="4.5" />
        ))}
        {[386, 575].map((y) => (
          <circle key={y} cx={spineX(y)} cy={y} r="3.5" />
        ))}
      </g>
    </svg>
  )
}
