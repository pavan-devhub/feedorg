import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Headphones,
  User,
  MessageSquare,
  Send,
  Lock,
  ExternalLink,
  Clock,
  HeartHandshake,
  Users,
} from 'lucide-react';
import logoImage from '../assets/logo.webp';
import './ContactUs.css';
import Footer from './Footer';
import Navbar from './Navbar';

const MAPS_URL = 'https://maps.app.goo.gl/Go2hsc82AL3rFNW59';
const MAP_EMBED_URL =
  'https://www.google.com/maps?q=16.5388453,80.634379&z=17&output=embed';

const SocialIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    {children}
  </svg>
);

const FacebookIcon = () => (
  <SocialIcon>
    <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v8h4v-8h3.2L17 11h-4V9c0-.6.4-1 1-1z" />
  </SocialIcon>
);

const InstagramIcon = () => (
  <SocialIcon>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.5 6.8a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
  </SocialIcon>
);

const TwitterIcon = () => (
  <SocialIcon>
    <path d="M18.2 2H21l-6.6 7.5L22 22h-6.2l-4.9-6.4L5.6 22H3l7.1-8.1L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z" />
  </SocialIcon>
);

const LinkedinIcon = () => (
  <SocialIcon>
    <path d="M6.3 9.3H2.9V21h3.4V9.3zM4.6 3A2 2 0 1 0 4.6 7a2 2 0 0 0 0-4zM21 21h-3.4v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H10V9.3h3.3v1.6h.1c.5-.9 1.6-1.9 3.3-1.9 3.5 0 4.2 2.3 4.2 5.3V21z" />
  </SocialIcon>
);

const YoutubeIcon = () => (
  <SocialIcon>
    <path d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.4.6A3 3 0 0 0 .5 7.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-4.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
  </SocialIcon>
);

