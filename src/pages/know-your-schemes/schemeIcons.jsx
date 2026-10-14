// Artwork for the scheme cards and the "View Details" dialog: a flat, coloured 64×64 icon per kind of
// scheme (tractor, drone, milk can, crop insurance...). Each scheme names its icon in schemesData.js
// (`icon`); `tone` is the card colour that suits the icon.

const P = {
  green: '#22a55a', greenDark: '#167a40', greenLight: '#c9eed7', leaf: '#5fca86',
  blue: '#2f7cf6', blueDark: '#1c4fb5', blueLight: '#d3e4ff', sky: '#8ccbff',
  orange: '#f7881f', orangeDark: '#d1650a', orangeLight: '#ffdcb8',
  amber: '#fbbf24', amberDark: '#d99206', amberLight: '#fff0c4',
  red: '#ef5466', redDark: '#c93246',
  pink: '#f06a9b', pinkDark: '#d94d80', pinkLight: '#ffd6e5',
  purple: '#8b5cf6', purpleDark: '#6a3bd6', purpleLight: '#e6dcff',
  teal: '#14b8a6', tealDark: '#0e8a7d', tealLight: '#c9f2ec',
  brown: '#9c5a28', brownDark: '#7a431b', brownLight: '#d9a066', soil: '#b97a45', terracotta: '#d9703a',
  navy: '#1f2f5a', slate: '#5f6f8a', gray: '#a7b4c7', grayLight: '#e6ecf4', steel: '#cfd9e6',
  skin: '#f3b78e', skinDark: '#dc9a6f', hair: '#3a2a22', white: '#ffffff',
};
const WHITE = P.white;
const ROUND = { strokeLinecap: 'round', strokeLinejoin: 'round' };
const RUPEE = 'M-4 -5H4M-4 -1.6H4M-2.2 -5C1.8 -5 3 -3.5 3 -1.6S1.8 1.8 -2.2 1.8H-3.2L2.8 5.6';

const n = (v) => +v.toFixed(2);

const starPoints = (cx, cy, outer, inner, points = 5) =>
  Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 ? inner : outer;
    const a = ((-90 + (i * 180) / points) * Math.PI) / 180;
    return `${n(cx + r * Math.cos(a))},${n(cy + r * Math.sin(a))}`;
  }).join(' ');

const gearPath = (cx, cy, r, teeth) => {
  const step = (Math.PI * 2) / teeth;
  const inner = r * 0.78;
  const pts = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    [[inner, a - step * 0.3], [r, a - step * 0.18], [r, a + step * 0.18], [inner, a + step * 0.3]]
      .forEach(([rr, aa]) => pts.push(`${n(cx + rr * Math.cos(aa))} ${n(cy + rr * Math.sin(aa))}`));
  }
  return `M${pts.join('L')}z`;
};

// Pie slice from angle a0 to a1, in degrees clockwise from 12 o'clock.
const wedgePath = (cx, cy, r, a0, a1) => {
  const at = (a) => [n(cx + r * Math.sin((a * Math.PI) / 180)), n(cy - r * Math.cos((a * Math.PI) / 180))];
  const [x0, y0] = at(a0);
  const [x1, y1] = at(a1);
  return `M${cx} ${cy}L${x0} ${y0}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}z`;
};

/* ---- Badge glyphs: white, drawn for a radius-10 badge centred on 0,0 ---- */

const stroke = (width) => ({ fill: 'none', stroke: WHITE, strokeWidth: width, ...ROUND });

const GLYPHS = {
  rupee: () => <path d={RUPEE} {...stroke(1.9)} />,
  leaf: (c) => (
    <>
      <path d="M-5 5C-5.5 -1.5 -1.5 -5.5 5.5 -5.5C5.5 1.5 1.5 5 -5 5z" fill={WHITE} />
      <path d="M-4.6 4.6L1.8 -1.8" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  check: () => <path d="M-4.6 0.2L-1.4 3.4L4.8 -3.2" {...stroke(2.5)} />,
  up: () => <path d="M0 5.2V-4.6M-4.2 -0.6L0 -4.8L4.2 -0.6" {...stroke(2.4)} />,
  plus: () => <path d="M0 -5V5M-5 0H5" {...stroke(2.6)} />,
  percent: () => (
    <>
      <path d="M4.2 -4.8L-4.2 4.8" {...stroke(2)} />
      <circle cx="-3.2" cy="-3" r="2" fill={WHITE} />
      <circle cx="3.2" cy="3" r="2" fill={WHITE} />
    </>
  ),
  globe: () => (
    <g {...stroke(1.5)}>
      <circle r="5.6" />
      <ellipse rx="2.4" ry="5.6" />
      <path d="M-5.6 0H5.6" />
    </g>
  ),
  bolt: () => <path d="M1.6 -6.2L-4.4 1H-0.2L-1.6 6.2L4.4 -1H0.2z" fill={WHITE} />,
  drop: () => <path d="M0 -5.8C3.4 -1.6 4.4 0.4 4.4 2a4.4 4.4 0 0 1 -8.8 0C-4.4 0.4 -3.4 -1.6 0 -5.8z" fill={WHITE} />,
  cross: () => <path d="M-1.9 -5.4H1.9V-1.9H5.4V1.9H1.9V5.4H-1.9V1.9H-5.4V-1.9H-1.9z" fill={WHITE} />,
  heart: () => (
    <path d="M0 5C-6 0.8 -5.6 -4.8 -2.6 -4.8C-1.2 -4.8 -0.4 -4 0 -3C0.4 -4 1.2 -4.8 2.6 -4.8C5.6 -4.8 6 0.8 0 5z" fill={WHITE} />
  ),
  lock: () => (
    <>
      <path d="M-2.6 -1.4V-3.2a2.6 2.6 0 0 1 5.2 0V-1.4" {...stroke(1.7)} />
      <rect x="-4.2" y="-1.4" width="8.4" height="6.6" rx="1.4" fill={WHITE} />
    </>
  ),
  star: () => <polygon points={starPoints(0, 0.4, 6, 2.6)} fill={WHITE} />,
  person: () => (
    <>
      <circle cy="-2.6" r="2.7" fill={WHITE} />
      <path d="M-4.8 5.4a4.8 4.8 0 0 1 9.6 0z" fill={WHITE} />
    </>
  ),
  wrench: () => (
    <path d="M2.4 -5.8a3.7 3.7 0 0 0 -3.5 4.9L-5.3 3.3a1.5 1.5 0 0 0 2.1 2.1L1 1.2a3.7 3.7 0 0 0 4.9 -3.5L3.7 -0.1L1.6 -0.6L1.1 -2.7z" fill={WHITE} />
  ),
  refresh: () => (
    <>
      <path d="M4.6 0.4A4.6 4.6 0 1 1 2.8 -3.7" {...stroke(2)} />
      <path d="M1.2 -6.6L5.4 -4.6L2 -1.6z" fill={WHITE} />
    </>
  ),
  pin: (c) => (
    <>
      <path d="M0 -5.8a4.2 4.2 0 0 1 4.2 4.2C4.2 1.6 0 6 0 6S-4.2 1.6 -4.2 -1.6A4.2 4.2 0 0 1 0 -5.8z" fill={WHITE} />
      <circle cy="-1.6" r="1.5" fill={c} />
    </>
  ),
};

/* ---- Shared pieces ---- */

const Badge = ({ x = 48, y = 48, r = 10, fill, glyph }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={fill} stroke={WHITE} strokeWidth="2.5" />
    <g transform={`translate(${x} ${y}) scale(${r / 10})`}>{GLYPHS[glyph](fill)}</g>
  </g>
);

// A leaf pointing right from its stalk at x,y; `r` turns it, `s` scales it (16 long at s=1).
const Leaf = ({ x, y, s = 1, r = 0, fill = P.green }) => (
  <path d="M0 0C4 -5 11 -6 16 -3C12 2 5 3 0 0z" fill={fill} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
);

const Sprout = ({ x, y, h = 18, s = 1 }) => (
  <g>
    <path d={`M${x} ${y}V${y - h}`} stroke={P.greenDark} strokeWidth={2.6 * s} strokeLinecap="round" />
    <Leaf x={x} y={y - h * 0.38} s={s} r={-28} fill={P.green} />
    <Leaf x={x} y={y - h * 0.7} s={s * 0.9} r={-152} fill={P.leaf} />
    <Leaf x={x} y={y - h} s={s * 0.6} r={-70} fill={P.green} />
  </g>
);

const Drop = ({ x, y, s = 1, fill = P.sky }) => (
  <path
    d="M0 -7C4.2 -2 5.4 0.6 5.4 2.6a5.4 5.4 0 0 1 -10.8 0C-5.4 0.6 -4.2 -2 0 -7z"
    transform={`translate(${x} ${y}) scale(${s})`}
    fill={fill}
  />
);

const Sun = ({ x, y, r }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4;
      return (
        <path
          key={i}
          d={`M${n(x + (r + 2.5) * Math.cos(a))} ${n(y + (r + 2.5) * Math.sin(a))}L${n(x + (r + 5.5) * Math.cos(a))} ${n(y + (r + 5.5) * Math.sin(a))}`}
          stroke={P.amber}
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    })}
    <circle cx={x} cy={y} r={r} fill={P.amber} />
  </g>
);

const Coin = ({ x, y, r = 8 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={P.amber} stroke={P.amberDark} strokeWidth="1.4" />
    <path d={RUPEE} transform={`translate(${x} ${y}) scale(${r / 9})`} fill="none" stroke={P.amberDark} strokeWidth="1.9" {...ROUND} />
  </g>
);

// Stacked coins, bottom one resting at y.
const CoinStack = ({ x, y, count = 3, rx = 13 }) => (
  <g>
    {Array.from({ length: count }, (_, i) => {
      const cy = y - i * 5;
      return (
        <g key={i}>
          <path d={`M${x - rx} ${cy - 2.6}v2.6a${rx} 4.4 0 0 0 ${rx * 2} 0v-2.6z`} fill={P.amberDark} />
          <ellipse cx={x} cy={cy - 2.6} rx={rx} ry="4.4" fill={P.amber} />
        </g>
      );
    })}
  </g>
);

const Wheat = ({ x, y, h = 34 }) => (
  <g>
    <path d={`M${x} ${y + h}V${y}`} stroke={P.amberDark} strokeWidth="2" strokeLinecap="round" />
    {[0, 1, 2, 3].map((i) => {
      const cy = y + 3 + i * 4.6;
      return (
        <g key={i}>
          <ellipse cx={x - 2.6} cy={cy} rx="2.2" ry="3.6" transform={`rotate(-30 ${x - 2.6} ${cy})`} fill={P.amber} />
          <ellipse cx={x + 2.6} cy={cy} rx="2.2" ry="3.6" transform={`rotate(30 ${x + 2.6} ${cy})`} fill={P.amber} />
        </g>
      );
    })}
    <ellipse cx={x} cy={y - 1} rx="2" ry="3.4" fill={P.amber} />
  </g>
);

const Globe = ({ x, y, r }) => (
  <g transform={`translate(${x} ${y}) scale(${r / 20})`}>
    <circle r="20" fill={P.sky} />
    <ellipse rx="9" ry="20" fill="none" stroke={WHITE} strokeOpacity="0.55" strokeWidth="1.4" />
    <path d="M-20 0H20M-17 -10H17M-17 10H17" stroke={WHITE} strokeOpacity="0.55" strokeWidth="1.4" />
    <path d="M-12 -12C-8 -16 -2 -16 0 -12C2 -8 -2 -6 -5 -4C-8 -2 -6 2 -9 3C-12 4 -15 0 -16 -4C-17 -8 -15 -10 -12 -12z" fill={P.green} />
    <path d="M4 -14C9 -14 14 -10 16 -5C17 -1 14 1 11 0C9 3 10 7 7 9C5 10 3 6 3 3C3 0 0 -2 1 -6C1 -10 1 -13 4 -14z" fill={P.green} />
    <path d="M-6 9C-3 8 0 10 0 13C0 16 -3 18 -6 17C-8 15 -8 11 -6 9z" fill={P.green} />
  </g>
);

// Bust of a person: head centred on x,y; `long` gives long hair, `hat` a turban or a hard hat.
const Person = ({ x, y, s = 1, shirt, hair = P.hair, long = false, hat, hatColor = P.orange }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {long && <path d="M-7.6 -0.5a7.6 7.6 0 0 1 15.2 0V11H-7.6z" fill={hair} />}
    <rect x="-2.6" y="3" width="5.2" height="8" rx="1.5" fill={P.skinDark} />
    <path d="M-11.5 21C-11.5 13.6 -6.6 9.6 0 9.6S11.5 13.6 11.5 21z" fill={shirt} />
    <circle r="6.8" fill={P.skin} />
    {hat === 'turban' && (
      <path d="M-7.4 -0.8C-7.8 -6 -4.2 -9 0 -9S7.8 -6 7.4 -0.8C5.2 -2.8 2.8 -3.6 0 -3.6S-5.2 -2.8 -7.4 -0.8z" fill={hatColor} />
    )}
    {hat === 'helmet' && (
      <>
        <path d="M-7.8 -1.6a7.8 7.8 0 0 1 15.6 0z" fill={P.amber} />
        <rect x="-9.6" y="-2.6" width="19.2" height="2.8" rx="1.4" fill={P.amberDark} />
      </>
    )}
    {!hat && (
      <path d="M-6.8 -0.6C-6.8 -5 -3.8 -7.2 0 -7.2S6.8 -5 6.8 -0.6C4.8 -3.4 2.4 -4.4 0 -4.4S-4.8 -3.4 -6.8 -0.6z" fill={hair} />
    )}
  </g>
);

const Bank = ({ roof, column, band, t }) => (
  <g transform={t}>
    <path d="M6 22L32 8L58 22z" fill={roof} />
    <circle cx="32" cy="17" r="3" fill={WHITE} />
    <rect x="8" y="22" width="48" height="5" fill={band} />
    {[11, 23, 35, 47].map((x) => <rect key={x} x={x} y="27" width="6" height="19" fill={column} />)}
    <rect x="8" y="46" width="48" height="4" fill={band} />
    <rect x="4" y="50" width="56" height="5" rx="2" fill={roof} />
  </g>
);

const Factory = ({ body, dark }) => (
  <g>
    <rect x="46" y="10" width="7" height="22" fill={dark} />
    <circle cx="51" cy="6" r="3" fill={P.grayLight} />
    <path d="M6 54V30L17 22V30L28 22V30L39 22V30H56V54z" fill={body} />
    {[10, 21, 32, 44].map((x) => <rect key={x} x={x} y="37" width="6" height="7" rx="1" fill={WHITE} />)}
    <rect x="4" y="54" width="56" height="3" rx="1.5" fill={P.slate} />
  </g>
);

const Shield = ({ fill, shade }) => (
  <>
    <path d="M32 5L53 12V30C53 44 44 53 32 59C20 53 11 44 11 30V12z" fill={fill} />
    <path d="M32 5L53 12V30C53 44 44 53 32 59z" fill={shade} />
  </>
);

const Briefcase = ({ fill, dark }) => (
  <g>
    <path d="M23 26V21a3 3 0 0 1 3 -3H38a3 3 0 0 1 3 3V26" stroke={dark} strokeWidth="3.2" fill="none" />
    <rect x="8" y="26" width="48" height="28" rx="4" fill={fill} />
    <rect x="8" y="36" width="48" height="3.5" fill={dark} />
    <rect x="28" y="33" width="8" height="9" rx="1.5" fill={P.amber} />
  </g>
);

// Scalloped awning: stripes of `a` / `b` from x0 to x1 hanging from y.
const Awning = ({ x0, x1, y, h = 8, a, b }) => {
  const count = Math.round((x1 - x0) / 8);
  const w = (x1 - x0) / count;
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * w} y={y} width={w} height={h} fill={i % 2 ? b : a} />
          <circle cx={x0 + i * w + w / 2} cy={y + h} r={w / 2} fill={i % 2 ? b : a} />
        </g>
      ))}
    </g>
  );
};

