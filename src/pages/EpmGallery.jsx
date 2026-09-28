import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ImageOff, Play, Search } from 'lucide-react';
import {
  fetchEpmGalleryImagesByBlock,
  fetchEpmGalleryStates,
  fetchEpmStats,
  getEpmGalleryImageUrl,
} from '../api/epmApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeImage from '../components/FadeImage';
import PhotoLightbox from '../components/PhotoLightbox';
import EditorialGrid from '../components/epm-gallery/EditorialGrid';
import Reveal from '../components/epm-gallery/Reveal';
import { Crumbs, SectionHeading, Stats, StatusMessage } from '../components/epm-gallery/GalleryPrimitives';
import { countMeetingsBy, pad2, placeKey, plural, useEpmMeetings } from '../components/epm-gallery/galleryUtils';
import '../components/epm-gallery/epmGallery.css';
import './EpmGallery.css';

// Each photo section is one image block managed from the admin panel (Page & Gallery Images - see
// EpmGalleryBlock on the backend): the database holds each photo's name, caption and order, and the
// server streams the file itself. The `epm-gallery` block is the page's own imagery - its first
// three photos sit beside the intro text.
const INTRO_BLOCK = 'epm-gallery';
const STORY_BLOCKS = [
  { id: 'epm-moments', label: 'Moments', title: 'EPM Moments', description: 'Scenes from meetings that bring exporters and industry participants together.' },
  { id: 'epm-across-cities', label: 'Across cities', title: 'EPM Across Cities', description: 'Meetings held in towns and cities across the country.' },
  { id: 'inside-the-epm', label: 'Inside the EPM', title: 'Inside the EPM', description: 'The stage, the sessions and the work that goes into every meeting.' },
  { id: 'people-at-epm', label: 'People', title: 'People at EPM', description: 'Speakers, exporters, buyers, delegates and the FEED team.' },
  { id: 'connections-at-epm', label: 'Connections', title: 'Connections at EPM', description: 'The conversations and partnerships that begin at the meetings.' },
  { id: 'event-details', label: 'Event details', title: 'Event Details', description: 'The smaller details that make up each meeting.' },
  { id: 'the-epm-experience', label: 'The experience', title: 'The EPM Experience', description: 'The EPM experience, from arrival to the closing session.' },
];

// Programme outcomes from FEED's own reporting (not something the gallery API provides).
const IMPACT = [
  { value: '2000+', label: 'Exporters connected and empowered' },
  { value: '500+', label: 'Global buyers participated' },
  { value: '₹500 Cr+', label: 'Business opportunities generated' },
];

// A block photo as the viewer and grid expect it; captions and places come from the upload.
function toPhoto(img, block) {
  const place = [img.city, img.state].filter(Boolean).join(', ');
  return {
    id: img.id,
    src: getEpmGalleryImageUrl(img.imageUrl),
    alt: img.caption || `${block.title} photograph`,
    caption: [img.caption, place].filter(Boolean).join(' - ') || undefined,
  };
}

