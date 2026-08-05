import React, { useState } from 'react';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ContactUs from './components/ContactUs';
import ExportsPortal from './components/ExportsPortal';



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



  if (currentPage === 'login') {
    return <Login onLogin={() => handleNavigate('home')} onRegisterClick={() => handleNavigate('register')} onBack={() => handleNavigate('home')} />;
  }

  if (currentPage === 'register') {
    return <Register onBackToLogin={() => handleNavigate('login')} />;
  }

  if (currentPage === 'contact') {
    return <ContactUs onNavigate={handleNavigate} />;
  }

  return (
    <div className={`app-container ${['home', 'exports'].includes(currentPage) ? 'is-home' : ''}`}>
      {/* Search Blur Overlay */}
      {searchQuery && <div className="search-blur-overlay" onClick={() => setSearchQuery('')}></div>}

      <div className={`main-content-bg ${searchQuery ? 'content-blurred' : ''}`}>
        {currentPage === 'home' ? (
          <Home onNavigate={handleNavigate} searchQuery={searchQuery} />
        ) : currentPage === 'exports' ? (
          <ExportsPortal onNavigate={handleNavigate} />
        ) : null}
      </div>

    </div>
  );
}

export default App;
