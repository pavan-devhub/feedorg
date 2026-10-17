import React, { Suspense, lazy } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useScrollToTop from '../../hooks/useScrollToTop';
import { KyjRouter } from './router';
import AppShell from './components/AppShell';
import Home from './pages/Home';
import { screens } from './data/screens';
import { screenLoaders } from './screens';
import './styles/main.css';
import './Kyj.css';

// KYJ (Krushi Yeva Jayate): the farmer export journey, imported from the standalone KYJ screens
// app. `screenId` (navState.screen) picks one of its screens; without one the KYJ home - the
// launcher listing every screen - is shown. The site navbar and footer frame both.

// One lazy component per screen, so a screen's code still loads only when it is opened.
const screenComponents = Object.fromEntries(
  Object.entries(screenLoaders).map(([id, load]) => [id, lazy(load)])
);

// The KYJ design's fonts the site doesn't already load (Inter comes from index.css).
const KYJ_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,400..900&family=JetBrains+Mono:wght@400..700&family=Noto+Sans+Telugu:wght@400..700&family=Plus+Jakarta+Sans:wght@500..800&display=swap';

// In-page anchor links (skip links, "Back to Top", "Next Stage") scroll here instead of letting the
// browser jump: a #hash jump fires popstate with no page in its state, which App.jsx reads as home.
function scrollToAnchor(e) {
  const href = e.target.closest('a[href^="#"]')?.getAttribute('href');
  if (!href || href === '#') return;
  e.preventDefault();
  document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Kyj({ onNavigate, isLoggedIn, user, onLogout, screenId }) {
  const current = screens.find((screen) => screen.id === screenId);
  const Screen = current && screenComponents[current.id];

  useScrollToTop(current ? current.id : 'home');

  return (
    <div className="kyj-page">
      <link rel="stylesheet" href={KYJ_FONTS_URL} />
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="kyj" />

      <KyjRouter path={current ? current.path : '/'} onNavigate={onNavigate}>
        <div className={`kyj ${current ? 'kyj--screen' : 'kyj--home'}`} onClick={scrollToAnchor}>
          {current ? (
            <AppShell current={current}>
              <Suspense fallback={null}>
                <Screen />
              </Suspense>
            </AppShell>
          ) : (
            <Home />
          )}
        </div>
      </KyjRouter>

      <Footer />
    </div>
  );
}
