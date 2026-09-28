import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ImageOff, RefreshCw, Search } from 'lucide-react';
import { fetchEpmGalleryState, fetchEpmGalleryStates, getEpmGalleryImageUrl } from '../api/epmApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeImage from '../components/FadeImage';
import GalleryHero, { GalleryHeroSkeleton } from '../components/epm-gallery/GalleryHero';
import DistrictCard, { DistrictCardSkeleton } from '../components/epm-gallery/DistrictCard';
import Reveal from '../components/epm-gallery/Reveal';
import { NextEpmCard, SectionHeading, StatusMessage } from '../components/epm-gallery/GalleryPrimitives';
import { countMeetingsBy, placeKey, plural, summariseMeetings, useEpmMeetings } from '../components/epm-gallery/galleryUtils';
import '../components/epm-gallery/epmGallery.css';
import './EpmGalleryState.css';

// Second level of the EPM gallery: one state's district cards. Clicking a card opens that
// district's album (EpmGalleryDistrict). The districts are managed in the admin panel (Page &
// Gallery Images > States & districts) - see EpmGalleryRegionService.
export default function EpmGalleryState({ onNavigate, isLoggedIn, user, onLogout, stateId }) {
  const [region, setRegion] = useState(null);
  const [status, setStatus] = useState(stateId ? 'loading' : 'error');
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState('');
  const [otherStates, setOtherStates] = useState([]);

  useEffect(() => {
    if (!stateId) return undefined;
    let cancelled = false;
    setStatus('loading');
    fetchEpmGalleryState(stateId)
      .then((data) => { if (!cancelled) { setRegion(data); setStatus('ready'); } })
      .catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; };
  }, [stateId, attempt]);

  // The other states, offered at the end of the page. Optional - on failure the row is left out.
  useEffect(() => {
    let cancelled = false;
    fetchEpmGalleryStates()
      .then((data) => { if (!cancelled) setOtherStates((data || []).filter((s) => s.id !== stateId)); })
      .catch(() => { if (!cancelled) setOtherStates([]); });
    return () => { cancelled = true; };
  }, [stateId]);

  const stateMeetings = useEpmMeetings({ state: region?.name }, Boolean(region?.name));
  const meetings = useMemo(() => (stateMeetings ? summariseMeetings(stateMeetings) : null), [stateMeetings]);
  const meetingsByDistrict = useMemo(() => countMeetingsBy(stateMeetings, 'district'), [stateMeetings]);

  const allDistricts = useMemo(() => region?.districts || [], [region]);
  const trimmedQuery = query.trim();
  const districts = useMemo(() => {
    const q = trimmedQuery.toLowerCase();
    return q ? allDistricts.filter((d) => d.name.toLowerCase().includes(q)) : allDistricts;
  }, [allDistricts, trimmedQuery]);

  const goToGallery = () => onNavigate('epm-gallery');
  const openDistrict = (district) => onNavigate('epm-gallery-district', { state: region.id, district: district.id });

  return (
    <div className="epg epg-state">
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="epm" />

      <main className="epg-main">
        {status === 'error' && (
          <div className="epg-container">
            <StatusMessage
              icon={ImageOff}
              headingLevel="h1"
              title="We couldn't open this gallery"
              text="It may have moved, or the server can't be reached right now."
            >
              {stateId && (
                <button type="button" className="epg-btn epg-btn-primary" onClick={() => setAttempt((n) => n + 1)}>
                  <RefreshCw size={16} /> Try again
                </button>
              )}
              <button type="button" className="epg-btn epg-btn-secondary" onClick={goToGallery}>
                <ArrowLeft size={16} className="epg-nudge-left" /> Back to the gallery
              </button>
            </StatusMessage>
          </div>
        )}

        {status === 'loading' && (
          <div aria-busy="true" aria-label="Loading districts">
            <GalleryHeroSkeleton />
            <section className="epg-section epg-section-lead epg-container">
              <ul className="epg-district-grid">
                {Array.from({ length: 8 }, (_, i) => <li key={i}><DistrictCardSkeleton /></li>)}
              </ul>
            </section>
          </div>
        )}

        {status === 'ready' && region && (
          <>
            <GalleryHero
              image={getEpmGalleryImageUrl(region.coverUrl)}
              crumbs={[
                { label: 'EPM', onClick: () => onNavigate('epm') },
                { label: 'Gallery', onClick: goToGallery },
                { label: region.name },
              ]}
              eyebrow="State gallery"
              title={region.name}
              lead={`Export Promotional Meetings across ${region.name}, told through photographs from each district. Choose a district to open its album.`}
              stats={[
                { label: plural(region.districtCount, 'District'), value: region.districtCount },
                { label: plural(region.photoCount, 'Photograph'), value: region.photoCount },
                meetings?.held > 0 && { label: plural(meetings.held, 'EPM held', 'EPMs held'), value: meetings.held },
                meetings?.upcoming > 0 && { label: 'Upcoming', value: meetings.upcoming },
              ]}
              aside={meetings?.next && (
                <NextEpmCard event={meetings.next} place={region.name} onOpen={() => onNavigate('epm-details')} />
              )}
            />

            <section className="epg-section epg-section-lead epg-container" aria-labelledby="epg-districts-title">
              <SectionHeading
                id="epg-districts-title"
                eyebrow="Districts"
                title="Choose a district"
                description={`${region.districtCount} ${plural(region.districtCount, 'district')} in ${region.name}, each with its own album from the meetings held there.`}
              >
                {allDistricts.length > 1 && (
                  <label className="epg-search">
                    <Search size={18} aria-hidden="true" />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search districts"
                      aria-label="Search districts"
                    />
                  </label>
                )}
              </SectionHeading>

              <p className="epg-result-note" aria-live="polite">
                {trimmedQuery && districts.length > 0
                  ? `Showing ${districts.length} of ${allDistricts.length} districts`
                  : ''}
              </p>

              {districts.length === 0 ? (
                <StatusMessage
                  icon={trimmedQuery ? Search : ImageOff}
                  title={trimmedQuery ? `No district matches “${trimmedQuery}”` : 'No districts yet'}
                  text={trimmedQuery ? 'Check the spelling, or clear the search to see every district.' : undefined}
                >
                  {trimmedQuery && (
                    <button type="button" className="epg-btn epg-btn-secondary" onClick={() => setQuery('')}>
                      Clear search
                    </button>
                  )}
                </StatusMessage>
              ) : (
                <ul className="epg-district-grid">
                  {districts.map((district, i) => (
                    <Reveal as="li" key={district.id} delay={Math.min(i, 8) * 60}>
                      <DistrictCard
                        district={district}
                        index={allDistricts.indexOf(district)}
                        meetings={meetingsByDistrict.get(placeKey(district.name)) || 0}
                        onOpen={() => openDistrict(district)}
                      />
                    </Reveal>
                  ))}
                </ul>
              )}
            </section>

            <section className="epg-section epg-band" aria-labelledby="epg-other-states-title">
              <div className="epg-container">
                <SectionHeading
                  id="epg-other-states-title"
                  eyebrow="Continue exploring"
                  title={otherStates.length > 0 ? 'Other states' : 'The full gallery'}
                >
                  <button type="button" className="epg-link" onClick={goToGallery}>
                    Back to the gallery <ArrowRight size={16} />
                  </button>
                </SectionHeading>
                {otherStates.length > 0 ? (
                  <ul className="epg-state-links">
                    {otherStates.map((s, i) => (
                      <Reveal as="li" key={s.id} delay={i * 70}>
                        <button
                          type="button"
                          className="epg-state-link"
                          onClick={() => onNavigate('epm-gallery-state', { state: s.id })}
                        >
                          <span className="epg-state-link-media">
                            <FadeImage src={getEpmGalleryImageUrl(s.coverUrl)} alt="" loading="lazy" decoding="async" />
                          </span>
                          <span className="epg-state-link-text">
                            <span className="epg-state-link-name">{s.name}</span>
                            <span className="epg-state-link-meta">
                              {s.districtCount} {plural(s.districtCount, 'district')} · {s.photoCount} {plural(s.photoCount, 'photograph')}
                            </span>
                          </span>
                          <span className="epg-state-link-go" aria-hidden="true"><ArrowRight size={18} /></span>
                        </button>
                      </Reveal>
                    ))}
                  </ul>
                ) : (
                  <p className="epg-section-desc">
                    Return to the EPM Gallery for every state, and for photographs of the meetings by theme.
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
