import { useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useScrollToTop from '../../hooks/useScrollToTop';
// Before the sections' styles: the page wrapper and base rules (FeedCard.css explains the scoping).
import './FeedCard.css';
import HeroHeader from './components/HeroHeader/HeroHeader.jsx';
import FeedCardInfo from './components/FeedCardInfo/FeedCardInfo.jsx';
import FaqSection from './components/Faq/FaqSection.jsx';
import { DEFAULT_SECTION } from './sections.js';

// FEED CARD: imported from the standalone FeedCard app - a hero with three section tabs, the
// info panel for the selected tab, and the FAQs. The site navbar and footer frame it.

// The FeedCard design's fonts (the site already loads Outfit itself).
const FEED_CARD_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Outfit:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';

export default function FeedCard({ onNavigate, isLoggedIn, user, onLogout }) {
  // The selected tab lives in state only. The source app mirrored it in the URL hash, but a hash
  // change fires popstate without App.jsx's page state, which App reads as "go home".
  const [active, setActive] = useState(DEFAULT_SECTION);
  const infoRef = useRef(null);

  useScrollToTop('feed-card');

  function scrollToInfo() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    infoRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  // A tab click shows its panel and scrolls to it; arrow keys switch tabs without scrolling.
  function selectSection(id, { scroll = true } = {}) {
    setActive(id);
    if (scroll) scrollToInfo();
  }

  return (
    <div className="fc-page">
      <link rel="stylesheet" href={FEED_CARD_FONTS_URL} />
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="feed-card" />

      <div className="fc-app">
        <HeroHeader activeSection={active} onSelectSection={selectSection} />
        <main>
          <FeedCardInfo ref={infoRef} activeSection={active} />
          <FaqSection />
        </main>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