const Lines = ({ x, y, widths, gap = 6, h = 2.4, fill = P.gray }) => (
  <g>
    {widths.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} fill={fill} />)}
  </g>
);

const Pie = ({ slices, badge }) => (
  <>
    <circle cx="30" cy="32" r="22" fill={P.grayLight} />
    {slices.map(([a0, a1, fill]) => (
      <path key={a0} d={wedgePath(30, 32, 22, a0, a1)} fill={fill} stroke={WHITE} strokeWidth="2" strokeLinejoin="round" />
    ))}
    <Badge x={50} y={50} {...badge} />
  </>
);

const Seal = ({ fill, dark, children }) => (
  <>
    <path d="M24 42L19 58L26 54.5L30 59L32 46z" fill={dark} />
    <path d="M40 42L45 58L38 54.5L34 59L32 46z" fill={dark} />
    <polygon points={starPoints(32, 28, 23, 20, 14)} fill={fill} />
    <circle cx="32" cy="28" r="15" fill={WHITE} />
    {children}
  </>
);

const Doc = () => (
  <>
    <path d="M12 6H36L46 16V56H12z" fill={WHITE} stroke={P.steel} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M36 6V16H46" fill={P.grayLight} stroke={P.steel} strokeWidth="1.5" strokeLinejoin="round" />
  </>
);

/* ---- The icons ---- */

