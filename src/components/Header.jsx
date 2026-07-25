import React from 'react';
import {
  Bell,
  ChevronDown,
  Leaf,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';

const quickSearches = [
  { label: 'Registrations', color: '#118AB2' },
  { label: 'Finance', color: '#EF476F' },
  { label: 'Documents', color: '#06D6A0' },
  { label: 'Shipping', color: '#FF9F1C' }
];

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="premium-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="brand-logo">
            <Leaf size={26} strokeWidth={2.4} />
          </div>
          <div className="brand-text">
            <span className="brand-eyebrow">Farmer Export Network</span>
            <h1 className="brand-title">FEED MSCS LTD</h1>
            <p className="brand-subtitle">FROM FARM TO THE WORLD</p>
          </div>
        </div>

        <div className="header-search">
          <div className="search-box">
            <Search size={21} className="search-icon" />
            <input 
              type="text" 
              aria-label="Search services and documents"
              placeholder="Search exports, documents, buyers, finance..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="mic-btn" type="button" aria-label="Voice search" style={{ '--btn-color': '#0496FF' }}>
              <Mic size={17} />
            </button>
          </div>
          <div className="search-quick-row" aria-label="Popular searches">
            {quickSearches.map((item) => (
              <button
                key={item.label}
                className="quick-search-chip"
                type="button"
                style={{ '--btn-color': item.color }}
                onClick={() => setSearchQuery(item.label)}
              >
                <Sparkles size={13} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="header-actions">
          <div className="header-status-card">
            <ShieldCheck size={18} />
            <div>
              <span>Export-ready</span>
              <strong>62%</strong>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="icon-btn" type="button" aria-label="Notifications" style={{ '--btn-color': '#E85D04' }}>
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <button className="profile-btn" type="button" aria-label="Open profile" style={{ '--btn-color': '#DC2F02' }}>
              <span className="profile-avatar-mini">
                <User size={18} />
              </span>
              <span className="profile-label">Member</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
