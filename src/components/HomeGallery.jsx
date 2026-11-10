import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { FaGraduationCap, FaRocket, FaUsers } from 'react-icons/fa';
import { RiLayoutGridFill, RiSeedlingFill, RiShieldCheckFill } from 'react-icons/ri';
import cropFarmer from '../assets/images/loans-finance/crop-finance.jpg';
import polyhouse from '../assets/images/loans-finance/infrastructure.jpg';
import safeMissionSociety from '../pages/safe-mission/assets/how/steps/p2.jpg';
import safeMissionField from '../pages/safe-mission/assets/how/steps/p5.jpg';
import safeMissionPacking from '../pages/safe-mission/assets/how/steps/p7.jpg';
import safeMissionFarm from '../pages/safe-mission/assets/join/join-safe-mission.jpg';
import shgLearning from '../pages/my-tools/assets/shg/shg-header.webp';
import youngAgripreneurs from '../pages/yuva-krushi/assets/join-team.webp';
import './HomeGallery.css';

const TABS = [
  { key: 'all', label: 'All', Icon: RiLayoutGridFill },
  { key: 'krushi', label: 'Krushi Yeva Jayate', Icon: RiSeedlingFill, tone: '#2e9e3f' },
  { key: 'epm', label: 'EPM', Icon: FaUsers, tone: '#6a3fc8' },
  { key: 'safe', label: 'SafeMission', Icon: RiShieldCheckFill, tone: '#1668d8' },
  { key: 'startup', label: 'FeedStartup', Icon: FaRocket, tone: '#f47b16' },
  { key: 'education', label: 'MyEducation', Icon: FaGraduationCap, tone: '#0b2a63' },
];

// The mosaic shows seven photos at a time, in this order, so each run of seven is a page of the All tab.
// `tags` are the tabs a photo also appears under; `focus` is where a tile crops it
const PHOTOS = [
  { src: cropFarmer, alt: 'Farmer tending a healthy crop', tags: ['krushi'], focus: '62% 30%' },
  { src: '/images/tool_fpo_farmers.avif', alt: 'FPO farmers talking together in their field', tags: ['krushi', 'startup'], focus: '50% 40%' },
  { src: '/images/epm_register_hero.avif', alt: 'Farmer holding a crate of fresh fruit', tags: ['krushi'], focus: '35% 45%' },
  { src: safeMissionPacking, alt: 'Workers grading and packing produce', tags: ['safe', 'krushi'], focus: '50% 40%' },
  { src: '/images/hero_bg.avif', alt: 'Rows of crops at sunrise', tags: ['krushi'], focus: '50% 62%' },
  { src: '/images/benefits/training_governance.avif', alt: 'Farmers at a training session', tags: ['education'], focus: '50% 55%' },
  { src: '/images/tool_export_cargoship.avif', alt: 'Export containers at the port', tags: ['krushi'], focus: '50% 60%' },

  { src: '/images/epm/epm-directory-hero-india.avif', alt: 'Export Promotional Meeting in a packed hall', tags: ['epm'] },
  { src: '/images/epm/epm-global-market.avif', alt: 'Speaker presenting global markets at an EPM', tags: ['epm'], focus: '50% 42%' },
  { src: '/images/epm/epm-packaging.avif', alt: 'Export packaging stalls at an EPM', tags: ['epm'], focus: '50% 55%' },
  { src: '/images/epm/epm-buyer-seller.avif', alt: 'Buyer and seller meeting at an EPM', tags: ['epm'], focus: '50% 40%' },
  { src: '/images/epm/epm-msme.avif', alt: 'MSME owners in discussion at an EPM', tags: ['epm', 'startup'], focus: '50% 40%' },
  { src: '/images/epm/epm-training.avif', alt: 'EPM training session', tags: ['epm', 'education'], focus: '50% 55%' },
  { src: '/images/epm/epm-compliance.avif', alt: 'Export compliance workshop at an EPM', tags: ['epm', 'education'], focus: '50% 55%' },

  { src: safeMissionFarm, alt: 'A SAFE Mission model farm with a drone overhead', tags: ['safe'] },
  { src: safeMissionSociety, alt: 'Members of a District SAFE Mission Society', tags: ['safe'], focus: '50% 22%' },
  { src: '/images/benefits/farming_production.avif', alt: 'Farmer standing in a thriving field', tags: ['safe'], focus: '50% 35%' },
  { src: safeMissionField, alt: 'Farmers working a multi-layer crop', tags: ['safe'] },
  { src: polyhouse, alt: 'Polyhouses on a modern farm', tags: ['safe'] },
  { src: '/images/safe-mission/agri_bg.avif', alt: 'Green farmland below the hills', tags: ['safe'], focus: '50% 60%' },
  { src: '/images/benefits/market_export.avif', alt: 'Produce being packed for market', tags: ['krushi', 'startup'], focus: '50% 55%' },

  { src: '/images/tool_student_campus.avif', alt: 'Students working together on campus', tags: ['education'] },
  { src: '/images/tool_msme_shop.avif', alt: 'An MSME owner in the workshop', tags: ['startup'], focus: '50% 35%' },
  { src: '/images/benefits/value_addition.avif', alt: 'Value-addition processing line', tags: ['startup'], focus: '50% 55%' },
  { src: youngAgripreneurs, alt: 'Young agripreneurs in the field', tags: ['education', 'startup'], focus: '50% 30%' },
  { src: shgLearning, alt: 'Self-help group members learning on a laptop', tags: ['education'], focus: '50% 62%' },
  { src: '/images/benefits/technology_traceability.avif', alt: 'Farmer using a tablet in the field', tags: ['education'], focus: '50% 45%' },
  { src: '/images/benefits/finance_credit.avif', alt: 'Advisor helping a farmer with finance', tags: ['startup'], focus: '50% 35%' },
];

