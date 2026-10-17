import { Link } from '../router.jsx'
import heroPhotoUrl from '../assets/images/hero-port.jpg'
import worldDotsUrl from '../assets/images/world-dots.svg'
import { screens, stages } from '../data/screens.js'
import { ArrowRightIcon, BarsIcon, CrownIcon, ShieldCheckIcon, UsersIcon } from './icons.jsx'

const firstScreen = screens[0]
const lastScreen = screens.at(-1)
 
const stats = [
  { value: screens.length, label: 'Steps', tone: 'blue', Icon: UsersIcon },
  { value: stages.length, label: 'Stages', tone: 'amber', Icon: BarsIcon },
  { value: screens.filter((screen) => screen.badge).length, label: 'Stage badges', tone: 'green', Icon: ShieldCheckIcon },
]

// Trade routes over the dotted map, in design px inside the 565 × 294.4 map box
// (positions taken from the design). The map itself is equirectangular,
// lon -180° at x = 0, 1.57 px per degree.
const pins = {
  europe: { x: 291, y: 49.5 },
  centralAmerica: { x: 136, y: 141 },
  centralAfrica: { x: 316, y: 175 },
  eastAsia: { x: 464, y: 118 },
  southeastAsia: { x: 443, y: 199 },
}
// [from, to, quadratic control point]
const routes = [
  ['centralAmerica', 'eastAsia', [312, 46.7]],
  ['europe', 'eastAsia', [390.4, 38.9]],
  ['centralAfrica', 'eastAsia', [386.1, 115.6]],
  ['centralAfrica', 'southeastAsia', [403.6, 154.5]],
]

function Pin({ x, y }) {
  return (
    <g className="hero-map__pin" transform={`translate(${x} ${y})`}>
      <path d="M0 0C-4.6-7.8-9-12.1-9-17.3a9 9 0 0 1 18 0C9-12.1 4.6-7.8 0 0z" />
      <circle cy="-17.3" r="3.5" />
    </g>
  )
}

