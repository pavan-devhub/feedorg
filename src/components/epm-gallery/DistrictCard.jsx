import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import FadeImage from '../FadeImage';
import { getEpmGalleryImageUrl } from '../../api/epmApi';
import { pad2, plural } from './galleryUtils';
import './DistrictCard.css';

// One district of a state's gallery: its cover photo, name, photo count and - when the events
// data has any - how many EPMs were held there. The whole card opens the district's album.
export default function DistrictCard({ district, index, meetings = 0, onOpen }) {
  const photos = district.photoCount;
  const summary = `${photos} ${plural(photos, 'photograph')}`;
  const label = meetings > 0 ? `${summary}, ${meetings} ${plural(meetings, 'EPM')}` : summary;

  return (
    <button type="button" className="epg-dcard" onClick={onOpen} aria-label={`${district.name}: ${label}`}>
      <span className="epg-dcard-media">
        <FadeImage
          className="epg-dcard-img"
          src={getEpmGalleryImageUrl(district.coverUrl)}
          alt=""
          loading="lazy"
          decoding="async"
        />
        {index !== undefined && <span className="epg-dcard-index">{pad2(index + 1)}</span>}
        {meetings > 0 && (
          <span className="epg-dcard-badge">
            <i aria-hidden="true" />
            {meetings} {plural(meetings, 'EPM')}
          </span>
        )}
      </span>
      <span className="epg-dcard-body">
        <span className="epg-dcard-text">
          <span className="epg-dcard-name">{district.name}</span>
          <span className="epg-dcard-meta">{summary}</span>
        </span>
        <span className="epg-dcard-go" aria-hidden="true"><ArrowUpRight size={18} /></span>
      </span>
    </button>
  );
}

export function DistrictCardSkeleton() {
  return (
    <span className="epg-dcard is-skeleton" aria-hidden="true">
      <span className="epg-dcard-media epg-skeleton" />
      <span className="epg-dcard-body">
        <span className="epg-dcard-text">
          <span className="epg-skeleton-line" style={{ width: '62%' }} />
          <span className="epg-skeleton-line is-thin" style={{ width: '40%' }} />
        </span>
      </span>
    </span>
  );
}