const ContactUs = ({ onNavigate }) => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState('Fetching live address from map coordinates...');

  useEffect(() => {
    const match = MAP_EMBED_URL.match(/q=([0-9.]+),([0-9.]+)/);
    if (match) {
      const lat = match[1];
      const lon = match[2];
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress('Address could not be resolved from coordinates.');
          }
        })
        .catch(err => {
          console.error("Geocoding failed:", err);
          setAddress('Address could not be fetched (Network Error).');
        });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: '', mobile: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <Navbar onNavigate={onNavigate} />
        <div className="contact-hero-grid" aria-hidden="true" />
        <button type="button" className="contact-back" onClick={() => onNavigate('home')}>
          <ArrowLeft size={16} />
          Home
        </button>

        <div className="contact-hero-logo">
          <img src={logoImage} alt="FEED logo" />
        </div>

        <div className="contact-hero-copy">
          <div className="contact-hero-underline" />
          <h1>
            Let&apos;s Connect, Let&apos;s <span className="accent">Grow Together</span>
          </h1>
          <p>
            We&apos;re here to help you with any questions, feedback, or partnership opportunities.
          </p>
        </div>

        <div className="contact-plane-trail" aria-hidden="true" />
        <div className="contact-plane" aria-hidden="true">
          <Send size={28} fill="currentColor" />
        </div>

        <div className="contact-hero-art" aria-hidden="true">
          <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hillA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
              <linearGradient id="hillB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <path d="M0 110 C180 70 280 130 420 95 C560 60 640 120 780 90 C920 60 1040 110 1180 80 C1280 60 1360 90 1440 70 L1440 160 L0 160 Z" fill="url(#hillB)" />
            <path d="M0 130 C220 100 340 145 520 120 C700 95 820 140 980 115 C1120 95 1260 130 1440 110 L1440 160 L0 160 Z" fill="url(#hillA)" />
            <g fill="#cbd5e1">
              <rect x="980" y="48" width="10" height="55" rx="2" />
              <polygon points="985,30 970,55 1000,55" fill="#94a3b8" />
              <rect x="1020" y="40" width="10" height="63" rx="2" />
              <polygon points="1025,22 1010,48 1040,48" fill="#94a3b8" />
              <rect x="1060" y="52" width="10" height="51" rx="2" />
              <polygon points="1065,34 1050,58 1080,58" fill="#94a3b8" />
            </g>
            <g>
              <rect x="1120" y="78" width="18" height="55" fill="#2563eb" />
              <rect x="1150" y="68" width="18" height="65" fill="#1d4ed8" />
              <rect x="1180" y="88" width="18" height="45" fill="#3b82f6" />
              <rect x="1210" y="74" width="22" height="18" fill="#f97316" />
              <rect x="1240" y="74" width="22" height="18" fill="#2563eb" />
              <rect x="1270" y="74" width="22" height="18" fill="#ea580c" />
              <rect x="1305" y="95" width="90" height="28" rx="8" fill="#1e40af" />
            </g>
            <g>
              <rect x="180" y="118" width="110" height="14" rx="4" fill="#64748b" />
              <rect x="200" y="104" width="70" height="18" rx="4" fill="#ffffff" />
              <circle cx="215" cy="132" r="8" fill="#1e293b" />
              <circle cx="255" cy="132" r="8" fill="#1e293b" />
            </g>
          </svg>
        </div>
      </section>

      <div className="contact-main">
        <article className="contact-card branch-card">
          <div className="branch-header">
            <div className="branch-icon">
              <Building2 size={22} />
            </div>
            <div>
              <span className="label">Branch Office</span>
              <span className="city">Vijayawada</span>
            </div>
          </div>

          <div className="branch-address">
            <MapPin size={18} />
            <p>{address}</p>
          </div>

          <div className="branch-map">
            <iframe
              title="FEED branch office location"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="maps-open-btn"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="contact-details">
            <h3>Contact Details</h3>
            <a className="detail-row" href="tel:+919293858689">
              <Phone size={16} />
              +91 9293858689
            </a>
            <a className="detail-row" href="mailto:info@feedorg.com">
              <Mail size={16} />
              info@feedorg.com
            </a>
            <a
              className="detail-row"
              href="https://www.feedorg.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe size={16} />
              www.feedorg.com
            </a>
          </div>

          <div className="response-badge">
            <div className="badge-icon">
              <Headphones size={16} />
            </div>
            <p>
              We usually respond <span>within 24 hours!</span>
            </p>
          </div>
        </article>

        <article className="contact-card form-card">
          <h2>Get in Touch</h2>
          <div className="form-accent" />

          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="field-icon name">
                <User size={16} />
              </span>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span className="field-icon mobile">
                <Phone size={16} />
              </span>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span className="field-icon email">
                <Mail size={16} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field textarea-field">
              <span className="field-icon message">
                <MessageSquare size={16} />
              </span>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="send-btn">
              <Send size={16} />
              Send Message
            </button>
          </form>

          <p className="privacy-note">
            <Lock size={13} />
            Your information is safe with us. We respect your privacy.
          </p>
          {submitted && (
            <p className="form-success">Thanks! Your message has been received.</p>
          )}
        </article>

        <aside className="contact-card social-rail">
          <h3>Connect with us</h3>
          <div className="social-rail-line" />
          <div className="social-links">
            <a className="social-link facebook" href="#" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a className="social-link instagram" href="#" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a className="social-link twitter" href="#" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a className="social-link linkedin" href="#" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a className="social-link youtube" href="#" aria-label="YouTube">
              <YoutubeIcon />
            </a>
          </div>
          <div className="social-footer">
            <div className="social-footer-icon">
              <Users size={20} />
            </div>
          </div>
        </aside>
      </div>

      <section className="contact-info-bar">
        <div className="info-item">
          <div className="info-icon hours">
            <Clock size={18} />
          </div>
          <div className="info-copy">
            <strong>Office Hours</strong>
            <p>Mon - Sat: 9:30 AM - 6:30 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon support">
            <Headphones size={18} />
          </div>
          <div className="info-copy">
            <strong>Quick Support</strong>
            <p>Call or email us anytime, we&apos;re happy to help.</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon partner">
            <HeartHandshake size={18} />
          </div>
          <div className="info-copy">
            <strong>Partnerships</strong>
            <p>Let&apos;s collaborate for a stronger tomorrow.</p>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon presence">
            <MapPin size={18} />
          </div>
          <div className="info-copy">
            <strong>Pan India Presence</strong>
            <p>Working across states to empower every stakeholder.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactUs;
