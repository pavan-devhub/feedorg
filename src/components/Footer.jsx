import React from 'react';
import { ChevronRight, Headset, Layers, Link as LinkIcon, Phone, Send } from 'lucide-react';
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa';
import { SERVICE_ROUTES } from './Navbar';
import scrollToSection from '../utils/scrollToSection';
import './Footer.css';

// `section` is a block on the home page, `page` a page of its own
const QUICK_LINKS = [
  { label: 'About Us', section: 'about-us' },
  { label: 'Services', section: 'services-block' },
  { label: 'Contact Us', page: 'contact' },
];

// Same destinations as the navbar's services menu, so entries it leaves inert are plain text here too.
// Shown as two lists side by side
const SERVICES_LEFT = [
  { label: 'MY ORG' },
  { label: 'MY BUSINESS', page: SERVICE_ROUTES['MY BUSINESS'] },
  { label: 'MY EXPORTS', page: SERVICE_ROUTES['MY EXPORTS'] },
  { label: 'KRUSHI YEVA JAYATE', page: SERVICE_ROUTES['KRUSHI YEVA JAYATE'], compact: true },
  { label: 'PRODUCT 360', page: SERVICE_ROUTES['PRODUCT 360'] },
  { label: 'SAFE MISSION', page: SERVICE_ROUTES['SAFE MISSION'] },
  { label: 'MY MARKET' },
];

const SERVICES_RIGHT = [
  { label: 'EPM', page: SERVICE_ROUTES.EPM },
  { label: 'TRADE FAIRS', page: SERVICE_ROUTES['TRADE FAIRS'] },
  { label: 'MY EDUCATION' },
  { label: 'FEED WORLD', page: SERVICE_ROUTES['FEED WORLD'] },
  { label: 'FEED CARD', page: SERVICE_ROUTES['FEED CARD'] },
  { label: 'MY TOOLS', page: SERVICE_ROUTES['MY TOOLS'] },
  { label: 'KNOW YOUR SCHEMES', page: SERVICE_ROUTES['KNOW YOUR SCHEMES'], compact: true },
  { label: 'LOANS & FINANCE', page: SERVICE_ROUTES['LOANS & FINANCE'] },
  { label: 'YUVA KRISHI', page: SERVICE_ROUTES['YUVA KRUSHI'] },
];

// None of these have a page in the app yet
const HELP_LINKS = [
  { label: "FAQ's" },
  { label: 'Reporting' },
  { label: 'Documentation' },
  { label: 'Support Policy' },
  { label: 'Terms & Conditions' },
  { label: 'Disclaimer' },
];

// Fill in each `href` once FEED's profile addresses are known; until then the icon is not a link
const SOCIAL_LINKS = [
  { label: 'Facebook', icon: FaFacebookF, href: '' },
  { label: 'LinkedIn', icon: FaLinkedinIn, href: '' },
  { label: 'Instagram', icon: FaInstagram, href: '' },
  { label: 'YouTube', icon: FaYoutube, href: '' },
];

// The footer is mounted by every page, most of them without an onNavigate prop, so it asks App directly.
// `section` is a block for App to scroll to once that page is showing
const openPage = (page, section) => {
  window.dispatchEvent(new CustomEvent('feed:navigate', { detail: { page, section } }));
};

const openSection = (id) => {
  if (document.getElementById(id)) scrollToSection(id);
  else openPage('home', id);
};

const LinkList = ({ links }) => (
  <ul className="footer-links">
    {links.map(({ label, page, section, compact }) => (
      <li key={label}>
        <ChevronRight className="footer-chevron" strokeWidth={3} aria-hidden="true" />
        {page || section ? (
          <button
            type="button"
            className={`footer-link${compact ? ' footer-link--compact' : ''}`}
            onClick={() => (page ? openPage(page) : openSection(section))}
          >
            {label}
          </button>
        ) : (
          <span className="footer-link-text">{label}</span>
        )}
      </li>
    ))}
  </ul>
);

const ColumnTitle = ({ icon: Icon, children }) => (
  <h4 className="footer-title">
    <span className="footer-title-icon"><Icon aria-hidden="true" /></span>
    <span className="footer-title-text">{children}</span>
  </h4>
);