export default function HomeHero() {
  return (
    <header className="hero">
      {/* Clip shapes. #hero-glass: the white edge where the blue glass band starts, in
          the 968 × 870 photo box — the photo's S-curve edge (assets/images/hero-wave-mask.svg)
          offset by a smoothly varying band width, so the two never cross. Both are smooth
          fits to the design. #hero-wave-top: the photo's top edge in the stacked layout. */}
      <svg className="hero__defs" aria-hidden="true">
        <clipPath id="hero-glass" clipPathUnits="objectBoundingBox">
          <path d="M0.0781 0C0.1109 0.0208 0.1316 0.0417 0.1476 0.0625C0.1635 0.0833 0.1743 0.1042 0.182 0.125C0.1897 0.1458 0.1942 0.1667 0.1956 0.1875C0.197 0.2083 0.195 0.2292 0.1907 0.25C0.1863 0.2708 0.1796 0.2917 0.171 0.3125C0.1624 0.3333 0.1515 0.3542 0.1394 0.375C0.1272 0.3958 0.1138 0.4167 0.1004 0.4375C0.0871 0.4583 0.0737 0.4792 0.0613 0.5C0.049 0.5208 0.0377 0.5417 0.0282 0.5625C0.0188 0.5833 0.0111 0.6042 0.0059 0.625C0.0007 0.6458 -0.0021 0.6667 -0.0018 0.6875C-0.0016 0.7083 0.0018 0.7292 0.0088 0.75C0.0159 0.7708 0.0268 0.7917 0.0419 0.8125C0.057 0.8333 0.0764 0.8542 0.099 0.875C0.1217 0.8958 0.1479 0.9167 0.1726 0.9375C0.1972 0.9583 0.2207 0.9792 0.2295 1H10V0z" />
        </clipPath>
        <clipPath id="hero-wave-top" clipPathUnits="objectBoundingBox">
          <path d="M0 .1C.2.02.38.02.55.08.72.14.86.12 1 .04V1H0z" />
        </clipPath>
      </svg>

      {/* Soft shapes along the left edge, traced from the design (design px, 300 × 870) */}
      <svg className="hero__blobs" viewBox="0 0 300 870" aria-hidden="true">
        <defs>
          <linearGradient id="hero-blob-crescent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dbeafc" />
            <stop offset="0.4" stopColor="#e1edfd" />
            <stop offset="0.75" stopColor="#e7f0fc" />
            <stop offset="1" stopColor="#eef4fb" />
          </linearGradient>
          <linearGradient id="hero-blob-lobe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0f6fc" />
            <stop offset="0.3" stopColor="#ebf3fd" />
            <stop offset="0.65" stopColor="#e7f0fd" />
            <stop offset="1" stopColor="#e6f0fc" />
          </linearGradient>
          <linearGradient id="hero-blob-lower" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e2edfc" />
            <stop offset="0.35" stopColor="#e5effc" />
            <stop offset="0.6" stopColor="#e7f0fb" />
            <stop offset="0.8" stopColor="#edf3fc" />
            <stop offset="1" stopColor="#f3f6fb" />
          </linearGradient>
          <linearGradient id="hero-blob-peach" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fdf3e3" />
            <stop offset="0.25" stopColor="#fef4e8" />
            <stop offset="0.5" stopColor="#fdf6ed" />
            <stop offset="0.75" stopColor="#fdf7f0" />
            <stop offset="1" stopColor="#fbf8f2" />
          </linearGradient>
        </defs>
        <path fill="url(#hero-blob-crescent)" d="M-10 38C-7.3 40 2.3 46.3 6 50C9.7 53.7 9.3 56.7 12 60C14.7 63.3 18.7 66.7 22 70C25.3 73.3 29 76.7 32 80C35 83.3 37.3 86.7 40 90C42.7 93.3 45 96.7 48 100C51 103.3 55.5 106.3 58 110C60.5 113.7 61.5 118.3 63 122C64.5 125.7 65.8 129 67 132C68.2 135 69.2 137 70 140C70.8 143 71 146.7 72 150C73 153.3 75 156.7 76 160C77 163.3 77.3 166.7 78 170C78.7 173.3 79.3 175.8 80 180C80.7 184.2 81.7 189.2 82 195C82.3 200.8 82.2 208.8 82 215C81.8 221.2 82.3 226.5 81 232C79.7 237.5 76.5 246.7 74 248C71.5 249.3 68.3 243 66 240C63.7 237 61.7 233.3 60 230C58.3 226.7 57.3 223.3 56 220C54.7 216.7 54 213.3 52 210C50 206.7 46.7 203.3 44 200C41.3 196.7 39 193.3 36 190C33 186.7 29.3 183.3 26 180C22.7 176.7 19.7 173.3 16 170C12.3 166.7 8.3 163.7 4 160C-0.3 156.3 -7.7 150 -10 148z" />
        <path fill="url(#hero-blob-lobe)" d="M-10 272C-8.3 272.7 -3 274.7 0 276C3 277.3 4 277.7 8 280C12 282.3 20 286.7 24 290C28 293.3 29.3 296.7 32 300C34.7 303.3 36.3 306.7 40 310C43.7 313.3 50.5 316.7 54 320C57.5 323.3 59.5 326.7 61 330C62.5 333.3 62.8 336.7 63 340C63.2 343.3 62.5 346.7 62 350C61.5 353.3 60.7 356.7 60 360C59.3 363.3 58.7 366.7 58 370C57.3 373.3 57 376.7 56 380C55 383.3 53.3 386.7 52 390C50.7 393.3 49.3 396.7 48 400C46.7 403.3 45.2 406.7 44 410C42.8 413.3 42.3 416.7 41 420C39.7 423.3 37.8 426.7 36 430C34.2 433.3 32 436.7 30 440C28 443.3 26 446.7 24 450C22 453.3 20.3 456.7 18 460C15.7 463.3 13 466.7 10 470C7 473.3 3.3 477.7 0 480C-3.3 482.3 -8.3 483.3 -10 484z" />
        <path fill="url(#hero-blob-lower)" d="M-10 494C-8.3 494.3 -4.7 495 0 496C4.7 497 12.7 497.7 18 500C23.3 502.3 27.7 506.7 32 510C36.3 513.3 40.3 516.7 44 520C47.7 523.3 50.7 526.7 54 530C57.3 533.3 61.3 536.7 64 540C66.7 543.3 68 546.7 70 550C72 553.3 74 556.7 76 560C78 563.3 80 566.7 82 570C84 573.3 86.3 576.7 88 580C89.7 583.3 90.7 586.7 92 590C93.3 593.3 94.7 596.7 96 600C97.3 603.3 99 606.7 100 610C101 613.3 101.3 616.7 102 620C102.7 623.3 103 626.7 104 630C105 633.3 107 636.7 108 640C109 643.3 109.3 646.7 110 650C110.7 653.3 111.3 656.7 112 660C112.7 663.3 113.3 666.7 114 670C114.7 673.3 115.7 676.7 116 680C116.3 683.3 116.2 686.7 116 690C115.8 693.3 115.7 696.7 115 700C114.3 703.3 113.3 707 112 710C110.7 713 109 718 107 718C105 718 102.8 713 100 710C97.2 707 93 703.3 90 700C87 696.7 85 693.3 82 690C79 686.7 75 683.3 72 680C69 676.7 66.7 673.3 64 670C61.3 666.7 58.7 663.3 56 660C53.3 656.7 51.3 653.3 48 650C44.7 646.7 39.7 643.3 36 640C32.3 636.7 29.3 633.3 26 630C22.7 626.7 19.7 623 16 620C12.3 617 8.3 614.3 4 612C-0.3 609.7 -7.7 607 -10 606z" />
        <path fill="url(#hero-blob-peach)" d="M-10 632C-8.3 632.7 -4 634.7 0 636C4 637.3 10 637.7 14 640C18 642.3 20.7 646.7 24 650C27.3 653.3 30.7 656.7 34 660C37.3 663.3 41 666.7 44 670C47 673.3 49.3 676.7 52 680C54.7 683.3 57.7 686.7 60 690C62.3 693.3 63.7 696.7 66 700C68.3 703.3 71.7 706.7 74 710C76.3 713.3 78.3 716.7 80 720C81.7 723.3 82.3 726.7 84 730C85.7 733.3 88.3 736.7 90 740C91.7 743.3 92.3 746.7 94 750C95.7 753.3 98.3 756.7 100 760C101.7 763.3 102.7 766.7 104 770C105.3 773.3 106.7 776.7 108 780C109.3 783.3 110.3 786.7 112 790C113.7 793.3 116 796.7 118 800C120 803.3 122 806.7 124 810C126 813.3 127.7 816.7 130 820C132.3 823.3 135 826.7 138 830C141 833.3 144.5 836.7 148 840C151.5 843.3 155.2 846.7 159 850C162.8 853.3 167 856.7 171 860C175 863.3 178.8 866.7 183 870C187.2 873.3 228.2 878.3 196 880C163.8 881.7 24.3 880 -10 880z" />
      </svg>

      <div className="hero__map" aria-hidden="true">
        <img src={worldDotsUrl} alt="" />
        <svg viewBox="0 0 565 294.4">
          {routes.map(([from, to, [cx, cy]]) => (
            <path
              key={`${from}-${to}`}
              className="hero-map__route"
              d={`M${pins[from].x} ${pins[from].y}Q${cx} ${cy} ${pins[to].x} ${pins[to].y}`}
            />
          ))}
          {Object.entries(pins).map(([name, pin]) => (
            <Pin key={name} {...pin} />
          ))}
          <path className="hero-map__sparkle" d="M291 4.2q1.1 4.4 5.4 5.4-4.3 1.1-5.4 5.4-1.1-4.3-5.4-5.4 4.3-1 5.4-5.4z" />
        </svg>
      </div>

      <div className="hero__media" aria-hidden="true">
        <div className="hero__glass" />
        <div className="hero__frame">
          <img className="hero__photo" src={heroPhotoUrl} alt="" fetchPriority="high" />
        </div>
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          <strong>FEED MSCS LTD</strong>
          <span>·</span>
          <span>Export Cooperative</span>
        </p>

        <h1 className="hero__title">
          <span className="hero__title-project">PROJECT</span>{' '}
          <span className="hero__title-kyj">KYJ</span>
        </h1>
        <p className="hero__subtitle">Complete Export Support for Farmers</p>
        <p className="hero__lead">
          Farmer to exporter pathway: farmer keeps ownership, FEED as <span className="nowrap">third-party</span> exporter handles buyers,
          compliance, logistics, realisation, major share of FOB to farmer, FIRC-verified income.
        </p>

        <div className="hero__actions">
          <Link className="hero-btn hero-btn--primary" to={firstScreen.path}>
            Start the journey
            <span className="hero-btn__arrow">
              <ArrowRightIcon />
            </span>
          </Link>
          <Link className="hero-btn hero-btn--secondary" to={lastScreen.path}>
            <CrownIcon />
            Jump to the finale
          </Link>
        </div>

        <ul className="hero__stats">
          {stats.map(({ value, label, tone, Icon }) => (
            <li key={label} className={`kyj-hero-stat hero-stat--${tone}`}>
              <span className="hero-stat__icon">
                <Icon />
              </span>
              <span className="hero-stat__text">
                <span className="hero-stat__value">{value}</span>
                <span className="hero-stat__label">{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
