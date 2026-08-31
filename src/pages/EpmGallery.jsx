import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, ArrowRight, Star, X, ChevronLeft, ChevronRight, Users, Handshake, Globe, TrendingUp } from 'lucide-react';
import './EpmGallery.css';

// Reusable Image URLs (using Unsplash placeholders focused on meetings/conferences as requested)
// We avoid unrelated photos and ensure they all look like business/promotional meetings.
const IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', // Audience
  'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800', // Speaker stage
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800', // Handshake/networking
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800', // Panel discussion
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', // Audience clapping
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800', // Corporate meeting
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800', // Group discussion
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800', // Registration/Event
  'https://images.unsplash.com/photo-1475721028070-075e6d62a222?auto=format&fit=crop&q=80&w=800', // Speaker close-up
  'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800', // Presentation
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800', // Event Hall
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', // Workshop
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800', // Team
  'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&q=80&w=800', // Handshake closeup
];

// Helper to get random image from list for varied layouts
const getImg = (index) => IMAGES[index % IMAGES.length];

export default function EpmGallery({ onNavigate }) {
  const [lightbox, setLightbox] = useState({ isOpen: false, currentIndex: 0, items: [] });
  const [activeFilter, setActiveFilter] = useState('ALL');

  // All images registered for lightbox will be pushed here
  const openLightbox = (items, index) => {
    setLightbox({ isOpen: true, currentIndex: index, items });
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
  };

  const nextLightbox = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.items.length
    }));
  }, []);

  const prevLightbox = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length
    }));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, nextLightbox, prevLightbox]);

  // Scroll Animations Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  // Content Data
  const topFeatured = [
    { city: 'Pune, Maharashtra', title: 'EPM – Maharashtra', desc: 'Bringing together exporters and global buyers to explore new opportunities and partnerships.', img: getImg(0) },
    { city: 'Ahmedabad, Gujarat', title: 'EPM – Gujarat', desc: 'Promoting exports and showcasing Gujarat\'s products to international markets.', img: getImg(1) },
    { city: 'Bengaluru, Karnataka', title: 'EPM – Karnataka', desc: 'Creating global exposure for businesses and strengthening export capabilities.', img: getImg(2) },
    { city: 'Kolkata, West Bengal', title: 'EPM – West Bengal', desc: 'Connecting Bengal\'s vibrant industries with global buyers and opportunities.', img: getImg(3) }
  ];

  const cityStories = [
    { city: 'Pune', state: 'Maharashtra', desc: 'EPM – Export Promotional Meeting', img: getImg(4) },
    { city: 'Ahmedabad', state: 'Gujarat', desc: 'EPM – Export Promotional Meeting', img: getImg(5) },
    { city: 'Vijayawada', state: 'Andhra Pradesh', desc: 'EPM – Export Promotional Meeting', img: getImg(6) },
    { city: 'Hyderabad', state: 'Telangana', desc: 'EPM – Export Promotional Meeting', img: getImg(7) },
    { city: 'Bengaluru', state: 'Karnataka', desc: 'EPM – Export Promotional Meeting', img: getImg(8) },
    { city: 'Chennai', state: 'Tamil Nadu', desc: 'EPM – Export Promotional Meeting', img: getImg(9) },
  ];

  const archiveData = [
    { state: 'MAHARASHTRA', title: 'Pune Networking', city: 'Pune', img: getImg(0) },
    { state: 'GUJARAT', title: 'Keynote Session', city: 'Ahmedabad', img: getImg(1) },
    { state: 'KARNATAKA', title: 'Buyer Meet', city: 'Bengaluru', img: getImg(2) },
    { state: 'WEST BENGAL', title: 'Panel Discussion', city: 'Kolkata', img: getImg(3) },
    { state: 'DELHI', title: 'Delegates Arriving', city: 'New Delhi', img: getImg(4) },
    { state: 'ANDHRA PRADESH', title: 'Presentation', city: 'Vijayawada', img: getImg(5) },
    { state: 'TELANGANA', title: 'B2B Connect', city: 'Hyderabad', img: getImg(6) },
    { state: 'TAMIL NADU', title: 'Closing Ceremony', city: 'Chennai', img: getImg(7) },
    { state: 'MAHARASHTRA', title: 'Exhibitor Booth', city: 'Mumbai', img: getImg(8) },
    { state: 'GUJARAT', title: 'Roundtable', city: 'Surat', img: getImg(9) },
  ];

  const filteredArchive = activeFilter === 'ALL' ? archiveData : archiveData.filter(item => item.state === activeFilter);
  const filters = ['ALL', 'MAHARASHTRA', 'GUJARAT', 'ANDHRA PRADESH', 'TELANGANA', 'KARNATAKA', 'TAMIL NADU', 'WEST BENGAL', 'DELHI'];

  return (
    <div className="epm-gallery-page">
      {/* 1. PAGE INTRO */}
      <section className="eg-intro animate-on-scroll slide-up">
        <span className="eg-intro-subtitle">Export Promotional Meetings</span>
        <h1>EPM Gallery</h1>
        <p className="eg-intro-desc">A visual collection of Export Promotional Meetings conducted across India.</p>
      </section>

      {/* 2. TOP GALLERY - REFERENCE INSPIRED */}
      <section className="eg-ref-section">
        <div className="eg-container">
          <div className="eg-ref-grid">
            {topFeatured.map((item, idx) => (
              <div key={idx} className="eg-ref-card animate-on-scroll slide-up" onClick={() => openLightbox(topFeatured, idx)}>
                <div className="eg-ref-img-wrapper">
                  <img src={item.img} alt={item.title} className="eg-ref-img" />
                </div>
                <div className="eg-ref-content">
                  <div className="eg-ref-location">
                    <MapPin className="eg-ref-loc-icon" /> {item.city}
                  </div>
                  <h3 className="eg-ref-title">{item.title}</h3>
                  <p className="eg-ref-desc">{item.desc}</p>
                  <div className="eg-ref-arrow-btn">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="eg-ref-lower">
            <div className="eg-ref-left animate-on-scroll slide-right">
              <div className="eg-ref-intro-block">
                <div className="eg-ref-icon-large">
                  <Handshake size={32} />
                </div>
                <p className="eg-ref-intro-text">
                  <span>FEED</span> is organizing Export Promotional Meetings (EPMs) across India to connect local exporters with global buyers, create new opportunities, and strengthen India's export ecosystem.
                </p>
              </div>

              <div className="eg-ref-stats-row">
                <div className="eg-ref-stat-item">
                  <div className="eg-ref-stat-icon"><Users size={20} /></div>
                  <div className="eg-ref-stat-text">
                    <h4>50+</h4>
                    <p>EPMs Organized<br/>Across Indian States</p>
                  </div>
                </div>
                <div className="eg-ref-stat-item">
                  <div className="eg-ref-stat-icon"><Handshake size={20} /></div>
                  <div className="eg-ref-stat-text">
                    <h4>2000+</h4>
                    <p>Exporters Connected<br/>And Empowered</p>
                  </div>
                </div>
                <div className="eg-ref-stat-item">
                  <div className="eg-ref-stat-icon"><Globe size={20} /></div>
                  <div className="eg-ref-stat-text">
                    <h4>500+</h4>
                    <p>Global Buyers<br/>Participated</p>
                  </div>
                </div>
                <div className="eg-ref-stat-item">
                  <div className="eg-ref-stat-icon"><TrendingUp size={20} /></div>
                  <div className="eg-ref-stat-text">
                    <h4>₹500 Cr+</h4>
                    <p>Business Opportunities<br/>Generated</p>
                  </div>
                </div>
              </div>

              <div className="eg-ref-rating">
                <div className="eg-ref-rating-score">4.8</div>
                <div>
                  <div className="eg-ref-rating-stars">
                    <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
                  </div>
                  <div className="eg-ref-rating-text">1200+ Exporters Recommend FEED</div>
                </div>
              </div>
            </div>
            
            <div className="eg-ref-right animate-on-scroll slide-left delay-200">
              {/* Reference image uses a large feature image here. Only EPM images allowed. */}
              <img src={getImg(10)} alt="EPM Large Gathering" className="eg-ref-hero-img" onClick={() => openLightbox([{title: 'EPM Mega Gathering', city: 'National Event', img: getImg(10)}], 0)} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. EPM MOMENTS - Editorial Masonry */}
      <section className="eg-moments">
        <div className="eg-container">
          <div className="eg-section-header animate-on-scroll slide-up">
            <h2 className="eg-section-title">EPM Moments</h2>
            <p className="eg-section-subtitle">Scenes from meetings that bring exporters and industry participants together.</p>
          </div>
          
          <div className="eg-masonry">
            <div className="eg-masonry-item animate-on-scroll slide-up eg-masonry-item-large" onClick={() => openLightbox([{title: 'Opening Session', img: getImg(4)}], 0)}>
              <img loading="lazy" src={getImg(4)} alt="Opening Session" />
              <div className="eg-masonry-caption">Opening Session</div>
            </div>
            <div className="eg-masonry-item animate-on-scroll slide-up delay-100" onClick={() => openLightbox([{title: 'Networking', img: getImg(5)}], 0)}>
              <img loading="lazy" src={getImg(5)} alt="Networking" />
              <div className="eg-masonry-caption">Networking</div>
            </div>
            <div className="eg-masonry-item animate-on-scroll slide-up eg-masonry-item-tall" onClick={() => openLightbox([{title: 'Panel Discussion', img: getImg(6)}], 0)}>
              <img loading="lazy" src={getImg(6)} alt="Panel Discussion" />
              <div className="eg-masonry-caption">Panel Discussion</div>
            </div>
            <div className="eg-masonry-item animate-on-scroll slide-up delay-100" onClick={() => openLightbox([{title: 'Buyer Interaction', img: getImg(7)}], 0)}>
              <img loading="lazy" src={getImg(7)} alt="Buyer Interaction" />
              <div className="eg-masonry-caption">Buyer Interaction</div>
            </div>
            <div className="eg-masonry-item animate-on-scroll slide-up eg-masonry-item-wide" onClick={() => openLightbox([{title: 'Delegate Session', img: getImg(8)}], 0)}>
              <img loading="lazy" src={getImg(8)} alt="Delegate Session" />
              <div className="eg-masonry-caption">Delegate Session</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EPM CITY STORIES - Horizontal */}
      <section className="eg-city-stories">
        <div className="eg-section-header animate-on-scroll slide-up">
          <h2 className="eg-section-title">EPM Across Cities</h2>
        </div>
        <div className="eg-slider-container">
          {cityStories.map((item, idx) => (
            <div key={idx} className="eg-slide animate-on-scroll slide-up" onClick={() => openLightbox(cityStories, idx)}>
              <img loading="lazy" src={item.img} alt={item.city} />
              <div className="eg-slide-overlay">
                <h3 className="eg-slide-city">{item.city}</h3>
                <h4 className="eg-slide-state">{item.state}</h4>
                <p className="eg-slide-caption">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INSIDE THE EPM - Asymmetrical */}
      <section className="eg-inside">
        <div className="eg-container">
          <div className="eg-section-header animate-on-scroll slide-up">
            <h2 className="eg-section-title">Inside the EPM</h2>
            <p className="eg-section-subtitle">Scenes from meetings that bring exporters and industry participants together.</p>
          </div>
          <div className="eg-asym-grid">
            <div className="eg-asym-img animate-on-scroll slide-right eg-asym-1" onClick={() => openLightbox([{title: 'Event Stage', img: getImg(9)}], 0)}>
              <img loading="lazy" src={getImg(9)} alt="EPM Stage" />
            </div>
            <div className="eg-asym-img animate-on-scroll slide-left eg-asym-2" onClick={() => openLightbox([{title: 'Audience', img: getImg(1)}], 0)}>
              <img loading="lazy" src={getImg(1)} alt="EPM Audience" />
            </div>
            <div className="eg-asym-img animate-on-scroll slide-up eg-asym-3" onClick={() => openLightbox([{title: 'Speaker Preparing', img: getImg(8)}], 0)}>
              <img loading="lazy" src={getImg(8)} alt="Speaker" />
            </div>
            <div className="eg-asym-img animate-on-scroll slide-up delay-100 eg-asym-4" onClick={() => openLightbox([{title: 'Delegates Entering', img: getImg(10)}], 0)}>
              <img loading="lazy" src={getImg(10)} alt="Delegates" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. PEOPLE AT EPM */}
      <section className="eg-people">
        <div className="eg-container">
          <div className="eg-section-header animate-on-scroll slide-up">
            <h2 className="eg-section-title">People at EPM</h2>
          </div>
          <div className="eg-portrait-grid">
            {['Speaker', 'Exporter', 'Buyer', 'Delegate', 'Panelist', 'FEED Representative'].map((label, i) => (
              <div key={i} className={`eg-portrait-card animate-on-scroll slide-up delay-${(i % 3) * 100}`} onClick={() => openLightbox([{title: label, img: getImg(i + 2)}], 0)}>
                <img loading="lazy" src={getImg(i + 2)} alt={label} />
                <div className="eg-portrait-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STAGE & SESSION */}
      <section className="eg-cinematic">
        <div className="eg-cine-img animate-on-scroll slide-up" onClick={() => openLightbox([{title: 'Keynote Session', city: 'National Summit', img: getImg(3)}], 0)}>
          <img loading="lazy" src={getImg(3)} alt="Cinematic Stage" />
          <div className="eg-cine-caption">Keynote Sessions</div>
        </div>
      </section>

      {/* 10. NETWORKING */}
      <section className="eg-networking">
        <div className="eg-container">
          <div className="eg-section-header animate-on-scroll slide-up">
            <h2 className="eg-section-title">Connections at EPM</h2>
          </div>
          <div className="eg-network-grid">
            <div className="eg-net-col animate-on-scroll slide-right">
              <div className="eg-net-img" onClick={() => openLightbox([{title: 'B2B Meeting', img: getImg(2)}], 0)}><img loading="lazy" src={getImg(2)} alt="Net 1" /></div>
              <div className="eg-net-img" onClick={() => openLightbox([{title: 'Group Discussion', img: getImg(6)}], 0)}><img loading="lazy" src={getImg(6)} alt="Net 2" /></div>
            </div>
            <div className="eg-net-img animate-on-scroll slide-left delay-200" onClick={() => openLightbox([{title: 'Handshakes', img: getImg(13)}], 0)}>
              <img loading="lazy" src={getImg(13)} alt="Net 3" />
            </div>
          </div>
        </div>
      </section>

      {/* 11. EVENT DETAILS */}
      <section className="eg-details">
        <div className="eg-container">
          <div className="eg-section-header animate-on-scroll slide-up">
            <h2 className="eg-section-title">Event Details</h2>
          </div>
          <div className="eg-details-grid">
            {[7, 8, 9, 10, 11].map(i => (
              <div key={i} className="eg-detail-img animate-on-scroll slide-up" onClick={() => openLightbox([{title: 'Event Detail', img: getImg(i)}], 0)}>
                <img loading="lazy" src={getImg(i)} alt="Detail" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. EPM EVENT STORIES */}
      <section className="eg-story">
        <div className="eg-container">
          <div className="eg-section-header animate-on-scroll slide-up">
            <h2 className="eg-section-title">The EPM Experience</h2>
          </div>
          <div className="eg-story-timeline">
            {[
              { num: '01', label: 'Arrival', img: getImg(10) },
              { num: '02', label: 'Opening', img: getImg(1) },
              { num: '03', label: 'Keynote', img: getImg(8) },
              { num: '04', label: 'Discussion', img: getImg(6) },
              { num: '05', label: 'Networking', img: getImg(2) },
              { num: '06', label: 'Closing', img: getImg(4) },
            ].map((step, i) => (
              <div key={i} className="eg-story-item animate-on-scroll slide-up">
                <div className="eg-story-num">{step.num}</div>
                <div className="eg-story-img" onClick={() => openLightbox([{title: step.label, img: step.img}], 0)}>
                  <img loading="lazy" src={step.img} alt={step.label} />
                </div>
                <div className="eg-story-label">{step.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. LARGE FEATURE */}
      <section className="eg-cinematic" style={{ padding: '40px 0' }}>
        <div className="eg-container">
           <div className="eg-cine-img animate-on-scroll slide-up" style={{ borderRadius: '16px', height: '60vh' }} onClick={() => openLightbox([{title: 'Grand Meeting', img: getImg(0)}], 0)}>
            <img loading="lazy" src={getImg(0)} alt="Large Feature" />
          </div>
        </div>
      </section>

      {/* 14 & 15. FINAL ARCHIVE & FILTER */}
      <section className="eg-archive">
        <div className="eg-container">
          <div className="eg-section-header animate-on-scroll slide-up">
            <h2 className="eg-section-title">Explore More EPM Moments</h2>
          </div>
          
          <div className="eg-filter">
            {filters.map(f => (
              <button 
                key={f} 
                className={`eg-filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="eg-archive-masonry">
            {filteredArchive.map((item, idx) => (
              <div key={idx} className="eg-archive-item animate-on-scroll slide-up" onClick={() => openLightbox(filteredArchive, idx)}>
                <img loading="lazy" src={item.img} alt={item.title} loading="lazy" />
                <div className="eg-archive-overlay">
                  <div className="eg-archive-info">
                    <h5>{item.title}</h5>
                    <p>{item.city}, {item.state}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. LIGHTBOX */}
      {lightbox.isOpen && (
        <div className="eg-lightbox">
          <div className="eg-lb-header">
            <div className="eg-lb-count">
              {lightbox.currentIndex + 1} / {lightbox.items.length}
            </div>
            <button className="eg-lb-close" onClick={closeLightbox}>
              <X size={32} />
            </button>
          </div>
          <div className="eg-lb-content">
            {lightbox.items.length > 1 && (
              <button className="eg-lb-nav eg-lb-prev" onClick={prevLightbox}>
                <ChevronLeft size={32} />
              </button>
            )}
            
            <img loading="lazy" 
              src={lightbox.items[lightbox.currentIndex].img} 
              alt="Lightbox" 
              className="eg-lb-img" 
            />
            
            {lightbox.items.length > 1 && (
              <button className="eg-lb-nav eg-lb-next" onClick={nextLightbox}>
                <ChevronRight size={32} />
              </button>
            )}
          </div>
          <div className="eg-lb-info">
            <h3 className="eg-lb-title">{lightbox.items[lightbox.currentIndex].title}</h3>
            {lightbox.items[lightbox.currentIndex].city && (
              <p className="eg-lb-location">
                {lightbox.items[lightbox.currentIndex].city}
                {lightbox.items[lightbox.currentIndex].state ? `, ${lightbox.items[lightbox.currentIndex].state}` : ''}
              </p>
            )}
            <p className="eg-lb-desc">{lightbox.items[lightbox.currentIndex].desc}</p>
          </div>
        </div>
      )}

    </div>
  );
}
