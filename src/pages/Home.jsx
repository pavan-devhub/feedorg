import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Download, PlayCircle, FileText, Shield, Home as HomeIcon, Users, Settings, Calendar, Map, Activity, Users2, Globe2, PhoneCall, Trophy, BadgeCheck, ShieldCheck, Star, User, UserPlus, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Sprout, Building2, Ship, Package, TrendingUp, GraduationCap, ClipboardList, Store, HeartHandshake, Wrench, Lightbulb, ShoppingBag, CreditCard, Target, Eye, Rocket, Search, Leaf, Landmark, PieChart, BarChart3, MoreHorizontal, Cloud, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import AboutUs from './AboutUs';
import Navbar, { SERVICE_ROUTES } from '../components/Navbar';
import '../components/Navbar.css';
import agriExportImg from '../assets/about_hero_gen.avif';
// --- Events & Updates Static Data ---
const centralStateUpdates = [
  { id: 1, source: 'FIEO', title: 'FIEO MUMBAI : WEB CONFERENCE ON AWARENESS OF CYBER SECURITY ON SEPTEMBER 30, 202', color: '#0ea5e9' },
  { id: 2, source: 'Apeda', title: 'Report on Development of suitable package & formulation of packaging specification for fresh kiwi from north eastern states.', color: '#16a34a' },
  { id: 3, source: 'IBEF', title: 'PM dedicates to the Nation 35 crop varieties with special traits.', color: '#eab308' },
  { id: 4, source: 'Nabard', title: 'WRONG COVERAGE REGARDING NABARD IN VARIOUS PRINT MEDIA ON KISAN CREDIT CARD.', color: '#22c55e' },
  { id: 5, source: 'Other Updates', title: 'Latest notifications, circulars and announcements from various departments.', color: '#ef4444' }
];

const keyHighlights = [
  { id: 1, title: 'Export Opportunities', desc: 'Explore new markets and export opportunities across the globe.', icon: Package, color: '#16a34a', bg: '#f0fdf4' },
  { id: 2, title: 'Farmer Empowerment', desc: 'Initiatives and schemes for the upliftment of farmers.', icon: Users, color: '#ea580c', bg: '#fff7ed' },
  { id: 3, title: 'Business Growth', desc: 'Resources and support for MSMEs and new entrepreneurs.', icon: TrendingUp, color: '#8b5cf6', bg: '#faf5ff' }
];

const feedServicesList = [
  { id: 1, title: 'FPC', desc: 'FEED is a multi-state co-operative society working for the uplift.', icon: Users2, color: '#0ea5e9', bg: '#f0f9ff' },
  { id: 2, title: 'Farm', desc: 'FEED is a multi-state co-operative society working for the uplift.', icon: Sprout, color: '#84cc16', bg: '#f7fee7' },
  { id: 3, title: 'My Business', desc: 'FEED is a multi-state co-operative society working for the uplift.', icon: HeartHandshake, color: '#3b82f6', bg: '#eff6ff' },
  { id: 4, title: 'My Exports', desc: 'FEED is a multi-state co-operative society working for the uplift.', icon: Ship, color: '#6366f1', bg: '#eef2ff' },
  { id: 5, title: 'MY Products', desc: 'FEED is a multi-state co-operative society working for the uplift.', icon: Package, color: '#f59e0b', bg: '#fffbeb' },
  { id: 6, title: 'My Market', desc: 'FEED is a multi-state co-operative society working for the uplift.', icon: Store, color: '#ef4444', bg: '#fef2f2' },
];

