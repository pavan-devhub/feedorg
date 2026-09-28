import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ImageOff, Play, RefreshCw } from 'lucide-react';
import { fetchEpmGalleryDistrict, fetchEpmGalleryState, getEpmGalleryImageUrl } from '../api/epmApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhotoLightbox from '../components/PhotoLightbox';
import GalleryHero, { GalleryHeroSkeleton } from '../components/epm-gallery/GalleryHero';
import EditorialGrid, { EditorialGridSkeleton } from '../components/epm-gallery/EditorialGrid';
import DistrictCard from '../components/epm-gallery/DistrictCard';
import Reveal from '../components/epm-gallery/Reveal';
import { NextEpmCard, SectionHeading, StatusMessage } from '../components/epm-gallery/GalleryPrimitives';
import { countMeetingsBy, placeKey, plural, summariseMeetings, useEpmMeetings } from '../components/epm-gallery/galleryUtils';
import useScrollToTop from '../hooks/useScrollToTop';
import '../components/epm-gallery/epmGallery.css';

// Used until a photo's real size is known (the backend can't read every format's dimensions).
const FALLBACK_RATIO = 4 / 3;
const MORE_DISTRICTS = 4;

// Each district's landscape banner is public/images/epm-heroes/<district-id>.jpg; default.jpg
// stands in for districts that don't have their own yet.
const HERO_FALLBACK = '/images/epm-heroes/default.jpg';
const heroFor = (districtId) => `/images/epm-heroes/${(districtId || '').toLowerCase().replace(/\s+/g, '-')}.jpg`;

