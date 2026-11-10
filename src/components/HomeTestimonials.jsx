import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Ship,
  ShoppingBasket,
  Sprout,
  Store,
  Users,
} from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';
import './HomeTestimonials.css';

const REVIEWS = [
  {
    who: 'Farmer',
    Icon: Sprout,
    text: 'SAFE Mission’s multi-layer farming approach helps me diversify crops and plan harvests across different seasons. It creates opportunities for more regular income and reduces my dependence on a single crop.',
  },
  {
    who: 'First-Time Exporter',
    Icon: Ship,
    text: 'As a first-time exporter, I was unsure where to begin. FEED’s KYJ (Krushi Yeva Jayate) made the export process simple and gave me clarity on every next step. Timely intimations and follow-ups from the FEED team kept me on track and made the journey smooth. FEED’s My Tools service, especially the freight calculator and export pricing tool, helped me plan my shipments and costs with confidence.',
  },
  {
    who: 'Graduate',
    Icon: GraduationCap,
    text: 'Through My Exports, I now understand the complete export process, from documentation to shipment. I feel equipped not just to build my own career, but also to guide my father, a farmer, towards exporting his produce.',
  },
  {
    who: 'FPO Member',
    Icon: Users,
    text: 'With My Org, our FPO’s accounts and compliances are completed on time. FEED’s timely notifications remind us of every due date, so we never miss a filing. The free single-page website provided by FEED also helps us showcase our work, products, and farmer community to buyers and partners.',
  },
  {
    who: 'LLP Owner',
    Icon: Briefcase,
    text: 'I recently obtained my FSSAI licence for my company with FEED’s guidance, without running between multiple offices. I now manage all my compliances through the FEED Startup App, which saves me time and lets me focus on growing my business.',
  },
  {
    who: 'Postgraduate Student',
    Icon: BookOpen,
    text: 'I’m in love with the FEED Startup App! While managing my postgraduate studies, I completed an online course on Export Entrepreneurship through My Education. The flexible learning format fit my schedule, and the knowledge will directly support my business management degree and future ventures.',
  },
  {
    who: 'Young Entrepreneur',
    Icon: Lightbulb,
    text: 'Tired of endless job hunting, I wanted to build something of my own, and I have always been fascinated by applying AI in agriculture. Through Yuva Krishi, I received clear, practical guidance on where to start, which opportunities to pursue and how to turn my idea into a real venture. Thanks to FEED, I now have both direction and confidence to begin my agri-entrepreneurship journey.',
  },
  {
    who: 'Homemaker',
    Icon: ShoppingBasket,
    text: 'Every time I shop for groceries, my FEED Card gets me discounts on my purchases. These small savings add up across the month and help me manage my household budget better. It’s a simple benefit that makes everyday shopping more rewarding, and being part of the FEED family makes me feel connected to something bigger.',
  },
  {
    who: 'SHG Member',
    Icon: Store,
    text: 'My Market has opened doors to customers we could never reach before. Since listing our products through the service, our pickle sales have grown noticeably compared to earlier. Better market access, wider visibility and regular orders have strengthened our group’s income, and our members now feel confident about expanding into new products and new buyers.',
  },
];
const STARS = [1, 2, 3, 4, 5];
const COUNT = REVIEWS.length;
// The reviews are drawn three times, end to end. The view rests in the middle set, slides out into a neighbouring
// one, then hops back unseen, so it can keep going the same way for ever
const SETS = [0, 1, 2];
const SLIDE_EVERY_MS = 6000;
const SWIPE_PX = 40;
const wrap = (i) => ((i % COUNT) + COUNT) % COUNT;

// A review shows its first few lines until the reader opens it. Whether the text runs past them depends on the
// card's width, so that is measured; the button keeps its place when it isn't needed, so the cards stay level.
// Cards out of view are kept from screen readers and the keyboard
const ReviewCard = ({ who, Icon, text, open, onToggle, inView }) => {
  const textRef = useRef(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    if (open) return undefined;
    const el = textRef.current;
    const measure = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    measure();
    document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open]);

  return (
    <li className="home-testimonial" aria-hidden={inView ? undefined : true}>
      <span className="home-testimonial-badge" aria-hidden="true"><RiDoubleQuotesL /></span>
      <span className="home-testimonial-circle" aria-hidden="true"><Icon /></span>
      <h3 className="home-testimonial-who">{who}</h3>
      <span className="home-testimonial-stars" role="img" aria-label="Rated 5 out of 5">
        {STARS.map((star) => <FaStar key={star} aria-hidden="true" />)}
      </span>
      <blockquote ref={textRef} className={`home-testimonial-text${open ? ' home-testimonial-text--open' : ''}`}>
        {text}
      </blockquote>
      <button
        type="button"
        className={`home-testimonial-more${overflows ? '' : ' home-testimonial-more--idle'}`}
        aria-expanded={open}
        tabIndex={inView ? undefined : -1}
        onClick={onToggle}
      >
        {open ? 'Read less' : 'Read more'}
      </button>
    </li>
  );
};

