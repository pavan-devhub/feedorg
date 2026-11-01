import explorerPhoto from '../assets/idea-explorer.webp'
import { IrrigationIcon, SeedlingIcon, TractorIcon, WheatIcon } from './icons.jsx'
import './IdeaBanner.css'

// The right-hand artwork is one SVG drawn in the design's own coordinates
// (the mockup is 2000×667; the SVG shows its right part, x 1180–2000).

// Outline of the photo, traced from the design.
const PHOTO_OUTLINE =
  'M1976 332C1972 350 1966 367 1958 383C1950 398 1936 410 1928 424C1921 439 1919 453 1913 469C1907 485 1900 502 1891 519C1883 535 1871 552 1861 566C1850 581 1843 599 1829 608C1815 618 1796 620 1778 622C1761 624 1742 623 1725 622C1707 621 1690 619 1673 617C1656 615 1640 613 1624 610C1608 607 1592 602 1577 597C1561 592 1546 586 1531 578C1516 571 1501 563 1487 553C1474 544 1461 532 1450 520C1438 507 1426 493 1416 479C1406 465 1397 450 1390 434C1383 419 1376 402 1372 385C1368 368 1366 349 1367 332C1368 315 1374 297 1379 280C1384 264 1390 247 1397 232C1404 216 1413 201 1423 187C1432 173 1443 161 1455 149C1466 137 1478 126 1491 116C1504 105 1518 96 1532 88C1546 79 1561 72 1577 66C1592 60 1607 56 1623 52C1639 48 1656 45 1673 43C1690 41 1707 41 1725 42C1742 43 1760 45 1777 49C1795 53 1811 57 1828 64C1845 71 1861 79 1877 90C1892 100 1907 112 1919 125C1932 139 1942 155 1951 171C1960 187 1967 206 1972 224C1977 241 1980 259 1981 277C1982 295 1980 314 1976 332Z'

// Icon badges sitting on the green arc.
const badges = [
  { Icon: TractorIcon, x: 1374, y: 154 },
  { Icon: SeedlingIcon, x: 1282, y: 267 },
  { Icon: WheatIcon, x: 1285, y: 397 },
  { Icon: IrrigationIcon, x: 1339, y: 521 },
]

export default function IdeaBanner() {
  return (
    <section className="idea-banner" aria-labelledby="idea-banner-title">
      <div className="idea-banner__content">
        <p className="idea-banner__eyebrow">Your idea belongs here</p>

        <h2 id="idea-banner-title" className="idea-banner__title">
          <span className="idea-banner__line">Passionate about</span>{' '}
          <span className="idea-banner__line">
            <em>agriculture</em>?
          </span>{' '}
          <span className="idea-banner__line">Let’s grow your idea</span>{' '}
          <span className="idea-banner__line">into opportunity.</span>
        </h2>

        <p className="idea-banner__text">
          <span className="idea-banner__line">
            Bring your curiosity, creativity and ambition. Explore new possibilities
          </span>{' '}
          <span className="idea-banner__line">in farming, agri-tech, food processing and rural entrepreneurship.</span>
        </p>
      </div>

      <svg
        className="idea-banner__visual"
        viewBox="1180 0 820 667"
        role="img"
        aria-label="A young agripreneur in a crop field looking through binoculars, holding a tablet"
      >
        <defs>
          <clipPath id="yk-idea-banner-photo">
            <path d={PHOTO_OUTLINE} />
          </clipPath>
          <radialGradient id="yk-idea-banner-glow" cx="0.3" cy="0.25" r="0.85">
            <stop offset="0" stopColor="#1567c8" />
            <stop offset="0.55" stopColor="#0a52ab" />
            <stop offset="1" stopColor="#06469a" />
          </radialGradient>
        </defs>

        <circle cx="2030" cy="0" r="200" fill="url(#yk-idea-banner-glow)" />
        <image
          href={explorerPhoto}
          x="1355"
          y="30"
          width="640"
          height="605"
          clipPath="url(#yk-idea-banner-photo)"
          preserveAspectRatio="none"
        />
        <circle cx="2060" cy="640" r="227" fill="url(#yk-idea-banner-glow)" />

        <path className="idea-banner__arc" d="M1452 103A268 268 0 0 0 1452 617" />
        {badges.map(({ Icon, x, y }) => (
          <g key={`${x}-${y}`}>
            <circle className="idea-banner__badge" cx={x} cy={y} r="44" />
            <Icon className="idea-banner__badge-icon" x={x - 32} y={y - 32} width="64" height="64" />
          </g>
        ))}
      </svg>
    </section>
  )
}
