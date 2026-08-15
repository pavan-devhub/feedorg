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



function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  
  const [user, setUser] = useState(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('jwt');
  });

  const handleLogin = (userData) => {
    if (userData && userData.token) {
      localStorage.setItem('jwt', userData.token);
      setUser(userData);
      setIsLoggedIn(true);
      handleNavigate('home');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (token) {
        await fetch(`http://${window.location.hostname}:8080/api/auth/logout`, {
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
    handleNavigate('home');
  };

  React.useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          const res = await fetch(`http://${window.location.hostname}:8080/api/auth/me`, {
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
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        localStorage.setItem('currentPage', event.state.page);
      } else {
        setCurrentPage('home');  
        localStorage.setItem('currentPage', 'home');
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    // Initialize history state on first load
    if (!window.history.state) {
      window.history.replaceState({ page: currentPage }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
    window.history.pushState({ page }, '');
  };

  React.useEffect(() => {
    if ((currentPage === 'product360' || currentPage === 'dashboard') && !isLoggedIn) {
      handleNavigate('login');
    }
  }, [currentPage, isLoggedIn]);



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
    <div className={`app-container ${['home', 'exports', 'fpo', 'how', 'dashboard', 'tools', 'mybusiness'].includes(currentPage) ? 'is-home' : ''}`}>
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
          !isLoggedIn ? null : <Dashboard onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'tools' ? (
          <ToolsServices onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : currentPage === 'mybusiness' ? (
          <MyBusiness onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        ) : null}
      </div>

    </div>
  );
}

export default App;
