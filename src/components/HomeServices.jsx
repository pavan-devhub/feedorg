import React, { useEffect, useRef, useState } from 'react';
import { SERVICE_ROUTES } from './Navbar';
import { openAppPageInNewTab } from '../utils/pageLinks';
import './HomeServices.css';

// Home "FEED Services" cards. `menuName` (where the label differs) keys into SERVICE_ROUTES so a
// card opens the same page as its mega-menu twin; `desc` replaces the icon and name on hover;
// `wide` gives a landscape logo a wider icon slot; `padded` enlarges artwork set in a wide white margin.
const homeServiceIcons = [
  { name: 'MY ORG', icon: '/icons/services/my-org.jpg', padded: true, desc: 'Complete organizational management covering accounts, compliance, reports, and more' },
  { name: 'MY BUSINESS', icon: '/icons/services/my-business.webp', desc: 'Manage business operations, track performance, and identify growth opportunities' },
  { name: 'MY EXPORTS', icon: '/icons/services/my-exports.webp', desc: 'Step-by-step guidance through the complete export process' },
  { name: 'KRUSHI YEVA JAYATE', icon: '/icons/services/krushi-yeva-jayate.webp', desc: 'Practical, step-by-step export execution with simplified options and real-time notifications' },
  { name: 'PRODUCT 360', icon: '/icons/services/product-360.webp', desc: 'Comprehensive guide of a product—from seed selection to export quality compliance' },
  { name: 'SAFE MISSION', icon: '/icons/services/safe-mission.webp', desc: 'A structured pathway to sustainable farming, quality production, export readiness, and market access' },
  { name: 'MY MARKET', icon: '/icons/services/my-market.webp', wide: true, desc: 'A B2B marketplace that connects businesses with buyers and expands access to new markets' },
  { name: 'EPM', icon: '/icons/services/epm.webp', desc: 'A district-level institutional platform that builds export awareness and activates the district’s pathway to global markets' },
  { name: 'TRADE FAIRS', icon: '/icons/services/trade-fairs.webp', desc: 'Discover domestic and international trade fairs, buyer–seller meets, and reverse buyer–seller meets worldwide' },
  { name: 'MY EDUCATION', icon: '/icons/services/my-education.webp', desc: 'Practical skill oriented courses to make you market-ready entrepreneurs' },
  { name: 'FEED WORLD', icon: '/icons/services/feed-world.webp', desc: 'A monthly publication covering Indian and international markets, trends, innovations, initiatives, opportunities, and success stories' },
  { name: 'FEED CARD', icon: '/icons/services/feed-card.webp', desc: 'A reward-based discount card offering benefits across multiple categories through Krishi Coins' },
  { name: 'MY TOOLS', icon: '/icons/services/my-tools.webp', desc: 'Handy tools for quick and easy access to essential resources' },
  { name: 'KNOW YOUR SCHEMES', icon: '/icons/services/know-your-schemes.webp', desc: 'Access Central and State Government schemes through one unified platform' },
  { name: 'LOANS & FINANCE', icon: '/icons/services/loans-finance.webp', desc: 'Connect with trusted financial partners and access tailored solutions for every financial need' },
  { name: 'YUVA KRISHI', menuName: 'YUVA KRUSHI', icon: '/icons/services/yuva-krishi.webp', desc: 'A pathway for young professionals to become agripreneurs' },
];

// Rows of four: a hovered card comes forward within its own row while its row-mates shrink back
const homeServiceRows = Array.from({ length: Math.ceil(homeServiceIcons.length / 4) }, (_, r) => homeServiceIcons.slice(r * 4, r * 4 + 4));

// The services ant is drawn twice from its one image (1271 x 1237): the body, and the raised forearm and
// hand, which turn about the elbow to wave. ANT_ARM_PATH runs round the forearm and hand through empty
// space; the body keeps a disc at the elbow so the joint stays whole whichever way the forearm turns
const ANT_ELBOW = { x: 781, y: 620, r: 23 };
const ANT_ARM_PATH = 'M748 597L760 560L788 470L788 330L1060 330L1060 580L872 590L814 643Z';