// Third level of the EPM gallery: one district's album, in the order the admin arranged its photos
// (Page & Gallery Images > States & districts) - see EpmGalleryRegionService.
export default function EpmGalleryDistrict({ onNavigate, isLoggedIn, user, onLogout, stateId, districtId }) {
  const [district, setDistrict] = useState(null);
  const [status, setStatus] = useState(stateId && districtId ? 'loading' : 'error');
  const [attempt, setAttempt] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [siblings, setSiblings] = useState([]);
  const [heroSrc, setHeroSrc] = useState(() => heroFor(districtId));

  // Moving to another district keeps App on this same page, so reset the scroll per district.
  useScrollToTop(`${stateId}/${districtId}`);

  useEffect(() => {
    if (!stateId || !districtId) return undefined;
    let cancelled = false;
    setStatus('loading');
    setOpenIndex(null);
    setHeroSrc(heroFor(districtId));
    fetchEpmGalleryDistrict(stateId, districtId)
      .then((data) => { if (!cancelled) { setDistrict(data); setStatus('ready'); } })
      .catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; };
  }, [stateId, districtId, attempt]);

  // The state's other districts, for the "continue exploring" row. Optional - on failure the
  // row is simply left out.
  useEffect(() => {
    if (!stateId) return undefined;
    let cancelled = false;
    fetchEpmGalleryState(stateId)
      .then((data) => { if (!cancelled) setSiblings(data?.districts || []); })
      .catch(() => { if (!cancelled) setSiblings([]); });
    return () => { cancelled = true; };
  }, [stateId]);

  // One events call for the whole state covers both this district's numbers and the badges on
  // the neighbouring district cards.
  const stateName = district?.stateName;
  const stateMeetings = useEpmMeetings({ state: stateName }, Boolean(stateName));
  const meetingsByDistrict = useMemo(() => countMeetingsBy(stateMeetings, 'district'), [stateMeetings]);
  const meetings = useMemo(() => {
    if (!stateMeetings || !district) return null;
    const key = placeKey(district.name);
    return summariseMeetings(stateMeetings.filter((e) => placeKey(e.district) === key));
  }, [stateMeetings, district]);

  const photos = useMemo(
    () => (district?.photos || []).map((p, i) => ({
      id: p.id,
      src: getEpmGalleryImageUrl(p.imageUrl),
      ratio: p.width && p.height ? p.width / p.height : FALLBACK_RATIO,
      alt: p.caption || `${district.name}, ${district.stateName} - photograph ${i + 1}`,
      // Set by the admin (Page & Gallery Images > States & districts); shown under the photo in the viewer.
      caption: p.caption || undefined,
    })),
    [district]
  );

  // The districts after this one (wrapping round), so "next" always reads left to right.
  const moreDistricts = useMemo(() => {
    const at = siblings.findIndex((d) => d.id === districtId);
    const ordered = at === -1 ? siblings : [...siblings.slice(at + 1), ...siblings.slice(0, at)];
    return ordered.filter((d) => d.id !== districtId).slice(0, MORE_DISTRICTS);
  }, [siblings, districtId]);

  const goToGallery = () => onNavigate('epm-gallery');
  const goToState = () => onNavigate('epm-gallery-state', { state: stateId });
  const openDistrict = (id) => onNavigate('epm-gallery-district', { state: stateId, district: id });

  return (
    <div className="epg epg-district">
      <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="epm" />

      <main className="epg-main">
        {status === 'error' && (
          <div className="epg-container">
            <StatusMessage
              icon={ImageOff}
              headingLevel="h1"
              title="We couldn't open this album"
              text="It may have moved, or the server can't be reached right now."
            >
              {stateId && districtId && (
                <button type="button" className="epg-btn epg-btn-primary" onClick={() => setAttempt((n) => n + 1)}>
                  <RefreshCw size={16} /> Try again
                </button>
              )}
              <button type="button" className="epg-btn epg-btn-secondary" onClick={stateId ? goToState : goToGallery}>
                <ArrowLeft size={16} className="epg-nudge-left" /> {stateId ? 'Back to districts' : 'Back to the gallery'}
              </button>
            </StatusMessage>
          </div>
        )}

        {status === 'loading' && (
          <div aria-busy="true" aria-label="Loading album">
            <GalleryHeroSkeleton />
            <section className="epg-section epg-section-lead epg-container">
              <EditorialGridSkeleton />
            </section>
          </div>
        )}

        {status === 'ready' && district && (
          <>
            <GalleryHero
              image={heroSrc}
              onImageError={() => setHeroSrc(HERO_FALLBACK)}
              crumbs={[
                { label: 'EPM', onClick: () => onNavigate('epm') },
                { label: 'Gallery', onClick: goToGallery },
                { label: district.stateName, onClick: goToState },
                { label: district.name },
              ]}
              eyebrow={`District album · ${district.stateName}`}
              title={district.name}
              lead={`The farming communities, landscapes and activities of ${district.name} district, captured at FEED's Export Promotional Meetings.`}
              stats={[
                { label: plural(district.photoCount, 'Photograph'), value: district.photoCount },
                meetings?.held > 0 && { label: plural(meetings.held, 'EPM held', 'EPMs held'), value: meetings.held },
                meetings?.upcoming > 0 && { label: 'Upcoming', value: meetings.upcoming },
              ]}
              aside={meetings?.next && (
                <NextEpmCard event={meetings.next} place={district.name} onOpen={() => onNavigate('epm-details')} />
              )}
            />

            <section className="epg-section epg-section-lead epg-container" aria-labelledby="epg-album-title">
              <SectionHeading
                id="epg-album-title"
                eyebrow="The album"
                title={`Photographs from ${district.name}`}
                description={photos.length > 0 ? 'Select any photograph to see it full screen.' : undefined}
              >
                {photos.length > 1 && (
                  <button type="button" className="epg-btn epg-btn-secondary" onClick={() => setOpenIndex(0)}>
                    <Play size={16} /> View as slideshow
                  </button>
                )}
              </SectionHeading>

              {photos.length === 0 ? (
                <StatusMessage
                  icon={ImageOff}
                  title="No photographs yet"
                  text={`Photographs from meetings in ${district.name} will appear here once they're added.`}
                />
              ) : (
                <EditorialGrid photos={photos} onOpen={setOpenIndex} label={`${district.name} photograph`} />
              )}
            </section>

            {moreDistricts.length > 0 && (
              <section className="epg-section epg-band" aria-labelledby="epg-more-title">
                <div className="epg-container">
                  <SectionHeading id="epg-more-title" eyebrow="Continue exploring" title={`More from ${district.stateName}`}>
                    <button type="button" className="epg-link" onClick={goToState}>
                      All {siblings.length} districts <ArrowRight size={16} />
                    </button>
                  </SectionHeading>
                  <ul className="epg-district-grid">
                    {moreDistricts.map((d, k) => (
                      <Reveal as="li" key={d.id} delay={k * 70}>
                        <DistrictCard
                          district={d}
                          index={siblings.indexOf(d)}
                          meetings={meetingsByDistrict.get(placeKey(d.name)) || 0}
                          onOpen={() => openDistrict(d.id)}
                        />
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <PhotoLightbox
        photos={photos}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
        title={district?.name}
        subtitle={district ? `${district.stateName} · EPM Gallery` : ''}
      />

      <Footer />
    </div>
  );
}
