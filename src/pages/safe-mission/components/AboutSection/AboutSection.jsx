import React from 'react';
import './AboutSection.css';

// 3 Suited Images selected from Downloads (p1 to p10)
import smartFarmImg from '../../assets/about/about-smart-farm.png'; // from p4.png (Crops & Smart Farming)
import shipImg from '../../assets/about/about-ship.png';             // from p10.png (Cargo Ship & Export Logistics)
import farmersImg from '../../assets/about/about-farmers.png';       // from p5.png (Prosperous Farming Community)

/*
  Pointy-top hexagon with softly rounded corners.
  `t` is how much of each side is used for the corner curve.
*/
function hexPath(x, y, w, h, t = 0.1) {
  const v = [
    [x + w / 2, y],
    [x + w, y + h / 4],
    [x + w, y + (h * 3) / 4],
    [x + w / 2, y + h],
    [x, y + (h * 3) / 4],
    [x, y + h / 4],
  ];
  const r = (n) => Math.round(n * 10000) / 10000;
  return (
    v
      .map((p, i) => {
        const prev = v[(i + 5) % 6];
        const next = v[(i + 1) % 6];
        const a = [p[0] + (prev[0] - p[0]) * t, p[1] + (prev[1] - p[1]) * t];
        const b = [p[0] + (next[0] - p[0]) * t, p[1] + (next[1] - p[1]) * t];
        return `${i === 0 ? 'M' : 'L'}${r(a[0])} ${r(a[1])} Q${r(p[0])} ${r(p[1])} ${r(b[0])} ${r(b[1])}`;
      })
      .join(' ') + ' Z'
  );
}

// Clip shape for the photo frames (objectBoundingBox units)
const HEX_CLIP = hexPath(0, 0, 1, 1, 0.08);

/*
  Right-hand stage is drawn in its own units: 424 x 426.
  [left, top, width, height] for each photo frame.
*/
const FRAMES = [
  { key: 'big', img: farmersImg, alt: 'Prosperous Farming Community', box: [96, 22, 284, 328], pad: 6.5, imgClass: 'main-crop-img' },
  { key: 'top', img: smartFarmImg, alt: 'S.A.F.E. Mission Smart Multi-Layer Farming', box: [3, 33, 129, 149], pad: 5 },
  { key: 'bottom', img: shipImg, alt: 'S.A.F.E. Mission Global Farm Exports Ship', box: [10, 197, 129, 149], pad: 5 },
];

// Colour block behind the photos: left edge x=69, top-right and bottom-left edges at 30°
const COLOR_PLANE = '69,-146 1100,449 1100,700 722,700 69,323';

function DotGrid({ x, y, cols, rows, gap = 9.5, r = 1.6 }) {
  const dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push(<circle key={`${row}-${col}`} cx={x + col * gap} cy={y + row * gap} r={r} />);
    }
  }
  return <g fill="#c3ccd4">{dots}</g>;
}

function ValueCard({ variant, title, copy, icon }) {
  return (
    <div className={`about-value-card ${variant}`}>
      {/* Elongated hexagon panel: border layer + fill layer */}
      <svg className="about-card-panel" viewBox="0 0 300 140" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`aboutPanelFill-${variant}`} x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" className="panel-fill-a" />
            <stop offset="100%" className="panel-fill-b" />
          </linearGradient>
        </defs>
        <polygon className="panel-border" points="28,0 272,0 300,70 272,140 28,140 0,70" />
        <polygon
          className="panel-fill"
          points="28,0 272,0 300,70 272,140 28,140 0,70"
          fill={`url(#aboutPanelFill-${variant})`}
          stroke={`url(#aboutPanelFill-${variant})`}
        />
      </svg>

      {/* Hexagon icon badge */}
      <div className="about-card-icon" aria-hidden="true">
        <svg className="about-icon-hex" viewBox="0 0 100 110">
          <defs>
            <linearGradient id={`aboutIconHex-${variant}`} x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" className="icon-hex-a" />
              <stop offset="100%" className="icon-hex-b" />
            </linearGradient>
          </defs>
          <path d={hexPath(6, 4, 88, 102, 0.16)} fill={`url(#aboutIconHex-${variant})`} />
          <path d={hexPath(12, 11, 76, 88, 0.16)} fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="2" />
        </svg>
        {icon}
      </div>

      {/* Small faint hexagon under the icon */}
      <svg className="about-card-mini-hex" viewBox="0 0 24 27" aria-hidden="true">
        <path d={hexPath(0, 0, 24, 27, 0.16)} />
      </svg>

      <div className="about-card-body">
        <h4 className="about-card-heading">{title}</h4>
        <span className="about-card-line" aria-hidden="true" />
        <p className="about-card-copy">{copy}</p>
      </div>
    </div>
  );
}

