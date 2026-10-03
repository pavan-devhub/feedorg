import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ContactUs from './pages/ContactUs';
import ExportsPortal from './pages/ExportsPortal';
import Product360 from './pages/Product360';
import FpoPortal from './pages/FpoPortal';
import HowFeedWorks from './pages/HowFeedWorks';
import ToolsServices from './pages/ToolsServices';
import MyBusiness from './pages/MyBusiness';
import BusinessAccount from './pages/BusinessAccount';
import AgmBoard from './pages/AgmBoard';
import BusinessPlan from './pages/BusinessPlan';
import PublicationsHub from './pages/PublicationsHub';
import Epm from './pages/Epm';
import EpmDetails from './pages/EpmDetails';
import EpmGallery from './pages/EpmGallery';
import EpmGalleryState from './pages/EpmGalleryState';
import EpmGalleryDistrict from './pages/EpmGalleryDistrict';
import EpmObjective from './pages/EpmObjective';
import EpmContentCoverage from './pages/EpmContentCoverage';
import EpmBenefits from './pages/EpmBenefits';
import EpmInvitees from './pages/EpmInvitees';
import EpmRegister from './pages/EpmRegister';
import EpmVolunteer from './pages/EpmVolunteer';
import EpmEventDetails from './pages/EpmEventDetails';
import SafeMission from './pages/SafeMission';
import AdminPortal from './pages/admin/AdminPortal';
import MyBusinessLayout from './components/MyBusinessLayout';
import useScrollToTop from './hooks/useScrollToTop';
import { API_BASE_URL } from './api/config';
import { takeReturnTo } from './utils/publicationLinks';
// import TradeFairs from './pages/TradeFairs';

function MyBusinessPlaceholder({ onNavigate, isLoggedIn, user, onLogout, currentTab }) {
  return (
    <MyBusinessLayout 
      onNavigate={onNavigate} 
      isLoggedIn={isLoggedIn} 
      user={user} 
      onLogout={onLogout}
      currentTab={currentTab}
    >
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
        <h2>Page Under Construction</h2>
        <p>This module is currently being built.</p>
      </div>
    </MyBusinessLayout>
  );
}

// This app has no react-router-dom - the URL never changes between pages, so a hard refresh
// would otherwise always remount App to its `useState('home')` default. Stashing the current
// page in sessionStorage (per-tab, cleared when the tab closes) lets a refresh land back on
// whatever page was actually open instead of bouncing to home.
const PAGE_STORAGE_KEY = 'feed_current_page';

// An ADMIN account only ever sees the admin panel - no public pages, no user dashboard. Every other
// page is off limits to it (see handleNavigate and the guard effect below).
const ADMIN_PAGES = ['admin-dashboard'];

