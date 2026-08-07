import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home as HomeIcon, Users, Settings, Calendar, Map, Activity, 
  Package, PhoneCall, ChevronDown, Search, User, UserPlus, 
  Sprout, Building2, Ship, Coins, TrendingUp, GraduationCap, 
  Globe2, ClipboardList, Store, ShieldCheck, Wrench, Lightbulb, 
  ShoppingBag, CreditCard 
} from 'lucide-react';
import './Navbar.css';

export const servicesMegaMenu = [
  { name: 'PROJECT KRUSHI', num: '01', color: 'green', img: '/icons/icon_srv_krushi_1785921685926.jpg' },
  { name: 'MY ORG', num: '02', color: 'blue', img: '/icons/icon_buyers_connection_1785919564348.jpg' },
  { name: 'MY EXPORTS', num: '03', color: 'teal', img: '/icons/icon_country_selection_1785919634748.jpg' },
  { name: 'LOANS & FINANCE', num: '04', color: 'yellow', img: '/icons/icon_finance_1785919584808.jpg' },
  { name: 'PRODUCT 360', num: '05', color: 'orange', img: '/icons/icon_product_selection_1785919553355.jpg' },
  { name: 'MY BUSINESS', num: '06', color: 'purple', img: '/icons/icon_process_order_1785919603239.jpg' },
  { name: 'MY EDUCATION', num: '07', color: 'pink', img: '/icons/icon_documentation_1785919613435.jpg' },
  { name: 'FEED WORLD', num: '08', color: 'blue-light', img: '/icons/icon_why_exports_1785919534482.jpg' },
  { name: 'EPM', num: '09', color: 'green-light', img: '/icons/icon_start_exports_1785919544424.jpg' },
  { name: 'TRADE FAIRS', num: '10', color: 'orange-light', img: '/icons/icon_trade_updates_1785919624005.jpg' },
  { name: 'SAFE MISSION', num: '11', color: 'teal', img: '/icons/icon_policies_1785919575221.jpg' },
  { name: 'MY TOOLS', num: '12', color: 'purple-light', img: '/icons/icon_tools_services_1785919653740.jpg' },
  { name: 'KNOW SCHEMES', num: '13', color: 'yellow', img: '/icons/icon_policies_1785919575221.jpg' },
  { name: 'MY MARKET', num: '14', color: 'orange', img: '/icons/icon_product_selection_1785919553355.jpg' },
  { name: 'FEED CARD', num: '15', color: 'blue', img: '/icons/icon_tariffs_1785919643320.jpg' }
];

const Navbar = ({ onNavigate }) => {
  const { i18n } = useTranslation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const servicesDropdownRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // Only react to meaningful scrolls (>10px) to avoid jitter
      if (delta > 10 && currentY > 80) {
        setNavHidden(true);
        setIsServicesOpen(false);
      } else if (delta < -10) {
        setNavHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      <div style={{
        width: '100%',
        position: 'fixed',
        top: '10px',
        left: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        transform: navHidden ? 'translateY(-120px)' : 'translateY(0)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: navHidden ? 'none' : 'auto',
      }}>
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
                    if (item.id === 'exports') onNavigate('exports');
                    if (item.id === 'fpo') onNavigate('fpo');

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
                      <div className="srv-cards-grid" style={{ 
                        flex: 1,
                        padding: '0 5% 4% 5%', // Left, right, bottom padding to align with white boundaries
                      }}>
                        {servicesMegaMenu.map((service, sIdx) => {
                          const animations = ['flyInLeft', 'flyInTop', 'flyInBottom', 'flyInRight'];
                          const animName = animations[sIdx % 4];
                          return (
                          <div key={sIdx} 
                            className="srv-card service-btn-animated"
                            style={{ 
                              animation: `${animName} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${sIdx * 0.05}s forwards`,
                              cursor: service.name === 'PRODUCT 360' ? 'pointer' : undefined
                            }}
                            onClick={() => {
                              if (service.name === 'PRODUCT 360') {
                                setIsServicesOpen(false);
                                onNavigate('product360');
                              }
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
