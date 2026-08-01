import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Download, PlayCircle, FileText, Shield, Home as HomeIcon, Users, Settings, Calendar, Map, Activity, Users2, Globe2, PhoneCall, Trophy, BadgeCheck, ShieldCheck, Star, User, UserPlus, ChevronDown, Sprout, Building2, Ship, Coins, Package, TrendingUp, GraduationCap, ClipboardList, Store, HeartHandshake, Wrench, Lightbulb, ShoppingBag, CreditCard, Target, Eye, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoImage from '../assets/logo.webp';
import Footer from './Footer';

const Home = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const servicesList = [
    { name: 'PROJECT KRUSHI YEVA JAYATE', icon: Sprout, color: '#16a34a' },
    { name: 'MY ORG', icon: Building2, color: '#2563eb' },
    { name: 'MY EXPORTS', icon: Ship, color: '#0284c7' },
    { name: 'LOANS & FINANCE', icon: Coins, color: '#d97706' },
    { name: 'PRODUCT 360', icon: Package, color: '#9333ea' },
    { name: 'MY BUSINESS', icon: TrendingUp, color: '#059669' },
    { name: 'MY EDUCATION', icon: GraduationCap, color: '#4f46e5' },
    { name: 'FEED WORLD', icon: Globe2, color: '#0284c7' },
    { name: 'EPM', icon: ClipboardList, color: '#475569' },
    { name: 'TRADE FAIRS', icon: Store, color: '#ea580c' },
    { name: 'SAFE MISSION', icon: ShieldCheck, color: '#16a34a' },
    { name: 'MY TOOLS', icon: Wrench, color: '#64748b' },
    { name: 'KNOW YOUR SCHEMES', icon: Lightbulb, color: '#eab308' },
    { name: 'MY MARKET', icon: ShoppingBag, color: '#db2777' },
    { name: 'FEED CARD', icon: CreditCard, color: '#2563eb' }
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
      
      {/* 1. Top Header Bar */}
      <div className="top-header-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px', backgroundColor: 'transparent' }}>
        
        {/* Left: Contact Info */}
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              <PhoneCall size={20} />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: 'white', fontSize: '15px' }}>+91 9293858689</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{t('call_us')}</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              <Mail size={20} />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: 'white', fontSize: '15px' }}>info@feedorg.com</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>{t('mail_us')}</div>
            </div>
          </div>
        </div>

        {/* Right: Language & Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '24px', cursor: 'pointer', position: 'relative' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(to bottom, #ff9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%)', border: '1px solid #ccc' }}></div>
            <select 
              value={i18n.language} 
              onChange={handleLanguageChange}
              style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none', fontSize: '14px', fontWeight: '600', appearance: 'none', paddingRight: '16px', cursor: 'pointer' }}
            >
              <option value="en" style={{ color: 'black' }}>English</option>
              <option value="hi" style={{ color: 'black' }}>हिंदी</option>
              <option value="te" style={{ color: 'black' }}>తెలుగు</option>
            </select>
            <ChevronDown size={16} color="white" style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }} />
          </div>

          <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '4px' }}>
                <Download size={18} color="white" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'white' }}>{t('downloads')}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '4px' }}>
                <PlayCircle size={18} color="white" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'white' }}>{t('media')}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '4px' }}>
                <FileText size={18} color="white" />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'white' }}>{t('blogs')}</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* 2. Hero Section */}
      <div style={{ position: 'relative', width: '100%', height: '550px', backgroundImage: `url('/home-header.png')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center' }}>
        


        {/* Center Main Text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px', marginLeft: '100px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '30px', height: '2px', backgroundColor: '#f97316' }}></div>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#f97316' }}>Empowering Farmers</span>
            <span style={{ color: '#d1d5db' }}>•</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>Strengthening Cooperatives</span>
            <span style={{ color: '#d1d5db' }}>•</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#16a34a' }}>Building Global Future</span>
            <div style={{ width: '30px', height: '2px', backgroundColor: '#16a34a' }}></div>
          </div>

          <h1 style={{ fontSize: '52px', fontWeight: '900', color: '#f97316', textShadow: '0 2px 10px rgba(255,255,255,0.8)', margin: '0 0 4px 0', letterSpacing: '-1px' }}>FARM TO FOREIGN EXPORTS</h1>
          <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#065f46', textShadow: '0 2px 10px rgba(255,255,255,0.8)', margin: '0 0 24px 0', letterSpacing: '-0.5px' }}>ENTREPRENEURSHIP DEVELOPMENT</h1>

          <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 40px', fontSize: '20px', fontWeight: '700', position: 'relative', letterSpacing: '1px' }}>
            <div style={{ position: 'absolute', left: '-15px', top: 0, width: 0, height: 0, borderTop: '24px solid transparent', borderBottom: '24px solid transparent', borderRight: '15px solid #1e3a8a' }}></div>
            MULTI STATE COOPERATIVE SOCIETY LTD.
            <div style={{ position: 'absolute', right: '-15px', top: 0, width: 0, height: 0, borderTop: '24px solid transparent', borderBottom: '24px solid transparent', borderLeft: '15px solid #1e3a8a' }}></div>
          </div>

        </div>

        {/* Right Bottom Badge */}
        <div style={{ position: 'absolute', right: '40px', bottom: '80px', backgroundColor: 'white', padding: '12px 24px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <Shield size={32} color="#16a34a" fill="#dcfce7" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#4b5563' }}>REG.No:</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#16a34a' }}>MSCS/CR/1295/2020</div>
          </div>
        </div>

      </div>

      {/* 3. Navigation Bar (Floating over the hero bottom) */}
      <div style={{ position: 'sticky', top: '70px', zIndex: 50, height: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateY(-30px)', padding: '0 40px' }}>
        <div style={{ width: '100%', maxWidth: '1300px', background: 'rgba(6, 95, 70, 0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, justifyContent: 'flex-start' }}>
            
            {/* Active Home Tab */}
            <div style={{ backgroundColor: '#f97316', padding: '6px 16px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', cursor: 'pointer', boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.6)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.4)'; }} onClick={() => onNavigate('home')}>
              <HomeIcon size={16} style={{ marginBottom: '2px' }} />
              <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px' }}>{t('nav.home')}</span>
            </div>

            {/* Other Nav Items */}
            {[
              { id: 'about', icon: Users, label: t('nav.about_us') },
              { id: 'services', icon: Settings, label: t('nav.services') },
              { id: 'events', icon: Calendar, label: t('nav.events') },
              { id: 'roadmap', icon: Map, label: t('nav.export_road_map') },
              { id: 'how', icon: Activity, label: t('nav.how_feed_works') },
              { id: 'fpo', icon: Users2, label: t('nav.fpo') },
              { id: 'exports', icon: Globe2, label: t('nav.exports') },
              { id: 'contact', icon: Phone, label: t('nav.contact_us') }
            ].map((item, idx) => (
              <div 
                key={idx} 
                ref={item.id === 'services' ? servicesDropdownRef : null}
                style={{ position: 'relative', padding: '6px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: item.id === 'services' && isServicesOpen ? '#fff' : '#a7f3d0', cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '16px' }} 
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }} 
                onMouseLeave={(e) => { e.currentTarget.style.color = item.id === 'services' && isServicesOpen ? '#fff' : '#a7f3d0'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                onClick={() => {
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
                <item.icon size={16} style={{ marginBottom: '2px' }} />
                <span style={{ fontSize: '10px', fontWeight: '600', whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.2' }}>
                  {item.label}{item.id === 'about' || item.id === 'services' ? ' ▾' : ''}
                </span>

                {/* Stunning Services Dropdown */}
                {item.id === 'services' && isServicesOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '70px',
                    left: '0',
                    transform: 'none',
                    width: '900px',
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    boxShadow: '0 30px 60px -15px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    padding: '30px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    zIndex: 9999,
                    cursor: 'default',
                    color: '#1f2937'
                  }} onClick={(e) => e.stopPropagation()}>
                    
                    {/* Header */}
                    <div style={{ gridColumn: 'span 3', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#065f46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Settings size={24} color="#10b981" /> Our Services Ecosystem
                      </h3>
                      <p style={{ margin: '4px 0 0 32px', fontSize: '13px', color: '#6b7280' }}>Discover all the powerful tools and initiatives provided by FEED to empower your business globally.</p>
                    </div>

                    {/* Grid Items */}
                    {servicesList.map((service, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '16px', transition: 'all 0.2s', cursor: 'pointer', backgroundColor: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: `${service.color}15`, display: 'flex', justifyContent: 'center', alignItems: 'center', color: service.color, flexShrink: 0 }}>
                          <service.icon size={22} />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{service.name}</span>
                      </div>
                    ))}
                    
                  </div>
                )}
              </div>
            ))}

          </div>

          {/* Auth Buttons */}
          <div style={{ display: 'flex', gap: '8px', paddingLeft: '16px' }}>
            <button onClick={() => onNavigate('login')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: 'white', padding: '6px 14px', borderRadius: '24px', fontWeight: '600', fontSize: '11px', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}>
              <User size={14} />
              LOGIN
            </button>
            <button onClick={() => onNavigate('register')} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f97316', border: 'none', color: 'white', padding: '6px 14px', borderRadius: '24px', fontWeight: '600', fontSize: '11px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ea580c'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f97316'; e.currentTarget.style.transform = 'none'; }}>
              <UserPlus size={14} />
              REGISTER
            </button>
          </div>
          
        </div>
        </div>
      </div>

      {/* 4. Video Section */}
      <div style={{ width: '100%', position: 'relative', zIndex: 5, backgroundColor: '#000' }}>
        <video 
          src="/vid.mp4" 
          autoPlay 
          loop 
          muted 
          controls 
          style={{ width: '100%', display: 'block' }}
        >
          Your browser does not support the video tag.
        </video>
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

      {/* 6. Premium About Us Section */}
      <div id="about-us" style={{ padding: '64px 18px 68px', background: 'linear-gradient(180deg, #fffdf5 0%, #f0fdf4 48%, #f8fafc 100%)', borderTop: '1px solid rgba(22, 101, 52, 0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-150px', right: '-120px', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.16), transparent 68%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-150px', left: '-120px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34, 197, 94, 0.16), transparent 70%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(22, 101, 52, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 101, 52, 0.035) 1px, transparent 1px)', backgroundSize: '42px 42px', maskImage: 'linear-gradient(to bottom, transparent, #000 15%, #000 82%, transparent)', pointerEvents: 'none' }}></div>

        <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 14px', borderRadius: '999px', backgroundColor: 'rgba(255, 255, 255, 0.78)', border: '1px solid rgba(22, 163, 74, 0.18)', boxShadow: '0 10px 22px rgba(22, 101, 52, 0.07)', color: '#047857', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px' }}>
              <Sprout size={14} />
              Who We Are
            </div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', lineHeight: '1', fontWeight: '900', color: '#173b2d', letterSpacing: '-1.4px', margin: '0 0 12px' }}>
              Building India&apos;s most trusted farm-to-export ecosystem.
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#587266', fontWeight: '600', margin: 0 }}>
              FEED empowers farmers, FPOs, MSMEs and rural entrepreneurs with market intelligence, institutional linkages, training and end-to-end export support.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.12fr) minmax(310px, 0.88fr)', gap: '18px', alignItems: 'stretch', marginBottom: '18px' }}>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '26px', padding: '28px', background: 'linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(236, 253, 245, 0.92) 100%)', border: '1px solid rgba(255, 255, 255, 0.9)', boxShadow: '0 20px 48px rgba(20, 83, 45, 0.1), inset 0 1px 1px rgba(255,255,255,0.9)' }}>
              <div style={{ position: 'absolute', top: '-70px', right: '-70px', width: '190px', height: '190px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.14), transparent 66%)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '13px', marginBottom: '18px', position: 'relative' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '18px', background: 'linear-gradient(135deg, #16a34a, #f97316)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', boxShadow: '0 14px 26px rgba(22, 163, 74, 0.22)' }}>
                  <HeartHandshake size={27} />
                </div>
                <div>
                  <div style={{ color: '#f97316', fontSize: '11px', fontWeight: '900', letterSpacing: '1.2px', textTransform: 'uppercase' }}>About FEED</div>
                  <h3 style={{ margin: '3px 0 0', fontSize: '24px', fontWeight: '900', color: '#163529', letterSpacing: '-0.6px' }}>First-of-its-kind export based cooperative platform</h3>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '12px', color: '#496358', fontSize: '13px', lineHeight: '1.58', fontWeight: '600', position: 'relative' }}>
                <p style={{ margin: 0 }}>
                  FEED is an export-based multi-state cooperative society working to uplift exports from farmers, new entrepreneurs and MSMEs from rural and semi-urban India through product-based <strong style={{ color: '#0f766e' }}>Farmer Producer Organisations (FPOs)</strong>.
                </p>
                <p style={{ margin: 0 }}>
                  The society connects members with Central Government departments, export organizations, banks, ports, CHAs, commodity boards, embassies, FIEO, DGFT, NABARD, NCDC, ECGC, SFAC and other ecosystem partners for updated, actionable guidance.
                </p>
                <p style={{ margin: 0 }}>
                  FEED forms product-based export-oriented FPOs for the top products in every district, supports processing units, and provides hand-holding across the complete export cycle.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', marginTop: '18px', position: 'relative' }}>
                {['Export readiness', 'FPO formation', 'Market linkages', 'Training support'].map((item) => (
                  <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '8px 11px', borderRadius: '999px', backgroundColor: '#ffffff', color: '#166534', border: '1px solid rgba(22, 101, 52, 0.12)', boxShadow: '0 7px 14px rgba(20, 83, 45, 0.05)', fontSize: '12px', fontWeight: '800' }}>
                    <BadgeCheck size={13} color="#16a34a" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
              {aboutStats.map(({ value, label, Icon }, idx) => (
                <div key={label} style={{ position: 'relative', overflow: 'hidden', minHeight: '124px', padding: '18px', borderRadius: '22px', background: idx % 2 === 0 ? 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)' : 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)', border: '1px solid rgba(255, 255, 255, 0.95)', boxShadow: '0 16px 34px rgba(20, 83, 45, 0.08)' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '13px', background: idx % 2 === 0 ? '#fff7ed' : '#dcfce7', color: idx % 2 === 0 ? '#ea580c' : '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                    <Icon size={20} />
                  </div>
                  <strong style={{ display: 'block', fontSize: '26px', lineHeight: 1, color: '#173b2d', fontWeight: '900', letterSpacing: '-0.8px' }}>{value}</strong>
                  <span style={{ display: 'block', marginTop: '8px', color: '#61786e', fontSize: '12px', fontWeight: '800', lineHeight: '1.28' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '18px' }}>
            {aboutPillars.map(({ title, Icon, gradient, glow, text }) => (
              <div key={title} style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#ffffff', padding: '22px', borderRadius: '24px', boxShadow: `0 16px 34px ${glow}`, border: '1px solid rgba(255,255,255,0.92)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 24px 48px ${glow}`; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 16px 34px ${glow}`; }}>
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '130px', height: '130px', borderRadius: '50%', background: glow }}></div>
                <div style={{ width: '46px', height: '46px', borderRadius: '16px', background: gradient, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', marginBottom: '15px', boxShadow: `0 12px 24px ${glow}` }}>
                  <Icon size={23} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#173b2d', margin: '0 0 8px', letterSpacing: '-0.3px' }}>{title}</h3>
                <p style={{ fontSize: '13px', color: '#587266', lineHeight: '1.55', fontWeight: '600', margin: 0, position: 'relative' }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.82fr) minmax(0, 1.18fr)', gap: '16px', alignItems: 'stretch' }}>
            <div style={{ borderRadius: '24px', padding: '24px', background: 'linear-gradient(135deg, #166534 0%, #16a34a 72%, #f59e0b 130%)', color: '#ffffff', boxShadow: '0 22px 44px rgba(22, 101, 52, 0.22)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: '-70px', bottom: '-80px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }}></div>
              <ShieldCheck size={28} color="#bbf7d0" />
              <h4 style={{ fontSize: '20px', lineHeight: '1.18', fontWeight: '900', margin: '14px 0 8px', letterSpacing: '-0.4px' }}>
                Registered under MSCS Act, 2002
              </h4>
              <p style={{ fontSize: '13px', lineHeight: '1.5', margin: '0 0 14px', color: 'rgba(255,255,255,0.86)', fontWeight: '600' }}>
                Regd.No. MSCS / CR / 1295 / 2020
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 12px', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.22)', fontSize: '12px', fontWeight: '900' }}>
                <Star size={14} color="#fde68a" />
                Transparent, ethical and member-first
              </div>
            </div>

            <div style={{ borderRadius: '24px', padding: '24px', backgroundColor: '#ffffff', boxShadow: '0 18px 42px rgba(20, 83, 45, 0.09)', border: '1px solid rgba(255,255,255,0.95)' }}>
              <div style={{ display: 'grid', gap: '13px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr)', gap: '13px', alignItems: 'start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '15px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Store size={22} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: '900', color: '#173b2d', margin: '0 0 5px' }}>Strategic MoUs</h5>
                    <p style={{ margin: 0, color: '#61786e', fontSize: '13px', fontWeight: '600', lineHeight: '1.48' }}>FEED partners with State Governments to develop export entrepreneurship and establish value-addition units that strengthen regional economies.</p>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(22, 101, 52, 0.16), transparent)' }}></div>

                <div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr)', gap: '13px', alignItems: 'start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '15px', backgroundColor: '#ecfdf5', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users2 size={22} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: '900', color: '#173b2d', margin: '0 0 5px' }}>Promotional Meetings</h5>
                    <p style={{ margin: 0, color: '#61786e', fontSize: '13px', fontWeight: '600', lineHeight: '1.48' }}>District-level meetings create export awareness, identify product potential in global markets and guide members toward practical next steps.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '16px', padding: '14px 16px', background: 'linear-gradient(135deg, #f0fdf4, #fff7ed)', borderRadius: '18px', border: '1px solid rgba(22, 163, 74, 0.12)', display: 'flex', alignItems: 'center', gap: '11px' }}>
                <Globe2 size={23} color="#16a34a" />
                <p style={{ fontSize: '13px', color: '#315243', fontWeight: '800', margin: 0, lineHeight: '1.4' }}>
                  FEED helps FPOs and MSMEs access better prices in domestic and international markets with end-to-end support.
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
