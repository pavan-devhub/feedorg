import React, { useState } from 'react';
import { 
  Bell, ChevronDown, User, Package, Users, FileText, Star, Settings,
  Home, Users2, Calendar, Sprout, ShieldCheck, Banknote, BookOpen,
  ArrowRightLeft, BarChart3, Activity, CheckCircle, MoreHorizontal,
  BellRing, ShoppingCart, Link2, ChevronRight, ArrowRight, TrendingUp,
  Megaphone, MapPin, CloudRain, TrendingDown
} from 'lucide-react';
import './Dashboard.css';

const sidebarMenu = [
  {
    category: '',
    items: [
      { id: 'profile', title: 'My Profile', icon: User },
      { id: 'org', title: 'MY Org', icon: Home },
      { id: 'accounts', title: 'My Accounts', icon: BookOpen },
      { id: 'reports', title: 'My Reports', icon: BarChart3 },
      { id: 'status', title: 'Status of Activities', icon: Activity },
      { id: 'compliances', title: 'My Compliances', icon: CheckCircle },
      { id: 'other', title: 'Other Services', icon: MoreHorizontal },
      { id: 'news', title: 'News & Alerts', icon: BellRing },
      { id: 'trade', title: 'My Trade', icon: ShoppingCart },
      { id: 'directory', title: 'Directory', icon: Users2 },
    ]
  }
];

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const marketItems = [
  { id: 1, name: 'Wheat', price: '₹2,200/q', trend: 'up', percent: '+2.4%', bg: 'bg-wheat', icon: 'W' },
  { id: 2, name: 'Rice (Paddy)', price: '₹2,100/q', trend: 'down', percent: '-1.2%', bg: 'bg-rice', icon: 'R' },
  { id: 3, name: 'Soyabean', price: '₹4,500/q', trend: 'up', percent: '+3.8%', bg: 'bg-soya', icon: 'S' },
  { id: 4, name: 'Maize', price: '₹2,350/q', trend: 'up', percent: '+1.5%', bg: 'bg-maize', icon: 'M' },
  { id: 5, name: 'Cotton', price: '₹7,200/q', trend: 'down', percent: '-0.8%', bg: 'bg-cotton', icon: 'C' },
  { id: 6, name: 'Sugarcane', price: '₹3,150/t', trend: 'up', percent: '+0.5%', bg: 'bg-sugar', icon: 'S' },
  { id: 7, name: 'Mustard', price: '₹5,400/q', trend: 'up', percent: '+4.2%', bg: 'bg-mustard', icon: 'M' },
];

