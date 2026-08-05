import React, { useEffect } from 'react';
import { Target, Eye, GraduationCap, TrendingUp, Globe2, Truck } from 'lucide-react';
import './AboutUs.css';

import aboutHeroBg from '../assets/about_hero_bg.png';
import farmersMsmes from '../assets/farmers_msmes.jpg';
import ourVision from '../assets/our_vision.jpg';
import ourMission from '../assets/our_mission.jpg';
import why1 from '../assets/why_1.jpg';
import why2 from '../assets/why_2.jpg';
import why3 from '../assets/why_3.jpg';
import why4 from '../assets/why_4.jpg';
import why5 from '../assets/why_5.jpg';
import why6 from '../assets/why_6.jpg';
import why7 from '../assets/why_7.jpg';
import why8 from '../assets/why_8.jpg';

const OBJECTIVE_TEXT = 'FEED is a multi-state co-operative society working for the uplift of exports from all corners of India, We Provide Crucial technical software and social platform connecting : "Farmers, Traders, MSME industries & new entrepreneurs" in Rural and Semi Urban areas with "International markets, Export Promotional councils, Central and state governments, Banks and Financial institutes, ports" by organizing Exports Promotional meetings, Forming FPO\'s (product wise) and supporting the FPOs with technical information & support on processing export orders.';

const VISION_TEXT = 'To spread to all corners of India and emerge as a one-stop solution to farmers, small traders, MSMEs, new entrepreneurs from rural and semi-urban areas for marketing their agricultural commodities in domestic and International markets by means of effective technical interface.';

const MISSION_TEXT = 'To form product based cooperative societies (FPOs), impart the capacity building to export in the form of training sessions, provide the information on global marketing opportunities through "FEED STARTUP" Technology for their respective agricultural products and render end-to-end support in real-time export process i.e., from selection of buyers to shipment of good.';

const missionPillars = [
  { label: 'Training', icon: GraduationCap },
  { label: 'Capacity Building', icon: TrendingUp },
  { label: 'Global Marketing', icon: Globe2 },
  { label: 'End-to-End Support', icon: Truck }
];

const whyChooseFeed = [
  { num: '01', text: 'Registered under the Multi-State Cooperative Societies Act, 2002', img: why1, theme: 'theme-green' },
  { num: '02', text: 'India\'s first cooperative society for export promotion', img: why2, theme: 'theme-pink' },
  { num: '03', text: 'Supported by 15+ Government Ministries and Departments', img: why3, theme: 'theme-blue' },
  { num: '04', text: 'MoUs with 11 State Governments and UTs', img: why4, theme: 'theme-orange' },
  { num: '05', text: 'State-level Export Promotional Meetings (SEPMs)', img: why5, theme: 'theme-purple' },
  { num: '06', text: 'Product-based Export FPOs across the country', img: why6, theme: 'theme-yellow' },
  { num: '07', text: 'Modern processing and packaging units', img: why7, theme: 'theme-red' },
  { num: '08', text: 'End-to-end handholding support for exporters', img: why8, theme: 'theme-cyan' }
];

const AboutUs = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.scroll-fade');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-us-container" id="about-us">
      <div className="about-panel">

        {/* Hero: wordmark + main objective over the artwork */}
        <div className="about-hero" style={{ backgroundImage: `url(${aboutHeroBg})` }}>
          <div className="about-hero-fade" />

          <div className="about-hero-copy">
            <h2 className="feed-wordmark scroll-fade">
              <span className="wm-feed">FEED</span>
              <span className="wm-startup">STARTUP</span>
              <span className="wm-rocket" role="img" aria-label="rocket">🚀</span>
            </h2>

            <div className="wordmark-rule scroll-fade">
              <span className="rule-long" />
              <span className="rule-short" />
            </div>

            <div className="objective-heading scroll-fade">
              <span className="objective-badge"><Target size={20} strokeWidth={2.4} /></span>
              <h3>FEED Main Objective:</h3>
            </div>

            <p className="objective-text scroll-fade">{OBJECTIVE_TEXT}</p>
          </div>
        </div>

        {/* Objective / Vision / Mission cards */}
        <div className="about-cards">

          <article className="about-card card-green scroll-fade">
            <div className="card-head">
              <span className="card-icon"><Target size={22} strokeWidth={2.4} /></span>
              <h4>Main Objective</h4>
            </div>
            <p className="card-text">{OBJECTIVE_TEXT}</p>
            <div className="card-media">
              <img src={farmersMsmes} alt="Farmers and MSMEs using FEED technology" />
            </div>
          </article>

          <article className="about-card card-purple scroll-fade">
            <div className="card-head">
              <span className="card-icon"><Eye size={22} strokeWidth={2.4} /></span>
              <h4>Vision</h4>
            </div>
            <p className="card-text">{VISION_TEXT}</p>
            <div className="card-media">
              <img src={ourVision} alt="FEED vision of a connected agricultural future" />
            </div>
          </article>

          <article className="about-card card-orange scroll-fade">
            <div className="card-head">
              <span className="card-icon"><Target size={22} strokeWidth={2.4} /></span>
              <h4>Mission</h4>
            </div>
            <p className="card-text">
              {MISSION_TEXT}
              <span className="card-emoji" role="img" aria-label="rocket">🚀</span>
            </p>
            <div className="card-media">
              <img src={ourMission} alt="FPO exporters shaking hands on a global export deal" />
            </div>
            <ul className="mission-pillars">
              {missionPillars.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <span className="pillar-icon"><Icon size={18} strokeWidth={2.2} /></span>
                  <span className="pillar-label">{label}</span>
                </li>
              ))}
            </ul>
          </article>

        </div>
      </div>

      {/* Why Choose Section */}
      <div className="why-choose-section scroll-fade">
        <div className="why-choose-header">
          <h3>Why Choose <span>FEED?</span></h3>
        </div>
        <p className="why-choose-sub">The definitive ecosystem for agricultural and MSME exports</p>

        <div className="why-choose-grid">
          {whyChooseFeed.map((point, index) => (
            <div key={index} className={`ap-why-item ${point.theme} scroll-fade`}>
              <div className="ap-why-num">{point.num}</div>
              <div className="ap-why-img-wrapper">
                <img src={point.img} alt={`Reason ${point.num}`} className="ap-why-img" />
              </div>
              <p className="ap-why-text">{point.text}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default AboutUs;
