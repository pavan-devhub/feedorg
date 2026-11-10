import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Download, PlayCircle, FileText, Shield, Home as HomeIcon, Users, Settings, Calendar, Map, Activity, Users2, Globe2, PhoneCall, Trophy, BadgeCheck, ShieldCheck, Star, User, UserPlus, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Sprout, Building2, Ship, Package, TrendingUp, GraduationCap, ClipboardList, Store, HeartHandshake, Wrench, Lightbulb, ShoppingBag, CreditCard, Target, Eye, Rocket, Search, Landmark, PieChart, BarChart3, Cloud, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import HomeTiles from '../components/HomeTiles';
import HomeStats from '../components/HomeStats';
import HomeGallery from '../components/HomeGallery';
import HomeTestimonials from '../components/HomeTestimonials';
import HomePartner from '../components/HomePartner';
import SailingShip from '../components/SailingShip';
import HomeServices from '../components/HomeServices';
import Navbar from '../components/Navbar';
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

// Hero slider: the photo, then the video. Named for the dots' labels
const HERO_SLIDES = ['photo', 'video'];

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

  const aboutUsBlockRef = useRef(null);
  const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);

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
      // Leaving the video early (from its dot) stops it, so it doesn't keep playing out of sight
      videoRef.current?.pause();
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

        {/* Slide dots: one per slide, tapping one jumps straight to it */}
        <div className="hero-dots">
          {HERO_SLIDES.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`hero-dot${currentSlide === i ? ' is-on' : ''}`}
              aria-label={`Show ${label}`}
              aria-current={currentSlide === i}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>

        <style>{`
          /* Centred in the contact bar's row, above it so the bar doesn't catch the taps */
          .hero-dots {
            position: absolute;
            left: 50%;
            bottom: 23px;
            z-index: 25;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.35);
            backdrop-filter: blur(6px);
          }
          .hero-dot {
            position: relative;
            width: 10px;
            height: 10px;
            padding: 0;
            border: 0;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.55);
            cursor: pointer;
            transition: width 0.3s ease, background-color 0.3s ease;
          }
          /* A bigger target than the dot itself, for fingers */
          .hero-dot::before { content: ''; position: absolute; inset: -8px -5px; }
          .hero-dot:hover { background: rgba(255, 255, 255, 0.85); }
          .hero-dot.is-on { width: 28px; background: #ffffff; }
          .hero-dot:focus-visible { outline: 2px solid #ffffff; outline-offset: 3px; }
          /* Narrower screens have no room in the bar's row, so the dots sit just above it */
          @media (max-width: 1023px) {
            .hero-dots { bottom: 88px; }
          }
        `}</style>

      </div>

      {/* The four opening tiles: About FEED, FEED Services, KYJ project, Benefits of becoming a member */}
      <HomeTiles onNavigate={onNavigate} />

      {/* The navbar project's ship, sailing over its waves above the services block */}
      <SailingShip />

      {/* Services Block: the ant artwork on the left, the heading and service cards on its right */}
      <HomeServices id="services-block" onNavigate={onNavigate} />

      <style>{`
        .events-grid { display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 1400px; width: 100%; margin-bottom: 32px; }
        @media (min-width: 1024px) {
          .events-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr); gap: 16px; }
        }
        @media (min-width: 1280px) {
          .events-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr); gap: 14px; }
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
          flex: 1 1 0;
          min-height: 0;
        }
        /* The View All strip under each side card's list: a short pill in the card's own colour */
        .events-viewall-bar {
          flex: none;
          display: flex;
          justify-content: center;
          padding: 12px 16px 16px;
          border-top: 1px solid rgba(15, 23, 42, 0.06);
        }
        .events-viewall {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border: 0;
          border-radius: 999px;
          background: var(--tone);
          color: #ffffff;
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          box-shadow: 0 6px 14px -6px var(--tone);
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .events-viewall:hover { transform: translateY(-1px); filter: brightness(1.12); }
        .events-viewall:focus-visible { outline: 2px solid var(--tone); outline-offset: 3px; }
        
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
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#0f2a5c', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            EVENTS <span style={{ color: '#ea580c' }}>&</span> UPDATES
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
            <div style={{ width: '100px', height: '3px', background: 'linear-gradient(90deg, transparent, #ea580c)' }}></div>
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
            <div className="events-viewall-bar">
              <button type="button" className="events-viewall" style={{ '--tone': '#1e40af' }}>
                View All <ArrowRight size={14} />
              </button>
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
                {/* The navbar's FEED logo, on the same white badge so it reads against the green */}
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', boxSizing: 'border-box' }}>
                  <img src="/dashboard-logo.avif" alt="FEED MSCS LTD" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '19px', fontWeight: '700', margin: 0, letterSpacing: '0.5px' }}>FEED Services</h3>
              </div>
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
            <div className="events-viewall-bar">
              {/* Every service is laid out in the Services block further up the page */}
              <button type="button" className="events-viewall" style={{ '--tone': '#15803d' }}
                onClick={() => document.getElementById('services-block')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                View All <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEED in numbers: four figures that count up when they come into view */}
      <HomeStats />

      {/* Photos from across the site and the channel's Shorts, narrowed by initiative */}
      <HomeGallery />

      <HomeTestimonials />

      <HomePartner />

      <Footer />
    </div>
  );
};

export default Home;
