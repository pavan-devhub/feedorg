import React from 'react';
import FadeImage from '../FadeImage';
import { Crumbs, Stats } from './GalleryPrimitives';

// Full-bleed photographic header for a place (a state or a district): breadcrumb trail, title,
// short lead, the place's numbers along the bottom, and an optional card beside them (`aside`).
export default function GalleryHero({ image, onImageError, crumbs, eyebrow, title, lead, stats, aside }) {
  return (
    <header className="epg-hero epg-container">
      <div className="epg-hero-frame">
        <div className="epg-hero-media" aria-hidden="true">
          {image && (
            <FadeImage className="epg-hero-img" src={image} alt="" fetchPriority="high" onError={onImageError} />
          )}
        </div>
        <div className="epg-hero-inner">
          <Crumbs items={crumbs} light />
          <div className="epg-hero-copy">
            {eyebrow && <span className="epg-eyebrow is-light">{eyebrow}</span>}
            <h1 className="epg-hero-title">{title}</h1>
            {lead && <p className="epg-hero-lead">{lead}</p>}
          </div>
          {(stats || aside) && (
            <div className="epg-hero-foot">
              {stats && <Stats items={stats} light />}
              {aside}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function GalleryHeroSkeleton() {
  return (
    <div className="epg-hero epg-container" aria-hidden="true">
      <div className="epg-hero-frame epg-skeleton" />
    </div>
  );
}
