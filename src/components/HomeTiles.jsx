import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './HomeTiles.css';

// The four opening tiles from the FEED website's home page: About FEED (with its questions), FEED
// Services, KYJ project and Benefits of becoming a member. Hovering a tile widens it and shows its text;
// on touch screens and keyboards a tap, Enter or focus opens it instead
// `tone` is the colour of a question's card: its side bar, shadow and chevron disc
const ABOUT_QUESTIONS = [
  {
    title: 'FEED Main objective',
    icon: '/images/home-tiles/about-objective.png',
    tone: 'blue',
    text: 'FEED is a multi-state co-operative society working for the uplift of exports from all corners of India, We Provide Crucial technical software and social platform connecting : "Farmers, Traders, MSME industries & new entrepreneurs" in Rural and Semi Urban areas with "International markets, Export Promotional councils, Central and state governments, Banks and Financial institutes, ports" by organizing Exports Promotional meetings, Forming FPO\'s (product wise) and supporting the FPOs with technical information & support on processing export orders.',
  },
  {
    title: 'Our Vision',
    icon: '/images/home-tiles/about-vision.png',
    tone: 'orange',
    text: 'To spread to all corners of India and emerge as a one-stop solution to farmers, small traders, MSMEs, new entrepreneurs from rural and semi-urban areas for marketing their agricultural commodities in domestic and International markets by means of effective technical interface.',
  },
  {
    title: 'Our Mission',
    icon: '/images/home-tiles/about-mission.png',
    tone: 'green',
    text: 'To form product based cooperative societies (FPOs), impart the capacity building to export in the form of training sessions, provide the information on global marketing opportunities through "FEED STARTUP" Technology for their respective agricultural products and render end-to-end support in real-time export process i.e., from selection of buyers to shipment of good.',
  },
];

// The sweep along the foot of the About FEED photo, traced from the design in its pixels: white below
// the photo's curved edge, an orange and a green band following it, and the leaf sitting on the join
const AboutCurve = () => (
  <svg className="hc-about-curve" viewBox="0 470 1086 143" aria-hidden="true">
    <defs>
      <linearGradient id="hc-about-orange">
        <stop offset="0" stopColor="#fb8c00" />
        <stop offset="0.65" stopColor="#fe9f1a" />
        <stop offset="1" stopColor="#ffc35e" />
      </linearGradient>
      <linearGradient id="hc-about-green" x1="1" x2="0">
        <stop offset="0" stopColor="#3fa73b" />
        <stop offset="0.6" stopColor="#45ab22" />
        <stop offset="1" stopColor="#7ccb3f" />
      </linearGradient>
      <linearGradient id="hc-about-leaf" x2="0" y2="1">
        <stop offset="0" stopColor="#5bb226" />
        <stop offset="1" stopColor="#2f8b14" />
      </linearGradient>
      <radialGradient id="hc-about-glow">
        <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
        <stop offset="0.55" stopColor="#fff" stopOpacity="0.6" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="543" cy="608" rx="108" ry="58" fill="url(#hc-about-glow)" />
    <path fill="#fff" d="M0 490C110 570 330 611 540 611C760 611 950 567 1086 470V613H0Z" />
    <path fill="url(#hc-about-orange)" d="M0 495C80 556 230 600 385 612C250 610 110 588 0 534Z" />
    <path fill="url(#hc-about-green)" d="M1086 477C1000 545 860 600 720 613C850 613 985 574 1086 518Z" />
    <path fill="url(#hc-about-leaf)" d="M538.5 640.5C535 612 548 590 593 584.5C594 612 578 636 544.5 641Z" />
    <path fill="url(#hc-about-leaf)" d="M492 604.5C512 603 533 615 530.8 640L526.3 641.3C508 640 493 625 492 604.5Z" />
    <path fill="#fff" d="M543.5 640C548 622 558 610 572 601C562 613 553 626 548 640Z" />
    <path fill="#fff" d="M508 616C520 619 527 630 528.5 640.5C523 632 516 624 508 616Z" />
  </svg>
);

