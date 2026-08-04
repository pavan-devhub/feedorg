import React from 'react';
import {
  Users,
  UserCheck,
  Globe2,
  Eye,
  Target,
  BarChart,
  Handshake,
  Ship,
  Landmark,
  Leaf,
  FileCheck,
  Star,
  Users as UsersIcon,
  Package,
  Award,
  Wheat,
  ArrowRight,
  Rocket
} from 'lucide-react';
import './AboutUs.css';

const whyChooseData = [
  {
    num: '01',
    text: 'Registered under MSCS Act, 2002 (Regd No. 17/2020) in AP & Telangana.',
    icon: FileCheck,
    color: '#16a34a',
    bg: '#dcfce7',
    badgeColor: '#15803d',
    badgeBg: '#f0fdf4'
  },
  {
    num: '02',
    text: 'First-of-its-kind export based cooperative working for the uplift of farmers.',
    icon: Star,
    color: '#db2777',
    bg: '#fce7f3',
    badgeColor: '#be185d',
    badgeBg: '#fdf2f8'
  },
  {
    num: '03',
    text: 'Connects with 15+ Central Govt departments, Banks, Ports, and Councils.',
    icon: Landmark,
    color: '#2563eb',
    bg: '#dbeafe',
    badgeColor: '#1d4ed8',
    badgeBg: '#eff6ff'
  },
  {
    num: '04',
    text: 'Signs MoUs with State Governments to develop export entrepreneurship.',
    icon: Handshake,
    color: '#ea580c',
    bg: '#ffedd5',
    badgeColor: '#c2410c',
    badgeBg: '#fff7ed'
  },
  {
    num: '05',
    text: 'Conducts EXPORT PROMOTIONAL MEETINGS in all districts.',
    icon: UsersIcon,
    color: '#9333ea',
    bg: '#f3e8ff',
    badgeColor: '#7e22ce',
    badgeBg: '#faf5ff'
  },
  {
    num: '06',
    text: 'Forms PRODUCT-BASED EXPORT ORIENTED FPOs for top 10 products.',
    icon: Package,
    color: '#ca8a04',
    bg: '#fef08a',
    badgeColor: '#a16207',
    badgeBg: '#fefce8'
  },
  {
    num: '07',
    text: 'Assists FPOs in establishing processing units for international standards.',
    icon: Award,
    color: '#e11d48',
    bg: '#ffe4e6',
    badgeColor: '#be123c',
    badgeBg: '#fff1f2'
  },
  {
    num: '08',
    text: 'Provides end-to-end support in capturing domestic & international markets.',
    icon: Globe2,
    color: '#4f46e5',
    bg: '#e0e7ff',
    badgeColor: '#4338ca',
    badgeBg: '#eef2ff'
  }
];

