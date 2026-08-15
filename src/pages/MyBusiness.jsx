import React from 'react';
import {
  ArrowRight,
  User,
  LayoutDashboard,
  Wallet,
  FileCheck,
  Users,
  Target,
  PiggyBank,
  Megaphone,
  BarChart3,
  Handshake,
  LogOut,
  Store,
  ChevronRight
} from 'lucide-react';
import './MyBusiness.css';

// Importing generated illustrations
import aboutImg from '../assets/my-business/about_business_icon.jpg';
import accountImg from '../assets/my-business/business_account_icon.jpg';
import planImg from '../assets/my-business/business_plan_icon.jpg';
import capacityImg from '../assets/my-business/capacity_building_icon.jpg';
import compliancesImg from '../assets/my-business/compliances_icon.jpg';
import agmImg from '../assets/my-business/agm_board_icon.jpg';
import loansImg from '../assets/my-business/loans_schemes_icon.jpg';
import reportsImg from '../assets/my-business/reports_icon.jpg';

const navItems = [
  { name: 'Business Profile', icon: <User size={18} /> },
  { name: 'Business Account', icon: <Wallet size={18} /> },
  { name: 'Compliances & Registration', icon: <FileCheck size={18} /> },
  { name: 'Agm & Board', icon: <Users size={18} /> },
  { name: 'Business Plan', icon: <Target size={18} /> },
  { name: 'Loans & Schemes', icon: <PiggyBank size={18} /> },
  { name: 'Marketing Support', icon: <Megaphone size={18} /> },
  { name: 'Reports', icon: <BarChart3 size={18} /> },
  { name: 'Business Connect', icon: <Handshake size={18} /> },
];

const row1Services = [
  {
    title: 'About Business',
    description: 'Know more about your business profile',
    illustration: aboutImg,
    accent: '#2563eb', // blue
  },
  {
    title: 'Business Account',
    description: 'Manage your accounts and transactions',
    illustration: accountImg,
    accent: '#16a34a', // green
  },
  {
    title: 'Business Plan',
    description: 'Plan, analyze and achieve your goals',
    illustration: planImg,
    accent: '#9333ea', // purple
  },
  {
    title: 'Capacity Building',
    description: 'Upskill and grow your business capabilities',
    illustration: capacityImg,
    accent: '#d97706', // orange/brown
  },
  {
    title: 'Compliances',
    description: 'Stay compliant and meet requirements',
    illustration: compliancesImg,
    accent: '#e11d48', // red/pink
  }
];

const row2Services = [
  {
    title: 'Agm & Board',
    description: 'Manage meetings and board activities',
    illustration: agmImg,
    accent: '#0d9488', // teal
  },
  {
    title: 'Loans & Schemes',
    description: 'Discover loans and government schemes',
    illustration: loansImg,
    accent: '#ea580c', // orange/gold
  },
  {
    title: 'Reports',
    description: 'View analytics and download reports',
    illustration: reportsImg,
    accent: '#0284c7', // blue
  }
];

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyBusiness({ onNavigate, isLoggedIn, user, onLogout }) {
  return (
    <>
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
      <div className="mb-layout">
      {/* Sidebar */}
      <aside className="mb-sidebar">
        <div className="mb-sidebar-top">
          <div className="mb-sidebar-menu">
            <div className="mb-menu-item-active">
              <div className="mb-menu-item-left">
                <Store size={20} />
                <span>My Business</span>
              </div>
              <ChevronRight size={16} />
            </div>

            <div className="mb-nav-list">
              {navItems.map((item, idx) => (
                <div key={idx} className="mb-nav-item">
                  <div className="mb-nav-icon-wrapper">
                    {item.icon}
                  </div>
                  <span className="mb-nav-text">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


      </aside>

      {/* Main Content */}
      <main className="mb-main-content">
        {/* Topbar */}
        <header className="mb-header">
          <div className="mb-greeting">
            <h1>Hello 👋</h1>
            <p>Manage and grow your business with smart tools and insights.</p>
          </div>
        </header>

        {/* Services Grid */}
        <div className="mb-services-container">
          {/* Row 1: 5 cards */}
          <div className="mb-cards-row-5">
            {row1Services.map((service, idx) => {
              const animations = ['mbFlyInLeft', 'mbFlyInTop', 'mbFlyInBottom', 'mbFlyInRight', 'mbFlyInLeft'];
              const animName = animations[idx % 5];
              return (
              <div key={`r1-${idx}`} className="mb-service-card mb-card-animated" style={{ 
                borderTop: `6px solid ${service.accent}`,
                animation: `${animName} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s forwards`
              }}>
                <div className="mb-card-img-wrap">
                  <img src={service.illustration} alt={service.title} />
                </div>
                <div className="mb-card-content">
                  <h3 style={{ color: service.accent }}>{service.title}</h3>
                  <p>{service.description}</p>
                  <button className="mb-card-arrow" style={{ color: service.accent, borderColor: service.accent + '40' }}>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )})}
          </div>

          {/* Row 2: 3 cards */}
          <div className="mb-cards-row-3">
            {row2Services.map((service, idx) => {
              const animations = ['mbFlyInBottom', 'mbFlyInTop', 'mbFlyInRight'];
              const animName = animations[idx % 3];
              return (
              <div key={`r2-${idx}`} className="mb-service-card wide-card mb-card-animated" style={{ 
                borderTop: `6px solid ${service.accent}`,
                animation: `${animName} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${(idx + 5) * 0.1}s forwards`
              }}>
                <div className="mb-card-img-wrap">
                  <img src={service.illustration} alt={service.title} />
                </div>
                <div className="mb-card-content">
                  <h3 style={{ color: service.accent }}>{service.title}</h3>
                  <p>{service.description}</p>
                  <button className="mb-card-arrow" style={{ color: service.accent, borderColor: service.accent + '40' }}>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )})}
          </div>
        </div>
      </main>
    </div>
    <Footer />
  </>
  );
}