const ICONS = {
  /* Agriculture & farming */
  cropGrowth: {
    tone: 'green',
    art: (
      <>
        <ellipse cx="30" cy="54" rx="22" ry="5" fill={P.brownLight} />
        <path d="M30 54V22" stroke={P.greenDark} strokeWidth="3" strokeLinecap="round" />
        <Leaf x={30} y={44} s={1.15} r={-160} fill={P.green} />
        <Leaf x={30} y={35} s={1.2} r={-25} fill={P.leaf} />
        <Leaf x={30} y={24} s={0.85} r={-115} fill={P.green} />
        <Badge x={49} y={46} fill={P.amber} glyph="up" />
      </>
    ),
  },
  warehouse: {
    tone: 'orange',
    art: (
      <>
        <rect x="40" y="20" width="16" height="32" fill={P.steel} />
        <path d="M40 20a8 8 0 0 1 16 0z" fill={P.gray} />
        <path d="M40 30H56M40 40H56" stroke={P.gray} strokeWidth="1.6" />
        <rect x="9" y="29" width="30" height="23" fill={P.red} />
        <polygon points="5,31 24,14 43,31" fill={P.redDark} />
        <rect x="20.5" y="22.5" width="7" height="5" rx="1" fill={WHITE} />
        <rect x="18" y="37" width="12" height="15" fill={WHITE} />
        <path d="M18 37L30 52M30 37L18 52" stroke={P.red} strokeWidth="2" />
        <rect x="4" y="52" width="56" height="4" rx="2" fill={P.soil} />
      </>
    ),
  },
  farmerGroup: {
    tone: 'green',
    art: (
      <>
        <Person x={15} y={27} s={0.85} shirt={P.orange} hat="turban" hatColor={P.white} />
        <Person x={49} y={27} s={0.85} shirt={P.blue} long />
        <Person x={32} y={23} s={1.05} shirt={P.green} hat="turban" />
        <rect x="6" y="45" width="52" height="10" rx="5" fill={P.greenDark} />
        <Leaf x={20} y={51} s={0.55} r={-20} fill={P.leaf} />
        <Leaf x={30} y={51} s={0.55} r={-20} fill={P.leaf} />
        <Leaf x={40} y={51} s={0.55} r={-20} fill={P.leaf} />
      </>
    ),
  },
  horticulture: {
    tone: 'orange',
    art: (
      <>
        <Leaf x={30} y={22} s={1} r={-140} fill={P.green} />
        <Leaf x={34} y={22} s={1} r={-40} fill={P.leaf} />
        <circle cx="21" cy="27" r="9" fill={P.red} />
        <ellipse cx="38" cy="25" rx="10" ry="8" transform="rotate(-20 38 25)" fill={P.orange} />
        {[[48, 26], [52, 30], [46, 31], [50, 35]].map(([cx, cy]) => <circle key={cx + cy} cx={cx} cy={cy} r="3.2" fill={P.purple} />)}
        <path d="M10 38H54L48 56H16z" fill={P.brownLight} />
        <path d="M12 45H52M14 51H50M22 38L24 56M32 38V56M42 38L40 56" stroke={P.brown} strokeWidth="1.4" />
        <rect x="6" y="34" width="52" height="6" rx="3" fill={P.brown} />
      </>
    ),
  },
  dripIrrigation: {
    tone: 'blue',
    art: (
      <>
        <path d="M2 52C14 47 50 47 62 52V60H2z" fill={P.brownLight} />
        <rect x="4" y="10" width="56" height="7" rx="3.5" fill={P.blue} />
        <rect x="17" y="17" width="6" height="4" rx="1" fill={P.blueDark} />
        <rect x="41" y="17" width="6" height="4" rx="1" fill={P.blueDark} />
        <Drop x={20} y={28} s={0.75} />
        <Drop x={44} y={28} s={0.75} />
        <Sprout x={20} y={51} h={14} s={0.85} />
        <Sprout x={44} y={51} h={14} s={0.85} />
      </>
    ),
  },
  tractor: {
    tone: 'orange',
    art: (
      <>
        <rect x="45" y="14" width="3.5" height="13" rx="1" fill={P.navy} />
        <rect x="27" y="26" width="27" height="13" rx="3" fill={P.red} />
        <rect x="10" y="10" width="20" height="27" rx="3" fill={P.red} />
        <rect x="14" y="14" width="12" height="11" rx="1.5" fill={P.sky} />
        <rect x="51" y="30" width="5" height="5" rx="1" fill={P.amber} />
        <circle cx="20" cy="45" r="12" fill={P.navy} />
        <circle cx="20" cy="45" r="5" fill={P.gray} />
        <circle cx="47" cy="49" r="8" fill={P.navy} />
        <circle cx="47" cy="49" r="3.2" fill={P.gray} />
      </>
    ),
  },
  drone: {
    tone: 'purple',
    art: (
      <>
        <ellipse cx="13" cy="16" rx="10" ry="2.5" fill={P.gray} />
        <ellipse cx="51" cy="16" rx="10" ry="2.5" fill={P.gray} />
        <rect x="11.5" y="16" width="3" height="10" fill={P.navy} />
        <rect x="49.5" y="16" width="3" height="10" fill={P.navy} />
        <rect x="9" y="25" width="46" height="4" rx="2" fill={P.navy} />
        <path d="M25 33L20 42M39 33L44 42" stroke={P.navy} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="22" y="21" width="20" height="13" rx="5" fill={P.purple} />
        <circle cx="32" cy="27.5" r="3" fill={P.purpleLight} />
        <rect x="28" y="34" width="8" height="5" rx="1.5" fill={P.purpleDark} />
        <Drop x={24} y={49} s={0.65} />
        <Drop x={32} y={53} s={0.75} />
        <Drop x={40} y={49} s={0.65} />
      </>
    ),
  },
  organic: {
    tone: 'green',
    art: (
      <>
        <circle cx="32" cy="32" r="24" fill="none" stroke={P.green} strokeWidth="2.5" strokeDasharray="3.5 3" />
        <circle cx="32" cy="32" r="19" fill={P.green} />
        <path d="M21 43C19 28 27 20 44 20C44 35 36 43 21 43z" fill={WHITE} />
        <path d="M21 43L36 28" stroke={P.green} strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
  },
  naturalFarming: {
    tone: 'green',
    art: (
      <>
        <rect x="4" y="32" width="56" height="26" rx="5" fill={P.brownLight} />
        <rect x="4" y="32" width="56" height="5" rx="2.5" fill={P.soil} />
        {[[12, 42], [50, 44], [22, 54], [46, 54], [56, 50]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="1.4" fill={P.brown} />)}
        <path d="M32 36V44M32 40L28 45M32 40L36 45" stroke={P.amberLight} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 50C18 44 22 54 27 48S36 46 40 50" stroke={P.pink} strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <Sprout x={32} y={34} h={22} s={1.1} />
      </>
    ),
  },
  soilTest: {
    tone: 'amber',
    art: (
      <>
        <rect x="6" y="10" width="34" height="46" rx="3" fill={WHITE} stroke={P.steel} strokeWidth="1.5" />
        <rect x="11" y="16" width="16" height="3" rx="1.5" fill={P.amberDark} />
        <rect x="11" y="26" width="20" height="4" rx="2" fill={P.green} />
        <rect x="11" y="34" width="14" height="4" rx="2" fill={P.amber} />
        <rect x="11" y="42" width="24" height="4" rx="2" fill={P.blue} />
        <rect x="44" y="9" width="12" height="44" rx="6" fill={WHITE} stroke={P.slate} strokeWidth="1.6" />
        <path d="M45 30H55V47a5 5 0 0 1 -10 0z" fill={P.soil} />
        <Leaf x={50} y={30} s={0.5} r={-60} fill={P.green} />
        <rect x="42" y="6" width="16" height="4" rx="1.5" fill={P.slate} />
      </>
    ),
  },
  dbtTransfer: {
    tone: 'green',
    art: (
      <>
        <rect x="6" y="10" width="22" height="38" rx="4" fill={P.navy} />
        <rect x="9" y="15" width="16" height="27" rx="1.5" fill={P.greenLight} />
        <Coin x={17} y={28} r={6} />
        <path d="M31 28H39" stroke={P.green} strokeWidth="3" strokeLinecap="round" />
        <path d="M36 23.5L40.5 28L36 32.5" stroke={P.green} strokeWidth="3" fill="none" {...ROUND} />
        <Person x={51} y={27} s={0.82} shirt={P.green} hat="turban" />
        <rect x="38" y="44" width="24" height="5" rx="2.5" fill={P.greenDark} />
      </>
    ),
  },
  digitalFarm: {
    tone: 'green',
    art: (
      <>
        <rect x="18" y="6" width="28" height="52" rx="5" fill={P.navy} />
        <rect x="21" y="12" width="22" height="38" rx="2" fill={P.greenLight} />
        <rect x="28" y="8.4" width="8" height="1.6" rx="0.8" fill={P.slate} />
        <circle cx="32" cy="54" r="1.8" fill={P.slate} />
        <path d="M25 44H39" stroke={P.brownLight} strokeWidth="3.2" strokeLinecap="round" />
        <Sprout x={32} y={43} h={20} s={0.9} />
        <path d="M50 16a6 6 0 0 1 6 6M50 9a13 13 0 0 1 13 13" stroke={P.green} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="22" r="2" fill={P.green} />
      </>
    ),
  },
  cropInsurance: {
    tone: 'blue',
    art: (
      <>
        <path d="M6 30C6 16 18 7 32 7S58 16 58 30C54 27 50 27 45.5 30C41 27 36.5 27 32 30C27.5 27 23 27 18.5 30C14 27 10 27 6 30z" fill={P.blue} />
        <path d="M32 7C25 12 22 20 22 28.6C25.5 27.4 28.8 27.8 32 30C35.2 27.8 38.5 27.4 42 28.6C42 20 39 12 32 7z" fill={P.sky} />
        <path d="M32 7V4" stroke={P.navy} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M32 30V40" stroke={P.navy} strokeWidth="2.4" strokeLinecap="round" />
        <ellipse cx="32" cy="56" rx="16" ry="3.5" fill={P.brownLight} />
        <Sprout x={32} y={56} h={14} s={0.85} />
      </>
    ),
  },
  kisanCard: {
    tone: 'green',
    art: (
      <>
        <rect x="11" y="11" width="48" height="32" rx="4" fill={P.greenLight} />
        <rect x="5" y="18" width="48" height="32" rx="4" fill={P.green} />
        <rect x="5" y="24" width="48" height="6" fill={P.greenDark} />
        <rect x="11" y="35" width="9" height="7" rx="1.5" fill={P.amber} />
        <rect x="11" y="45" width="18" height="2" rx="1" fill={WHITE} opacity="0.7" />
        <path d="M37 46C36.5 39.5 40.5 35.5 47.5 35.5C47.5 42.5 43.5 46 37 46z" fill={WHITE} />
        <path d="M37.4 45.6L43.8 39.2" stroke={P.green} strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  vegetables: {
    tone: 'orange',
    art: (
      <>
        <ellipse cx="35" cy="49" rx="14" ry="8" fill={P.brownLight} />
        {[[30, 47], [38, 52], [42, 46]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="1.2" fill={P.brown} />)}
        <path d="M46 18C53 26 56 32 56 38a10 10 0 0 1 -20 0c0 -6 3 -12 10 -20z" fill="#b25fc0" />
        <path d="M42 30C40 36 41 42 44 46M50 30C52 36 51 42 48 46" stroke={WHITE} strokeOpacity="0.45" strokeWidth="1.4" fill="none" />
        <path d="M46 18V12M46 18L42 13M46 18L50 13" stroke={P.green} strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="38" r="12" fill={P.red} />
        <path d="M20 28L15 24.5L18 28.5L13.5 30L19 30L20 34L21 30L26.5 30L22 28.5L25 24.5z" fill={P.green} />
        <ellipse cx="15.5" cy="35" rx="2.5" ry="1.6" fill={WHITE} opacity="0.45" />
      </>
    ),
  },
  grainSack: {
    tone: 'amber',
    art: (
      <>
        <path d="M18 20C13 30 11 41 13 50C15 57 49 57 51 50C53 41 51 30 46 20z" fill={P.brownLight} />
        <path d="M24 20L20 9H44L40 20z" fill={P.brownLight} />
        <rect x="21" y="17" width="22" height="5" rx="2.5" fill={P.brown} />
        <rect x="21" y="32" width="22" height="14" rx="2" fill={P.amberLight} />
        <Leaf x={27} y={43} s={0.7} r={-35} fill={P.green} />
        <ellipse cx="51" cy="56" rx="2" ry="3" transform="rotate(30 51 56)" fill={P.amber} />
        <ellipse cx="56" cy="54" rx="2" ry="3" transform="rotate(-20 56 54)" fill={P.amber} />
        <ellipse cx="9" cy="56" rx="2" ry="3" transform="rotate(-30 9 56)" fill={P.amber} />
        <Wheat x={56} y={18} h={30} />
      </>
    ),
  },
  balanceScale: {
    tone: 'amber',
    art: (
      <>
        <rect x="30" y="12" width="4" height="40" fill={P.slate} />
        <rect x="22" y="52" width="20" height="5" rx="2.5" fill={P.slate} />
        <rect x="8" y="13" width="48" height="3.4" rx="1.7" fill={P.navy} />
        <circle cx="32" cy="12" r="3" fill={P.navy} />
        <path d="M14 16L7 32M14 16L21 32M50 16L43 32M50 16L57 32" stroke={P.slate} strokeWidth="1.3" />
        <path d="M5 32H23C23 37.5 19 40 14 40S5 37.5 5 32z" fill={P.amber} />
        <path d="M41 32H59C59 37.5 55 40 50 40S41 37.5 41 32z" fill={P.amber} />
        <path d="M8 32C9 27 12 25 14 25S19 27 20 32z" fill={P.greenDark} />
        <Coin x={50} y={27} r={5.5} />
      </>
    ),
  },

  /* Water & sanitation */
  waterTap: {
    tone: 'blue',
    art: (
      <>
        <rect x="4" y="16" width="26" height="8" rx="2" fill={P.slate} />
        <rect x="30" y="6" width="4" height="7" fill={P.blueDark} />
        <rect x="23" y="4" width="18" height="4" rx="2" fill={P.blueDark} />
        <rect x="26" y="12" width="12" height="16" rx="3" fill={P.blue} />
        <path d="M38 17H46a6 6 0 0 1 6 6V30H44V25H38z" fill={P.blue} />
        <Drop x={48} y={39} s={0.8} />
        <Drop x={48} y={52} s={1.05} fill={P.blue} />
      </>
    ),
  },
  sanitation: {
    tone: 'teal',
    art: (
      <>
        <path d="M47 5L31 33" stroke={P.brown} strokeWidth="4" strokeLinecap="round" />
        <path d="M25 29L37 36L30 56L9 45z" fill={P.amber} />
        <path d="M23 32L37 40" stroke={P.amberDark} strokeWidth="3" />
        <path d="M15 47L21 37M20 50L26 39M25 52L30 42" stroke={P.amberDark} strokeWidth="1.4" />
        <path d="M0 -6C0.8 -1.5 1.5 -0.8 6 0C1.5 0.8 0.8 1.5 0 6C-0.8 1.5 -1.5 0.8 -6 0C-1.5 -0.8 -0.8 -1.5 0 -6z" transform="translate(50 32)" fill={P.teal} />
        <path d="M0 -6C0.8 -1.5 1.5 -0.8 6 0C1.5 0.8 0.8 1.5 0 6C-0.8 1.5 -1.5 0.8 -6 0C-1.5 -0.8 -0.8 -1.5 0 -6z" transform="translate(14 15) scale(0.8)" fill={P.sky} />
        <circle cx="55" cy="47" r="2.2" fill={P.teal} />
      </>
    ),
  },
  borewell: {
    tone: 'blue',
    art: (
      <>
        <rect x="17" y="18" width="6" height="38" fill={P.slate} />
        <rect x="10" y="9" width="20" height="12" rx="2.5" fill={P.orange} />
        <rect x="13" y="12" width="8" height="5" rx="1" fill={P.orangeLight} />
        <rect x="23" y="22" width="16" height="5" rx="1" fill={P.slate} />
        <path d="M39 24.5C46 25 47 32 46 43" stroke={P.sky} strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <ellipse cx="44" cy="50" rx="16" ry="6" fill={P.blue} />
        <ellipse cx="44" cy="49" rx="11" ry="3.2" fill={P.sky} />
        <path d="M4 56H60" stroke={P.soil} strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },

  /* Energy */
  solarPump: {
    tone: 'amber',
    art: (
      <>
        <Sun x={53} y={11} r={5.5} />
        <path d="M5 15H35L41 33H11z" fill={P.blueDark} />
        <path d="M15 15L21 33M25 15L31 33M8 24H38" stroke={P.sky} strokeWidth="1.3" />
        <path d="M26 33V50" stroke={P.slate} strokeWidth="3" />
        <rect x="18" y="50" width="16" height="4" rx="2" fill={P.slate} />
        <rect x="38" y="40" width="14" height="12" rx="2" fill={P.orange} />
        <rect x="41" y="43" width="8" height="3" rx="1" fill={P.orangeLight} />
        <path d="M52 44H57V50" stroke={P.blue} strokeWidth="3" fill="none" strokeLinecap="round" />
        <Drop x={57} y={57} s={0.55} fill={P.blue} />
      </>
    ),
  },
  solarGrid: {
    tone: 'amber',
    art: (
      <>
        <Sun x={12} y={11} r={5} />
        <path d="M4 28H28L32 44H8z" fill={P.blueDark} />
        <path d="M12 28L16 44M20 28L24 44M6 36H30" stroke={P.sky} strokeWidth="1.2" />
        <path d="M18 44V54" stroke={P.slate} strokeWidth="3" />
        <path d="M46 8L38 56M46 8L54 56M41 42H51M43 30H49M35 18H57M37 18L46 10L55 18M40 50L50 34M52 50L42 34" stroke={P.slate} strokeWidth="2.2" fill="none" {...ROUND} />
        <path d="M35 18C30 24 26 26 20 27" stroke={P.gray} strokeWidth="1.4" fill="none" />
        <Badge x={22} y={52} r={8} fill={P.amber} glyph="bolt" />
      </>
    ),
  },
  rooftopSolar: {
    tone: 'amber',
    art: (
      <>
        <Sun x={52} y={11} r={5.5} />
        <rect x="12" y="33" width="36" height="22" fill={P.amberLight} />
        <polygon points="6,35 30,15 54,35" fill={P.red} />
        <polygon points="11,32 25,20.5 30,24.5 16,36" fill={P.blueDark} />
        <path d="M18 26L23 30M14 29L19 33M17 34L28 23" stroke={P.sky} strokeWidth="1" />
        <rect x="26" y="42" width="9" height="13" fill={P.brown} />
        <rect x="16" y="40" width="7" height="7" fill={P.sky} />
        <rect x="38" y="40" width="7" height="7" fill={P.sky} />
        <rect x="4" y="55" width="52" height="3" rx="1.5" fill={P.slate} />
      </>
    ),
  },
  biogas: {
    tone: 'green',
    art: (
      <>
        <rect x="30" y="12" width="4" height="12" fill={P.slate} />
        <path d="M32 2C36 6 37.5 9 35.5 12.5H28.5C26.5 9 28 6 32 2z" fill={P.orange} />
        <path d="M32 6C33.6 8 34 10 33 12H31C30 10 30.4 8 32 6z" fill={P.amber} />
        <path d="M8 50C8 33 18 23 32 23S56 33 56 50z" fill={P.green} />
        <path d="M18 36C21 30 26 27 32 26.5" stroke={WHITE} strokeOpacity="0.5" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <rect x="26" y="38" width="12" height="12" rx="1.5" fill={P.greenDark} />
        <rect x="4" y="50" width="56" height="6" rx="2" fill={P.soil} />
      </>
    ),
  },
  powerPylon: {
    tone: 'amber',
    art: (
      <>
        <path d="M18 16C10 20 6 22 2 22M46 16C54 20 58 22 62 22" stroke={P.gray} strokeWidth="1.5" fill="none" />
        <path d="M32 4L22 58M32 4L42 58M25 42H39M27 30H37M18 16H46M28 16L32 9L36 16M24 50L39 34M40 50L25 34" stroke={P.slate} strokeWidth="2.4" fill="none" {...ROUND} />
        <Badge x={50} y={46} fill={P.amber} glyph="bolt" />
      </>
    ),
  },
  fuelPump: {
    tone: 'orange',
    art: (
      <>
        <path d="M38 20H43a4 4 0 0 1 4 4V44a3 3 0 0 0 6 0V28L49 22" stroke={P.navy} strokeWidth="2.6" fill="none" {...ROUND} />
        <rect x="10" y="10" width="28" height="44" rx="4" fill={P.red} />
        <rect x="15" y="15" width="18" height="12" rx="2" fill={WHITE} />
        <rect x="18" y="19" width="12" height="3.4" rx="1" fill={P.redDark} />
        <rect x="15" y="32" width="18" height="2.6" rx="1.3" fill={P.redDark} />
        <rect x="6" y="54" width="36" height="4" rx="2" fill={P.navy} />
        <Badge x={50} y={13} r={9} fill={P.green} glyph="leaf" />
      </>
    ),
  },
  nanoFertilizer: {
    tone: 'teal',
    art: (
      <>
        <rect x="25" y="5" width="14" height="7" rx="2" fill={P.navy} />
        <rect x="27" y="12" width="10" height="8" fill={P.tealDark} />
        <path d="M27 20H37C42 22 45 26 45 31V54a4 4 0 0 1 -4 4H23a4 4 0 0 1 -4 -4V31C19 26 22 22 27 20z" fill={P.teal} />
        <rect x="19" y="32" width="26" height="15" fill={WHITE} />
        <Leaf x={26} y={44} s={0.85} r={-35} fill={P.green} />
        <Drop x={53} y={16} s={0.7} />
        <Drop x={57} y={28} s={0.55} />
      </>
    ),
  },

  /* Food processing, storage & transport */
  foodJar: {
    tone: 'orange',
    art: (
      <>
        <rect x="17" y="18" width="30" height="40" rx="7" fill={P.orangeLight} />
        <rect x="17" y="28" width="30" height="30" rx="7" fill={P.orange} />
        <rect x="15" y="10" width="34" height="9" rx="3" fill={P.red} />
        <rect x="21" y="34" width="22" height="14" rx="2.5" fill={WHITE} />
        <Leaf x={27} y={44} s={0.75} r={-35} fill={P.green} />
        <rect x="20" y="20" width="3" height="6" rx="1.5" fill={WHITE} opacity="0.7" />
      </>
    ),
  },
  coldChain: {
    tone: 'blue',
    art: (
      <>
        <rect x="4" y="14" width="36" height="28" rx="2.5" fill={P.blueLight} stroke={P.blue} strokeWidth="2" />
        <path d="M22 20V36M15 24L29 32M15 32L29 24" stroke={P.blue} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M40 22H50L58 32V42H40z" fill={P.blue} />
        <path d="M43 25H49L54 32H43z" fill={P.sky} />
        <rect x="4" y="41" width="54" height="4" rx="1" fill={P.navy} />
        <circle cx="15" cy="47" r="5.5" fill={P.navy} />
        <circle cx="15" cy="47" r="2.2" fill={P.gray} />
        <circle cx="48" cy="47" r="5.5" fill={P.navy} />
        <circle cx="48" cy="47" r="2.2" fill={P.gray} />
      </>
    ),
  },
  agroFactory: {
    tone: 'orange',
    art: (
      <>
        <Factory body={P.orange} dark={P.orangeDark} />
        <Badge x={50} y={46} fill={P.green} glyph="leaf" />
      </>
    ),
  },
  msmeIncentive: {
    tone: 'blue',
    art: (
      <>
        <Factory body={P.blue} dark={P.blueDark} />
        <Badge x={50} y={46} fill={P.orange} glyph="percent" />
      </>
    ),
  },
  msmeBank: {
    tone: 'blue',
    art: (
      <>
        <Factory body={P.sky} dark={P.blue} />
        <Badge x={50} y={46} fill={P.amber} glyph="rupee" />
      </>
    ),
  },
  pliIncentive: {
    tone: 'blue',
    art: (
      <>
        <rect x="8" y="38" width="10" height="16" rx="2" fill={P.blueLight} />
        <rect x="22" y="30" width="10" height="24" rx="2" fill={P.sky} />
        <rect x="36" y="22" width="10" height="32" rx="2" fill={P.blue} />
        <rect x="4" y="54" width="46" height="3" rx="1.5" fill={P.navy} />
        <path d="M8 30L20 20L30 24L46 9" stroke={P.green} strokeWidth="3" fill="none" {...ROUND} />
        <path d="M39 8H47V16" stroke={P.green} strokeWidth="3" fill="none" {...ROUND} />
        <Badge x={51} y={46} fill={P.amber} glyph="rupee" />
      </>
    ),
  },
  convergence: {
    tone: 'purple',
    art: (
      <>
        {[[10, 12, P.blue], [54, 12, P.orange], [7, 40, P.green], [57, 40, P.pink], [20, 57, P.amber], [44, 57, P.teal]].map(([x, y, c]) => (
          <g key={c}>
            <path d={`M${x} ${y}L32 32`} stroke={c} strokeWidth="2.4" strokeLinecap="round" />
            <circle cx={x} cy={y} r="4.8" fill={c} />
          </g>
        ))}
        <circle cx="32" cy="32" r="11" fill={P.purple} stroke={WHITE} strokeWidth="2.5" />
        <path d="M27 32.4L30.6 36L37.4 28.6" stroke={WHITE} strokeWidth="3" fill="none" {...ROUND} />
      </>
    ),
  },
  train: {
    tone: 'green',
    art: (
      <>
        <rect x="2" y="54" width="60" height="2.5" rx="1" fill={P.slate} />
        <path d="M4 22a6 6 0 0 1 6 -6H30V48H4z" fill={P.green} />
        <rect x="8" y="21" width="12" height="9" rx="1.5" fill={P.sky} />
        <rect x="4" y="36" width="26" height="3" fill={P.amber} />
        <rect x="29" y="41" width="6" height="3" fill={P.slate} />
        <rect x="34" y="20" width="26" height="28" rx="2" fill={P.blueLight} stroke={P.blue} strokeWidth="1.6" />
        <path d="M47 26V42M40 30L54 38M40 38L54 30" stroke={P.blue} strokeWidth="2.2" strokeLinecap="round" />
        {[11, 23, 41, 53].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="50" r="4.2" fill={P.navy} />
            <circle cx={cx} cy="50" r="1.6" fill={P.gray} />
          </g>
        ))}
      </>
    ),
  },
  airFreight: {
    tone: 'blue',
    art: (
      <>
        <path d="M6 54C6 50 9 48 12 48C13 45 16 43 19 44C21 42 26 42 27 46C30 46 32 48 32 51C32 53 31 54 30 54z" fill={P.grayLight} />
        <g transform="rotate(45 32 28)">
          <path d="M28 20L6 32V37L28 30zM36 20L58 32V37L36 30z" fill={P.blue} />
          <path d="M28 42L20 48V51L28 48zM36 42L44 48V51L36 48z" fill={P.blueDark} />
          <path d="M32 2C35 2 36 6 36 10V44C36 48 34 52 32 52C30 52 28 48 28 44V10C28 6 29 2 32 2z" fill={WHITE} stroke={P.steel} strokeWidth="1.4" />
          <rect x="30" y="8" width="4" height="4" rx="1" fill={P.sky} />
        </g>
        <Badge x={50} y={51} r={8.5} fill={P.green} glyph="leaf" />
      </>
    ),
  },
  containerShip: {
    tone: 'blue',
    art: (
      <>
        <path d="M0 53Q8 49 16 53T32 53T48 53T64 53V64H0z" fill={P.sky} />
        <path d="M4 38H60L53 52H11z" fill={P.navy} />
        <path d="M7.5 46H56.5L53 52H11z" fill={P.red} />
        <rect x="46" y="20" width="10" height="18" fill={WHITE} stroke={P.steel} strokeWidth="1.2" />
        <rect x="48" y="23" width="6" height="3" fill={P.navy} />
        {[[9, 30, P.orange], [18, 30, P.blue], [27, 30, P.green], [36, 30, P.amber], [13, 22, P.red], [22, 22, P.teal], [31, 22, P.orange]].map(([x, y, c]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="8.4" height="8" rx="0.8" fill={c} />
        ))}
      </>
    ),
  },
  portCrane: {
    tone: 'orange',
    art: (
      <>
        <rect x="12" y="14" width="4" height="40" fill={P.amber} />
        <rect x="28" y="14" width="4" height="40" fill={P.amber} />
        <path d="M16 22L28 34M28 22L16 34M16 38L28 50M28 38L16 50" stroke={P.amberDark} strokeWidth="1.8" />
        <rect x="8" y="9" width="50" height="5" rx="1" fill={P.amberDark} />
        <rect x="42" y="14" width="8" height="4" fill={P.navy} />
        <path d="M46 18V26" stroke={P.navy} strokeWidth="1.5" />
        <rect x="39" y="26" width="14" height="8" rx="1" fill={P.red} />
        <rect x="34" y="44" width="12" height="10" rx="1" fill={P.blue} />
        <rect x="46" y="44" width="13" height="10" rx="1" fill={P.green} />
        <rect x="4" y="54" width="56" height="3" rx="1.5" fill={P.navy} />
      </>
    ),
  },

  /* Trade & export */
  exportDoc: {
    tone: 'blue',
    art: (
      <>
        <Doc />
        <rect x="17" y="22" width="18" height="3" rx="1.5" fill={P.blue} />
        <Lines x={17} y={29} widths={[24, 20, 12]} />
        <Badge x={45} y={46} r={11} fill={P.blue} glyph="globe" />
      </>
    ),
  },
  globeExport: {
    tone: 'blue',
    art: (
      <>
        <Globe x={27} y={28} r={21} />
        <rect x="36" y="38" width="22" height="18" rx="2" fill={P.brownLight} />
        <path d="M36 44H58M36 50H58" stroke={P.brown} strokeWidth="1.4" />
        <path d="M42 38V56M52 38V56" stroke={P.brown} strokeWidth="1.4" />
      </>
    ),
  },
  globalInvest: {
    tone: 'blue',
    art: (
      <>
        <Globe x={28} y={28} r={22} />
        <Badge x={48} y={48} r={11} fill={P.amber} glyph="rupee" />
      </>
    ),
  },
  exportShield: {
    tone: 'teal',
    art: (
      <>
        <Shield fill={P.teal} shade={P.tealDark} />
        <g transform="translate(32 31) scale(2.1)">{GLYPHS.globe()}</g>
      </>
    ),
  },
  taxRefund: {
    tone: 'orange',
    art: (
      <>
        <path d="M12 6H44V54L40 51L36 54L32 51L28 54L24 51L20 54L16 51L12 54z" fill={WHITE} stroke={P.steel} strokeWidth="1.5" strokeLinejoin="round" />
        <g transform="translate(28 21) scale(1.5)">
          <path d="M4.2 -4.8L-4.2 4.8" stroke={P.orange} strokeWidth="2" strokeLinecap="round" />
          <circle cx="-3.2" cy="-3" r="2" fill={P.orange} />
          <circle cx="3.2" cy="3" r="2" fill={P.orange} />
        </g>
        <Lines x={17} y={35} widths={[22, 14]} />
        <Badge x={46} y={46} r={11} fill={P.green} glyph="refresh" />
      </>
    ),
  },
  capitalGoods: {
    tone: 'blue',
    art: (
      <>
        <path d={gearPath(25, 27, 19, 9)} fill={P.blue} />
        <circle cx="25" cy="27" r="6.5" fill={P.blueLight} />
        <rect x="34" y="36" width="24" height="20" rx="2" fill={P.brownLight} />
        <path d="M34 42H58M34 50H58M34 36L58 56" stroke={P.brown} strokeWidth="1.5" />
      </>
    ),
  },
  govMarketplace: {
    tone: 'orange',
    art: (
      <>
        <rect x="10" y="12" width="44" height="30" rx="3" fill={P.navy} />
        <rect x="13" y="15" width="38" height="24" rx="1.5" fill={P.orangeLight} />
        <path d="M4 44H60L56 50H8z" fill={P.gray} />
        <rect x="26" y="44" width="12" height="2" rx="1" fill={P.slate} />
        <path d="M19 19H23L26.5 31H39L42 22H24.5" fill="none" stroke={P.orange} strokeWidth="2.4" {...ROUND} />
        <circle cx="28" cy="35" r="2" fill={P.orange} />
        <circle cx="37" cy="35" r="2" fill={P.orange} />
      </>
    ),
  },
  networkCommerce: {
    tone: 'blue',
    art: (
      <>
        <path d="M11 15L22 28M53 15L42 28M9 47L21 42M55 47L43 42" stroke={P.blue} strokeWidth="2" strokeDasharray="3 2.5" />
        {[[10, 14, P.blue], [54, 14, P.teal], [8, 48, P.purple], [56, 48, P.green]].map(([cx, cy, c]) => (
          <circle key={c} cx={cx} cy={cy} r="5" fill={c} />
        ))}
        <path d="M26 24V20a6 6 0 0 1 12 0V24" stroke={P.orangeDark} strokeWidth="2.6" fill="none" />
        <rect x="20" y="24" width="24" height="28" rx="4" fill={P.orange} />
        <path d="M27 37.5L30.5 41L37 34" stroke={WHITE} strokeWidth="2.6" fill="none" {...ROUND} />
      </>
    ),
  },
  tradeFair: {
    tone: 'amber',
    art: (
      <>
        <path d="M32 14V4" stroke={P.slate} strokeWidth="1.6" />
        <polygon points="32,4 41,7 32,10" fill={P.amber} />
        <rect x="10" y="22" width="3" height="16" fill={P.slate} />
        <rect x="51" y="22" width="3" height="16" fill={P.slate} />
        <Awning x0={8} x1={56} y={14} h={8} a={P.red} b={WHITE} />
        <rect x="14" y="29" width="9" height="7" rx="1" fill={P.amber} />
        <circle cx="31" cy="32" r="4" fill={P.green} />
        <rect x="39" y="28" width="7" height="8" rx="1.5" fill={P.orange} />
        <rect x="6" y="36" width="52" height="4" rx="2" fill={P.blueDark} />
        <rect x="8" y="40" width="48" height="15" rx="2" fill={P.blue} />
        <rect x="24" y="44" width="16" height="5" rx="1" fill={WHITE} />
      </>
    ),
  },
  giTag: {
    tone: 'orange',
    art: (
      <>
        <path d="M6 32L20 16H54a4 4 0 0 1 4 4V44a4 4 0 0 1 -4 4H20z" fill={P.orange} />
        <circle cx="18" cy="32" r="3" fill={WHITE} />
        <path d="M40 19a8.5 8.5 0 0 1 8.5 8.5C48.5 34 40 43 40 43S31.5 34 31.5 27.5A8.5 8.5 0 0 1 40 19z" fill={WHITE} />
        <circle cx="40" cy="27.5" r="3.4" fill={P.orange} />
      </>
    ),
  },
  districtProduct: {
    tone: 'orange',
    art: (
      <>
        <ellipse cx="30" cy="57" rx="12" ry="3" fill={P.orangeLight} />
        <path d="M30 4a19 19 0 0 1 19 19C49 37 30 56 30 56S11 37 11 23A19 19 0 0 1 30 4z" fill={P.orange} />
        <circle cx="30" cy="23" r="12" fill={WHITE} />
        <polygon points={starPoints(30, 23.6, 8, 3.4)} fill={P.amber} />
      </>
    ),
  },
  certifiedLeaf: {
    tone: 'green',
    art: (
      <>
        <rect x="6" y="10" width="44" height="32" rx="3" fill={WHITE} stroke={P.greenLight} strokeWidth="2" />
        <rect x="12" y="17" width="20" height="3" rx="1.5" fill={P.green} />
        <Lines x={12} y={24} widths={[26, 16]} />
        <path d="M38 47L35 59L40.5 56L44 59.5V49z" fill={P.greenDark} />
        <path d="M52 47L55 59L49.5 56L46 59.5V49z" fill={P.greenDark} />
        <Badge x={45} y={42} r={11} fill={P.green} glyph="leaf" />
      </>
    ),
  },
  qualityBadge: {
    tone: 'teal',
    art: (
      <Seal fill={P.teal} dark={P.tealDark}>
        <path d="M24.5 28.5L30 34L40 23" stroke={P.teal} strokeWidth="4" fill="none" {...ROUND} />
      </Seal>
    ),
  },
  isiMark: {
    tone: 'blue',
    art: (
      <Seal fill={P.blue} dark={P.blueDark}>
        <text x="32" y="32.2" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="Inter, Arial, sans-serif" fill={P.blueDark}>ISI</text>
      </Seal>
    ),
  },
  checklist: {
    tone: 'teal',
    art: (
      <>
        <rect x="12" y="10" width="40" height="48" rx="4" fill={P.brownLight} />
        <rect x="16" y="16" width="32" height="38" rx="2" fill={WHITE} />
        <rect x="24" y="6" width="16" height="9" rx="2.5" fill={P.slate} />
        {[25, 35, 45].map((y) => (
          <g key={y}>
            <path d={`M19.5 ${y}L22 ${y + 2.5}L26.5 ${y - 2}`} stroke={P.teal} strokeWidth="2.2" fill="none" {...ROUND} />
            <rect x="29" y={y - 1.2} width="15" height="2.6" rx="1.3" fill={P.gray} />
          </g>
        ))}
      </>
    ),
  },
  singleWindow: {
    tone: 'teal',
    art: (
      <>
        <rect x="20" y="5" width="34" height="42" rx="3" fill={P.tealLight} />
        <rect x="15" y="9" width="34" height="42" rx="3" fill={WHITE} stroke={P.steel} strokeWidth="1.2" />
        <rect x="10" y="13" width="34" height="43" rx="3" fill={WHITE} stroke={P.steel} strokeWidth="1.5" />
        <rect x="15" y="20" width="18" height="3" rx="1.5" fill={P.teal} />
        <Lines x={15} y={27} widths={[24, 20, 14]} />
        <Badge x={46} y={48} r={11} fill={P.teal} glyph="check" />
      </>
    ),
  },
  foodSafety: {
    tone: 'green',
    art: (
      <>
        <Shield fill={P.green} shade={P.greenDark} />
        <path d="M24 18V27a3.5 3.5 0 0 0 7 0V18M27.5 18V44" stroke={WHITE} strokeWidth="2.4" fill="none" {...ROUND} />
        <ellipse cx="38.5" cy="23.5" rx="3.8" ry="5.5" fill={WHITE} />
        <path d="M38.5 29V44" stroke={WHITE} strokeWidth="2.6" strokeLinecap="round" />
      </>
    ),
  },

  /* Money, banks & insurance */
  ruralBank: {
    tone: 'green',
    art: (
      <>
        <Bank roof={P.greenDark} column={P.greenLight} band={P.green} />
        <Badge x={50} y={48} fill={P.amber} glyph="leaf" />
      </>
    ),
  },
  eximBank: {
    tone: 'blue',
    art: (
      <>
        <Bank roof={P.blueDark} column={P.blueLight} band={P.blue} />
        <Badge x={50} y={48} fill={P.teal} glyph="globe" />
      </>
    ),
  },
  shgBank: {
    tone: 'pink',
    art: (
      <>
        <Bank roof={P.purpleDark} column={P.purpleLight} band={P.purple} />
        <Badge x={50} y={48} fill={P.pink} glyph="person" />
      </>
    ),
  },
  bankNetwork: {
    tone: 'teal',
    art: (
      <>
        <path d="M32 38L10 53M32 38V55M32 38L54 53" stroke={P.tealDark} strokeWidth="2" />
        <Bank roof={P.tealDark} column={P.tealLight} band={P.teal} t="translate(12.8 -2) scale(0.6)" />
        <circle cx="10" cy="53" r="5.5" fill={P.amber} />
        <circle cx="32" cy="56" r="5.5" fill={P.blue} />
        <circle cx="54" cy="53" r="5.5" fill={P.pink} />
      </>
    ),
  },
  computerPacs: {
    tone: 'blue',
    art: (
      <>
        <rect x="8" y="9" width="48" height="33" rx="3" fill={P.navy} />
        <rect x="11" y="12" width="42" height="27" rx="1.5" fill={P.blueLight} />
        <Bank roof={P.blue} column={WHITE} band={P.blue} t="translate(18.6 11) scale(0.42)" />
        <rect x="28" y="42" width="8" height="6" fill={P.gray} />
        <rect x="19" y="48" width="26" height="4" rx="2" fill={P.slate} />
      </>
    ),
  },
  creditShield: {
    tone: 'blue',
    art: (
      <>
        <Shield fill={P.blue} shade={P.blueDark} />
        <path d={RUPEE} transform="translate(32 31) scale(2.2)" fill="none" stroke={WHITE} strokeWidth="1.8" {...ROUND} />
      </>
    ),
  },
  healthShield: {
    tone: 'pink',
    art: (
      <>
        <Shield fill={P.red} shade={P.redDark} />
        <path d="M27.5 18H36.5V27.5H46V36.5H36.5V46H27.5V36.5H18V27.5H27.5z" fill={WHITE} />
      </>
    ),
  },
  womanShield: {
    tone: 'pink',
    art: (
      <>
        <Shield fill={P.pink} shade={P.pinkDark} />
        <circle cx="32" cy="24" r="6" fill={WHITE} />
        <path d="M32 18C27 18 25 22 25.5 27L24 33H40L38.5 27C39 22 37 18 32 18z" fill={WHITE} opacity="0.5" />
        <path d="M21 45C21 37 26 33 32 33S43 37 43 45z" fill={WHITE} />
      </>
    ),
  },
  moneyBag: {
    tone: 'amber',
    art: (
      <>
        <path d="M24 16L19 7H45L40 16z" fill={P.amber} />
        <path d="M22 21C15 29 11 37 11 45C11 53 19 57 32 57S53 53 53 45C53 37 49 29 42 21z" fill={P.amber} />
        <rect x="22" y="15" width="20" height="6" rx="3" fill={P.amberDark} />
        <path d={RUPEE} transform="translate(32 40) scale(1.9)" fill="none" stroke={P.amberDark} strokeWidth="1.8" {...ROUND} />
      </>
    ),
  },
  jandhan: {
    tone: 'blue',
    art: (
      <>
        <rect x="12" y="8" width="38" height="48" rx="3" fill={P.blue} />
        <rect x="12" y="8" width="7" height="48" rx="2" fill={P.blueDark} />
        <rect x="25" y="17" width="19" height="9" rx="1.5" fill={WHITE} />
        <Lines x={25} y={32} widths={[19, 13]} fill={P.blueLight} gap={5} />
        <Badge x={48} y={48} fill={P.amber} glyph="rupee" />
      </>
    ),
  },
  seedFund: {
    tone: 'green',
    art: (
      <>
        <CoinStack x={32} y={56} count={3} rx={15} />
        <Sprout x={32} y={41} h={26} s={1.15} />
      </>
    ),
  },
  investFund: {
    tone: 'purple',
    art: <Pie slices={[[0, 130, P.purple], [130, 230, P.blue], [230, 290, P.amber]]} badge={{ fill: P.green, glyph: 'rupee' }} />,
  },
  equityShare: {
    tone: 'green',
    art: <Pie slices={[[0, 140, P.green], [140, 250, P.leaf], [250, 300, P.amber]]} badge={{ fill: P.greenDark, glyph: 'leaf' }} />,
  },
  investGrowth: {
    tone: 'blue',
    art: (
      <>
        <path d="M32 44V52M32 44L22 58M32 44L42 58" stroke={P.slate} strokeWidth="2.4" strokeLinecap="round" />
        <rect x="6" y="8" width="52" height="36" rx="3" fill={WHITE} stroke={P.steel} strokeWidth="1.5" />
        <path d="M12 36L22 28L30 31L40 20L50 15" stroke={P.green} strokeWidth="3" fill="none" {...ROUND} />
        {[[22, 28], [30, 31], [40, 20]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="2.4" fill={P.green} />)}
        <Badge x={51} y={46} fill={P.amber} glyph="rupee" />
      </>
    ),
  },
  cooperativeLoan: {
    tone: 'green',
    art: (
      <>
        <Coin x={32} y={12} r={8} />
        <rect x="-6" y="-6.5" width="27" height="13" rx="4" transform="translate(10 46) rotate(-35)" fill={P.blue} />
        <rect x="-6" y="-6.5" width="27" height="13" rx="4" transform="translate(54 46) rotate(-145)" fill={P.green} />
        <ellipse cx="32" cy="34" rx="13" ry="9" fill={P.skin} />
        <path d="M25 29V39M29.5 28V40M34 28V40M38.5 29V39" stroke={P.skinDark} strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },

  /* People, enterprise & skills */
  womenSHG: {
    tone: 'pink',
    art: (
      <>
        <Person x={15} y={27} s={0.85} shirt={P.pink} long />
        <Person x={49} y={27} s={0.85} shirt={P.purple} long />
        <Person x={32} y={23} s={1.05} shirt={P.orange} long />
        <Badge x={32} y={51} r={8.5} fill={P.amber} glyph="rupee" />
      </>
    ),
  },
  peopleCredit: {
    tone: 'blue',
    art: (
      <>
        <Person x={15} y={27} s={0.85} shirt={P.teal} />
        <Person x={49} y={27} s={0.85} shirt={P.green} long />
        <Person x={32} y={23} s={1.05} shirt={P.blue} />
        <Badge x={32} y={51} r={8.5} fill={P.amber} glyph="rupee" />
      </>
    ),
  },
  womanEmpower: {
    tone: 'pink',
    art: (
      <>
        <Person x={27} y={25} s={1.25} shirt={P.pink} long />
        <Badge x={49} y={15} r={9} fill={P.amber} glyph="star" />
      </>
    ),
  },
  womanFarmer: {
    tone: 'green',
    art: (
      <>
        <Person x={24} y={25} s={1.15} shirt={P.green} long />
        <Wheat x={46} y={16} h={40} />
        <Wheat x={54} y={22} h={34} />
      </>
    ),
  },
  womanEntrepreneur: {
    tone: 'purple',
    art: (
      <>
        <Person x={32} y={21} s={1.05} shirt={P.purple} long />
        <rect x="17" y="33" width="30" height="17" rx="2" fill={P.navy} />
        <circle cx="32" cy="41.5" r="2.2" fill={P.sky} />
        <path d="M11 50H53L50 55H14z" fill={P.gray} />
      </>
    ),
  },
  lakhpatiDidi: {
    tone: 'amber',
    art: (
      <>
        <Person x={22} y={25} s={1.1} shirt={P.pink} long />
        <CoinStack x={47} y={57} count={4} rx={10} />
        <path d="M47 34V16M41 22L47 16L53 22" stroke={P.green} strokeWidth="3" fill="none" {...ROUND} />
      </>
    ),
  },
  motherChild: {
    tone: 'pink',
    art: (
      <>
        <Person x={26} y={24} s={1.15} shirt={P.pink} long />
        <ellipse cx="40" cy="44" rx="12" ry="8" fill={P.amberLight} />
        <circle cx="45" cy="37" r="5.5" fill={P.skin} />
        <path d="M40 34.5a5.5 5.5 0 0 1 10 0z" fill={P.amberLight} />
        <Badge x={51} y={13} r={8} fill={P.red} glyph="heart" />
      </>
    ),
  },
  jobCreation: {
    tone: 'blue',
    art: (
      <>
        <Person x={25} y={24} s={1.15} shirt={P.blue} />
        <path d="M42 41V38a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2V41" stroke={P.brownDark} strokeWidth="2.4" fill="none" />
        <rect x="36" y="41" width="22" height="15" rx="3" fill={P.brown} />
        <rect x="36" y="46.5" width="22" height="2.5" fill={P.brownDark} />
        <Badge x={50} y={14} r={9} fill={P.green} glyph="plus" />
      </>
    ),
  },
  youthEnterprise: {
    tone: 'teal',
    art: (
      <>
        <Person x={25} y={26} s={1.15} shirt={P.teal} />
        <g transform="translate(48 18)">
          <path d="M0 -9C5.5 -9 9 -5 9 0C9 3.5 7 5.5 5.5 7.5V10H-5.5V7.5C-7 5.5 -9 3.5 -9 0C-9 -5 -5.5 -9 0 -9z" fill={P.amber} />
          <rect x="-5" y="10.5" width="10" height="3" rx="1.5" fill={P.slate} />
          <path d="M-12 -6L-14.5 -7.5M12 -6L14.5 -7.5M0 -12.5V-15" stroke={P.amber} strokeWidth="2" strokeLinecap="round" />
        </g>
      </>
    ),
  },
  apprentice: {
    tone: 'orange',
    art: (
      <>
        <Person x={29} y={26} s={1.25} shirt={P.orange} hat="helmet" />
        <Badge x={50} y={46} fill={P.blue} glyph="wrench" />
      </>
    ),
  },
  skillTraining: {
    tone: 'purple',
    art: (
      <>
        <path d="M18 30V40C18 44 25 47 32 47S46 44 46 40V30L32 36z" fill={P.purpleDark} />
        <path d="M32 14L60 26L32 38L4 26z" fill={P.purple} />
        <path d="M53 29V42" stroke={P.amber} strokeWidth="2" />
        <circle cx="53" cy="43.5" r="2.5" fill={P.amber} />
        <Badge x={14} y={48} fill={P.orange} glyph="wrench" />
      </>
    ),
  },
  placement: {
    tone: 'blue',
    art: (
      <>
        <Briefcase fill={P.brown} dark={P.brownDark} />
        <polygon points="46,4 60,10 46,16 32,10" fill={P.navy} />
        <path d="M39 13V17C39 19.5 53 19.5 53 17V13L46 16z" fill={P.slate} />
        <path d="M57 11.5V18" stroke={P.amber} strokeWidth="1.6" />
      </>
    ),
  },
  enterprise: {
    tone: 'purple',
    art: (
      <>
        <Briefcase fill={P.purple} dark={P.purpleDark} />
        <Badge x={50} y={14} r={9} fill={P.green} glyph="up" />
      </>
    ),
  },
  innovation: {
    tone: 'amber',
    art: (
      <>
        <path d="M6 22H10M54 22H58M11 8L14 11M53 8L50 11" stroke={P.amber} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M32 6C42 6 49 13 49 22C49 29 45 33 42 37V42H22V37C19 33 15 29 15 22C15 13 22 6 32 6z" fill={P.amber} />
        <path d="M23 18C24 13 27.5 10.5 32 10" stroke={WHITE} strokeWidth="2.4" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
        <path d="M27 30L30 34L32 30L34 34L37 30" stroke={P.amberDark} strokeWidth="1.8" fill="none" {...ROUND} />
        <rect x="22" y="42" width="20" height="4" rx="1" fill={P.gray} />
        <rect x="23" y="47" width="18" height="4" rx="1" fill={P.slate} />
        <rect x="27" y="52" width="10" height="4" rx="2" fill={P.navy} />
      </>
    ),
  },
  startupRocket: {
    tone: 'pink',
    art: (
      <g transform="rotate(40 32 32)">
        <path d="M24 34L15 43V49L24 44zM40 34L49 43V49L40 44z" fill={P.red} />
        <path d="M24 44C21 38 21 30 23 22C25 14 28 9 32 5C36 9 39 14 41 22C43 30 43 38 40 44z" fill={WHITE} stroke={P.steel} strokeWidth="1.5" />
        <circle cx="32" cy="22" r="5" fill={P.blue} stroke={P.steel} strokeWidth="1.5" />
        <rect x="26" y="44" width="12" height="4" rx="1.5" fill={P.navy} />
        <path d="M27 48C27 54 32 60 32 60S37 54 37 48z" fill={P.orange} />
        <path d="M29.5 48C29.5 52 32 56 32 56S34.5 52 34.5 48z" fill={P.amber} />
      </g>
    ),
  },
  artisan: {
    tone: 'orange',
    art: (
      <>
        <path d="M22 18H42V22C51 26 56 33 56 41C56 51 46 57 32 57S8 51 8 41C8 33 13 26 22 22z" fill={P.terracotta} />
        <rect x="19" y="12" width="26" height="7" rx="3.5" fill={P.brown} />
        <path d="M10 37H54" stroke={P.amberLight} strokeWidth="3" />
        <path d="M12 44L17 40L22 44L27 40L32 44L37 40L42 44L47 40L52 44" stroke={P.amberLight} strokeWidth="2" fill="none" {...ROUND} />
        <path d="M18 28C20 26 22 25 24 24.5" stroke={WHITE} strokeOpacity="0.5" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  artisanTools: {
    tone: 'orange',
    art: (
      <>
        <g transform="rotate(40 32 32)">
          <rect x="29.5" y="6" width="5" height="26" rx="1" fill={P.gray} />
          <path d="M29.5 6L32 2L34.5 6z" fill={P.gray} />
          <rect x="27.5" y="32" width="9" height="24" rx="3.5" fill={P.orange} />
        </g>
        <g transform="rotate(-40 32 32)">
          <rect x="29" y="18" width="6" height="40" rx="2.5" fill={P.brown} />
          <rect x="18" y="8" width="28" height="11" rx="2.5" fill={P.slate} />
        </g>
      </>
    ),
  },
  villageShop: {
    tone: 'green',
    art: (
      <>
        <rect x="10" y="9" width="44" height="9" rx="2" fill={P.green} />
        <rect x="18" y="12.5" width="28" height="2" rx="1" fill={WHITE} />
        <rect x="10" y="26" width="44" height="28" fill={P.amberLight} />
        <Awning x0={8} x1={56} y={18} h={7} a={P.green} b={WHITE} />
        <rect x="15" y="35" width="16" height="11" rx="1.5" fill={P.sky} />
        <rect x="36" y="34" width="13" height="20" rx="1.5" fill={P.brown} />
        <circle cx="46" cy="44" r="1.2" fill={P.amber} />
        <rect x="6" y="54" width="52" height="3" rx="1.5" fill={P.slate} />
      </>
    ),
  },
  streetCart: {
    tone: 'orange',
    art: (
      <>
        <path d="M11 18V32M43 18V32" stroke={P.slate} strokeWidth="2" />
        <Awning x0={7} x1={47} y={12} h={7} a={P.green} b={P.leaf} />
        <rect x="5" y="9" width="44" height="4" rx="2" fill={P.greenDark} />
        {[[15, P.red], [22, P.amber], [29, P.green], [36, P.orange], [42, P.red]].map(([cx, c], i) => (
          <circle key={i} cx={cx} cy="28" r="3.6" fill={c} />
        ))}
        <rect x="6" y="31" width="42" height="14" rx="2" fill={P.orange} />
        <path d="M48 36L60 30" stroke={P.brown} strokeWidth="3" strokeLinecap="round" />
        {[17, 37].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="50" r="6.5" fill={P.navy} />
            <circle cx={cx} cy="50" r="2.5" fill={P.gray} />
          </g>
        ))}
      </>
    ),
  },
  serviceCenter: {
    tone: 'blue',
    art: (
      <>
        <rect x="8" y="22" width="48" height="32" fill={P.blueLight} />
        <rect x="5" y="14" width="54" height="10" rx="2" fill={P.blue} />
        <rect x="12" y="17.5" width="22" height="3" rx="1.5" fill={WHITE} />
        <rect x="13" y="30" width="22" height="16" rx="1.5" fill={WHITE} />
        <rect x="17" y="33" width="14" height="9" rx="1" fill={P.navy} />
        <rect x="22" y="42" width="4" height="2.5" fill={P.slate} />
        <rect x="40" y="30" width="11" height="24" rx="1" fill={P.blueDark} />
        <circle cx="48" cy="43" r="1.2" fill={P.amber} />
        <rect x="4" y="54" width="56" height="3" rx="1.5" fill={P.slate} />
      </>
    ),
  },
  eLearning: {
    tone: 'purple',
    art: (
      <>
        <rect x="8" y="10" width="46" height="36" rx="4" fill={P.navy} />
        <rect x="12" y="14" width="38" height="28" rx="2" fill={P.purpleLight} />
        <circle cx="31" cy="28" r="9" fill={P.purple} />
        <path d="M28.5 23.5V32.5L36 28z" fill={WHITE} />
        <Badge x={50} y={48} fill={P.orange} glyph="star" />
      </>
    ),
  },
  midDayMeal: {
    tone: 'orange',
    art: (
      <>
        <circle cx="32" cy="33" r="24" fill={P.steel} />
        <circle cx="32" cy="33" r="19" fill={P.grayLight} />
        <ellipse cx="25" cy="39" rx="10" ry="7" fill={WHITE} />
        <circle cx="40" cy="24" r="6.5" fill={P.amberDark} />
        <circle cx="40" cy="24" r="5" fill={P.amber} />
        <circle cx="43" cy="39" r="5.5" fill={P.greenDark} />
        <circle cx="43" cy="39" r="4" fill={P.green} />
        <circle cx="24" cy="24" r="5" fill={P.orangeDark} />
        <circle cx="24" cy="24" r="3.6" fill={P.orange} />
      </>
    ),
  },
  threadSpool: {
    tone: 'purple',
    art: (
      <>
        <path d="M41 30C50 30 54 38 46 46" stroke={P.purple} strokeWidth="1.8" fill="none" />
        <rect x="19" y="14" width="22" height="36" fill={P.purple} />
        <path d="M19 20H41M19 26H41M19 32H41M19 38H41M19 44H41" stroke={P.purpleDark} strokeWidth="1.2" opacity="0.6" />
        <rect x="16" y="8" width="28" height="6" rx="2" fill={P.brown} />
        <rect x="16" y="50" width="28" height="6" rx="2" fill={P.brown} />
        <path d="M56 8L46 50" stroke={P.slate} strokeWidth="2.4" strokeLinecap="round" />
        <ellipse cx="55" cy="12" rx="1" ry="2.2" transform="rotate(14 55 12)" fill={WHITE} />
      </>
    ),
  },
  fabricLoom: {
    tone: 'pink',
    art: (
      <>
        <path d="M10 30H42L50 56H18z" fill={P.pinkLight} />
        <path d="M13 37H44M15 43H46M17 49H48" stroke={P.pink} strokeWidth="2" opacity="0.7" />
        <rect x="8" y="14" width="38" height="18" rx="3" fill={P.pink} />
        <path d="M16 14V32M24 14V32M32 14V32M40 14V32" stroke={WHITE} strokeWidth="1.4" opacity="0.45" />
        <ellipse cx="46" cy="23" rx="5" ry="9" fill={P.pinkDark} />
        <ellipse cx="46" cy="23" rx="2" ry="3.6" fill={P.pinkLight} />
        <Badge x={52} y={50} r={8.5} fill={P.amber} glyph="bolt" />
      </>
    ),
  },
  silkCocoon: {
    tone: 'amber',
    art: (
      <>
        <path d="M6 40C4 22 16 8 38 6C40 26 28 40 6 40z" fill={P.green} />
        <path d="M6 40L32 12M14 32L12 22M20 26L22 16M22 30L32 28" stroke={P.greenDark} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M46 36C52 30 58 28 58 20" stroke={P.amber} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <ellipse cx="38" cy="44" rx="11" ry="7.5" transform="rotate(-20 38 44)" fill={P.amberLight} stroke={P.amber} strokeWidth="1.6" />
        <ellipse cx="50" cy="53" rx="9" ry="6" transform="rotate(12 50 53)" fill={P.amberLight} stroke={P.amber} strokeWidth="1.6" />
        <path d="M31 46C35 43 40 41 44 41M45 53C48 51 52 51 55 52" stroke={P.amber} strokeWidth="1.2" fill="none" />
      </>
    ),
  },

  /* Animals & fisheries */
  milkCan: {
    tone: 'blue',
    art: (
      <>
        <rect x="25" y="6" width="14" height="5" rx="2" fill={P.slate} />
        <rect x="27" y="11" width="10" height="6" fill={P.gray} />
        <path d="M24 17H40L45 25H19z" fill={P.gray} />
        <path d="M19 30C13 30 12 38 17 39M45 30C51 30 52 38 47 39" stroke={P.slate} strokeWidth="2.4" fill="none" />
        <path d="M19 25H45V52a5 5 0 0 1 -5 5H24a5 5 0 0 1 -5 -5z" fill={P.steel} />
        <rect x="19" y="35" width="26" height="8" fill={P.blue} />
        <rect x="23" y="27" width="3.5" height="27" rx="1.75" fill={WHITE} opacity="0.7" />
        <Badge x={47} y={50} r={9} fill={P.blue} glyph="drop" />
      </>
    ),
  },
  milkPack: {
    tone: 'blue',
    art: (
      <>
        <path d="M24 15H34V21C40 25 42 29 42 35V55a3 3 0 0 1 -3 3H19a3 3 0 0 1 -3 -3V35C16 29 18 25 24 21z" fill={WHITE} stroke={P.steel} strokeWidth="1.5" />
        <rect x="23" y="9" width="12" height="7" rx="1.5" fill={P.blue} />
        <rect x="16" y="35" width="26" height="13" fill={P.blue} />
        <g transform="translate(29 41.5)">{GLYPHS.drop()}</g>
        <path d="M44 34H58L56 56H46z" fill={WHITE} stroke={P.steel} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M44.6 40H57.4" stroke={P.steel} strokeWidth="1.2" />
      </>
    ),
  },
  dairyPlant: {
    tone: 'blue',
    art: (
      <>
        <rect x="34" y="14" width="22" height="40" rx="4" fill={P.steel} />
        <path d="M34 18a11 6 0 0 1 22 0z" fill={P.gray} />
        <rect x="38" y="17" width="3" height="35" rx="1.5" fill={WHITE} opacity="0.7" />
        <Drop x={46} y={35} s={1.1} fill={P.blue} />
        <rect x="30" y="40" width="6" height="3" fill={P.gray} />
        <path d="M6 54V32L20 24L34 32V54z" fill={P.blue} />
        <rect x="11" y="35" width="8" height="7" rx="1" fill={WHITE} />
        <rect x="22" y="35" width="8" height="7" rx="1" fill={WHITE} />
        <rect x="16" y="46" width="8" height="8" fill={P.blueDark} />
        <rect x="4" y="54" width="56" height="3" rx="1.5" fill={P.slate} />
      </>
    ),
  },
  cow: {
    tone: 'amber',
    art: (
      <>
        <path d="M21 16C19 10 15 8 10 9M43 16C45 10 49 8 54 9" stroke="#e9dcc4" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="11" cy="25" rx="8" ry="4" transform="rotate(-20 11 25)" fill={P.brownLight} />
        <ellipse cx="53" cy="25" rx="8" ry="4" transform="rotate(20 53 25)" fill={P.brownLight} />
        <path d="M20 14H44C48 14 50 18 49 24L46 44H18L15 24C14 18 16 14 20 14z" fill="#fff7ee" />
        <path d="M20 14H31C30 20 26 24 18 26L15.6 22C15.8 17 17 14 20 14z" fill={P.brownLight} />
        <circle cx="24" cy="29" r="2.5" fill={P.navy} />
        <circle cx="40" cy="29" r="2.5" fill={P.navy} />
        <ellipse cx="32" cy="46" rx="14" ry="10" fill="#f4b6a8" />
        <ellipse cx="27" cy="46" rx="2.2" ry="3" fill={P.navy} opacity="0.75" />
        <ellipse cx="37" cy="46" rx="2.2" ry="3" fill={P.navy} opacity="0.75" />
      </>
    ),
  },
  livestock: {
    tone: 'orange',
    art: (
      <>
        <path d="M49 31C53 28 55 29 54 32" stroke={P.brown} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {[22, 28, 40, 45].map((x, i) => <rect key={x} x={x} y={i === 0 || i === 3 ? 42 : 43} width="3.6" height={i === 0 || i === 3 ? 13 : 12} rx="1.5" fill={P.brown} />)}
        <ellipse cx="35" cy="36" rx="16" ry="10" fill={P.brownLight} />
        <path d="M22 33L14 22C12 19 13 15 17 15C20 15 23 17 24 20L29 30z" fill={P.brownLight} />
        <ellipse cx="13" cy="21" rx="4.5" ry="2" transform="rotate(30 13 21)" fill={P.brown} />
        <path d="M18 16C18 10 22 8 26 9" stroke={P.slate} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <circle cx="19" cy="19.5" r="1.3" fill={P.navy} />
        <path d="M15 24L13.5 30L17 26.5z" fill={P.brown} />
        <path d="M4 56H60" stroke={P.green} strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  vetVaccine: {
    tone: 'purple',
    art: (
      <>
        <g transform="rotate(-45 30 32)">
          <rect x="28" y="7" width="4" height="9" fill={P.slate} />
          <rect x="24" y="5" width="12" height="3" rx="1.5" fill={P.slate} />
          <rect x="24" y="16" width="12" height="28" rx="2" fill={WHITE} stroke={P.slate} strokeWidth="1.5" />
          <rect x="26" y="28" width="8" height="14" rx="1" fill={P.purple} />
          <path d="M26 21H30M26 25H30" stroke={P.slate} strokeWidth="1.2" />
          <rect x="29" y="44" width="2" height="12" fill={P.slate} />
        </g>
        <Badge x={48} y={48} r={11} fill={P.red} glyph="cross" />
      </>
    ),
  },
  vetVan: {
    tone: 'teal',
    art: (
      <>
        <path d="M4 20a4 4 0 0 1 4 -4H38V44H4z" fill={WHITE} stroke={P.steel} strokeWidth="1.5" />
        <path d="M38 22H48L58 32V44H38z" fill={P.teal} />
        <path d="M41 25H47L54 32H41z" fill={P.tealLight} />
        <path d="M18.5 23H23.5V28H28.5V33H23.5V38H18.5V33H13.5V28H18.5z" fill={P.red} />
        <rect x="4" y="42" width="54" height="4" rx="1" fill={P.navy} />
        {[14, 48].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="47" r="5.5" fill={P.navy} />
            <circle cx={cx} cy="47" r="2.2" fill={P.gray} />
          </g>
        ))}
      </>
    ),
  },
  fish: {
    tone: 'teal',
    art: (
      <>
        <circle cx="50" cy="14" r="2.6" fill="none" stroke={P.sky} strokeWidth="1.6" />
        <circle cx="55" cy="7" r="1.8" fill="none" stroke={P.sky} strokeWidth="1.6" />
        <path d="M44 32L58 22L55 32L58 42z" fill={P.tealDark} />
        <path d="M24 23C28 16 35 16 37 22z" fill={P.tealDark} />
        <path d="M6 32C14 20 34 18 46 32C34 46 14 44 6 32z" fill={P.teal} />
        <path d="M18 24C16 28 16 36 18 40" stroke={P.tealDark} strokeWidth="1.6" fill="none" />
        <circle cx="13" cy="30" r="2.6" fill={WHITE} />
        <circle cx="13" cy="30" r="1.2" fill={P.navy} />
        <path d="M2 54Q10 50 18 54T34 54T50 54T66 54" stroke={P.blue} strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  fishBoat: {
    tone: 'blue',
    art: (
      <>
        <path d="M44 8V36" stroke={P.brown} strokeWidth="2.5" />
        <polygon points="44,8 56,13 44,18" fill={P.amber} />
        <path d="M44 14L30 28M44 20L34 28" stroke={P.gray} strokeWidth="1.2" />
        <rect x="18" y="24" width="16" height="12" rx="1.5" fill={P.amberLight} />
        <rect x="21" y="27" width="5" height="4" fill={P.sky} />
        <path d="M6 36H58L50 48H14z" fill={P.red} />
        <path d="M8.7 40H55.3" stroke={WHITE} strokeWidth="2" opacity="0.6" />
        <path d="M0 50Q8 46 16 50T32 50T48 50T64 50V64H0z" fill={P.blue} />
      </>
    ),
  },

  /* Housing, land & villages */
  ruralHouse: {
    tone: 'orange',
    art: (
      <>
        <rect x="12" y="30" width="40" height="24" fill={P.amberLight} />
        <polygon points="6,32 32,10 58,32" fill={P.terracotta} />
        <path d="M6 32L32 10L58 32" stroke={P.brown} strokeWidth="2.5" fill="none" strokeLinejoin="round" />
        <rect x="27" y="38" width="10" height="16" fill={P.brown} />
        <rect x="16" y="36" width="8" height="8" fill={P.sky} />
        <rect x="40" y="36" width="8" height="8" fill={P.sky} />
        <rect x="4" y="54" width="56" height="3" rx="1.5" fill={P.slate} />
      </>
    ),
  },
  shovelWork: {
    tone: 'amber',
    art: (
      <>
        <path d="M2 57C8 45 18 41 28 41S46 47 50 57z" fill={P.soil} />
        <path d="M10 50C14 46 19 44 24 44" stroke={P.brownLight} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <g transform="rotate(18 41 30)">
          <rect x="38.5" y="5" width="5" height="28" rx="2" fill={P.brown} />
          <rect x="34.5" y="2" width="13" height="5" rx="2.5" fill={P.brownDark} />
          <path d="M33 32H49V40C49 46 45 50 41 52C37 50 33 46 33 40z" fill={P.gray} />
          <path d="M36 35V41C36 44 38 46.5 40 48" stroke={WHITE} strokeOpacity="0.6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
        <Badge x={14} y={16} fill={P.green} glyph="rupee" />
      </>
    ),
  },
  urbanHousing: {
    tone: 'blue',
    art: (
      <>
        <rect x="8" y="10" width="24" height="46" rx="2" fill={P.blue} />
        {[15, 22, 29, 36, 43].map((y) => [12, 18, 24].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="0.6" fill={WHITE} />))}
        <rect x="32" y="24" width="24" height="32" rx="2" fill={P.sky} />
        {[29, 36, 43].map((y) => [36, 42, 48].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="0.6" fill={WHITE} />))}
        <rect x="41" y="49" width="6" height="7" fill={P.blueDark} />
        <rect x="4" y="55" width="56" height="3" rx="1.5" fill={P.slate} />
      </>
    ),
  },
  tribalVillage: {
    tone: 'amber',
    art: (
      <>
        <ellipse cx="32" cy="55" rx="28" ry="4" fill={P.greenLight} />
        <rect x="50" y="34" width="4" height="21" fill={P.brown} />
        <circle cx="52" cy="26" r="9" fill={P.green} />
        <circle cx="46" cy="31" r="6" fill={P.leaf} />
        <rect x="14" y="34" width="26" height="20" fill={P.brownLight} />
        <polygon points="8,36 27,15 46,36" fill={P.amberDark} />
        <path d="M14 30L20 36M20 23L32 36M27 16V36M34 23L22 36M40 30L34 36" stroke={P.amber} strokeWidth="1.2" opacity="0.8" />
        <path d="M22 54V45a5 5 0 0 1 10 0V54z" fill={P.brown} />
      </>
    ),
  },
  propertyCard: {
    tone: 'orange',
    art: (
      <>
        <rect x="6" y="12" width="52" height="38" rx="4" fill={WHITE} stroke={P.steel} strokeWidth="1.5" />
        <path d="M6 16a4 4 0 0 1 4 -4H54a4 4 0 0 1 4 4V20H6z" fill={P.orange} />
        <rect x="13" y="34" width="16" height="10" fill={P.orangeLight} />
        <polygon points="10,35 21,26 32,35" fill={P.orange} />
        <rect x="19" y="38" width="4" height="6" fill={P.brown} />
        <Lines x={36} y={27} widths={[16, 12, 14]} />
        <Badge x={51} y={50} r={8.5} fill={P.red} glyph="pin" />
      </>
    ),
  },
  panchayat: {
    tone: 'orange',
    art: (
      <>
        <rect x="31.2" y="4" width="1.6" height="12" fill={P.slate} />
        <rect x="32.8" y="4" width="10" height="2.4" fill="#ff9933" />
        <rect x="32.8" y="6.4" width="10" height="2.4" fill={WHITE} />
        <rect x="32.8" y="8.8" width="10" height="2.4" fill="#138808" />
        <rect x="8" y="34" width="48" height="16" fill={P.amberLight} />
        <polygon points="4,30 32,15 60,30" fill={P.orange} />
        <rect x="8" y="30" width="48" height="4" fill={P.orangeDark} />
        {[12, 21, 39, 48].map((x) => <rect key={x} x={x} y="34" width="4" height="16" fill={WHITE} />)}
        <path d="M27 50V42a5 5 0 0 1 10 0V50z" fill={P.brown} />
        <rect x="6" y="50" width="52" height="3" fill={P.gray} />
        <rect x="4" y="53" width="56" height="3" rx="1" fill={P.slate} />
      </>
    ),
  },
  districtMap: {
    tone: 'green',
    art: (
      <>
        <path d="M6 14L22 9L38 14L56 9V50L38 55L22 50L6 55z" fill="#e8f6ee" stroke={P.green} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M22 9V50L38 55V14z" fill={P.greenLight} />
        <path d="M10 42C16 36 20 44 26 38S36 32 42 36" stroke={P.green} strokeWidth="2" fill="none" strokeDasharray="3 3" />
        <path d="M30 12a9 9 0 0 1 9 9c0 7 -9 15 -9 15s-9 -8 -9 -15a9 9 0 0 1 9 -9z" fill={P.red} />
        <circle cx="30" cy="21" r="3.5" fill={WHITE} />
        <Badge x={49} y={47} fill={P.amber} glyph="up" />
      </>
    ),
  },
  industrialLand: {
    tone: 'green',
    art: (
      <>
        <path d="M4 42L30 30L60 42L34 54z" fill={P.greenLight} stroke={P.green} strokeWidth="1.6" strokeDasharray="4 3" strokeLinejoin="round" />
        <path d="M17 36L47 48M30 30L34 54" stroke={P.green} strokeWidth="1" opacity="0.5" />
        <ellipse cx="32" cy="42" rx="5" ry="2" fill={P.greenDark} opacity="0.3" />
        <path d="M32 8a12 12 0 0 1 12 12c0 9 -12 21 -12 21s-12 -12 -12 -21a12 12 0 0 1 12 -12z" fill={P.red} />
        <circle cx="32" cy="20" r="5" fill={WHITE} />
      </>
    ),
  },
  landSurvey: {
    tone: 'amber',
    art: (
      <>
        <path d="M4 50L22 42L60 50L40 58z" fill={P.greenLight} stroke={P.green} strokeWidth="1.4" strokeDasharray="3 2.5" strokeLinejoin="round" />
        <path d="M32 30L20 54M32 30L32 56M32 30L44 54" stroke={P.brown} strokeWidth="3" strokeLinecap="round" />
        <rect x="27" y="27" width="10" height="4" fill={P.slate} />
        <rect x="24" y="15" width="16" height="12" rx="2.5" fill={P.amber} />
        <rect x="28" y="11" width="8" height="4" rx="1" fill={P.amberDark} />
        <rect x="38" y="18" width="8" height="6" rx="1.5" fill={P.navy} />
        <circle cx="46" cy="21" r="2.8" fill={P.sky} stroke={P.navy} strokeWidth="1.2" />
      </>
    ),
  },
  ruralInfra: {
    tone: 'teal',
    art: (
      <>
        <path d="M0 52Q8 48 16 52T32 52T48 52T64 52V62H0z" fill={P.sky} />
        <path d="M6 30H58V54H50V46A18 18 0 0 0 14 46V54H6z" fill={P.gray} />
        <path d="M6 18H58M10 18V26M20 18V26M32 18V26M44 18V26M54 18V26" stroke={P.slate} strokeWidth="2" strokeLinecap="round" />
        <rect x="2" y="25" width="60" height="6" rx="1" fill={P.slate} />
        <path d="M8 28H56" stroke={WHITE} strokeWidth="1.2" strokeDasharray="4 3" />
      </>
    ),
  },
  industrialCorridor: {
    tone: 'blue',
    art: (
      <>
        <rect x="22" y="16" width="5" height="30" fill={P.blueDark} />
        <path d="M4 46V30L13 24V30L22 24V46z" fill={P.blue} />
        <rect x="52" y="10" width="5" height="36" fill={P.blue} />
        <path d="M30 46V26L41 20V26L52 20V46z" fill={P.sky} />
        {[[8, 34], [15, 34], [35, 32], [43, 32]].map(([x, y]) => <rect key={x} x={x} y={y} width="4.5" height="5" rx="0.8" fill={WHITE} />)}
        <rect x="2" y="46" width="60" height="10" rx="2" fill={P.slate} />
        <path d="M6 51H58" stroke={WHITE} strokeWidth="1.6" strokeDasharray="5 4" />
      </>
    ),
  },
  agriTourism: {
    tone: 'green',
    art: (
      <>
        <Sun x={48} y={14} r={7} />
        <path d="M2 46C14 34 26 34 38 42C46 36 54 36 62 40V58H2z" fill={P.leaf} />
        <path d="M2 52C18 46 40 46 62 52V58H2z" fill={P.green} />
        <rect x="14" y="34" width="14" height="12" fill={P.amberLight} />
        <polygon points="11,35 21,26 31,35" fill={P.terracotta} />
        <rect x="18.5" y="39" width="5" height="7" fill={P.brown} />
        <rect x="41" y="36" width="3" height="10" fill={P.brown} />
        <circle cx="42.5" cy="32" r="6" fill={P.greenDark} />
      </>
    ),
  },

  /* Health, herbs & nutrition */
  medicinalPlant: {
    tone: 'green',
    art: (
      <>
        <path d="M32 38V14" stroke={P.greenDark} strokeWidth="2.4" strokeLinecap="round" />
        <Leaf x={32} y={33} s={1.1} r={-150} fill={P.green} />
        <Leaf x={32} y={31} s={1.1} r={-30} fill={P.leaf} />
        <Leaf x={32} y={23} s={0.9} r={-155} fill={P.leaf} />
        <Leaf x={32} y={21} s={0.9} r={-25} fill={P.green} />
        <Leaf x={32} y={15} s={0.65} r={-90} fill={P.green} />
        <path d="M18 40H46L42 58H22z" fill={P.terracotta} />
        <rect x="16" y="36" width="32" height="6" rx="2" fill={P.brown} />
        <Badge x={51} y={48} r={9} fill={P.green} glyph="cross" />
      </>
    ),
  },
  ayurveda: {
    tone: 'amber',
    art: (
      <>
        <path d="M38 34L52 8" stroke={P.brown} strokeWidth="6" strokeLinecap="round" />
        <Leaf x={16} y={28} s={1} r={-70} fill={P.green} />
        <Leaf x={18} y={29} s={0.9} r={-125} fill={P.leaf} />
        <path d="M8 32H56C56 45 46 53 32 53S8 45 8 32z" fill={P.brownLight} />
        <rect x="6" y="29" width="52" height="6" rx="3" fill={P.brown} />
        <rect x="22" y="52" width="20" height="5" rx="2" fill={P.brown} />
        <path d="M16 40C19 45 24 47 28 47.5" stroke={WHITE} strokeOpacity="0.45" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </>
    ),
  },

  /* Digital & data */
  aiChip: {
    tone: 'purple',
    art: (
      <>
        {[22, 28, 34, 40].map((c) => (
          <g key={c} fill={P.slate}>
            <rect x={c - 1.2} y="10" width="2.4" height="7" rx="1" />
            <rect x={c - 1.2} y="47" width="2.4" height="7" rx="1" />
            <rect x="10" y={c - 1.2} width="7" height="2.4" rx="1" />
            <rect x="47" y={c - 1.2} width="7" height="2.4" rx="1" />
          </g>
        ))}
        <rect x="16" y="16" width="32" height="32" rx="5" fill={P.purple} />
        <rect x="22" y="22" width="20" height="20" rx="3" fill={P.purpleDark} />
        <g transform="translate(32 32) scale(1.35)">{GLYPHS.leaf(P.purpleDark)}</g>
      </>
    ),
  },
  dataLock: {
    tone: 'teal',
    art: (
      <>
        <path d="M12 14V46a18 6 0 0 0 36 0V14" fill={P.teal} />
        <path d="M12 25a18 6 0 0 0 36 0M12 36a18 6 0 0 0 36 0" stroke={P.tealLight} strokeWidth="2" fill="none" />
        <ellipse cx="30" cy="14" rx="18" ry="6" fill={P.tealLight} />
        <Badge x={48} y={47} r={11} fill={P.navy} glyph="lock" />
      </>
    ),
  },
  wifi: {
    tone: 'blue',
    art: (
      <>
        <path d="M15.1 23.9A22 22 0 0 1 48.9 23.9" stroke={P.sky} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M20.5 28.4A15 15 0 0 1 43.5 28.4" stroke={P.blue} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M25.9 32.9A8 8 0 0 1 38.1 32.9" stroke={P.blueDark} strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="32" cy="38" r="2.6" fill={P.blueDark} />
        <rect x="10" y="44" width="44" height="12" rx="4" fill={P.blue} />
        <circle cx="18" cy="50" r="1.8" fill={P.green} />
        <circle cx="24" cy="50" r="1.8" fill={P.amber} />
        <rect x="34" y="49" width="14" height="2.2" rx="1.1" fill={P.blueLight} />
      </>
    ),
  },
  fibreOptic: {
    tone: 'purple',
    art: (
      <>
        {[
          ['M6 58C16 50 26 34 40 16', P.blue, [40, 16]],
          ['M10 58C20 50 32 38 46 24', P.teal, [46, 24]],
          ['M14 58C24 52 36 42 51 33', P.purple, [51, 33]],
          ['M18 58C28 54 40 47 54 43', P.amber, [54, 43]],
        ].map(([d, c, [x, y]]) => (
          <g key={c}>
            <path d={d} stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <circle cx={x} cy={y} r="5" fill={P.amberLight} />
            <circle cx={x} cy={y} r="2.2" fill={WHITE} />
          </g>
        ))}
        <rect x="-4" y="-6" width="18" height="12" rx="3" transform="translate(9 56) rotate(-38)" fill={P.slate} />
      </>
    ),
  },

  /* Environment */
  carbonCredit: {
    tone: 'teal',
    art: (
      <>
        <path d="M16 44C9 44 6 39 6 34.5C6 29 10.5 25.5 15.5 26C17 18 23.5 13 31 13C39 13 45 18.5 46.5 25.5C53 25.5 58 30 58 36C58 41 54 44 49 44z" fill="#b9c7da" />
        <text x="31" y="37" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="Inter, Arial, sans-serif" fill={P.navy}>CO₂</text>
        <Badge x={49} y={48} fill={P.green} glyph="leaf" />
      </>
    ),
  },
  euCbam: {
    tone: 'blue',
    art: (
      <>
        <Doc />
        <text x="27" y="32" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="Inter, Arial, sans-serif" fill={P.slate}>CO₂</text>
        <Lines x={17} y={38} widths={[22, 14]} />
        <Badge x={45} y={46} r={11} fill={P.blue} glyph="globe" />
      </>
    ),
  },
  treePlanting: {
    tone: 'green',
    art: (
      <>
        <ellipse cx="30" cy="55" rx="20" ry="4" fill={P.brownLight} />
        <rect x="27" y="34" width="6" height="21" rx="2" fill={P.brown} />
        <circle cx="30" cy="22" r="14" fill={P.green} />
        <circle cx="20" cy="30" r="9" fill={P.leaf} />
        <circle cx="40" cy="30" r="9" fill={P.greenDark} />
        <Badge x={50} y={48} fill={P.amber} glyph="rupee" />
      </>
    ),
  },
  forestProduce: {
    tone: 'green',
    art: (
      <>
        <Leaf x={16} y={31} s={1.1} r={-140} fill={P.green} />
        <Leaf x={46} y={31} s={1.1} r={-40} fill={P.leaf} />
        <circle cx="24" cy="27" r="6" fill={P.amber} />
        <circle cx="34" cy="25" r="6.5" fill={P.orange} />
        <circle cx="43" cy="28" r="5" fill={P.red} />
        <path d="M10 34H54L48 56H16z" fill={P.brownLight} />
        <path d="M12 41H52M14 48H50M22 34L24 56M32 34V56M42 34L40 56" stroke={P.brown} strokeWidth="1.4" />
        <rect x="8" y="30" width="48" height="6" rx="3" fill={P.brown} />
      </>
    ),
  },
};

export const DEFAULT_ICON = 'cropGrowth';

export const hasIcon = (name) => Object.hasOwn(ICONS, name);

export const iconTone = (name) => (ICONS[name] ?? ICONS[DEFAULT_ICON]).tone;

export function SchemeIcon({ name, className }) {
  const icon = ICONS[name] ?? ICONS[DEFAULT_ICON];
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {icon.art}
    </svg>
  );
}