// The FEED STARTUP channel's Shorts (youtube.com/@feedstartup/shorts), by their YouTube ids, with their
// titles there. The Chapter series teaches the export journey, so it also sits under MyEducation. Shorts are
// 9:16 unless marked `square` (filmed 1:1), so the player can take their shape
const VIDEOS = [
  { id: 'dj0wjwadR7A', title: 'పంట ఉంది… Export Ready నా? | రైతులు తెలుసుకోవాల్సిన 7 ముఖ్యమైన అంశాలు | FEED Chapter 6', tags: ['epm', 'education'] },
  { id: 'szAdwXC1vsY', square: true, title: 'రైతు ఆదాయం రెట్టింపు చేసే మార్గం – కృషియేవ జయతే!', tags: ['krushi'] },
  { id: 'kOeEFYnXgog', square: true, title: 'వ్యవసాయంలో సమస్యలకు విడివిడి పరిష్కారాలు కాదు… ఒకే సమగ్ర పరిష్కారం! | SAFE Mission', tags: ['safe'] },
  { id: 'M-_hMwmhFo0', square: true, title: 'రైతు పండించిన పంట అమ్మకానికి హద్దులు ఉండకూడదు | FEED లక్ష్యం', tags: ['startup'] },
  { id: 'DJz9wioATOU', title: 'రైతు తన పంటను విదేశాల్లో అమ్ముకోవచ్చా? ఎలా? | FEED – Chapter 4', tags: ['krushi', 'education'] },
  { id: 'eMnrnjVKfjw', square: true, title: 'రైతు నుంచి ఎగుమతి వరకు | FEED EPM – Export Promotional Meetings', tags: ['epm'] },
  { id: 'bJEdOsXJ41w', square: true, title: 'ఒక కుటుంబం… నాలుగు ఆశలు | రైతు, SHG, Entrepreneur, Student | FEED', tags: ['startup'] },
  { id: 'ZXmPOHmZ4Fc', title: 'CHAPTER 3 – పంట పండించారా… మంచి ధర రావట్లేదా?', tags: ['krushi', 'education'] },
  { id: '3pL_HjHTB7k', title: 'EXPORT PROMOTIONAL MEETING | CHAPTER 5 | FEED', tags: ['epm', 'education'] },
  { id: 'msi1Bh-_hFo', square: true, title: 'FEED STARTUP SERVICES | గ్రామం నుంచి ప్రపంచం వరకు అందరినీ కలిపే ఒకే వేదిక!', tags: ['startup'] },
  { id: 'yByeW_nRvmk', title: 'పంటకు సరైన ధర… రైతుకు మెరుగైన భవిష్యత్తు! CHAPTER 2', tags: ['krushi', 'education'] },
];

