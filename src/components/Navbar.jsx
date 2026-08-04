import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home as HomeIcon, Users, Settings, Calendar, Map, Activity, 
  Package, PhoneCall, ChevronDown, Search, User, UserPlus, 
  Sprout, Building2, Ship, Coins, TrendingUp, GraduationCap, 
  Globe2, ClipboardList, Store, ShieldCheck, Wrench, Lightbulb, 
  ShoppingBag, CreditCard 
} from 'lucide-react';

export const servicesMegaMenu = [
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

const Navbar = ({ onNavigate }) => {
  const { i18n } = useTranslation();
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

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
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
                    if (item.id === 'contact') onNavigate('contact');
                    if (item.id === 'services') setIsServicesOpen(!isServicesOpen);
                    if (item.id === 'about') {
                      // Only scroll if we are on the home page, else navigate to home?
                      // We can just scroll
                      const el = document.getElementById('about-us');
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      } else {
                         // If not on home page, maybe navigate to home first, but that's complex
                         onNavigate('home');
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
                      
                      <style>{`
                        @keyframes flyInLeft { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
                        @keyframes flyInRight { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
                        @keyframes flyInTop { from { opacity: 0; transform: translateY(-80px); } to { opacity: 1; transform: translateY(0); } }
                        @keyframes flyInBottom { from { opacity: 0; transform: translateY(80px); } to { opacity: 1; transform: translateY(0); } }
                        
                        .service-btn-animated {
                          opacity: 0;
                        }
                      `}</style>

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
                        {servicesMegaMenu.map((service, sIdx) => {
                          const animations = ['flyInLeft', 'flyInTop', 'flyInBottom', 'flyInRight'];
                          const animName = animations[sIdx % 4];
                          return (
                          <div key={sIdx} 
                          className="service-btn-animated"
                          style={{ 
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
                            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                            animation: `${animName} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${sIdx * 0.05}s forwards`
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
                          );
                        })}
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
    </>
  );
};

export default Navbar;
