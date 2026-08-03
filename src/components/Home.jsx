import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Download, PlayCircle, FileText, Shield, Home as HomeIcon, Users, Settings, Calendar, Map, Activity, Users2, Globe2, PhoneCall, Trophy, BadgeCheck, ShieldCheck, Star, User, UserPlus, ChevronDown, Sprout, Building2, Ship, Coins, Package, TrendingUp, GraduationCap, ClipboardList, Store, HeartHandshake, Wrench, Lightbulb, ShoppingBag, CreditCard, Target, Eye, Rocket, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoImage from '../assets/logo.webp';
import Footer from './Footer';

const Home = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesDropdownRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);

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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const servicesMegaMenu = [
    { name: 'PROJECT KRUSHI\nYEVA JAYATE', icon: Sprout, gradient: 'linear-gradient(135deg, #14532d, #064e3b)', borderColor: '#166534', iconColor: '#4ade80' },
    { name: 'MY ORG', icon: Building2, gradient: 'linear-gradient(135deg, #1e3a8a, #172554)', borderColor: '#1d4ed8', iconColor: '#60a5fa' },
    { name: 'MY EXPORTS', icon: Ship, gradient: 'linear-gradient(135deg, #0c4a6e, #082f49)', borderColor: '#0369a1', iconColor: '#38bdf8' },
    { name: 'LOANS & FINANCE', icon: Coins, gradient: 'linear-gradient(135deg, #78350f, #451a03)', borderColor: '#9a3412', iconColor: '#fbbf24' },
    { name: 'PRODUCT 360', icon: Package, gradient: 'linear-gradient(135deg, #581c87, #3b0764)', borderColor: '#7e22ce', iconColor: '#c084fc' },
    { name: 'MY BUSINESS', icon: TrendingUp, gradient: 'linear-gradient(135deg, #064e3b, #022c22)', borderColor: '#047857', iconColor: '#34d399' },
    { name: 'MY EDUCATION', icon: GraduationCap, gradient: 'linear-gradient(135deg, #312e81, #1e1b4b)', borderColor: '#4338ca', iconColor: '#818cf8' },
    { name: 'FEED WORLD', icon: Globe2, gradient: 'linear-gradient(135deg, #1e40af, #1e3a8a)', borderColor: '#2563eb', iconColor: '#93c5fd' },
    { name: 'EPM', icon: ClipboardList, gradient: 'linear-gradient(135deg, #334155, #1e293b)', borderColor: '#475569', iconColor: '#cbd5e1' },
    { name: 'TRADE FAIRS', icon: Store, gradient: 'linear-gradient(135deg, #7c2d12, #431407)', borderColor: '#c2410c', iconColor: '#fb923c' },
    { name: 'SAFE MISSION', icon: ShieldCheck, gradient: 'linear-gradient(135deg, #166534, #14532d)', borderColor: '#15803d', iconColor: '#4ade80' },
    { name: 'MY TOOLS', icon: Wrench, gradient: 'linear-gradient(135deg, #0f766e, #134e4a)', borderColor: '#0d9488', iconColor: '#5eead4' },
    { name: 'KNOW YOUR\nSCHEMES', icon: Lightbulb, gradient: 'linear-gradient(135deg, #854d0e, #713f12)', borderColor: '#a16207', iconColor: '#facc15' },
    { name: 'MY MARKET', icon: ShoppingBag, gradient: 'linear-gradient(135deg, #831843, #4c0519)', borderColor: '#be185d', iconColor: '#f472b6' },
    { name: 'FEED CARD', icon: CreditCard, gradient: 'linear-gradient(135deg, #155e75, #164e63)', borderColor: '#0e7490', iconColor: '#22d3ee' }
  ];

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
     
      {/* Background Blur Overlay for Services Menu */}
      {isServicesOpen && (
        <div 
          onClick={() => setIsServicesOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 40,
            transition: 'all 0.3s ease'
          }} 
        />
      )}

      {/* 3. Navigation Bar (Redesigned) */}
      <div style={{ width: '100%', position: 'absolute', top: '10px', left: 0, zIndex: 50, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          position: 'relative',
          width: '96%',
          maxWidth: '1400px',
          height: '76px',
          backgroundColor: 'white',
          borderRadius: '40px',
          display: 'flex',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          
          {/* Left Orange Shape */}
          <svg width="260" height="100%" viewBox="0 0 260 76" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, top: 0, zIndex: 0 }}>
            <defs>
              <linearGradient id="navOrangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <path d="M0,0 L160,0 C210,0 190,76 260,76 L0,76 Z" fill="url(#navOrangeGrad)" />
          </svg>

          {/* Right Orange Shape */}
          <svg width="250" height="100%" viewBox="0 0 250 76" preserveAspectRatio="none" style={{ position: 'absolute', right: 0, top: 0, zIndex: 0 }}>
            <path d="M50,0 C120,0 90,76 200,76 L250,76 L250,0 Z" fill="#ffedd5" opacity="0.8" />
          </svg>

          {/* Content Container */}
          <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Left Home Button (Replacing Logo) */}
          <div 
            onClick={() => onNavigate('home')}
            style={{ width: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: '10px', cursor: 'pointer', position: 'relative' }}
          >
            <HomeIcon size={24} color="white" strokeWidth={1.5} />
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'white', marginTop: '2px', letterSpacing: '0.5px' }}>Home</span>
            <div style={{ position: 'absolute', bottom: '-4px', width: '30px', height: '3px', backgroundColor: 'white', borderRadius: '2px' }}></div>
          </div>

          {/* Center Links Section */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '28px', height: '100%' }}>
            {[
              { id: 'about', icon: Users, label: 'About Us', hasDropdown: true },
              { id: 'services', icon: Settings, label: 'Services', hasDropdown: true },
              { id: 'events', icon: Calendar, label: 'Events & Updates' },
              { id: 'roadmap', icon: Map, label: 'Export Road Map' },
              { id: 'how', icon: Activity, label: 'How Feed Works' },
              { id: 'fpo', icon: Users, label: 'FPO' },
              { id: 'exports', icon: Package, label: 'Exports' },
              { id: 'contact', icon: PhoneCall, label: 'Contact Us' }
            ].map((item) => {
              const isActive = item.id === 'home';
              return (
                <div 
                  key={item.id}
                  ref={item.id === 'services' ? servicesDropdownRef : null}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '4px',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onClick={() => {
                    if (item.id === 'home') onNavigate('home');
                    if (item.id === 'services') setIsServicesOpen(!isServicesOpen);
                    if (item.id === 'about') {
                      const el = document.getElementById('about-us');
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  <item.icon size={20} color="#ea580c" strokeWidth={1.5} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      color: '#1e293b',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.label}
                    </span>
                    {item.hasDropdown && <ChevronDown size={12} color="#1e293b" strokeWidth={3} />}
                  </div>
                  {isActive && (
                    <div style={{ position: 'absolute', bottom: '-8px', width: '30px', height: '3px', backgroundColor: '#ea580c', borderRadius: '2px' }}></div>
                  )}

                  {/* Stunning Services Dropdown */}
                  {item.id === 'services' && isServicesOpen && (
                    <div style={{
                      position: 'fixed',
                      top: '100px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '940px',
                      height: '620px', 
                      backgroundImage: 'url(/services-bg.png)',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '24px',
                      boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6)',
                      zIndex: 9999,
                      cursor: 'default',
                      display: 'flex',
                      flexDirection: 'column'
                    }} onClick={(e) => e.stopPropagation()}>
                      
                      {/* Spacer to push grid down into the white block (approx 32% from top) */}
                      <div style={{ height: '32%', width: '100%' }}></div>

                      {/* Buttons Grid container positioned tightly in the white space */}
                      <div style={{ 
                        flex: 1,
                        padding: '0 5% 5% 5%', // Left, right, bottom padding to align with white boundaries
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(4, 1fr)', 
                        gridAutoRows: 'min-content',
                        gap: '12px',
                      }}>
                        {servicesMegaMenu.map((service, sIdx) => (
                          <div key={sIdx} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px', 
                            padding: '10px 12px', 
                            borderRadius: '12px', 
                            background: service.gradient,
                            border: `1px solid ${service.borderColor}`,
                            transition: 'all 0.2s', 
                            cursor: 'pointer',
                            height: '72px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                          }} 
                          onMouseEnter={(e) => { 
                            e.currentTarget.style.transform = 'translateY(-2px)'; 
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)'; 
                            e.currentTarget.style.borderColor = '#475569';
                          }} 
                          onMouseLeave={(e) => { 
                            e.currentTarget.style.transform = 'none'; 
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)'; 
                            e.currentTarget.style.borderColor = service.borderColor;
                          }}>
                            <div style={{ 
                              width: '42px', 
                              height: '42px', 
                              borderRadius: '10px', 
                              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                              display: 'flex', 
                              justifyContent: 'center', 
                              alignItems: 'center', 
                              color: service.iconColor, 
                              flexShrink: 0,
                              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.05)'
                            }}>
                              <service.icon size={24} />
                            </div>
                            <span style={{ 
                              fontSize: '12px', 
                              fontWeight: '800', 
                              color: '#f8fafc', // White text for dark background
                              textTransform: 'uppercase', 
                              letterSpacing: '0.2px',
                              lineHeight: '1.2',
                              whiteSpace: 'pre-line'
                            }}>
                              {service.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingRight: '20px' }}>
            <button style={{ 
              width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'white', 
              border: '1.5px solid #ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Search size={16} color="#ea580c" strokeWidth={2.5} />
            </button>

            <div style={{ width: '1.5px', height: '24px', backgroundColor: '#ea580c', opacity: 0.5 }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={() => onNavigate('login')}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'white', 
                  border: '1.5px solid #ea580c', color: '#1e293b', padding: '0 16px', height: '36px', borderRadius: '18px', 
                  fontWeight: '700', fontSize: '13px', cursor: 'pointer'
                }}>
                <User size={14} color="#ea580c" strokeWidth={2.5} />
                Login
              </button>

              <button 
                onClick={() => onNavigate('register')}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ea580c', 
                  border: 'none', color: 'white', padding: '0 16px', height: '36px', borderRadius: '18px', 
                  fontWeight: '700', fontSize: '13px', cursor: 'pointer'
                }}>
                <UserPlus size={14} color="white" strokeWidth={2.5} />
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

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
              <option value="hi">हिंदी</option>
              <option value="te">తెలుగు</option>
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

      {/* 6. Cartoonish About Us Section */}
      <div id="about-us" style={{ padding: '60px 20px', backgroundColor: '#fffbe9', position: 'relative', overflow: 'hidden', borderTop: '3px solid #111' }}>
        
        {/* Playful Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '50px', backgroundColor: '#bbf7d0', border: '2px solid #111', boxShadow: '3px 3px 0px #111', color: '#166534', fontSize: '13px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', transform: 'rotate(-2deg)' }}>
            <Sprout size={16} />
            Who We Are
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', color: '#111', margin: 0, letterSpacing: '-1.5px', textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
            About FEED
          </h2>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Main Objectives (2 Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#fed7aa', padding: '24px 20px', borderRadius: '24px', border: '3px solid #111', boxShadow: '5px 5px 0px #111', transition: 'all 0.2s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)'; e.currentTarget.style.boxShadow = '8px 8px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: '#fff', border: '3px solid #111', boxShadow: '3px 3px 0px #111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Users2 size={28} color="#ea580c" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 8px', color: '#111' }}>Farmers & MSMEs</h3>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#431407', margin: 0, lineHeight: '1.5' }}>
                Uplifting farmers, traders, MSME industries & new entrepreneurs in Rural and Semi Urban areas.
              </p>
            </div>

            <div style={{ backgroundColor: '#bae6fd', padding: '24px 20px', borderRadius: '24px', border: '3px solid #111', boxShadow: '5px 5px 0px #111', transition: 'all 0.2s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)'; e.currentTarget.style.boxShadow = '8px 8px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: '#fff', border: '3px solid #111', boxShadow: '3px 3px 0px #111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Globe2 size={28} color="#0284c7" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 8px', color: '#111' }}>Global Markets</h3>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#082f49', margin: 0, lineHeight: '1.5' }}>
                Connecting to International markets, Export Promotional councils, Central/State govts, Banks & ports.
              </p>
            </div>
          </div>

          {/* Vision and Mission (Bubble Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#e9d5ff', padding: '24px 20px', borderRadius: '40px 40px 40px 10px', border: '3px solid #111', boxShadow: '5px 5px 0px #111', position: 'relative', transition: 'all 0.2s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)'; e.currentTarget.style.boxShadow = '8px 8px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }}>
              <div style={{ position: 'absolute', top: '-18px', right: '20px', backgroundColor: '#fff', border: '3px solid #111', borderRadius: '50%', padding: '8px', boxShadow: '3px 3px 0px #111' }}>
                <Eye size={24} color="#9333ea" />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 12px', color: '#111' }}>Our Vision</h3>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#3b0764', margin: 0, lineHeight: '1.5' }}>
                To spread to all corners of India and emerge as a one-stop solution to farmers, small traders, MSMEs, new entrepreneurs from rural and semi-urban areas for marketing their agricultural commodities in domestic and International markets by means of effective technical interface.
              </p>
            </div>

            <div style={{ backgroundColor: '#fef08a', padding: '24px 20px', borderRadius: '40px 40px 10px 40px', border: '3px solid #111', boxShadow: '5px 5px 0px #111', position: 'relative', transition: 'all 0.2s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)'; e.currentTarget.style.boxShadow = '8px 8px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }}>
              <div style={{ position: 'absolute', top: '-18px', left: '20px', backgroundColor: '#fff', border: '3px solid #111', borderRadius: '50%', padding: '8px', boxShadow: '3px 3px 0px #111' }}>
                <Target size={24} color="#ca8a04" />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 12px', color: '#111', textAlign: 'right' }}>Our Mission</h3>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#713f12', margin: 0, lineHeight: '1.5' }}>
                To form product based cooperative societies (FPOs), impart capacity building to export in the form of training sessions, provide information on global marketing opportunities through "FEED STARTUP", and render end-to-end support in real-time export processes.
              </p>
            </div>
          </div>

          {/* About FEED - 8 Point Grid */}
          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '26px', fontWeight: '900', textAlign: 'center', marginBottom: '20px', color: '#111' }}>Why Choose FEED?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              
              <div style={{ backgroundColor: '#fff', border: '2px solid #111', borderRadius: '16px', padding: '14px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '12px', transition: 'all 0.15s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0px #111'; }}>
                <div style={{ minWidth: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#bbf7d0', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={18} color="#166534" />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#111', margin: 0, lineHeight: '1.4' }}>
                  Registered under MSCS Act, 2002 (Regd.No. 1295/2020) in AP & Telangana.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', border: '2px solid #111', borderRadius: '16px', padding: '14px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '12px', transition: 'all 0.15s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0px #111'; }}>
                <div style={{ minWidth: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fbcfe8', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={18} color="#be185d" />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#111', margin: 0, lineHeight: '1.4' }}>
                  First-of-its-kind export based cooperative working for the uplift of farmers.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', border: '2px solid #111', borderRadius: '16px', padding: '14px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '12px', transition: 'all 0.15s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0px #111'; }}>
                <div style={{ minWidth: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#bfdbfe', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={18} color="#1d4ed8" />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#111', margin: 0, lineHeight: '1.4' }}>
                  Connects with 15+ Central Govt departments, Banks, Ports, and Councils.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', border: '2px solid #111', borderRadius: '16px', padding: '14px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '12px', transition: 'all 0.15s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0px #111'; }}>
                <div style={{ minWidth: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fed7aa', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HeartHandshake size={18} color="#c2410c" />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#111', margin: 0, lineHeight: '1.4' }}>
                  Signs MoUs with State Governments to develop export entrepreneurship.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', border: '2px solid #111', borderRadius: '16px', padding: '14px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '12px', transition: 'all 0.15s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0px #111'; }}>
                <div style={{ minWidth: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#e9d5ff', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={18} color="#7e22ce" />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#111', margin: 0, lineHeight: '1.4' }}>
                  Conducts EXPORT PROMOTIONAL MEETINGS in all districts.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', border: '2px solid #111', borderRadius: '16px', padding: '14px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '12px', transition: 'all 0.15s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0px #111'; }}>
                <div style={{ minWidth: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef08a', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={18} color="#a16207" />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#111', margin: 0, lineHeight: '1.4' }}>
                  Forms PRODUCT-BASED EXPORT ORIENTED FPOs for top 10 products.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', border: '2px solid #111', borderRadius: '16px', padding: '14px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '12px', transition: 'all 0.15s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0px #111'; }}>
                <div style={{ minWidth: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fecdd3', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wrench size={18} color="#be123c" />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#111', margin: 0, lineHeight: '1.4' }}>
                  Assists FPOs in establishing processing units for International standards.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', border: '2px solid #111', borderRadius: '16px', padding: '14px', boxShadow: '3px 3px 0px #111', display: 'flex', gap: '12px', transition: 'all 0.15s ease', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)'; e.currentTarget.style.boxShadow = '5px 5px 0px #111'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0px #111'; }}>
                <div style={{ minWidth: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#c7d2fe', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe2 size={18} color="#4338ca" />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#111', margin: 0, lineHeight: '1.4' }}>
                  Provides end-to-end support in capturing domestic & international markets.
                </p>
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
