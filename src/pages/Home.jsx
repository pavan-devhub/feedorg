import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Download, PlayCircle, FileText, Shield, Home as HomeIcon, Users, Settings, Calendar, Map, Activity, Users2, Globe2, PhoneCall, Trophy, BadgeCheck, ShieldCheck, Star, User, UserPlus, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Sprout, Building2, Ship, Package, TrendingUp, GraduationCap, ClipboardList, Store, HeartHandshake, Wrench, Lightbulb, ShoppingBag, CreditCard, Target, Eye, Rocket, Search, Leaf, Landmark, PieChart, BarChart3, MoreHorizontal, Cloud, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import AboutUs from './AboutUs';
import Navbar, { SERVICE_ROUTES } from '../components/Navbar';
import '../components/Navbar.css';
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

// Home "Our Services" cards. Labels follow the icon artwork's names; `menuName` (where the label
// differs) keys into SERVICE_ROUTES so a card opens the same page as its mega-menu twin.
const homeServiceIcons = [
  { name: 'MY ORG', img: '/icons/services/my-org.webp', desc: 'Complete organizational management covering accounts, compliance, reports, and more' },
  { name: 'MY BUSINESS', img: '/icons/services/my-business.webp', desc: 'Manage business operations, track performance, and identify growth opportunities' },
  { name: 'MY EXPORTS', img: '/icons/services/my-exports.webp', desc: 'Step-by-step guidance through the complete export process' },
  { name: 'PROJECT KRUSHI YEVA JAYATE', menuName: 'KRUSHI YEVA JAYATE', img: '/icons/services/krushi-yeva-jayate.webp', desc: 'Practical, step-by-step export execution with simplified options and real-time notifications' },
  { name: 'PRODUCT 360', img: '/icons/services/product-360.webp', desc: 'Comprehensive guide of a product—from seed selection to export quality compliance' },
  { name: 'SAFE MISSION', img: '/icons/services/safe-mission.webp', desc: 'A structured pathway to sustainable farming, quality production, export readiness, and market access' },
  // Same artwork the navbar's Services mega menu uses for MY MARKET
  { name: 'MY MARKET', img: '/icons/icon-product-selection.avif', desc: 'A B2B marketplace that connects businesses with buyers and expands access to new markets' },
  { name: 'EPM', img: '/icons/services/epm.webp', desc: 'A district-level institutional platform that builds export awareness and activates the district’s pathway to global markets' },
  { name: 'TRADE FAIRS', img: '/icons/services/trade-fairs.webp', desc: 'Discover domestic and international trade fairs, buyer–seller meets, and reverse buyer–seller meets worldwide' },
  { name: 'MY EDUCATION', img: '/icons/services/my-education.webp', desc: 'Practical skill oriented courses to make you market-ready entrepreneurs' },
  { name: 'FEED WORLD', img: '/icons/services/feed-world.webp', desc: 'A monthly publication covering Indian and international markets, trends, innovations, initiatives, opportunities, and success stories' },
  { name: 'FEED CARD', img: '/icons/services/feed-card.webp', desc: 'A reward-based discount card offering benefits across multiple categories through Krishi Coins' },
  { name: 'MY TOOLS', img: '/icons/services/my-tools.webp', desc: 'Handy tools for quick and easy access to essential resources' },
  { name: 'KNOW YOUR SCHEMES', img: '/icons/services/know-your-schemes.webp', desc: 'Access Central and State Government schemes through one unified platform' },
  { name: 'LOANS & FINANCE', img: '/icons/services/loans-finance.webp', desc: 'Connect with trusted financial partners and access tailored solutions for every financial need' },
  { name: 'YUVA KRISHI', menuName: 'YUVA KRUSHI', img: '/icons/services/yuva-krishi.webp', desc: 'A pathway for young professionals to become agripreneurs' },
];

const featureTags = [
  { id: 1, title: 'Pan India Presence', desc: 'Multiple states, one mission', icon: Globe2, color: '#8b5cf6' },
  { id: 2, title: 'Farmer First Approach', desc: 'Empowering rural communities', icon: Users, color: '#22c55e' },
  { id: 3, title: 'Cooperative Strength', desc: 'Stronger together', icon: HeartHandshake, color: '#f97316' },
  { id: 4, title: 'Export Focused', desc: 'Global opportunities', icon: TrendingUp, color: '#0ea5e9' },
  { id: 5, title: 'Transparent & Trusted', desc: 'Building lasting partnerships', icon: ShieldCheck, color: '#6366f1' },
];

