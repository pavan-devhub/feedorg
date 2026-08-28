import React, { useState, useRef, useEffect } from 'react';
import {
  Home as HomeIcon, Settings, Calendar, Map, Activity,
  Package, PhoneCall, ChevronDown, Search, User,
  Building2, Users, LayoutDashboard, LogOut, Laptop, Menu, X
} from 'lucide-react';
import './Navbar.css';
import DevicesModal from './DevicesModal';

export const servicesMegaMenu = [
  { name: 'PROJECT KRUSHI', num: '01', color: 'green', img: '/icons/icon-krushi.avif' },
  { name: 'MY ORG', num: '02', color: 'blue', img: '/icons/icon-buyers-connection.avif' },
  { name: 'MY EXPORTS', num: '03', color: 'teal', img: '/icons/icon-country-selection.avif' },
  { name: 'LOANS & FINANCE', num: '04', color: 'yellow', img: '/icons/icon-finance.avif' },
  { name: 'PRODUCT 360', num: '05', color: 'orange', img: '/icons/icon-product-selection.avif' },
  { name: 'MY BUSINESS', num: '06', color: 'purple', img: '/icons/icon-process-order.avif' },
  { name: 'MY EDUCATION', num: '07', color: 'pink', img: '/icons/icon-documentation.avif' },
  { name: 'FEED WORLD', num: '08', color: 'blue-light', img: '/icons/icon-why-exports.avif' },
  { name: 'EPM', num: '09', color: 'green-light', img: '/icons/icon-start-exports.avif' },
  { name: 'TRADE FAIRS', num: '10', color: 'orange-light', img: '/icons/icon-trade-updates.avif' },
  { name: 'SAFE MISSION', num: '11', color: 'teal', img: '/icons/icon-policies.avif' },
  { name: 'MY TOOLS', num: '12', color: 'purple-light', img: '/icons/icon-tools-services.avif' },
  { name: 'KNOW SCHEMES', num: '13', color: 'yellow', img: '/icons/icon-policies.avif' },
  { name: 'MY MARKET', num: '14', color: 'orange', img: '/icons/icon-product-selection.avif' },
  { name: 'FEED CARD', num: '15', color: 'blue', img: '/icons/icon-tariffs.avif' }
];

// Maps a mega-menu tile to the page it should open; tiles with no entry are inert (matches
// the set of live destinations the mega menu already supported before this redesign).
const SERVICE_ROUTES = {
  'PRODUCT 360': 'product360',
  'MY EXPORTS': 'exports',
  'MY TOOLS': 'tools',
  'MY BUSINESS': 'mybusiness',
  'FEED WORLD': 'feedworld',
};

// `route` links a nav item to the `currentPage` value that should light it up; items without
// one (About Us, Services, Events & Updates, Export Road Map) are same-page actions rather
// than distinct pages, so they never carry an active state.
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon, route: 'home' },
  { id: 'about', label: 'About Us', icon: Building2, hasDropdown: true },
  { id: 'services', label: 'Services', icon: Settings, hasDropdown: true },
  { id: 'events', label: 'Events & Updates', icon: Calendar },
  { id: 'roadmap', label: 'Export Road Map', icon: Map },
  { id: 'how', label: 'How Feed Works', icon: Activity, route: 'how' },
  { id: 'fpo', label: 'FPO', icon: Users, route: 'fpo' },
  { id: 'exports', label: 'Exports', icon: Package, route: 'exports' },
  { id: 'contact', label: 'Contact Us', icon: PhoneCall, route: 'contact' },
];

const MOBILE_ICON_STYLE = [
  { bg: '#fff7ed', fg: '#ea580c' }, // home
  { bg: '#fff7ed', fg: '#ea580c' }, // about
  { bg: '#fef9c3', fg: '#ca8a04' }, // services
  { bg: '#fef9c3', fg: '#ca8a04' }, // events
  { bg: '#ecfccb', fg: '#65a30d' }, // roadmap
  { bg: '#f0fdf4', fg: '#16a34a' }, // how
  { bg: '#f0fdf4', fg: '#16a34a' }, // fpo
  { bg: '#f0fdf4', fg: '#15803d' }, // exports
  { bg: '#f0fdf4', fg: '#15803d' }, // contact
];

