import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useScrollToTop from '../../hooks/useScrollToTop';
// First, as the standalone app's index.css was: the base rules the components' styles build on.
import './YuvaKrushi.css';
import Hero from './components/Hero.jsx';
import FeatureStrip from './components/FeatureStrip.jsx';
import Discover from './components/Discover.jsx';
import IdeaBanner from './components/IdeaBanner.jsx';
import JoinForm from './components/JoinForm.jsx';
import './App.css';

// Yuva Krushi: a pathway for young professionals to become agripreneurs. Imported from the
// standalone Yuva Krushi app (its App.jsx is the content below); the site navbar and footer
// frame it. All of its styles are scoped to .yk-page - see YuvaKrushi.css.

// The Yuva Krushi design's fonts the site doesn't already load (from the app's index.html).
const YK_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Montserrat:wght@700&family=Albert+Sans:wght@500&family=Nunito+Sans:opsz,wght@6..12,200..1000&family=Yellowtail&display=swap';

export default function YuvaKrushi({ onNavigate, isLoggedIn, user, onLogout }) {
  useScrollToTop('yuva-krushi');

  return (
    <div className="yk-page">
      <link rel="stylesheet" href={YK_FONTS_URL} />
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="yuva-krushi" />

      <div className="yk-app">
        <header className="yk-header">
          <div className="yk-card">
            <Hero />
            <FeatureStrip />
          </div>
        </header>

        <main className="yk-main">
          <Discover />
          <IdeaBanner />
          <JoinForm />
        </main>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