const eventsSliderImages = [
  '/hero-banner-1.avif',
  '/hero-banner-2.avif',
  '/hero-banner-3.avif',
  '/hero-banner-4.avif'
];

const Home = ({ onNavigate, searchQuery, isLoggedIn, user, onLogout }) => {
  const { t, i18n } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const [eventsSlide, setEventsSlide] = useState(0);

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

  useEffect(() => {
    const eventsTimer = setInterval(() => {
      setEventsSlide(prev => (prev + 1) % eventsSliderImages.length);
    }, 5000);
    return () => clearInterval(eventsTimer);
  }, []);

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

      {/* Services Block: heading on top, then the ant artwork with the service cards on its right */}
      <section id="services-block" ref={servicesBlockRef} className={`home-services${isServicesVisible ? ' is-visible' : ''}`}>
        <div className="home-services-head">
          <h2 className="home-services-title">Our <span>Services</span></h2>
          <div className="home-services-divider">
            <span />
            <Leaf size={26} color="#16a34a" fill="#16a34a" />
            <span />
          </div>
        </div>

        <div className="home-services-stage">
          <div className="home-services-grid">
            {homeServiceIcons.map((service, idx) => {
              const target = SERVICE_ROUTES[service.menuName || service.name];
              // Services without a page yet render as plain boxes, matching the mega menu's inert tiles
              const Card = target ? 'button' : 'div';
              return (
                <Card
                  key={service.name}
                  {...(target ? { type: 'button', onClick: () => onNavigate(target) } : {})}
                  className="home-service-card"
                  style={{ '--i': idx }}
                >
                  {/* Both faces share one grid cell, so the box is always tall enough for the
                      description and swapping faces on hover never shifts the grid */}
                  <span className="home-service-face home-service-front" aria-hidden="true">
                    <img src={service.img} alt="" className="home-service-icon" loading="lazy" decoding="async" />
                    <span className="home-service-name">{service.name}</span>
                  </span>
                  <span className="home-service-face home-service-detail">
                    <span className="home-service-name">{service.name}</span>
                    <span className="home-service-desc">{service.desc}</span>
                  </span>
                </Card>
              );
            })}
          </div>
        </div>

        <style>{`
          .home-services { width: 100%; background: #fbfaf0; }
          .home-services-head { padding: clamp(36px, 4vw, 56px) 16px 0; text-align: center; }
          .home-services-title {
            font-size: clamp(28px, 3vw, 42px);
            font-weight: 900;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .home-services-title span { color: #ea580c; }
          .home-services-divider { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 12px; }
          .home-services-divider span { width: 100px; height: 3px; background: linear-gradient(90deg, transparent, #ea580c); }
          .home-services-divider span:last-child { background: linear-gradient(270deg, transparent, #ea580c); }

          .home-services-stage {
            /* The artwork is sized to the stage's height, so the ant's width is a fixed share of that
               height: its waving hand ends ~0.52x the height in from the left edge */
            --stage-h: 880px;
            min-height: var(--stage-h);
            padding: 32px 3% 40px calc(var(--stage-h) * 0.55 + 24px);
            display: flex;
            align-items: center;
            justify-content: center;
            background:
              linear-gradient(to bottom, #fbfaf0, rgba(251, 250, 240, 0) 80px),
              url('/services-ant.webp') left bottom / auto 100% no-repeat,
              linear-gradient(to bottom, #f6f8ea, #fcfaeb 50%, #edf0cf);
          }
          .home-services-grid {
            width: 100%;
            max-width: 1080px;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            grid-auto-rows: 1fr;
            gap: 14px;
          }
          .home-service-card {
            display: grid;
            place-items: center;
            padding: 14px 12px 16px;
            text-align: center;
            font: inherit;
            color: inherit;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            box-shadow: 0 6px 18px -8px rgba(15, 23, 42, 0.18);
            opacity: 0;
            transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
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
          .home-service-card:hover,
          .home-service-card:focus-visible {
            background: #dcfce7;
            border-color: #86efac;
            box-shadow: 0 14px 26px -12px rgba(22, 163, 74, 0.4);
            transform: translateY(-4px);
          }
          .home-service-card:focus-visible { outline: 2px solid #16a34a; outline-offset: 3px; }
          .home-service-face {
            grid-area: 1 / 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            /* The artwork has a white backdrop; multiply lets it take on the box colour, green on hover.
               It sits on the face (not the img) because the face's fade makes it its own layer */
            mix-blend-mode: multiply;
            transition: opacity 0.25s ease, transform 0.25s ease;
          }
          .home-service-detail { opacity: 0; transform: translateY(8px); }
          @media (hover: hover) {
            .home-service-card:hover .home-service-front,
            .home-service-card:focus-visible .home-service-front { opacity: 0; transform: translateY(-8px); }
            .home-service-card:hover .home-service-detail,
            .home-service-card:focus-visible .home-service-detail { opacity: 1; transform: none; }
          }
          /* Touch screens have no hover to reveal the text, so the description sits under the icon instead */
          @media (hover: none) {
            .home-service-card { display: flex; flex-direction: column; align-items: center; gap: 6px; }
            .home-service-detail { opacity: 1; transform: none; }
            .home-service-detail .home-service-name { display: none; }
          }
          .home-service-icon { display: block; width: 84px; aspect-ratio: 1; object-fit: cover; }
          .home-service-name { font-size: 14px; font-weight: 800; line-height: 1.25; letter-spacing: 0.3px; color: #0f172a; }
          .home-service-desc { font-size: 11.5px; line-height: 1.4; color: #475569; }

          /* Narrower screens: the artwork becomes a full-width banner under the heading, cards below it */
          @media (max-width: 1199px) {
            .home-services-stage {
              min-height: 0;
              padding: 0 16px 40px;
              display: block;
              background: #fbfaf0;
            }
            .home-services-stage::before {
              content: '';
              display: block;
              aspect-ratio: 1852 / 849;
              margin: 0 -16px 16px;
              background:
                linear-gradient(to bottom, #fbfaf0, rgba(251, 250, 240, 0) 15%, rgba(251, 250, 240, 0) 85%, #fbfaf0),
                url('/services-ant.webp') center / 100% auto no-repeat;
            }
            .home-services-grid { margin: 0 auto; }
          }
          @media (max-width: 719px) {
            .home-services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: auto; gap: 12px; }
            .home-service-card { padding: 12px 10px 14px; }
          }
        `}</style>
      </section>

      <style>{`
        .events-grid { display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 1400px; width: 100%; margin-bottom: 32px; }
        @media (min-width: 1024px) {
          .events-grid { grid-template-columns: 3.5fr 5.5fr 3.5fr; gap: 32px; }
        }
        
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
      <div id="events-updates" style={{ position: 'relative', width: '100%', padding: '32px 20px 40px', backgroundColor: '#fff7ed', backgroundImage: 'radial-gradient(at 0% 0%, rgba(244, 114, 182, 0.2) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(251, 146, 60, 0.2) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(250, 204, 21, 0.2) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(52, 211, 153, 0.15) 0px, transparent 50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
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
            <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '4px solid #3b82f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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

          {/* Middle Column: Image Carousel */}
          <div style={{ position: 'relative', borderRadius: '28px', overflow: 'hidden', height: '600px', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.15)', border: '4px solid #ffffff' }}>
            {eventsSliderImages.map((src, idx) => (
              <div key={idx} style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: eventsSlide === idx ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                zIndex: eventsSlide === idx ? 1 : 0
              }}></div>
            ))}
            
            {/* Arrows */}
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '20px', zIndex: 10 }}>
              <button className="slider-btn" onClick={() => setEventsSlide((prev) => (prev === 0 ? eventsSliderImages.length - 1 : prev - 1))}>
                <ChevronLeft size={24} />
              </button>
            </div>
            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '20px', zIndex: 10 }}>
              <button className="slider-btn" onClick={() => setEventsSlide((prev) => (prev + 1) % eventsSliderImages.length)}>
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Dots */}
            <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
              {eventsSliderImages.map((_, idx) => (
                <div key={idx} 
                  onClick={() => setEventsSlide(idx)}
                  style={{ 
                    width: eventsSlide === idx ? '24px' : '8px', 
                    height: '8px', 
                    borderRadius: '4px', 
                    backgroundColor: eventsSlide === idx ? '#fff' : 'rgba(255,255,255,0.5)', 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: FEED Services */}
          <div style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: '28px', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ background: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '4px solid #22c55e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
