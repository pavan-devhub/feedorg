import React, { useState } from 'react';
import { ArrowLeft, Globe2, Route, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import Header from './components/Header';
import ProfileSummary from './components/ProfileSummary';
import NextActionCard from './components/NextActionCard';
import DashboardSection from './components/DashboardSection';
import ServiceCard from './components/ServiceCard';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { dashboardSections } from './data/exportServices';

const exportHeroStats = [
  { label: 'Income potential', value: '3-6x', Icon: TrendingUp },
  { label: 'KYJ stages', value: '8', Icon: Route },
  { label: 'Export checks', value: '15', Icon: ShieldCheck },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home'); // 'login', 'home' or 'exports'

  // Sync state with browser history for back button support
  React.useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage('home'); 
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    // Initialize history state on first load
    if (!window.history.state) {
      window.history.replaceState({ page: 'home' }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.history.pushState({ page }, '');
  };

  // Search logic for Exports page
  const filteredSections = dashboardSections.map(section => {
    const query = searchQuery.toLowerCase();
    const filteredTiles = section.tiles.filter(tile => 
      tile.teluguTitle.toLowerCase().includes(query) ||
      tile.englishTitle.toLowerCase().includes(query) ||
      tile.body.toLowerCase().includes(query)
    );
    return { ...section, tiles: filteredTiles };
  }).filter(section => section.tiles.length > 0);

  if (currentPage === 'login') {
    return <Login onLogin={() => handleNavigate('home')} onRegisterClick={() => handleNavigate('register')} onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'register') {
    return <Register onBackToLogin={() => handleNavigate('login')} />;
  }

  return (
    <div className={`app-container ${currentPage === 'home' ? 'is-home' : ''}`}>
      {currentPage !== 'home' && (
        <div className="header-wrapper">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      )}
      
      {/* Search Blur Overlay */}
      {searchQuery && <div className="search-blur-overlay" onClick={() => setSearchQuery('')}></div>}

      <div className={`main-content-bg ${searchQuery ? 'content-blurred' : ''}`}>
        
        {currentPage === 'home' ? (
          <Home onNavigate={handleNavigate} searchQuery={searchQuery} />
        ) : (
          <div className="exports-page">
            {!searchQuery && (
              <section className="exports-hero">
                <div className="exports-hero-copy">
                  <button className="exports-back-btn" type="button" onClick={() => handleNavigate('home')}>
                    <ArrowLeft size={17} />
                    Home
                  </button>
                  <div className="exports-hero-kicker">
                    <Sparkles size={16} />
                    Why Exports?
                  </div>
                  <h1 className="exports-hero-title">Turn local harvests into global orders.</h1>
                  <p className="exports-hero-body">
                    Follow the KYJ roadmap from readiness, documents, buyers, logistics, payment, and government benefits with a clear action plan for every step.
                  </p>
                  <div className="exports-hero-actions">
                    <button className="exports-primary-btn" type="button">Continue journey</button>
                    <button className="exports-secondary-btn" type="button">View documents</button>
                  </div>
                </div>

                <div className="exports-hero-panel" aria-label="Export readiness overview">
                  <div className="exports-globe-mark">
                    <Globe2 size={42} />
                  </div>
                  <div className="exports-panel-copy">
                    <span>Current readiness</span>
                    <strong>62%</strong>
                    <p>Stage 4 of 8 complete</p>
                  </div>
                  <div className="exports-panel-meter" aria-hidden="true">
                    <span></span>
                  </div>
                  <div className="exports-hero-stats">
                    {exportHeroStats.map(({ label, value, Icon }) => (
                      <div className="exports-stat-card" key={label}>
                        <Icon size={18} />
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {!searchQuery && (
              <div className="top-summary-row exports-command-row">
                <ProfileSummary />
                <NextActionCard />
              </div>
            )}

            <div className="dashboard-content">
              {filteredSections.length === 0 ? (
                <div className="no-results">
                  No matching services found for "{searchQuery}"
                </div>
              ) : (
                filteredSections.map(section => (
                  <DashboardSection key={section.id} section={section}>
                    {section.tiles.map(tile => (
                      <ServiceCard key={tile.id} tile={tile} />
                    ))}
                  </DashboardSection>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {currentPage !== 'home' && (
        <div className={`bottom-nav ${searchQuery ? 'content-blurred' : ''}`}>
          <div className="bottom-nav-inner">
            <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
