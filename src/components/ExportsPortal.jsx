import React from 'react';
import { 
  Search, Bell, Grid, ChevronRight, ChevronsLeft,
  HelpCircle, Flag, ShoppingBasket, Network,
  ShieldCheck, Landmark, GitCommit, FileText,
  Globe2, Map, Percent, PenTool, ArrowRight,
  Home, Target
} from 'lucide-react';
import './ExportsPortal.css';
import Navbar from './Navbar';
import Footer from './Footer';

const navItems = [
  { id: '1', title: 'Why Exports', icon: HelpCircle, active: true },
  { id: '2', title: 'How to Start Exports', icon: Flag },
  { id: '3', title: 'Product Selection', icon: ShoppingBasket },
  { id: '4', title: 'Buyers Connection', icon: Network },
  { id: '5', title: 'Export Policies & Regulations', icon: ShieldCheck },
  { id: '6', title: 'Export Finance & Insurance', icon: Landmark },
  { id: '7', title: 'Process & Export Order', icon: GitCommit },
  { id: '8', title: 'Export Documentation', icon: FileText },
  { id: '9', title: 'Global Trade Updates & Events', icon: Globe2 },
  { id: '10', title: 'Country Selection', icon: Map },
  { id: '11', title: 'Export Tariff & Benefits', icon: Percent },
  { id: '12', title: 'Tools & Services', icon: PenTool },
];

const cards = [
  {
    num: '01', title: 'Why Exports',
    desc: 'Understand the importance of exports and its benefits.',
    color: 'green',
    img: '/icons/icon_why_exports_1785919534482.jpg'
  },
  {
    num: '02', title: 'How to Start Exports',
    desc: 'Step-by-step guide to begin your export journey.',
    color: 'blue',
    img: '/icons/icon_start_exports_1785919544424.jpg'
  },
  {
    num: '03', title: 'Product Selection',
    desc: 'Choose the right products for global markets.',
    color: 'orange',
    img: '/icons/icon_product_selection_1785919553355.jpg'
  },
  {
    num: '04', title: 'Buyers Connection',
    desc: 'Connect with verified global buyers & importers.',
    color: 'purple',
    img: '/icons/icon_buyers_connection_1785919564348.jpg'
  },
  {
    num: '05', title: 'Export - Import Policies & Regulations',
    desc: 'Stay updated with policies, compliances & regulations.',
    color: 'pink',
    img: '/icons/icon_policies_1785919575221.jpg'
  },
  {
    num: '06', title: 'Export - Import Finance & Insurance',
    desc: 'Find financial support & insurance for exporters.',
    color: 'teal',
    img: '/icons/icon_finance_1785919584808.jpg'
  },
  {
    num: '07', title: 'Process & Export Order',
    desc: 'Complete export process from order to shipment.',
    color: 'yellow',
    img: '/icons/icon_process_order_1785919603239.jpg'
  },
  {
    num: '08', title: 'Export - Import Documentation',
    desc: 'Essential documents for smooth export operations.',
    color: 'blue-light',
    img: '/icons/icon_documentation_1785919613435.jpg'
  },
  {
    num: '09', title: 'Global Trade Updates & Events',
    desc: 'Latest trade updates, fairs, webinars & global events.',
    color: 'green-light',
    img: '/icons/icon_trade_updates_1785919624005.jpg'
  },
  {
    num: '10', title: 'Country Selection',
    desc: 'Explore country insights & export opportunities.',
    color: 'purple-light',
    img: '/icons/icon_country_selection_1785919634748.jpg'
  },
  {
    num: '11', title: 'Export - Import Tariff & Benefits',
    desc: 'Know tariffs, duty benefits & trade incentives.',
    color: 'orange-light',
    img: '/icons/icon_tariffs_1785919643320.jpg'
  },
  {
    num: '12', title: 'Tools & Services',
    desc: 'Useful tools and services to empower exporters.',
    color: 'blue',
    img: '/icons/icon_tools_services_1785919653740.jpg'
  },
];

const ExportsPortal = ({ onNavigate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc' }}>
      <Navbar onNavigate={onNavigate} />
      <div style={{ height: '86px', flexShrink: 0 }}></div>

      <div className="ep-layout">
        {/* LEFT SIDEBAR */}
        <aside className="ep-sidebar">
          <nav className="ep-nav-list">
            {navItems.map((item) => (
              <div key={item.id} className={`ep-nav-item ${item.active ? 'active' : ''}`}>
                <item.icon size={18} className="ep-nav-icon" />
                <span>{item.title}</span>
                {item.active && <ChevronRight size={16} className="ep-nav-arrow" />}
              </div>
            ))}
          </nav>

          <div className="ep-sidebar-footer">
            <div className="ep-cta-card">
              <div className="ep-cta-icon">
                <Target size={24} color="#16a34a" />
              </div>
              <h4>Ready to take your products global?</h4>
              <p>Explore step-by-step export guidance</p>
              <button className="ep-cta-btn">
                Get Started <ArrowRight size={14} />
              </button>
            </div>
            <div className="ep-copyright">
              © 2026 FEED Organization. All rights reserved.
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="ep-main-content">
        
        {/* HEADER */}
        <header className="ep-header">
          <div className="ep-header-titles">
            <h1>My Exports Hub</h1>
            <p>Everything you need to start, grow and succeed in global markets.</p>
          </div>
          <div className="ep-header-actions">
            <div className="ep-search">
              <Search size={16} className="ep-search-icon" />
              <input type="text" placeholder="Search FPO's, Schemes, Policies..." />
            </div>
            <button className="ep-quick-menu">
              <Grid size={16} />
              Quick Menu
            </button>
            <button className="ep-bell">
              <Bell size={20} />
              <span className="ep-bell-dot"></span>
            </button>
            <div className="ep-avatar">
              <img src="https://i.pravatar.cc/100?img=11" alt="User avatar" />
            </div>
          </div>
        </header>


        {/* GRID OF CARDS */}
        <div className="ep-cards-grid">
          {cards.map((card, idx) => (
            <div className="ep-card" key={idx}>
              <div className={`ep-card-badge color-${card.color}`}>{card.num}</div>
              <div className="ep-card-content">
                <div className="ep-card-icon-area">
                  <div className={`ep-icon-circle color-${card.color}`}>
                    <img src={card.img} alt={card.title} className="ep-card-image" />
                  </div>
                </div>
                <div className="ep-card-text-area">
                  <h3>{card.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ExportsPortal;
