import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Building2, Calendar as CalendarIcon, MapPin,
  ChevronRight, Star, HeartHandshake, UserPlus,
  ArrowRight, CheckCircle2, ChevronLeft,
  Target, BookOpen, Award
} from 'lucide-react';
import './Epm.css';

const Epm = ({ onNavigate }) => {
  // Dummy data for upcoming EPMs
  const upcomingEpms = [
    { date: '12', month: 'May', day: 'Thu', title: 'Export Readiness Workshop', location: 'Vijayawada, AP', time: '10:00 AM - 02:00 PM' },
    { date: '15', month: 'May', day: 'Sun', title: 'Global Trade Opportunities', location: 'Guntur, AP', time: '11:00 AM - 04:00 PM' },
    { date: '22', month: 'May', day: 'Sun', title: 'Agri-Export Market Analysis', location: 'Vizag, AP', time: '09:00 AM - 01:00 PM' },
  ];

  const testimonials = [
    { id: 1, text: "Great initiative! EPM helped me understand export opportunities clearly.", author: "Ramesh, Farmer", rating: 5 },
    { id: 2, text: "Informative session with practical insights on global markets.", author: "Sita, Entrepreneur", rating: 5 },
    { id: 3, text: "Well organized and very impactful meeting for our FPO members.", author: "Anand, FPO Member", rating: 5 },
    { id: 4, text: "The networking opportunities were fantastic. Highly recommend attending.", author: "Kiran, Trader", rating: 5 },
    { id: 5, text: "Excellent guidance on export documentation and compliance.", author: "Lakshmi, Agri-Business", rating: 5 },
  ];

  const galleryArray = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
  ];

  const [testiIndex, setTestiIndex] = useState(testimonials.length * 2);
  const [testiTransition, setTestiTransition] = useState(true);

  const [galleryIndex, setGalleryIndex] = useState(galleryArray.length * 2);
  const [galleryTransition, setGalleryTransition] = useState(true);

  const isGalleryHovered = useRef(false);

  // Main scroll interval for testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestiTransition(true);
      setTestiIndex(prev => prev - 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Main scroll interval for gallery (faster, every 1.8s as requested)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isGalleryHovered.current) {
        setGalleryTransition(true);
        setGalleryIndex(prev => prev - 1);
      }
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // Invisible reset for testimonials
  useEffect(() => {
    if (testiIndex <= testimonials.length) {
      const reset = setTimeout(() => {
        setTestiTransition(false);
        setTestiIndex(prev => prev + testimonials.length);
      }, 600);
      return () => clearTimeout(reset);
    }
  }, [testiIndex, testimonials.length]);

  // Invisible reset for gallery
  useEffect(() => {
    if (galleryIndex <= galleryArray.length) {
      const reset = setTimeout(() => {
        setGalleryTransition(false);
        requestAnimationFrame(() => {
          setGalleryIndex(prev => prev + galleryArray.length);
        });
      }, 850);
      return () => clearTimeout(reset);
    } else if (galleryIndex >= galleryArray.length * 3) {
      const reset = setTimeout(() => {
        setGalleryTransition(false);
        requestAnimationFrame(() => {
          setGalleryIndex(prev => prev - galleryArray.length);
        });
      }, 850);
      return () => clearTimeout(reset);
    }
  }, [galleryIndex, galleryArray.length]);

  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];
  const extendedGallery = [...galleryArray, ...galleryArray, ...galleryArray, ...galleryArray];

  const nextTestimonial = () => {
    setTestiTransition(true);
    setTestiIndex(prev => prev - 1); // Move right
  };

  const prevTestimonial = () => {
    setTestiTransition(true);
    setTestiIndex(prev => prev + 1); // Move left
  };

  // Gallery swipe handlers
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left means show the image on the right
      // Since our images are moving left-to-right on auto, the next image is physically on the LEFT.
      // Wait, let's follow the standard convention: Swiping left brings the NEXT image from the RIGHT.
      // In our code, diff = 1 is the image on the right.
      // To make diff = 1 become diff = 0, we need to INCREASE galleryIndex by 1.
      setGalleryTransition(true);
      setGalleryIndex(prev => prev + 1);
    }
    if (isRightSwipe) {
      // Swipe right means show image on the left.
      // In our code, diff = -1 is the image on the left.
      // To make diff = -1 become diff = 0, we need to DECREASE galleryIndex by 1.
      setGalleryTransition(true);
      setGalleryIndex(prev => prev - 1);
    }
  };

  return (
    <div className="epm-page">
      <div className="epm-container">

        {/* Header Section */}
        <div className="epm-header-section">
          <div className="epm-header-actions">
            <button className="epm-btn-outline">
              <UserPlus size={18} />
              Register
            </button>
            <button className="epm-btn-primary">
              <HeartHandshake size={18} />
              Become Volunteer
            </button>
          </div>
        </div>

        {/* EPM Info Section */}
        <div className="epm-card epm-info-card">
          <div className="epm-card-header">
            <h2 className="epm-card-title">EPM - Export Promotional Meetings</h2>
          </div>
          <div className="epm-info-grid">
            <div className="epm-info-block">
              <div className="epm-info-icon"><Target size={24} /></div>
              <h3 className="epm-info-title">Objective of Export Promotional Meetings (EPMs)</h3>
              <div className="epm-info-content">
                <p>Export Promotional Meetings (EPMs) bring together exporters, buyers, farmers, cooperatives, government bodies, and industry stakeholders to create meaningful business opportunities. These meetings focus on promoting agricultural products, exploring new markets, strengthening partnerships, and addressing challenges in the export ecosystem.</p>
              </div>
              <button className="epm-info-btn">View Full Details <ArrowRight size={14} /></button>
            </div>
            <div className="epm-info-block">
              <div className="epm-info-icon"><BookOpen size={24} /></div>
              <h3 className="epm-info-title">Content Coverage</h3>
              <div className="epm-info-content">
                <p>Sessions cover export procedures and documentation, quality and packaging standards, market access requirements, applicable government schemes, logistics planning, and pricing strategies — giving participants practical, ready-to-use knowledge.</p>
              </div>
              <button className="epm-info-btn">View Full Details <ArrowRight size={14} /></button>
            </div>
            <div className="epm-info-block">
              <div className="epm-info-icon"><Award size={24} /></div>
              <h3 className="epm-info-title">Benefits of Participation</h3>
              <div className="epm-info-content">
                <p>Participants gain direct access to buyers, expert guidance on compliance and certification, valuable networking with industry leaders, and support in identifying the right export markets for their products.</p>
              </div>
              <button className="epm-info-btn">View Full Details <ArrowRight size={14} /></button>
            </div>
            <div className="epm-info-block">
              <div className="epm-info-icon"><Users size={24} /></div>
              <h3 className="epm-info-title">Invitees</h3>
              <div className="epm-info-content">
                <p>EPMs bring together farmers, FPOs, exporters, importers, trade associations, government officials, and banking and logistics partners from across the agri-export value chain.</p>
              </div>
              <button className="epm-info-btn">View Full Details <ArrowRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="epm-card stats-card">
          <div className="epm-card-header">
            <h2 className="epm-card-title">Statistics</h2>
          </div>
          <div className="epm-stats-grid">
            <div className="epm-stat-card color-blue">
              <div className="epm-stat-icon-wrapper">
                <Users className="epm-stat-icon" />
              </div>
              <div className="epm-stat-content">
                <h3 className="epm-stat-value">25+</h3>
                <p className="epm-stat-label">EPMs Conducted</p>
              </div>
            </div>
            <div className="epm-stat-card color-green">
              <div className="epm-stat-icon-wrapper">
                <Building2 className="epm-stat-icon" />
              </div>
              <div className="epm-stat-content">
                <h3 className="epm-stat-value">10</h3>
                <p className="epm-stat-label">Districts Covered</p>
              </div>
            </div>
            <div className="epm-stat-card color-purple">
              <div className="epm-stat-icon-wrapper">
                <CheckCircle2 className="epm-stat-icon" />
              </div>
              <div className="epm-stat-content">
                <h3 className="epm-stat-value">500+</h3>
                <p className="epm-stat-label">Total Attendees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming EPMs (Full Column) */}
        <div className="epm-card upcoming-card">
          <div className="epm-card-header">
            <h2 className="epm-card-title">Upcoming EPMs</h2>
          </div>
          <div className="epm-upcoming-grid">
            <div className="epm-calendar-container">
              <div className="epm-calendar-header">
                <button className="epm-cal-nav"><ChevronLeft size={16} /></button>
                <h4>May 2025</h4>
                <button className="epm-cal-nav"><ChevronRight size={16} /></button>
              </div>
              <div className="epm-calendar-grid">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                  <div key={d} className="epm-cal-day-name">{d}</div>
                ))}
                {/* May 2025 starts on a Thursday (index 3, so 3 empty cells) */}
                <div className="epm-cal-day empty"></div>
                <div className="epm-cal-day empty"></div>
                <div className="epm-cal-day empty"></div>
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <div key={day} className="epm-cal-day">
                    <span className={[12, 15, 22].includes(day) ? 'epm-cal-circle' : ''}>
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="epm-events-list">
              {upcomingEpms.map((event, idx) => (
                <div key={idx} className="epm-event-item">
                  <div className="epm-event-datebox">
                    <span className="epm-event-month">{event.month}</span>
                    <span className="epm-event-date">{event.date}</span>
                    <span className="epm-event-day">{event.day}</span>
                  </div>
                  <div className="epm-event-details">
                    <h4 className="epm-event-title">{event.title}</h4>
                    <div className="epm-event-meta">
                      <span className="epm-meta-item"><MapPin size={14} /> {event.location}</span>
                      <span className="epm-meta-item"><CalendarIcon size={14} /> {event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button className="epm-view-all" onClick={() => onNavigate('epm-details')}>View All <ArrowRight size={16} /></button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="epm-card gallery-card">
          <div className="epm-card-header">
            <h2 className="epm-card-title">Gallery</h2>
            <button className="epm-view-all" onClick={() => onNavigate('epm-gallery')}>View All <ArrowRight size={16} /></button>
          </div>
          <div
            className="epm-gallery-container"
            onMouseEnter={() => isGalleryHovered.current = true}
            onMouseLeave={() => isGalleryHovered.current = false}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {extendedGallery.map((imgSrc, index) => {
              const diff = index - galleryIndex;

              // Determine styles based on diff
              let translateX = 0;
              let scale = 1;
              let zIndex = 1;
              let opacity = 0;
              let isCenter = false;

              // We want a flat premium look, not overlapping 3D.
              // diff 0: Center, diff -1: Left, diff 1: Right
              if (diff === 0) {
                translateX = 0;
                scale = 1;
                zIndex = 5;
                opacity = 1;
                isCenter = true;
              } else if (diff === -1) {
                translateX = -95;
                scale = 0.75;
                zIndex = 4;
                opacity = 1;
              } else if (diff === 1) {
                translateX = 95;
                scale = 0.75;
                zIndex = 4;
                opacity = 1;
              } else if (diff === -2) {
                translateX = -170;
                scale = 0.6;
                zIndex = 3;
                opacity = 0; // Hide it out of view or fade out
              } else if (diff === 2) {
                translateX = 170;
                scale = 0.6;
                zIndex = 3;
                opacity = 0;
              } else {
                translateX = diff < 0 ? -200 : 200;
                scale = 0.5;
                zIndex = 1;
                opacity = 0;
              }

              return (
                <div
                  key={index}
                  className={`epm-gallery-slide-flat ${isCenter ? 'is-center' : ''}`}
                  style={{
                    transform: `translateX(${translateX}%) scale(${scale})`,
                    zIndex: zIndex,
                    opacity: opacity,
                    transition: galleryTransition ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease' : 'none',
                    pointerEvents: isCenter ? 'auto' : 'none',
                  }}
                >
                  <div className="epm-gallery-img-wrapper">
                    <img src={imgSrc} alt={`EPM Event ${index}`} />
                  </div>
                  <div className="epm-gallery-pagination">
                    {galleryArray.map((_, dotIdx) => {
                      const actualIdx = galleryIndex % galleryArray.length;
                      const isActive = dotIdx === actualIdx;
                      return (
                        <div
                          key={dotIdx}
                          className={`epm-gallery-dot ${isActive ? 'active' : ''}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials (Bottom Section) */}
        <div className="epm-card testimonial-card">
          <div className="epm-card-header">
            <h2 className="epm-card-title">Testimonials</h2>
            <div className="epm-testimonial-nav">
              <button onClick={prevTestimonial} className="epm-nav-btn"><ChevronLeft size={18} /></button>
              <button onClick={nextTestimonial} className="epm-nav-btn"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="epm-testimonial-slider">
            <div
              className="epm-testimonial-slide-track"
              style={{
                '--current-slide': testiIndex,
                transition: testiTransition ? 'transform 0.5s ease-in-out' : 'none'
              }}
            >
              {extendedTestimonials.map((testi, index) => (
                <div key={`${testi.id}-${index}`} className="epm-testimonial-content">
                  <div className="epm-testimonial-stars">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} size={16} className="epm-star-filled" fill="currentColor" />
                    ))}
                  </div>
                  <p className="epm-testimonial-text">"{testi.text}"</p>
                  <p className="epm-testimonial-author">— {testi.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Membership & Services Section */}
        <div className="epm-card membership-card">
          <div className="epm-card-header" style={{ marginBottom: '16px' }}>
            <h2 className="epm-card-title">Membership & Services</h2>
          </div>
          <div className="epm-membership-actions">
            <button className="epm-btn-primary">Explore our services</button>
            <button className="epm-btn-outline">Join us</button>
            <button className="epm-btn-primary">Become a member</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Epm;
