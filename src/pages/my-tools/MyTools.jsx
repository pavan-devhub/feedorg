import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useScrollToTop from '../../hooks/useScrollToTop';
import { MtRouter } from './router';
// First, as the app's index.css was: the page-wide base rules, under every screen's own styles.
import './MyTools.css';
import HomePage from './pages/HomePage.jsx';
import FarmerPage from './pages/FarmerPage.jsx';
import FinancialCalculatorsPage from './pages/FinancialCalculatorsPage.jsx';
import CropYieldCalculatorsPage from './pages/CropYieldCalculatorsPage.jsx';
import LandAreaCalculatorsPage from './pages/LandAreaCalculatorsPage.jsx';
import InsuranceSubsidyCalculatorsPage from './pages/InsuranceSubsidyCalculatorsPage.jsx';
import WeatherToolsPage from './pages/WeatherToolsPage.jsx';
import ExporterPage from './pages/ExporterPage.jsx';
import FpoPage from './pages/FpoPage.jsx';
import ShgPage from './pages/ShgPage.jsx';
import MsmePage from './pages/MsmePage.jsx';

// My Tools & Services, imported from the standalone My Tools app (it had a react-router route
// per screen). `screen` (navState.screen) is that route's path without the leading slash; none,
// or one this app doesn't have, shows the My Tools home. The site navbar and footer frame both.
const SCREENS = {
  farmer: FarmerPage,
  'farmer/financial-calculators': FinancialCalculatorsPage,
  'farmer/crop-yield-calculators': CropYieldCalculatorsPage,
  'farmer/land-area-calculators': LandAreaCalculatorsPage,
  'farmer/insurance-subsidy-calculators': InsuranceSubsidyCalculatorsPage,
  'farmer/weather-tools': WeatherToolsPage,
  exporter: ExporterPage,
  fpo: FpoPage,
  shg: ShgPage,
  msme: MsmePage,
};

// The app's font, Google Sans, with every axis its design uses (weight, optical size and the
// GRAD grade its headings set through font-variation-settings).
const MT_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Google+Sans:opsz,wght,GRAD@17..18,400..700,-50..200&display=swap';

export default function MyTools({ onNavigate, isLoggedIn, user, onLogout, screen }) {
  const screenId = Object.hasOwn(SCREENS, screen ?? '') ? screen : null;
  const Screen = screenId ? SCREENS[screenId] : HomePage;

  // New screens open at the top (the app's ScrollRestoration did this).
  useScrollToTop(screenId || 'home');

  return (
    <div className="mt-page">
      <link rel="stylesheet" href={MT_FONTS_URL} />
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="tools" />

      <MtRouter path={screenId ? `/${screenId}` : '/'} onNavigate={onNavigate}>
        <div className="mt-screen">
          <Screen />
        </div>
      </MtRouter>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