// `target` is the page a tile's Read More opens; `scrollTo` is a block further down this page instead.
// About FEED has no page of its own in this app, so it has no Read More. `art` is a picture shown whole
// in the tile, in place of a background photo: a `sheet` is artwork drawn on white, shown under the text
// on a light tile; a `poster` is a full-colour picture alone, filling the tile with no text over it, and
// a click anywhere on it opens its page. A poster has nothing to uncover, so it never widens. `artSize`
// is the picture's width and height in pixels; a poster's `title` only names it to screen readers
const TILES = [
  { title: 'About FEED', about: true },
  {
    title: 'FEED Services',
    art: '/images/home-tiles/feed-startup.webp',
    artAlt: 'FEED STARTUP: Sophisticated Technology for Accountability, Responsive Trading, Unique Platform',
    artSize: [1024, 1536],
    artStyle: 'sheet',
    text: 'Ensuring Farmers’ growth by providing high-quality fertilizers at the right time and quantities to increase crop productivity.',
    scrollTo: 'services-block',
  },
  {
    title: 'KYJ project',
    art: '/images/home-tiles/kyj-bridge.webp',
    artAlt: 'A smiling farmer with bananas, chillies, ginger and turmeric and a businessman with a globe, joined by a bridge over a harbour where a container ship sails under a blue sky',
    artSize: [941, 1672],
    artStyle: 'poster',
    target: 'kyj',
  },
  {
    title: 'Benefits of becoming a member',
    bg: '/images/home-tiles/benefits-bg.jpg',
    text: 'Profits that are measured not with money but with the strong social fabric through our commitment to social responsibilities.',
    target: 'register',
  },
];

const HomeTiles = ({ onNavigate }) => {
  const [openTile, setOpenTile] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const readMore = (tile) => {
    if (tile.target) {
      onNavigate(tile.target);
      return;
    }
    // Clear of the floating navbar, as its own About Us link does
    const el = document.getElementById(tile.scrollTo);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  return (
    <section
      className="hc-tiles"
      id="about-us"
      // With a mouse, the tiles close again when it leaves them
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover)').matches) setOpenTile(null);
      }}
    >
      {TILES.map((tile, i) => (
        <div
          key={tile.title}
          className={`hc-tile${tile.about ? ' hc-tile--about' : ''}${tile.art ? ` hc-tile--art hc-tile--${tile.artStyle}` : ''}${openTile === i ? ' is-open' : ''}`}
          // A poster's own link takes the focus instead
          tabIndex={tile.artStyle === 'poster' ? undefined : 0}
          style={tile.bg ? { backgroundImage: `url('${tile.bg}')` } : undefined}
          // The first tap on a closed tile opens it rather than following its button (a poster tile has
          // nothing to open, so its link works first time)
          onClickCapture={(event) => {
            if (openTile !== i && tile.artStyle !== 'poster' && window.matchMedia('(hover: none)').matches) {
              if (event.target.closest('.hc-tile-btn')) event.stopPropagation();
              setOpenTile(i);
            }
          }}
          onKeyDown={(event) => {
            if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
              event.preventDefault();
              setOpenTile(i);
            }
          }}
          onFocus={() => setOpenTile(i)}
        >
          {tile.about && (
            // One photo for both states: closed it fills the tile, open it rises to make way for the cards
            <div className="hc-about">
              <div className="hc-about-photo">
                <AboutCurve />
              </div>
              <div className="hc-about-panel">
                {/* One question open at a time */}
                <div className="hc-acc">
                  {ABOUT_QUESTIONS.map((q, qi) => {
                    const isOpen = openQuestion === qi;
                    return (
                      <React.Fragment key={q.title}>
                        <i className="hc-acc-gap" />
                        <div className={`hc-acc-item is-${q.tone}${isOpen ? ' is-open' : ''}`}>
                          <div className="hc-acc-card">
                            <button
                              type="button"
                              className="hc-acc-head"
                              aria-expanded={isOpen}
                              onClick={() => setOpenQuestion(isOpen ? null : qi)}
                            >
                              <img src={q.icon} alt="" width="132" height="132" loading="lazy" />
                              <i className="hc-acc-rule" />
                              <span className="hc-acc-title">{q.title}</span>
                              <i className="hc-acc-chevron"><ChevronDown /></i>
                            </button>
                            <div className="hc-acc-body">
                              <div className="hc-acc-text">
                                <p>{q.text}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {tile.artStyle === 'poster' ? (
            // Laid over the whole picture, so a click anywhere on it opens the page
            <button type="button" className="hc-tile-link" aria-label={tile.title} onClick={() => readMore(tile)} />
          ) : (
            <div className="hc-tile-body">
              <h2 className="hc-tile-title">{tile.title}</h2>
              {(tile.text || tile.target || tile.scrollTo) && (
                // A sheet tile folds this away while closed, so the picture has the room
                <div className="hc-tile-more">
                  <div>
                    {tile.text && <p className="hc-tile-text">{tile.text}</p>}
                    {(tile.target || tile.scrollTo) && (
                      <button type="button" className="hc-tile-btn" onClick={() => readMore(tile)}>
                        Read More
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {tile.art && (
            <div className="hc-tile-art">
              <img
                src={tile.art}
                alt={tile.artAlt}
                width={tile.artSize[0]}
                height={tile.artSize[1]}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default HomeTiles;
