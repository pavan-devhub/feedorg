import React from 'react';
import './Footer.css';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="modern-footer">
      {/* Decorative Top Border */}
      <div className="footer-gradient-bar"></div>
      
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-grid">
          
          {/* Column 1: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="heading-underline"></div>
            <ul className="footer-links">
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Sitemap</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Pricing</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Join us</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Contact us</a></li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <div className="heading-underline"></div>
            <ul className="footer-links">
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> My Fpo</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> My Farm</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> My Business</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> My Products</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> My Exports</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> My Market</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> My Education</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> My Tools</a></li>
            </ul>
          </div>

          {/* Column 3: FEED Insights */}
          <div className="footer-col">
            <h4 className="footer-heading">FEED Insights</h4>
            <div className="heading-underline"></div>
            <ul className="footer-links">
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Suggestions</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Sample works</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Queries</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Compliants</a></li>
            </ul>
          </div>

          {/* Column 4: Help */}
          <div className="footer-col">
            <h4 className="footer-heading">Help</h4>
            <div className="heading-underline"></div>
            <ul className="footer-links">
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> FAQs</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Reporting</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Documentation</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Support Policy</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Terms & conditions</a></li>
              <li><a href="#" className="highlight-link"><ArrowRight className="link-icon" size={14} /> Privacy Policy</a></li>
              <li><a href="#"><ArrowRight className="link-icon" size={14} /> Disclaimer</a></li>
            </ul>
          </div>
          
          {/* Column 5: Connect with us (Newsletter & Social) */}
          <div className="footer-col connect-col">
            <h4 className="footer-heading">Connect with us</h4>
            <div className="heading-underline"></div>
            
            <p className="footer-desc">Stay updated with our latest insights, services, and opportunities.</p>
            
            <div className="newsletter-box">
              <input type="email" placeholder="Enter email address" className="newsletter-input" />
              <button className="newsletter-btn">Subscribe</button>
            </div>
            
            <div className="social-icons">
              <a href="#" className="social-icon facebook" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-icon twitter" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="social-icon pinterest" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 20a3.6 3.6 0 0 1-2-3c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-2 0-3.5-1M12 12v12"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </a>
            </div>
          </div>
          
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              © {new Date().getFullYear()} FEED Organization. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <a href="#">Privacy</a>
              <span className="dot-separator">•</span>
              <a href="#">Terms</a>
              <span className="dot-separator">•</span>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Decorative Background Elements */}
      <div className="footer-bg-glow-1"></div>
      <div className="footer-bg-glow-2"></div>
    </footer>
  );
};

export default Footer;