const AboutUs = () => {
  return (
    <div className="about-us-wrapper" id="about-us">
      
      {/* Header Area with light gradient background */}
      <div className="about-header-bg">
        <div className="about-header-content">
          <div className="who-we-are-badge">
            <Users size={14} /> WHO WE ARE
          </div>
          <h2 className="about-title">
            About <span>FEED</span>
          </h2>
          <p className="about-subtitle">
            Empowering global opportunities, connecting communities, and driving sustainable growth.
          </p>
          <div className="leaf-divider">
            <Leaf size={18} />
          </div>
        </div>
      </div>

      {/* Grid of 4 large cards */}
      <div className="about-cards-grid">
        
        {/* Card 1: Farmers */}
        <div className="about-main-card card-farmers">
          <div className="card-top-bar">
            <div className="card-number-badge">01</div>
            <div className="card-icon-top"><UserCheck size={18} /></div>
          </div>
          <div className="card-content">
            <h3 className="card-heading">Farmers & <span>MSMEs</span></h3>
            <h4 className="card-subtitle">Empowering Bharat's Backbone</h4>
            <p className="card-desc">
              Uplifting farmers, traders, MSME industries & new entrepreneurs in Rural and Semi Urban areas across India.
            </p>
            <div className="card-icons-row">
              <div className="icon-col">
                <div className="icon-circle" style={{color: '#ea580c'}}><Wheat size={14} /></div>
                <span>Farmers</span>
              </div>
              <div className="icon-col">
                <div className="icon-circle" style={{color: '#84cc16'}}><BarChart size={14} /></div>
                <span>MSMEs</span>
              </div>
              <div className="icon-col">
                <div className="icon-circle" style={{color: '#16a34a'}}><Handshake size={14} /></div>
                <span>Traders</span>
              </div>
            </div>
            <button className="card-btn">Learn More <ArrowRight size={12} /></button>
          </div>
          <div className="card-illustration">
            <Wheat size={120} />
          </div>
        </div>

        {/* Card 2: Global Markets */}
        <div className="about-main-card card-markets">
          <div className="card-top-bar">
            <div className="card-number-badge">02</div>
            <div className="card-icon-top"><Globe2 size={18} /></div>
          </div>
          <div className="card-content">
            <h3 className="card-heading">Global <span>Markets</span></h3>
            <h4 className="card-subtitle">Connecting Beyond Borders</h4>
            <p className="card-desc">
              Connecting to International markets, Export Promotional councils, Central/State govts, Banks & ports for seamless trade.
            </p>
            <div className="card-icons-row">
              <div className="icon-col">
                <div className="icon-circle" style={{color: '#2563eb'}}><Globe2 size={14} /></div>
                <span>Global Reach</span>
              </div>
              <div className="icon-col">
                <div className="icon-circle" style={{color: '#0284c7'}}><Ship size={14} /></div>
                <span>Export Promotion</span>
              </div>
              <div className="icon-col">
                <div className="icon-circle" style={{color: '#4f46e5'}}><Landmark size={14} /></div>
                <span>Govt. & Banks</span>
              </div>
            </div>
            <button className="card-btn">Learn More <ArrowRight size={12} /></button>
          </div>
          <div className="card-illustration">
            <Globe2 size={120} />
          </div>
        </div>

        {/* Card 3: Our Vision */}
        <div className="about-main-card card-vision">
          <div className="card-top-bar">
            <div className="card-number-badge">03</div>
            <div className="card-icon-top"><Eye size={18} /></div>
          </div>
          <div className="card-content">
            <h3 className="card-heading">Our Vision <Eye size={20} /></h3>
            <h4 className="card-subtitle">One India. One Solution. Limitless Growth.</h4>
            <p className="card-desc">
              To spread to all corners of India and emerge as a one-stop solution to farmers, small traders, MSMEs, new entrepreneurs from rural and semi-urban areas for marketing their agricultural commodities in domestic and International markets by means of effective technical interface.
            </p>
            <button className="card-btn" style={{marginTop: '10px'}}>Learn More <ArrowRight size={12} /></button>
          </div>
          <div className="card-illustration">
             <Eye size={120} />
          </div>
        </div>

        {/* Card 4: Our Mission */}
        <div className="about-main-card card-mission">
          <div className="card-top-bar">
            <div className="card-number-badge">04</div>
            <div className="card-icon-top"><Target size={18} /></div>
          </div>
          <div className="card-content">
            <h3 className="card-heading">Our Mission <Rocket size={20} /></h3>
            <h4 className="card-subtitle">Building Cooperatives. Boosting Exports.</h4>
            <p className="card-desc">
              To form product based cooperative societies (FPOs), impart capacity building to export in the form of training sessions, provide information on global marketing opportunities through "FEED STARTUP", and render end-to-end support in real-time export processes.
            </p>
            <button className="card-btn" style={{marginTop: '10px'}}>Learn More <ArrowRight size={12} /></button>
          </div>
          <div className="card-illustration">
            <Rocket size={120} />
          </div>
        </div>

      </div>

      {/* Why Choose FEED Section */}
      <div className="why-choose-section">
        <div className="why-header">
          <Leaf size={20} />
          <h3>Why Choose <span>FEED</span>?</h3>
          <Leaf size={20} />
        </div>
        
        <div className="why-single-block">
          {whyChooseData.map((item, index) => (
            <div className="why-item" key={index}>
              <div className="why-item-top">
                <div 
                  className="why-icon" 
                  style={{color: item.color, backgroundColor: item.bg}}
                >
                  <item.icon size={16} />
                </div>
                <div 
                  className="why-badge" 
                  style={{color: item.badgeColor, backgroundColor: item.badgeBg}}
                >
                  {item.num}
                </div>
              </div>
              <p>{item.text}</p>
              <div 
                className="why-underline" 
                style={{backgroundColor: item.color}}
              ></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