const Dashboard = ({ onNavigate, isLoggedIn, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('0');

  // Simulated active tabs logic from ExportsPortal...
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc' }}>
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
      <div className="db-layout">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="db-sidebar">
        <div className="db-sidebar-bg" style={{ backgroundImage: "url('/images/sidebar_bg.avif')" }}>
          <div className="db-sidebar-overlay"></div>
        </div>
        
        <div className="db-sidebar-content">
          {/* Logo & Header */}
          <div className="db-sidebar-header">
            <div className="db-logo-wrapper">
              <img src="/dashboard-logo.avif" alt="Logo" className="db-logo" />
            </div>
            <div className="db-brand-text">
              <h2 className="db-brand-title">FEED MSCS</h2>
              <div className="db-brand-subtitle">SAFE MISSION</div>
              <div className="db-brand-tagline">Cooperative Dashboard</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="db-nav">
            {sidebarMenu.map((group, gIdx) => (
              <div key={gIdx} className="db-nav-group">
                {group.category && <h3 className="db-nav-category">{group.category}</h3>}
                <ul className="db-nav-list">
                  {group.items.map(item => (
                    <li
                      key={item.id}
                      className={`db-nav-item ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon size={18} className="db-nav-icon" />
                      <span className="db-nav-title">{item.title}</span>
                      {item.hasDropdown && <ChevronDown size={16} className="db-nav-arrow" />}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="db-main">
        
        {/* Top Header */}


        <div className="db-content-scroll">
          
          {activeTab !== 'profile' ? (
            <>
              {/* Hero Banner */}
          <section className="db-hero">
            <div className="db-hero-bg" style={{ backgroundImage: "url('/images/hero_bg.avif')" }}>
              <div className="db-hero-overlay"></div>
            </div>
            
            <div className="db-hero-content">
              <h2>Empowering Farmers,<br/>Building a Better Tomorrow</h2>
              <p>Manage, Grow, Achieve – All in One Place</p>
              <button className="db-btn-primary">
                Explore Dashboard <ArrowRight size={18} />
              </button>
            </div>
            
            <img src="/images/farmer_illustration.avif" alt="Farmer" className="db-hero-farmer" />
          </section>



          {/* Quick Actions */}
          <section className="db-quick-actions">
            <div className="db-section-header">
              <div className="db-section-line"></div>
              <h3>Quick Actions</h3>
            </div>
            
            <div className="db-actions-grid">
              
              <div className="db-action-card bg-pastel-green">
                <img src="/images/farmer_profile.avif" alt="Profile" className="db-action-img" />
                <h4>Update<br/>My Profile</h4>
                <button className="db-action-btn bg-dark-green"><ChevronRight size={18} /></button>
              </div>

              <div className="db-action-card bg-pastel-blue">
                <img src="/images/veg_produce.avif" alt="Product" className="db-action-img" />
                <h4>Add<br/>Product / Service</h4>
                <button className="db-action-btn bg-dark-blue"><ChevronRight size={18} /></button>
              </div>

              <div className="db-action-card bg-pastel-orange">
                <img src="/images/people_group.avif" alt="Members" className="db-action-img" />
                <h4>View<br/>Members</h4>
                <button className="db-action-btn bg-dark-orange"><ChevronRight size={18} /></button>
              </div>

              <div className="db-action-card bg-pastel-purple">
                <img src="/images/chart_report.avif" alt="Reports" className="db-action-img" />
                <h4>View<br/>Reports</h4>
                <button className="db-action-btn bg-dark-purple"><ChevronRight size={18} /></button>
              </div>

              <div className="db-action-card bg-pastel-pink">
                <img src="/images/megaphone.avif" alt="Alerts" className="db-action-img" />
                <h4>News &<br/>Alerts</h4>
                <button className="db-action-btn bg-dark-pink"><ChevronRight size={18} /></button>
              </div>

            </div>
          </section>



          <section className="db-widgets-grid">
            
            {/* Market Prices Widget */}
            <div className="db-widget-card">
              <div className="db-widget-header">
                <BarChart3 size={20} color="#ea580c" />
                <h3>Market Prices</h3>
              </div>
              <div className="db-market-list-container">
                <ul className="db-market-list">
                  {[...marketItems, ...marketItems].map((item, idx) => (
                    <li key={`${item.id}-${idx}`} className="db-market-item">
                      <div className="db-market-info">
                        <div className={`db-market-icon ${item.bg}`}>{item.icon}</div>
                        <div className="db-market-name">{item.name}</div>
                      </div>
                      <div className="db-market-price-wrap">
                        <div className="db-market-price">{item.price}</div>
                        <div className={`db-market-trend-${item.trend}`}>
                          {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {item.percent}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="db-widget-card">
              <div className="db-widget-header">
                <Calendar size={20} color="#166534" />
                <h3>Upcoming Events</h3>
              </div>
              <div className="db-widget-content">
                <div className="db-event-item">
                  <div className="db-event-date">
                    <span className="day">25</span>
                    <span className="month">MAY</span>
                  </div>
                  <div className="db-event-info">
                    <h4>AGM Meeting</h4>
                    <p>10:30 AM - Community Hall</p>
                  </div>
                </div>
                <div className="db-event-item">
                  <div className="db-event-date">
                    <span className="day">28</span>
                    <span className="month">MAY</span>
                  </div>
                  <div className="db-event-info">
                    <h4>Farmers Training Program</h4>
                    <p>11:00 AM - Training Center</p>
                  </div>
                </div>
              </div>
              <div className="db-widget-footer">
                <button className="db-view-all">View All</button>
              </div>
            </div>



          </section>
            </>
          ) : (
            <div style={{ padding: '24px' }}>
              <div className="hide-scrollbar" style={{ 
                display: 'flex', 
                gap: '12px', 
                overflowX: 'auto', 
                paddingBottom: '16px'
              }}>
                <button style={{ backgroundColor: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe', padding: '12px 20px', borderRadius: '12px', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                  <User size={18} /> My Details
                </button>
                <button style={{ backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '12px 20px', borderRadius: '12px', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                  <Package size={18} /> My Products
                </button>
                <button style={{ backgroundColor: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa', padding: '12px 20px', borderRadius: '12px', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                  <Users size={18} /> My Vendors
                </button>
                <button style={{ backgroundColor: '#fdf4ff', color: '#c026d3', border: '1px solid #fbcfe8', padding: '12px 20px', borderRadius: '12px', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                  <FileText size={18} /> My Certificates & Licences
                </button>
                <button style={{ backgroundColor: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', padding: '12px 20px', borderRadius: '12px', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                  <Star size={18} /> My Testimonials
                </button>
                <button style={{ backgroundColor: '#f0fdfa', color: '#0d9488', border: '1px solid #ccfbf1', padding: '12px 20px', borderRadius: '12px', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                  <Settings size={18} /> Active Subscriptions
                </button>
              </div>
              
              <div style={{ marginTop: '24px', minHeight: '60vh', backgroundColor: '#fff', borderRadius: '16px', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '1.125rem' }}>
                <p>Content will appear here</p>
              </div>
            </div>
          )}
          
        </div>
      </main>

    </div>
    <Footer />
    </div>
  );
};

export default Dashboard;
