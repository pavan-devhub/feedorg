import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Download, PlayCircle, FileText, Shield, Home as HomeIcon, Users, Settings, Calendar, Map, Activity, Users2, Globe2, PhoneCall, Trophy, BadgeCheck, ShieldCheck, Star, User, UserPlus, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Sprout, Building2, Ship, Coins, Package, TrendingUp, GraduationCap, ClipboardList, Store, HeartHandshake, Wrench, Lightbulb, ShoppingBag, CreditCard, Target, Eye, Rocket, Search, Leaf, Landmark, PieChart, BarChart3, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import AboutUs from './AboutUs';
import Navbar, { servicesMegaMenu } from './Navbar';
import './Navbar.css';
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

const eventsSliderImages = [
  '/1.jpg',
  '/2.jpg',
  '/3.jpg',
  '/5.jpg'
];

const Home = ({ onNavigate }) => {
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
    { value: '360Â°', label: 'Export support ecosystem', Icon: Globe2 },
    { value: 'MSCS', label: 'Registered cooperative society', Icon: ShieldCheck }
  ];
  
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="home-landing-page" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
     
      <Navbar onNavigate={onNavigate} />

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
            backgroundImage: `url('/home-header.png')`, 
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
        <div style={{ position: 'absolute', top: '100px', right: '1.5%', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#ffffff', borderRadius: '24px', cursor: 'pointer', position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <Globe2 size={20} color="#ea580c" strokeWidth={2} />
            <select 
              value={i18n.language} 
              onChange={handleLanguageChange}
              style={{ background: 'transparent', color: '#111827', border: 'none', outline: 'none', fontSize: '14px', fontWeight: '700', appearance: 'none', paddingRight: '16px', cursor: 'pointer' }}
            >
              <option value="en">English</option>
              <option value="hi">à¤¹à¤¿à¤‚à¤¦à¥€</option>
              <option value="te">à°¤à±†à°²à±à°—à±</option>
            </select>
            <ChevronDown size={16} color="#111827" style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }} />
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

      {/* 5. Bottom Trusted Ribbon */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', paddingBottom: '40px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px 40px', borderRadius: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxWidth: '1200px', width: '100%' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px dashed #fcd34d', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f59e0b' }}>
              <Trophy size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Serving Farmers</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937', whiteSpace: 'nowrap' }}>Across Multiple States</div>
            </div>
          </div>
          
          <div style={{ width: '1px', height: '40px', backgroundColor: '#e5e7eb' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px dashed #86efac', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#22c55e' }}>
              <BadgeCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Trusted by Thousands</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937', whiteSpace: 'nowrap' }}>of Members</div>
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', backgroundColor: '#e5e7eb' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px dashed #86efac', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#22c55e' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Transparent &</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937', whiteSpace: 'nowrap' }}>Ethical Practices</div>
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', backgroundColor: '#e5e7eb' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px dashed #fcd34d', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f59e0b' }}>
              <Star size={24} />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Committed to Quality</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937', whiteSpace: 'nowrap' }}>& Excellence</div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. About Us Section */}
      <AboutUs />

      {/* Services Block (Extracted from Dropdown) */}
      <div id="services-block" ref={servicesBlockRef} style={{ width: '100%', padding: '60px 20px', backgroundColor: '#e2e8f0', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '1300px',
          minHeight: '750px',
          backgroundImage: 'url(/services-bg.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          borderRadius: '32px',
          boxShadow: '0 30px 60px -15px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Spacer to push grid down into the white block */}
          <div style={{ height: '35%', minHeight: '260px', width: '100%' }}></div>

          <style>{`
            @keyframes flyInLeft { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes flyInRight { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes flyInTop { from { opacity: 0; transform: translateY(-80px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes flyInBottom { from { opacity: 0; transform: translateY(80px); } to { opacity: 1; transform: translateY(0); } }
            
            .service-btn-animated {
              opacity: 0;
            }
          `}</style>

          {/* Buttons Grid container positioned tightly in the white space */}
          <div style={{ 
            flex: 1,
            padding: '0 4% 4% 4%', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gridAutoRows: 'min-content',
            gap: '16px',
          }}>
            {servicesMegaMenu.map((service, sIdx) => {
              const animations = ['flyInLeft', 'flyInTop', 'flyInBottom', 'flyInRight'];
              const animName = animations[sIdx % 4];
              return (
              <div key={sIdx} 
                className="srv-card service-btn-animated"
                style={{ 
                  animation: isServicesVisible ? `${animName} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${sIdx * 0.05}s forwards` : 'none'
                }}
              >
                <div className={`srv-card-badge color-${service.color}`}>{service.num}</div>
                <div className="srv-card-content">
                  <div className={`srv-icon-circle color-${service.color}`}>
                    <img src={service.img} alt={service.name} className="srv-card-image" />
                  </div>
                  <div className="srv-card-text-area">
                    <h3>{service.name}</h3>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
        
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
          }
          .slider-btn:hover {
            background: #fff;
            transform: scale(1.05);
          }
        `}</style>
      </div>

      {/* Events & Updates Section */}
      <div id="events-updates" style={{ width: '100%', padding: '60px 20px', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#1e3a8a', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            EVENTS <span style={{ color: '#ea580c' }}>&</span> UPDATES
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
            <div style={{ width: '120px', height: '2px', backgroundColor: '#ea580c' }}></div>
            <Leaf size={32} color="#16a34a" fill="#16a34a" />
            <div style={{ width: '120px', height: '2px', backgroundColor: '#ea580c' }}></div>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="events-grid">
          
          {/* Left Column: Central/State Updates */}
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ backgroundColor: '#1e3a8a', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Landmark size={20} color="#1e3a8a" />
                </div>
                <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 }}>Central / State Updates</h3>
              </div>
              <MoreHorizontal color="#fff" />
            </div>
            <div className="marquee-container" style={{ padding: '0 24px', position: 'relative' }}>
              <div className="marquee-vertical">
                {/* Render the list twice for seamless loop */}
                {[...centralStateUpdates, ...centralStateUpdates].map((item, idx) => (
                  <div key={idx} style={{ padding: '24px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800', color: item.color, fontSize: '12px' }}>
                      {item.source.substring(0, 4)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: item.color, fontSize: '15px', fontWeight: '800', margin: '0 0 6px 0' }}>{item.source}</h4>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', margin: '0 0 10px 0', fontWeight: '600' }}>{item.title}</p>
                      <a href="#" style={{ fontSize: '12px', color: '#2563eb', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Click Here <ChevronRight size={14} color="#2563eb" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column: Image Carousel */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '600px', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.1)' }}>
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
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ backgroundColor: '#16a34a', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Leaf size={20} color="#16a34a" />
                </div>
                <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 }}>FEED Services</h3>
              </div>
              <MoreHorizontal color="#fff" />
            </div>
            <div className="marquee-container" style={{ padding: '0 24px', position: 'relative' }}>
              <div className="marquee-vertical">
                {/* Render the list twice for seamless loop */}
                {[...feedServicesList, ...feedServicesList].map((item, idx) => (
                  <div key={idx} style={{ padding: '20px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={26} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: '#166534', fontSize: '15px', fontWeight: '800', margin: '0 0 6px 0' }}>{item.title}</h4>
                      <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: '1.4', margin: 0, fontWeight: '600' }}>{item.desc}</p>
                    </div>
                    <button style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #cbd5e1', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ChevronRight size={14} color="#166534" strokeWidth={3} />
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
