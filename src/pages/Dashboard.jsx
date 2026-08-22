import React, { useState } from 'react';
import {
  Bell, ChevronDown, User, Package, Users, FileText, Star, Settings,
  Home, Users2, Calendar, Sprout, ShieldCheck, Banknote, BookOpen,
  ArrowRightLeft, BarChart3, Activity, CheckCircle, MoreHorizontal,
  BellRing, ShoppingCart, Link2, ChevronRight, ArrowRight, TrendingUp,
  Megaphone, MapPin, CloudRain, TrendingDown, Info, ScrollText
} from 'lucide-react';
import './Dashboard.css';
import MyDetailsForm from '../components/MyDetailsForm';

const sidebarMenu = [
  {
    category: '',
    items: [
      {
        id: 'profile', title: 'My Profile', icon: User,
        subItems: [
          { id: 'profile-details', title: 'My Details', icon: User },
          { id: 'profile-products', title: 'My Products', icon: Package },
          { id: 'profile-vendors', title: 'My Vendors', icon: Users },
          { id: 'profile-certificates', title: 'My Certificates & Licences', icon: FileText },
          { id: 'profile-testimonials', title: 'My Testimonials', icon: Star },
          { id: 'profile-subscriptions', title: 'Active Subscriptions', icon: Settings },
        ]
      },
      {
        id: 'org', title: 'MY Org', icon: Home,
        subItems: [
          { id: 'org-about', title: 'About My Org', icon: Info },
          {
            id: 'org-members', title: 'My Members', icon: Users2,
            subItems: [
              { id: 'org-members-share-capital', title: 'Share Capital Registry - All Options', icon: ArrowRightLeft },
              { id: 'org-members-ledger', title: 'Member Ledger', icon: ScrollText },
            ]
          },
          { id: 'org-agm', title: 'AGM & BoD Meetings', icon: Calendar },
          { id: 'org-farm-activity', title: 'Farm Activity', icon: Sprout },
          { id: 'org-schemes', title: 'Schemes', icon: ShieldCheck },
          { id: 'org-loans', title: 'Loans & Finance', icon: Banknote },
        ]
      },
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

const statCards = [
  {
    id: 'members', label: 'Total Members', value: '1,248', trend: '+4.2%', trendLabel: 'vs last month',
    direction: 'up', icon: Users2, color: 'green', iconBg: '#dcfce7', iconColor: '#16a34a',
    points: '0,24 14,20 28,22 42,14 56,17 70,8 80,6',
  },
  {
    id: 'products', label: 'Active Products & Services', value: '86', trend: '+12', trendLabel: 'added this month',
    direction: 'up', icon: Package, color: 'blue', iconBg: '#dbeafe', iconColor: '#2563eb',
    points: '0,22 14,23 28,16 42,18 56,10 70,12 80,3',
  },
  {
    id: 'revenue', label: 'Monthly Revenue', value: '₹18.6L', trend: '+8.1%', trendLabel: 'vs last month',
    direction: 'up', icon: Banknote, color: 'purple', iconBg: '#f3e8ff', iconColor: '#9333ea',
    points: '0,20 14,18 28,21 42,12 56,15 70,7 80,9',
  },
  {
    id: 'compliances', label: 'Pending Compliances', value: '3', trend: '-2', trendLabel: 'resolved this week',
    direction: 'down', icon: ShieldCheck, color: 'orange', iconBg: '#ffedd5', iconColor: '#d97706',
    points: '0,6 14,10 28,9 42,15 56,14 70,20 80,24',
  },
];

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
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (depth, id) => {
    setOpenMenus(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (Number(k) >= depth) delete next[k]; });
      if (prev[depth] !== id) next[depth] = id;
      return next;
    });
  };

  const branchContainsActive = (item) => {
    if (item.id === activeTab) return true;
    return !!item.subItems && item.subItems.some(branchContainsActive);
  };

  const firstLeafId = (item) => (item.subItems ? firstLeafId(item.subItems[0]) : item.id);

  const renderNavItems = (items, depth = 0) => (
    <ul className={depth === 0 ? 'db-nav-list' : 'db-nav-sublist'}>
      {items.map(item => {
        const hasSubItems = !!item.subItems;
        const isOpen = openMenus[depth] === item.id;
        const isActiveBranch = branchContainsActive(item);
        return (
          <React.Fragment key={item.id}>
            <li
              className={`${depth === 0 ? 'db-nav-item' : 'db-nav-subitem'} ${isActiveBranch ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (hasSubItems) {
                  toggleMenu(depth, item.id);
                  setActiveTab(firstLeafId(item));
                } else {
                  setActiveTab(item.id);
                }
              }}
            >
              <item.icon size={depth === 0 ? 18 : 15} className="db-nav-icon" />
              <span className="db-nav-title">{item.title}</span>
              {hasSubItems && (
                <ChevronDown
                  size={16}
                  className="db-nav-arrow"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                />
              )}
            </li>
            {hasSubItems && isOpen && renderNavItems(item.subItems, depth + 1)}
          </React.Fragment>
        );
      })}
    </ul>
  );

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
                {renderNavItems(group.items)}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="db-main">
        
        {/* Top Header */}


        <div className="db-content-scroll">
          
          {!activeTab.startsWith('profile') ? (
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



          {/* Stats Grid */}
          <section className="db-stats-grid">
            {statCards.map(stat => {
              const StatIcon = stat.icon;
              const TrendIcon = stat.direction === 'up' ? TrendingUp : TrendingDown;
              return (
                <div key={stat.id} className="db-stat-card">
                  <div className="db-stat-icon-wrap" style={{ background: stat.iconBg }}>
                    <StatIcon size={22} color={stat.iconColor} />
                  </div>
                  <div className="db-stat-info">
                    <span className="db-stat-label">{stat.label}</span>
                    <span className="db-stat-value">{stat.value}</span>
                    <div className={`db-stat-trend text-${stat.color}`}>
                      <TrendIcon size={14} /> {stat.trend}
                      <span style={{ color: '#94a3b8', fontWeight: 500 }}>{stat.trendLabel}</span>
                    </div>
                  </div>
                  <svg className="db-mini-chart" viewBox="0 0 80 30" fill="none">
                    <polyline
                      points={stat.points}
                      className={`stroke-${stat.color}`}
                      fill="none"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              );
            })}
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

            {/* Announcement / Notice */}
            <div className="db-widget-card db-notice-card">
              <div className="db-widget-header">
                <Megaphone size={20} color="#db2777" />
                <h3>Latest Announcement</h3>
              </div>
              <div className="db-notice-content">
                <img src="/images/modern_indian_farmer.avif" alt="Subsidy scheme announcement" className="db-notice-img" />
                <div className="db-notice-info">
                  <strong>New Subsidy Scheme Announced</strong>
                  <p>Get up to 50% subsidy on drip irrigation equipment — limited slots available for FPO members this quarter.</p>
                  <button className="db-btn-success">Apply Now <ArrowRight size={14} /></button>
                </div>
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
                {[
                  { id: 'profile-details', label: 'My Details', icon: User, bg: '#eef2ff', color: '#4f46e5', border: '#c7d2fe' },
                  { id: 'profile-products', label: 'My Products', icon: Package, bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
                  { id: 'profile-vendors', label: 'My Vendors', icon: Users, bg: '#fff7ed', color: '#ea580c', border: '#fed7aa' },
                  { id: 'profile-certificates', label: 'My Certificates & Licences', icon: FileText, bg: '#fdf4ff', color: '#c026d3', border: '#fbcfe8' },
                  { id: 'profile-testimonials', label: 'My Testimonials', icon: Star, bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
                  { id: 'profile-subscriptions', label: 'Active Subscriptions', icon: Settings, bg: '#f0fdfa', color: '#0d9488', border: '#ccfbf1' },
                ].map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        backgroundColor: tab.bg,
                        color: tab.color,
                        border: isActive ? `2px solid ${tab.color}` : `1px solid ${tab.border}`,
                        padding: isActive ? '11px 19px' : '12px 20px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: isActive ? `0 4px 10px ${tab.border}` : '0 2px 4px rgba(0,0,0,0.05)',
                        flexShrink: 0
                      }}
                    >
                      <tab.icon size={18} /> {tab.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: '24px', minHeight: '60vh' }}>
                {activeTab === 'profile-details' ? (
                  <MyDetailsForm />
                ) : (
                  <div style={{ minHeight: '60vh', backgroundColor: '#fff', borderRadius: '16px', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '1.125rem' }}>
                    <p>Content will appear here</p>
                  </div>
                )}
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