// The plane along the top of the footer, in the strip of sky above the panel. It flies left to right on a
// loop; the motion itself is in Footer.css
const FooterFlight = () => (
  <svg className="footer-flight" viewBox="-108 -42 170 84" aria-hidden="true">
    <defs>
      <linearGradient id="footer-plane-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.6" stopColor="#f1f5fa" />
        <stop offset="1" stopColor="#bccbdd" />
      </linearGradient>
      <linearGradient id="footer-plane-wing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5db4f5" />
        <stop offset="1" stopColor="#1a7fe0" />
      </linearGradient>
      <linearGradient id="footer-plane-fin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e4effa" />
        <stop offset="1" stopColor="#8fc3ef" />
      </linearGradient>
      <linearGradient id="footer-plane-trail" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stopColor="#3f9b2c" />
        <stop offset="0.45" stopColor="#8cc56f" stopOpacity="0.75" />
        <stop offset="1" stopColor="#c9e4b4" stopOpacity="0" />
      </linearGradient>
    </defs>

    <g transform="rotate(-6)">
      <g className="footer-plane-art">
        {/* Green swoosh */}
        <path d="M -4 29 C -24 41 -54 37 -78 22 C -88 15 -96 8 -102 1 C -84 17 -58 27 -34 25 C -24 24.5 -15 23 -9 21 Z" fill="url(#footer-plane-trail)" />
        {/* Far wing */}
        <path d="M 20 -8 L -3 -9 L -24 -28 C -25.5 -29.5 -24 -31 -22 -30.5 L -11 -29 Z" fill="url(#footer-plane-wing)" />
        {/* Tail fin */}
        <path d="M -41 -4 L -50 -29 C -50.5 -31.5 -47 -33 -44.5 -31 L -24 -9 Z" fill="url(#footer-plane-fin)" />
        {/* Fuselage */}
        <path d="M -47 -2 C -32 -8 -6 -10 20 -10 C 35 -10 47 -7 52 -2 C 55 1 53 4 47 5.5 C 31 9.5 -8 10.5 -27 8.5 C -37 7.5 -44 3 -47 -2 Z" fill="url(#footer-plane-body)" />
        {/* Belly stripe */}
        <path d="M 52 -2.2 C 56 2 52 6 46 7.4 C 35 10 20 10.8 5 11 L 7 7.2 C 22 6.8 36 5.4 44 3 C 48 1.8 50.5 0.2 52 -2.2 Z" fill="#1a7fe0" />
        {/* Windows */}
        <g fill="#1a7fe0">
          <rect x="-31" y="-1.5" width="4.6" height="6" rx="1.4" />
          <rect x="-19" y="-2.2" width="4.6" height="6" rx="1.4" />
          <rect x="-7" y="-2.8" width="4.6" height="6" rx="1.4" />
          <rect x="5" y="-3.2" width="4.6" height="6" rx="1.4" />
          <rect x="29" y="-7" width="4" height="3.8" rx="1.1" />
          <rect x="34.5" y="-6.7" width="4" height="3.8" rx="1.1" />
          <rect x="40" y="-6" width="4" height="3.8" rx="1.1" />
        </g>
        {/* Tailplane */}
        <path d="M -54 8.5 C -47 2.5 -38 -0.5 -28 1 C -30 5.5 -42 10.5 -51 10.5 C -53 10.5 -55 9.5 -54 8.5 Z" fill="#64b5f6" />
        {/* Near wing, green along its trailing edge */}
        <path d="M 23 3 C 18 13 7 24 -5 31 C -11 34 -19 34 -24 31 C -14 32 -6 28 0 23 Z" fill="#3f9b2c" />
        <path d="M 23 3 C 12 3 -2 4.5 -8 7.5 C -12 15 -18 25 -24 31 C -17 32.5 -10 31 -5 28 C 7 22 17 12 23 3 Z" fill="url(#footer-plane-wing)" />
      </g>
    </g>
  </svg>
);

const Footer = () => (
  <footer className="new-footer">
    <img src="/images/footer/footer-farm.webp" alt="" className="footer-banner-img" />
    <div className="footer-panel" aria-hidden="true" />
    <img src="/images/footer/footer-front.webp" alt="" className="footer-front" />

    <div className="footer-content">
      <FooterFlight />
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/images/footer/feed-logo.png" alt="" className="footer-logo" />
          <p className="footer-brand-name">FEED</p>
          <p className="footer-about">
            FEED is a multi-state cooperative society working for the uplift of exports from all corners of India.
          </p>
          <p className="footer-subscribe-title">Stay updated with latest insights &amp; opportunities</p>
          <form className="footer-subscribe" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="Your e-mail address" aria-label="Your e-mail address" required />
            <button type="submit" aria-label="Subscribe">
              <Send aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className="footer-col footer-col--quick">
          <ColumnTitle icon={LinkIcon}>Quick Links</ColumnTitle>
          <LinkList links={QUICK_LINKS} />
        </div>

        <div className="footer-col footer-col--help">
          <ColumnTitle icon={Headset}>FEED Help</ColumnTitle>
          <LinkList links={HELP_LINKS} />
        </div>

        <div className="footer-col footer-col--services">
          <ColumnTitle icon={Layers}>FEED Services</ColumnTitle>
          <div className="footer-services-lists">
            <LinkList links={SERVICES_LEFT} />
            <LinkList links={SERVICES_RIGHT} />
          </div>
        </div>

        <div className="footer-col footer-col--contact">
          <ColumnTitle icon={Phone}>Get In Touch with Us</ColumnTitle>
          <ul className="footer-contact">
            <li><FaMapMarkerAlt aria-hidden="true" />Vijayawada</li>
            <li><Phone aria-hidden="true" /><a href="tel:+919293858689">+91 9293858689</a></li>
            <li><FaEnvelope aria-hidden="true" /><a href="mailto:feedstartup2021@gmail.com">feedstartup2021@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright"><strong>&copy; 2026 FEED Organization.</strong> All Rights Reserved.</p>
        <div className="footer-follow">
          <span className="footer-follow-label">Follow Us:</span>
          <span className="footer-follow-divider" aria-hidden="true" />
          {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              className={`footer-social footer-social--${label.toLowerCase()}`}
              aria-label={label}
              {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
