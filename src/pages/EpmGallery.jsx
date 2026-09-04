import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapPin, ArrowRight, Star, X, ChevronLeft, ChevronRight, Users, Handshake, Globe, TrendingUp, ImageOff } from 'lucide-react';
import { fetchEpmGalleryImages, getEpmGalleryImageUrl } from '../api/epmApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './EpmGallery.css';

export default function EpmGallery({ onNavigate, isLoggedIn, user, onLogout }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [lightbox, setLightbox] = useState({ isOpen: false, currentIndex: 0, items: [] });
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Every photo below comes from the backend (admin-uploaded via AdminEpmGalleryController) -
  // see EpmGalleryController#list. Nothing here is a stock/placeholder URL.
  useEffect(() => {
    let cancelled = false;
    fetchEpmGalleryImages()
      .then(data => { if (!cancelled) setImages(data); })
      .catch(err => { if (!cancelled) setLoadError(err.message || 'Failed to load the gallery.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Cycles through however many photos actually exist (same "reuse across sections" approach the
  // page always used, just backed by real data now instead of a hardcoded Unsplash array).
  const imgAt = useCallback((index) => (images.length > 0 ? images[index % images.length] : null), [images]);
  const srcAt = useCallback((index) => {
    const img = imgAt(index);
    return img ? getEpmGalleryImageUrl(img.imageUrl) : '';
  }, [imgAt]);

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

  // Scroll Animations Observer - re-runs once loading flips to false, since the
  // .animate-on-scroll elements below don't exist in the DOM until the fetched photos render.
  useEffect(() => {
    if (loading) return;
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
  }, [loading]);

  // Content Data - derived from whatever photos are actually in the database. Sections that name
  // a specific place (top strip, city stories, the state-filterable archive) use each photo's own
  // city/state/caption so a filter or label is never paired with the wrong photo; the purely
  // generic "moment" sections (Networking, Opening Session, etc.) keep their stage-of-event
  // labels since those describe a kind of moment, not a place.
  const featuredPool = useMemo(() => {
    const featured = images.filter(img => img.featured);
    return (featured.length > 0 ? featured : images).slice(0, 4);
  }, [images]);

  const topFeatured = useMemo(() => featuredPool.map((img, idx) => ({
    city: img.city || 'Location to be announced',
    title: img.state ? `EPM – ${img.state}` : `EPM Gathering ${idx + 1}`,
    desc: img.caption || 'Bringing together exporters and global buyers to explore new opportunities and partnerships.',
    img: getEpmGalleryImageUrl(img.imageUrl),
  })), [featuredPool]);

  const cityStories = useMemo(() => images.slice(0, 6).map(img => ({
    city: img.city || 'EPM',
    state: img.state || '',
    desc: img.caption || 'EPM – Export Promotional Meeting',
    img: getEpmGalleryImageUrl(img.imageUrl),
  })), [images]);

  const archiveData = useMemo(() => images.map(img => ({
    state: (img.state || 'OTHER').toUpperCase(),
    title: img.caption || 'EPM Moment',
    city: img.city || '',
    img: getEpmGalleryImageUrl(img.imageUrl),
  })), [images]);

  const filters = useMemo(
    () => ['ALL', ...Array.from(new Set(archiveData.map(a => a.state))).sort()],
    [archiveData]
  );

  const filteredArchive = activeFilter === 'ALL' ? archiveData : archiveData.filter(item => item.state === activeFilter);

  return (
    <div className="epm-gallery-page">
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="epm" />
      {/* 1. PAGE INTRO */}
      <section className="eg-intro animate-on-scroll slide-up">
        <span className="eg-intro-subtitle">Export Promotional Meetings</span>
        <h1>EPM Gallery</h1>
        <p className="eg-intro-desc">A visual collection of Export Promotional Meetings conducted across India.</p>
      </section>

      {loading ? (
        <div className="eg-container" style={{ padding: '60px 24px', textAlign: 'center', color: '#64748b' }}>
          Loading gallery…
        </div>
      ) : loadError ? (
        <div className="eg-container" style={{ padding: '60px 24px', textAlign: 'center', color: '#b91c1c' }}>
          {loadError}
        </div>
      ) : images.length === 0 ? (
        <div className="eg-container" style={{ padding: '60px 24px', textAlign: 'center', color: '#64748b' }}>
          <ImageOff size={40} style={{ marginBottom: '16px', opacity: 0.6 }} />
          <h3 style={{ margin: '0 0 8px', color: '#0f172a' }}>No photos yet</h3>
          <p>Photos from Export Promotional Meetings will appear here once they're added.</p>
        </div>
      ) : (
      <>
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
              <img src={srcAt(10)} alt="EPM Large Gathering" className="eg-ref-hero-img" onClick={() => openLightbox([{title: 'EPM Mega Gathering', city: 'National Event', img: srcAt(10)}], 0)} />
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
            <div className="eg-masonry-item animate-on-scroll slide-up eg-masonry-item-large" onClick={() => openLightbox([{title: 'Opening Session', img: srcAt(4)}], 0)}>
              <img loading="lazy" src={srcAt(4)} alt="Opening Session" />
              <div className="eg-masonry-caption">Opening Session</div>
            </div>
            <div className="eg-masonry-item animate-on-scroll slide-up delay-100" onClick={() => openLightbox([{title: 'Networking', img: srcAt(5)}], 0)}>
              <img loading="lazy" src={srcAt(5)} alt="Networking" />
              <div className="eg-masonry-caption">Networking</div>
            </div>
            <div className="eg-masonry-item animate-on-scroll slide-up eg-masonry-item-tall" onClick={() => openLightbox([{title: 'Panel Discussion', img: srcAt(6)}], 0)}>
              <img loading="lazy" src={srcAt(6)} alt="Panel Discussion" />
              <div className="eg-masonry-caption">Panel Discussion</div>
            </div>
            <div className="eg-masonry-item animate-on-scroll slide-up delay-100" onClick={() => openLightbox([{title: 'Buyer Interaction', img: srcAt(7)}], 0)}>
              <img loading="lazy" src={srcAt(7)} alt="Buyer Interaction" />
              <div className="eg-masonry-caption">Buyer Interaction</div>
            </div>
            <div className="eg-masonry-item animate-on-scroll slide-up eg-masonry-item-wide" onClick={() => openLightbox([{title: 'Delegate Session', img: srcAt(8)}], 0)}>
              <img loading="lazy" src={srcAt(8)} alt="Delegate Session" />
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
                {item.state && <h4 className="eg-slide-state">{item.state}</h4>}
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
            <div className="eg-asym-img animate-on-scroll slide-right eg-asym-1" onClick={() => openLightbox([{title: 'Event Stage', img: srcAt(9)}], 0)}>
              <img loading="lazy" src={srcAt(9)} alt="EPM Stage" />
            </div>
            <div className="eg-asym-img animate-on-scroll slide-left eg-asym-2" onClick={() => openLightbox([{title: 'Audience', img: srcAt(1)}], 0)}>
              <img loading="lazy" src={srcAt(1)} alt="EPM Audience" />
            </div>
            <div className="eg-asym-img animate-on-scroll slide-up eg-asym-3" onClick={() => openLightbox([{title: 'Speaker Preparing', img: srcAt(8)}], 0)}>
              <img loading="lazy" src={srcAt(8)} alt="Speaker" />
            </div>
            <div className="eg-asym-img animate-on-scroll slide-up delay-100 eg-asym-4" onClick={() => openLightbox([{title: 'Delegates Entering', img: srcAt(10)}], 0)}>
              <img loading="lazy" src={srcAt(10)} alt="Delegates" />
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
              <div key={i} className={`eg-portrait-card animate-on-scroll slide-up delay-${(i % 3) * 100}`} onClick={() => openLightbox([{title: label, img: srcAt(i + 2)}], 0)}>
                <img loading="lazy" src={srcAt(i + 2)} alt={label} />
                <div className="eg-portrait-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. STAGE & SESSION */}
      <section className="eg-cinematic">
        <div className="eg-cine-img animate-on-scroll slide-up" onClick={() => openLightbox([{title: 'Keynote Session', city: 'National Summit', img: srcAt(3)}], 0)}>
          <img loading="lazy" src={srcAt(3)} alt="Cinematic Stage" />
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
              <div className="eg-net-img" onClick={() => openLightbox([{title: 'B2B Meeting', img: srcAt(2)}], 0)}><img loading="lazy" src={srcAt(2)} alt="Net 1" /></div>
              <div className="eg-net-img" onClick={() => openLightbox([{title: 'Group Discussion', img: srcAt(6)}], 0)}><img loading="lazy" src={srcAt(6)} alt="Net 2" /></div>
            </div>
            <div className="eg-net-img animate-on-scroll slide-left delay-200" onClick={() => openLightbox([{title: 'Handshakes', img: srcAt(13)}], 0)}>
              <img loading="lazy" src={srcAt(13)} alt="Net 3" />
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
              <div key={i} className="eg-detail-img animate-on-scroll slide-up" onClick={() => openLightbox([{title: 'Event Detail', img: srcAt(i)}], 0)}>
                <img loading="lazy" src={srcAt(i)} alt="Detail" />
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
              { num: '01', label: 'Arrival', idx: 10 },
              { num: '02', label: 'Opening', idx: 1 },
              { num: '03', label: 'Keynote', idx: 8 },
              { num: '04', label: 'Discussion', idx: 6 },
              { num: '05', label: 'Networking', idx: 2 },
              { num: '06', label: 'Closing', idx: 4 },
            ].map((step, i) => (
              <div key={i} className="eg-story-item animate-on-scroll slide-up">
                <div className="eg-story-num">{step.num}</div>
                <div className="eg-story-img" onClick={() => openLightbox([{title: step.label, img: srcAt(step.idx)}], 0)}>
                  <img loading="lazy" src={srcAt(step.idx)} alt={step.label} />
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
           <div className="eg-cine-img animate-on-scroll slide-up" style={{ borderRadius: '16px', height: '60vh' }} onClick={() => openLightbox([{title: 'Grand Meeting', img: srcAt(0)}], 0)}>
            <img loading="lazy" src={srcAt(0)} alt="Large Feature" />
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
                <img loading="lazy" src={item.img} alt={item.title} />
                <div className="eg-archive-overlay">
                  <div className="eg-archive-info">
                    <h5>{item.title}</h5>
                    <p>{[item.city, item.state].filter(Boolean).join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </>
      )}

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

      <Footer />
    </div>
  );
}