// The FEED Services block: the heading and the service cards, with the waving ant in a narrow column on
// their left. `showAnt={false}` leaves the ant out, so the heading and cards take the full width.
// `openInNewTab` opens each service in its own browser tab instead of in place (the dashboard's use)
const HomeServices = ({ onNavigate, id, showAnt = true, className = '', openInNewTab = false }) => {
  const servicesBlockRef = useRef(null);
  const [isServicesVisible, setIsServicesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsServicesVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (servicesBlockRef.current) {
      observer.observe(servicesBlockRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // The services ant starts at the top of its column and, as the page scrolls through the block, drops
  // down it to the foot. It tumbles while it falls (or flies back up when scrolling up); once the page
  // stops it lands, stands up and waves hello
  const antTrackRef = useRef(null);
  const antRef = useRef(null);

  useEffect(() => {
    const track = antTrackRef.current;
    const ant = antRef.current;
    if (!track || !ant) return;
    const sideBySide = window.matchMedia('(min-width: 1200px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const GRAVITY = 3600; // px/s²
    const MAX_FALL = 2600; // px/s
    let y = null;
    let vy = 0;
    let frame = 0;
    let running = false;
    let last = 0;
    let prevTarget = 0;
    let targetMovedAt = 0;
    let landedAt = 0;

    // Restarting a pose replays its animations, so the ant waves and says hello again
    const setPose = (pose, restart) => {
      if (restart) {
        ant.dataset.pose = '';
        void ant.offsetWidth;
      }
      ant.dataset.pose = pose;
    };

    // Its place follows how far the page has scrolled through the block: the top of its column while the
    // block's top edge is near the top of the window, the foot once the block's bottom edge reaches the
    // bottom of the window. Stacked layouts have no column, so the ant stays put there
    const targetY = () => {
      if (!sideBySide.matches) return 0;
      const travel = Math.max(track.clientHeight - ant.offsetHeight, 0);
      const { top, height } = track.getBoundingClientRect();
      const start = window.innerHeight * 0.15;
      const range = Math.max(height - window.innerHeight * 0.85, window.innerHeight * 0.3);
      return Math.min(Math.max((start - top) / range, 0), 1) * travel;
    };

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(Math.max((now - last) / 1000, 0), 0.05);
      last = now;
      const target = targetY();
      if (y === null) y = prevTarget = target;
      if (Math.abs(target - prevTarget) > 0.5) {
        prevTarget = target;
        targetMovedAt = now;
      }
      const pose = ant.dataset.pose;

      if (reducedMotion.matches) {
        y = target;
      } else if (pose === 'air') {
        if (target > y) {
          // Falling: gravity speeds it up until it catches its place, then it rides along with it
          vy = Math.min(vy + GRAVITY * dt, MAX_FALL);
          y = Math.min(y + vy * dt, target);
        } else if (target < y) {
          // Scrolled back up: it flies up to its place
          vy = 0;
          y += (target - y) * (1 - Math.exp(-8 * dt));
          if (y - target < 1) y = target;
        }
        if (Math.abs(target - y) > 1) {
          const dir = target > y ? 'down' : 'up';
          if (ant.dataset.dir !== dir) ant.dataset.dir = dir;
        }
        // Touches down once it has caught up and the page has stopped moving
        if (y === target && now - targetMovedAt > 180) {
          vy = 0;
          landedAt = now;
          setPose('land');
        }
      } else if (Math.abs(target - y) > 6) {
        vy = 0;
        ant.dataset.dir = target > y ? 'down' : 'up';
        setPose('air');
      } else {
        if (now - targetMovedAt > 180) y = target;
        if (pose === 'land' && now - landedAt > 500) setPose('stand');
      }
      ant.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };

    // Runs only while the block is on screen, picking up wherever the page now is
    const trackObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        y = null;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    // Says hello whenever it comes into view
    const antObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && ant.dataset.pose === 'stand') setPose('stand', true);
    }, { threshold: 0.6 });
    trackObserver.observe(track);
    antObserver.observe(ant);
    return () => {
      trackObserver.disconnect();
      antObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [showAnt]);

  const classes = ['home-services', !showAnt && 'home-services--noAnt', isServicesVisible && 'is-visible', className]
    .filter(Boolean).join(' ');

  return (
    <section id={id} ref={servicesBlockRef} className={classes}>
      <div className="home-services-stage">
        {showAnt && (
          <div ref={antTrackRef} className="home-services-antTrack" aria-hidden="true">
            <div ref={antRef} className="home-ant" data-pose="stand">
              <span className="home-ant-shadow" />
              <span className="home-ant-trail"><i /><i /><i /></span>
              <span className="home-ant-body">
                {/* Cropped to the mascot; the waving hand may reach past the crop */}
                <svg className="home-ant-art" viewBox="258 0 755 1237">
                  <defs>
                    <clipPath id="home-ant-body-clip">
                      <path clipRule="evenodd" d={`M0 0H1271V1237H0Z${ANT_ARM_PATH}`} />
                      <circle cx={ANT_ELBOW.x} cy={ANT_ELBOW.y} r={ANT_ELBOW.r} />
                    </clipPath>
                    <clipPath id="home-ant-arm-clip">
                      <path d={ANT_ARM_PATH} />
                    </clipPath>
                  </defs>
                  <image href="/services-ant.webp" width="1271" height="1237" clipPath="url(#home-ant-body-clip)" />
                  <g className="home-ant-arm" style={{ transformOrigin: `${ANT_ELBOW.x}px ${ANT_ELBOW.y}px` }}>
                    <image href="/services-ant.webp" width="1271" height="1237" clipPath="url(#home-ant-arm-clip)" />
                  </g>
                </svg>
              </span>
              <span className="home-ant-dust" />
              <span className="home-ant-hello">Hello!</span>
            </div>
          </div>
        )}
        <div className="home-services-main">
          <div className="home-services-head">
            <div className="home-services-titlebar">
              <span className="home-services-rule" />
              <h2 className="home-services-title"><span>FEED</span> Services</h2>
              <span className="home-services-rule" />
            </div>
          </div>
          <div className="home-services-grid">
            {homeServiceRows.map((row, r) => (
              <div key={r} className="home-services-row">
                {row.map((service, c) => {
                  const target = SERVICE_ROUTES[service.menuName || service.name];
                  // Services without a page yet render as plain boxes, matching the mega menu's inert tiles
                  const Card = target ? 'button' : 'div';
                  return (
                    <Card
                      key={service.name}
                      {...(target ? {
                        type: 'button',
                        onClick: () => (openInNewTab ? openAppPageInNewTab(target) : onNavigate(target)),
                      } : {})}
                      className="home-service-card"
                      style={{ '--i': r * 4 + c }}
                    >
                      <span className="home-service-box">
                        <span className="home-service-face">
                          <span className="home-service-name">{service.name}</span>
                          <span className="home-service-divider" />
                          <span className="home-service-body">
                            <img src={service.icon} alt="" className={`home-service-icon${service.wide ? ' is-wide' : ''}${service.padded ? ' is-padded' : ''}`} loading="lazy" decoding="async" />
                            <span className="home-service-desc">{service.desc}</span>
                          </span>
                        </span>
                      </span>
                    </Card>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