// The stored JWT's payload carries the user's role (see JwtUtil#generateToken on the backend).
// Reading it up front lets an admin's refresh or new tab open the admin panel straight away,
// instead of flashing a public page while /api/auth/me is still loading. This only steers the UI -
// the backend checks the role itself on every admin request.
function roleFromStoredToken() {
  try {
    const payload = localStorage.getItem('jwt')?.split('.')[1];
    if (!payload) return null;
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))).role || null;
  } catch {
    return null;
  }
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(() => {
    let page = 'home';
    try {
      page = sessionStorage.getItem(PAGE_STORAGE_KEY) || 'home';
    } catch {
      // sessionStorage unavailable (e.g. private mode) - start from home
    }
    return roleFromStoredToken() === 'ADMIN' && !ADMIN_PAGES.includes(page) ? 'admin-dashboard' : page;
  });

  const [user, setUser] = useState(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('jwt');
  });

  const handleLogin = (userData) => {
    if (userData && userData.token) {
      localStorage.setItem('jwt', userData.token);
      // A shared publication link that needed a login first (see PublicationReader) goes
      // straight back to that issue.
      const returnTo = takeReturnTo();
      if (returnTo && userData.role !== 'ADMIN') {
        window.location.assign(returnTo);
        return;
      }
      setUser(userData);
      setIsLoggedIn(true);
      // ADMIN accounts (see UserServiceImpl#resolveRole - whoever logs in with the configured
      // feedworld.admin.email) land on the shared admin panel (Feed World + EPM), which is the only
      // page they can use; everyone else's login is unchanged.
      goTo(userData.role === 'ADMIN' ? 'admin-dashboard' : 'home');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (e) {
      console.error('Logout error', e);
    }
    localStorage.removeItem('jwt');
    setUser(null);
    setIsLoggedIn(false);
    goTo('home');
  };

  React.useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
            setIsLoggedIn(true);
          } else {
            // Invalid token
            localStorage.removeItem('jwt');
            setUser(null);
            setIsLoggedIn(false);
          }
        } catch (e) {
          console.error('Failed to validate token', e);
        }
      }
    };
    validateToken();
  }, []);

  React.useEffect(() => {
    // Navbar dispatches this after the user uploads/removes their profile picture (each page
    // mounts its own Navbar instance, so this keeps App's single `user` state in sync without
    // threading a callback prop through every page).
    const handleProfileImageUpdated = (event) => {
      setUser((prev) => (prev ? { ...prev, profileImageUrl: event.detail?.profileImageUrl ?? null } : prev));
    };
    window.addEventListener('feed:profile-image-updated', handleProfileImageUpdated);
    return () => window.removeEventListener('feed:profile-image-updated', handleProfileImageUpdated);
  }, []);

  React.useEffect(() => {
    // Without this, the browser's own scroll-position restoration on back/forward navigation
    // races with (and usually wins over) useScrollToTop below, leaving the page scrolled to
    // wherever it happened to be instead of the top.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        const { page, ...rest } = event.state;
        setNavState(rest);
      } else {
        setCurrentPage('home');
        setNavState({});
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initialize history state on first load
    if (!window.history.state) {
      window.history.replaceState({ page: currentPage }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  React.useEffect(() => {
    try {
      sessionStorage.setItem(PAGE_STORAGE_KEY, currentPage);
    } catch {
      // sessionStorage unavailable (e.g. private mode) - refresh just falls back to home
    }
  }, [currentPage]);

  // Which state/district the EPM gallery drill-down is on lives in the history entry (see
  // handleNavigate), which survives a refresh - so read it back here or a refresh would lose it.
  const [navState, setNavState] = useState(() => {
    const { page, ...rest } = window.history.state || {};
    return page === currentPage ? rest : {};
  });

  // Until /api/auth/me answers after a refresh, `user` is still null - the token's role stands in.
  const isAdmin = isLoggedIn && (user ? user.role === 'ADMIN' : roleFromStoredToken() === 'ADMIN');

  // Unrestricted navigation - used by login/logout and the redirects below.
  const goTo = (page, extraState = {}) => {
    setCurrentPage(page);
    setNavState(extraState);
    window.history.pushState({ page, ...extraState }, '');
  };

  // What every page gets as `onNavigate`. An admin stays inside the admin panel, so any link that
  // would take them elsewhere (a stray footer or page link) simply does nothing.
  const handleNavigate = (page, extraState = {}) => {
    if (isAdmin && !ADMIN_PAGES.includes(page)) return;
    goTo(page, extraState);
  };

  React.useEffect(() => {
    if ((currentPage === 'product360' || currentPage === 'dashboard' || currentPage === 'admin-dashboard') && !isLoggedIn) {
      goTo('login');
      return;
    }
    // Defense in depth only - the real enforcement is server-side (SecurityConfig's
    // hasRole("ADMIN") on /api/admin/**). A non-admin who lands here some other
    // way (e.g. typing history state back in) is just bounced to home, not shown the page.
    if (currentPage === 'admin-dashboard' && isLoggedIn && user && user.role !== 'ADMIN') {
      goTo('home');
      return;
    }
    // An admin who reaches any other page anyway - the back button, a page restored after a
    // refresh - is put back in the admin panel. replaceState, so back doesn't bounce them again.
    if (isAdmin && !ADMIN_PAGES.includes(currentPage)) {
      setCurrentPage('admin-dashboard');
      setNavState({});
      window.history.replaceState({ page: 'admin-dashboard' }, '');
    }
  }, [currentPage, isLoggedIn, user, isAdmin]);

  useScrollToTop(currentPage);

  // Never render a public page for an admin, even for the one render before the guard above runs.
  if (isAdmin && !ADMIN_PAGES.includes(currentPage)) {
    return null;
  }



  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} onRegisterClick={() => handleNavigate('register')} onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'register') {
    return <Register onBackToLogin={() => handleNavigate('login')} />;
  }

  if (currentPage === 'contact') {
    return <ContactUs onNavigate={handleNavigate} />;
  }

  if (currentPage === 'product360') {
    if (!isLoggedIn) {
      return null;
    }
    return <Product360 onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
  }

  return (
    <div className={`app-container ${['home', 'exports', 'fpo', 'how', 'dashboard', 'admin-dashboard', 'tools', 'mybusiness', 'business-account', 'business-profile', 'compliances', 'agm-board', 'business-plan', 'loans-schemes', 'marketing', 'reports', 'connect', 'feedworld', 'epm', 'epm-details', 'epm-gallery', 'epm-gallery-state', 'epm-gallery-district', 'epm-objective', 'epm-content-coverage', 'epm-benefits', 'epm-invitees', 'epm-register', 'epm-volunteer', 'safe-mission'].includes(currentPage) ? 'is-home' : ''}`}>
      {/* Search Blur Overlay */}
      {searchQuery && <div className="search-blur-overlay" onClick={() => setSearchQuery('')}></div>}

      <div className={`main-content-bg ${searchQuery ? 'content-blurred' : ''}`}>
        {currentPage === 'home' ? (
          <Home onNavigate={handleNavigate} searchQuery={searchQuery} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'exports' ? (
          <ExportsPortal onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'fpo' ? (
          <FpoPortal onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'how' ? (
          <HowFeedWorks onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'dashboard' ? (
          // navState.tab opens a given dashboard section, e.g. a notification's { tab: 'status', epmId }.
          !isLoggedIn ? null : <Dashboard onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} navState={navState} />
        ) : currentPage === 'admin-dashboard' ? (
          // One admin panel for Feed World and EPM - the open section (and e.g. which EPM's
          // registrations are showing) rides in navState so refresh/back keep it.
          !isLoggedIn || user?.role !== 'ADMIN' ? null : (
            <AdminPortal onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout}
              section={navState.section} sectionParams={navState} />
          )
        ) : currentPage === 'tools' ? (
          <ToolsServices onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'mybusiness' ? (
          <MyBusiness onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'business-account' ? (
          <BusinessAccount onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'agm-board' ? (
          <AgmBoard onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'business-plan' ? (
          <BusinessPlan onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'feedworld' ? (
          // Admins never get here (they're kept in the admin panel, which has its own
          // Publications section) - this is the regular reader page.
          <PublicationsHub onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) :currentPage === 'TradeFairs'?(
          <TradeFairs onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        )
        : currentPage === 'epm' ? (
          <Epm onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'epm-details' ? (
          <EpmDetails onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'epm-event-details' ? (
          <EpmEventDetails onNavigate={handleNavigate} eventId={navState.eventId} />
        ) : currentPage === 'epm-gallery' ? (
          <EpmGallery onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'epm-gallery-state' ? (
          <EpmGalleryState onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} stateId={navState.state} />
        ) : currentPage === 'epm-gallery-district' ? (
          <EpmGalleryDistrict onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} stateId={navState.state} districtId={navState.district} />
        ) : currentPage === 'epm-objective' ? (
          <EpmObjective onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'epm-content-coverage' ? (
          <EpmContentCoverage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'epm-benefits' ? (
          <EpmBenefits onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'epm-invitees' ? (
          <EpmInvitees onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'epm-register' ? (
          <EpmRegister onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} eventId={navState.eventId} />
        ) : currentPage === 'epm-volunteer' ? (
          <EpmVolunteer onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} eventId={navState.eventId} />
        ) : currentPage === 'safe-mission' ? (
          <SafeMission onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : ['business-profile', 'compliances', 'loans-schemes', 'marketing', 'reports', 'connect'].includes(currentPage) ? (
          <MyBusinessPlaceholder onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} currentTab={currentPage} />
        ) : null}
      </div>

    </div>
  );
}

export default App;