const TILES = 7;
const SWIPE_PX = 40;

const Tile = ({ photo, onOpen }) => (
  <button type="button" className="home-gallery-tile" aria-label={`View photo: ${photo.alt}`} onClick={() => onOpen(photo)}>
    <img src={photo.src} alt="" loading="lazy" decoding="async" style={photo.focus ? { objectPosition: photo.focus } : undefined} />
  </button>
);

// A photo at full size or a Short in its player, over the page. It is only drawn while open, so closing it
// stops the video. Closing goes through the dialog itself, which hands focus back to whatever opened it
const GalleryViewer = ({ item, onClosed }) => {
  const dialogRef = useRef(null);
  const close = () => dialogRef.current.close();

  useEffect(() => {
    if (!dialogRef.current.open) dialogRef.current.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="home-gallery-viewer"
      aria-label={item.title || item.alt}
      onClose={onClosed}
      onClick={(e) => { if (e.target === dialogRef.current) close(); }}
    >
      <button type="button" className="home-gallery-close" aria-label="Close" onClick={close}><X strokeWidth={2.5} /></button>
      {item.id ? (
        <>
          <div className={`home-gallery-player${item.square ? ' home-gallery-player--square' : ''}`}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&playsinline=1`}
              title={item.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <a className="home-gallery-watch" href={`https://www.youtube.com/shorts/${item.id}`} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        </>
      ) : (
        <img className="home-gallery-photo" src={item.src} alt={item.alt} />
      )}
    </dialog>
  );
};

// Tabs narrow both the photos and the videos to one initiative. The mosaic moves a page of seven at a time,
// the videos one card at a time; both go round from the end back to the start
const HomeGallery = () => {
  const railRef = useRef(null);
  const swipeStart = useRef(0);
  const [tab, setTab] = useState('all');
  const [page, setPage] = useState(0);
  const [firstVideo, setFirstVideo] = useState(0);
  const [perView, setPerView] = useState(3);
  const [viewing, setViewing] = useState(null);

  // The CSS decides how many videos fit
  useEffect(() => {
    const rail = railRef.current;
    const measure = () => setPerView(Number(getComputedStyle(rail).getPropertyValue('--per-view')));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const inTab = (item) => tab === 'all' || item.tags.includes(tab);
  const photos = PHOTOS.filter(inTab);
  const videos = VIDEOS.filter(inTab);

  const pages = Math.ceil(photos.length / TILES);
  // A last page short of photos fills up from the start of the list, so the mosaic never has holes
  const tiles = Array.from({ length: TILES }, (_, i) => photos[(page * TILES + i) % photos.length]);

  const lastVideo = Math.max(videos.length - perView, 0);
  const spot = Math.min(firstVideo, lastVideo);

  const showTab = (key) => {
    setTab(key);
    setPage(0);
    setFirstVideo(0);
  };
  const stepPhotos = (dir) => setPage((page + dir + pages) % pages);
  const stepVideos = (dir) => {
    const next = spot + dir;
    setFirstVideo(next < 0 ? lastVideo : next > lastVideo ? 0 : next);
  };

  // Sideways swipes are left to these handlers; up and down stay with the page
  const swipeable = (step) => ({
    onPointerDown: (e) => { swipeStart.current = e.clientX; },
    onPointerUp: (e) => {
      const moved = e.clientX - swipeStart.current;
      if (e.pointerType !== 'mouse' && Math.abs(moved) > SWIPE_PX) step(moved > 0 ? -1 : 1);
    },
  });

  return (
    <section className="home-gallery" aria-labelledby="home-gallery-title">
      <div className="home-gallery-inner">
        {/* The camera stands in for the "and", which stays in the text for screen readers */}
        <h2 id="home-gallery-title" className="home-gallery-title">
          <span className="home-gallery-rule" aria-hidden="true" />
          Photos{' '}
          <span className="home-gallery-titleAnd">and</span>{' '}
          <svg className="home-gallery-titleIcon" aria-hidden="true" viewBox="0 0 80 56" fill="none">
            <path
              d="M9 12h9.500l3.300-5.200A6 6 0 0 1 26.900 4h12.200a6 6 0 0 1 5.100 2.800l3.300 5.200H57a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6Z"
              stroke="#0a2f7a"
              strokeWidth="4.500"
              strokeLinejoin="round"
            />
            <path d="M66 26.500 75 20.300a1.800 1.800 0 0 1 2.900 1.500v20.400a1.800 1.800 0 0 1-2.900 1.500L66 37.500Z" fill="#0a2f7a" />
            <path d="M24 23.200c0-2.400 2.600-3.800 4.600-2.500l13.300 8.800c1.800 1.200 1.800 3.800 0 5l-13.300 8.800c-2 1.300-4.600-.1-4.600-2.500Z" fill="#fa8403" />
          </svg>{' '}
          <span>Videos</span>
          <span className="home-gallery-rule home-gallery-rule--end" aria-hidden="true" />
        </h2>
        <p className="home-gallery-subtitle">Moments, milestones and stories from across FEED initiatives</p>

        <div className="home-gallery-tabs" role="group" aria-label="Show photos and videos from">
          {TABS.map(({ key, label, Icon, tone }) => (
            <button
              key={key}
              type="button"
              className="home-gallery-tab"
              style={tone ? { '--tone': tone } : undefined}
              aria-pressed={tab === key}
              onClick={() => showTab(key)}
            >
              <Icon aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <div className="home-gallery-stage">
          <button
            type="button"
            className="home-gallery-arrow home-gallery-arrow--prev"
            aria-label="Previous photos"
            disabled={pages < 2}
            onClick={() => stepPhotos(-1)}
          >
            <ChevronLeft strokeWidth={3} />
          </button>

          <div className="home-gallery-card">
            <div key={`${tab}-${page}`} className="home-gallery-mosaic" {...(pages > 1 ? swipeable(stepPhotos) : {})}>
              <Tile photo={tiles[0]} onOpen={setViewing} />
              <div className="home-gallery-rows">
                {[tiles.slice(1, 4), tiles.slice(4)].map((row, r) => (
                  <div key={r} className="home-gallery-row">
                    {row.map((photo, i) => <Tile key={i} photo={photo} onOpen={setViewing} />)}
                  </div>
                ))}
              </div>
            </div>

            <div className="home-gallery-dots">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className="home-gallery-dot"
                  aria-label={`Show photos, page ${i + 1} of ${pages}`}
                  aria-current={i === page || undefined}
                  onClick={() => setPage(i)}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="home-gallery-arrow home-gallery-arrow--next"
            aria-label="Next photos"
            disabled={pages < 2}
            onClick={() => stepPhotos(1)}
          >
            <ChevronRight strokeWidth={3} />
          </button>
        </div>

        <div className="home-gallery-videos">
          <button
            type="button"
            className="home-gallery-arrow home-gallery-arrow--prev"
            aria-label="Previous videos"
            disabled={lastVideo === 0}
            onClick={() => stepVideos(-1)}
          >
            <ChevronLeft strokeWidth={3} />
          </button>

          <div ref={railRef} className="home-gallery-rail" {...swipeable(stepVideos)}>
            <ul className={`home-gallery-track${videos.length < perView ? ' home-gallery-track--few' : ''}`} style={{ '--spot': spot }}>
              {videos.map((video, i) => {
                const inView = i >= spot && i < spot + perView;
                return (
                  <li key={video.id} className="home-gallery-video" aria-hidden={inView ? undefined : true}>
                    <button
                      type="button"
                      className="home-gallery-videoButton"
                      aria-label={`Play video: ${video.title}`}
                      tabIndex={inView ? undefined : -1}
                      onClick={() => setViewing(video)}
                    >
                      <img src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`} alt="" loading="lazy" decoding="async" />
                      <span className="home-gallery-play" aria-hidden="true"><Play fill="currentColor" strokeWidth={0} /></span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            className="home-gallery-arrow home-gallery-arrow--next"
            aria-label="Next videos"
            disabled={lastVideo === 0}
            onClick={() => stepVideos(1)}
          >
            <ChevronRight strokeWidth={3} />
          </button>
        </div>

        {viewing && <GalleryViewer item={viewing} onClosed={() => setViewing(null)} />}
      </div>
    </section>
  );
};

export default HomeGallery;