// Slides on its own from left to right, a full view at a time, and rests while someone is reading: the pointer or
// keyboard on it, a review open, or the block off screen. The arrows, dots and swipes move it too
const HomeTestimonials = () => {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const spotRef = useRef(COUNT);
  const swipeStart = useRef(0);
  // Where the first card in view sits among all three sets
  const [spot, setSpot] = useState(COUNT);
  const [perView, setPerView] = useState(3);
  const [openWho, setOpenWho] = useState(null);
  const [onScreen, setOnScreen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const slideBy = useCallback((delta) => {
    const track = trackRef.current;
    // Hop back to the same view in the middle set, with no animation, so there is always a set to slide into
    const home = COUNT + wrap(spotRef.current);
    if (home !== spotRef.current) {
      track.style.transition = 'none';
      track.style.setProperty('--spot', home);
      track.getBoundingClientRect();
      track.style.transition = '';
    }
    spotRef.current = home + delta;
    track.style.setProperty('--spot', spotRef.current);
    setSpot(spotRef.current);
    setOpenWho(null);
  }, []);

  // The CSS decides how many cards fit
  useEffect(() => {
    const rail = railRef.current;
    const measure = () => setPerView(Number(getComputedStyle(rail).getPropertyValue('--per-view')));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Timed from the last move, so a slide never follows straight after someone else has moved the cards
  const resting = hovered || focused || openWho !== null || !onScreen;
  useEffect(() => {
    if (resting || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setTimeout(() => slideBy(-perView), SLIDE_EVERY_MS);
    return () => clearTimeout(timer);
  }, [resting, spot, perView, slideBy]);

  const first = wrap(spot);
  const pages = Math.ceil(COUNT / perView);
  const page = Math.min(Math.floor(first / perView), pages - 1);

  // By the shorter way round
  const showPage = (target) => {
    const ahead = wrap(target * perView - first);
    slideBy(ahead > COUNT / 2 ? ahead - COUNT : ahead);
  };

  return (
    <section ref={sectionRef} className="home-testimonials" aria-labelledby="home-testimonials-title">
      <div className="home-testimonials-inner">
        <div className="home-testimonials-mark" aria-hidden="true">
          <span className="home-testimonials-rule" />
          <RiDoubleQuotesR className="home-testimonials-markIcon" />
          <span className="home-testimonials-rule home-testimonials-rule--end" />
        </div>
        <h2 id="home-testimonials-title" className="home-testimonials-title">Testimonials</h2>
        <p className="home-testimonials-subtitle">
          Real experiences from our valued clients who trust us for quality, innovation, and impact.
        </p>

        <div
          className="home-testimonials-carousel"
          onPointerEnter={(e) => setHovered(e.pointerType === 'mouse')}
          onPointerLeave={() => setHovered(false)}
          onFocus={(e) => setFocused(e.target.matches(':focus-visible'))}
          onBlur={() => setFocused(false)}
        >
          <button
            type="button"
            className="home-testimonials-arrow home-testimonials-arrow--prev"
            aria-label="Previous testimonials"
            onClick={() => slideBy(-perView)}
          >
            <ChevronLeft strokeWidth={3} />
          </button>

          <div
            ref={railRef}
            className="home-testimonials-rail"
            onPointerDown={(e) => { swipeStart.current = e.clientX; }}
            onPointerUp={(e) => {
              const moved = e.clientX - swipeStart.current;
              if (e.pointerType !== 'mouse' && Math.abs(moved) > SWIPE_PX) slideBy(moved > 0 ? -perView : perView);
            }}
          >
            <ul ref={trackRef} className="home-testimonials-track" style={{ '--spot': COUNT }}>
              {SETS.map((set) => REVIEWS.map((review, i) => {
                const place = set * COUNT + i;
                return (
                  <ReviewCard
                    key={place}
                    {...review}
                    inView={place >= spot && place < spot + perView}
                    open={openWho === review.who}
                    onToggle={() => setOpenWho(openWho === review.who ? null : review.who)}
                  />
                );
              }))}
            </ul>
          </div>

          <button
            type="button"
            className="home-testimonials-arrow home-testimonials-arrow--next"
            aria-label="Next testimonials"
            onClick={() => slideBy(perView)}
          >
            <ChevronRight strokeWidth={3} />
          </button>

          <div className="home-testimonials-dots">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                className="home-testimonials-dot"
                aria-label={`Show testimonials, page ${i + 1} of ${pages}`}
                aria-current={i === page || undefined}
                onClick={() => showPage(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
