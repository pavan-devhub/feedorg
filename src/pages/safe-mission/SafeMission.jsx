import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useScrollToTop from '../../hooks/useScrollToTop';
// The page base first: the section stylesheets imported by the components below come after it.
import './SafeMission.css';
import Header from './components/Header/Header';
import TabsSection from './components/TabsSection/TabsSection';
import AboutSection from './components/AboutSection/AboutSection';
import ObjectivesSection from './components/ObjectivesSection/ObjectivesSection';
import WhySection from './components/WhySection/WhySection';
import HowSection from './components/HowSection/HowSection';
import DistrictModelSection from './components/DistrictModelSection/DistrictModelSection';
import JoinSection from './components/JoinSection/JoinSection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';

// S.A.F.E. Mission (Sustainable Agriculture for Farm Exports), imported from the standalone
// SafeMission app: its sections in the app's order, framed by the site navbar and footer.
// All of its styles are scoped to .sm-page (see SafeMission.css).

// The app's fonts (from its index.html); the site doesn't load these itself.
const SM_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Roboto+Condensed:wght@400;500;700;800&display=swap';

export default function SafeMission({ onNavigate, isLoggedIn, user, onLogout }) {
  useScrollToTop('safe-mission');

  return (
    <div className="sm-page">
      <link rel="stylesheet" href={SM_FONTS_URL} />
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="safe-mission" />

      <div className="sm-app">
        {/* Full-screen video with the section tabs (About / Objectives / Why / How) over it */}
        <div className="sm-hero">
          <Header />
          <TabsSection />
        </div>
        <AboutSection />
        <ObjectivesSection />
        <WhySection />
        <HowSection />
        <DistrictModelSection />
        <JoinSection />
        <TestimonialsSection />
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