export default function EpmGallery({ onNavigate, isLoggedIn, user, onLogout }) {
  const [blockImages, setBlockImages] = useState({});
  // One card per gallery state added in the admin panel (see EpmGalleryRegionService).
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programmeStats, setProgrammeStats] = useState(null);
  const [query, setQuery] = useState('');
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [viewer, setViewer] = useState({ blockId: null, index: null });

  // Every photo below comes from the backend - see EpmGalleryController#listByBlock. Each block
  // is fetched independently, so a failed/empty block just leaves its section out.
  useEffect(() => {
    let cancelled = false;
    const blockIds = [INTRO_BLOCK, ...STORY_BLOCKS.map((b) => b.id)];
    Promise.all([
      Promise.all(blockIds.map((id) => fetchEpmGalleryImagesByBlock(id).then((data) => [id, data]).catch(() => [id, []]))),
      fetchEpmGalleryStates().catch(() => []),
    ]).then(([blocks, stateCards]) => {
      if (cancelled) return;
      setBlockImages(Object.fromEntries(blocks));
      setStates(stateCards || []);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  // Programme-wide numbers for the intro - optional, so a failure just leaves that figure out.
  useEffect(() => {
    let cancelled = false;
    fetchEpmStats().then((data) => { if (!cancelled) setProgrammeStats(data); }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const allMeetings = useEpmMeetings();
  const meetingsByState = useMemo(() => countMeetingsBy(allMeetings, 'state'), [allMeetings]);

  const stories = useMemo(
    () => STORY_BLOCKS
      .map((block) => ({ ...block, photos: (blockImages[block.id] || []).map((img) => toPhoto(img, block)) }))
      .filter((block) => block.photos.length > 0),
    [blockImages]
  );
  const activeStory = stories.find((s) => s.id === activeStoryId) || stories[0];
  const viewerStory = stories.find((s) => s.id === viewer.blockId);

  // The intro collage is the first three photographs of the `epm-gallery` block, in the admin's order.
  const collage = useMemo(
    () => (blockImages[INTRO_BLOCK] || []).slice(0, 3).map((img) => getEpmGalleryImageUrl(img.imageUrl)),
    [blockImages]
  );

  const totals = useMemo(() => ({
    districts: states.reduce((sum, s) => sum + (s.districtCount || 0), 0),
    photos: states.reduce((sum, s) => sum + (s.photoCount || 0), 0)
      + Object.values(blockImages).reduce((sum, list) => sum + (list?.length || 0), 0),
  }), [states, blockImages]);

  const trimmedQuery = query.trim().toLowerCase();
  const visibleStates = trimmedQuery ? states.filter((s) => s.name.toLowerCase().includes(trimmedQuery)) : states;
  const isEmpty = !loading && states.length === 0 && totals.photos === 0;

  const scrollToStates = () => {
    document.getElementById('epg-states')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="epg epg-gallery">
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="epm" />

      <main className="epg-main">
        {/* ---------- Intro ---------- */}
        <section
          className={`epg-intro epg-container${!loading && collage.length === 0 ? ' is-text-only' : ''}`}
          aria-labelledby="epg-intro-title"
        >
          <div className="epg-intro-copy">
            <Crumbs items={[{ label: 'EPM', onClick: () => onNavigate('epm') }, { label: 'Gallery' }]} />
            <span className="epg-eyebrow">EPM Gallery</span>
            <h1 id="epg-intro-title" className="epg-intro-title">
              Export Promotional Meetings <span>across India</span>
            </h1>
            <p className="epg-intro-lead">
              A photographic record of the meetings FEED organises to connect farmers, FPOs and exporters
              with new markets. Choose a state to explore its districts and the moments captured there.
            </p>
            <div className="epg-intro-actions">
              <button type="button" className="epg-btn epg-btn-primary" onClick={scrollToStates} disabled={isEmpty}>
                Explore by state <ArrowDown size={17} className="epg-nudge-down" />
              </button>
              <button type="button" className="epg-btn epg-btn-secondary" onClick={() => onNavigate('epm-details')}>
                Upcoming EPMs <ArrowRight size={17} className="epg-nudge-right" />
              </button>
            </div>
            {loading ? (
              <div className="epg-intro-stats-placeholder" aria-hidden="true" />
            ) : (
              <Stats
                className="epg-intro-stats"
                items={[
                  states.length > 0 && { label: plural(states.length, 'State'), value: states.length },
                  totals.districts > 0 && { label: plural(totals.districts, 'District'), value: totals.districts },
                  totals.photos > 0 && { label: plural(totals.photos, 'Photograph'), value: totals.photos },
                  programmeStats?.epmsConducted > 0 && { label: 'EPMs held', value: programmeStats.epmsConducted },
                ]}
              />
            )}
          </div>

          <div className={`epg-intro-visual is-count-${loading ? 3 : collage.length}`} aria-hidden="true">
            {loading
              ? [0, 1, 2].map((i) => <span key={i} className="epg-intro-frame epg-skeleton" />)
              : collage.map((src) => (
                <span key={src} className="epg-intro-frame">
                  <FadeImage src={src} alt="" fetchPriority="high" />
                </span>
              ))}
          </div>
        </section>

        {isEmpty ? (
          <div className="epg-container">
            <StatusMessage
              icon={ImageOff}
              title="No photographs yet"
              text="Photographs from Export Promotional Meetings will appear here once they're added."
            />
          </div>
        ) : (
          <>
            {/* ---------- States ---------- */}
            {(loading || states.length > 0) && (
              <section id="epg-states" className="epg-section epg-states" aria-labelledby="epg-states-title">
                <div className="epg-container">
                  <SectionHeading
                    id="epg-states-title"
                    eyebrow="Explore by state"
                    title="Where the meetings happened"
                    description="Each state opens onto its districts, and each district onto the photographs from its meetings."
                  >
                    {states.length > 6 && (
                      <label className="epg-search">
                        <Search size={18} aria-hidden="true" />
                        <input
                          type="search"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search states"
                          aria-label="Search states"
                        />
                      </label>
                    )}
                  </SectionHeading>

                  {loading ? (
                    <ul className="epg-state-grid" aria-hidden="true">
                      {[0, 1].map((i) => <li key={i}><span className="epg-scard is-skeleton"><span className="epg-scard-media epg-skeleton" /></span></li>)}
                    </ul>
                  ) : visibleStates.length === 0 ? (
                    <StatusMessage icon={Search} title={`No state matches “${query.trim()}”`}>
                      <button type="button" className="epg-btn epg-btn-secondary" onClick={() => setQuery('')}>Clear search</button>
                    </StatusMessage>
                  ) : (
                    <ul className={`epg-state-grid${visibleStates.length === 1 ? ' is-single' : ''}`}>
                      {visibleStates.map((state, i) => (
                        <Reveal as="li" key={state.id} delay={Math.min(i, 5) * 90}>
                          <StateCard
                            state={state}
                            index={states.indexOf(state)}
                            meetings={meetingsByState.get(placeKey(state.name)) || 0}
                            onOpen={() => onNavigate('epm-gallery-state', { state: state.id })}
                          />
                        </Reveal>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            )}

            {/* ---------- About the programme ---------- */}
            <section className="epg-section epg-band epg-programme" aria-labelledby="epg-programme-title">
              <div className="epg-container epg-programme-grid">
                <Reveal className="epg-programme-copy">
                  <h2 id="epg-programme-title" className="epg-eyebrow">About the programme</h2>
                  <p className="epg-programme-statement">
                    <strong>FEED</strong> is organising Export Promotional Meetings across India to connect local
                    exporters with global buyers, create new opportunities, and strengthen India&apos;s export ecosystem.
                  </p>
                  <button type="button" className="epg-link" onClick={() => onNavigate('epm-objective')}>
                    Read about the objectives <ArrowRight size={16} />
                  </button>
                </Reveal>
                <Reveal as="dl" className="epg-impact" delay={120}>
                  {IMPACT.map((item) => (
                    <div key={item.label} className="epg-impact-item">
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </Reveal>
              </div>
            </section>

            {/* ---------- Photo themes ---------- */}
            {activeStory && (
              <section className="epg-section epg-stories" aria-labelledby="epg-stories-title">
                <div className="epg-container">
                  <SectionHeading
                    id="epg-stories-title"
                    eyebrow="From the meetings"
                    title="Scenes from the meetings"
                    description="Browse by theme, from the opening sessions to the conversations that carry on afterwards."
                  />
                  <StoryTabs stories={stories} activeId={activeStory.id} onChange={setActiveStoryId} />
                  <div
                    key={activeStory.id}
                    className="epg-story-panel"
                    role="tabpanel"
                    id={`epg-story-panel-${activeStory.id}`}
                    aria-labelledby={`epg-story-tab-${activeStory.id}`}
                  >
                    <div className="epg-story-head">
                      <div>
                        <h3 className="epg-story-title">{activeStory.title}</h3>
                        <p className="epg-story-desc">{activeStory.description}</p>
                      </div>
                      {activeStory.photos.length > 1 && (
                        <button
                          type="button"
                          className="epg-btn epg-btn-secondary epg-btn-sm"
                          onClick={() => setViewer({ blockId: activeStory.id, index: 0 })}
                        >
                          <Play size={15} /> View as slideshow
                        </button>
                      )}
                    </div>
                    <EditorialGrid
                      photos={activeStory.photos}
                      onOpen={(index) => setViewer({ blockId: activeStory.id, index })}
                      label={`${activeStory.title} photograph`}
                    />
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <PhotoLightbox
        photos={viewerStory?.photos || []}
        index={viewerStory ? viewer.index : null}
        onIndexChange={(index) => setViewer((v) => ({ ...v, index }))}
        onClose={() => setViewer({ blockId: null, index: null })}
        title={viewerStory?.title}
        subtitle="EPM Gallery"
      />

      <Footer />
    </div>
  );
}

// A state's entry point: cover photograph with a peek at its districts, the state's numbers, and
// the call to explore. The whole card is one button.
function StateCard({ state, index, meetings, onOpen }) {
  const preview = (state.districts || []).slice(0, 3);
  const more = state.districtCount - preview.length;
  const names = preview.map((d) => d.name).join(', ');
  const summary = [
    `${state.districtCount} ${plural(state.districtCount, 'district')}`,
    `${state.photoCount} ${plural(state.photoCount, 'photograph')}`,
    meetings > 0 && `${meetings} ${plural(meetings, 'EPM')}`,
  ].filter(Boolean).join(', ');

  return (
    <button type="button" className="epg-scard" onClick={onOpen} aria-label={`${state.name}: ${summary}`}>
      <span className="epg-scard-media">
        <FadeImage className="epg-scard-img" src={getEpmGalleryImageUrl(state.coverUrl)} alt="" decoding="async" />
        <span className="epg-scard-index">{pad2(index + 1)}</span>
        {preview.length > 0 && (
          <span className="epg-scard-avatars">
            {preview.map((d) => (
              <span key={d.id} className="epg-scard-avatar">
                <FadeImage src={getEpmGalleryImageUrl(d.coverUrl)} alt="" loading="lazy" decoding="async" />
              </span>
            ))}
            {more > 0 && <span className="epg-scard-avatar is-more">+{more}</span>}
          </span>
        )}
      </span>

      <span className="epg-scard-body">
        <span className="epg-scard-name">{state.name}</span>
        <span className="epg-scard-stats">
          <span><strong>{state.districtCount}</strong>{plural(state.districtCount, 'District')}</span>
          <span><strong>{state.photoCount}</strong>{plural(state.photoCount, 'Photograph')}</span>
          {meetings > 0 && <span><strong>{meetings}</strong>{plural(meetings, 'EPM')}</span>}
        </span>
        {names && (
          <span className="epg-scard-districts">
            {names}{more > 0 ? ` and ${more} more` : ''}
          </span>
        )}
        <span className="epg-scard-cta">
          Explore {state.name}
          <span className="epg-scard-go" aria-hidden="true"><ArrowRight size={18} /></span>
        </span>
      </span>
    </button>
  );
}

// Theme tabs for the photo section: arrow keys / Home / End move between them (WAI-ARIA tabs).
function StoryTabs({ stories, activeId, onChange }) {
  const listRef = useRef(null);

  const onKeyDown = (e) => {
    const at = stories.findIndex((s) => s.id === activeId);
    const next = {
      ArrowRight: (at + 1) % stories.length,
      ArrowLeft: (at - 1 + stories.length) % stories.length,
      Home: 0,
      End: stories.length - 1,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onChange(stories[next].id);
    listRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <div ref={listRef} className="epg-tabs" role="tablist" aria-label="Photo themes" onKeyDown={onKeyDown}>
      {stories.map((story) => {
        const selected = story.id === activeId;
        return (
          <button
            key={story.id}
            type="button"
            role="tab"
            id={`epg-story-tab-${story.id}`}
            aria-selected={selected}
            aria-controls={selected ? `epg-story-panel-${story.id}` : undefined}
            tabIndex={selected ? 0 : -1}
            className={`epg-tab${selected ? ' is-active' : ''}`}
            onClick={() => onChange(story.id)}
          >
            {story.label}
            <span className="epg-tab-count">{story.photos.length}</span>
          </button>
        );
      })}
    </div>
  );
}