const Navbar = ({ onNavigate, isLoggedIn, user, onLogout, currentPage = '' }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDevicesOpen, setIsDevicesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const servicesDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsServicesOpen(false);
        setIsProfileOpen(false);
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const scrollToAboutUs = () => {
    const el = document.getElementById('about-us');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      onNavigate('home');
    }
  };

  const handleItemClick = (item) => {
    if (item.id === 'services') {
      setIsServicesOpen((v) => !v);
      return;
    }
    if (item.id === 'about') {
      scrollToAboutUs();
      return;
    }
    if (item.route) {
      onNavigate(item.route);
    }
  };

  const handleServiceTileClick = (service) => {
    const target = SERVICE_ROUTES[service.name];
    if (target) {
      setIsServicesOpen(false);
      onNavigate(target);
    }
  };

  const handleMobileItemClick = (item) => {
    if (item.id === 'services') {
      setMobileServicesOpen((v) => !v);
      return;
    }
    if (item.id === 'about') {
      setIsMobileOpen(false);
      scrollToAboutUs();
      return;
    }
    if (item.route) {
      onNavigate(item.route);
      setIsMobileOpen(false);
    }
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

      <nav className={`fw-nav-root${navHidden ? ' fw-nav-hidden' : ''}`} aria-label="Main navigation">
        <div className="fw-navbar">
          <button type="button" className="fw-navbar-logo" onClick={() => onNavigate('home')} aria-label="Feed World home">
            <span className="fw-navbar-logo-badge">
              <img src="/dashboard-logo.avif" alt="Feed World" />
            </span>
            <span className="fw-navbar-logo-text">
              <span className="fw-navbar-logo-title">FEED WORLD</span>
              <span className="fw-navbar-logo-tagline">Empowering Farmers, Enriching Futures</span>
            </span>
          </button>

          <span className="fw-navbar-divider" aria-hidden="true" />

          <ul className="fw-navbar-links">
            {NAV_ITEMS.map((item) => {
              const active = Boolean(item.route) && currentPage === item.route;
              const isServicesItem = item.id === 'services';
              return (
                <li
                  key={item.id}
                  className={`fw-nav-item${active ? ' active' : ''}${isServicesItem && isServicesOpen ? ' open' : ''}`}
                  ref={isServicesItem ? servicesDropdownRef : null}
                >
                  <button
                    type="button"
                    className="fw-nav-btn"
                    aria-current={active ? 'page' : undefined}
                    aria-haspopup={isServicesItem ? 'true' : undefined}
                    aria-expanded={isServicesItem ? isServicesOpen : undefined}
                    onClick={() => handleItemClick(item)}
                  >
                    <item.icon size={16} strokeWidth={1.75} className="fw-nav-icon" />
                    <span className="fw-nav-label-row">
                      <span className="fw-nav-label">{item.label}</span>
                      {item.hasDropdown && <ChevronDown size={10} strokeWidth={3} className="fw-nav-chevron" />}
                    </span>
                  </button>

                  {/* Services Mega Menu */}
                  {isServicesItem && isServicesOpen && (
                    <div className="fw-services-dropdown" style={{
                      position: 'fixed',
                      top: '92px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '940px',
                      height: '620px',
                      backgroundImage: 'url(/services-bg.avif)',
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
                          const clickable = Boolean(SERVICE_ROUTES[service.name]);
                          return (
                          <div key={sIdx}
                            className="srv-card service-btn-animated"
                            style={{
                              animation: `${animName} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${sIdx * 0.05}s forwards`,
                              cursor: clickable ? 'pointer' : undefined
                            }}
                            onClick={() => handleServiceTileClick(service)}
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
                </li>
              );
            })}
          </ul>

          <span className="fw-navbar-divider fw-navbar-divider--actions" aria-hidden="true" />

          <div className="fw-navbar-actions">
            <button type="button" className="fw-search-btn" aria-label="Search">
              <Search size={15} strokeWidth={2.25} />
            </button>

            <div className="fw-account-wrap" ref={profileDropdownRef}>
              <button
                type="button"
                className="fw-account-btn"
                aria-haspopup={isLoggedIn ? 'true' : undefined}
                aria-expanded={isLoggedIn ? isProfileOpen : undefined}
                onClick={() => {
                  if (!isLoggedIn) {
                    onNavigate('login');
                    return;
                  }
                  if (isDevicesOpen) {
                    setIsDevicesOpen(false);
                  } else {
                    setIsProfileOpen((v) => !v);
                  }
                }}
              >
                <span className="fw-account-icon">
                  {isLoggedIn && user?.firstName ? user.firstName.charAt(0).toUpperCase() : <User size={13} strokeWidth={2.5} />}
                </span>
                My Account
              </button>

              {isLoggedIn && isProfileOpen && (
                <div className="fw-account-dropdown">
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user?.email}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      if (onNavigate) onNavigate('dashboard');
                    }}
                    style={{
                      width: '100%', padding: '10px 12px', backgroundColor: '#ffedd5', color: '#ea580c',
                      border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
                      display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px',
                      justifyContent: 'center', marginBottom: '8px'
                    }}
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsDevicesOpen(true);
                    }}
                    style={{
                      width: '100%', padding: '10px 12px', backgroundColor: '#f1f5f9', color: '#334155',
                      border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
                      display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px',
                      justifyContent: 'center', marginBottom: '8px'
                    }}
                  >
                    <Laptop size={14} />
                    Devices
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      if (onLogout) onLogout();
                    }}
                    style={{
                      width: '100%', padding: '10px 12px', backgroundColor: '#fee2e2', color: '#ef4444',
                      border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
                      display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px',
                      justifyContent: 'center'
                    }}
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="fw-hamburger"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((v) => !v)}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileOpen && (
        <>
          <div className="fw-mobile-backdrop" onClick={() => setIsMobileOpen(false)} />
          <div className="fw-mobile-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <div className="fw-mobile-header">
              <div className="fw-mobile-header-brand">
                <span className="fw-mobile-logo-badge">
                  <img src="/dashboard-logo.avif" alt="Feed World" />
                </span>
                <span className="fw-mobile-header-title">FEED WORLD</span>
              </div>
              <button type="button" className="fw-mobile-close" aria-label="Close menu" onClick={() => setIsMobileOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <ul className="fw-mobile-nav">
              {NAV_ITEMS.map((item, idx) => {
                const active = Boolean(item.route) && currentPage === item.route;
                const isServicesItem = item.id === 'services';
                const open = isServicesItem && mobileServicesOpen;
                const iconStyle = MOBILE_ICON_STYLE[idx];
                return (
                  <li key={item.id} className={`fw-mobile-nav-item${active ? ' active' : ''}${open ? ' open' : ''}`}>
                    <button
                      type="button"
                      className="fw-mobile-nav-btn"
                      aria-current={active ? 'page' : undefined}
                      aria-expanded={isServicesItem ? mobileServicesOpen : undefined}
                      onClick={() => handleMobileItemClick(item)}
                    >
                      <span className="fw-mobile-nav-icon-chip" style={{ background: iconStyle.bg, color: iconStyle.fg }}>
                        <item.icon size={16} strokeWidth={2} />
                      </span>
                      <span className="fw-mobile-nav-label">{item.label}</span>
                      {item.hasDropdown && <ChevronDown size={14} strokeWidth={2.5} className="fw-mobile-chevron" />}
                    </button>

                    {isServicesItem && open && (
                      <div className="fw-mobile-submenu">
                        {servicesMegaMenu.map((service) => (
                          <button
                            key={service.name}
                            type="button"
                            className="fw-mobile-submenu-item"
                            disabled={!SERVICE_ROUTES[service.name]}
                            onClick={() => {
                              const target = SERVICE_ROUTES[service.name];
                              if (target) {
                                onNavigate(target);
                                setIsMobileOpen(false);
                              }
                            }}
                          >
                            <img src={service.img} alt="" />
                            {service.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="fw-mobile-footer">
              <button type="button" className="fw-mobile-search" aria-label="Search">
                <Search size={15} />
                Search
              </button>
              {!isLoggedIn ? (
                <>
                  <button type="button" className="fw-mobile-login" onClick={() => { onNavigate('login'); setIsMobileOpen(false); }}>
                    Login
                  </button>
                  <button type="button" className="fw-mobile-register" onClick={() => { onNavigate('register'); setIsMobileOpen(false); }}>
                    Register
                  </button>
                </>
              ) : (
                <button type="button" className="fw-mobile-login" onClick={() => { onNavigate('dashboard'); setIsMobileOpen(false); }}>
                  Dashboard
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {isDevicesOpen && <DevicesModal onClose={() => setIsDevicesOpen(false)} anchorRef={profileDropdownRef} />}
    </>
  );
};

export default Navbar;