const VisionIcon = (
  <svg className="about-card-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.6v2.3M6.4 4.4l1.3 1.9M17.6 4.4l-1.3 1.9" />
    <path d="M2.4 13.6c2.4-3.7 5.6-5.6 9.6-5.6s7.2 1.9 9.6 5.6c-2.4 3.7-5.6 5.6-9.6 5.6s-7.2-1.9-9.6-5.6z" />
    <circle cx="12" cy="13.6" r="3" fill="currentColor" stroke="none" />
  </svg>
);

const MissionIcon = (
  <svg className="about-card-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="13" r="8.6" />
    <circle cx="11" cy="13" r="5.1" />
    <circle cx="11" cy="13" r="1.7" fill="currentColor" stroke="none" />
    <path d="M11 13l9-9" />
    <path d="M16.4 3.6l.1 3.9 3.9.1" />
  </svg>
);

export default function AboutSection() {
  return (
    <section className="about-section" id="sm-about">
      {/* Subtle Top Border Glow / Transition */}
      <div className="about-top-accent"></div>

      {/* Shared clip shape for the hexagon photo frames */}
      <svg className="about-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="aboutHexClip" clipPathUnits="objectBoundingBox">
            <path d={HEX_CLIP} />
          </clipPath>
        </defs>
      </svg>

      <div className="about-container">
        {/* Left Column: Typography, Content & Cards */}
        <div className="about-content-col">
          {/* Dual-color Accent Dashes */}
          <div className="about-accent-badge" aria-hidden="true">
            <span className="accent-pill-orange"></span>
            <span className="accent-pill-green"></span>
          </div>

          {/* Main Title */}
          <h2 className="about-title">
            About <span className="title-green">SAFE Mission</span>
          </h2>

          {/* Subtitle */}
          <h3 className="about-subtitle">
            <span className="subtitle-brand">S.A.F.E.</span> – Sustainable Agriculture for Farm Exports
          </h3>

          {/* Body Paragraph */}
          <p className="about-desc">
            The S.A.F.E. Mission is a scalable initiative which aims to make farming more efficient and precisely export-oriented through the concept of <strong className="desc-highlight">“multi-layer farming with value addition”</strong>. By multiplying farmers’ incomes and creating global market opportunities, the mission ultimately transforms farmers into successful agripreneurs.
          </p>

          {/* Value Cards: Vision & Mission */}
          <div className="about-cards-row">
            {/* Faint hexagon + diagonal band behind the Vision card */}
            <svg className="about-cards-decor" viewBox="0 0 140 200" aria-hidden="true">
              <polygon points="0,18 38,18 140,200 102,200" fill="#e4f2e2" opacity="0.75" />
              <path d="M36 0 L58 0 L70 19 L58 38 L36 38 L24 19 Z" fill="#d3eacf" opacity="0.85" />
            </svg>

            <ValueCard
              variant="vision"
              title="VISION"
              icon={VisionIcon}
              copy="Build a prosperous farming community through sustainable agriculture, cooperative ownership and global market opportunities."
            />
            <ValueCard
              variant="mission"
              title="MISSION"
              icon={MissionIcon}
              copy="Transform fragmented production into an integrated, sustainable, value-added and export-oriented district agricultural ecosystem."
            />
          </div>
        </div>

        {/* Right Column: Hexagonal Image Cluster & Graphic Backdrop */}
        <div className="about-visual-col">
          <div className="about-stage">
            {/* Backdrop: colour planes, dot grids and decorative hexagons */}
            <svg className="visual-backdrop-svg" viewBox="0 0 424 426" aria-hidden="true">
              <defs>
                <linearGradient id="aboutPlaneBase" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="426">
                  <stop offset="0%" stopColor="#168fcd" />
                  <stop offset="28%" stopColor="#17a2b2" />
                  <stop offset="55%" stopColor="#23aa64" />
                  <stop offset="80%" stopColor="#3eb24a" />
                  <stop offset="100%" stopColor="#6fbf42" />
                </linearGradient>
                <radialGradient id="aboutPlaneLime" gradientUnits="userSpaceOnUse" cx="430" cy="410" r="190">
                  <stop offset="0%" stopColor="#e2e52b" />
                  <stop offset="55%" stopColor="#b9d838" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#b9d838" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="aboutPlaneCyan" gradientUnits="userSpaceOnUse" cx="430" cy="140" r="140">
                  <stop offset="0%" stopColor="#30c6ea" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#30c6ea" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="aboutPlaneBlue" gradientUnits="userSpaceOnUse" cx="250" cy="-10" r="150">
                  <stop offset="0%" stopColor="#1478cc" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#1478cc" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="aboutPlaneGreen" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="323">
                  <stop offset="0%" stopColor="#2f9f50" />
                  <stop offset="100%" stopColor="#23904a" />
                </linearGradient>
                <linearGradient id="aboutStripeDark" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#228a43" />
                  <stop offset="100%" stopColor="#11612f" />
                </linearGradient>
                <radialGradient id="aboutWashMint">
                  <stop offset="0%" stopColor="#c8ecee" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#c8ecee" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="aboutHexOrange" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbab3c" />
                  <stop offset="100%" stopColor="#f07818" />
                </linearGradient>
                <linearGradient id="aboutHexGreen" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5cbf4c" />
                  <stop offset="100%" stopColor="#24873f" />
                </linearGradient>
                <linearGradient id="aboutHexDeep" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4cb04d" />
                  <stop offset="100%" stopColor="#176a33" />
                </linearGradient>
              </defs>

              {/* Main colour plane (hexagon edges at 30°) */}
              {['Base', 'Blue', 'Cyan', 'Lime'].map((layer) => (
                <polygon key={layer} points={COLOR_PLANE} fill={`url(#aboutPlane${layer})`} />
              ))}

              {/* Green vertical plane on the left of the colour block */}
              <polygon points="69,-400 135,-400 135,285 69,323" fill="url(#aboutPlaneGreen)" />

              {/* Ghost hexagon inside the colour block */}
              <path d={hexPath(132, 12, 72, 63, 0.14)} fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.4" />

              {/* Dark green stripe and mint wash at the bottom */}
              <polygon points="90,355 600,649 600,679 90,385" fill="url(#aboutStripeDark)" />
              <ellipse cx="70" cy="440" rx="150" ry="70" fill="url(#aboutWashMint)" />

              {/* Dot grids */}
              <DotGrid x={349} y={29} cols={8} rows={5} />
              <DotGrid x={26} y={352} cols={7} rows={4} />

              {/* Decorative hexagons behind the photos */}
              <path d={hexPath(8, 18, 28, 32, 0.14)} fill="#ffffff" fillOpacity="0.6" stroke="#93cf95" strokeWidth="1.6" />
              <path d={hexPath(41, 19, 14, 16, 0.14)} fill="none" stroke="#c9d3da" strokeWidth="1.2" />
              <path d={hexPath(-28, 68, 22, 25, 0.16)} fill="url(#aboutHexOrange)" />
              <path d={hexPath(26, 177, 28, 31, 0.16)} fill="url(#aboutHexGreen)" />
            </svg>

            {/* 3 Photo Frames (Honeycomb Clustering) */}
            {FRAMES.map((f) => (
              <div
                key={f.key}
                className={`cluster-frame frame-hex-${f.key}`}
                style={{ '--l': f.box[0], '--t': f.box[1], '--w': f.box[2], '--h': f.box[3], '--p': f.pad }}
              >
                <div className="hex-border-pad">
                  <div className="hex-media-container">
                    <img src={f.img} alt={f.alt} className={`cluster-img ${f.imgClass || ''}`} loading="lazy" />
                  </div>
                </div>
              </div>
            ))}

            {/* Foreground decorative hexagons */}
            <svg className="visual-front-svg" viewBox="0 0 424 426" aria-hidden="true">
              <path d={hexPath(140, 328, 30, 34, 0.16)} fill="url(#aboutHexOrange)" />
              <path d={hexPath(294, 320, 60, 68, 0.12)} fill="url(#aboutHexDeep)" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="2" />
              <path d={hexPath(357, 334, 16, 18, 0.14)} fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.3" />
              <path d={hexPath(354, 368, 20, 23, 0.14)} fill="none" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