// Home "FEED Services" cards. `menuName` (where the label differs) keys into SERVICE_ROUTES so a
// card opens the same page as its mega-menu twin; `desc` replaces the icon and name on hover;
// `wide` gives a landscape logo a wider icon slot.
const homeServiceIcons = [
  { name: 'MY ORG', icon: '/icons/services/my-org.webp', desc: 'Complete organizational management covering accounts, compliance, reports, and more' },
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

const featureTags = [
  { id: 1, title: 'Pan India Presence', desc: 'Multiple states, one mission', icon: Globe2, color: '#8b5cf6' },
  { id: 2, title: 'Farmer First Approach', desc: 'Empowering rural communities', icon: Users, color: '#22c55e' },
  { id: 3, title: 'Cooperative Strength', desc: 'Stronger together', icon: HeartHandshake, color: '#f97316' },
  { id: 4, title: 'Export Focused', desc: 'Global opportunities', icon: TrendingUp, color: '#0ea5e9' },
  { id: 5, title: 'Transparent & Trusted', desc: 'Building lasting partnerships', icon: ShieldCheck, color: '#6366f1' },
];

// Events & Updates middle block: opens on a mosaic of every image (three across the top, two
// below), then shows them one at a time across the whole block in mosaic order, and comes back
// round to the mosaic. `focus` is where a mosaic tile crops its image
const eventsImages = [
  { src: '/hero-banner-1.avif', alt: 'India FEED to the world', focus: '82% 50%' },
  { src: '/hero-banner-3.avif', alt: 'FEED 4 pillars', focus: '50% 50%' },
  { src: '/hero-banner-2.avif', alt: 'FEED subsidiary companies', focus: '50% 50%' },
  { src: agriExportImg, alt: 'FEED agri exports', focus: '40% 50%' },
  { src: '/hero-banner-4.avif', alt: 'FEED Export Promotional Meetings in multi states', focus: '50% 50%' },
];
const EVENTS_VIEW_COUNT = eventsImages.length + 1; // the mosaic, then each image
const EVENTS_MOSAIC_MS = 5000;
const EVENTS_IMAGE_MS = 4000;

const Home = ({ onNavigate, searchQuery, isLoggedIn, user, onLogout }) => {
  const { t, i18n } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

  // Events & Updates middle block: view 0 is the mosaic, 1.. each image on its own. `from` is the
  // view sliding out (null until the first move, so the opening mosaic doesn't slide in) and `dir`
  // which way they slide: 1 left to right, -1 back
  const [eventsView, setEventsView] = useState({ at: 0, from: null, dir: 1 });
  const [eventsPaused, setEventsPaused] = useState(false);
  const [eventsInView, setEventsInView] = useState(false);
  const eventsShowcaseRef = useRef(null);
  const showEventsView = (at, dir) => setEventsView((v) => (v.at === at ? v : { at, from: v.at, dir }));
  const stepEventsView = (dir) => setEventsView((v) => ({ at: (v.at + dir + EVENTS_VIEW_COUNT) % EVENTS_VIEW_COUNT, from: v.at, dir }));

  const servicesBlockRef = useRef(null);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  
  const aboutUsBlockRef = useRef(null);
  const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);

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
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAboutUsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (aboutUsBlockRef.current) {
      observer.observe(aboutUsBlockRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // The events block moves on only while it's on screen and not hovered, so whoever scrolls down to
  // it lands on the mosaic
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setEventsInView(entry.isIntersecting), { threshold: 0.3 });
    if (eventsShowcaseRef.current) observer.observe(eventsShowcaseRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!eventsInView || eventsPaused) return;
    const timer = setTimeout(() => stepEventsView(1), eventsView.at === 0 ? EVENTS_MOSAIC_MS : EVENTS_IMAGE_MS);
    return () => clearTimeout(timer);
  }, [eventsView, eventsInView, eventsPaused]);

  useEffect(() => {
    let timer;
    if (currentSlide === 0) {
      timer = setTimeout(() => {
        setCurrentSlide(1);
      }, 4000); // 4 seconds on image
    } else if (currentSlide === 1) {
      if (videoRef.current) {
        // Ensure video plays from start
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
      }
    }
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleVideoEnded = () => {
    setCurrentSlide(0);
  };


  const aboutPillars = [
    {
      title: 'Main Objective',
      Icon: Target,
      gradient: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
      glow: 'rgba(249, 115, 22, 0.18)',
      text: (
        <>
          Connecting <strong>farmers, traders, MSMEs and new entrepreneurs</strong> with international markets, export councils, governments and banks through FPO formation, promotion meetings and export-order support.
        </>
      )
    },
    {
      title: 'Vision',
      Icon: Eye,
      gradient: 'linear-gradient(135deg, #059669 0%, #16a34a 100%)',
      glow: 'rgba(22, 163, 74, 0.18)',
      text: (
        <>
          To become India&apos;s trusted one-stop solution for agricultural marketing in domestic and international markets through an effective technical interface.
        </>
      )
    },
    {
      title: 'Mission',
      Icon: Rocket,
      gradient: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
      glow: 'rgba(6, 182, 212, 0.2)',
      text: (
        <>
          Form product-based FPOs, build capacity through training, unlock global opportunities through <strong>FEED STARTUP</strong>, and provide real-time export process support.
        </>
      )
    }
  ];

  const aboutStats = [
    { value: '15+', label: 'Govt. & export bodies connected', Icon: Building2 },
    { value: '10', label: 'Priority products per district', Icon: Package },
    { value: '360°', label: 'Export support ecosystem', Icon: Globe2 },
    { value: 'MSCS', label: 'Registered cooperative society', Icon: ShieldCheck }
  ];
  
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="home-landing-page" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
     
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="home" />

      {/* 2. Hero Slider (Image & Video) */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        
        {/* Slider Track */}
        <div style={{ 
          display: 'flex', 
          width: '200vw', 
          height: '100%',
          transform: `translateX(-${currentSlide * 100}vw)`,
          transition: 'transform 0.8s ease-in-out'
        }}>
          
          {/* Slide 1: Image */}
          <div style={{ 
            width: '100vw', 
            height: '100%', 
            backgroundImage: `url('/home-header.avif')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center bottom',
          }}></div>

          {/* Slide 2: Video */}
          <div style={{ width: '100vw', height: '100%', backgroundColor: '#000' }}>
            <video 
              ref={videoRef}
              src="/vid.mp4" 
              muted 
              playsInline
              onEnded={handleVideoEnded}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

        </div>

        {/* OVERLAYS (These sit ON TOP of the slider track and do not move) */}
        
        {/* Language Selector (Top Right) */}
        <div style={{ position: 'absolute', top: '100px', right: '4%', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', backgroundColor: '#ffffff', borderRadius: '20px', cursor: 'pointer', position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <Globe2 size={15} color="#ea580c" strokeWidth={2} />
            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              style={{ background: 'transparent', color: '#111827', border: 'none', outline: 'none', fontSize: '12px', fontWeight: '700', appearance: 'none', paddingRight: '14px', cursor: 'pointer' }}
            >
              <option value="en">English</option>
              <option value="hi">à¤¹à¤¿à¤‚à¤¦à¥€</option>
              <option value="te">à°¤à±†à°²à±à°—à±</option>
            </select>
            <ChevronDown size={12} color="#111827" style={{ position: 'absolute', right: '8px', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* 1. Top Header Bar (Contact & Settings) */}
        <div className="top-header-bar" style={{ position: 'absolute', bottom: '0px', left: 0, right: 0, width: '100%', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px', backgroundColor: 'transparent' }}>
          
          {/* Left: Contact Info */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', padding: '6px 16px 6px 6px', borderRadius: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#1f2937' }}>
                <PhoneCall size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', color: '#111827', fontSize: '15px', lineHeight: '1.2' }}>+91 9293858689</div>
                <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.2' }}>{t('call_us')}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', padding: '6px 16px 6px 6px', borderRadius: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#1f2937' }}>
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', color: '#111827', fontSize: '15px', lineHeight: '1.2' }}>info@feedorg.com</div>
                <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.2' }}>{t('mail_us')}</div>
              </div>
            </div>
          </div>

          {/* Right Bottom Badge (Aligned with contact buttons) */}
          <div style={{ backgroundColor: 'white', padding: '6px 16px', borderRadius: '40px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <Shield size={24} color="#16a34a" fill="#dcfce7" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563' }}>REG.No:</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#16a34a' }}>MSCS/CR/1295/2020</div>
            </div>
          </div>
        </div>

      </div>

      {/* 6. About Us Section */}
      <AboutUs />

      {/* Services Block: the ant artwork on the left, the heading and service cards on its right */}
      <section id="services-block" ref={servicesBlockRef} className={`home-services${isServicesVisible ? ' is-visible' : ''}`}>
        <div className="home-services-stage">
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
                        {...(target ? { type: 'button', onClick: () => onNavigate(target) } : {})}
                        className="home-service-card"
                        style={{ '--i': r * 4 + c }}
                      >
                        <span className="home-service-box">
                          <span className="home-service-face">
                            <span className="home-service-name">{service.name}</span>
                            <span className="home-service-divider" />
                            <span className="home-service-body">
                              <img src={service.icon} alt="" className={`home-service-icon${service.wide ? ' is-wide' : ''}`} loading="lazy" decoding="async" />
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

        <style>{`
          .home-services {
            /* Each size takes the smaller of a width-based and a height-based value, so on a short
               desktop window the spacing tightens along with the cards */
            --pad: clamp(20px, min(3.5vw, 4svh), 72px);
            --title: clamp(28px, min(3.4vw, 6svh), 64px);
            --head-gap: clamp(14px, min(3.2vw, 3.5svh), 60px);
            --gap-x: clamp(12px, 1.1vw, 22px);
            --gap-y: clamp(12px, min(1.6vw, 2.4svh), 32px);
            width: 100%;
            padding-block: var(--pad);
            /* The design's farmland backdrop. Anchored to the bottom so the fields, the gold swoosh and
               the hills always show in full; any crop comes off the sky */
            background: #faf9f1 url('/services-bg.webp') center bottom / cover no-repeat;
          }
          /* The ant has a narrow left column (a fifth of the width); the heading and cards share the rest */
          .home-services-stage {
            max-width: 1880px;
            margin: 0 auto;
            padding-inline: 2% 2.5%;
            display: grid;
            grid-template-columns: 20fr 80fr;
            column-gap: 2%;
          }
          /* The ant's lane: the full height of the left column, reaching down into the bottom padding so
             the ant ends with its feet on the gold swoosh. Above the cards, but never in the pointer's way */
          .home-services-antTrack {
            position: relative;
            z-index: 1;
            align-self: stretch;
            margin-bottom: calc(14px - var(--pad));
            pointer-events: none;
          }
          .home-ant {
            position: absolute;
            top: 0;
            left: 0;
            /* Never taller than about two thirds of the window */
            width: min(62%, calc(0.61 * 0.64 * (100svh - 2 * var(--pad))));
            /* The mascot only spans the middle ~58% of its artwork; the SVG's viewBox trims the transparent sides */
            aspect-ratio: 0.61;
            will-change: transform;
          }
          .home-ant-body {
            position: absolute;
            inset: 0;
            transform-origin: 50% 97%;
          }
          .home-ant-art { display: block; width: 100%; height: 100%; overflow: visible; }
          /* Turns about the elbow (its origin, set inline, is in image pixels) */
          .home-ant-arm { transform-box: fill-box; }

          /* A soft shadow under its feet while it stands */
          .home-ant-shadow {
            position: absolute;
            left: 14%;
            right: 16%;
            bottom: -1%;
            height: 5%;
            border-radius: 50%;
            background: radial-gradient(closest-side, rgba(70, 45, 10, 0.3), transparent);
            transition: opacity 0.25s ease, transform 0.25s ease;
          }
          /* Speed lines streaming behind it while it falls (above) or flies back up (below) */
          .home-ant-trail {
            position: absolute;
            left: 28%;
            right: 28%;
            bottom: 100%;
            height: 24%;
            display: flex;
            justify-content: space-between;
            opacity: 0;
            transition: opacity 0.2s ease;
          }
          .home-ant-trail i {
            width: 3px;
            border-radius: 2px;
            background: linear-gradient(to bottom, transparent, rgba(201, 162, 75, 0.9));
          }
          .home-ant-trail i:nth-child(1) { height: 70%; margin-top: 20%; }
          .home-ant-trail i:nth-child(2) { height: 100%; }
          .home-ant-trail i:nth-child(3) { height: 60%; margin-top: 30%; }
          .home-ant[data-dir='up'] .home-ant-trail { bottom: auto; top: 96%; transform: scaleY(-1); }
          /* Puffs of dust kicked out either side as it lands */
          .home-ant-dust { position: absolute; left: 10%; right: 10%; bottom: 0; height: 9%; }
          .home-ant-dust::before,
          .home-ant-dust::after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 38%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(closest-side, rgba(214, 186, 128, 0.85), transparent);
            opacity: 0;
          }
          .home-ant-dust::before { left: 0; --dust-x: -45%; }
          .home-ant-dust::after { right: 0; --dust-x: 45%; }
          /* The speech bubble, its tail pointing down at the waving hand */
          .home-ant-hello {
            position: absolute;
            left: 82%;
            top: 12%;
            padding: 0.4em 0.85em;
            border: 2px solid #c9a24b;
            border-radius: 999px;
            background: #ffffff;
            box-shadow: 0 10px 20px -12px rgba(15, 23, 42, 0.5);
            font-size: clamp(13px, 1vw, 17px);
            font-weight: 800;
            letter-spacing: 0.3px;
            color: #1a8f2e;
            white-space: nowrap;
            opacity: 0;
            transform-origin: 12% 100%;
          }
          .home-ant-hello::after {
            content: '';
            position: absolute;
            left: 0.9em;
            bottom: -6px;
            width: 9px;
            height: 9px;
            background: #ffffff;
            border-right: 2px solid #c9a24b;
            border-bottom: 2px solid #c9a24b;
            transform: rotate(45deg);
          }

          /* Standing: a gentle breath, a wave straight away and every few seconds after, and a hello */
          .home-ant[data-pose='stand'] .home-ant-body { animation: antBreathe 3s ease-in-out infinite; }
          .home-ant[data-pose='stand'] .home-ant-arm { animation: antWave 5s ease-in-out infinite; }
          .home-ant[data-pose='stand'] .home-ant-hello { animation: antHello 2.6s ease both; }
          /* In the air: stretched out, wobbling, the hand flapping */
          .home-ant[data-pose='air'] .home-ant-body { transform-origin: 50% 50%; animation: antTumble 0.45s ease-in-out infinite alternate; }
          .home-ant[data-pose='air'] .home-ant-arm { animation: antFlap 0.22s ease-in-out infinite alternate; }
          .home-ant[data-pose='air'] .home-ant-trail { opacity: 1; }
          .home-ant[data-pose='air'] .home-ant-shadow { opacity: 0; transform: scale(0.4); }
          /* Touching down: squashed flat, springing back up, dust flying */
          .home-ant[data-pose='land'] .home-ant-body { animation: antLand 0.5s ease-out both; }
          .home-ant[data-pose='land'] .home-ant-dust::before,
          .home-ant[data-pose='land'] .home-ant-dust::after { animation: antDust 0.6s ease-out both; }

          @keyframes antBreathe { 50% { transform: scale(1.012, 0.99); } }
          @keyframes antWave {
            0%, 36%, 100% { transform: rotate(0deg); }
            6%, 18% { transform: rotate(16deg); }
            12%, 24% { transform: rotate(-6deg); }
            30% { transform: rotate(12deg); }
          }
          @keyframes antHello {
            0% { opacity: 0; transform: translateY(8px) scale(0.6); }
            12% { opacity: 1; transform: scale(1.06); }
            18%, 80% { opacity: 1; transform: none; }
            100% { opacity: 0; transform: translateY(-4px) scale(0.95); }
          }
          @keyframes antTumble {
            from { transform: rotate(-6deg) scale(0.95, 1.06); }
            to { transform: rotate(6deg) scale(0.95, 1.06); }
          }
          @keyframes antFlap {
            from { transform: rotate(-8deg); }
            to { transform: rotate(22deg); }
          }
          @keyframes antLand {
            0% { transform: scale(1.14, 0.8); }
            40% { transform: scale(0.94, 1.07); }
            70% { transform: scale(1.03, 0.98); }
            100% { transform: none; }
          }
          @keyframes antDust {
            0% { opacity: 0.9; transform: translateX(0) scale(0.4); }
            100% { opacity: 0; transform: translateX(var(--dust-x)) scale(1.3); }
          }
          @media (prefers-reduced-motion: reduce) {
            .home-ant *, .home-ant *::before, .home-ant *::after { animation: none !important; }
          }
          .home-services-main {
            min-width: 0;
            align-self: center;
            /* Nudged left towards the ant. A relative offset, so the grid keeps its width and the cards their size */
            position: relative;
            left: -4%;
            /* Square cards make four rows taller than most windows, so the block simply scrolls with
               the page. Capped so the squares stay a comfortable size on very wide screens */
            justify-self: center;
            width: 100%;
            max-width: 1120px;
          }
          .home-services-head { margin-bottom: var(--head-gap); text-align: center; }
          .home-services-titlebar { display: flex; align-items: center; justify-content: center; gap: clamp(14px, 1.4vw, 28px); }
          .home-services-title {
            font-size: var(--title);
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: 0.5px;
            color: #0f1d3a;
            text-transform: uppercase;
          }
          .home-services-title span { color: #1a8f2e; }
          /* Gold rules either side of the title, each ending in a dot next to it */
          .home-services-rule {
            position: relative;
            width: clamp(60px, 7.5vw, 150px);
            height: 2px;
            background: linear-gradient(90deg, transparent, #c9a24b);
          }
          .home-services-rule:last-child { background: linear-gradient(270deg, transparent, #c9a24b); }
          .home-services-rule::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #c9a24b;
            transform: translateY(-50%);
          }
          .home-services-rule:last-child::after { right: auto; left: -4px; }

          .home-services-grid {
            display: flex;
            flex-direction: column;
            gap: var(--gap-y);
          }
          .home-services-row {
            display: flex;
            align-items: center;
            /* The cards' side padding stands in for a gap, so the pointer never drops into dead space
               between two cards (which would reset the row mid-hover) */
            margin-inline: calc(var(--gap-x) / -2);
          }
          .home-service-card {
            --ease: cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            flex: 1 1 0;
            min-width: 0;
            display: flex;
            /* A sliver of room above and below the box, so with the row gap the space between rows
               roughly matches the space between columns */
            padding: clamp(4px, 0.35vw, 7px) calc(var(--gap-x) / 2);
            border: 0;
            background: none;
            text-align: left;
            font: inherit;
            color: inherit;
            opacity: 0;
          }
          button.home-service-card { cursor: pointer; }
          .home-services.is-visible .home-service-card {
            opacity: 1;
            animation: homeServiceIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 40ms) backwards;
          }
          @keyframes homeServiceIn {
            from { opacity: 0; transform: translateY(24px) scale(0.94); }
            to { opacity: 1; transform: none; }
          }
          /* A square: the name across the top, a short gold rule, then the icon below. Everything
             inside is sized in cqw (percent of the card's width), so a card keeps the same look at
             any size. The box fills 98% of its slot, the rest becoming gap */
          .home-service-box {
            position: relative;
            flex: none;
            width: 98%;
            min-width: 0;
            margin-inline: auto;
            aspect-ratio: 1;
            display: grid;
            grid-template: minmax(0, 1fr) / minmax(0, 1fr);
            background: #ffffff;
            border: 1px solid #e9ebef;
            border-radius: 12px;
            box-shadow: 0 10px 26px -16px rgba(15, 23, 42, 0.28);
            container-type: inline-size;
            transition: transform 0.35s var(--ease), background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          }
          .home-service-card:hover .home-service-box,
          .home-service-card:focus-visible .home-service-box {
            background: #f3fbf1;
            border-color: #9ad89a;
            box-shadow: 0 18px 34px -16px rgba(22, 163, 74, 0.45);
          }
          .home-service-card:focus-visible { outline: none; }
          .home-service-card:focus-visible .home-service-box { outline: 2px solid #16a34a; outline-offset: 3px; }
          .home-service-face {
            grid-area: 1 / 1;
            min-width: 0;
            min-height: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8cqw 7cqw;
            text-align: center;
          }
          /* Always two lines tall, so the rules and icons line up across a row whether a name wraps or not */
          .home-service-name {
            flex: none;
            display: grid;
            place-items: center;
            width: 100%;
            min-height: 2.5em;
            overflow-wrap: break-word;
            font-size: clamp(12px, 6.4cqw, 19px);
            font-weight: 800;
            line-height: 1.25;
            letter-spacing: 0.3px;
            color: #0f1d3a;
          }
          .home-service-divider {
            flex: none;
            width: 18cqw;
            height: 2px;
            margin-block: 4cqw;
            border-radius: 1px;
            background: linear-gradient(90deg, transparent, #c9a24b, transparent);
          }
          /* The space under the rule, shared by the icon and the description: opening a card swaps one
             for the other, while the name and rule stay put above */
          .home-service-body {
            flex: 1 1 auto;
            width: 100%;
            min-height: 0;
            display: grid;
            grid-template: minmax(0, 1fr) / minmax(0, 1fr);
            place-items: center;
          }
          /* Cover crops the wider artwork to its centred circle; multiply drops the white backdrop into
             the box's tint */
          .home-service-icon {
            grid-area: 1 / 1;
            width: 56cqw;
            max-height: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            mix-blend-mode: multiply;
            transition: transform 0.35s var(--ease), opacity 0.2s ease;
          }
          /* A landscape logo keeps its own shape, using the card's full width instead */
          .home-service-icon.is-wide { width: 84cqw; max-width: 100%; aspect-ratio: auto; object-fit: contain; }
          .home-service-card:hover .home-service-icon { transform: scale(1.05); }
          .home-service-desc {
            grid-area: 1 / 1;
            min-width: 0;
            max-height: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            overflow: hidden;
            padding-inline: 2cqw;
            opacity: 0;
            transform: translateY(6px);
            font-size: clamp(13px, 6cqw, 17.5px);
            font-weight: 600;
            line-height: 1.45;
            color: #14532d;
            text-align: center;
            transition: opacity 0.12s ease, transform 0.3s ease;
          }

          /* Pointing at a card brings it forward and enlarges it, while its row-mates shrink back to
             give it their room; its icon gives way to the description, under its name */
          @media (hover: hover) and (min-width: 1200px) {
            .home-services-row:has(.home-service-card:hover, .home-service-card:focus-visible) .home-service-box { transform: scale(0.92); }
            .home-services-row .home-service-card:hover,
            .home-services-row .home-service-card:focus-visible { z-index: 1; }
            .home-services-row .home-service-card:hover .home-service-box,
            .home-services-row .home-service-card:focus-visible .home-service-box { transform: scale(1.12); }
            .home-service-card:hover .home-service-icon,
            .home-service-card:focus-visible .home-service-icon { opacity: 0; }
            .home-service-card:hover .home-service-desc,
            .home-service-card:focus-visible .home-service-desc {
              opacity: 1;
              transform: none;
              transition: opacity 0.3s ease 0.12s, transform 0.4s var(--ease) 0.12s;
            }
          }
          /* Smaller and touch screens keep the face; the description has no room there */
          @media (hover: none), (max-width: 1199px) {
            .home-service-desc { display: none; }
          }

          /* Narrower screens: heading first, then the ant centred, then as many columns of cards as fit */
          @media (max-width: 1199px) {
            .home-services-stage { display: flex; flex-direction: column; padding-inline: 16px; }
            .home-services-main { display: contents; }
            .home-services-head { order: 0; margin-bottom: 16px; }
            .home-services-antTrack { order: 1; align-self: center; height: clamp(200px, 40vw, 340px); aspect-ratio: 0.61; margin: 0 0 20px; }
            .home-ant { width: 100%; }
            .home-services-grid { order: 2; display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px; }
            .home-services-row { display: contents; }
            .home-service-card { padding: 0; }
            .home-service-card:hover .home-service-box { transform: translateY(-3px); }
          }
          /* Phones: two square cards a row */
          @media (max-width: 559px) {
            /* Shorter rules and title, so "FEED SERVICES" stays on one line */
            .home-services-title { font-size: 26px; }
            .home-services-rule { width: 28px; }
            .home-services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
            .home-service-box { width: 100%; margin: 0; }
            .home-service-face { padding: 7cqw 6cqw; }
          }
        `}</style>
      </section>

      <style>{`
        .events-grid { display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 1400px; width: 100%; margin-bottom: 32px; }
        @media (min-width: 1024px) {
          .events-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr); gap: 16px; }
        }
        @media (min-width: 1280px) {
          .events-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr); gap: 14px; }
        }

        /* Dot grids round the edges of the section */
        .events-decor {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          background-image: radial-gradient(rgba(100, 116, 139, 0.3) 1.6px, transparent 2px);
          background-size: 18px 18px;
        }
        @media (max-width: 1023px) {
          .events-decor { display: none; }
        }

        /* Middle block: a white frame round a stage the views slide across */
        .events-showcase {
          position: relative;
          height: 600px;
          padding: 12px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.15);
        }
        @media (max-width: 1023px) {
          .events-showcase { height: auto; aspect-ratio: 815 / 705; }
        }
        .events-stage {
          position: relative;
          height: 100%;
          border-radius: 14px;
          overflow: hidden;
        }
        .events-slide {
          position: absolute;
          inset: 0;
          visibility: hidden;
          background: #ffffff;
        }
        .events-slide.is-on { visibility: visible; z-index: 2; }
        .events-slide.is-off { visibility: visible; z-index: 1; }
        .events-slide.in-fwd { animation: events-in-from-left 0.9s cubic-bezier(0.65, 0, 0.35, 1) both; }
        .events-slide.out-fwd { animation: events-out-to-right 0.9s cubic-bezier(0.65, 0, 0.35, 1) both; }
        .events-slide.in-back { animation: events-in-from-right 0.9s cubic-bezier(0.65, 0, 0.35, 1) both; }
        .events-slide.out-back { animation: events-out-to-left 0.9s cubic-bezier(0.65, 0, 0.35, 1) both; }
        @keyframes events-in-from-left { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes events-out-to-right { from { transform: translateX(0); } to { transform: translateX(100%); } }
        @keyframes events-in-from-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes events-out-to-left { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        @media (prefers-reduced-motion: reduce) {
          .events-slide { animation: none !important; }
          .events-slide.is-off { visibility: hidden; }
        }

        .events-mosaic { display: grid; grid-template-rows: 32fr 35fr; gap: 10px; height: 100%; }
        .events-mosaic-row { display: flex; gap: 10px; min-height: 0; }
        .events-tile {
          flex: 1 1 0;
          min-width: 0;
          padding: 0;
          border: 0;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          background: #e2e8f0;
        }
        .events-mosaic-row + .events-mosaic-row .events-tile:first-child { flex-grow: 1.1; }
        .events-tile img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .events-tile:hover img { transform: scale(1.05); }
        .events-tile:focus-visible { outline: 3px solid #ea580c; outline-offset: -3px; }

        /* One image across the whole stage, whole, over a blurred copy of itself */
        .events-full { position: relative; width: 100%; height: 100%; overflow: hidden; background: #0f172a; }
        .events-full-backdrop {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(22px) brightness(0.85);
          transform: scale(1.15);
        }
        .events-full-img { position: relative; display: block; width: 100%; height: 100%; object-fit: contain; }

        /* Arrows and dots show while the block is hovered (always on touch screens) */
        .events-arrow, .events-dots { position: absolute; z-index: 5; opacity: 0; transition: opacity 0.25s ease; }
        .events-showcase:hover .events-arrow, .events-showcase:hover .events-dots,
        .events-showcase:has(:focus-visible) .events-arrow, .events-showcase:has(:focus-visible) .events-dots { opacity: 1; }
        @media (hover: none) {
          .events-arrow, .events-dots { opacity: 1; }
        }
        .events-arrow { top: 50%; transform: translateY(-50%); }
        .events-arrow.prev { left: 24px; }
        .events-arrow.next { right: 24px; }
        .events-dots {
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.35);
          backdrop-filter: blur(6px);
        }
        .events-dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: 0;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.55);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .events-dot.is-on { width: 24px; background: #ffffff; }

        .marquee-vertical {
          animation: marquee 20s linear infinite;
        }
        .marquee-vertical:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .marquee-container {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
        }
        
        .slider-btn {
          background: rgba(255,255,255,0.9);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          transition: all 0.2s;
          color: #1e3a8a;
          backdrop-filter: blur(10px);
        }
        .slider-btn:hover {
          background: #fff;
          transform: scale(1.1);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        /* Premium List Item Hover Effects */
        .premium-list-item {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 12px;
          margin: 0 12px;
        }
        .premium-list-item:hover {
          background-color: #ffffff;
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08);
          border-bottom-color: transparent;
          z-index: 10;
          position: relative;
        }
      `}</style>

      {/* Events & Updates Section */}
      <div id="events-updates" style={{ position: 'relative', width: '100%', padding: '32px 20px 40px', backgroundColor: '#f8fafc', backgroundImage: 'radial-gradient(at 0% 0%, rgba(191, 219, 254, 0.45) 0px, transparent 45%), radial-gradient(at 100% 0%, rgba(253, 186, 116, 0.35) 0px, transparent 45%), radial-gradient(at 0% 100%, rgba(253, 186, 116, 0.3) 0px, transparent 45%), radial-gradient(at 100% 100%, rgba(251, 207, 232, 0.3) 0px, transparent 45%)', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        <div className="events-decor" style={{ top: '24px', left: '3%', width: '126px', height: '72px' }}></div>
        <div className="events-decor" style={{ top: '84px', right: '2%', width: '72px', height: '72px' }}></div>
        <div className="events-decor" style={{ bottom: '40px', right: '1%', width: '54px', height: '126px' }}></div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#0f2a5c', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            EVENTS <span style={{ color: '#ea580c' }}>&</span> UPDATES
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
            <div style={{ width: '100px', height: '3px', background: 'linear-gradient(90deg, transparent, #ea580c)' }}></div>
            <Leaf size={28} color="#16a34a" fill="#16a34a" />
            <div style={{ width: '100px', height: '3px', background: 'linear-gradient(270deg, transparent, #ea580c)' }}></div>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="events-grid" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Left Column: Central/State Updates */}
          <div style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: '28px', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', padding: '22px 18px 22px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', borderBottom: '4px solid #3b82f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
                  <Landmark size={22} color="#fff" />
                </div>
                <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '700', margin: 0, letterSpacing: '0.5px' }}>Central / State Updates</h3>
              </div>
              <MoreHorizontal color="rgba(255,255,255,0.6)" />
            </div>
            <div className="marquee-container" style={{ padding: '12px 0', position: 'relative' }}>
              <div className="marquee-vertical">
                {/* Render the list twice for seamless loop */}
                {[...centralStateUpdates, ...centralStateUpdates].map((item, idx) => (
                  <div key={idx} className="premium-list-item">
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `${item.color}15`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800', color: item.color, fontSize: '12px' }}>
                      {item.source.substring(0, 4)}
                    </div>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <h4 style={{ color: item.color, fontSize: '14px', fontWeight: '800', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.source}</h4>
                      <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5', margin: '0 0 12px 0', fontWeight: '600' }}>{item.title}</p>
                      <a href="#" style={{ fontSize: '13px', color: '#2563eb', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eff6ff', padding: '4px 12px', borderRadius: '20px', transition: 'background 0.2s' }} onMouseOver={(e)=>e.currentTarget.style.background='#dbeafe'} onMouseOut={(e)=>e.currentTarget.style.background='#eff6ff'}>
                        Read More <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column: the mosaic of every image, then each image on its own, sliding left to right */}
          <div className="events-showcase" ref={eventsShowcaseRef} role="region" aria-roledescription="carousel" aria-label="Events gallery"
            onMouseEnter={() => setEventsPaused(true)} onMouseLeave={() => setEventsPaused(false)}>
            <div className="events-stage">
              {Array.from({ length: EVENTS_VIEW_COUNT }, (_, idx) => {
                const { at, from, dir } = eventsView;
                const way = dir > 0 ? 'fwd' : 'back';
                const role = idx === at ? `is-on${from !== null ? ` in-${way}` : ''}` : idx === from ? `is-off out-${way}` : '';
                const image = eventsImages[idx - 1];
                return (
                  <div key={idx} className={`events-slide ${role}`} inert={idx !== at}>
                    {idx === 0 ? (
                      <div className="events-mosaic">
                        {[eventsImages.slice(0, 3), eventsImages.slice(3)].map((row, r) => (
                          <div key={r} className="events-mosaic-row">
                            {row.map((img, i) => (
                              <button key={img.src} type="button" className="events-tile" aria-label={img.alt}
                                onClick={() => showEventsView(r * 3 + i + 1, 1)}>
                                <img src={img.src} alt="" style={{ objectPosition: img.focus }} />
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="events-full">
                        <img className="events-full-backdrop" src={image.src} alt="" />
                        <img className="events-full-img" src={image.src} alt={image.alt} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="events-arrow prev">
              <button type="button" className="slider-btn" aria-label="Previous" onClick={() => stepEventsView(-1)}>
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="events-arrow next">
              <button type="button" className="slider-btn" aria-label="Next" onClick={() => stepEventsView(1)}>
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="events-dots">
              {Array.from({ length: EVENTS_VIEW_COUNT }, (_, idx) => (
                <button key={idx} type="button" className={`events-dot${eventsView.at === idx ? ' is-on' : ''}`}
                  aria-label={idx === 0 ? 'Show all' : `Show image ${idx}`}
                  onClick={() => showEventsView(idx, idx > eventsView.at ? 1 : -1)} />
              ))}
            </div>
          </div>

          {/* Right Column: FEED Services */}
          <div style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: '28px', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ background: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)', padding: '22px 18px 22px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', borderBottom: '4px solid #22c55e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
                  <Leaf size={22} color="#fff" />
                </div>
                <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '700', margin: 0, letterSpacing: '0.5px' }}>FEED Services</h3>
              </div>
              <MoreHorizontal color="rgba(255,255,255,0.6)" />
            </div>
            <div className="marquee-container" style={{ padding: '12px 0', position: 'relative' }}>
              <div className="marquee-vertical">
                {/* Render the list twice for seamless loop */}
                {[...feedServicesList, ...feedServicesList].map((item, idx) => (
                  <div key={idx} className="premium-list-item" style={{ alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${item.color}20` }}>
                      <item.icon size={24} color={item.color} />
                    </div>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <h4 style={{ color: '#166534', fontSize: '15.5px', fontWeight: '800', margin: '0 0 4px 0' }}>{item.title}</h4>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.4', margin: 0, fontWeight: '500' }}>{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (item.title === 'My Exports') {
                          onNavigate('exports');
                        }
                        if (item.title === 'My Business') {
                          onNavigate('mybusiness');
                        }
                      }}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e)=>{e.currentTarget.style.backgroundColor='#16a34a'; e.currentTarget.children[0].style.color='#fff'}} onMouseOut={(e)=>{e.currentTarget.style.backgroundColor='#f1f5f9'; e.currentTarget.children[0].style.color='#166534'}}>
                      <ChevronRight size={16} color="#166534" strokeWidth={3} style={{ transition: 'color 0.2s' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
